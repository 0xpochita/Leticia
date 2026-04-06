// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {FixedYieldVault} from "../src/FixedYieldVault.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying FixedYieldVault...");
        console.log("Deployer:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        FixedYieldVault vault = new FixedYieldVault(deployer);

        console.log("FixedYieldVault deployed at:", address(vault));

        vm.stopBroadcast();
    }
}
