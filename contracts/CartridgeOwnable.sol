// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

abstract contract CartridgeOwnable {
    address private _creator;

    constructor() {
        _creator = msg.sender;
    }

    /**
    * @returns creator Address of currently set creator
    */
    function creator() public view returns (address creator) {
        return _creator;
    }

    /**
    * @dev Reverts if no not creator.
    */
    modifier onlyCreator() {
        require(
            msg.sender == _creator,
            "CartrdigeOwnable: Caller is not creator"
        );
        _;
    }
}
