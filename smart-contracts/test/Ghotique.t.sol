// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {Deploy} from "script/DeployLocal.s.sol";
import {Ghotique} from "src/GHOtique.sol";
import {GHOtiqueFactory} from "src/GHOtiqueFactory.sol";

contract GhotiqueTest is Test {
    Deploy public deploy;

    function setUp() public {
        deploy = new Deploy();
        deploy.setUp();
        deploy.run();
    }

    function test_DeployGho() public {
       GHOtiqueFactory ghoVaultFactory = GHOtiqueFactory(deploy.ghoFactory());
       address[] memory addresses = new address[](2);
        addresses[0] = deploy.alice();
        addresses[1] = deploy.bob();
        console2.logAddress(addresses[0]);
        console2.logAddress(addresses[1]);
       address ghoVault = ghoVaultFactory.createNewMirrorTable("Ghotique", "GHO", addresses, 2);
       console2.logAddress(ghoVault);
    }


}
