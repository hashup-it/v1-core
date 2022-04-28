import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { HashupGamerProfile__factory } from "../typechain-types/factories/HashupGamerProfile__factory";
import { HashupGamerProfile } from "../typechain-types/HashupGamerProfile";
import { ethers } from "hardhat";

describe("HashupGamerProfile", async () => {
	let owner: SignerWithAddress;
	let userOne: SignerWithAddress;
	let userTwo: SignerWithAddress;

	let HashupGamerProfileFactory: HashupGamerProfile__factory;
	let hashupGamerProfile: HashupGamerProfile;

	beforeEach(async () => {
		HashupGamerProfileFactory = (await ethers.getContractFactory(
			"HashupGamerProfile"
		)) as HashupGamerProfile__factory;
		hashupGamerProfile = await HashupGamerProfileFactory.deploy();
		await hashupGamerProfile.deployed();

		[owner, userOne, userTwo] = await ethers.getSigners();
	});

	describe("updateProfile()", async () => {
		beforeEach(async () => {
			await hashupGamerProfile
				.connect(userOne)
				.updateProfile(
					"softoshi gamermoto",
					"#ff0ff0",
					"cdn.hashup.it/image.png",
					"description",
					"socials",
					ethers.constants.AddressZero
				);
		});
		it("should set nickname properly", async () => {
			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.nickname).to.be.equal("softoshi gamermoto");
		});
		it("should set color properly", async () => {
			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.color).to.be.equal("#ff0ff0");
		});
		it("should set avatar url properly", async () => {
			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.avatar).to.be.equal("cdn.hashup.it/image.png");
		});
		it("should set description properly", async () => {
			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.description).to.be.equal("description");
		});
		it("should set socials properly", async () => {
			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.socials).to.be.equal("socials");
		});
		it("should let update without changing nickname", async () => {
			await hashupGamerProfile
				.connect(userOne)
				.updateProfile(
					"softoshi gamermoto",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					ethers.constants.AddressZero
				);

			const resProfile = await hashupGamerProfile.profiles(
				userOne.address
			);
			expect(resProfile.nickname).to.be.equal("softoshi gamermoto");
			expect(resProfile.color).to.be.equal("#ff0eef");
			expect(resProfile.avatar).to.be.equal("cdn.hashup.it/image.jpg");
			expect(resProfile.description).to.be.equal("new description");
			expect(resProfile.socials).to.be.equal("new socials");
		});
		it("should revert if setting taken nickname", async () => {
			await expect(
				hashupGamerProfile
					.connect(userTwo)
					.updateProfile(
						"softoshi gamermoto",
						"#ff0eef",
						"cdn.hashup.it/image.jpg",
						"new description",
						"new socials",
						ethers.constants.AddressZero
					)
			).to.be.reverted;
		});
		it("should free up nickname on change", async () => {
			await hashupGamerProfile
				.connect(userOne)
				.updateProfile(
					"softoshi gamermoto 2",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					ethers.constants.AddressZero
				);
			await hashupGamerProfile
				.connect(userTwo)
				.updateProfile(
					"softoshi gamermoto",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					ethers.constants.AddressZero
				);
			const resProfile = await hashupGamerProfile.profiles(userTwo.address);
			expect(resProfile.nickname).to.be.equal("softoshi gamermoto");

		});
	});
});
