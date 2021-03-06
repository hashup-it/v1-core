/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface HashupStoreInterface extends ethers.utils.Interface {
  functions: {
    "buyCartridge(address,uint256)": FunctionFragment;
    "distributePayment(uint256)": FunctionFragment;
    "getCartridgePrice(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "paymentToken()": FunctionFragment;
    "platformFee()": FunctionFragment;
    "raisedAmount(address)": FunctionFragment;
    "reflinkAmount(address)": FunctionFragment;
    "reflinkFee()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sendCartridgeToStore(address,uint256,uint256)": FunctionFragment;
    "setCartridgePrice(address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawCartridges(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "buyCartridge",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "distributePayment",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCartridgePrice",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "paymentToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "platformFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "raisedAmount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "reflinkAmount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "reflinkFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sendCartridgeToStore",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCartridgePrice",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCartridges",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "buyCartridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributePayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCartridgePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "paymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "platformFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "raisedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reflinkAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reflinkFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendCartridgeToStore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCartridgePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCartridges",
    data: BytesLike
  ): Result;

  events: {
    "CartridgesBought(address,uint256,uint256)": EventFragment;
    "CartridgesWithdrawn(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PriceChanged(address,uint256)": EventFragment;
    "SentToStore(address,string,string,string,uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CartridgesBought"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CartridgesWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PriceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SentToStore"): EventFragment;
}

export type CartridgesBoughtEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    cartridgeAddress: string;
    price: BigNumber;
    amount: BigNumber;
  }
>;

export type CartridgesWithdrawnEvent = TypedEvent<
  [string, BigNumber] & { cartridgeAddress: string; amount: BigNumber }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type PriceChangedEvent = TypedEvent<
  [string, BigNumber] & { cartridgeAddress: string; newPrice: BigNumber }
>;

export type SentToStoreEvent = TypedEvent<
  [string, string, string, string, BigNumber, string] & {
    cartridgeAddress: string;
    symbol: string;
    name: string;
    color: string;
    price: BigNumber;
    metadata: string;
  }
>;

export class HashupStore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: HashupStoreInterface;

  functions: {
    "buyCartridge(address,uint256)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "buyCartridge(address,uint256,address)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    distributePayment(
      totalValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        toCreator: BigNumber;
        toPlatform: BigNumber;
        toReferrer: BigNumber;
      }
    >;

    getCartridgePrice(
      cartridgeAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { price: BigNumber }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paymentToken(overrides?: CallOverrides): Promise<[string]>;

    platformFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    raisedAmount(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    reflinkAmount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    reflinkFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendCartridgeToStore(
      cartridgeAddress: string,
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCartridgePrice(
      cartridgeAddress: string,
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawCartridges(
      _cartridgeAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  "buyCartridge(address,uint256)"(
    cartridgeAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "buyCartridge(address,uint256,address)"(
    cartridgeAddress: string,
    amount: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  distributePayment(
    totalValue: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      toCreator: BigNumber;
      toPlatform: BigNumber;
      toReferrer: BigNumber;
    }
  >;

  getCartridgePrice(
    cartridgeAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  paymentToken(overrides?: CallOverrides): Promise<string>;

  platformFee(overrides?: CallOverrides): Promise<BigNumber>;

  raisedAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  reflinkAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  reflinkFee(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendCartridgeToStore(
    cartridgeAddress: string,
    price: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCartridgePrice(
    cartridgeAddress: string,
    newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawCartridges(
    _cartridgeAddress: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    "buyCartridge(address,uint256)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "buyCartridge(address,uint256,address)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    distributePayment(
      totalValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        toCreator: BigNumber;
        toPlatform: BigNumber;
        toReferrer: BigNumber;
      }
    >;

    getCartridgePrice(
      cartridgeAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    paymentToken(overrides?: CallOverrides): Promise<string>;

    platformFee(overrides?: CallOverrides): Promise<BigNumber>;

    raisedAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    reflinkAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    reflinkFee(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sendCartridgeToStore(
      cartridgeAddress: string,
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setCartridgePrice(
      cartridgeAddress: string,
      newPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawCartridges(
      _cartridgeAddress: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "CartridgesBought(address,uint256,uint256)"(
      cartridgeAddress?: null,
      price?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { cartridgeAddress: string; price: BigNumber; amount: BigNumber }
    >;

    CartridgesBought(
      cartridgeAddress?: null,
      price?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { cartridgeAddress: string; price: BigNumber; amount: BigNumber }
    >;

    "CartridgesWithdrawn(address,uint256)"(
      cartridgeAddress?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cartridgeAddress: string; amount: BigNumber }
    >;

    CartridgesWithdrawn(
      cartridgeAddress?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cartridgeAddress: string; amount: BigNumber }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "PriceChanged(address,uint256)"(
      cartridgeAddress?: null,
      newPrice?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cartridgeAddress: string; newPrice: BigNumber }
    >;

    PriceChanged(
      cartridgeAddress?: null,
      newPrice?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cartridgeAddress: string; newPrice: BigNumber }
    >;

    "SentToStore(address,string,string,string,uint256,string)"(
      cartridgeAddress?: null,
      symbol?: null,
      name?: null,
      color?: null,
      price?: null,
      metadata?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        cartridgeAddress: string;
        symbol: string;
        name: string;
        color: string;
        price: BigNumber;
        metadata: string;
      }
    >;

    SentToStore(
      cartridgeAddress?: null,
      symbol?: null,
      name?: null,
      color?: null,
      price?: null,
      metadata?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        cartridgeAddress: string;
        symbol: string;
        name: string;
        color: string;
        price: BigNumber;
        metadata: string;
      }
    >;
  };

  estimateGas: {
    "buyCartridge(address,uint256)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "buyCartridge(address,uint256,address)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    distributePayment(
      totalValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCartridgePrice(
      cartridgeAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paymentToken(overrides?: CallOverrides): Promise<BigNumber>;

    platformFee(overrides?: CallOverrides): Promise<BigNumber>;

    raisedAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    reflinkAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    reflinkFee(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendCartridgeToStore(
      cartridgeAddress: string,
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCartridgePrice(
      cartridgeAddress: string,
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawCartridges(
      _cartridgeAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    "buyCartridge(address,uint256)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "buyCartridge(address,uint256,address)"(
      cartridgeAddress: string,
      amount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    distributePayment(
      totalValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCartridgePrice(
      cartridgeAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paymentToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    platformFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    raisedAmount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    reflinkAmount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    reflinkFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendCartridgeToStore(
      cartridgeAddress: string,
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCartridgePrice(
      cartridgeAddress: string,
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawCartridges(
      _cartridgeAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
