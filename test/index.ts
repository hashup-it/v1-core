import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { HashupIGO__factory } from "../typechain-types/factories/HashupIGO__factory";
import { HashupIGO } from "../typechain-types/HashupIGO";
import { GoldCartridgeTokenV0 } from "../typechain-types/GoldCartridgeTokenV0";
import { GoldCartridgeTokenV0__factory } from "../typechain-types/factories/GoldCartridgeTokenV0__factory";

const CARTRIDGE_CONFIG = {
  initialAmount: 10000,
  tokenName: "TestGame",
  tokenSymbol: "TGM",
  cartridgeType: 0,
  feeForCreator: 1,
  metadataUrl: "www.ipfs.pl",
};

describe("HashupIGO", async () => {
  let HashupIGOFactory: HashupIGO__factory;
  let hashupIGO: HashupIGO;

  let owner: SignerWithAddress;
  let userOne: SignerWithAddress;
  let userTwo: SignerWithAddress;

  let GoldCartridgeFactory: GoldCartridgeTokenV0__factory;
  let goldCartridge: GoldCartridgeTokenV0;

  let cartridgeAddress: string;
  const TOKEN_ADDRESS = ethers.Wallet.createRandom().address;

  beforeEach(async () => {
    HashupIGOFactory = (await ethers.getContractFactory(
      "HashupIGO"
    )) as HashupIGO__factory;
    hashupIGO = await HashupIGOFactory.deploy();

    await hashupIGO.deployed();

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
      hashupIGO.address
    );

    await goldCartridge.deployed();

    cartridgeAddress = goldCartridge.address;

    [owner, userOne, userTwo] = await ethers.getSigners();
  });

  describe("setCartridgeForSale()", async () => {
    it("should add game to sale mapping", async () => {
      const passedPrice = 10;

      await hashupIGO.setCartridgeForSale(
        cartridgeAddress,
        TOKEN_ADDRESS,
        passedPrice
      );

      const price = await hashupIGO.getCartridgePrice(cartridgeAddress);

      expect(price).to.be.equal(passedPrice);
    });
  });
});
