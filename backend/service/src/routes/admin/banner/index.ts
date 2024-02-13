import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("/", getBase);

import postBase from "./base/post";
app.route("/", postBase);

import putDetail from "./[id]/put";
app.route("/:id", putDetail);

import deleteDetail from "./[id]/delete";
app.route("/:id", deleteDetail);

export default app;
