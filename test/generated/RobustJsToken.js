
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

export class RobustJsToken {
    
    
    constructor(contractAddress = "0x1234567890123456789012345678901234567890") {
        this.contractAddress = contractAddress;
        this.provider = null;
        this.signer = null;
        this.contract = null;
    }
      
    
    
    async init() {
        if (typeof window !== "undefined" && (window as any).ethereum) {
            this.provider = new ethers.BrowserProvider((window as any).ethereum);
        } else {
            throw new Error("window.ethereum is not available");
        }
    }

    async setSigner() {
         try {
            if (!this.provider) await this.init();
            
            // @ts-ignore
            this.signer = await this.provider.getSigner();
        } catch (error) {
            console.error("Failed to set signer:", error);
            throw error;
        }
    }

    async getSignerAddress() {
        try {
            if (!this.signer) await this.setSigner();
            // @ts-ignore
            return await this.signer.getAddress();
        } catch (error) {
            console.error("Failed to get signer address:", error);
            throw error;
        }
    }

    async initializeContract() {
         try {
            if (!this.provider) await this.init();
            
            if (!this.signer) {
                // Try to get signer if possible, otherwise implementation might fail for usage requiring signer
                // But we don't force it here to allow read-only if the user hasn't connected wallet yet?
                // Actually, for consistency with 'setSigner', let's try to get it.
                try {
                    // @ts-ignore
                    this.signer = await this.provider.getSigner();
                } catch (e) {
                    console.warn("Could not get signer, defaulting to read-only provider if possible");
                }
            }

            if (!this.contract) {
                const runner = this.signer || this.provider;
                this.contract = new ethers.Contract(
                    this.contractAddress,
                    ABI,
                    runner
                );
            }
        } catch (error) {
            console.error("Failed to initialize contract:", error);
            throw error;
        }
    }
      

    
    // -------------------------
    // ERC20 Helpers
    // -------------------------
    
    async getBalance(address) {
        try {
            await this.initializeContract();
            const balance = await this.contract.balanceOf(address);
            const decimals = await this.contract.decimals();
            return ethers.formatUnits(balance, decimals);
        } catch (error) {
            console.error("Failed to get balance:", error);
            throw error;
        }
    }
    
    async transferTokens(to, amount) {
        try {
             await this.initializeContract();
             if (!this.contract.runner) {
                throw new Error("Signer required for transferTokens");
            }
            const decimals = await this.contract.decimals();
            const parsedAmount = ethers.parseUnits(amount, decimals);
            const tx = await this.contract.transfer(to, parsedAmount);
            await tx.wait();
            return tx;
        } catch (error) {
            console.error("Failed to transfer tokens:", error);
            throw error;
        }
    }
    

    // -------------------------
    // Write functions
    // -------------------------
    
  async approve(_spender, _value) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for approve. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.approve(_spender, _value);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute approve:", error);
        throw error;
      }
  }


  async transferFrom(_from, _to, _value) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for transferFrom. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.transferFrom(_from, _to, _value);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute transferFrom:", error);
        throw error;
      }
  }


  async transfer(_to, _value) {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for transfer. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.transfer(_to, _value);
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute transfer:", error);
        throw error;
      }
  }


    // -------------------------
    // Read functions
    // -------------------------
    
  async name() {
      try {
        await this.initializeContract();
        return await this.contract.name();
      } catch (error) {
        console.error("Failed to read name:", error);
        throw error;
      }
  }


  async totalSupply() {
      try {
        await this.initializeContract();
        return await this.contract.totalSupply();
      } catch (error) {
        console.error("Failed to read totalSupply:", error);
        throw error;
      }
  }


  async decimals() {
      try {
        await this.initializeContract();
        return await this.contract.decimals();
      } catch (error) {
        console.error("Failed to read decimals:", error);
        throw error;
      }
  }


  async balanceOf(_owner) {
      try {
        await this.initializeContract();
        return await this.contract.balanceOf(_owner);
      } catch (error) {
        console.error("Failed to read balanceOf:", error);
        throw error;
      }
  }


  async symbol() {
      try {
        await this.initializeContract();
        return await this.contract.symbol();
      } catch (error) {
        console.error("Failed to read symbol:", error);
        throw error;
      }
  }


  async allowance(_owner, _spender) {
      try {
        await this.initializeContract();
        return await this.contract.allowance(_owner, _spender);
      } catch (error) {
        console.error("Failed to read allowance:", error);
        throw error;
      }
  }

}
