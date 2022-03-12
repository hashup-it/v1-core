import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

import { GoldCartridgeTokenV0 } from "../typechain-types/GoldCartridgeTokenV0";
import { GoldCartridgeTokenV0__factory } from "../typechain-types/factories/GoldCartridgeTokenV0__factory";
import { ethers } from "hardhat";

describe("GoldCartrdigeTokenV0", async () => {
    const CARTRIDGE_CONFIG = {
        supply: 13370000,
        name: "Gold Cartridge Game",
        symbol: "GCG",
        fee: 50,
        metadata: "www.ifps.com",
        igo: ethers.Wallet.createRandom().address,
    };

    let creator: SignerWithAddress;
    let userOne: SignerWithAddress;
    let userTwo: SignerWithAddress;

    let cartridgeFactory: GoldCartridgeTokenV0__factory;
    let cartridgeContract: GoldCartridgeTokenV0;

    beforeEach(async () => {
        cartridgeFactory = (await ethers.getContractFactory(
            "GoldCartridgeTokenV0"
        )) as GoldCartridgeTokenV0__factory;
        cartridgeContract = await cartridgeFactory.deploy(
            CARTRIDGE_CONFIG.supply,
            CARTRIDGE_CONFIG.name,
            CARTRIDGE_CONFIG.symbol,
            CARTRIDGE_CONFIG.fee,
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
                    CARTRIDGE_CONFIG.fee,
                    CARTRIDGE_CONFIG.metadata,
                    CARTRIDGE_CONFIG.igo
                )
            ).to.be.reverted;
        });
        it("should revert if fee too high", async () => {
            await expect(
                cartridgeFactory.deploy(
                    CARTRIDGE_CONFIG.supply,
                    CARTRIDGE_CONFIG.name,
                    CARTRIDGE_CONFIG.symbol,
                    CARTRIDGE_CONFIG.fee + 1,
                    CARTRIDGE_CONFIG.metadata,
                    CARTRIDGE_CONFIG.igo
                )
            ).to.be.reverted;
        });
        it("should revert if fee too low", async () => {
            await expect(
                cartridgeFactory.deploy(
                    CARTRIDGE_CONFIG.supply,
                    CARTRIDGE_CONFIG.name,
                    CARTRIDGE_CONFIG.symbol,
                    -1,
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
            expect(colorResponse).to.be.equal("gold");
        });
        it("should set name correctly", async () => {
            const nameResponse = await cartridgeContract.name();
            expect(nameResponse).to.be.equal(CARTRIDGE_CONFIG.name);
        });
        it("should set symbol correctly", async () => {
            const symbolResponse = await cartridgeContract.symbol();
            expect(symbolResponse).to.be.equal(CARTRIDGE_CONFIG.symbol);
        });
        it("should set creator fee correctly", async () => {
            const feeResponse = await cartridgeContract.feeForCreator();
            expect(feeResponse).to.be.equal(CARTRIDGE_CONFIG.fee);
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
        it("should let transfer and set recipient balance correctly", async () => {
            const amountSent = 100;
            const creatorFee = amountSent * (CARTRIDGE_CONFIG.fee/(100 * 10)) // decimals 
            await cartridgeContract.transfer(userOne.address, amountSent);
            await cartridgeContract.connect(userOne).transfer(userTwo.address, amountSent);
            const recipientBalance = await cartridgeContract.balanceOf(userTwo.address);
            expect(recipientBalance).to.be.equal(amountSent - creatorFee);
        });
        it("should let transfer and set creator balance correctly", async () => {
            const amountSent = 100;
            const creatorFee =  Math.floor(amountSent * (CARTRIDGE_CONFIG.fee/(100 * 10))) // decimals 
            await cartridgeContract.transfer(userOne.address, amountSent*2);

            const creatorInitialBalance = await cartridgeContract.balanceOf(creator.address);
            await cartridgeContract.connect(userOne).transfer(userTwo.address, amountSent);
            const creatorBalance = await cartridgeContract.balanceOf(creator.address);

            expect(creatorBalance).to.be.equal(creatorInitialBalance.add(creatorFee));
        });
        it("should revert if balance is unsufficient", async () => {
            const currentBalance = await cartridgeContract.balanceOf(creator.address);
            await expect(cartridgeContract.transfer(userOne.address, Number(currentBalance) + 1))
                .to.be.reverted;
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
        it("should transfer if allowance is sufficient", async () => {
            const amountSent = 34;
            const creatorFee = Math.floor(amountSent * (CARTRIDGE_CONFIG.fee/(100 * 10)));
            await cartridgeContract.transfer(userOne.address, amountSent);
            await cartridgeContract.connect(userOne).approve(userTwo.address, amountSent);
            await cartridgeContract.connect(userTwo).transferFrom(userOne.address, userTwo.address, amountSent);
            
            expect(await cartridgeContract.balanceOf(userTwo.address)).to.be.equal(amountSent - creatorFee);
        });
        it("should reduce allowance after sending", async () => {
            const amountSent = 31;
            await cartridgeContract.approve(userOne.address, amountSent);
            await cartridgeContract.connect(userOne).transferFrom(creator.address, userTwo.address, amountSent);
           
            expect(await cartridgeContract.allowance(userOne.address, userTwo.address)).to.be.equal(0);
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
