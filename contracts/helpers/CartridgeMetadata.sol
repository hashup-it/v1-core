// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity ^0.8.0;

import "./Creatorship.sol";

///@title Cartridge Metadata Contract
///@author HashUp.it
///@dev Inherit from this contract in specific type Cartridge implementation
contract CartridgeMetadata is Creatorship {
	string public metadataUrl;
	string public symbol;
	string public name;
	string public color;
	uint8 public constant decimals = 2;

	constructor(
		string memory _name,
		string memory _symbol,
		string memory _metadataUrl,
		uint256 _totalSupply
	) {
		name = _name;
		symbol = _symbol;
		metadataUrl = _metadataUrl;
		color = getColorForSupply(_totalSupply);
	}

	/// @notice Maps total supply to Cartridge color
	/// @param _totalSupply Total supply of cartridge
	/// @return color Cartridge color for specified supply
	function getColorForSupply(uint256 _totalSupply) private pure returns(string memory color) {
		if (_totalSupply <= 133_700 * 10**decimals) {
			return "gold";
		} else if (_totalSupply <= 100_000_000 * 10**decimals) {
			return "gray";
		}
		return "custom";
	}

	/// @notice Set or overwrite cartridge {metadata} field
	/// @dev Should be saved on ipfs in JSON format
	/// @param _metadataUrl IPFS Metadata URL
	/// @return newMetadata The value of {metadata} after completion
	function setMetadata(string memory _metadataUrl)
		public
		onlyCreator
		returns (string memory newMetadata)
	{
		metadataUrl = _metadataUrl;
		return _metadataUrl;
	}
}
