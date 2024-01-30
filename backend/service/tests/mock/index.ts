import { faker } from "@faker-js/faker";
import { z } from "zod";

import { zJson as postArticleJson } from "../../src/routes/admin/article/base/post";
import { zJson as postKeywordGroupJson } from "../../src/routes/admin/keyword-group/base/post";
import { zJson as postKeywordJson } from "../../src/routes/admin/keyword/base/post";
import { zJson as postPublisherJson } from "../../src/routes/admin/publisher/base/post";

const fakerBoolean = () => Boolean(faker.number.int({ min: 0, max: 1 }));

const createKeyword = (): z.infer<typeof postKeywordJson> => ({
  name: faker.person.firstName(),
  is_enabled: fakerBoolean(),
});

const createKeywordGroup = (): z.infer<typeof postKeywordGroupJson> => ({
  name: faker.person.firstName(),
  is_enabled: fakerBoolean(),
});

const createPublisher = (): z.infer<typeof postPublisherJson> => ({
  name: faker.company.name(),
  description: faker.company.catchPhraseDescriptor(),
  thumbnail: faker.internet.url(),
  is_enabled: fakerBoolean(),
  subscriber: faker.number.int(),
  url_subscribe: faker.internet.url(),
});

const createArticle = (publisherId: string): z.infer<typeof postArticleJson> => ({
  title: faker.commerce.productName(),
  summary: faker.commerce.productDescription(),
  publisher_id: publisherId,
  thumbnail: `https://picsum.photos/seed/${faker.number.int()}/500`,
  is_enabled: fakerBoolean(),
});

const Mock = {
  createKeyword,
  createKeywordGroup,
  createPublisher,
  createArticle,
};

export default Mock;
