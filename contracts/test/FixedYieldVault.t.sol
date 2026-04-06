// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {FixedYieldVault} from "../src/FixedYieldVault.sol";
import {IFixedYieldVault} from "../src/interfaces/IFixedYieldVault.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";

contract FixedYieldVaultTest is Test {
    FixedYieldVault public vault;
    MockERC20 public sInit;
    MockERC20 public usde;

    address public owner = makeAddr("owner");
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");

    uint256 public constant RATE_10_PERCENT = 0.1e18;
    uint256 public constant DURATION_90_DAYS = 90 days;
    uint256 public constant CAP = 1_000_000e18;
    uint256 public constant DEPOSIT_AMOUNT = 1000e18;

    function setUp() public {
        vm.startPrank(owner);
        vault = new FixedYieldVault(owner);
        sInit = new MockERC20("Staked INIT", "sINIT", 18);
        usde = new MockERC20("USDe", "USDe", 18);

        vault.configureVault(address(sInit), RATE_10_PERCENT, DURATION_90_DAYS, CAP);
        vault.configureVault(address(usde), 0.05e18, 180 days, CAP);

        sInit.mint(owner, 100_000e18);
        sInit.approve(address(vault), 100_000e18);
        vault.fundVault(address(sInit), 100_000e18);

        usde.mint(owner, 100_000e18);
        usde.approve(address(vault), 100_000e18);
        vault.fundVault(address(usde), 100_000e18);
        vm.stopPrank();

        sInit.mint(alice, 10_000e18);
        sInit.mint(bob, 10_000e18);
        usde.mint(alice, 10_000e18);
    }

    function test_deposit() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        uint256 positionId = vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        assertEq(positionId, 0);
        assertEq(vault.getPositionCount(alice), 1);

        IFixedYieldVault.Position memory pos = vault.getPosition(alice, 0);
        assertEq(pos.principal, DEPOSIT_AMOUNT);
        assertEq(pos.fixedRate, RATE_10_PERCENT);
        assertEq(pos.maturity, block.timestamp + DURATION_90_DAYS);
        assertFalse(pos.withdrawn);
    }

    function test_deposit_revert_zero() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert(IFixedYieldVault.ZeroAmount.selector);
        vault.deposit(address(sInit), 0);
        vm.stopPrank();
    }

    function test_deposit_revert_inactive_vault() public {
        vm.prank(owner);
        vault.pauseVault(address(sInit));

        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert(IFixedYieldVault.VaultNotActive.selector);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function test_deposit_revert_cap_exceeded() public {
        vm.prank(owner);
        vault.configureVault(address(sInit), RATE_10_PERCENT, DURATION_90_DAYS, 500e18);

        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert(IFixedYieldVault.VaultCapExceeded.selector);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function test_withdraw_at_maturity() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        vm.warp(block.timestamp + DURATION_90_DAYS);

        uint256 expectedYield = vault.calculateYield(DEPOSIT_AMOUNT, RATE_10_PERCENT, 1, 1 + DURATION_90_DAYS);
        uint256 balanceBefore = sInit.balanceOf(alice);

        vm.prank(alice);
        uint256 payout = vault.withdrawByAsset(address(sInit), 0);

        assertEq(payout, DEPOSIT_AMOUNT + expectedYield);
        assertEq(sInit.balanceOf(alice), balanceBefore + payout);

        IFixedYieldVault.Position memory pos = vault.getPosition(alice, 0);
        assertTrue(pos.withdrawn);
    }

    function test_early_withdrawal_penalty() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        vm.warp(block.timestamp + 30 days);

        uint256 expectedPenalty = (DEPOSIT_AMOUNT * 500) / 10_000;
        uint256 expectedPayout = DEPOSIT_AMOUNT - expectedPenalty;

        vm.prank(alice);
        uint256 payout = vault.withdrawByAsset(address(sInit), 0);

        assertEq(payout, expectedPayout);
    }

    function test_withdraw_revert_already_withdrawn() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        vm.warp(block.timestamp + DURATION_90_DAYS);

        vm.startPrank(alice);
        vault.withdrawByAsset(address(sInit), 0);

        vm.expectRevert(IFixedYieldVault.AlreadyWithdrawn.selector);
        vault.withdrawByAsset(address(sInit), 0);
        vm.stopPrank();
    }

    function test_multiple_deposits() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT * 3);

        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        assertEq(vault.getPositionCount(alice), 3);
        assertEq(vault.getVaultTVL(address(sInit)), DEPOSIT_AMOUNT * 3);
    }

    function test_multiple_assets() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        usde.approve(address(vault), DEPOSIT_AMOUNT);

        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vault.deposit(address(usde), DEPOSIT_AMOUNT);
        vm.stopPrank();

        assertEq(vault.getPositionCount(alice), 2);

        IFixedYieldVault.Position memory pos0 = vault.getPosition(alice, 0);
        IFixedYieldVault.Position memory pos1 = vault.getPosition(alice, 1);

        assertEq(pos0.fixedRate, RATE_10_PERCENT);
        assertEq(pos1.fixedRate, 0.05e18);
    }

    function test_calculate_yield() public view {
        uint256 principal = 1000e18;
        uint256 rate = 0.1e18;
        uint256 depositedAt = 0;
        uint256 maturity = 365 days;

        uint256 yield_ = vault.calculateYield(principal, rate, depositedAt, maturity);
        assertEq(yield_, 100e18);
    }

    function test_get_user_positions() public {
        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT * 2);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        IFixedYieldVault.Position[] memory positions = vault.getUserPositions(alice);
        assertEq(positions.length, 2);
        assertEq(positions[0].principal, DEPOSIT_AMOUNT);
        assertEq(positions[1].principal, DEPOSIT_AMOUNT);
    }

    function test_vault_config() public view {
        (uint256 fixedRate, uint256 duration, uint256 cap, uint256 totalDeposited, bool active) =
            vault.getVaultConfig(address(sInit));

        assertEq(fixedRate, RATE_10_PERCENT);
        assertEq(duration, DURATION_90_DAYS);
        assertEq(cap, CAP);
        assertEq(totalDeposited, 0);
        assertTrue(active);
    }

    function test_supported_assets() public view {
        address[] memory assets = vault.getSupportedAssets();
        assertEq(assets.length, 2);
        assertEq(assets[0], address(sInit));
        assertEq(assets[1], address(usde));
    }

    function test_only_owner_configure() public {
        vm.prank(alice);
        vm.expectRevert();
        vault.configureVault(address(sInit), RATE_10_PERCENT, DURATION_90_DAYS, CAP);
    }

    function test_pause_unpause() public {
        vm.prank(owner);
        vault.pause();

        vm.startPrank(alice);
        sInit.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert();
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        vm.prank(owner);
        vault.unpause();

        vm.startPrank(alice);
        vault.deposit(address(sInit), DEPOSIT_AMOUNT);
        vm.stopPrank();

        assertEq(vault.getPositionCount(alice), 1);
    }

    function testFuzz_deposit_amount(uint256 amount) public {
        amount = bound(amount, 1, CAP);

        sInit.mint(alice, amount);

        vm.startPrank(alice);
        sInit.approve(address(vault), amount);
        vault.deposit(address(sInit), amount);
        vm.stopPrank();

        IFixedYieldVault.Position memory pos = vault.getPosition(alice, 0);
        assertEq(pos.principal, amount);
    }
}
