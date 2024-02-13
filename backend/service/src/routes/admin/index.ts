import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import mock from "./mock/index";
app.route("/mock", mock);

import keyword from "./keyword/index";
app.route("/keyword", keyword);

import publisher from "./publisher/index";
app.route("/publisher", publisher);

import article from "./article/index";
app.route("/article", article);

import banner from "./banner/index";
app.route("/banner", banner);

export default app;
