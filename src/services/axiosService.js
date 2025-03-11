import axios from "axios";
import client from "./redisClient.js";

const axiosService = async (origin, url) => {
	let forwardServer;
	switch (true) {
		case url.charAt(0) === "/" && origin.charAt(origin.length - 1) === "/":
			forwardServer = `${origin.slice(0, -1)}${url}`;
			break;
		//The funny thing is, we'll always would have a "/" in url with the way this is setup
		case url.charAt(0) != "/" && origin.charAt(origin.length - 1) != "/":
			forwardServer = `${origin}/${url}`;
			break;
		default:
			forwardServer = `${origin}${url}`;
	}

	try {
		const res = await axios.get(forwardServer);
		//Then set it in the cache for faster retrieval if the request is repeated within an hour of the initial request.
		let data = res.data;
		await client.setEx(url, 3600, JSON.stringify(data));
		return data;
	} catch (err) {
		if (err.status && err.status == 404) {
			console.error("URL not found. Try again");
			process.exit(1);
		};
		console.error("Error occurred while fetching website", err);
	}
};

export default axiosService;
