import express from "express";
import { StatusCodes } from "http-status-codes";
import client from "./src/services/redisClient.js";
const app = express();

const startProxyServer = async (port) => {
	try {
		app.listen(port, async () => {
			console.log(`Caching Proxy Server running on port ${port}`);
		});
		await client.connect();
		console.log("Cache database set up successfully");
	} catch (err) {
		console.log(err);
	}
};

app.get("*", (req, res) =>{
	const {path, url} = req;
	//Note:
	//to visit localhost:3000/sdgsg/45?dfgfdg=rete:
	//"url": "/sdgsg/45?dfgfdg=rete",
    // "path": "/sdgsg/45",
    // "query": {"dfgfdg": "rete"}
})

export { app, startProxyServer };

