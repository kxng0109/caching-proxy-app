import { InvalidArgumentError } from "commander";

const myParseInt = (value, previous) =>{
	const parsedValue = parseInt(value, 10);
	if(isNaN(parsedValue)){
		throw new InvalidArgumentError("Port must be a number");
	};
	return parsedValue;
}

export default myParseInt;