pragma solidity ^0.8;

import "./IERC20.sol";
import "./CartridgeOwnable.sol";
import "hardhat/console.sol";

abstract contract Cartridge is CartridgeOwnable, IERC20 {
    address public constant HashUpWallet =
        0x5E798CE8e53a3FE16842C233e8802Dc3b09A8451;
    address public hashUpIGO;

    uint8 public constant decimals = 2;
    uint8 public constant feeDecimals = 1;

    string public name;
    string public symbol;
    string public metadata;
    string public color;

    uint256 public feesCounter;
    uint256 public feeForCreator;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    uint256 public totalSupply;

    function setMetadata(string memory _metadataURL)
        public
        onlyCreator
        returns (string memory newMetadata)
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
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function getAmountAfterFees(uint256 _value, address _from)
        public
        view
        returns (uint256, uint256)
    {
        if (_from == hashUpIGO || _from == creator()) {
            return (_value, 0);
        }
        uint256 feesAmount = (_value * feeForCreator) / 1000;

        uint256 toAddress = _value - feesAmount;
        // uint256 toCreator = feesAmount;
        return (toAddress, feesAmount);
    }

    function transfer(address _to, uint256 _value)
        public
        virtual
        override
        returns (bool success)
    {
        require(
            balances[msg.sender] >= _value,
            "token balance is lower than the value requested"
        );

        _transferFrom(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public virtual override returns (bool success) {
        uint256 allowances = allowed[_from][msg.sender];

        require(
            balances[_from] >= _value && allowances >= _value,
            "token balance or allowance is lower than amount requested"
        );

        allowed[_from][msg.sender] -= _value;
        _transferFrom(_from, _to, _value);
        return true;
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        (uint256 toAddress, uint256 feesAmmount) = getAmountAfterFees(
            _value,
            _from
        );

        balances[_from] -= _value;
        balances[_to] += toAddress;

        balances[creator()] += feesAmmount;
        feesCounter += feesAmmount;

        console.log("fee", feesAmmount);
        emit Transfer(_from, _to, _value);
    }
}
