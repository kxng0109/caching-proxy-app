import { InvalidArgumentError } from "commander";
import validator from "validator";

const sanitizePort = (portNumber, previous) => {
	const parsedValue = validator.toInt(portNumber, 10);
	if (parsedValue < 0 || parsedValue > 65535) {
		throw new InvalidArgumentError("Invalid port number");
	}
	if (isNaN(parsedValue)) {
		throw new InvalidArgumentError("Port must be a number");
	}
	return parsedValue;
};

export default sanitizePort;
