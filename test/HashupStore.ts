import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HashupStore__factory } from "../typechain-types/factories/HashupStore__factory";
import { HashupStore } from "../typechain-types/HashupStore";
import { HashupCartridge__factory } from "../typechain-types/factories/HashupCartridge__factory";
import { HashupCartridge } from "../typechain-types/HashupCartridge";
import { HashupToken__factory } from "../typechain-types/factories/HashupToken__factory";
import { HashupToken } from "../typechain-types/HashupToken";
import { TestToken__factory } from "../typechain-types/factories/TestToken__factory";
import { TestToken } from "../typechain-types/TestToken";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("HashupStore", async () => {
	let owner: SignerWithAddress;
	let userOne: SignerWithAddress;
	let userTwo: SignerWithAddress;
	let developer: SignerWithAddress;

	let HashupCartridgeFactory: HashupCartridge__factory;
	let hashupCartridge: HashupCartridge;
	let HashupTokenFactory: HashupToken__factory;
	let hashupToken: HashupToken;
	let TestTokenFactory: TestToken__factory;
	let testToken: TestToken;
	let hashupStore: HashupStore;
	let HashupStoreFactory: HashupStore__factory;

	const TEST_FEE = 100;

	beforeEach(async () => {
		HashupCartridgeFactory = (await ethers.getContractFactory(
			"HashupCartridge"
		)) as HashupCartridge__factory;
		HashupStoreFactory = (await ethers.getContractFactory(
			"HashupStore"
		)) as HashupStore__factory;
		HashupTokenFactory = (await ethers.getContractFactory(
			"HashupToken"
		)) as HashupToken__factory;
		TestTokenFactory = (await ethers.getContractFactory(
			"TestToken"
		)) as TestToken__factory;

		[owner, developer, userOne, userTwo] = await ethers.getSigners();

		hashupToken = await HashupTokenFactory.deploy();
		await hashupToken.deployed();
		testToken = await TestTokenFactory.connect(userTwo).deploy();
		await testToken.deployed();

		hashupStore = await HashupStoreFactory.deploy(testToken.address);
		await hashupStore.deployed();

		hashupCartridge = await HashupCartridgeFactory.connect(
			developer
		).deploy(
			"Game",
			"GME",
			"url",
			"10000000",
			TEST_FEE,
			hashupStore.address
		);
		await hashupCartridge.deployed();
	});

	describe("constructor()", async () => {
		it("should set creator properly", async () => {
			expect(await hashupStore.creator()).to.be.equal(owner.address);
		});
		it("should set payment token properly", async () => {
			expect(await hashupStore.paymentToken()).to.be.equal(
				testToken.address
			);
		});
	});
	describe("distributePayment()", async () => {
		it("should split payment correctly", async () => {
			const payments = await hashupStore.distributePayment(100);
			expect(payments.toPlatform).to.be.equal(20);
			expect(payments.toCreator).to.be.equal(75);
			expect(payments.toReferrer).to.be.equal(5);
		});
	});
	describe("withdrawCartridges()", async () => {
		beforeEach(async () => {
			await hashupCartridge
				.connect(developer)
				.approve(hashupStore.address, 200);
			await hashupStore
				.connect(developer)
				.sendCartridgeToStore(hashupCartridge.address, 100, 200);
		});
		it("should revert if not cartridge creator", async () => {
			await expect(
				hashupStore
					.connect(userTwo)
					.withdrawCartridges(hashupCartridge.address, 100)
			).to.be.revertedWith("HashupStore: must be Cartridge creator.");
		});
		it("should withdraw cartridges properly", async () => {
			const inStoreBefore = await hashupCartridge.balanceOf(
				hashupStore.address
			);
			const developerBefore = await hashupCartridge.balanceOf(
				developer.address
			);
			await hashupStore
				.connect(developer)
				.withdrawCartridges(hashupCartridge.address, 50);
			const inStoreAfter = await hashupCartridge.balanceOf(
				hashupStore.address
			);
			const developerAfter = await hashupCartridge.balanceOf(
				developer.address
			);

			expect(inStoreAfter).to.be.equal(Number(inStoreBefore) - 50);
			expect(developerAfter).to.be.equal(Number(developerBefore) + 50);
		});
		it("should withdraw all cartridges left if taking too much", async () => {
			const inStoreBefore = await hashupCartridge.balanceOf(
				hashupStore.address
			);
			const developerBefore = await hashupCartridge.balanceOf(
				developer.address
			);
			await hashupStore
				.connect(developer)
				.withdrawCartridges(
					hashupCartridge.address,
					ethers.constants.MaxUint256
				);
			const inStoreAfter = await hashupCartridge.balanceOf(
				hashupStore.address
			);
			const developerAfter = await hashupCartridge.balanceOf(
				developer.address
			);

			expect(inStoreAfter).to.be.equal(0);
			expect(developerAfter).to.be.equal(
				Number(developerBefore) + Number(inStoreBefore)
			);
		});
	});
	describe("sendCartridgeToStore()", async () => {
		it("should revert if not allowed", async () => {
			await expect(
				hashupStore
					.connect(developer)
					.sendCartridgeToStore(hashupCartridge.address, 100, 200)
			).to.be.revertedWith("HashupCartridge: insufficient allowance");
		});
		it("should should set price correctly and take cartridges", async () => {
			await hashupCartridge
				.connect(developer)
				.approve(hashupStore.address, 200);
			await hashupStore
				.connect(developer)
				.sendCartridgeToStore(hashupCartridge.address, 100, 200);
			const price = await hashupStore.getCartridgePrice(
				hashupCartridge.address
			);
			expect(price).to.be.equal(100);
			const amountTaken = await hashupCartridge.balanceOf(
				hashupStore.address
			);
			expect(amountTaken).to.be.equal(200);
		});
		it("should revert if sending second time", async () => {
			await hashupCartridge
				.connect(developer)
				.approve(hashupStore.address, 200);
			await hashupStore
				.connect(developer)
				.sendCartridgeToStore(hashupCartridge.address, 100, 200);
			await hashupCartridge
				.connect(developer)
				.approve(hashupStore.address, 200);
			await expect(
				hashupStore
					.connect(developer)
					.sendCartridgeToStore(hashupCartridge.address, 100, 200)
			).to.be.revertedWith("HashupStore: Can't set for sale second time");
		});
	});
	describe("setCartridgePrice()", async () => {

	})
	describe("buyCartridge()", async () => {
		const amountBought = 100;
		const price = 100;
		beforeEach(async () => {
			await hashupCartridge
				.connect(developer)
				.approve(hashupStore.address, 200);

			await hashupStore
				.connect(developer)
				.sendCartridgeToStore(hashupCartridge.address, price, 200);

			testToken
				.connect(userTwo)
				.approve(hashupStore.address, price * amountBought);
		});

		it("distributes payment properly", async () => {
			const balanceBefore = await testToken.balanceOf(userTwo.address);
			const cartridgesBefore = await hashupCartridge.balanceOf(
				userTwo.address
			);
			await hashupStore
				.connect(userTwo)
				["buyCartridge(address,uint256)"](
					hashupCartridge.address,
					amountBought
				);
			expect(
				await hashupCartridge.balanceOf(userTwo.address)
			).to.be.equal(cartridgesBefore.add(amountBought));
			expect(await testToken.balanceOf(userTwo.address)).to.be.equal(
				balanceBefore.sub(amountBought * price)
			);
			expect(await testToken.balanceOf(developer.address)).to.be.equal(
				amountBought * price * (3 / 4)
			);
			expect(await testToken.balanceOf(owner.address)).to.be.equal(
				amountBought * price * (1 / 4)
			);
		});
		it("distributes payment properly with reflink", async () => {
			const balanceBefore = await testToken.balanceOf(userTwo.address);
			const cartridgesBefore = await hashupCartridge.balanceOf(
				userTwo.address
			);
			await hashupStore
				.connect(userTwo)
				["buyCartridge(address,uint256,address)"](
					hashupCartridge.address,
					amountBought,
					userOne.address
				);

			expect(
				await hashupCartridge.balanceOf(userTwo.address)
			).to.be.equal(cartridgesBefore.add(amountBought));

			expect(await testToken.balanceOf(userTwo.address)).to.be.equal(
				balanceBefore.sub(amountBought * price)
			);
			expect(await testToken.balanceOf(developer.address)).to.be.equal(
				amountBought * price * (3 / 4)
			);
			expect(await testToken.balanceOf(owner.address)).to.be.equal(
				amountBought * price * (1 / 5)
			);
			expect(await testToken.balanceOf(userOne.address)).to.be.equal(
				amountBought * price * (1 / 20)
			);
		});
		it("should revert if not enough cartridges in store", async () => {
			await testToken
				.connect(userTwo)
				.approve(hashupStore.address, ethers.constants.MaxUint256);
			await expect(
				hashupStore
					.connect(userTwo)
					["buyCartridge(address,uint256,address)"](
						hashupCartridge.address,
						amountBought * 1000,
						userOne.address
					)
			).to.be.revertedWith(
				"HashupCartridge: insufficient token balance"
			);
		});
		it("should revert if not enough test token with referral", async () => {
			await testToken
				.connect(userTwo)
				.approve(hashupStore.address, ethers.constants.MaxUint256);
			await testToken
				.connect(userTwo)
				.transfer(
					userOne.address,
					await testToken.balanceOf(userTwo.address)
				);
			await expect(
				hashupStore
					.connect(userTwo)
					["buyCartridge(address,uint256,address)"](
						hashupCartridge.address,
						amountBought,
						userOne.address
					)
			).to.be.revertedWith("ERC20: transfer amount exceeds balance");
		});
		it("should revert if not enough test token", async () => {
			await testToken
				.connect(userTwo)
				.approve(hashupStore.address, ethers.constants.MaxUint256);
			await testToken
				.connect(userTwo)
				.transfer(
					userOne.address,
					await testToken.balanceOf(userTwo.address)
				);
			await expect(
				hashupStore
					.connect(userTwo)
					["buyCartridge(address,uint256)"](
						hashupCartridge.address,
						amountBought
					)
			).to.be.revertedWith("ERC20: transfer amount exceeds balance");
		});
	});
});
