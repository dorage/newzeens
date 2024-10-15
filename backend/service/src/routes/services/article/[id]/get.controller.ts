import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { getArticleSpec, getPublisherSpec, getRelatedArticles } from "./get.model";

export const controller = async ({
  articleId,
}: {
  articleId: string;
}): Promise<z.infer<typeof zRes>> => {
  const [article, publisher, related_articles] = await Promise.all([
    getArticleSpec({ articleId }),
    getPublisherSpec({ articleId }),
    getRelatedArticles({ articleId }),
  ]);

  return zRes.parse({
    article,
    publisher,
    related_articles,
  });
};
