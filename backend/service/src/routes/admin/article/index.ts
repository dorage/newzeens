import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("", getBase);

import postBase from "./base/post";
app.route("", postBase);

import getDetail from "./[id]/get";
app.route("/:id", getDetail);

import deleteDetail from "./[id]/delete";
app.route("/:id", deleteDetail);

import putDetail from "./[id]/put";
app.route("/:id", putDetail);

import postDetailUpload from "./[id].upload/post";
app.route("/:id/upload", postDetailUpload);

export default app;
