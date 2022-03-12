pragma solidity ^0.8;

import "./Cartridge.sol";
import "hardhat/console.sol";

contract RedCartridgeTokenV0 is Cartridge {
    uint256 internal constant maxSupply = 100_000_000 * 10**decimals;

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        string memory _tokenSymbol,
        string memory _metadataUrl,
        address _hashUpIGO
    ) {
        require(_initialAmount <= maxSupply, "RedCartridgeToken: initial supply too high");

        color = "red";

        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        symbol = _tokenSymbol;

        feeForCreator = 0;
        metadata = _metadataUrl;

        hashUpIGO = _hashUpIGO;
    }

    modifier onlyCreatorOrIGO() {
        require(msg.sender == creator() || msg.sender == hashUpIGO, "RedCartridge: can't transfer unless IGO or Creator");
        _;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override onlyCreatorOrIGO returns (bool success) {
        Cartridge.transferFrom(_from, _to, _value);
        return true;
    }

    function transfer(address _to, uint256 _value)
        public
        override
        onlyCreatorOrIGO
        returns (bool success)
    {
        Cartridge.transfer(_to, _value);
        return true;
    }
}
