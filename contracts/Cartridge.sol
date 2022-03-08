pragma solidity ^0.8;

import "./IERC20.sol";

abstract contract Cartridge is IERC20 {
    function setMetadata(string memory _metadataURL)
        public
        virtual
        returns (string memory);

    function getAmountAfterFees(uint256 _value, address _from)
        public
        virtual
        view
        returns (uint256, uint256);

    function creator() public virtual view returns (address);
}
