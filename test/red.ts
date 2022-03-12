import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

import { RedCartridgeTokenV0 } from "../typechain-types/RedCartridgeTokenV0";
import { RedCartridgeTokenV0__factory } from "../typechain-types/factories/RedCartridgeTokenV0__factory";
import { ethers } from "hardhat";

describe("RedCartrdigeTokenV0", async () => {
    const CARTRIDGE_CONFIG = {
        supply: 10000000000,
        name: "Red Cartridge Game",
        symbol: "RCG",
        metadata: "www.ifps.com",
        igo: ethers.Wallet.createRandom().address,
    };

    let creator: SignerWithAddress;
    let userOne: SignerWithAddress;
    let userTwo: SignerWithAddress;

    let cartridgeFactory: RedCartridgeTokenV0__factory;
    let cartridgeContract: RedCartridgeTokenV0;

    beforeEach(async () => {
        cartridgeFactory = (await ethers.getContractFactory(
            "RedCartridgeTokenV0"
        )) as RedCartridgeTokenV0__factory;
        cartridgeContract = await cartridgeFactory.deploy(
            CARTRIDGE_CONFIG.supply,
            CARTRIDGE_CONFIG.name,
            CARTRIDGE_CONFIG.symbol,
            CARTRIDGE_CONFIG.metadata,
            CARTRIDGE_CONFIG.igo
        );

        [creator, userOne, userTwo] = await ethers.getSigners();
        await cartridgeContract.deployed();
    });

    describe("constructor()", () => {
        it("should revert if supply too high", async () => {
            await expect(
                cartridgeFactory.deploy(
                    CARTRIDGE_CONFIG.supply + 1,
                    CARTRIDGE_CONFIG.name,
                    CARTRIDGE_CONFIG.symbol,
                    CARTRIDGE_CONFIG.metadata,
                    CARTRIDGE_CONFIG.igo
                )
            ).to.be.reverted;
        });
        it("should set total supply correctly", async () => {
            const supplyResponse = await cartridgeContract.totalSupply();
            expect(supplyResponse).to.be.equal(CARTRIDGE_CONFIG.supply);
        });
        it("should set creator balance to total supply", async () => {
            const creatorBalance = await cartridgeContract.balanceOf(creator.address);
            expect(creatorBalance).to.be.equal(CARTRIDGE_CONFIG.supply);
        });
        it("should set metadata correctly", async () => {
            const metadataResponse = await cartridgeContract.metadata();
            expect(metadataResponse).to.be.equal(CARTRIDGE_CONFIG.metadata);
        });
        it("should set color correctly", async () => {
            const colorResponse = await cartridgeContract.color();
            expect(colorResponse).to.be.equal("red");
        });
        it("should set name correctly", async () => {
            const nameResponse = await cartridgeContract.name();
            expect(nameResponse).to.be.equal(CARTRIDGE_CONFIG.name);
        });
        it("should set symbol correctly", async () => {
            const symbolResponse = await cartridgeContract.symbol();
            expect(symbolResponse).to.be.equal(CARTRIDGE_CONFIG.symbol);
        });
        it("should set creator fee to 0", async () => {
            const feeResponse = await cartridgeContract.feeForCreator();
            expect(feeResponse).to.be.equal(0);
        });
    });
    describe("setMetadata()", async () => {
        it("should revert if not creator", async () => {
            await expect(cartridgeContract.connect(userOne).setMetadata("url")).to.be.reverted;
        });
        it("should change current metadata url", async () => {
            const newUrl = "www.ipfs.pl";
            await cartridgeContract.setMetadata(newUrl);
            expect(await cartridgeContract.metadata()).to.be.equal(newUrl);
        });
    });
    describe("transfer()", () => {
        it("should let owner transfer and set recipient balance correctly", async () => {
            const amountSent = 100;
            await cartridgeContract.transfer(userOne.address, amountSent);
            const recipientBalance = await cartridgeContract.balanceOf(userOne.address);
            expect(recipientBalance).to.be.equal(amountSent);
        });
        it("should revert if balance is unsufficient", async () => {
            const currentBalance = await cartridgeContract.balanceOf(creator.address);
            await expect(cartridgeContract.transfer(userOne.address, Number(currentBalance) + 1))
                .to.be.reverted;
        });
        it("should revert if regular user tries to send cartridges", async () => {
            await cartridgeContract.transfer(userOne.address, 1000);
            await expect(cartridgeContract.connect(userOne).transfer(userTwo.address, 500)).to.be
                .reverted;
        });
    });
    describe("approve()", () => {
        it("should set allowance correctly", async () => {
            const approvedAmount = 100;
            await cartridgeContract.approve(userTwo.address, approvedAmount);
            expect(await cartridgeContract.allowance(creator.address, userTwo.address)).to.be.equal(approvedAmount);
        })
    });
    describe("transferFrom()", () => {
        it("should revert for regular user even if allowance is sufficient", async () => {
            const amountSent = 100;
            await cartridgeContract.approve(userOne.address, amountSent);
            await expect(cartridgeContract.connect(userOne).transferFrom(creator.address, userOne.address, amountSent)).to.be.reverted;
        });
        it("should transfer to recipient if creator gives approve to himself", async () => {
            const amountSent = 100;
            await cartridgeContract.approve(creator.address, amountSent);
            await cartridgeContract.transferFrom(creator.address, userOne.address, amountSent);
            expect(await cartridgeContract.balanceOf(userOne.address)).to.be.equal(amountSent);
        });
        it("should revert if balance is unsufficient", async () => {
            const amountSent = 100000000001;
            await cartridgeContract.approve(creator.address, amountSent);
            await expect(cartridgeContract.transferFrom(creator.address, userOne.address, amountSent)).to.be.reverted;

        });
        it("should revert if allowance is unsufficient", async () => {
            const amountSent = 10000;
            await cartridgeContract.approve(creator.address, amountSent - 1);
            await expect(cartridgeContract.transferFrom(creator.address, userOne.address, amountSent)).to.be.reverted;

        });
    });
});
