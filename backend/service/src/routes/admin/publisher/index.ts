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

import getDetailRelation from "./[id]-relation/get";
app.route("/:id/relation", getDetailRelation);

import putDetailRelation from "./[id]-relation/put";
app.route("/:id/relation", putDetailRelation);

import postDetailRelation from "./[id]-relation/post";
app.route("/:id/relation", postDetailRelation);

import deleteDetailRelation from "./[id]-relation/delete";
app.route("/:id/relation", deleteDetailRelation);

export default app;
