import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";

export const PublisherSchema = z.object({
  id: z.string().length(6),
  thumbnail: z.string().url().nullable().default(null),
  name: z.string().max(99),
  description: z.string(),
  subscriber: z.number().int().positive().finite(),
  url_subscribe: z.string().url().max(2048),
  publisher_main: z.string().url().max(2048),
  publisher_spec: z.string().url().max(2048),
  is_enabled: z.coerce.boolean(),
  created_at: zMomentDatetime,
});

export interface KyPublisherTable {
  id: z.infer<typeof PublisherSchema.shape.id>;
  thumbnail: z.infer<typeof PublisherSchema.shape.thumbnail>;
  name: z.infer<typeof PublisherSchema.shape.name>;
  description: z.infer<typeof PublisherSchema.shape.description>;
  url_subscribe: z.infer<typeof PublisherSchema.shape.url_subscribe>;
  publisher_main: z.infer<typeof PublisherSchema.shape.publisher_main>;
  publisher_spec: z.infer<typeof PublisherSchema.shape.publisher_spec>;
  subscriber: Generated<z.infer<typeof PublisherSchema.shape.subscriber>>;
  is_enabled: ColumnType<z.infer<typeof PublisherSchema.shape.is_enabled>, number, number>;
  created_at: Generated<z.infer<typeof PublisherSchema.shape.created_at>>;
}

export type Publisher = Selectable<KyPublisherTable>;
export type NewPublisher = Insertable<KyPublisherTable>;
export type PublisherUpdate = Updateable<KyPublisherTable>;
