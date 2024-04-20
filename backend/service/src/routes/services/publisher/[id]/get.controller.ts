import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import {
  getKeywordsOfPublisher,
  getPublisherSpec,
  getRecentArticleOfPublisher,
  getRelatedPublishers,
} from "./get.query";

export const controller = async ({
  publisherId,
}: {
  publisherId: string;
}): Promise<z.infer<typeof zRes>> => {
  const promises = [
    getPublisherSpec({ publisherId }),
    getKeywordsOfPublisher({ publisherId }),
    getRecentArticleOfPublisher({ publisherId }),
    getRelatedPublishers({ publisherId }),
  ];

  const [publisher, keywords, recent_articles, related_publishers] = await Promise.all(promises);

  return zRes.parse({
    publisher,
    keywords,
    recent_articles,
    related_publishers,
  });
};
