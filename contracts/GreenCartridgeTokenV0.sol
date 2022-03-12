pragma solidity ^0.8;

import "./Cartridge.sol";
import "hardhat/console.sol";

contract GreenCartridgeTokenV0 is Cartridge {
    uint256 internal constant maxSupply = 100_000_000 * 10**decimals;

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        string memory _tokenSymbol,
        string memory _metadataUrl,
        address _hashUpIGO
    ) {
        require(_initialAmount <= maxSupply);

        color = "green";
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        symbol = _tokenSymbol;
        feeForCreator = 0;
        metadata = _metadataUrl;
        hashUpIGO = _hashUpIGO;
    }
}
