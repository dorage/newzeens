import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getCheck from "./check/get";
app.route("/check", getCheck);

import postLogin from "./login/post";
app.route("/login", postLogin);

import postRefresh from "./refresh/post";
app.route("/refresh", postRefresh);

import postLogout from "./logout/post";
app.route("/logout", postLogout);

export default app;
