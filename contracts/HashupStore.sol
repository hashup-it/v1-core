// SPDX-License-Identifier: MIT
// HashUp Contracts V1
pragma solidity ^0.8;

import "./HashupCartridge.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev HashUp smart contract for selling games
 */
contract HashupStore is Ownable {
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
	event SentToStore(
		address cartridgeAddress,
		string symbol,
		string name,
		string color,
		uint256 price,
		string metadata
	);

	event CartridgesBought(
		address cartridgeAddress,
		uint256 price,
		uint256 amount
	);

	event CartridgesWithdrawn(address cartridgeAddress, uint256 amount);

	event PriceChanged(address cartridgeAddress, uint256 newPrice);

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
			msg.sender == HashupCartridge(_cartridgeAddress).owner(),
			"HashupStore: must be Cartridge creator."
		);
		_;
	}

	/**
	 * @dev Set cartridges for sale. To supply more Cartridges
	 * later just send them to HashupStore address, to change
	 * current price check `setCartridgePrice` method.
	 *
	 * Requirements:
	 * - caller must be Cartridge creator
	 * - price must be 0 (Not set for sale before)
	 */
	function sendCartridgeToStore(
		address cartridgeAddress,
		uint256 price,
		uint256 amount
	) public onlyCartridgeCreator(cartridgeAddress) {
		require(price != 0, "HashupStore: price cant be 0");
		require(
			cartridgePrices[cartridgeAddress] == 0,
			"HashupStore: Can't set for sale second time"
		);
		// Take allowed Cartridges from sender and send it to store
		HashupCartridge cartridge = HashupCartridge(cartridgeAddress);
		cartridge.transferFrom(msg.sender, address(this), amount);
		// Set Cartridge price
		cartridgePrices[cartridgeAddress] = price;

		emit SentToStore(
			cartridgeAddress,
			cartridge.symbol(),
			cartridge.name(),
			cartridge.color(),
			price,
			cartridge.metadataUrl()
		);
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
			emit CartridgesWithdrawn(_cartridgeAddress, _amount);
			return _amount;
		} else {
			// Return as much as possible
			cartridge.transfer(msg.sender, availableAmount);
			emit CartridgesWithdrawn(_cartridgeAddress, availableAmount);
			return availableAmount;
		}
	}

	/**
	 * @dev Returns unit price for specified Cartridge
	 */
	function getCartridgePrice(address cartridgeAddress)
		public
		view
		returns (uint256 price)
	{
		return cartridgePrices[cartridgeAddress];
	}

	/**
	 * @dev Updates cartridge price
	 *
	 * Requirements:
	 * - caller must be Cartridge creator
	 * - `newPrice` cant be 0
	 */
	function setCartridgePrice(address cartridgeAddress, uint256 newPrice)
		public
		onlyCartridgeCreator(cartridgeAddress)
	{
		require(newPrice != 0, "HashupStore: new price cant be 0");
		cartridgePrices[cartridgeAddress] = newPrice;
		emit PriceChanged(cartridgeAddress, newPrice);
	}

	/**
	 * @dev Splits number between creator, platform and
	 * referrer based on fee percentage and returns result
	 */
	function distributePayment(uint256 totalValue)
		public
		pure
		returns (
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		)
	{
		// Split provided price between platform, referrer and Cartridge creator
		uint256 referrerPart = (totalValue * reflinkFee) / 100;
		uint256 platformPart = (totalValue * platformFee) / 100;
		uint256 creatorPart = totalValue - referrerPart - platformPart;

		return (creatorPart, platformPart, referrerPart);
	}

	/**
	 * @dev Exchange payment token for Cartridge and send
	 * fee to platform
	 *
	 * Requirements:
	 * - Store must have enough cartridges
	 * - Buyer must approve enough paymentToken to Store
	 * - Buyer must have enough paymentToken
	 */
	function buyCartridge(address cartridgeAddress, uint256 amount) public {
		// Initialize tokens
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(cartridgeAddress);

		// Calculate payment distribution
		uint256 totalPrice = getCartridgePrice(cartridgeAddress) * amount;
		(
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// Send cartridges from HashupStore to buyer
		cartridge.transfer(msg.sender, amount);

		// Send payment token to creator
		paymentToken.transferFrom(msg.sender, cartridge.owner(), toCreator);

		// Send platform + refferer part to itself, because no referrer
		paymentToken.transferFrom(
			msg.sender,
			owner(),
			toPlatform + toReferrer
		);

		// Increase raised amount count
		raisedAmount[cartridgeAddress] += toCreator;

		emit CartridgesBought(cartridgeAddress, totalPrice, amount);
	}

	/**
	 * @dev Overloaded 'buyCartridge' that includes refferer address
	 */
	function buyCartridge(
		address cartridgeAddress,
		uint256 amount,
		address referrer
	) public {
		// Initialize tokens
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(cartridgeAddress);

		// Calculate payment distribution
		uint256 totalPrice = getCartridgePrice(cartridgeAddress) * amount;
		(
			uint256 toCreator,
			uint256 toPlatform,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// Send cartridges from HashupStore to buyer
		cartridge.transfer(msg.sender, amount);

		// Send payment token to creator
		paymentToken.transferFrom(msg.sender, cartridge.owner(), toCreator);

		// Send refferal part to referrer
		paymentToken.transferFrom(msg.sender, referrer, toReferrer);

		// Send rest to platform
		paymentToken.transferFrom(msg.sender, owner(), toPlatform);

		// Increase raised and reflink amount count
		raisedAmount[cartridgeAddress] += toCreator;
		reflinkAmount[cartridgeAddress] += toReferrer;

		emit CartridgesBought(cartridgeAddress, totalPrice, amount);
	}
}
