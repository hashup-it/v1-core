// SPDX-License-Identifier: MIT
// HashUp Contracts V1 

pragma solidity ^0.8.0;

abstract contract Creatorship {
    address private _creator;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferCreatorship(msg.sender);
    }

    function creator() public view virtual returns (address) {
        return _creator;
    }

    modifier onlyCreator() {
        require(creator() == msg.sender, "HashupCreatorship: caller is not creator");
        _;
    }

    function transferCreatorship(address _newCreator) public virtual onlyCreator {
        require(_newCreator != address(0), "HashupCreatorship: cannot set creator to zero address");
        _transferCreatorship(_newCreator);
    }

    function _transferCreatorship(address _newCreator) internal virtual {
        address previousCreator = _creator;
        _creator = _newCreator;
        emit OwnershipTransferred(previousCreator, _newCreator);
    }
}