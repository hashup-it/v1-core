// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity ^0.8;

import "./helpers/CartridgeMetadata.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


///@title Cartridge ERC20 contract
///@author HashUp.it
///@dev Inherit from this contract in specific type Cartridge implementation
///@notice Hashup Cartridge Token standard contract
///
contract HashupCartridge is IERC20, CartridgeMetadata {
	// Cartridge Fees
	uint256 public feesCounter;
	uint256 public feeForCreator;
	uint8 public constant feeDecimals = 1;
	address public hashupStore;

	// Basic ERC20 logic
	mapping(address => uint256) public balances;
	mapping(address => mapping(address => uint256)) public allowed;
	uint256 public override totalSupply;

	constructor(
		string memory _tokenName,
		string memory _tokenSymbol,
		string memory _metadataUrl,
		uint256 _totalSupply,
		uint256 _fee,
		address _hashupStore
	) CartridgeMetadata(_tokenName, _tokenSymbol, _metadataUrl, _totalSupply) {
		require(_fee < 100 * 10**feeDecimals, "HashupCartridge: Incorrect fee");
		balances[msg.sender] = _totalSupply;
		totalSupply = _totalSupply;
		feeForCreator = _fee;
		hashupStore = _hashupStore;
	}

	/// @inheritdoc IERC20
	function balanceOf(address _owner)
		public
		view
		override
		returns (uint256 balance)
	{
		return balances[_owner];
	}

	/// @inheritdoc IERC20
	function allowance(address _owner, address _spender)
		public
		view
		override
		returns (uint256 remaining)
	{
		return allowed[_owner][_spender];
	}

	/// @inheritdoc IERC20
	function approve(address _spender, uint256 _value)
		public
		override
		returns (bool success)
	{
		_approve(msg.sender, _spender, _value);
		return true;
	}

	/// @dev ERC20 
	function _approve(
		address _owner,
		address _spender,
		uint256 _value
	) internal {
		allowed[_owner][_spender] = _value;
		emit Approval(_owner, _spender, _value);
	}

	/**
	 * @notice Returns how much sender and creator receive after including fees
	 * @dev If invoked by Creator or HashupIGO it returns 0 fee for creator
	 * @param _value Amount of tokens that we want to calculate fee for
	 * @param _sender Address of the user cartridges are sent from
	 * @return recipientPart The value of {metadata} after completion
	 * @return creatorPart The value of {metadata} after completion
	 */
	function calculateFee(uint256 _value, address _sender)
		public
		view
		returns (uint256 recipientPart, uint256 creatorPart)
	{
		if (_sender == hashupStore || _sender == creator()) {
			return (_value, 0);
		}
		uint256 fee = (_value * feeForCreator) / 1000;
		uint256 remaining = _value - fee;

		return (remaining, fee);
	}

	/**
	 * @dev It calls _transferFrom that calculates and sends fee to Cartridge creator
	 **/
	function transfer(address _to, uint256 _value)
		public
		virtual
		override
		returns (bool success)
	{
		_transferFrom(msg.sender, _to, _value);
		return true;
	}

	/**
	 * @dev It calls _transferFrom that calculates and sends fee to Cartridge creator
	 * @inheritdoc IERC20
	 */
	function transferFrom(
		address _from,
		address _to,
		uint256 _value
	) public virtual override returns (bool success) {

		require(_from != address(0), "HashupCartridge: transfer from the zero address");
		_spendAllowance(_from, msg.sender, _value);
		_transferFrom(_from, _to, _value);

		return true;
	}

	function _transferFrom(
		address _from,
		address _to,
		uint256 _value
	) internal {
        require(_to != address(0), "HashupCartridge: transfer to the zero address");

		require(
			balances[_from] >= _value,
			"HashupCartridge: insufficient token balance"
		);

		(uint256 recipientPart, uint256 creatorPart) = calculateFee(
			_value,
			_from
		);

		balances[_from] -= _value;
		balances[_to] += recipientPart;

		balances[creator()] += creatorPart;
		feesCounter += creatorPart;

		emit Transfer(_from, _to, _value);
	}

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     */
	function _spendAllowance(
		address owner,
		address spender,
		uint256 amount
	) internal virtual {
		uint256 currentAllowance = allowance(owner, spender);
		if (currentAllowance != type(uint256).max) {
			require(
				currentAllowance >= amount,
				"HashupCartridge: insufficient allowance"
			);
			unchecked {
				_approve(owner, spender, currentAllowance - amount);
			}
		}
	}
}
