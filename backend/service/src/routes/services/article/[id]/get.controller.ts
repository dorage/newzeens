import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { getArticleSpec, getPublisherSpec, getRelatedArticles, getAnyArticles } from "./get.model";

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
  if (related_articles.length < 4) {
    const any_articles = await getAnyArticles({ articleId, limit: 4 - related_articles.length });
    related_articles.push(...any_articles);
  }

  return zRes.parse({
    article,
    publisher,
    related_articles,
  });
};
