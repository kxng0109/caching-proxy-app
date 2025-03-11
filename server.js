import { app } from "./src/services/expressService.js";
import client from "./src/services/redisClient.js";

const startProxyServer = async (port) => {
	try {
		app.listen(port, async () => {
			console.log(`Caching Proxy Server running on port ${port}`);
		});
		await client.connect();
		console.log("Cache database set up successfully");
	} catch (err) {
		console.error(
			"An error occurred while setting up the Caching Proxy Server",
			err,
		);
	}
};

export default startProxyServer;
