pragma solidity ^0.8;

import "./IERC20.sol";
import "./CartridgeOwnable.sol";
import "hardhat/console.sol";


abstract contract Cartridge is CartridgeOwnable, IERC20 {
    uint256 internal maxSupply;
    uint256 internal maxFee;

    uint256 internal constant MAX_UINT256 = 2**256 - 1;
    address public HashUpWallet = 0x5E798CE8e53a3FE16842C233e8802Dc3b09A8451;

    string public name; //fancy name: eg GameX
    uint8 public constant decimals = 2; //How many decimals to show.
    uint8 public constant feeDecimals = 1; //How many decimals to show.
    string public symbol; //An identifier: eg GMX

    uint256 public feeForCreator;
    address public hashUpIGO;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    uint256 public totalSupply;


    string public metadata;



    function setMetadata(string memory _metadataURL)
        public
        onlyCreator
        returns (string memory)
    {
        metadata = _metadataURL;
        return _metadataURL;
    }



    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }

    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        console.log("XD");
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function getAmountAfterFees(uint256 _value, address _from)
        public
        view
        returns (uint256, uint256)
    {
        if (_from == hashUpIGO) {
            return (_value, 0);
        }
        uint256 feesAmount = (_value * feeForCreator) / 1000;

        uint256 toAddress = _value - feesAmount;
        // uint256 toCreator = feesAmount;
        return (toAddress, feesAmount);
    }
}
