import { StatusCodes } from "http-status-codes";
import { app } from "../../server.js";

app.get("/", (req, res) => {
	res.status(StatusCodes.OK).send("Welcome");
});

export default app;