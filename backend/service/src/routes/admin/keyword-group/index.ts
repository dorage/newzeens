import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("", getBase);

import postBase from "./base/post";
app.route("", postBase);

import deleteDetail from "./[id]/delete";
app.route("/:id", deleteDetail);

import putDetail from "./[id]/put";
app.route("/:id", putDetail);

import getDetailKeyword from "./[id].keyword/get";
app.route("/:id/keyword", getDetailKeyword);

import postDetailKeyword from "./[id].keyword/post";
app.route("/:id/keyword", postDetailKeyword);

import deleteDetailKeywordDetail from "./[id].keyword.[keyword_Id]/delete";
app.route("/:id/keyword/:keyword_id", deleteDetailKeywordDetail);

import putDetailKeywordDetail from "./[id].keyword.[keyword_Id]/put";
app.route("/:id/keyword/:keyword_id", putDetailKeywordDetail);

export default app;
