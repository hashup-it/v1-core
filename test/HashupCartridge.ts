import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { HashupCartridge__factory } from "../typechain-types/factories/HashupCartridge__factory";
import { HashupCartridge } from "../typechain-types/HashupCartridge";
import { ethers } from "hardhat";

describe("HashupCartridge", async () => {
	let owner: SignerWithAddress;
	let userOne: SignerWithAddress;
	let userTwo: SignerWithAddress;

	let HashupCartridgeFactory: HashupCartridge__factory;
	let hashupCartridge: HashupCartridge;

	const TEST_FEE = 100;

	beforeEach(async () => {
		HashupCartridgeFactory = (await ethers.getContractFactory(
			"HashupCartridge"
		)) as HashupCartridge__factory;
		hashupCartridge = await HashupCartridgeFactory.deploy(
			"Game",
			"GME",
			"url",
			"10000000",
			TEST_FEE,
			ethers.constants.AddressZero
		);
		await hashupCartridge.deployed();

		[owner, userOne, userTwo] = await ethers.getSigners();
	});

	describe("constructor()", async () => {
		it("should revert if incorrect fee", async () => {
			HashupCartridgeFactory = (await ethers.getContractFactory(
				"HashupCartridge"
			)) as HashupCartridge__factory;
			await expect(
				HashupCartridgeFactory.deploy(
					"Game",
					"GME",
					"url",
					"10000000",
					100000,
					ethers.constants.AddressZero
				)
			).to.be.revertedWith("HashupCartridge: Incorrect fee");
			await hashupCartridge.deployed();
		});
		it("should set name properly", async () => {
			const setName = await hashupCartridge.name();
			expect(setName).to.be.equal("Game");
		});
		it("should set symbol properly", async () => {
			const setSymbol = await hashupCartridge.symbol();
			expect(setSymbol).to.be.equal("GME");
		});
		it("should set color properly", async () => {
			const setColor = await hashupCartridge.color();
			expect(setColor).to.be.equal("gold");

			const hashupCartridgeGray = await HashupCartridgeFactory.deploy(
				"Game",
				"GME",
				"url",
				"1000000000",
				TEST_FEE,
				ethers.constants.AddressZero
			);
			await hashupCartridgeGray.deployed();
			expect(await hashupCartridgeGray.color()).to.be.equal("gray");

			const hashupCartridgeCustom = await HashupCartridgeFactory.deploy(
				"Game",
				"GME",
				"url",
				"1000000000000",
				TEST_FEE,
				ethers.constants.AddressZero
			);
			await hashupCartridgeCustom.deployed();
			expect(await hashupCartridgeCustom.color()).to.be.equal("custom");
		});
		it("should set supply properly and give it to creator", async () => {
			const setSupply = await hashupCartridge.totalSupply();
			const creatorBalance = await hashupCartridge.balanceOf(
				owner.address
			);
			expect(setSupply).to.be.equal(10000000);
			expect(creatorBalance).to.be.equal(10000000);
		});
		it("should set creator properly", async () => {
			const setCreator = await hashupCartridge.owner();
			expect(setCreator).to.be.equal(owner.address);
		});
		it("should set metadata url properly", async () => {
			const setMetadata = await hashupCartridge.metadataUrl();
			expect(setMetadata).to.be.equal("url");
		});
		it("should set decimals to 2", async () => {
			const setDecimals = await hashupCartridge.decimals();
			expect(setDecimals).to.be.equal(2);
		});
		it("should set fee correctly", async () => {
			const setFeeForCreator = await hashupCartridge.creatorFee();
			expect(setFeeForCreator).to.be.equal(100);
		});
	});
	describe("approve()", async () => {
		it("should set allowance correctly", async () => {
			await hashupCartridge.connect(owner).approve(userOne.address, 100);
			const allowance = await hashupCartridge.allowance(
				owner.address,
				userOne.address
			);
			expect(allowance).to.be.equal(100);
		});
	});
	describe("switchSale()", async () => {
		it("it should set sale to true", async () => {
			await hashupCartridge.connect(owner).switchSale();
			expect(await hashupCartridge.isOpen()).to.be.equal(true);
		});
		it("it revert if not admin", async () => {
			await expect(
				hashupCartridge.connect(userTwo).switchSale()
			).to.be.revertedWith(
				"HashupCartridge: only admin can enable transferFrom"
			);
		});
		it("it should still be true after second time", async () => {
			await hashupCartridge.connect(owner).switchSale();
			await hashupCartridge.connect(owner).switchSale();
			expect(await hashupCartridge.isOpen()).to.be.equal(true);
		});
	});
	describe("feeCounter()", async () => {
		it("should return 0 at start", async () => {
			expect(await hashupCartridge.feeCounter()).to.be.equal(0);
		});
		it("should increase fee counter after transfer", async () => {
			await hashupCartridge
				.connect(owner)
				.transfer(userOne.address, 1000);
			await hashupCartridge
				.connect(userOne)
				.transfer(userOne.address, 1000);

			expect(await hashupCartridge.feeCounter()).to.be.equal(
				1000 * (TEST_FEE / 1000)
			);
		});
	});
	describe("feeDecimals()", async () => {
		it("should return 1", async () => {
			expect(await hashupCartridge.feeDecimals()).to.be.equal(1);
		});
	});
	describe("transferFrom()", async () => {
		it("should revert for normal users at start", async () => {
			await hashupCartridge
				.connect(owner)
				.transfer(userTwo.address, 1000);
			await hashupCartridge
				.connect(userTwo)
				.approve(userOne.address, 1000);
			await expect(
				hashupCartridge
					.connect(userOne)
					.transferFrom(userTwo.address, userOne.address, 1000)
			).to.be.revertedWith("HashupCartridge: transferFrom is closed");
		});
		it("should not revert for normal users after unblocking it", async () => {
			await hashupCartridge.connect(owner).switchSale();

			await hashupCartridge
				.connect(owner)
				.transfer(userTwo.address, 1000);
			await hashupCartridge
				.connect(userTwo)
				.approve(userOne.address, 1000);
			await hashupCartridge
				.connect(userOne)
				.transferFrom(userTwo.address, userOne.address, 1000);
			expect(
				await hashupCartridge.balanceOf(userOne.address)
			).to.be.equal(900);
		});
		it("should let user spend allowed cartridges and decrease allowance", async () => {
			const balanceBefore = await hashupCartridge.balanceOf(
				owner.address
			);
			await hashupCartridge
				.connect(owner)
				.approve(userOne.address, 1000);
			const allowanceBefore = await hashupCartridge.allowance(
				owner.address,
				userOne.address
			);

			await hashupCartridge
				.connect(userOne)
				.transferFrom(owner.address, userTwo.address, 100);
			const balanceAfter = await hashupCartridge.balanceOf(
				owner.address
			);
			const allowanceAfter = await hashupCartridge.allowance(
				owner.address,
				userOne.address
			);

			expect(balanceAfter).to.be.equal(Number(balanceBefore) - 100);
			expect(allowanceAfter).to.be.equal(Number(allowanceBefore) - 100);
		});
		it("should revert if from zero address", async () => {
			await hashupCartridge
				.connect(owner)
				.approve(userOne.address, 1000);
			await expect(
				hashupCartridge
					.connect(userOne)
					.transferFrom(
						ethers.constants.AddressZero,
						userTwo.address,
						100
					)
			).to.be.revertedWith(
				"HashupCartridge: transfer from the zero address"
			);
		});

		it("should not reduce allowance if its MAX_UINT256", async () => {
			await hashupCartridge
				.connect(owner)
				.approve(userOne.address, ethers.constants.MaxUint256);
			const allowanceBefore = await hashupCartridge.allowance(
				owner.address,
				userOne.address
			);

			await hashupCartridge
				.connect(userOne)
				.transferFrom(owner.address, userTwo.address, 100);
			const allowanceAfter = await hashupCartridge.allowance(
				owner.address,
				userOne.address
			);

			expect(allowanceAfter).to.be.equal(allowanceBefore);
		});
		it("should not pay fees if sender is creator", async () => {
			await hashupCartridge.transfer(userOne.address, 100);
			expect(
				await hashupCartridge.balanceOf(userOne.address)
			).to.be.equal(100);
		});
		it("should revert if allowance is too low", async () => {
			await hashupCartridge
				.connect(owner)
				.approve(userOne.address, 1000);
			await expect(
				hashupCartridge
					.connect(userOne)
					.transferFrom(owner.address, userTwo.address, 10000)
			).to.be.revertedWith("HashupCartridge: insufficient allowance");
		});
		it("should revert if balance is too low", async () => {
			await hashupCartridge
				.connect(owner)
				.approve(userOne.address, "10000000000000000");
			await expect(
				hashupCartridge
					.connect(userOne)
					.transferFrom(
						owner.address,
						userTwo.address,
						"10000000000000"
					)
			).to.be.revertedWith(
				"HashupCartridge: insufficient token balance"
			);
		});
	});
	describe("setStore()", async () => {
		it("should revert if not owner", async () => {
			await expect(
				hashupCartridge.connect(userOne).setStore(userTwo.address)
			).to.be.revertedWith("Ownable: caller is not the owner");
		});
		it("should set store properly", async () => {
			await hashupCartridge.connect(owner).setStore(userTwo.address);
			expect(await hashupCartridge.store()).to.be.equal(userTwo.address);
		});
	});
	describe("setMetadata()", async () => {
		it("should set metadata", async () => {
			await hashupCartridge.setMetadata("new");
			expect(await hashupCartridge.metadataUrl()).to.be.equal("new");
		});
		it("should revert if not creator", async () => {
			await expect(
				hashupCartridge.connect(userTwo).setMetadata("new")
			).to.be.revertedWith("");
		});
	});
	describe("transfer()", async () => {
		it("should revert if recipient is zero address", async () => {
			await expect(
				hashupCartridge.transfer(ethers.constants.AddressZero, 100)
			).to.be.reverted;
		});
		it("should pay fees properly", async () => {
			await hashupCartridge
				.connect(owner)
				.transfer(userOne.address, 100);
			expect(
				await hashupCartridge.balanceOf(userOne.address)
			).to.be.equal(100);

			const recipientBefore = await hashupCartridge.balanceOf(
				userTwo.address
			);
			const ownerBefore = await hashupCartridge.balanceOf(owner.address);

			await hashupCartridge
				.connect(userOne)
				.transfer(userTwo.address, 100);
			const recipientAfter = await hashupCartridge.balanceOf(
				userTwo.address
			);
			const ownerAfter = await hashupCartridge.balanceOf(owner.address);

			expect(recipientAfter).to.be.equal(
				Number(recipientBefore) + (100 * (1000 - TEST_FEE)) / 1000
			);
			expect(ownerAfter).to.be.equal(
				Number(ownerBefore) + (100 * TEST_FEE) / 1000
			);
		});
		it("should not pay fees if sender is creator", async () => {});
	});
});
