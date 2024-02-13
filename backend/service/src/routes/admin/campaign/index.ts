import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("/", getBase);

import postBase from "./base/post";
app.route("/", postBase);

import postDetail from "./[id]/post";
app.route("/:id", postDetail);

import deleteDetail from "./[id]/delete";
app.route("/:id", deleteDetail);

import getDetailSlot from "./[id].slot/get";
app.route("/:id/slot", getDetailSlot);

import postDetailSlot from "./[id].slot/post";
app.route("/:id/slot", postDetailSlot);

import putDetailSlotDetail from "./[id].slot.[slotId]/put";
app.route("/:id/slot/:slotId", putDetailSlotDetail);

import deleteDetailSlotDetail from "./[id].slot.[slotId]/delete";
app.route("/:id/slot/:slotId", deleteDetailSlotDetail);

import getDetailSlotDetailArticle from "./[id].slot.[slotId].article/get";
app.route("/:id/slot/:slotId/article", getDetailSlotDetailArticle);

import postDetailSlotDetailArticle from "./[id].slot.[slotId].article/post";
app.route("/:id/slot/:slotId/article", postDetailSlotDetailArticle);

import deleteDetailSlotDetailArticle from "./[id].slot.[slotId].article/delete";
app.route("/:id/slot/:slotId/article", deleteDetailSlotDetailArticle);

import getDetailSlotDetailPublisher from "./[id].slot.[slotId].publisher/get";
app.route("/:id/slot/:slotId/publisher", getDetailSlotDetailPublisher);

import postDetailSlotDetailPublisher from "./[id].slot.[slotId].publisher/post";
app.route("/:id/slot/:slotId/publisher", postDetailSlotDetailPublisher);

import deleteDetailSlotDetailPublisher from "./[id].slot.[slotId].publisher/delete";
app.route("/:id/slot/:slotId/publisher", deleteDetailSlotDetailPublisher);

export default app;
