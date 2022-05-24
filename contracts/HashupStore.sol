// SPDX-License-Identifier: MIT
// HashUp Contracts V1
pragma solidity ^0.8;

import "hardhat/console.sol";
import "./HashupCartridge.sol";
import "./helpers/Creatorship.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HashupStore is Creatorship {
	// Percent of profits for referrer
	uint256 public constant reflinkFee = 5;

	// Percent of profits for HashUp
	uint256 public constant platformFee = 20;

	// Address of ERC20 token used for payments
	address public paymentToken;

	// Mapping HashupCartridge address to amount raised by creator
	mapping(address => uint256) public raisedAmount;

	// Mapping HashupCartridge address to amount raised by referrers
	mapping(address => uint256) public reflinkAmount;

	// Mapping HashupCartridge address to its price
	mapping(address => uint256) private cartridgePrices;

	// Events
	event SentToStore(address cartridgeAddress, uint256 price, uint256 amount);

	event CartridgesBought(
		address cartridgeAddress,
		uint256 price,
		uint256 amount
	);

	event CartridgesWithdrawn(address cartridgeAddress, uint256 amount);

	/**
	 * @dev Initializes contract with `paymentToken` address
	 */
	constructor(address paymentToken_) {
		paymentToken = paymentToken_;
	}

	/**
	 * @dev Reverts if not Cartridge creator.
	 */
	modifier onlyCartridgeCreator(address _cartridgeAddress) {
		require(
			msg.sender == HashupCartridge(_cartridgeAddress).creator(),
			"HashupStore: must be Cartridge creator."
		);
		_;
	}

	function sendCartridgeToStore(
		address cartridgeAddress,
		uint256 price,
		uint256 amount
	) public onlyCartridgeCreator(cartridgeAddress) {
		// Take allowed Cartridges from sender and send it to store
		HashupCartridge(cartridgeAddress).transferFrom(
			msg.sender,
			address(this),
			amount
		);
		// Set Cartridge price
		cartridgePrices[cartridgeAddress] = price;

		emit SentToStore(cartridgeAddress, price, amount);
	}

	function withdrawCartridges(address _cartridgeAddress, uint256 _amount)
		external
		onlyCartridgeCreator(_cartridgeAddress)
		returns (uint256 withdrawnAmount)
	{
		// Initialize cartridge and get amount left in store
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);
		uint256 availableAmount = cartridge.balanceOf(address(this));

		if (availableAmount >= _amount) {
			// Return all cartridges
			cartridge.transfer(msg.sender, _amount);
			return _amount;
		} else {
			// Return as much as possible
			cartridge.transfer(msg.sender, availableAmount);
			return availableAmount;
		}
	}

	function getCartridgePrice(address _cartridgeAddress)
		public
		view
		returns (uint256 price)
	{
		return cartridgePrices[_cartridgeAddress];
	}

	function distributePayment(uint256 _totalValue)
		public
		view
		returns (
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		)
	{
		// Split provided price between platform, referrer and Cartridge creator
		uint256 platform = (_totalValue * platformFee) / 100;
		uint256 ref = (_totalValue * reflinkFee) / 100;
		uint256 left = _totalValue - ref - platform;

		return (left, platform, ref);
	}

	function buyCartridge(address _cartridgeAddress, uint256 _amount) public {
		// Initialize tokens
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);

		// Calculate payment distribution
		uint256 totalPrice = getCartridgePrice(_cartridgeAddress) * _amount;
		(
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// Send cartridges from HashupStore to buyer
		cartridge.transfer(msg.sender, _amount);

		// Send payment token to creator
		paymentToken.transferFrom(msg.sender, cartridge.creator(), toCreator);

		// Send platform + refferer part to itself, because no referrer
		paymentToken.transferFrom(
			msg.sender,
			address(this),
			toPlatform + toReferrer
		);

		// Increase raised amount count
		raisedAmount[_cartridgeAddress] += toCreator;

		emit CartridgesBought(_cartridgeAddress, totalPrice, _amount);
	}

	/**
	 * @notice Exchange PaymentToken for Cartridge Tokens with refferal fee
	 * @dev Must set correct allowance before using it,
	 * @param _cartridgeAddress Address of Cartridge token bought
	 * @param _amount Amount of Cartridge tokens bough
	 * @param _referrer Address of user that will get {reflink}% refferer fee
	 * @return success Whether transaction succeded
	 */
	function buyCartridge(
		address _cartridgeAddress,
		uint256 _amount,
		address _referrer
	) public returns (bool success) {
		// Initialize tokens
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);

		// Calculate payment distribution
		uint256 totalPrice = getCartridgePrice(_cartridgeAddress) * _amount;
		(
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// Send cartridges from HashupStore to buyer
		cartridge.transfer(msg.sender, _amount);

		// Send payment token to creator
		paymentToken.transferFrom(msg.sender, cartridge.creator(), toCreator);

		// Send refferal part to referrer
		paymentToken.transferFrom(msg.sender, _referrer, toReferrer);

		// Send rest to platoform
		paymentToken.transferFrom(msg.sender, address(this), toPlatform);

		// Increase raised and reflink amount count
		raisedAmount[_cartridgeAddress] += toCreator;
		reflinkAmount[_cartridgeAddress] += toReferrer;

		emit CartridgesBought(_cartridgeAddress, totalPrice, _amount);
	}
}
