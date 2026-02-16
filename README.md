# Classer: ABI to TypeScript/JavaScript Class Generator

Classer is a CLI tool that automatically generates strongly-typed TypeScript or vanilla JavaScript classes from Ethereum ABI JSON/JS/TS files. It streamlines contract interaction by providing:

- **Strict Typing**: TypeScript types for all function inputs and outputs (optional).
- **Read/Write Separation**: Clear distinction between view functions and state-modifying transactions.
- **Provider Flexibility**: Support for both RPC (server-side) and `window.ethereum` (browser).
- **ERC20 Helpers**: Automatic injection of `getBalance` and `transferTokens` helpers for ERC20 contracts.
- **Robustness**: Automatic contract initialization, `setSigner` helpers, and error handling wrapping.
- **Ethers.js v6 Integration**: Built on top of the latest Ethers.js for robust interaction.

## Installation

To use it, you can install it globally or use `npx`:

```bash
npm install -g classer
# OR
npx classer [options]
```

## Usage

Basic usage:

```bash
classer \
  --abi <path_to_abi> \
  --name <ClassName> \
  --address <ContractAddress> \
  [options]
```

### Options

- `-a, --abi <path>`: **Required**. Path to the ABI file (`.json`, `.js`, `.ts`).
- `-n, --name <name>`: **Required**. Name of the class to generate.
- `-x, --address <address>`: **Required**. The default contract address.
- `-o, --output <path>`: Optional. Output file path. Defaults to `<ClassName>.[ts|js]`.
- `--provider <type>`: Optional. `'rpc'` (default) or `'window'`.
- `--lang <language>`: Optional. `'ts'` (default) or `'js'`.
- `--rpc <variable>`: Optional. Env var for RPC URL (only for RPC provider). Defaults to `NEXT_PUBLIC_RPC`.

### Examples

**1. Standard TypeScript Class (RPC Provider)**
```bash
classer \
  --abi test/samples/ERC20.json \
  --name MyToken \
  --address 0x123... \
  --provider rpc \
  --lang ts
```

**2. Browser/Frontend Class (Window Provider)**
This generates a class that connects to `window.ethereum` and handles wallet connection.
```bash
classer \
  --abi ABI/ABI.js \
  --name FrontendToken \
  --address 0x456... \
  --provider window
```

**Usage in Frontend:**
```typescript
const token = new FrontendToken();
// Auto-initializes on first call, or call explicitly
await token.setSigner(); 
await token.transfer("0xUser", "10"); 
```

**3. JavaScript Class (No Types)**
```bash
classer \
  --abi test/samples/ERC20.json \
  --name LegacyToken \
  --address 0x789... \
  --lang js
```

## Generated Code Features

- **Automatic Initialization**: All methods call `initializeContract()` internally to ensure provider/signer availability.
- **Error Handling**: All contract calls are wrapped in `try-catch` blocks with informative error logging.
- **Extensible**: The generated class can be easily extended or modified.
- **Isomorphic**: Works in Node.js (RPC) and Browser (Window) environments.
- **Zero Config**: Just pass the ABI and you are good to go.
