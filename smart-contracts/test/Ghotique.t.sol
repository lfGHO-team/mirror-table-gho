// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {Deploy} from "script/DeployLocal.s.sol";
import {Ghotique} from "src/GHOtique.sol";
import {GHOtiqueFactory} from "src/GHOtiqueFactory.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract GhotiqueTest is Test {
    Deploy public deploy;

    function setUp() public {
        deploy = new Deploy();
        deploy.setUp();
        deploy.run();
        MockERC20 mockERC20 = new MockERC20();
        bytes memory code = address(mockERC20).code;
        vm.etch(deploy.gho(), code);
        MockERC20(deploy.gho()).mint(deploy.alice(), 1000 ether);
    }

    function test_DeployGho() public {
       GHOtiqueFactory ghoVaultFactory = GHOtiqueFactory(deploy.ghoFactory());
       address[] memory addresses = new address[](2);
        addresses[0] = deploy.alice();
        addresses[1] = deploy.bob();

        vm.startPrank(deploy.alice());
        MockERC20(deploy.gho()).approve(address (ghoVaultFactory), 1000 ether);
       address ghoVault = ghoVaultFactory.createNewMirrorTable("Ghotique", "GHO", addresses, 2, 100 ether);
       vm.stopPrank();
       console2.logAddress(ghoVault);
    }


}
