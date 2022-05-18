// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity ^0.8;

import "hardhat/console.sol";
import "./HashupCartridge.sol";
import "./helpers/Creatorship.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

/// @title ICO contract for Hashup Cartridges
/// @author HashUp
contract HashupStore is Creatorship {
	// fees
	uint256 public constant reflinkFee = 5;
	uint256 public constant burnFee = 10;

	address public paymentToken;
	address public hashToken;
	ISwapRouter public swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

	event SentToStore(address cartridgeAddress, uint256 price, uint256 amount);
	event CartridgesBought(
		address cartridgeAddress,
		uint256 price,
		uint256 amount
	);
	event CartridgesWithdrawn(address cartridgeAddress, uint256 amount);

	mapping(address => uint256) public raisedAmount;
	mapping(address => uint256) public reflinkAmount;
	mapping(address => uint256) private cartridgePrices;

	constructor(address _hashToken, address _paymentToken) {
		paymentToken = _paymentToken;
		hashToken = _hashToken;
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


	/**
	 * @notice Sets your Cartridge Token for sale, must be its creator.
	 * @param _cartridgeAddress Address of Cartridge token
	 * @param _price Unit price of Cartridge
	 * @param _amount Amount of Cartridges you want to distribute to IGO
	 */
	function sendCartridgeToStore(
		address _cartridgeAddress,
		uint256 _price,
		uint256 _amount
	) public onlyCartridgeCreator(_cartridgeAddress) returns (bool success) {
		// send cartridges to IGO
		HashupCartridge(_cartridgeAddress).transferFrom(
			msg.sender,
			address(this),
			_amount
		);

		// save price
		cartridgePrices[_cartridgeAddress] = _price;

		emit SentToStore(_cartridgeAddress, _price, _amount);

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
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);
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
		return cartridgePrices[_cartridgeAddress];
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
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);

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
		emit CartridgesBought(_cartridgeAddress, totalPrice, _amount);
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
		IERC20 paymentToken = IERC20(paymentToken);
		HashupCartridge cartridge = HashupCartridge(_cartridgeAddress);

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

	function buyBackAndBurn(
		uint256 amountIn
	) private returns(uint burnedAmount) {
		TransferHelper.safeTransferFrom(paymentToken, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(paymentToken, address(swapRouter), amountIn);

		ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: paymentToken,
                tokenOut: hashToken,
                fee: 3000,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn * 10 / 100,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        burnedAmount = swapRouter.exactInputSingle(params);

		IERC20(hashToken).transfer(address(0), burnedAmount);
	}
}
