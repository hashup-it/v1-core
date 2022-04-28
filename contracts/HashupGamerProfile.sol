pragma solidity ^0.8;
 
import "./IERC20.sol";
import "hardhat/console.sol";
 
contract HashupGamerProfile {
 
    uint256 constant reward = 10;

    event UpdateProfile(address user, string newNickname, string newColor, string newAvatar, string newDescription, string newSocials, address referrer);

    struct Gamer {
        string nickname;
        string color;
        string avatar;
        string description;
        string socials;
    }
 
    mapping(address => bool) public gotReward;
    mapping(address => uint256) public pointsEarned;
    mapping(string => address) public nicknameOwners;
    mapping(address => Gamer) public profiles;
 
    function updateProfile(
        string memory _nickname, 
        string memory _color,
        string memory _avatar,
        string memory _description,
        string memory _socials,
        address _refferer
    ) public {
        // update profile values
        setNickname(_nickname);
        profiles[msg.sender].socials = _socials;
        profiles[msg.sender].description = _description;
        profiles[msg.sender].color = _color;
        profiles[msg.sender].avatar = _avatar;

        // give reward if not earned yet
        if(!gotReward[msg.sender]) {
            // toggle reward and increase count
            gotReward[msg.sender] = true;
            pointsEarned[msg.sender] += reward;
            // if referrer is not sender or zero address increase points
            if(_refferer != address(0) && _refferer != msg.sender) {
                pointsEarned[_refferer] += reward / 2;
            }
        }

        emit UpdateProfile(msg.sender, _nickname, _color, _avatar, _description, _socials, _refferer);
    }

    function setNickname(string memory _nickname) internal {
        //must be non-taken
        require(nicknameOwners[_nickname] == address(0) || nicknameOwners[_nickname] == msg.sender);
        //free up old nickname
        nicknameOwners[profiles[msg.sender].nickname] = address(0);
        //set profile nickname
        profiles[msg.sender].nickname = _nickname;
        //set nickname owner
        nicknameOwners[_nickname] = msg.sender;
    }
 
}