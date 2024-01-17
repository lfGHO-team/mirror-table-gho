// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {GHOtiqueFactory} from "src/GHOtiqueFactory.sol";
import {Ghotique} from "src/GHOtique.sol";


contract Deploy is Script {

    address public deployer;
    address public alice;
    address public bob;

    GHOtiqueFactory public ghoFactory;
    Ghotique public ghotique;

    function setUp() public {
        deployer = vm.envAddress("DEPLOYER");
        alice = vm.envAddress("ALICE");
        bob = vm.envAddress("BOB");
    }

    function run() public {
        vm.startBroadcast();

        ghotique = new Ghotique();
        ghoFactory = new GHOtiqueFactory(address(ghotique), address(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60));

        vm.stopBroadcast();
    }
}
