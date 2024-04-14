import { serve } from "@hono/node-server";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
console.log(`Server is running on port ${port}`);

const server = serve({
	fetch: app.fetch,
	port,
});
