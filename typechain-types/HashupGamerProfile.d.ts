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

interface HashupGamerProfileInterface extends ethers.utils.Interface {
  functions: {
    "gotReward(address)": FunctionFragment;
    "nicknameOwners(string)": FunctionFragment;
    "owner()": FunctionFragment;
    "pointsEarned(address)": FunctionFragment;
    "profiles(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateProfile(string,string,string,string,string,address)": FunctionFragment;
    "verifyProfile(address,bool)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "gotReward", values: [string]): string;
  encodeFunctionData(
    functionFragment: "nicknameOwners",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pointsEarned",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "profiles", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProfile",
    values: [string, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProfile",
    values: [string, boolean]
  ): string;

  decodeFunctionResult(functionFragment: "gotReward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nicknameOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pointsEarned",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "profiles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProfile",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdatedProfile(address,string,string,string,string,string,address)": EventFragment;
    "VerifiedUser(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedProfile"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VerifiedUser"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type UpdatedProfileEvent = TypedEvent<
  [string, string, string, string, string, string, string] & {
    user: string;
    newNickname: string;
    newColor: string;
    newAvatar: string;
    newDescription: string;
    newSocials: string;
    referrer: string;
  }
>;

export type VerifiedUserEvent = TypedEvent<
  [string, boolean] & { user: string; value: boolean }
>;

export class HashupGamerProfile extends BaseContract {
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

  interface: HashupGamerProfileInterface;

  functions: {
    gotReward(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    nicknameOwners(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pointsEarned(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    profiles(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, boolean] & {
        nickname: string;
        color: string;
        avatar: string;
        description: string;
        socials: string;
        isVerified: boolean;
      }
    >;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateProfile(
      nickname: string,
      color: string,
      avatar: string,
      description: string,
      socials: string,
      refferer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    verifyProfile(
      user: string,
      value: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  gotReward(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  nicknameOwners(arg0: string, overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pointsEarned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  profiles(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string, string, boolean] & {
      nickname: string;
      color: string;
      avatar: string;
      description: string;
      socials: string;
      isVerified: boolean;
    }
  >;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateProfile(
    nickname: string,
    color: string,
    avatar: string,
    description: string,
    socials: string,
    refferer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  verifyProfile(
    user: string,
    value: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    gotReward(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    nicknameOwners(arg0: string, overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pointsEarned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    profiles(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, boolean] & {
        nickname: string;
        color: string;
        avatar: string;
        description: string;
        socials: string;
        isVerified: boolean;
      }
    >;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateProfile(
      nickname: string,
      color: string,
      avatar: string,
      description: string,
      socials: string,
      refferer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyProfile(
      user: string,
      value: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
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

    "UpdatedProfile(address,string,string,string,string,string,address)"(
      user?: null,
      newNickname?: null,
      newColor?: null,
      newAvatar?: null,
      newDescription?: null,
      newSocials?: null,
      referrer?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, string],
      {
        user: string;
        newNickname: string;
        newColor: string;
        newAvatar: string;
        newDescription: string;
        newSocials: string;
        referrer: string;
      }
    >;

    UpdatedProfile(
      user?: null,
      newNickname?: null,
      newColor?: null,
      newAvatar?: null,
      newDescription?: null,
      newSocials?: null,
      referrer?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, string],
      {
        user: string;
        newNickname: string;
        newColor: string;
        newAvatar: string;
        newDescription: string;
        newSocials: string;
        referrer: string;
      }
    >;

    "VerifiedUser(address,bool)"(
      user?: null,
      value?: null
    ): TypedEventFilter<[string, boolean], { user: string; value: boolean }>;

    VerifiedUser(
      user?: null,
      value?: null
    ): TypedEventFilter<[string, boolean], { user: string; value: boolean }>;
  };

  estimateGas: {
    gotReward(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    nicknameOwners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pointsEarned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    profiles(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateProfile(
      nickname: string,
      color: string,
      avatar: string,
      description: string,
      socials: string,
      refferer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    verifyProfile(
      user: string,
      value: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    gotReward(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nicknameOwners(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pointsEarned(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    profiles(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateProfile(
      nickname: string,
      color: string,
      avatar: string,
      description: string,
      socials: string,
      refferer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    verifyProfile(
      user: string,
      value: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
