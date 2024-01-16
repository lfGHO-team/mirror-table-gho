//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NonExistingProxy();
error ZeroAddress();
contract GHOtiqueFactory is Ownable {
    using Clones for address;

    uint256 private _proxyId;
    address private _implementation;

    event ProxyCreated(address proxy);

    constructor (address implementation) Ownable(msg.sender) {
        if (implementation == address(0)) revert ZeroAddress();
        _implementation = implementation;
    }

    function createNewMirrorTable() external payable returns (address) {
        address newMirror = _implementation.cloneDeterministic(bytes32(_proxyId));
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
}