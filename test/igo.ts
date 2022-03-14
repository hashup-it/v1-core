import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { HashupIGO__factory } from "../typechain-types/factories/HashupIGO__factory";
import { HashupIGO } from "../typechain-types/HashupIGO";
import { GoldCartridgeTokenV0 } from "../typechain-types/GoldCartridgeTokenV0";
import { GoldCartridgeTokenV0__factory } from "../typechain-types/factories/GoldCartridgeTokenV0__factory";
import { RedCartridgeTokenV0 } from "../typechain-types/RedCartridgeTokenV0";
import { RedCartridgeTokenV0__factory } from "../typechain-types/factories/RedCartridgeTokenV0__factory";
import { USDTest__factory } from "../typechain-types/factories/USDTest__factory";
import { USDTest } from "../typechain-types/USDTest";
import { ethers } from "hardhat";

const CARTRIDGE_CONFIG = {
	initialAmount: 10000,
	tokenName: "TestGame",
	tokenSymbol: "TGM",
	cartridgeType: 0,
	feeForCreator: 1,
	metadataUrl: "www.ipfs.pl",
};

const USDTEST_CONFIG = {
	initialSupply: 10000,
	tokenName: "USDTest",
	decimals: 18,
	tokenSymbol: "USDT",
};

let owner: SignerWithAddress;
let userOne: SignerWithAddress;
let userTwo: SignerWithAddress;

let GoldCartridgeFactory: GoldCartridgeTokenV0__factory;
let HashupIGOFactory: HashupIGO__factory;
let USDTestFactory: USDTest__factory;

require("./red");

describe("HashupIGO", async () => {
	let goldCartridge: GoldCartridgeTokenV0;
	let cartridgeAddress: string;

	let hashupIGO: HashupIGO;
	let igoAddress: string;

	let usdTest: USDTest;
	let tokenAddress: string;

	beforeEach(async () => {
		// IGO DEPLOYMENT
		HashupIGOFactory = (await ethers.getContractFactory(
			"HashupIGO"
		)) as HashupIGO__factory;
		hashupIGO = await HashupIGOFactory.deploy();

		await hashupIGO.deployed();
		igoAddress = hashupIGO.address;

		// CARTRIDGE DEPLOYMENT
		GoldCartridgeFactory = (await ethers.getContractFactory(
			"GoldCartridgeTokenV0"
		)) as GoldCartridgeTokenV0__factory;
		goldCartridge = await GoldCartridgeFactory.deploy(
			CARTRIDGE_CONFIG.initialAmount,
			CARTRIDGE_CONFIG.tokenName,
			CARTRIDGE_CONFIG.tokenSymbol,
			CARTRIDGE_CONFIG.feeForCreator,
			CARTRIDGE_CONFIG.metadataUrl,
			igoAddress
		);

		await goldCartridge.deployed();
		cartridgeAddress = goldCartridge.address;

		// USDT TEST DEPLOYMENT
		USDTestFactory = (await ethers.getContractFactory(
			"USDTest"
		)) as USDTest__factory;
		usdTest = await USDTestFactory.deploy(
			USDTEST_CONFIG.initialSupply,
			USDTEST_CONFIG.tokenName,
			USDTEST_CONFIG.decimals,
			USDTEST_CONFIG.tokenSymbol
		);

		await usdTest.deployed();
		tokenAddress = usdTest.address;

		// GET USERS
		[owner, userOne, userTwo] = await ethers.getSigners();
	});

	describe("withdrawCartridges()", async () => {
		const saleAmount = 1000;
		const salePrice = 10;

		beforeEach(async () => {
			await goldCartridge.approve(igoAddress, saleAmount);
			await hashupIGO.setCartridgeForSale(
				cartridgeAddress,
				tokenAddress,
				salePrice,
				saleAmount
			);
		});

		it("should return cartridges to creator", async () => {
			const withdrawnAmount = 100;
			const initialBalance = await goldCartridge.balanceOf(owner.address);

			await hashupIGO.withdrawCartridges(
				cartridgeAddress,
				withdrawnAmount
			);

			expect(await goldCartridge.balanceOf(owner.address)).to.be.equal(
				initialBalance.add(100)
			);
		});
		it("should return all available cartridges to creator if _amount is too high", async () => {
			const withdrawnAmount = 10000000;
			const initialCreatorBalance = await goldCartridge.balanceOf(
				owner.address
			);
			const availableAmount = await goldCartridge.balanceOf(
				hashupIGO.address
			);

			await hashupIGO.withdrawCartridges(
				cartridgeAddress,
				withdrawnAmount
			);

			expect(await goldCartridge.balanceOf(owner.address)).to.be.equal(
				initialCreatorBalance.add(availableAmount)
			);
		});
		it("should revert if not creator", async () => {
			await expect(
				hashupIGO
					.connect(userTwo)
					.withdrawCartridges(cartridgeAddress, 1)
			).to.be.reverted;
		});

		it("should return withdrawn amount on success", async () => {
			const withdrawnAmount = 100;
			expect(
				await hashupIGO.callStatic.withdrawCartridges(
					cartridgeAddress,
					withdrawnAmount
				)
			).to.be.equal(withdrawnAmount);
		});
		it("should return available amount if _amount is bigger than available on success", async () => {
			const withdrawnAmount = 1000000;
			const availableAmount = await goldCartridge.balanceOf(
				hashupIGO.address
			);

			expect(
				await hashupIGO.callStatic.withdrawCartridges(
					cartridgeAddress,
					withdrawnAmount
				)
			).to.be.equal(availableAmount);
		});
	});

	describe("setCartridgeForSale()", async () => {
		const presaleAmount = CARTRIDGE_CONFIG.initialAmount / 2;

		beforeEach(async () => {
			await goldCartridge.approve(igoAddress, presaleAmount);
		});

		it("should revert if not cartridge creator", async () => {
			await expect(
				hashupIGO
					.connect(userOne)
					.setCartridgeForSale(
						cartridgeAddress,
						tokenAddress,
						1,
						presaleAmount
					)
			).to.be.reverted;
		});

		it("should send cartridges to igo without fee", async () => {
			await hashupIGO.setCartridgeForSale(
				cartridgeAddress,
				tokenAddress,
				1,
				presaleAmount
			);

			expect(await goldCartridge.balanceOf(igoAddress)).to.be.equal(
				presaleAmount
			);
		});

		it("should add game to sale mapping", async () => {
			const passedPrice = 10;

			await hashupIGO.setCartridgeForSale(
				cartridgeAddress,
				tokenAddress,
				passedPrice,
				CARTRIDGE_CONFIG.initialAmount / 2
			);

			const price = await hashupIGO.getCartridgePrice(cartridgeAddress);

			expect(price).to.be.equal(passedPrice);
		});
	});

	describe("buyCartridge()", async () => {
		const salePrice = 10;
		const amountBought = 10;
		const presaleAmount = CARTRIDGE_CONFIG.initialAmount / 2;

		beforeEach(async () => {
			await goldCartridge.approve(igoAddress, presaleAmount);
			await hashupIGO.setCartridgeForSale(
				cartridgeAddress,
				tokenAddress,
				salePrice,
				presaleAmount
			);
			await usdTest.connect(owner).transfer(userOne.address, 500);
		});

		it("should revert if no allowance provided", async () => {
			await expect(
				hashupIGO
					.connect(userOne)
					["buyCartridge(address,uint256)"](
						cartridgeAddress,
						salePrice
					)
			).to.be.reverted;
		});

		it("should revert if payment token balance is insufficient", async () => {
			await usdTest
				.connect(userTwo)
				.approve(igoAddress, salePrice * amountBought);

			await expect(
				hashupIGO
					.connect(userTwo)
					["buyCartridge(address,uint256)"](
						cartridgeAddress,
						salePrice
					)
			).to.be.reverted;
		});

		it("should pay token to creator", async () => {
			const totalPrice = salePrice * amountBought;
			const creatorInitialBalance = await usdTest.balanceOf(
				owner.address
			);
			await usdTest.connect(userOne).approve(igoAddress, totalPrice);

			await hashupIGO
				.connect(userOne)
				["buyCartridge(address,uint256)"](
					cartridgeAddress,
					amountBought
				);
			const creatorFinalBalance = await usdTest.balanceOf(owner.address);

			expect(creatorFinalBalance).to.be.equal(
				creatorInitialBalance.add(totalPrice)
			);
		});

        it("should pay fee to referrer", async () => {

            await usdTest
				.connect(userOne)
				.approve(igoAddress, salePrice * amountBought);

            await hashupIGO.connect(userOne)["buyCartridge(address,uint256,address)"](cartridgeAddress, amountBought, userTwo.address);

            

        })
	});
});
