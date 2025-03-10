import { Command } from "commander";
import { config } from "dotenv";
import { startProxyServer } from "./server.js";
import client from "./src/services/redisClient.js";
import myParseInt from "./src/utils/myParseInt.js";
const program = new Command();
config();
let PORT = process.env.PORT || 3000;

program
	.name("caching-proxy")
	.description("A caching server that caches responses from other servers.")
	.option(
		"-p, --port <number>",
		"Port the caching server will run on",
		myParseInt,
	)
	// .option("-o, --origin <url>", "URL of the server to which the request will be forwarded")
	.option("-c, --clear-cache", "Clear the server cache")
	.action(async (options) => {
		if (options.port) {
			options.port && (PORT = options.port);
			await startProxyServer(PORT);
		}
		if (options.clearCache) {
			client.connect();
			client.FLUSHALL();
			client.quit();
		}
	});

program.parse();
