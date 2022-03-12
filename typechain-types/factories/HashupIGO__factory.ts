/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { HashupIGO, HashupIGOInterface } from "../HashupIGO";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_cartridgeAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "buyCartridge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_cartridgeAddress",
        type: "address",
      },
    ],
    name: "getCartridgePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
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
        name: "_cartridgeAddress",
        type: "address",
      },
    ],
    name: "getPaymentToken",
    outputs: [
      {
        internalType: "address",
        name: "paymentToken",
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
        name: "_cartridgeAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "setCartridgeForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611f0f806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063038bf1e714610051578063360067771461006d5780638dbc83431461009d578063e6c15e96146100cd575b600080fd5b61006b60048036038101906100669190611a27565b6100e9565b005b61008760048036038101906100829190611972565b61125c565b6040516100949190611c23565b60405180910390f35b6100b760048036038101906100b29190611972565b61132c565b6040516100c49190611b2f565b60405180910390f35b6100e760048036038101906100e291906119c4565b61141c565b005b6101157f1b8a7bece981b503b929d3ad726a95744e17e5cde9a230dbdc5360c228da4a1260001b611841565b6101417f04547ae6b6c7382cba8e128862544fc0c4bec56a5e8b2e275664b7a66b6aa31760001b611841565b61016d7f594b60e79f4c3352582809c8da83dbc7eed3a080b79489a592af8e06630e8d8f60001b611841565b60006101788361132c565b90506101a67fcc6c76a624edbd2f4fca6a366c5ad879472dd2af21e5e13a09c3af1f7423db5860001b611841565b6101d27f71d037f76e1ff943bc11c21e0a81c45499ff73ae910f28bd1a0438b420184af560001b611841565b60008390506102037f8384fe0cc178a70601c129c7d83e9f80e2d363f4d84e56b4f99ee4af0d2e83e660001b611841565b61022f7ff3b03a2d4aa355d5fcb8fec8a018471c803eb518eb6e2d010528c9ae9a71023760001b611841565b60008361023b8661125c565b6102459190611c8b565b90506102737fde24fc360b60822f53ef1c0eaed3ebcc8e29a2904114057dcc9638466e2ed24260001b611841565b61029f7fc146aa2ad6387133484f2ee8a8657bae48e9c2b86fd98a61678af44a977063d560001b611841565b6103686040518060400160405280600c81526020017f416c6c6f77616e636520697300000000000000000000000000000000000000008152508473ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b8152600401610313929190611b4a565b60206040518083038186803b15801561032b57600080fd5b505afa15801561033f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103639190611a8c565b611844565b6103947f3e19c3cdacff09d3df60c5cb02f8b78dae12f30a2060da7404c2e225ee31a48560001b611841565b6103c07fa39dab0d572dc790a8a87803848bfc4cf2f61b0a3c770c9d16907a895239b69860001b611841565b6104876040518060400160405280601a81526020017f4275796572206361727472696467652062616c616e63652069730000000000008152508373ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016104329190611b2f565b60206040518083038186803b15801561044a57600080fd5b505afa15801561045e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104829190611a8c565b611844565b6104b37f31f980511679e084b18ba1be8b2293d0de085bcd28bfb2cd495a6dc14c8c937a60001b611841565b6104df7f6587f1bd0545ef6fdcee4206e5c459b8a740953630ae661458342fc87f199bf960001b611841565b6105296040518060400160405280600881526020017f507269636520697300000000000000000000000000000000000000000000000081525085836105249190611c5a565b611844565b6105557f6f4d1e24d1df3707698d4351aad8ac3508fc2b324a36708de0a4bffb697cdac360001b611841565b6105817fd759aded2ebe0a155cba1f52770f4b8833ac9d355068dbe1a8c59145b7e6610760001b611841565b6105c06040518060400160405280601081526020017f416d6f756e7420626f756768742069730000000000000000000000000000000081525085611844565b6105ec7faf4231484b8ee1fee40a154e199b65deb3e27c54be9e6f14896eb914ba1ad84c60001b611841565b6106187f9cc5624fdca4b75d06f2b544081adb545e32d445e8c6058a859600ccc8665dc560001b611841565b61066d6040518060400160405280601381526020017f4e656564656420616c6c6f77616e63652069730000000000000000000000000081525085868461065e9190611c5a565b6106689190611c8b565b611844565b6106997fc1f50679ee1566baf9aa7dd71e4af7dff36982c0e132db9d0cfc244cf41308d760001b611841565b6106c57f02aa451555e3079fe8ac587a297d1ceb7b97ea304decadba736c92284874b96960001b611841565b61078c6040518060400160405280600d81526020017f546f6b656e2062616c616e6365000000000000000000000000000000000000008152508473ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016107379190611b2f565b60206040518083038186803b15801561074f57600080fd5b505afa158015610763573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107879190611a8c565b611844565b6107b87f09f4d1a5f40e5029a62c299bc74155480eeee967bf446efb9a774665db9f697460001b611841565b6107e47f0cf7ea9946225a9ed95888a616bd1bb1713fdb2af5483b75a35b0a1caee64da160001b611841565b6109286040518060400160405280601581526020017f43726561746f7220746f6b656e2062616c616e636500000000000000000000008152508473ffffffffffffffffffffffffffffffffffffffff166370a082318573ffffffffffffffffffffffffffffffffffffffff166302d05d3f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561087f57600080fd5b505afa158015610893573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108b7919061199b565b6040518263ffffffff1660e01b81526004016108d39190611b2f565b60206040518083038186803b1580156108eb57600080fd5b505afa1580156108ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109239190611a8c565b611844565b6109547f526d016fc17838bf572bd5deeaa9c3578fc0e8673f29c374e46a424017759b0560001b611841565b6109807f03e2fdd02d5f00a5cb38f82934bcccf4b08738f1f134e7b920651cc9f890e68960001b611841565b610a2a604051806060016040528060218152602001611e8a602191398373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016109d59190611b2f565b60206040518083038186803b1580156109ed57600080fd5b505afa158015610a01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a259190611a8c565b611844565b610a567f1bf7930a6f90c0f0f683320ed090fc2077aa4a654e88a58a3fd71009109a621960001b611841565b610a827fbf8ce77f76cedae38d0da8df1829d313b11254d9afbdf724f22757be42259c3960001b611841565b8173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33866040518363ffffffff1660e01b8152600401610abd929190611baa565b602060405180830381600087803b158015610ad757600080fd5b505af1158015610aeb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0f9190611a63565b50610b3c7fbf86adcf45c1460cef9541bdd7e6062180c3126802def3eeb81014b0b73937fe60001b611841565b610b687fc3e22daf331302c8be28a65ec3a263482f6d62653197a8e04b23086323be2b9860001b611841565b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd338473ffffffffffffffffffffffffffffffffffffffff166302d05d3f6040518163ffffffff1660e01b815260040160206040518083038186803b158015610bcb57600080fd5b505afa158015610bdf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c03919061199b565b846040518463ffffffff1660e01b8152600401610c2293929190611b73565b602060405180830381600087803b158015610c3c57600080fd5b505af1158015610c50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c749190611a63565b50610ca17fde4716e1510c07fe30a671c85f0c9689941065a3f53f3023e665c3322b2d6d4060001b611841565b610ccd7f26a79d172fd1e2ab9ef9564cba40b8135784d559b2301110f238abfc173b6cbb60001b611841565b610d966040518060400160405280601a81526020017f416c6c6f77616e63652061667465722073656c6c696e672069730000000000008152508473ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b8152600401610d41929190611b4a565b60206040518083038186803b158015610d5957600080fd5b505afa158015610d6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d919190611a8c565b611844565b610dc27fa5c7571b5a603642ed6f39f49df57b542b64c30585c5e32adcfcbf7cd6bde1d360001b611841565b610dee7fa8affe8ea20d719c8c558d6808698c70a4b99e92b95f0100bfc1ddf71059e5b460001b611841565b610eb56040518060400160405280601e81526020017f546f6b656e2062616c616e63652061667465722073656c6c696e6720697300008152508473ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b8152600401610e609190611b2f565b60206040518083038186803b158015610e7857600080fd5b505afa158015610e8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb09190611a8c565b611844565b610ee17fd34aa32f7a07268dcb582c214fd565dc92ea6e1dc7c6b5544970cb8c40fc166e60001b611841565b610f0d7f081892e2a5ccfb264f2cdbae8f78bab3becad27a9cd3c8409ac87ad9342da30a60001b611841565b611034604051806060016040528060268152602001611e64602691398473ffffffffffffffffffffffffffffffffffffffff166370a082318573ffffffffffffffffffffffffffffffffffffffff166302d05d3f6040518163ffffffff1660e01b815260040160206040518083038186803b158015610f8b57600080fd5b505afa158015610f9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc3919061199b565b6040518263ffffffff1660e01b8152600401610fdf9190611b2f565b60206040518083038186803b158015610ff757600080fd5b505afa15801561100b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061102f9190611a8c565b611844565b6110607fe74ac6e7d7fafd0f3e381476209524e334f60ea1f164e78b663c93a619d11de160001b611841565b61108c7f40edadda617071ad6be6b8d59679e87624736dc1c471be768e3603d2abb9ad0660001b611841565b6111366040518060600160405280602f8152602001611eab602f91398373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016110e19190611b2f565b60206040518083038186803b1580156110f957600080fd5b505afa15801561110d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111319190611a8c565b611844565b6111627f2eea6ce252fa06c3d5f0462022d3c552195ecd754c99aa2005d4756129dfb8a460001b611841565b61118e7fa6d0944917f9e21880b36c1c377f701a184c1c7c6fa748f49d15e5514abd788360001b611841565b6112556040518060400160405280601a81526020017f4275796572206361727472696467652062616c616e63652069730000000000008152508373ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016112009190611b2f565b60206040518083038186803b15801561121857600080fd5b505afa15801561122c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112509190611a8c565b611844565b5050505050565b600061128a7f20ba3f2695242307bb397240ebae708e6526d91c2b4873959a60a64293b5466860001b611841565b6112b67f7dd3562209e56fbc54e20619aabc65cf2321e5b3f7a3cba64e1558ade20fa67860001b611841565b6112e27f70ba7d0a62f61e44af7a71981d76007ae0f6740c1b498546a0acade97579235060001b611841565b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549050919050565b600061135a7f2fc7ebe93440f52c92886c1c2f8b3f8d09496a8f6e4096e1c323b34952b064dc60001b611841565b6113867f9b8c7948af80c6b0cac2a86c200610473703c0bda4fb60c4069b15c1058a4d0060001b611841565b6113b27f9d8439cf1d466635063e77fe73f583c02157c5a84742cf4ea112e438ab429bf060001b611841565b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b836114497fc446a9677d3e6fbc46e638c55e6f26a068eb763412f38920ddcd997e3f1df45f60001b611841565b6114757f77db90627575e9a11702153cac86d6591277d7a228645f4d880f9b326e2c321360001b611841565b6114a17f3787a876e0d64780f462bc905f1cafa8d3546806ac5780d0af29a177c1c17d1160001b611841565b6114cd7faafed3e39865b91f18b593feba62d79929f245524e4082290d14789b65361e3c60001b611841565b8073ffffffffffffffffffffffffffffffffffffffff166302d05d3f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561151357600080fd5b505afa158015611527573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061154b919061199b565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146115b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115af90611c03565b60405180910390fd5b6115e47f18aabdcd900684d4c2ed14f37b4251059f7360d8a62a25dcd6f04e08445e405c60001b611841565b6116107f7d4c6d8558cf4ade17e1a88891a8fd96df9faf0b8f2bfe49606b22fe8d9a084960001b611841565b61163c7fad79418168cfb896b986b20c17ee717e472409c02deb281cbf4ca7e3b415b34f60001b611841565b6116687f0b0a23084590baec0a6afb539d17fe4040065b14a32ea2fc242cdf31e5bb85a360001b611841565b6116947f522a44c383bc21b3cb5ade37683252b7c3df0dba12d5a2931836311d6247861e60001b611841565b8473ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016116d193929190611b73565b602060405180830381600087803b1580156116eb57600080fd5b505af11580156116ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117239190611a63565b506117507f76fd93e42d57b69207ccbb1303f947240e4ba7dc7f6e05fd526a23cd38e8062e60001b611841565b61177c7f7c6d09b2275ac1d8efd4ac22e490a067b02a94a0ee826aaa9867624057a9655b60001b611841565b60405180604001604052808573ffffffffffffffffffffffffffffffffffffffff16815260200184815250600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050505050505050565b50565b6118dc828260405160240161185a929190611bd3565b6040516020818303038152906040527f9710a9d0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506118e0565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008135905061191881611e1e565b92915050565b60008151905061192d81611e1e565b92915050565b60008151905061194281611e35565b92915050565b60008135905061195781611e4c565b92915050565b60008151905061196c81611e4c565b92915050565b60006020828403121561198457600080fd5b600061199284828501611909565b91505092915050565b6000602082840312156119ad57600080fd5b60006119bb8482850161191e565b91505092915050565b600080600080608085870312156119da57600080fd5b60006119e887828801611909565b94505060206119f987828801611909565b9350506040611a0a87828801611948565b9250506060611a1b87828801611948565b91505092959194509250565b60008060408385031215611a3a57600080fd5b6000611a4885828601611909565b9250506020611a5985828601611948565b9150509250929050565b600060208284031215611a7557600080fd5b6000611a8384828501611933565b91505092915050565b600060208284031215611a9e57600080fd5b6000611aac8482850161195d565b91505092915050565b611abe81611ce5565b82525050565b6000611acf82611c3e565b611ad98185611c49565b9350611ae9818560208601611d2d565b611af281611dbe565b840191505092915050565b6000611b0a602583611c49565b9150611b1582611dcf565b604082019050919050565b611b2981611d23565b82525050565b6000602082019050611b446000830184611ab5565b92915050565b6000604082019050611b5f6000830185611ab5565b611b6c6020830184611ab5565b9392505050565b6000606082019050611b886000830186611ab5565b611b956020830185611ab5565b611ba26040830184611b20565b949350505050565b6000604082019050611bbf6000830185611ab5565b611bcc6020830184611b20565b9392505050565b60006040820190508181036000830152611bed8185611ac4565b9050611bfc6020830184611b20565b9392505050565b60006020820190508181036000830152611c1c81611afd565b9050919050565b6000602082019050611c386000830184611b20565b92915050565b600081519050919050565b600082825260208201905092915050565b6000611c6582611d23565b9150611c7083611d23565b925082611c8057611c7f611d8f565b5b828204905092915050565b6000611c9682611d23565b9150611ca183611d23565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611cda57611cd9611d60565b5b828202905092915050565b6000611cf082611d03565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b83811015611d4b578082015181840152602081019050611d30565b83811115611d5a576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f48617368757049474f3a204d757374206265204361727472696467652063726560008201527f61746f722e000000000000000000000000000000000000000000000000000000602082015250565b611e2781611ce5565b8114611e3257600080fd5b50565b611e3e81611cf7565b8114611e4957600080fd5b50565b611e5581611d23565b8114611e6057600080fd5b5056fe43726561746f7220746f6b656e2062616c616e63652061667465722073656c6c696e6720697349474f20436f6e7472616374204361727472696467652042616c616e636520697349474f20436f6e7472616374204361727472696467652042616c616e63652061667465722073656c6c696e67206973a264697066735822122084b495742836756032825719386ba1842a915d01e4775e40bfd5220057030c8164736f6c63430008040033";

export class HashupIGO__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<HashupIGO> {
    return super.deploy(overrides || {}) as Promise<HashupIGO>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): HashupIGO {
    return super.attach(address) as HashupIGO;
  }
  connect(signer: Signer): HashupIGO__factory {
    return super.connect(signer) as HashupIGO__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HashupIGOInterface {
    return new utils.Interface(_abi) as HashupIGOInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HashupIGO {
    return new Contract(address, _abi, signerOrProvider) as HashupIGO;
  }
}
