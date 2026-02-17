
export type ProviderType = 'rpc' | 'window';
export type Language = 'ts' | 'js';

export function solidityTypeToTs(type: string): string {
    if (type.startsWith("uint") || type.startsWith("int")) {
        return "string | number | bigint";
    }
    if (type === "address") return "string";
    if (type === "bool") return "boolean";
    if (type === "string") return "string";
    if (type.startsWith("bytes")) return "string";
    if (type === "tuple") return "any"; // TODO: Handle tuples better if needed
    if (type.endsWith("[]")) return "any[]"; // Arrays
    return "any";
}

function isReadFunction(fn: any) {
    return (
        fn.stateMutability === "view" ||
        fn.stateMutability === "pure"
    );
}

function isWriteFunction(fn: any) {
    return (
        fn.stateMutability === "nonpayable" ||
        fn.stateMutability === "payable"
    );
}

function generateParams(inputs: any[], language: Language) {
    if (!inputs || inputs.length === 0) return "";
    return inputs
        .map((i: any, idx: number) => {
            const name = i.name || `arg${idx}`;
            return language === 'ts'
                ? `${name}: ${solidityTypeToTs(i.type)}`
                : name;
        })
        .join(", ");
}

function generateReadMethod(fn: any, language: Language) {
    const params = generateParams(fn.inputs, language);
    const argNames = fn.inputs ? fn.inputs.map((i: any, idx: number) => i.name || `arg${idx}`).join(", ") : "";

    const returnType = language === 'ts' ? ": Promise<any>" : "";

    return `
  async ${fn.name}(${params})${returnType} {
      try {
        await this.initializeContract();
        return await this.contract.${fn.name}(${argNames});
      } catch (error) {
        console.error("Failed to read ${fn.name}:", error);
        throw error;
      }
  }
`;
}

function generateWriteMethod(fn: any, language: Language) {
    const params = generateParams(fn.inputs, language);
    const argNames = fn.inputs ? fn.inputs.map((i: any, idx: number) => i.name || `arg${idx}`).join(", ") : "";

    const returnType = language === 'ts' ? ": Promise<ethers.ContractTransactionResponse>" : "";

    return `
  async ${fn.name}(${params})${returnType} {
      try {
        await this.initializeContract();
        if (!this.contract.runner) {
             throw new Error("Signer required for ${fn.name}. Ensure you have connected a wallet.");
        }
        
        const tx = await this.contract.${fn.name}(${argNames});
        await tx.wait();
        return tx;
      } catch (error) {
        console.error("Failed to execute ${fn.name}:", error);
        throw error;
      }
  }
`;
}

function isERC20(abi: any[]) {
    const names = abi
        .filter((x) => x.type === "function")
        .map((x) => x.name);

    return (
        names.includes("decimals") &&
        names.includes("symbol") &&
        names.includes("balanceOf") &&
        names.includes("transfer")
    );
}

export function generateClass({
    abi,
    className,
    contractAddress,
    rpcEnvVar = "NEXT_PUBLIC_RPC",
    providerType = 'rpc',
    language = 'ts'
}: {
    abi: any[];
    className: string;
    contractAddress: string;
    rpcEnvVar?: string;
    providerType?: ProviderType;
    language?: Language;
}) {
    const readFns = abi.filter(
        (x) => x.type === "function" && isReadFunction(x)
    );
    const writeFns = abi.filter(
        (x) => x.type === "function" && isWriteFunction(x)
    );

    const isErc20Token = isERC20(abi);
    const isTs = language === 'ts';

    let erc20Methods = "";
    if (isErc20Token) {
        const balanceReturnType = isTs ? ": Promise<string>" : "";
        const txReturnType = isTs ? ": Promise<ethers.ContractTransactionResponse>" : "";
        const addressType = isTs ? ": string" : "";
        const amountType = isTs ? ": string" : "";

        erc20Methods = `
    // -------------------------
    // ERC20 Helpers
    // -------------------------
    
    async getBalance(address${addressType})${balanceReturnType} {
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
    
    async transferTokens(to${addressType}, amount${amountType})${txReturnType} {
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
    `;
    }

    // Type Definitions
    const fieldTypes = isTs ? `
    private provider: ethers.Provider | ethers.BrowserProvider | null; 
    private signer: ethers.Signer | null;
    private contract: ethers.Contract | null;
    private contractAddress: string;
  ` : "";

    // Constructor logic
    let constructorCode = "";
    let methodsCode = "";

    if (providerType === 'rpc') {
        const ctorParams = isTs
            ? `contractAddress: string = "${contractAddress}", privateKey?: string, rpcUrl?: string`
            : `contractAddress = "${contractAddress}", privateKey, rpcUrl`;

        constructorCode = `
    constructor(${ctorParams}) {
        this.contractAddress = contractAddress;
        this.contract = null;
        this.signer = null;
        
        const rpc = rpcUrl || process.env.${rpcEnvVar};
        if (!rpc) {
            throw new Error("RPC URL not found. Please provide it or set ${rpcEnvVar}");
        }
        this.provider = new ethers.JsonRpcProvider(rpc);
        
        if (privateKey) {
            this.signer = new ethers.Wallet(privateKey, this.provider);
        }
    }
      `;

        methodsCode = `
    async initializeContract()${isTs ? ": Promise<void>" : ""} {
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
      `;
    } else {
        // Window / Browser provider
        const ctorParams = isTs
            ? `contractAddress: string = "${contractAddress}"`
            : `contractAddress = "${contractAddress}"`;

        constructorCode = `
    constructor(${ctorParams}) {
        this.contractAddress = contractAddress;
        this.provider = null;
        this.signer = null;
        this.contract = null;
    }
      `;

        methodsCode = `
    async init()${isTs ? ": Promise<void>" : ""} {
        if (typeof window !== "undefined" && ${isTs ? "(window as any).ethereum" : "window.ethereum"}) {
            this.provider = new ethers.BrowserProvider(${isTs ? "(window as any).ethereum" : "window.ethereum"});
        } else {
            throw new Error("window.ethereum is not available");
        }
    }

    async setSigner()${isTs ? ": Promise<void>" : ""} {
         try {
            if (!this.provider) await this.init();
            
            // @ts-ignore
            this.signer = await this.provider.getSigner();
        } catch (error) {
            console.error("Failed to set signer:", error);
            throw error;
        }
    }

    async getSignerAddress()${isTs ? ": Promise<string>" : ""} {
        try {
            if (!this.signer) await this.setSigner();
            // @ts-ignore
            return await this.signer.getAddress();
        } catch (error) {
            console.error("Failed to get signer address:", error);
            throw error;
        }
    }

    async initializeContract()${isTs ? ": Promise<void>" : ""} {
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
      `;
    }

    return `
import { ethers } from "ethers";

const ABI = ${JSON.stringify(abi, null, 2)};

export class ${className} {
    ${fieldTypes}
    ${constructorCode}
    
    ${methodsCode}

    ${erc20Methods}

    // -------------------------
    // Write functions
    // -------------------------
    ${writeFns.map(fn => generateWriteMethod(fn, language)).join("\n")}

    // -------------------------
    // Read functions
    // -------------------------
    ${readFns.map(fn => generateReadMethod(fn, language)).join("\n")}
}
`;
}
