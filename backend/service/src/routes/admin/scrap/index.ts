import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getScrap from "./base/get";
app.route("", getScrap);

import postScrap from "./base/post";
app.route("", postScrap);

export default app;
