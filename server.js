import chalk from "chalk";
import { app } from "./src/services/expressService.js";
import client from "./src/services/redisClient.js";

const startProxyServer = async (port) => {
	try {
		app.listen(port, async () => {
			console.log(
				chalk.cyanBright(
					`Caching Proxy Server running on port ${port}`,
				),
			);
		});
		await client.connect();
		console.log(chalk.green("Cache database set up successfully"));
	} catch (err) {
		console.error(
			chalk.redBright(
				`An error occurred while setting up the Caching Proxy Server: 
					${err.message || err}`,
			),
		);
		process.exit(1);
	}
};

export default startProxyServer;
