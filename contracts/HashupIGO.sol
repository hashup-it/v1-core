pragma solidity ^0.8;

import "hardhat/console.sol";
import "./ICartridge.sol";

contract HashupIGO {
    struct PaymentMethod {
        address tokenAddress;
        uint256 price;
    }

    //cartridge address to payment data
    mapping(address => PaymentMethod) private cartridgeSales;

    modifier isCartridgeCreator(address _cartridgeAddress) {
        require(msg.sender == ICartridge(_cartridgeAddress).creator());
        _;
    }

    function setCartridgeForSale(
        address cartridgeAddress,
        address paymentTokenAddress,
        uint256 price
    ) public {
        cartridgeSales[cartridgeAddress] = PaymentMethod(
            paymentTokenAddress,
            price
        );
    }

    function getCartridgePrice(address _cartridgeAddress)
        public
        view
        returns (uint256 price)
    {
        return cartridgeSales[_cartridgeAddress].price;
    }
}
