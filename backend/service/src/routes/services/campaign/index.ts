import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

// GET /campaign/:id/article
// 캠페인 정보를 아티클로 불러오기
import getDetailArticle from "./[id].article/get";
app.route("/:id/article", getDetailArticle);

// POST /campagin/:id/publisher
// 캠페인 정보를 퍼블리셔로 불러오기

export default app;
