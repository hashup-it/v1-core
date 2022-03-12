// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "hardhat/console.sol";
import "./Cartridge.sol";
import "./IERC20.sol";

contract HashupIGO {
    struct PaymentMethod {
        address tokenAddress;
        uint256 price;
    }

    mapping(address => uint256) private raisedAmount;
    mapping(address => PaymentMethod) private cartridgeSales;

    
    /**
    * @dev Reverts if no not Cartridge creator.
    */
    modifier isCartridgeCreator(address _cartridgeAddress) {
        require(
            msg.sender == Cartridge(_cartridgeAddress).creator(),
            "HashupIGO: Must be Cartridge creator."
        );
        _;
    }

    /**
    * @notice Sets your Cartridge Token for sale, must be its creator.
    * @param _cartridgeAddress Address of Cartridge token
    * @param _paymentTokenAddress Address of token you want people to pay in (preffrably USD Token)
    * @param _price Unit price of Cartridge
    * @param _amount Amount of Cartridges you want to distribute to IGO
    */
    function setCartridgeForSale(
        address _cartridgeAddress,
        address _paymentTokenAddress,
        uint256 _price,
        uint256 _amount
    ) public isCartridgeCreator(_cartridgeAddress) {
        Cartridge(_cartridgeAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        cartridgeSales[_cartridgeAddress] = PaymentMethod(
            _paymentTokenAddress,
            _price
        );
    }

    /**
    * @param _cartridgeAddress Address of Cartridge token price is checked for
    * @return price Price per unit of cartridge
    */
    function getCartridgePrice(address _cartridgeAddress)
        public
        view
        returns (uint256 price)
    {
        return cartridgeSales[_cartridgeAddress].price;
    }

    /**
    * @param _cartridgeAddress Address of Cartridge payment token is checked for
    * @return price IGO payment token address
    */
    function getPaymentToken(address _cartridgeAddress)
        public
        view
        returns (address paymentToken)
    {
        return cartridgeSales[_cartridgeAddress].tokenAddress;
    }

    function buyCartridge(address _cartridgeAddress, uint256 _amount) public {
        IERC20 paymentTokenContract = IERC20(
            getPaymentToken(_cartridgeAddress)
        );
        Cartridge cartridgeContract = Cartridge(_cartridgeAddress);

        uint256 totalPrice = getCartridgePrice(_cartridgeAddress) * _amount;

        console.log(
            "Allowance is",
            paymentTokenContract.allowance(msg.sender, address(this))
        );
        console.log(
            "Buyer cartridge balance is",
            cartridgeContract.balanceOf(msg.sender)
        );
        console.log("Price is", totalPrice / _amount);
        console.log("Amount bought is", _amount);
        console.log("Needed allowance is", (totalPrice / _amount) * _amount);

        console.log(
            "Token balance",
            paymentTokenContract.balanceOf(msg.sender)
        );

        console.log(
            "Creator token balance",
            paymentTokenContract.balanceOf(cartridgeContract.creator())
        );

        console.log(
            "IGO Contract Cartridge Balance is",
            cartridgeContract.balanceOf(address(this))
        );

        cartridgeContract.transfer(msg.sender, _amount);

        paymentTokenContract.transferFrom(
            (msg.sender),
            cartridgeContract.creator(),
            totalPrice
        );

        console.log(
            "Allowance after selling is",
            paymentTokenContract.allowance(msg.sender, address(this))
        );
        console.log(
            "Token balance after selling is",
            paymentTokenContract.balanceOf(msg.sender)
        );
        console.log(
            "Creator token balance after selling is",
            paymentTokenContract.balanceOf(cartridgeContract.creator())
        );

        console.log(
            "IGO Contract Cartridge Balance after selling is",
            cartridgeContract.balanceOf(address(this))
        );
        console.log(
            "Buyer cartridge balance is",
            cartridgeContract.balanceOf(msg.sender)
        );
    }
}
