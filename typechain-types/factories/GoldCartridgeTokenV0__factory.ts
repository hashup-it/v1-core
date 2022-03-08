/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GoldCartridgeTokenV0,
  GoldCartridgeTokenV0Interface,
} from "../GoldCartridgeTokenV0";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_cartridgeType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_feeForCreator",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_metadataUrl",
        type: "string",
      },
      {
        internalType: "address",
        name: "_hashUpIGO",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "HashUpWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cartridgeType",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeForCreator",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feesCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
    ],
    name: "getAmountAfterFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hashUpIGO",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metadata",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_metadataURL",
        type: "string",
      },
    ],
    name: "setMetadata",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526002600460006101000a81548160ff021916908360ff160217905550735e798ce8e53a3fe16842c233e8802dc3b09a8451600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503480156200008257600080fd5b5060405162001fa138038062001fa18339818101604052810190620000a8919062000392565b60008460ff1614620000b957600080fd5b62cc02918710620000c957600080fd5b600083118015620000db57506103e883105b620000e557600080fd5b866000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550866002819055508560039080519060200190620001479291906200022b565b508460059080519060200190620001609291906200022b565b5082600a8190555083600960006101000a81548160ff021916908360ff16021790555033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160089080519060200190620001dc9291906200022b565b5080600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050505062000693565b82805462000239906200056a565b90600052602060002090601f0160209004810192826200025d5760008555620002a9565b82601f106200027857805160ff1916838001178555620002a9565b82800160010185558215620002a9579182015b82811115620002a85782518255916020019190600101906200028b565b5b509050620002b89190620002bc565b5090565b5b80821115620002d7576000816000905550600101620002bd565b5090565b6000620002f2620002ec84620004b3565b6200048a565b9050828152602081018484840111156200030b57600080fd5b6200031884828562000534565b509392505050565b600081519050620003318162000645565b92915050565b600082601f8301126200034957600080fd5b81516200035b848260208601620002db565b91505092915050565b60008151905062000375816200065f565b92915050565b6000815190506200038c8162000679565b92915050565b600080600080600080600060e0888a031215620003ae57600080fd5b6000620003be8a828b0162000364565b975050602088015167ffffffffffffffff811115620003dc57600080fd5b620003ea8a828b0162000337565b965050604088015167ffffffffffffffff8111156200040857600080fd5b620004168a828b0162000337565b9550506060620004298a828b016200037b565b94505060806200043c8a828b0162000364565b93505060a088015167ffffffffffffffff8111156200045a57600080fd5b620004688a828b0162000337565b92505060c06200047b8a828b0162000320565b91505092959891949750929550565b600062000496620004a9565b9050620004a48282620005a0565b919050565b6000604051905090565b600067ffffffffffffffff821115620004d157620004d062000605565b5b620004dc8262000634565b9050602081019050919050565b6000620004f682620004fd565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156200055457808201518184015260208101905062000537565b8381111562000564576000848401525b50505050565b600060028204905060018216806200058357607f821691505b602082108114156200059a5762000599620005d6565b5b50919050565b620005ab8262000634565b810181811067ffffffffffffffff82111715620005cd57620005cc62000605565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6200065081620004e9565b81146200065c57600080fd5b50565b6200066a816200051d565b81146200067657600080fd5b50565b620006848162000527565b81146200069057600080fd5b50565b6118fe80620006a36000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80635c658165116100b8578063a49a1e7d1161007c578063a49a1e7d1461036b578063a9059cbb1461039b578063b94f4778146103cb578063bc8bde64146103e9578063dd62ed3e14610407578063e9da0e6c1461043757610137565b80635c658165146102b157806370a08231146102e15780637870a54e14610311578063922f695f1461032f57806395d89b411461034d57610137565b806327e235e3116100ff57806327e235e3146101f6578063313ce56714610226578063392f37e91461024457806341b6a8371461026257806354c3db4e1461029357610137565b806302d05d3f1461013c57806306fdde031461015a578063095ea7b31461017857806318160ddd146101a857806323b872dd146101c6575b600080fd5b610144610455565b604051610151919061136e565b60405180910390f35b61016261047f565b60405161016f91906113a4565b60405180910390f35b610192600480360381019061018d91906111d7565b61050d565b60405161019f9190611389565b60405180910390f35b6101b06105ff565b6040516101bd9190611426565b60405180910390f35b6101e060048036038101906101db9190611188565b610605565b6040516101ed9190611389565b60405180910390f35b610210600480360381019061020b9190611123565b61098e565b60405161021d9190611426565b60405180910390f35b61022e6109a6565b60405161023b919061146a565b60405180910390f35b61024c6109b9565b60405161025991906113a4565b60405180910390f35b61027c60048036038101906102779190611254565b610a47565b60405161028a929190611441565b60405180910390f35b61029b610aeb565b6040516102a8919061136e565b60405180910390f35b6102cb60048036038101906102c6919061114c565b610b11565b6040516102d89190611426565b60405180910390f35b6102fb60048036038101906102f69190611123565b610b36565b6040516103089190611426565b60405180910390f35b610319610b7e565b604051610326919061146a565b60405180910390f35b610337610b91565b604051610344919061136e565b60405180910390f35b610355610bb7565b60405161036291906113a4565b60405180910390f35b61038560048036038101906103809190611213565b610c45565b60405161039291906113a4565b60405180910390f35b6103b560048036038101906103b091906111d7565b610cf6565b6040516103c29190611389565b60405180910390f35b6103d3610f35565b6040516103e09190611426565b60405180910390f35b6103f1610f3b565b6040516103fe919061136e565b60405180910390f35b610421600480360381019061041c919061114c565b610f61565b60405161042e9190611426565b60405180910390f35b61043f610fe8565b60405161044c9190611426565b60405180910390f35b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6003805461048c906116a3565b80601f01602080910402602001604051908101604052809291908181526020018280546104b8906116a3565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516105ed9190611426565b60405180910390a36001905092915050565b60025481565b600080600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156106d55750828110155b610714576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070b90611406565b60405180910390fd5b6000806107218588610a47565b91509150846000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461077391906115d8565b92505081905550816000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107c891906114f7565b9250508190555080600c60008282546107e191906114f7565b9250508190555080600080600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461085891906114f7565b925050819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83101561091b5784600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461091391906115d8565b925050819055505b8573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040516109789190611426565b60405180910390a3600193505050509392505050565b60006020528060005260406000206000915090505481565b600460009054906101000a900460ff1681565b600880546109c6906116a3565b80601f01602080910402602001604051908101604052809291908181526020018280546109f2906116a3565b8015610a3f5780601f10610a1457610100808354040283529160200191610a3f565b820191906000526020600020905b815481529060010190602001808311610a2257829003601f168201915b505050505081565b600080600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610aac5783600091509150610ae4565b60006103e8600a5486610abf919061157e565b610ac9919061154d565b905060008186610ad991906115d8565b905080829350935050505b9250929050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001602052816000526040600020602052806000526040600020600091509150505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600960009054906101000a900460ff1681565b600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054610bc4906116a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610bf0906116a3565b8015610c3d5780601f10610c1257610100808354040283529160200191610c3d565b820191906000526020600020905b815481529060010190602001808311610c2057829003601f168201915b505050505081565b6060600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cd7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cce906113e6565b60405180910390fd5b8160089080519060200190610ced929190610fee565b50819050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610d79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d70906113c6565b60405180910390fd5b600080610d868433610a47565b91509150836000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dd891906115d8565b92505081905550816000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e2d91906114f7565b9250508190555080600c6000828254610e4691906114f7565b9250508190555080600080600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ebd91906114f7565b925050819055508473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef86604051610f219190611426565b60405180910390a360019250505092915050565b600c5481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600a5481565b828054610ffa906116a3565b90600052602060002090601f01602090048101928261101c5760008555611063565b82601f1061103557805160ff1916838001178555611063565b82800160010185558215611063579182015b82811115611062578251825591602001919060010190611047565b5b5090506110709190611074565b5090565b5b8082111561108d576000816000905550600101611075565b5090565b60006110a461109f846114aa565b611485565b9050828152602081018484840111156110bc57600080fd5b6110c7848285611661565b509392505050565b6000813590506110de8161189a565b92915050565b600082601f8301126110f557600080fd5b8135611105848260208601611091565b91505092915050565b60008135905061111d816118b1565b92915050565b60006020828403121561113557600080fd5b6000611143848285016110cf565b91505092915050565b6000806040838503121561115f57600080fd5b600061116d858286016110cf565b925050602061117e858286016110cf565b9150509250929050565b60008060006060848603121561119d57600080fd5b60006111ab868287016110cf565b93505060206111bc868287016110cf565b92505060406111cd8682870161110e565b9150509250925092565b600080604083850312156111ea57600080fd5b60006111f8858286016110cf565b92505060206112098582860161110e565b9150509250929050565b60006020828403121561122557600080fd5b600082013567ffffffffffffffff81111561123f57600080fd5b61124b848285016110e4565b91505092915050565b6000806040838503121561126757600080fd5b60006112758582860161110e565b9250506020611286858286016110cf565b9150509250929050565b6112998161160c565b82525050565b6112a88161161e565b82525050565b60006112b9826114db565b6112c381856114e6565b93506112d3818560208601611670565b6112dc816117c2565b840191505092915050565b60006112f4602f836114e6565b91506112ff826117d3565b604082019050919050565b60006113176013836114e6565b915061132282611822565b602082019050919050565b600061133a6039836114e6565b91506113458261184b565b604082019050919050565b6113598161164a565b82525050565b61136881611654565b82525050565b60006020820190506113836000830184611290565b92915050565b600060208201905061139e600083018461129f565b92915050565b600060208201905081810360008301526113be81846112ae565b905092915050565b600060208201905081810360008301526113df816112e7565b9050919050565b600060208201905081810360008301526113ff8161130a565b9050919050565b6000602082019050818103600083015261141f8161132d565b9050919050565b600060208201905061143b6000830184611350565b92915050565b60006040820190506114566000830185611350565b6114636020830184611350565b9392505050565b600060208201905061147f600083018461135f565b92915050565b600061148f6114a0565b905061149b82826116d5565b919050565b6000604051905090565b600067ffffffffffffffff8211156114c5576114c4611793565b5b6114ce826117c2565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006115028261164a565b915061150d8361164a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561154257611541611706565b5b828201905092915050565b60006115588261164a565b91506115638361164a565b92508261157357611572611735565b5b828204905092915050565b60006115898261164a565b91506115948361164a565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156115cd576115cc611706565b5b828202905092915050565b60006115e38261164a565b91506115ee8361164a565b92508282101561160157611600611706565b5b828203905092915050565b60006116178261162a565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b8381101561168e578082015181840152602081019050611673565b8381111561169d576000848401525b50505050565b600060028204905060018216806116bb57607f821691505b602082108114156116cf576116ce611764565b5b50919050565b6116de826117c2565b810181811067ffffffffffffffff821117156116fd576116fc611793565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f746f6b656e2062616c616e6365206973206c6f776572207468616e207468652060008201527f76616c7565207265717565737465640000000000000000000000000000000000602082015250565b7f43616c6c6572206973206e6f74206f776e657200000000000000000000000000600082015250565b7f746f6b656e2062616c616e6365206f7220616c6c6f77616e6365206973206c6f60008201527f776572207468616e20616d6f756e742072657175657374656400000000000000602082015250565b6118a38161160c565b81146118ae57600080fd5b50565b6118ba8161164a565b81146118c557600080fd5b5056fea2646970667358221220f38c5a6ce638c29c4eb3084c22bb2c9fad1acb4e36fa55db968b0c900c79b84664736f6c63430008040033";

export class GoldCartridgeTokenV0__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _initialAmount: BigNumberish,
    _tokenName: string,
    _tokenSymbol: string,
    _cartridgeType: BigNumberish,
    _feeForCreator: BigNumberish,
    _metadataUrl: string,
    _hashUpIGO: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GoldCartridgeTokenV0> {
    return super.deploy(
      _initialAmount,
      _tokenName,
      _tokenSymbol,
      _cartridgeType,
      _feeForCreator,
      _metadataUrl,
      _hashUpIGO,
      overrides || {}
    ) as Promise<GoldCartridgeTokenV0>;
  }
  getDeployTransaction(
    _initialAmount: BigNumberish,
    _tokenName: string,
    _tokenSymbol: string,
    _cartridgeType: BigNumberish,
    _feeForCreator: BigNumberish,
    _metadataUrl: string,
    _hashUpIGO: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _initialAmount,
      _tokenName,
      _tokenSymbol,
      _cartridgeType,
      _feeForCreator,
      _metadataUrl,
      _hashUpIGO,
      overrides || {}
    );
  }
  attach(address: string): GoldCartridgeTokenV0 {
    return super.attach(address) as GoldCartridgeTokenV0;
  }
  connect(signer: Signer): GoldCartridgeTokenV0__factory {
    return super.connect(signer) as GoldCartridgeTokenV0__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GoldCartridgeTokenV0Interface {
    return new utils.Interface(_abi) as GoldCartridgeTokenV0Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GoldCartridgeTokenV0 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GoldCartridgeTokenV0;
  }
}
