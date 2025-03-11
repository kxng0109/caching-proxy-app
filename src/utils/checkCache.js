import chalk from "chalk";
import client from "../services/redisClient.js";

const checkCache = async (key) => {
	//In this case, the key is the url
	try {
		const fetchedKey = await client.get(key);
		if (fetchedKey) {
			console.log(
				chalk.blueBright("Found in cache. Getting from cache instead."),
			);
			const treatedValue = JSON.parse(fetchedKey);
			return treatedValue;
		}
		return false;
	} catch (err) {
		console.error("Error occured while checking for cache", err);
	}
};

export default checkCache;
