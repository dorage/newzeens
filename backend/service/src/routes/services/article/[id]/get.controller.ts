import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { getAnyArticles, getArticleSpec, getPublisherSpec, getRelatedArticles } from "./get.model";

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

  if (related_articles.length <= 4) {
    related_articles.push(
      ...(await getAnyArticles({ articleId, limit: 4 - related_articles.length }))
    );
  }

  return zRes.parse({
    article,
    publisher,
    related_articles,
  });
};
