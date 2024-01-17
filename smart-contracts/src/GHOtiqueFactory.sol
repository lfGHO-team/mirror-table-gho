//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Ghotique} from "./GHOtique.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error NonExistingProxy();
error ZeroAddress();
contract GHOtiqueFactory is Ownable {
    using Clones for address;

    uint256 private _proxyId;
    uint256 private _minInitialInvestment;
    address private _implementation;
    address private _gho;

    event ProxyCreated(address proxy);

    constructor (address implementation, address gho) Ownable(msg.sender) {
        if (implementation == address(0)) revert ZeroAddress();
        _implementation = implementation;
        _gho = gho;
    }

    function createNewMirrorTable(
        string memory name,
        string memory symbol,
        address[] memory owners,
        uint256 numConfirmationsRequired, 
        uint256 minInitialInvestment
    ) external payable returns (address) {
        address newMirror = _implementation.cloneDeterministic(bytes32(_proxyId));
        Ghotique ghotiqueVault = Ghotique(payable(newMirror));
        ghotiqueVault.initialize(name, symbol, _gho, msg.sender, owners, numConfirmationsRequired);
        IERC20(_gho).transferFrom(msg.sender, address(this), minInitialInvestment);
        IERC20(_gho).approve(newMirror, minInitialInvestment);
        ghotiqueVault.deposit(minInitialInvestment, msg.sender);
        _proxyId++;

        emit ProxyCreated(newMirror);

        return newMirror;
    }

    function getProxyAddress(uint256 proxyId) external view returns (address) {
        if (proxyId > _proxyId) revert NonExistingProxy();
        return _implementation.predictDeterministicAddress(bytes32(proxyId));
    }

    function getCurrentProxyId() external view returns (uint256) {
        return _proxyId;
    }

    function getMinInitialInvestment() external view returns (uint256) {
        return _minInitialInvestment;
    }

    function setMinInitialInvestment(uint256 minInitialInvestment) external onlyOwner {
        _minInitialInvestment = minInitialInvestment;
    }

    function getImplementation() external view returns (address) {
        return _implementation;
    }
}