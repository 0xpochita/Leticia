// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IFixedYieldVault {
    struct Position {
        uint256 principal;
        uint256 fixedRate;
        uint256 maturity;
        uint256 depositedAt;
        bool withdrawn;
    }

    event Deposited(
        address indexed user, uint256 indexed positionId, address indexed asset, uint256 amount, uint256 fixedRate, uint256 maturity
    );
    event Withdrawn(address indexed user, uint256 indexed positionId, uint256 principal, uint256 yield);
    event EarlyWithdrawn(address indexed user, uint256 indexed positionId, uint256 principal, uint256 penalty);
    event VaultConfigured(address indexed asset, uint256 fixedRate, uint256 duration, uint256 cap);
    event VaultPaused(address indexed asset);
    event VaultUnpaused(address indexed asset);

    error VaultNotActive();
    error VaultCapExceeded();
    error ZeroAmount();
    error PositionNotFound();
    error AlreadyWithdrawn();
    error NotPositionOwner();
    error InsufficientVaultBalance();

    function deposit(address asset, uint256 amount) external returns (uint256 positionId);
    function withdraw(uint256 positionId) external returns (uint256 payout);
    function getPosition(address user, uint256 positionId) external view returns (Position memory);
    function getPositionCount(address user) external view returns (uint256);
    function calculateYield(uint256 principal, uint256 fixedRate, uint256 depositedAt, uint256 maturity) external pure returns (uint256);
    function getVaultTVL(address asset) external view returns (uint256);
}
