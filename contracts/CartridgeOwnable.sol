pragma solidity ^0.8;

abstract contract CartridgeOwnable {
    address private _creator;

    constructor() {
        _creator = msg.sender;
    }

    function creator() public view returns (address) {
        return _creator;
    }

    modifier onlyCreator() {
        require(msg.sender == _creator, "CartrdigeOwnable: Caller is not creator");
        _;
    }
}
