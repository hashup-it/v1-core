// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "hardhat/console.sol";
import "./Cartridge.sol";
import "./IERC20.sol";

/// @title ICO contract for Hashup Cartridges
/// @author HashUp
contract HashupIGO {
	// fees
	uint256 public constant reflinkFee = 3;
	uint256 public constant burnFee = 10;

	struct PaymentMethod {
		address tokenAddress;
		uint256 price;
	}

	event Sale(
		address cartridgeAddress,
		address paymentTokenAddress,
		uint256 price,
		uint256 amount
	);
	event Buy(address cartridgeAddress, uint256 amount, uint256 price);
	event Withdraw(address cartridgeAddress, uint256 amount);

	mapping(address => uint256) public raisedAmount;
	mapping(address => uint256) public reflinkAmount;
	mapping(address => PaymentMethod) private cartridgeSales;

	/**
	 * @dev Reverts if not Cartridge creator.
	 */
	modifier onlyCartridgeCreator(address _cartridgeAddress) {
		require(
			msg.sender == Cartridge(_cartridgeAddress).creator(),
			"HashupIGO: Must be Cartridge creator."
		);
		_;
	}

	/**
	 * @notice Sets your Cartridge Token for sale, must be its creator.
	 * @param _cartridgeAddress Address of Cartridge token
	 * @param _paymentTokenAddress Address of token you want people to pay in (preffrably USD Token)
	 * @param _price Unit price of Cartridge
	 * @param _amount Amount of Cartridges you want to distribute to IGO
	 */
	function setCartridgeForSale(
		address _cartridgeAddress,
		address _paymentTokenAddress,
		uint256 _price,
		uint256 _amount
	) public onlyCartridgeCreator(_cartridgeAddress) returns (bool success) {
		// send cartridges to IGO
		Cartridge(_cartridgeAddress).transferFrom(
			msg.sender,
			address(this),
			_amount
		);

		// save IGO data
		cartridgeSales[_cartridgeAddress] = PaymentMethod(
			_paymentTokenAddress,
			_price
		);

		return true;
	}

	/**
	 * @notice Transfers cartridges from IGO to creator
	 * @dev If _amount is larger than cartridges left it transfers all cartridges left in IGO
	 * @param _cartridgeAddress Address of withdrawn Cartridge
	 * @param _amount Amount of  Cartridges wanted to be withdrawn
	 * @return withdrawnAmount Amount of cartridges actually withdrawn
	 */
	function withdrawCartridges(address _cartridgeAddress, uint256 _amount)
		external
		onlyCartridgeCreator(_cartridgeAddress)
		returns (uint256 withdrawnAmount)
	{
		Cartridge cartridge = Cartridge(_cartridgeAddress);

		uint256 availableAmount = cartridge.balanceOf(address(this));

		if (availableAmount >= _amount) {
			cartridge.transfer(msg.sender, _amount);
			return _amount;
		} else {
			cartridge.transfer(msg.sender, availableAmount);
			return availableAmount;
		}
	}

	/**
	 * @param _cartridgeAddress Address of Cartridge token price is checked for
	 * @return price Price per unit of cartridge
	 */
	function getCartridgePrice(address _cartridgeAddress)
		public
		view
		returns (uint256 price)
	{
		return cartridgeSales[_cartridgeAddress].price;
	}

	/**
	 * @param _cartridgeAddress Address of Cartridge payment token is checked for
	 * @return paymentToken IGO payment token address
	 */
	function getPaymentToken(address _cartridgeAddress)
		public
		view
		returns (address paymentToken)
	{
		return cartridgeSales[_cartridgeAddress].tokenAddress;
	}

	/**
	 * @notice Distributes value of payment to burn, referral and creator
	 * @dev When no referrer provided sum toRefferer and toCreator to get creator percent
	 * @param _totalValue Value you want to distribute fee for
	 */
	function distributePayment(uint256 _totalValue)
		public
		view
		returns (
			uint256 toCreator,
			uint256 toBurn,
			uint256 toReferrer
		)
	{
		uint256 burnt = (_totalValue * burnFee) / 100;
		uint256 ref = (_totalValue * reflinkFee) / 100;
		uint256 left = _totalValue - ref - burnt;

		return (left, burnt, ref);
	}

	/**
	 * @notice Exchange PaymentToken for Cartridge Tokens
	 * @dev Must set correct allowance before using it
	 * @param _cartridgeAddress Address of Cartridge token bought
	 * @param _amount Amount of Cartridge tokens bough
	 * @return success Whether transaction succeded
	 */
	function buyCartridge(address _cartridgeAddress, uint256 _amount)
		public
		returns (bool success)
	{
		//initialize tokens
		IERC20 paymentToken = IERC20(getPaymentToken(_cartridgeAddress));
		Cartridge cartridge = Cartridge(_cartridgeAddress);

		// calculate total price once
		uint256 totalPrice = getCartridgePrice(_cartridgeAddress) * _amount;

		(
			uint256 toCreator,
			uint256 toBurn,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// swap tokens between creator and buyer
		cartridge.transfer(msg.sender, _amount);
		paymentToken.transferFrom(
			msg.sender,
			cartridge.creator(),
			toCreator + toReferrer
		);

		// increase raised amount count
		raisedAmount[_cartridgeAddress] += toCreator + toReferrer;

		// if transaction succeded
		return true;
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
		//initialize tokens
		IERC20 paymentToken = IERC20(getPaymentToken(_cartridgeAddress));
		Cartridge cartridge = Cartridge(_cartridgeAddress);

		// calculate total price once
		uint256 totalPrice = getCartridgePrice(_cartridgeAddress) * _amount;

		//calculate payment distribution
		(
			uint256 toCreator,
			uint256 toBurn,
			uint256 toReferrer
		) = distributePayment(totalPrice);

		// swap tokens between creator and buyer and give some to referral
		cartridge.transfer(msg.sender, _amount);
		paymentToken.transferFrom(msg.sender, cartridge.creator(), toCreator);
		paymentToken.transferFrom(msg.sender, _referrer, toReferrer);

		// increase raised and reflink amount count
		raisedAmount[_cartridgeAddress] += toCreator;
		reflinkAmount[_cartridgeAddress] += toReferrer;

		// if transaction succeded
		return true;
	}
}
