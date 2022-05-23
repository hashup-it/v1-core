// SPDX-License-Identifier: MIT
// HashUp Contracts v1
pragma solidity ^0.8.0;

import "./Creatorship.sol";

/**
 * @dev HashUp implementation of ERC20 Metadata that suits HashupCartridge.
 */
contract CartridgeMetadata is Creatorship {
	// Cartridge name
	string private _name;

	// Cartridge symbol
	string private _symbol;

	// Cartridge decimals
	uint8 private constant _decimals = 2;

	// Cartridge color
	string private _color;

	// Other Metadata URL
	string private _metadataUrl;

	/**
	 * @dev Initializes the Cartridge Contract and sets
	 * correct color for provided supply and metadata.
	 */
	constructor(
		string memory name_,
		string memory symbol_,
		string memory metadataUrl_,
		uint256 totalSupply_
	) {
		_name = name_;
		_symbol = symbol_;
		_metadataUrl = metadataUrl_;
		_color = _getColorForSupply(totalSupply_);
	}

	/**
	 * @dev Updates current URL to metadata object that stores configuration of visuals,
	 * descriptions etc. that will appear while browsing on HashUp ecosystem.
	 *
	 * NOTE: We use IPFS by default in HashUp.
	 *
	 * Requirements:
	 * - the caller must be creator
	 */
	function setMetadata(string memory newMetadata) public onlyCreator {
		_metadataUrl = newMetadata;
	}

	/**
	 * NOTE: ERC20 Tokens usually use 18 decimal places but our
	 * CEO said it's stupid and we should use 2 decimals
	 */
	function decimals() public view returns (uint8) {
		return _decimals;
	}

	/**
	 * @dev Returns the color of cartridge. see _getColorForSupply function for details
	 */
	function color() public view returns (string memory) {
		return _color;
	}

	/**
	 * @dev Returns the name of the cartridge.
	 */
	function name() public view returns (string memory) {
		return _name;
	}

	/**
	 * @dev Returns the symbol of the cartridge.
	 */
	function symbol() public view returns (string memory) {
		return _symbol;
	}

	/**
	 * @dev Returns the URL of other cartridge metadata
	 */
	function metadataUrl() public view returns (string memory) {
		return _metadataUrl;
	}

	/**
	 * @dev Returns Cartridge color for specified supply. There are three types
	 * of cartridges based on a totalSupply (numbers without including decimals)
	 * 0 - 133.700 => Gold Cartridge
	 * 133.701 - 100 000 000 => Gray Cartridge
	 * 100 000 001+ => Custom Cartridge
	 *
	 * NOTE: Color doesn't affect Cartridge Token logic, it's used for display
	 * purposes so we can simplify token economics visually.
	 */
	function _getColorForSupply(uint256 supply)
		private
		pure
		returns (string memory color)
	{
		if (supply <= 133_700 * 10**_decimals) {
			return "gold";
		} else if (supply <= 100_000_000 * 10**_decimals) {
			return "gray";
		}
		return "custom";
	}
}
