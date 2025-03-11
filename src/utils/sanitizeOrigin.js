import { InvalidArgumentError } from "commander";
import validator from "validator";

const sanitizeURL = (url, previous) => {
	const isValidURL = validator.isURL(url, { protocols: ["http", "https"] });
	if (isValidURL) {
		return url;
	} else {
		throw new InvalidArgumentError("URL is invalid");
	}
};

export default sanitizeURL;
