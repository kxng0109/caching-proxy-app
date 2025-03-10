import axios from "axios";
import client from "../services/redisClient.js";

const checkCache = async(key) =>{
	try{
		if(client.get(key)){
			console.log("Found in cache. Getting from cache instead.");
			const rawValue = await client.get(key);
			const treatedValue = JSON.parse(rawValue);
			return treatedValue;
		}
		console.log("Not found in cache. Getting from website instead");
		axios.get()
	}catch(err){
		console.log("Error occured at checkCache", err);
	}
}