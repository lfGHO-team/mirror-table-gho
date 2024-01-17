//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockERC20 is ERC20, Ownable {
    error InvalidLength();

    constructor() ERC20("RandomToken", "RTK") Ownable(msg.sender){}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
