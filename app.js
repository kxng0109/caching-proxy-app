import { Command, InvalidArgumentError, Option } from "commander";
import { config } from "dotenv";
const program = new Command();
config();
const PORT = process.env.PORT || 3000;

const myParseInt = (value, previous) =>{
	const parsedValue = parseInt(value, 10);
	if(isNaN(parsedValue)){
		throw new InvalidArgumentError("Port must be a number");
	};
	return parsedValue;
}

program
	.name("caching-proxy")
	.description("A caching server that caches responses from other servers.")
	.requiredOption("-p, --port <number>", "Port the caching server will run on", myParseInt)
	.requiredOption("-o, --origin <url>", "URL of the server to which the request will be forwarded")
	.option("-c, --clear-cache", "Clear the server cache")
	.action(options => {
		if(options.clearCache){
			//clear redis cache
		};
		console.log(options)
	});

program.parse();
