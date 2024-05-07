import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import image from "./image";
app.route("/image", image);

import rank from "./rank";
app.route("/rank", rank);

import campaign from "./campaign";
app.route("/campaign", campaign);

import publisher from "./publisher";
app.route("/publisher", publisher);

export default app;
