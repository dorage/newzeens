import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import mock from "./mock/index";
app.route("/mock", mock);

import keywordGroup from "./keyword-group/index";
app.route("/keyword-group", keywordGroup);

import publisher from "./publisher/index";
app.route("/publisher", publisher);

import article from "./article/index";
app.route("/article", article);

import banner from "./banner/index";
app.route("/banner", banner);

import campaign from "./campaign/index";
app.route("/campaign", campaign);

export default app;
