#!/usr/bin/env node
import chalk from "chalk";
import { Command, Option } from "commander";
import { config } from "dotenv";
import startProxyServer from "./server.js";
import { expressServer } from "./src/services/expressService.js";
import client from "./src/services/redisClient.js";
import sanitizeURL from "./src/utils/sanitizeOrigin.js";
import sanitizePort from "./src/utils/sanitizePort.js";

config();
const program = new Command();
const DEFAULTPORT = 3000;

program
	.name("caching-proxy")
	.description("A caching server that caches responses from other servers.")
	.addOption(
		new Option("-p, --port <number>", "Port the caching server will run on")
			.default(
				DEFAULTPORT,
				"Default port it will run on if not port is specified and if there isn't any PORT environment variable",
			)
			.env("PORT")
			.argParser(sanitizePort),
	)
	.option(
		"-o, --origin <url>",
		"URL of the server to which the request will be forwarded",
		sanitizeURL
	)
	.option("-c, --clear-cache", "Clear the server cache")
	.action(async (options) => {
		if (options.port && options.origin) {
			try {
				await startProxyServer(options.port);
				await expressServer(options.origin);
			} catch (err) {
				console.error(chalk.red(err));
			}
		}
		if (options.clearCache) {
			await client.connect();
			await client.FLUSHALL();
			console.info(chalk.blueBright("Cache cleared!"));
			await client.quit();
		}
	});

program.parse();
