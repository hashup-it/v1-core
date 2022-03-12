pragma solidity ^0.8;

import "./Cartridge.sol";
import "hardhat/console.sol";

contract GrayCartridgeTokenV0 is Cartridge {
    uint256 internal constant maxSupply = 100_000_000 * 10**decimals;
    uint256 internal constant maxFee = 20 * 10**feeDecimals;

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _feeForCreator,
        string memory _metadataUrl,
        address _hashUpIGO
    ) {
        require(_initialAmount <= maxSupply);
        require((_feeForCreator > 0) && (_feeForCreator <= maxFee)); // Pretends the overflow the creators fee

        color = "gray";
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        symbol = _tokenSymbol;
        feeForCreator = _feeForCreator;
        metadata = _metadataUrl;
        hashUpIGO = _hashUpIGO;
    }
}