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

import getDetailKeyword from "./[id].keyword/get";
app.route("/:id/keyword", getDetailKeyword);

import postDetailKeyword from "./[id].keyword/post";
app.route("/:id/keyword", postDetailKeyword);

import deleteDetailKeyword from "./[id].keyword/delete";
app.route("/:id/keyword", deleteDetailKeyword);

export default app;
