//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC4626Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MultiSigWallet} from "./MultiSig.sol";


contract Ghotique is ERC4626Upgradeable, MultiSigWallet {

 
    mapping(address => uint256) public shareHolder;
    mapping(address => bool) public accreditedInvestor;

    event InvestorAdded(address indexed investor);
    event InvestorRemoved(address indexed investor);

    modifier onlyAccreditedInvestors() {
        require(accreditedInvestor[msg.sender] || isOwner[msg.sender] , "Not an accredited investor");
        _;
    }

    constructor() {
        _disableInitializers();
    }
   /**
     * @dev Initializes the contract
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param asset_ The address of the ERC20 asset.
     */
    function initialize(
        string memory name_,
        string memory symbol_,
        address asset_,
        address[] memory owners_,
        uint256 numConfirmationsRequired_,
        uint256 minInitialInvestment_
    ) public initializer {
        __ERC4626_init(IERC20(asset_));
        __ERC20_init_unchained(name_, symbol_);
        __Multisig_init_unchained(owners_, numConfirmationsRequired_);
        _deposit(_msgSender(), tx.origin, minInitialInvestment_, minInitialInvestment_);
    }

    function addInvestor(address investor) public onlySigners() {
        require(!accreditedInvestor[investor], "Already an investor");
        require(investor != address(0), "Invalid address");

        accreditedInvestor[investor] = true;
        emit InvestorAdded(investor);
    }

    function removeInvestor(address investor) public onlySigners() {
        require(accreditedInvestor[investor], "Not an investor");
        require(investor != address(0), "Invalid address");

        accreditedInvestor[investor] = false;
        emit InvestorRemoved(investor);
    }

        /**
    * @notice function to deposit assets and receive vault token in exchange
    * @param assets amount of the asset token
    * @param receiver address of the receiver
    */
    function deposit(uint256 assets, address receiver) public override onlyAccreditedInvestors() returns (uint256) {
        uint256 maxAssets = maxDeposit(receiver);
        if (assets > maxAssets) {
            revert ERC4626ExceededMaxDeposit(receiver, assets, maxAssets);
        }
        // Increase the share of the user
        shareHolder[msg.sender] += assets;
        uint256 shares = previewDeposit(assets);
        _deposit(_msgSender(), receiver, assets, shares);

        return shares;
    }

    function redeem(uint256 shares, address receiver, address owner) public override returns (uint256) {
        require(shareHolder[msg.sender] > 0, "Not a share holder");
        uint256 maxShares = maxRedeem(owner);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxRedeem(owner, shares, maxShares);
        }

        uint256 assets = previewRedeem(shares);
        shareHolder[msg.sender] -= assets;
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return assets;
    }

        function mint(uint256 shares, address receiver) public override onlyAccreditedInvestors() returns (uint256) {
        uint256 maxShares = maxMint(receiver);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxMint(receiver, shares, maxShares);
        }

        uint256 assets = previewMint(shares);
        _deposit(_msgSender(), receiver, assets, shares);

        return assets;
    }


}

