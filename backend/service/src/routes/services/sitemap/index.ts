import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getArticle from "./article/get";
app.route("/article", getArticle);

import getPublisher from "./publiser/get";
app.route("/publisher", getPublisher);

export default app;
