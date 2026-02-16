import { Command } from "commander";
import path from "path";
import { loadAbi, writefile } from "./utils";
import { generateClass } from "./generator";

const program = new Command();

program
    .version("1.0.0")
    .description("Generate TypeScript class from ABI JSON")
    .requiredOption("-a, --abi <path>", "Path to ABI JSON file")
    .requiredOption("-n, --name <name>", "Name of the class to generate")
    .requiredOption("-x, --address <address>", "Contract address")
    .option("-o, --output <path>", "Output file path")
    .option("--provider <type>", "Provider type: 'rpc' | 'window'", "rpc")
    .option("--lang <language>", "Output language: 'ts' | 'js'", "ts")
    .action(async (options) => {
        try {
            const abiPath = path.resolve(process.cwd(), options.abi);
            const abi = await loadAbi(abiPath);

            // Validate options
            if (!['rpc', 'window'].includes(options.provider)) {
                throw new Error("Invalid provider type. Must be 'rpc' or 'window'.");
            }
            if (!['ts', 'js'].includes(options.lang)) {
                throw new Error("Invalid language. Must be 'ts' or 'js'.");
            }

            const classCode = generateClass({
                abi,
                className: options.name,
                contractAddress: options.address,
                rpcEnvVar: options.rpc,
                providerType: options.provider as any,
                language: options.lang as any
            });

            const extension = options.lang === 'js' ? 'js' : 'ts';
            const outputPath = options.output
                ? path.resolve(process.cwd(), options.output)
                : path.join(process.cwd(), `${options.name}.${extension}`);

            await writefile(outputPath, classCode);

            console.log(`Successfully generated ${options.name} at ${outputPath}`);
        } catch (error) {
            console.error("Error generating class:", error);
            process.exit(1);
        }
    });

program.parse(process.argv);
