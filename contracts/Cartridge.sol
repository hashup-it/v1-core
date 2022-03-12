// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./IERC20.sol";
import "./CartridgeOwnable.sol";
import "hardhat/console.sol";

/**
 * @title Cartridge ERC 20 Compatible abstract contract
 * @author HashUp.it
 * @dev Inherit from this contract in specific type Cartridge implementation
 * @notice Hashup Cartridge Token standard contract
 **/
abstract contract Cartridge is CartridgeOwnable, IERC20 {
	address public constant HashUpWallet =
		0x5E798CE8e53a3FE16842C233e8802Dc3b09A8451;
	address public hashUpIGO;

	uint8 public constant decimals = 2;
	uint8 public constant feeDecimals = 1;

	string public name;
	string public symbol;
	string public metadata;
	string public color;

	uint256 public feesCounter;
	uint256 public feeForCreator;

	mapping(address => uint256) public balances;
	mapping(address => mapping(address => uint256)) public allowed;
	uint256 public totalSupply;

	/**
	 * @notice Set or overwrite cartridge {metadata} field
	 * @dev Should be saved on ipfs in JSON format
	 * @param _metadataUrl IPFS Metadata URL
	 * @return newMetadata The value of {metadata} after completion
	 */
	function setMetadata(string memory _metadataUrl)
		public
		onlyCreator
		returns (string memory newMetadata)
	{
		metadata = _metadataUrl;
		return _metadataUrl;
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
		allowed[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	/**
	 * @notice Returns how much sender and creator receive after including fees
	 * @dev If invoked by Creator or HashupIGO it returns 0 fee for creator
	 * @param _value Amount of tokens that we want to calculate fee for
	 * @param _from Address of the user cartridges are sent from
	 * @return recipientPart The value of {metadata} after completion
	 * @return creatorPart The value of {metadata} after completion
	 */
	function calculateFee(uint256 _value, address _from)
		public
		view
		returns (uint256 recipientPart, uint256 creatorPart)
	{
		if (_from == hashUpIGO || _from == creator()) {
			return (_value, 0);
		}
		uint256 fee = (_value * feeForCreator) / 1000;
		console.log("essa1", fee);
		uint256 left = _value - fee;

		return (left, fee);
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
		require(
			balances[msg.sender] >= _value,
			"token balance is lower than the value requested"
		);

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
		uint256 allowances = allowed[_from][msg.sender];

		require(
			balances[_from] >= _value && allowances >= _value,
			"token balance or allowance is lower than amount requested"
		);

		allowed[_from][msg.sender] -= _value;
		_transferFrom(_from, _to, _value);
		return true;
	}

	function _transferFrom(
		address _from,
		address _to,
		uint256 _value
	) internal {
		(uint256 recipientPart, uint256 creatorPart) = calculateFee(
			_value,
			_from
		);

		console.log("left", recipientPart);
		console.log("fee", creatorPart);

		balances[_from] -= _value;
		balances[_to] += recipientPart;

		balances[creator()] += creatorPart;
		feesCounter += creatorPart;

		console.log("fee", creatorPart);
		emit Transfer(_from, _to, _value);
	}
}
