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

// hot repload
if (import.meta.hot) {
	console.log("hot reload");
	const killServer = () => server.close();
	import.meta.hot.on("vite:beforeFullReload", () => {
		console.log("full reload");
		killServer();
	});

	import.meta.hot.dispose(() => {
		console.log("dispose");
		killServer();
	});
}
