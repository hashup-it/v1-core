pragma solidity ^0.8;

import "hardhat/console.sol";

contract HashupIGO {

    struct PaymentMethod {
        address tokenAddress;
        uint256 price;
    }

    //cartridge address to payment data
    mapping(address => PaymentMethod) private cartridgeSales;

    function setCartridgeForSale(address cartridgeAddress, address paymentTokenAddress, uint256 price) public {
        cartridgeSales[cartridgeAddress] = PaymentMethod(paymentTokenAddress, price);
    }

    function getCartridgePrice(address cartridgeAddress) public view returns (uint256 price) {
        console.log(cartridgeSales[cartridgeAddress].price);
        return cartridgeSales[cartridgeAddress].price;
    }

}