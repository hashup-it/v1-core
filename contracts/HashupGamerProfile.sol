// SPDX-License-Identifier: MIT
// HashUp Contracts V1 

pragma solidity ^0.8;

import "./helpers/Creatorship.sol";

/// @title User profiles contract for HashUp platform
/// @author Hashup
/// @notice You can use this contract to customise your profile on HashUp
contract HashupGamerProfile is Creatorship {
	uint256 constant reward = 10;
	uint256 constant refReward = 5;

	event UpdatedProfile(
		address user,
		string newNickname,
		string newColor,
		string newAvatar,
		string newDescription,
		string newSocials,
		address referrer
	);
	event VerifiedUser(address user, bool value);

	struct Gamer {
		string nickname;
		string color;
		string avatar;
		string description;
		string socials;
		bool isVerified;
	}

	mapping(address => bool) public gotReward;
	mapping(address => uint256) public pointsEarned;

	mapping(string => address) public nicknameOwners;
	mapping(address => Gamer) public profiles;

	/// @notice Update profile data and get reward points for first time
	/// @dev Decided to set everything at once for simplicity
	/// @param _nickname Nickname on HashUp
	/// @param _color Hex profile theme color
	/// @param _avatar URL of profile image
	/// @param _avatar Text description of profile
	/// @param _socials Stringified JSON social media data ex. "{"media" : "url", ...}"
	function updateProfile(
		string memory _nickname,
		string memory _color,
		string memory _avatar,
		string memory _description,
		string memory _socials,
		address _refferer
	) public {
		// update nickname in necessary
		setNickname(_nickname);

		// update remaining profile data
		Gamer storage profile = profiles[msg.sender];
		profile.socials = _socials;
		profile.description = _description;
		profile.color = _color;
		profile.avatar = _avatar;

		// give reward if not earned yet
		if (!gotReward[msg.sender]) {
			// toggle reward and increase count
			gotReward[msg.sender] = true;
			pointsEarned[msg.sender] += reward;
			// if referrer is not sender or zero address increase points
			if (_refferer != address(0) && _refferer != msg.sender) {
				pointsEarned[_refferer] += refReward;
			}
		}

		emit UpdatedProfile(
			msg.sender,
			_nickname,
			_color,
			_avatar,
			_description,
			_socials,
			_refferer
		);
	}

	/// @notice Verify users on HashUp platform, for ex. Youtubers
	/// @param _user Address of user we want to modify
	/// @param _value Whether user should be set to verified or unverified
	function verifyProfile(address _user, bool _value) public onlyCreator {
		profiles[_user].isVerified = _value;
		emit VerifiedUser(_user, _value);
	}

	/// @dev This function is split from UpdateProfile for simplicity
	/// @param _nickname Nickname to set or update
	function setNickname(string memory _nickname) internal {
		//must be non-taken
		require(
			nicknameOwners[_nickname] == address(0) ||
				nicknameOwners[_nickname] == msg.sender,
			"HashupGamerProfile: Provided nickname is taken"
		);
		if (nicknameOwners[_nickname] != msg.sender) {
			//free up old nickname
			nicknameOwners[profiles[msg.sender].nickname] = address(0);
			//set profile nickname
			profiles[msg.sender].nickname = _nickname;
			//set nickname owner
			nicknameOwners[_nickname] = msg.sender;
		}
	}
}
