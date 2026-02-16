
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

export class JsToken {
    
    
    constructor(contractAddress = "0x9876543210987654321098765432109876543210", privateKey, rpcUrl) {
        this.contractAddress = contractAddress;
        this.contract = null;
        this.signer = null;
        
        const rpc = rpcUrl || process.env.NEXT_PUBLIC_RPC;
        if (!rpc) {
            throw new Error("RPC URL not found. Please provide it or set NEXT_PUBLIC_RPC");
        }
        this.provider = new ethers.JsonRpcProvider(rpc);
        
        if (privateKey) {
            this.signer = new ethers.Wallet(privateKey, this.provider);
        }
    }
      
    
    
    async initializeContract() {
        if (this.contract) return;
        
        try {
            // If we have a signer (private key), use it. Otherwise use provider (read-only)
            const runner = this.signer || this.provider;
            this.contract = new ethers.Contract(
                this.contractAddress,
                ABI,
                runner
            );
        } catch (error) {
             console.error("Failed to initialize contract:", error);
             throw error;
        }
    }
      

    

    // -------------------------
    // Write functions
    // -------------------------
    
  async buyDirectSale(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for buyDirectSale. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.buyDirectSale(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute buyDirectSale:", error);
        throw error;
      }
  }


  async cancelDirectSale(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for cancelDirectSale. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.cancelDirectSale(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute cancelDirectSale:", error);
        throw error;
      }
  }


  async cancelRentSale(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for cancelRentSale. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.cancelRentSale(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute cancelRentSale:", error);
        throw error;
      }
  }


  async createAuction(tokenId, startingPrice, duration) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for createAuction. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.createAuction(tokenId, startingPrice, duration);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute createAuction:", error);
        throw error;
      }
  }


  async createDirectSale(tokenId, price) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for createDirectSale. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.createDirectSale(tokenId, price);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute createDirectSale:", error);
        throw error;
      }
  }


  async createRentSale(tokenId, price, duration) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for createRentSale. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.createRentSale(tokenId, price, duration);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute createRentSale:", error);
        throw error;
      }
  }


  async endAuction(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for endAuction. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.endAuction(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute endAuction:", error);
        throw error;
      }
  }


  async pause() {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for pause. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.pause();
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute pause:", error);
        throw error;
      }
  }


  async placeBid(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for placeBid. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.placeBid(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute placeBid:", error);
        throw error;
      }
  }


  async renounceOwnership() {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for renounceOwnership. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.renounceOwnership();
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute renounceOwnership:", error);
        throw error;
      }
  }


  async rentNFT(tokenId) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for rentNFT. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.rentNFT(tokenId);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute rentNFT:", error);
        throw error;
      }
  }


  async setNftContract(_nft) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for setNftContract. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.setNftContract(_nft);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute setNftContract:", error);
        throw error;
      }
  }


  async setPlatformFee(fee) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for setPlatformFee. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.setPlatformFee(fee);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute setPlatformFee:", error);
        throw error;
      }
  }


  async transferOwnership(newOwner) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for transferOwnership. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.transferOwnership(newOwner);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute transferOwnership:", error);
        throw error;
      }
  }


  async unpause() {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for unpause. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.unpause();
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute unpause:", error);
        throw error;
      }
  }


  async withdraw() {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for withdraw. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.withdraw();
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute withdraw:", error);
        throw error;
      }
  }


  async withdrawPlatformFees() {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for withdrawPlatformFees. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.withdrawPlatformFees();
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute withdrawPlatformFees:", error);
        throw error;
      }
  }


    // -------------------------
    // Read functions
    // -------------------------
    
  async AUCTION_EXTENSION_TIME() {
      try {
        await this.initializeContract();
        return await this.contract.AUCTION_EXTENSION_TIME();
      } catch (error) {
        console.error("Failed to read AUCTION_EXTENSION_TIME:", error);
        throw error;
      }
  }


  async MINIMUM_BID_INCREMENT() {
      try {
        await this.initializeContract();
        return await this.contract.MINIMUM_BID_INCREMENT();
      } catch (error) {
        console.error("Failed to read MINIMUM_BID_INCREMENT:", error);
        throw error;
      }
  }


  async activeAuctions(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.activeAuctions(arg0);
      } catch (error) {
        console.error("Failed to read activeAuctions:", error);
        throw error;
      }
  }


  async activeDirectSales(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.activeDirectSales(arg0);
      } catch (error) {
        console.error("Failed to read activeDirectSales:", error);
        throw error;
      }
  }


  async activeRentSales(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.activeRentSales(arg0);
      } catch (error) {
        console.error("Failed to read activeRentSales:", error);
        throw error;
      }
  }


  async auctions(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.auctions(arg0);
      } catch (error) {
        console.error("Failed to read auctions:", error);
        throw error;
      }
  }


  async directSales(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.directSales(arg0);
      } catch (error) {
        console.error("Failed to read directSales:", error);
        throw error;
      }
  }


  async getActiveAuctionTokenIds() {
      try {
        await this.initializeContract();
        return await this.contract.getActiveAuctionTokenIds();
      } catch (error) {
        console.error("Failed to read getActiveAuctionTokenIds:", error);
        throw error;
      }
  }


  async getActiveDirectSaleTokenIds() {
      try {
        await this.initializeContract();
        return await this.contract.getActiveDirectSaleTokenIds();
      } catch (error) {
        console.error("Failed to read getActiveDirectSaleTokenIds:", error);
        throw error;
      }
  }


  async getActiveListingsCounts() {
      try {
        await this.initializeContract();
        return await this.contract.getActiveListingsCounts();
      } catch (error) {
        console.error("Failed to read getActiveListingsCounts:", error);
        throw error;
      }
  }


  async getActiveRentSaleTokenIds() {
      try {
        await this.initializeContract();
        return await this.contract.getActiveRentSaleTokenIds();
      } catch (error) {
        console.error("Failed to read getActiveRentSaleTokenIds:", error);
        throw error;
      }
  }


  async getAllActiveAuctions() {
      try {
        await this.initializeContract();
        return await this.contract.getAllActiveAuctions();
      } catch (error) {
        console.error("Failed to read getAllActiveAuctions:", error);
        throw error;
      }
  }


  async getAllActiveDirectSales() {
      try {
        await this.initializeContract();
        return await this.contract.getAllActiveDirectSales();
      } catch (error) {
        console.error("Failed to read getAllActiveDirectSales:", error);
        throw error;
      }
  }


  async getAllActiveRentSales() {
      try {
        await this.initializeContract();
        return await this.contract.getAllActiveRentSales();
      } catch (error) {
        console.error("Failed to read getAllActiveRentSales:", error);
        throw error;
      }
  }


  async nft() {
      try {
        await this.initializeContract();
        return await this.contract.nft();
      } catch (error) {
        console.error("Failed to read nft:", error);
        throw error;
      }
  }


  async owner() {
      try {
        await this.initializeContract();
        return await this.contract.owner();
      } catch (error) {
        console.error("Failed to read owner:", error);
        throw error;
      }
  }


  async paused() {
      try {
        await this.initializeContract();
        return await this.contract.paused();
      } catch (error) {
        console.error("Failed to read paused:", error);
        throw error;
      }
  }


  async pendingReturns(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.pendingReturns(arg0);
      } catch (error) {
        console.error("Failed to read pendingReturns:", error);
        throw error;
      }
  }


  async platformFee() {
      try {
        await this.initializeContract();
        return await this.contract.platformFee();
      } catch (error) {
        console.error("Failed to read platformFee:", error);
        throw error;
      }
  }


  async rentSales(arg0) {
      try {
        await this.initializeContract();
        return await this.contract.rentSales(arg0);
      } catch (error) {
        console.error("Failed to read rentSales:", error);
        throw error;
      }
  }

}
