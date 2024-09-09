import { OpenAPIHono } from "@hono/zod-openapi";
import { useAuth } from "@/src/middlewares/auth";

const app = new OpenAPIHono();

import auth from "./auth/index";
app.route("/auth", auth);

app.use("*", useAuth());

import keywordGroup from "./keyword-group/index";
app.route("/keyword-group", keywordGroup);

import publisher from "./publisher/index";
app.route("/publisher", publisher);

import article from "./article/index";
app.route("/article", article);

import campaign from "./campaign/index";
app.route("/campaign", campaign);

import slot from "./slot/index";
app.route("/slot", slot);

import scrap from "./scrap/index";
app.route("/scrap", scrap);

export default app;
