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

	describe("initialization", async () => {
		it("should set creator to deployer", async () => {
			const creator = await hashupGamerProfile.owner();
			expect(creator).to.be.equal(owner.address);
		});
		it("should set users unverified", async () => {
			const isVerified = await (
				await hashupGamerProfile.profiles(userOne.address)
			).isVerified;
			expect(isVerified).to.be.equal(false);
		});
	});

	describe("verifyProfile()", async () => {
		it("should set verified properly", async () => {
			await hashupGamerProfile.verifyProfile(userOne.address, true);
			let isVerified = await (
				await hashupGamerProfile.profiles(userOne.address)
			).isVerified;
			expect(isVerified).to.be.equal(true);
			await hashupGamerProfile.verifyProfile(userOne.address, false);
			isVerified = await (
				await hashupGamerProfile.profiles(userOne.address)
			).isVerified;
			expect(isVerified).to.be.equal(false);
		});
		it("should revert if not creator", async () => {
			await expect(
				hashupGamerProfile
					.connect(userOne)
					.verifyProfile(userOne.address, true)
			).to.be.revertedWith("Ownable: caller is not the owner");
		});
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
			const resProfile = await hashupGamerProfile.profiles(
				userTwo.address
			);
			expect(resProfile.nickname).to.be.equal("softoshi gamermoto");
		});
		it("should give points to refferer and user", async () => {
			await hashupGamerProfile
				.connect(userTwo)
				.updateProfile(
					"softoshi gamermoto 3",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					userOne.address
				);
			await hashupGamerProfile
				.connect(owner)
				.updateProfile(
					"softoshi gamermoto 4",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					userOne.address
				);

			const userOnePoints = await hashupGamerProfile.pointsEarned(
				userOne.address
			);
			const userTwoPoints = await hashupGamerProfile.pointsEarned(
				userTwo.address
			);

			expect(userOnePoints).to.be.equal(20);
			expect(userTwoPoints).to.be.equal(10);
		});
		it("should give points only first time", async () => {
			await hashupGamerProfile
				.connect(userOne)
				.updateProfile(
					"softoshi",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					userTwo.address
				);

			const userOnePoints = await hashupGamerProfile.pointsEarned(
				userOne.address
			);
			const userTwoPoints = await hashupGamerProfile.pointsEarned(
				userTwo.address
			);

			expect(userOnePoints).to.be.equal(10);
			expect(userTwoPoints).to.be.equal(0);
		});
		it("should set nickname owner properly", async () => {
			const nickOwner = await hashupGamerProfile.nicknameOwners(
				"softoshi gamermoto"
			);
			expect(nickOwner).to.be.equal(userOne.address);
			await hashupGamerProfile
				.connect(userOne)
				.updateProfile(
					"softoshi",
					"#ff0eef",
					"cdn.hashup.it/image.jpg",
					"new description",
					"new socials",
					userTwo.address
				);
			const newNickOwner = await hashupGamerProfile.nicknameOwners(
				"softoshi gamermoto"
			);
			expect(newNickOwner).to.be.equal(ethers.constants.AddressZero);
		});
	});
});
