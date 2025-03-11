import express from "express";
import checkCache from "../utils/checkCache.js";
import axiosService from "./axiosService.js";

const app = express();

const expressServer = async (origin) => {
	app.get("*", async (req, res) => {
		const { url } = req;
		//Check cache to see if the response to the request is there.
		const cache = await checkCache(url);
		//If it is there, then let's use it instead.
		if (cache) {
			res.set("X-Cache", "HIT");
			return res.send(cache);
		};
		//If not, use axios to fetch it from the website.
		const axiosResponse = await axiosService(origin, url);
		res.set("X-Cache", "MISS");
		res.json(axiosResponse);
	});
};

export { app, expressServer };
