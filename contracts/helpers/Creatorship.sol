// SPDX-License-Identifier: MIT
// HashUp Contracts V1

pragma solidity ^0.8.0;

abstract contract Creatorship {
    
	// Address of creator
	address private _creator;

	event OwnershipTransferred(
		address indexed previousOwner,
		address indexed newOwner
	);

	/**
	 * @dev Initializes creator to contract deployer
	 */
	constructor() {
		_transferCreatorship(msg.sender);
	}

	/**
	 * @dev Returns the creator
	 */
	function creator() public view returns (address) {
		return _creator;
	}

	/**
	 * @dev Requires caller to be creator
	 */
	modifier onlyCreator() {
		require(
			creator() == msg.sender,
			"HashupCreatorship: caller is not creator"
		);
		_;
	}

	/**
	 * @dev See {_transferOwnership}
	 *
	 * Requirements:
	 * - newCreator cannot be zero address
	 * - the caller must be creator
	 */
	function transferCreatorship(address newCreator) public onlyCreator {
		require(
			newCreator != address(0),
			"HashupCreatorship: cannot set creator to zero address"
		);
		_transferCreatorship(newCreator);
	}

	/**
	 * @dev Transfers ownership to new creator
	 *
	 * Emits {OwnershipTransferred} event.
	 */
	function _transferCreatorship(address _newCreator) private {
		address previousCreator = _creator;
		_creator = _newCreator;
		emit OwnershipTransferred(previousCreator, _newCreator);
	}
}
