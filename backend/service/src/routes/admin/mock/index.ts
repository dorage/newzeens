import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import postBase from "./base/post";
app.route("", postBase);

import deleteBase from "./base/delete";
app.route("", deleteBase);

export default app;
