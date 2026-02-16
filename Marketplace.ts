
import { ethers } from "ethers";

const ABI = [
  {
    "inputs": [
      {
        "internalType": "contract LandChain",
        "name": "_nft",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ApprovalNotGivenToMarketplace",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startingPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "AuctionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AuctionEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "DirectSaleCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "DirectSaleListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DirectSalePurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "RentSaleCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "duration",
        "type": "uint64"
      }
    ],
    "name": "RentSaleListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "renter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "expirationTime",
        "type": "uint64"
      }
    ],
    "name": "RentSalePurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawalSuccessful",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "AUCTION_EXTENSION_TIME",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINIMUM_BID_INCREMENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activeAuctions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activeDirectSales",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activeRentSales",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auctions",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startingPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "highestBidder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "highestBid",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "ended",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyDirectSale",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "cancelDirectSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "cancelRentSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startingPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "createAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "createDirectSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "duration",
        "type": "uint64"
      }
    ],
    "name": "createRentSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "directSales",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveAuctionTokenIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveDirectSaleTokenIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveListingsCounts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "auctionCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "directSaleCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rentSaleCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveRentSaleTokenIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllActiveAuctions",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "startingPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "highestBidder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "highestBid",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "ended",
            "type": "bool"
          }
        ],
        "internalType": "struct Marketplace.Auction[]",
        "name": "auctionDetails",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllActiveDirectSales",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct Marketplace.DirectSale[]",
        "name": "saleDetails",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllActiveRentSales",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint64",
            "name": "duration",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct Marketplace.RentSale[]",
        "name": "rentDetails",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nft",
    "outputs": [
      {
        "internalType": "contract LandChain",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pendingReturns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "placeBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "platformFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "rentNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rentSales",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "duration",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract LandChain",
        "name": "_nft",
        "type": "address"
      }
    ],
    "name": "setNftContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "setPlatformFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawPlatformFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

export class Marketplace {
    private provider: ethers.JsonRpcProvider;
    private readContract: ethers.Contract;
    private writeContract: ethers.Contract | null;
    private contractAddress: string;

    constructor(contractAddress: string = "0x57e872203a2a332b3Ddbee03bc15662c7Edf5dDe", privateKey?: string, rpcUrl?: string) {
        this.contractAddress = contractAddress;
        
        const rpc = rpcUrl || process.env.NEXT_PUBLIC_RPC;
        if (!rpc) {
            throw new Error("RPC URL not found. Please provide it or set NEXT_PUBLIC_RPC");
        }
        this.provider = new ethers.JsonRpcProvider(rpc);

        this.readContract = new ethers.Contract(
            this.contractAddress,
            ABI,
            this.provider
        );

        this.writeContract = privateKey
            ? new ethers.Contract(
                this.contractAddress,
                ABI,
                new ethers.Wallet(privateKey, this.provider)
            )
            : null;
    }

    

    // -------------------------
    // Write functions
    // -------------------------
    
  async buyDirectSale(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for buyDirectSale");
      }

      const tx = await this.writeContract.buyDirectSale(tokenId);
      await tx.wait();
      return tx;
  }


  async cancelDirectSale(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for cancelDirectSale");
      }

      const tx = await this.writeContract.cancelDirectSale(tokenId);
      await tx.wait();
      return tx;
  }


  async cancelRentSale(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for cancelRentSale");
      }

      const tx = await this.writeContract.cancelRentSale(tokenId);
      await tx.wait();
      return tx;
  }


  async createAuction(tokenId: string | number | bigint, startingPrice: string | number | bigint, duration: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for createAuction");
      }

      const tx = await this.writeContract.createAuction(tokenId, startingPrice, duration);
      await tx.wait();
      return tx;
  }


  async createDirectSale(tokenId: string | number | bigint, price: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for createDirectSale");
      }

      const tx = await this.writeContract.createDirectSale(tokenId, price);
      await tx.wait();
      return tx;
  }


  async createRentSale(tokenId: string | number | bigint, price: string | number | bigint, duration: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for createRentSale");
      }

      const tx = await this.writeContract.createRentSale(tokenId, price, duration);
      await tx.wait();
      return tx;
  }


  async endAuction(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for endAuction");
      }

      const tx = await this.writeContract.endAuction(tokenId);
      await tx.wait();
      return tx;
  }


  async pause(): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for pause");
      }

      const tx = await this.writeContract.pause();
      await tx.wait();
      return tx;
  }


  async placeBid(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for placeBid");
      }

      const tx = await this.writeContract.placeBid(tokenId);
      await tx.wait();
      return tx;
  }


  async renounceOwnership(): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for renounceOwnership");
      }

      const tx = await this.writeContract.renounceOwnership();
      await tx.wait();
      return tx;
  }


  async rentNFT(tokenId: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for rentNFT");
      }

      const tx = await this.writeContract.rentNFT(tokenId);
      await tx.wait();
      return tx;
  }


  async setNftContract(_nft: string): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for setNftContract");
      }

      const tx = await this.writeContract.setNftContract(_nft);
      await tx.wait();
      return tx;
  }


  async setPlatformFee(fee: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for setPlatformFee");
      }

      const tx = await this.writeContract.setPlatformFee(fee);
      await tx.wait();
      return tx;
  }


  async transferOwnership(newOwner: string): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for transferOwnership");
      }

      const tx = await this.writeContract.transferOwnership(newOwner);
      await tx.wait();
      return tx;
  }


  async unpause(): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for unpause");
      }

      const tx = await this.writeContract.unpause();
      await tx.wait();
      return tx;
  }


  async withdraw(): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for withdraw");
      }

      const tx = await this.writeContract.withdraw();
      await tx.wait();
      return tx;
  }


  async withdrawPlatformFees(): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for withdrawPlatformFees");
      }

      const tx = await this.writeContract.withdrawPlatformFees();
      await tx.wait();
      return tx;
  }


    // -------------------------
    // Read functions
    // -------------------------
    
  async AUCTION_EXTENSION_TIME(): Promise<any> {
      return await this.readContract.AUCTION_EXTENSION_TIME();
  }


  async MINIMUM_BID_INCREMENT(): Promise<any> {
      return await this.readContract.MINIMUM_BID_INCREMENT();
  }


  async activeAuctions(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.activeAuctions(arg0);
  }


  async activeDirectSales(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.activeDirectSales(arg0);
  }


  async activeRentSales(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.activeRentSales(arg0);
  }


  async auctions(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.auctions(arg0);
  }


  async directSales(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.directSales(arg0);
  }


  async getActiveAuctionTokenIds(): Promise<any> {
      return await this.readContract.getActiveAuctionTokenIds();
  }


  async getActiveDirectSaleTokenIds(): Promise<any> {
      return await this.readContract.getActiveDirectSaleTokenIds();
  }


  async getActiveListingsCounts(): Promise<any> {
      return await this.readContract.getActiveListingsCounts();
  }


  async getActiveRentSaleTokenIds(): Promise<any> {
      return await this.readContract.getActiveRentSaleTokenIds();
  }


  async getAllActiveAuctions(): Promise<any> {
      return await this.readContract.getAllActiveAuctions();
  }


  async getAllActiveDirectSales(): Promise<any> {
      return await this.readContract.getAllActiveDirectSales();
  }


  async getAllActiveRentSales(): Promise<any> {
      return await this.readContract.getAllActiveRentSales();
  }


  async nft(): Promise<any> {
      return await this.readContract.nft();
  }


  async owner(): Promise<any> {
      return await this.readContract.owner();
  }


  async paused(): Promise<any> {
      return await this.readContract.paused();
  }


  async pendingReturns(arg0: string): Promise<any> {
      return await this.readContract.pendingReturns(arg0);
  }


  async platformFee(): Promise<any> {
      return await this.readContract.platformFee();
  }


  async rentSales(arg0: string | number | bigint): Promise<any> {
      return await this.readContract.rentSales(arg0);
  }

}
