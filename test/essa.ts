
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

require('./red')

describe("HashupIGO", async () => {


    
    let goldCartridge: GoldCartridgeTokenV0;
    let cartridgeAddress: string;

    let hashupIGO: HashupIGO;
    let igoAddress: string;

    let usdTest: USDTest;
    let tokenAddress: string;

    beforeEach(async () => {
        // IGO DEPLOYMENT
        HashupIGOFactory = (await ethers.getContractFactory("HashupIGO")) as HashupIGO__factory;
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
        USDTestFactory = (await ethers.getContractFactory("USDTest")) as USDTest__factory;
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

    describe("setCartridgeForSale()", async () => {
        const presaleAmount = CARTRIDGE_CONFIG.initialAmount / 2;

        beforeEach(async () => {
            await goldCartridge.approve(igoAddress, presaleAmount);
        });

        it("should revert if not cartridge creator", async () => {
            await expect(
                hashupIGO
                    .connect(userOne)
                    .setCartridgeForSale(cartridgeAddress, tokenAddress, 1, presaleAmount)
            ).to.be.reverted;
        });

        it("should send cartridges to igo", async () => {
          await expect(
              hashupIGO
                  .connect(userOne)
                  .setCartridgeForSale(cartridgeAddress, tokenAddress, 1, presaleAmount)
          ).to.be.reverted;
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
            await expect(hashupIGO.connect(userOne).buyCartridge(cartridgeAddress, salePrice)).to
                .be.reverted;
        });

        it("should revert if payment token balance is insufficient", async () => {
            await usdTest.connect(userTwo).approve(igoAddress, salePrice * amountBought);

            await expect(hashupIGO.connect(userTwo).buyCartridge(cartridgeAddress, salePrice)).to
                .be.reverted;
        });

        it("should pay token to creator", async () => {
            const totalPrice = salePrice * amountBought;
            const creatorInitialBalance = await usdTest.balanceOf(owner.address);
            await usdTest.connect(userOne).approve(igoAddress, totalPrice);

            await hashupIGO.connect(userOne).buyCartridge(cartridgeAddress, amountBought);
            const creatorFinalBalance = await usdTest.balanceOf(owner.address);

            expect(creatorFinalBalance).to.be.equal(Number(creatorInitialBalance) + totalPrice);
        });
    });
});

describe("Cartridge", () => {
    let goldCartridge: GoldCartridgeTokenV0;
    let cartridgeAddress: string;
    let igoAddress = ethers.Wallet.createRandom().address;

    describe("Golden cartrdige", () => {
        beforeEach(async () => {
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
        });

        describe("constructor()", () => {
            it("should set initial amount correctly", async () => {
                const initialAmount = await goldCartridge.totalSupply();
                expect(initialAmount).to.be.equal(CARTRIDGE_CONFIG.initialAmount);
            });

            it("should send all cartridges to creator on creation", async () => {
                const creatorBalance = await goldCartridge.balanceOf(owner.address);
                expect(creatorBalance).to.be.equal(CARTRIDGE_CONFIG.initialAmount);
            });

            it("should set game name correctly", async () => {
                const gameName = await goldCartridge.name();
                expect(gameName).to.be.equal(CARTRIDGE_CONFIG.tokenName);
            });

            it("should set game symbol correctly", async () => {
                const gameSymbol = await goldCartridge.symbol();
                expect(gameSymbol).to.be.equal(CARTRIDGE_CONFIG.tokenSymbol);
            });

            it("should set creator correctly", async () => {
              const creator = await goldCartridge.creator();
              expect(creator).to.be.equal(owner.address);
          });
          describe("approve()", async () => {
            it("should revert if its bigger than max uint256", async () => {
              await expect(goldCartridge.approve(userTwo.address, "115792089237316195423570985008687907853269984665640564039457584007913129639936")).to.be.reverted;
            })
          })
        });
    });
});
