import type { Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const PublisherSchema = z.object({
  id: z.string().length(6),
  thumbnail: z.string().nullable().default(null),
  name: z.string(),
  description: z.string(),
  subscriber: z.number(),
  url_subscribe: z.string(),
  created_at: z.string().transform((arg) => moment(arg).utc(false)),
});

export interface KyPublisherTable {
  id: z.infer<typeof PublisherSchema.shape.id>;
  thumbnail: z.infer<typeof PublisherSchema.shape.thumbnail>;
  name: z.infer<typeof PublisherSchema.shape.name>;
  description: z.infer<typeof PublisherSchema.shape.description>;
  subscriber: z.infer<typeof PublisherSchema.shape.subscriber>;
  url_subscribe: z.infer<typeof PublisherSchema.shape.url_subscribe>;
  created_at: z.infer<typeof PublisherSchema.shape.created_at>;
}

export type Publisher = Selectable<KyPublisherTable>;
export type NewPublisher = Insertable<KyPublisherTable>;
export type PublisherUpdate = Updateable<KyPublisherTable>;
