// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract HashupToken is ERC20, ERC20Burnable {
	constructor() ERC20("Hashup Token", "HASH") {
		_mint(msg.sender, 1_000_000_000 * 10**decimals());
	}
}
