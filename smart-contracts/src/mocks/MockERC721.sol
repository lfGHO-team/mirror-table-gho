//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";



contract MockERC721 is ERC721, Ownable {

    constructor() ERC721("RandomNFT721", "RNFT") Ownable(msg.sender) {
        _mint(owner(), 10);
    }

    function mint(address to, uint256 amount) internal {
        for (uint256 i= 0; i < amount; i++){
            _mint(to, i);
        }
    }
}