
import { ethers } from "ethers";

const ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

export class WindowToken {
    
    private provider: ethers.Interface | any; 
    private readContract: ethers.Contract;
    private writeContract: ethers.Contract | null;
    private contractAddress: string;
  
    
    constructor(contractAddress: string = "0x1234567890123456789012345678901234567890") {
        this.contractAddress = contractAddress;
        this.writeContract = null;
        this.readContract = null as any; 
        
        // Note: Must call init() to setup provider and signer
    }

    async init(): Promise<void> {
        if (typeof window !== "undefined" && (window as any).ethereum) {
            this.provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await this.provider.getSigner();
            
            this.readContract = new ethers.Contract(
                this.contractAddress,
                ABI,
                this.provider
            );
            
            this.writeContract = new ethers.Contract(
                this.contractAddress,
                ABI,
                signer
            );
        } else {
            throw new Error("window.ethereum is not available");
        }
    }
      

    
    // -------------------------
    // ERC20 Helpers
    // -------------------------
    
    async getBalance(address: string): Promise<string> {
        const balance = await this.readContract.balanceOf(address);
        const decimals = await this.readContract.decimals();
        return ethers.formatUnits(balance, decimals);
    }
    
    async transferTokens(to: string, amount: string): Promise<ethers.ContractTransactionResponse> {
         if (!this.writeContract) {
            throw new Error("Signer required for transferTokens");
        }
        const decimals = await this.readContract.decimals();
        const parsedAmount = ethers.parseUnits(amount, decimals);
        const tx = await this.writeContract.transfer(to, parsedAmount);
        await tx.wait();
        return tx;
    }
    

    // -------------------------
    // Write functions
    // -------------------------
    
  async approve(_spender: string, _value: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for approve");
      }

      const tx = await this.writeContract.approve(_spender, _value);
      await tx.wait();
      return tx;
  }


  async transferFrom(_from: string, _to: string, _value: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for transferFrom");
      }

      const tx = await this.writeContract.transferFrom(_from, _to, _value);
      await tx.wait();
      return tx;
  }


  async transfer(_to: string, _value: string | number | bigint): Promise<ethers.ContractTransactionResponse> {
      if (!this.writeContract) {
          throw new Error("Signer required for transfer");
      }

      const tx = await this.writeContract.transfer(_to, _value);
      await tx.wait();
      return tx;
  }


    // -------------------------
    // Read functions
    // -------------------------
    
  async name(): Promise<any> {
      return await this.readContract.name();
  }


  async totalSupply(): Promise<any> {
      return await this.readContract.totalSupply();
  }


  async decimals(): Promise<any> {
      return await this.readContract.decimals();
  }


  async balanceOf(_owner: string): Promise<any> {
      return await this.readContract.balanceOf(_owner);
  }


  async symbol(): Promise<any> {
      return await this.readContract.symbol();
  }


  async allowance(_owner: string, _spender: string): Promise<any> {
      return await this.readContract.allowance(_owner, _spender);
  }

}
