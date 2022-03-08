import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { HashupIGO__factory } from "../typechain-types/factories/HashupIGO__factory";
import { HashupIGO } from "../typechain-types/HashupIGO";
import { GoldCartridgeTokenV0 } from "../typechain-types/GoldCartridgeTokenV0";
import { GoldCartridgeTokenV0__factory } from "../typechain-types/factories/GoldCartridgeTokenV0__factory";
import { USDTest__factory } from "../typechain-types/factories/USDTest__factory";
import { USDTest } from "../typechain-types/USDTest";

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

describe("HashupIGO", async () => {
    let owner: SignerWithAddress;
    let userOne: SignerWithAddress;
    let userTwo: SignerWithAddress;

    let GoldCartridgeFactory: GoldCartridgeTokenV0__factory;
    let goldCartridge: GoldCartridgeTokenV0;
    let cartridgeAddress: string;

    let HashupIGOFactory: HashupIGO__factory;
    let hashupIGO: HashupIGO;
    let igoAddress: string;

    let USDTestFactory: USDTest__factory;
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
            CARTRIDGE_CONFIG.cartridgeType,
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
                    .setCartridgeForSale(
                        cartridgeAddress,
                        tokenAddress,
                        1,
                        presaleAmount
                    )
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

            expect(creatorFinalBalance).to.be.equal( Number(creatorInitialBalance) + totalPrice)
        });

    });
});
