import "./libs/dotenv";
import { serve } from "@hono/node-server";
import app from "./app";

const port = process.env.PORT;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});
