/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "GoldCartridgeTokenV0",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GoldCartridgeTokenV0__factory>;
    getContractFactory(
      name: "HashupIGO",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HashupIGO__factory>;
    getContractFactory(
      name: "ICartridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICartridge__factory>;

    getContractAt(
      name: "GoldCartridgeTokenV0",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GoldCartridgeTokenV0>;
    getContractAt(
      name: "HashupIGO",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HashupIGO>;
    getContractAt(
      name: "ICartridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICartridge>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
