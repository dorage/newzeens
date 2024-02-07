import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import mock from "./mock/index";
app.route("/mock", mock);

import keywordGroup from "./keyword-group/index";
app.route("/keyword_group", keywordGroup);

import keywordGroupRel from "./keyword-group-rel/index";
app.route("/keyword_group_rel", keywordGroupRel);

import keyword from "./keyword/index";
app.route("/keyword", keyword);

import publisher from "./publisher/index";
app.route("/publisher", publisher);

import article from "./article/index";
app.route("/article", article);

export default app;
