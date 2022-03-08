import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { HashupIGO__factory } from "../typechain-types/factories/HashupIGO__factory"
import { HashupIGO } from "../typechain-types/HashupIGO";


describe("HashupIGO", async () => {

  let HashupIGOFactory : HashupIGO__factory;
  let hashupIGO : HashupIGO;

  let owner : SignerWithAddress;
  let userOne : SignerWithAddress;
  let userTwo : SignerWithAddress;

  const CARTRIDGE_ADDRESS = ethers.Wallet.createRandom().address;
  const TOKEN_ADDRESS = ethers.Wallet.createRandom().address;

  beforeEach(async () => {
    HashupIGOFactory = await ethers.getContractFactory("HashupIGO") as HashupIGO__factory;
    hashupIGO = await HashupIGOFactory.deploy();
    
    await hashupIGO.deployed();

    [owner, userOne, userTwo] = await ethers.getSigners();
  })


  describe("setCartridgeForSale()", async () => {
    it("should add game to sale mapping", async () => {

      const passedPrice = 10;

      await hashupIGO.setCartridgeForSale(CARTRIDGE_ADDRESS, TOKEN_ADDRESS, passedPrice);
      const price = await hashupIGO.getCartridgePrice(CARTRIDGE_ADDRESS);

      expect(price).to.be.equal(passedPrice);

    })
  })

});
