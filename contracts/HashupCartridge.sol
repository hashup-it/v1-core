// SPDX-License-Identifier: MIT
// HashUp Contracts V1
pragma solidity ^0.8;

import "./helpers/CartridgeMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev HashUp profile Contract, used for managing profiles,
 * in future we want to use it to sending ERC20 Cartridges
 * providing only friend name and more
 */
contract HashupCartridge is IERC20, CartridgeMetadata {
	// Fee to creator on transfer
	uint256 public _creatorFee;

	// Amount of Cartridges gathered from fees
	uint256 private _feeCounter;

	// HashUp Store contract address
	address private _store;

	// Mapping address to Cartridge balance
	mapping(address => uint256) private _balances;

	// Mapping address to mapping of allowances
	mapping(address => mapping(address => uint256)) private _allowed;

	// Total amount of Cartridges
	uint256 private _totalSupply;

	// Whether {transferFrom} is available for users
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
			creatorFee_ < 100 * 10**feeDecimals(),
			"HashupCartridge: Incorrect fee"
		);
		_balances[msg.sender] = totalSupply_;
		_totalSupply = totalSupply_;
		_creatorFee = creatorFee_;
		_store = store_;
	}

	/**
	 * @dev See {IERC20-balanceOf}.
	 */
	function balanceOf(address owner)
		public
		view
		override
		returns (uint256 balance)
	{
		return _balances[owner];
	}

	/**
	 * @dev See {IERC20-totalSupply}.
	 */
	function totalSupply() public view override returns (uint256) {
		return _totalSupply;
	}

	/**
	 * @dev Returns percentage of amount that goes to the
	 * creator when transferring Cartridges
	 */
	function creatorFee() public view returns (uint256) {
		return _creatorFee;
	}

	/**
	 * @dev Returns sum of of Cartridges gathered
	 * by creator via transfer fees
	 */
	function feeCounter() public view returns (uint256) {
		return _feeCounter;
	}

	/**
	 * @dev Amount of decimals in fee number, its 1 so
	 * for example 5 is 0.5%  and 50 is 5%
	 */
	function feeDecimals() public pure returns (uint8) {
		return 1;
	}

	/**
	 * @dev Address of HashUp store that cartridge will
	 * be listed on. We save it here so interaction with
	 * store (for example sending games to it) doesn't
	 * take any fees
	 */
	function store() public view returns (address) {
		return _store;
	}

	/**
	 * @dev Address of HashUp store that cartridge will
	 * be listed on. We save it here so interaction with
	 * store (for example sending games to it) doesn't
	 * take any fees
	 */
	function setStore(address newStore) public onlyOwner {
		_store = newStore;
	}

	/**
	 * @dev Stores whether transferFrom is blocked,
	 * it can be unlocked by admin to enable it for
	 * usage in other smart contracts for example DEX
	 */
	function isOpen() public view returns (bool) {
		return _isOpen;
	}

	/**
	 * @dev See {IERC20-allowance}.
	 */
	function allowance(address owner, address spender)
		public
		view
		override
		returns (uint256 remaining)
	{
		return _allowed[owner][spender];
	}

	/**
	 * @dev Sets `_isOpen` to true and enables transferFrom
	 *
	 * Requirements:
	 * - sender must be admin
	 */
	function switchSale() public {
		require(
			msg.sender == owner(),
			"HashupCartridge: only admin can enable transferFrom"
		);
		_isOpen = true;
	}

	/**
	 * @dev See {IERC20-approve}.
	 *
	 * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
	 * `transferFrom`. This is semantically equivalent to an infinite approval.
	 *
	 * Requirements:
	 * - `spender` cannot be the zero address.
	 */
	function approve(address spender, uint256 value)
		public
		override
		returns (bool success)
	{
		_approve(msg.sender, spender, value);
		return true;
	}

	/**
	 * @dev See {IERC20-approve}.
	 */
	function _approve(
		address owner,
		address spender,
		uint256 value
	) internal {
		require(
			owner != address(0),
			"HashupCartridge: approve from the zero address"
		);
		require(
			spender != address(0),
			"HashupCartridge: approve to the zero address"
		);
		_allowed[owner][spender] = value;
		emit Approval(owner, spender, value);
	}

	/**
	 * @dev Splits value between recipient and Cartridge creator
	 *
	 * NOTE: If sender is store or owner it doesn't count
	 * creator fee and gives everything to recipient
	 **/
	function calculateFee(uint256 value, address sender)
		public
		view
		returns (uint256 recipientPart, uint256 creatorPart)
	{
		if (sender == _store || sender == owner()) {
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
				from == owner() || from == _store,
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

		_balances[owner()] += creatorPart;
		_feeCounter += creatorPart;

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
