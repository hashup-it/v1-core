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

    modifier isCartridgeCreator(address _cartridgeAddress) {
        require(
            msg.sender == Cartridge(_cartridgeAddress).creator(),
            "HashupIGO: Must be Cartridge creator."
        );
        _;
    }

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

        console.log(Cartridge(_cartridgeAddress).balanceOf(address(this)));

        cartridgeSales[_cartridgeAddress] = PaymentMethod(
            _paymentTokenAddress,
            _price
        );
    }

    function getCartridgePrice(address _cartridgeAddress)
        public
        view
        returns (uint256 price)
    {
        return cartridgeSales[_cartridgeAddress].price;
    }

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



        cartridgeContract.transfer(msg.sender ,_amount);



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
    }
}
