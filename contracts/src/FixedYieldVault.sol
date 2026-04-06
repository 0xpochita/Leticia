// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IFixedYieldVault} from "./interfaces/IFixedYieldVault.sol";

contract FixedYieldVault is IFixedYieldVault, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    uint256 public constant RATE_PRECISION = 1e18;
    uint256 public constant SECONDS_PER_YEAR = 365 days;
    uint256 public constant EARLY_WITHDRAWAL_PENALTY_BPS = 500;
    uint256 public constant BPS_DENOMINATOR = 10_000;

    struct VaultConfig {
        uint256 fixedRate;
        uint256 duration;
        uint256 cap;
        uint256 totalDeposited;
        bool active;
    }

    mapping(address asset => VaultConfig) public vaults;
    mapping(address user => Position[]) internal _positions;

    address[] public supportedAssets;

    constructor(address owner_) Ownable(owner_) {}

    function configureVault(address asset, uint256 fixedRate, uint256 duration, uint256 cap) external onlyOwner {
        VaultConfig storage vault = vaults[asset];
        vault.fixedRate = fixedRate;
        vault.duration = duration;
        vault.cap = cap;

        if (!vault.active) {
            vault.active = true;
            supportedAssets.push(asset);
        }

        emit VaultConfigured(asset, fixedRate, duration, cap);
    }

    function pauseVault(address asset) external onlyOwner {
        vaults[asset].active = false;
        emit VaultPaused(asset);
    }

    function unpauseVault(address asset) external onlyOwner {
        vaults[asset].active = true;
        emit VaultUnpaused(asset);
    }

    function deposit(address asset, uint256 amount) external nonReentrant whenNotPaused returns (uint256 positionId) {
        if (amount == 0) revert ZeroAmount();

        VaultConfig storage vault = vaults[asset];
        if (!vault.active) revert VaultNotActive();
        if (vault.totalDeposited + amount > vault.cap) revert VaultCapExceeded();

        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);

        vault.totalDeposited += amount;

        uint256 maturity = block.timestamp + vault.duration;
        positionId = _positions[msg.sender].length;

        _positions[msg.sender].push(
            Position({
                principal: amount,
                fixedRate: vault.fixedRate,
                maturity: maturity,
                depositedAt: block.timestamp,
                withdrawn: false
            })
        );

        emit Deposited(msg.sender, positionId, asset, amount, vault.fixedRate, maturity);
    }

    function withdraw(uint256 positionId) external nonReentrant returns (uint256 payout) {
        Position storage position = _getPosition(msg.sender, positionId);
        if (position.withdrawn) revert AlreadyWithdrawn();

        position.withdrawn = true;

        if (block.timestamp >= position.maturity) {
            uint256 yieldAmount =
                calculateYield(position.principal, position.fixedRate, position.depositedAt, position.maturity);
            payout = position.principal + yieldAmount;
            emit Withdrawn(msg.sender, positionId, position.principal, yieldAmount);
        } else {
            uint256 penalty = (position.principal * EARLY_WITHDRAWAL_PENALTY_BPS) / BPS_DENOMINATOR;
            payout = position.principal - penalty;
            emit EarlyWithdrawn(msg.sender, positionId, position.principal, penalty);
        }

        address asset = _findAssetForPosition(position);
        VaultConfig storage vault = vaults[asset];
        vault.totalDeposited -= position.principal;

        if (IERC20(asset).balanceOf(address(this)) < payout) revert InsufficientVaultBalance();
        IERC20(asset).safeTransfer(msg.sender, payout);
    }

    function fundVault(address asset, uint256 amount) external onlyOwner {
        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
    }

    function getPosition(address user, uint256 positionId) external view returns (Position memory) {
        return _positions[user][positionId];
    }

    function getPositionCount(address user) external view returns (uint256) {
        return _positions[user].length;
    }

    function getUserPositions(address user) external view returns (Position[] memory) {
        return _positions[user];
    }

    function calculateYield(uint256 principal, uint256 fixedRate, uint256 depositedAt, uint256 maturity)
        public
        pure
        returns (uint256)
    {
        uint256 duration = maturity - depositedAt;
        return (principal * fixedRate * duration) / (RATE_PRECISION * SECONDS_PER_YEAR);
    }

    function getVaultTVL(address asset) external view returns (uint256) {
        return vaults[asset].totalDeposited;
    }

    function getSupportedAssets() external view returns (address[] memory) {
        return supportedAssets;
    }

    function getVaultConfig(address asset)
        external
        view
        returns (uint256 fixedRate, uint256 duration, uint256 cap, uint256 totalDeposited, bool active)
    {
        VaultConfig storage vault = vaults[asset];
        return (vault.fixedRate, vault.duration, vault.cap, vault.totalDeposited, vault.active);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _getPosition(address user, uint256 positionId) internal view returns (Position storage) {
        if (positionId >= _positions[user].length) revert PositionNotFound();
        return _positions[user][positionId];
    }

    function _findAssetForPosition(Position storage position) internal view returns (address) {
        for (uint256 i = 0; i < supportedAssets.length; i++) {
            VaultConfig storage vault = vaults[supportedAssets[i]];
            if (vault.fixedRate == position.fixedRate && vault.duration == position.maturity - position.depositedAt) {
                return supportedAssets[i];
            }
        }
        revert PositionNotFound();
    }

    function withdrawByAsset(address asset, uint256 positionId) external nonReentrant returns (uint256 payout) {
        Position storage position = _getPosition(msg.sender, positionId);
        if (position.withdrawn) revert AlreadyWithdrawn();

        position.withdrawn = true;

        if (block.timestamp >= position.maturity) {
            uint256 yieldAmount =
                calculateYield(position.principal, position.fixedRate, position.depositedAt, position.maturity);
            payout = position.principal + yieldAmount;
            emit Withdrawn(msg.sender, positionId, position.principal, yieldAmount);
        } else {
            uint256 penalty = (position.principal * EARLY_WITHDRAWAL_PENALTY_BPS) / BPS_DENOMINATOR;
            payout = position.principal - penalty;
            emit EarlyWithdrawn(msg.sender, positionId, position.principal, penalty);
        }

        VaultConfig storage vault = vaults[asset];
        vault.totalDeposited -= position.principal;

        if (IERC20(asset).balanceOf(address(this)) < payout) revert InsufficientVaultBalance();
        IERC20(asset).safeTransfer(msg.sender, payout);
    }
}
