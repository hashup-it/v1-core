// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity ^0.8;

import "./helpers/CartridgeMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HashupCartridge is IERC20, CartridgeMetadata {
	// Fee to creator when transferring
	uint256 public _creatorFee;

	// Amount gathered from fees
	uint256 public feesCounter;

	// Available decimal places for fee
	uint8 public constant feeDecimals = 1;

	// Hashup Store contract address
	address public _store;

	// Mapping address to Cartridge balance
	mapping(address => uint256) private _balances;

	// Mapping address to mapping of allowances
	mapping(address => mapping(address => uint256)) private _allowed;

	// Cartridge total supply
	uint256 private _totalSupply;

	// Block transferFrom
	bool private _isOpen;

	constructor(
		string memory name_,
		string memory symbol_,
		string memory metadataUrl_,
		uint256 totalSupply_,
		uint256 creatorFee_,
		address store_
	) CartridgeMetadata(name_, symbol_, metadataUrl_, totalSupply_) {
		require(
			creatorFee_ < 100 * 10**feeDecimals,
			"HashupCartridge: Incorrect fee"
		);
		_balances[msg.sender] = totalSupply_;
		_totalSupply = totalSupply_;
		_creatorFee = creatorFee_;
		_store = store_;
	}

	/// @inheritdoc IERC20
	function balanceOf(address owner)
		public
		view
		override
		returns (uint256 balance)
	{
		return _balances[owner];
	}

	function totalSupply() public view override returns (uint256) {
		return _totalSupply;
	}

	function creatorFee() public view returns (uint256) {
		return _creatorFee;
	}

	function store() public view returns (address) {
		return _store;
	}

	function setStore(address newStore) public onlyCreator {
		_store = newStore;
	}

	/// @inheritdoc IERC20
	function allowance(address owner, address spender)
		public
		view
		override
		returns (uint256 remaining)
	{
		return _allowed[owner][spender];
	}

	/// @inheritdoc IERC20
	function approve(address spender, uint256 value)
		public
		override
		returns (bool success)
	{
		_approve(msg.sender, spender, value);
		return true;
	}

	function switchSale() public {
		require(
			msg.sender == creator(),
			"HashupCartridge: only admin can enable transferFrom"
		);
		_isOpen = true;
	}

	/// @dev ERC20
	function _approve(
		address owner,
		address spender,
		uint256 value
	) internal {
		_allowed[owner][spender] = value;
		emit Approval(owner, spender, value);
	}

	function calculateFee(uint256 value, address sender)
		public
		view
		returns (uint256 recipientPart, uint256 creatorPart)
	{
		if (sender == _store || sender == creator()) {
			return (value, 0);
		}
		uint256 fee = (value * _creatorFee) / 1000;
		uint256 remaining = value - fee;

		return (remaining, fee);
	}

	/**
	 * @dev It calls _transferFrom that calculates and sends fee to Cartridge creator
	 **/
	function transfer(address to, uint256 value)
		public
		virtual
		override
		returns (bool success)
	{
		_transferFrom(msg.sender, to, value);
		return true;
	}

	/**
	 * @dev It calls _transferFrom that calculates and sends fee to Cartridge creator
	 * @inheritdoc IERC20
	 */
	function transferFrom(
		address from,
		address to,
		uint256 value
	) public virtual override returns (bool success) {
		require(
			from != address(0),
			"HashupCartridge: transfer from the zero address"
		);

		if (!_isOpen) {
			require(
				from == creator() || from == _store,
				"HashupCartridge: transferFrom is closed"
			);
		}

		_spendAllowance(from, msg.sender, value);
		_transferFrom(from, to, value);

		return true;
	}

	/**
	 * @dev Internal transfer from to remove redundance on transfer
	 * and transferFrom
	 */
	function _transferFrom(
		address _from,
		address _to,
		uint256 _value
	) internal {
		require(
			_to != address(0),
			"HashupCartridge: transfer to the zero address"
		);

		require(
			_balances[_from] >= _value,
			"HashupCartridge: insufficient token balance"
		);

		(uint256 recipientPart, uint256 creatorPart) = calculateFee(
			_value,
			_from
		);

		_balances[_from] -= _value;
		_balances[_to] += recipientPart;

		_balances[creator()] += creatorPart;
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
