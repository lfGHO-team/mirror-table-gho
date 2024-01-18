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
        MockERC20(deploy.gho()).mint(deploy.bob(), 1000 ether);
    }

    function test_deployGho() public {
        GHOtiqueFactory ghoVaultFactory = GHOtiqueFactory(deploy.ghoFactory());
        address[] memory addresses = new address[](2);
        addresses[0] = deploy.alice();
        addresses[1] = deploy.bob();
        
        vm.startPrank(deploy.alice());
        // Deployer of Vault (Founder) approves the Vault Factory to move GHO in their name
        MockERC20(deploy.gho()).approve(address (ghoVaultFactory), 1000 ether);
        // Deployer of Vault (Founder) creates a new Vault through the Factory
        address ghoVault = ghoVaultFactory.createNewMirrorTable("Company1", "CO1", addresses, 2, 100 ether);
        vm.stopPrank();
        console2.logAddress(ghoVault);
        assertEq(Ghotique(payable(ghoVault)).balanceOf(deploy.alice()), 100 ether);
        console2.logUint(Ghotique(payable(ghoVault)).balanceOf(deploy.alice()));
    }

    function test_depositGHO() public {
        address ghoVault = _deployVault();
        //A user different than original founder deposits GHO to get shares
        vm.startPrank(deploy.bob());
        MockERC20(deploy.gho()).approve(address(ghoVault), 1000 ether);
        Ghotique(payable(ghoVault)).deposit(100 ether, deploy.bob());
        vm.stopPrank();
        assertEq(Ghotique(payable(ghoVault)).balanceOf(deploy.bob()), 100 ether);
    }

    function test_redeemGHO() public {
        address ghoVault = _vaultFullSetup();
        //A user different than original founder burns shares to recover GHO
        vm.startPrank(deploy.bob());
        Ghotique(payable(ghoVault)).redeem(100 ether, deploy.bob(), deploy.bob());
        vm.stopPrank();
        assertEq(Ghotique(payable(ghoVault)).balanceOf(deploy.bob()), 0 ether);
    }

    function test_assignBudget() public {
        address ghoVault = _vaultFullSetup();
        Ghotique ghostVaultContract = Ghotique(payable(ghoVault));
        //We design a transfer tx to Bob for Marketing
        bytes memory txData = abi.encodeWithSignature("transfer(address,uint256)", deploy.bob(), 50 ether);
        vm.startPrank(deploy.alice());
        //Any of the signers (Founders) can propose a transaction
        ghostVaultContract.submitTransaction(deploy.gho(), 0, txData);
        //1/2 signatures
        ghostVaultContract.confirmTransaction(ghostVaultContract.getTransactionCount()-1); //transation 0, the last one declared
        vm.stopPrank();
        vm.startPrank(deploy.bob());
        //2/2 signatures
        ghostVaultContract.confirmTransaction(ghostVaultContract.getTransactionCount()-1); //transation 0, the last one declared
        //After we get all required signatures, anyone can execute the transaction
        ghostVaultContract.executeTransaction(ghostVaultContract.getTransactionCount()-1); //transation 0, the last one declared
        assertEq(MockERC20(deploy.gho()).balanceOf(deploy.bob()), 950 ether); //1000 initially - 100 of investment + 50 of budget 
    }

    function _deployVault() internal returns (address){
        GHOtiqueFactory ghoVaultFactory = GHOtiqueFactory(deploy.ghoFactory());
        address[] memory addresses = new address[](2);
        addresses[0] = deploy.alice();
        addresses[1] = deploy.bob();
        vm.startPrank(deploy.alice());
        // Deployer of Vault (Founder) approves the Vault Factory to move GHO in their name
        MockERC20(deploy.gho()).approve(address (ghoVaultFactory), 1000 ether);
        // Deployer of Vault (Founder) creates a new Vault through the Factory
        address ghoVault = ghoVaultFactory.createNewMirrorTable("Company1", "CO1", addresses, 2, 100 ether);
        vm.stopPrank();
        return ghoVault;
    }

    function _vaultFullSetup() internal returns (address){
        address ghoVault = _deployVault();
        //A user different than original founder deposits GHO to get shares
        vm.startPrank(deploy.bob());
        MockERC20(deploy.gho()).approve(address(ghoVault), 1000 ether);
        Ghotique(payable(ghoVault)).deposit(100 ether, deploy.bob());
        vm.stopPrank();
        return ghoVault;
    }

}
