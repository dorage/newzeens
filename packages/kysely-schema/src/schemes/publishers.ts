import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const PublisherSchema = z.object({
  id: z.string(),
});

export interface KyPublisherTable {
  id: z.infer<typeof PublisherSchema.shape.id>;
}

export type Publisher = Selectable<KyPublisherTable>;
export type NewPublisher = Insertable<KyPublisherTable>;
export type PublisherUpdate = Updateable<KyPublisherTable>;
