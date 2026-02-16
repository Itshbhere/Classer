import fs from "fs-extra";
import path from "path";


export async function loadAbi(filePath: string): Promise<any> {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".json") {
        return await fs.readJson(filePath);
    } else if (ext === ".js" || ext === ".ts") {
        const absolutePath = path.resolve(filePath);
        // Use jiti to handle both CJS and ESM, and TS files
        const createJiti = require("jiti");
        const jiti = createJiti(__filename);
        const module = jiti(absolutePath);



        // Try to find the ABI array
        let candidate = module.default || module.ABI || module.abi || module.Abi;

        // If default is an object containing ABI
        if (module.default && !Array.isArray(module.default)) {
            candidate = module.default.ABI || module.default.abi || module.default.Abi || candidate;
        }

        if (candidate && Array.isArray(candidate)) return candidate;

        // If the module itself is the array (unlikely for named export but possible for default)
        if (Array.isArray(module)) return module;

        // Specific check for the 'ABI' key as seen in logs
        if (Array.isArray(module.ABI)) return module.ABI;

        throw new Error(`Could not find ABI array in ${filePath}. Loaded keys: ${Object.keys(module).join(", ")}`);
    } else {
        throw new Error(`Unsupported file extension: ${ext}. Use .json, .js, or .ts`);
    }
}

export async function writefile(filePath: string, content: string): Promise<void> {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content);
}
