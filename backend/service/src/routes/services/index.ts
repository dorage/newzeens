import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import image from "./image";
app.route("/image", image);

import keywordGroup from "./keyword-group";
app.route("/keyword-group", keywordGroup);

import rank from "./rank";
app.route("/rank", rank);

import campaign from "./campaign";
app.route("/campaign", campaign);

import article from "./article";
app.route("/article", article);

import publisher from "./publisher";
app.route("/publisher", publisher);

import search from "./search";
app.route("/search", search);

import sitemap from "./sitemap";
app.route("/sitemap", sitemap);

export default app;
