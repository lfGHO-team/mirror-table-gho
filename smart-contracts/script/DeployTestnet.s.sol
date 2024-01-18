// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {GHOtiqueFactory} from "src/GHOtiqueFactory.sol";
import {Ghotique} from "src/GHOtique.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";


contract Deploy is Script {

    GHOtiqueFactory public ghoFactory;
    Ghotique public ghotique;
    address public gho = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;

    function setUp() public {

    }

    function run() public {
        vm.startBroadcast();

        ghotique = new Ghotique();
        ghoFactory = new GHOtiqueFactory(address(ghotique), gho, 50 ether);

        vm.stopBroadcast();
    }
}
