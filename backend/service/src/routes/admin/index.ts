import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import keywordGroup from "./keyword-group/index";
app.route("/keyword_group", keywordGroup);

import keyword from "./keyword/index";
app.route("/keyword", keyword);

export default app;
