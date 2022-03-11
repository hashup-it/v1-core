pragma solidity ^0.8;

import "./Cartridge.sol";
import "hardhat/console.sol";

contract GoldCartridgeTokenV0 is Cartridge {


    uint256 internal constant maxSupply = 133700 * 10**decimals;
    uint256 internal constant maxFee = 5 * 10**feeDecimals;

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _feeForCreator,
        string memory _metadataUrl,
        address _hashUpIGO
    ) {
        require(_initialAmount <= maxSupply); 
        require((_feeForCreator > 0) && (_feeForCreator < maxFee)); // Pretends the overflow the creators fee

        balances[msg.sender] = _initialAmount; // Give the creator all initial tokens
        totalSupply = _initialAmount; // Update total supply
        name = _tokenName; // Set the name for display purposes
        symbol = _tokenSymbol; // Set the symbol for display purposes
        feeForCreator = _feeForCreator; // Set the fee for Creator
        metadata = _metadataUrl;
        hashUpIGO = _hashUpIGO;
        console.log(creator());
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(
            balances[msg.sender] >= _value,
            "token balance is lower than the value requested"
        );


        (uint256 toAddress, uint256 feesAmmount) = getAmountAfterFees(
            _value,
            msg.sender
        );

        balances[msg.sender] -= _value;
        balances[_to] += toAddress;

        feesCounter += feesAmmount;
        balances[creator()] += feesAmmount;

        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        uint256 allowances = allowed[_from][msg.sender];
        require(
            balances[_from] >= _value && allowances >= _value,
            "token balance or allowance is lower than amount requested"
        );

        (uint256 toAddress, uint256 feesAmmount) = getAmountAfterFees(
            _value,
            _from
        );

        balances[_from] -= _value;
        balances[_to] += toAddress;

        feesCounter += feesAmmount;
        balances[creator()] += feesAmmount;


        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }
}
