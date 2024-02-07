import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getDeatilRelationArticle from "./[id].article/get";
app.route("/:id/article", getDeatilRelationArticle);

import postDeatilRelationArticle from "./[id].article/post";
app.route("/:id/article", postDeatilRelationArticle);

import deleteDeatilRelationArticle from "./[id].article.[articleId]/delete";
app.route("/:id/article/:articleId", deleteDeatilRelationArticle);

import putDeatilRelationArticle from "./[id].article.[articleId]/put";
app.route("/:id/article/:articleId", putDeatilRelationArticle);

import getDeatilRelationPublisherId from "./[id].publisher/get";
app.route("/:id/publisher", getDeatilRelationPublisherId);

import postDeatilRelationPublisherId from "./[id].publisher/post";
app.route("/:id/publisher", postDeatilRelationPublisherId);

import deleteDeatilRelationPublisherId from "./[id].publisher.[publisherId]/delete";
app.route("/:id/publisher/:publisherId", deleteDeatilRelationPublisherId);

import putDeatilRelationPublisherId from "./[id].publisher.[publisherId]/put";
app.route("/:id/publisher/:publisherId", putDeatilRelationPublisherId);

export default app;
