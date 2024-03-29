import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const PublisherSchema = z.object({
  id: z.string().length(6),
  thumbnail: z.string().nullable().default(null),
  name: z.string(),
  description: z.string(),
  subscriber: z.number(),
  url_subscribe: z.string(),
  publisher_main: z.string(),
  publisher_spec: z.string(),
  is_enabled: z.coerce.boolean(),
  created_at: z
    .string()
    .transform((arg) => moment(arg).utc(false))
    .or(z.string()),
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
