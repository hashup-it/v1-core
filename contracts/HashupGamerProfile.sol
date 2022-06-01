// SPDX-License-Identifier: MIT
// HashUp Contracts V1
pragma solidity ^0.8;

import "./helpers/Creatorship.sol";

/**
 * @dev HashUp profile Contract, used for managing profiles,
 * in future we want to use it to sending ERC20 Cartridges
 * providing only friend name and more
 */
contract HashupGamerProfile is Creatorship {
	// Size of reward for registration
	uint256 constant reward = 10;

	// Reward for reffering users
	uint256 constant refReward = 5;

	// Mapping user to whether he got reward
	mapping(address => bool) public gotReward;

	// Mapping address to amount of points
	mapping(address => uint256) public pointsEarned;

	// Mapping nickname to user address
	mapping(string => address) public nicknameOwners;

	// Mapping address to profile data
	mapping(address => Gamer) public profiles;

	// Events
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

	// Gamer profile structure
	struct Gamer {
		string nickname;
		string color;
		string avatar;
		string description;
		string socials;
		bool isVerified;
	}

	/**
	 * @dev Updates game profile with provided data,
	 *
	 * NOTE: Must provide everything for simplicity of the
	 * registration process, may change it in future versions
	 */
	function updateProfile(
		string memory nickname,
		string memory color,
		string memory avatar,
		string memory description,
		string memory socials,
		address refferer
	) public {
		// update nickname in necessary
		setNickname(nickname);

		// update remaining profile data
		Gamer storage profile = profiles[msg.sender];
		profile.socials = socials;
		profile.description = description;
		profile.color = color;
		profile.avatar = avatar;

		// give reward if not earned yet
		if (!gotReward[msg.sender]) {
			// toggle reward and increase count
			gotReward[msg.sender] = true;
			pointsEarned[msg.sender] += reward;
			// if referrer is not sender or zero address increase points
			if (refferer != address(0) && refferer != msg.sender) {
				pointsEarned[refferer] += refReward;
			}
		}

		emit UpdatedProfile(
			msg.sender,
			nickname,
			color,
			avatar,
			description,
			socials,
			refferer
		);
	}

	/**
	 * @dev Function to verify user profile, for example
	 * youtubers or team members.
	 *
	 * Requirements:
	 * - the caller must be creator
	 */
	function verifyProfile(address user, bool value) public onlyCreator {
		profiles[user].isVerified = value;
		emit VerifiedUser(user, value);
	}

	/**
	 * @dev Split nickname setting function for simplicity,
	 * if provided the same nickname as before it just passes
	 *
	 * Requirements:
	 * - nickname owner must be zero address or caller
	 */
	function setNickname(string memory nickname) internal {
		//must be non-taken
		require(
			nicknameOwners[nickname] == address(0) ||
				nicknameOwners[nickname] == msg.sender,
			"HashupGamerProfile: Provided nickname is taken"
		);
		if (nicknameOwners[nickname] != msg.sender) {
			//free up old nickname
			nicknameOwners[profiles[msg.sender].nickname] = address(0);
			//set profile nickname
			profiles[msg.sender].nickname = nickname;
			//set nickname owner
			nicknameOwners[nickname] = msg.sender;
		}
	}
}
