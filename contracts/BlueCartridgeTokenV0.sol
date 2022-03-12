// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Cartridge.sol";
import "hardhat/console.sol";

contract BlueCartridgeTokenV0 is Cartridge {
    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _feeForCreator,
        string memory _metadataUrl,
        address _hashUpIGO
    ) {
        require(
            (_feeForCreator > 0) && (_feeForCreator <= 100 * 10**feeDecimals)
        ); // Pretends the overflow the creators fee

        color = "blue";
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        symbol = _tokenSymbol;
        feeForCreator = _feeForCreator;
        metadata = _metadataUrl;
        hashUpIGO = _hashUpIGO;
    }

    function mint(uint256 _amount)
        public
        onlyCreator
        returns (uint256 mintedAmount)
    {
        uint256 availableAmount = type(uint256).max - totalSupply;

        if (_amount <= availableAmount) {
            balances[msg.sender] += _amount;
            totalSupply += _amount;
        } else {
            balances[msg.sender] += availableAmount;
            totalSupply += availableAmount;
        }
        return _amount;
    }

    function changeFee(uint256 _value)
        public
        onlyCreator
        returns (uint256 newFee)
    {
        require(
            _value > 0 && (_value <= 100 * 10**feeDecimals),
            "Fee is lower than 0 or larger than 100"
        );
        feeForCreator = _value;
        return _value;
    }
}
