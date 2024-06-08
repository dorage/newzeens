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

import getArticle from "./[id].article/get";
app.route("/:id/article", getArticle);

import putArticle from "./[id].article/put";
app.route("/:id/article", putArticle);

import getPublisher from "./[id].publisher/get";
app.route("/:id/publisher", getPublisher);

import putPublisher from "./[id].publisher/put";
app.route("/:id/publisher", putPublisher);

export default app;
