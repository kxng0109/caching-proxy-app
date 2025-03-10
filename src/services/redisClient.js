import chalk from "chalk";
import { config } from "dotenv";
import { createClient } from "redis";
config();

const client = createClient({
	username: process.env.REDIS_USERNAME || undefined,
	password: process.env.REDIS_PASSWORD || undefined,
	socket: {
		host: process.env.REDIS_HOST || "127.0.0.1",
		port: process.env.REDIS_PORT || 6379
	}
});

if(!process.env.REDIS_HOST && !process.env.REDIS_PASSWORD){
	console.log(chalk.yellow("No Reids cloud credentials found. Falling back to local Redis instance."));
};

client.on("error", err =>{
	console.log(chalk.red(`Redis client error: ${err}`))
});

export default client;