import { faker } from "@faker-js/faker";
import { z } from "zod";

import { zJson as postArticleJson } from "../../src/routes/admin/article/base/post";
import { zJson as postPublisherJson } from "../../src/routes/admin/publisher/base/post";
import { zJson as postCampaignJson } from "../../src/routes/admin/campaign/base/post";
import { zJson as postSlotJson } from "../../src/routes/admin/campaign/[id].slot/post";

const fakerBoolean = () => Boolean(faker.number.int({ min: 0, max: 1 }));

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

const createCampaign = (): z.infer<typeof postCampaignJson> => ({
  name: faker.company.name(),
  comment: fakerBoolean() ? faker.company.catchPhraseDescriptor() : undefined,
  description: fakerBoolean() ? faker.company.catchPhrase() : undefined,
});

const createSlot = (): z.infer<typeof postSlotJson> => ({
  name: faker.commerce.productName(),
  description: fakerBoolean() ? faker.commerce.productDescription() : undefined,
  comment: fakerBoolean() ? faker.commerce.productMaterial() : undefined,
  preferences: fakerBoolean() ? faker.number.int({ min: 0, max: 9 }) : undefined,
});

const Mock = {
  createPublisher,
  createArticle,
  createCampaign,
  createSlot,
};

export default Mock;
