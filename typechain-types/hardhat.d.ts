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
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IUniswapV3SwapCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3SwapCallback__factory>;
    getContractFactory(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: "HashupToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HashupToken__factory>;
    getContractFactory(
      name: "HashupCartridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HashupCartridge__factory>;
    getContractFactory(
      name: "HashupGamerProfile",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HashupGamerProfile__factory>;
    getContractFactory(
      name: "HashupStore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HashupStore__factory>;
    getContractFactory(
      name: "CartridgeMetadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CartridgeMetadata__factory>;
    getContractFactory(
      name: "Creatorship",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Creatorship__factory>;
    getContractFactory(
      name: "TestToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestToken__factory>;

    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IUniswapV3SwapCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    getContractAt(
      name: "ISwapRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: "HashupToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HashupToken>;
    getContractAt(
      name: "HashupCartridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HashupCartridge>;
    getContractAt(
      name: "HashupGamerProfile",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HashupGamerProfile>;
    getContractAt(
      name: "HashupStore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HashupStore>;
    getContractAt(
      name: "CartridgeMetadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CartridgeMetadata>;
    getContractAt(
      name: "Creatorship",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Creatorship>;
    getContractAt(
      name: "TestToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestToken>;

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
