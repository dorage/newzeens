import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KyselyMigrationSchema = z.object({
  name: z.string(),
  timestamp: z.string(),
});

export interface KyKyselyMigrationTable {
  name: z.infer<typeof KyselyMigrationSchema.shape.name>;
  timestamp: z.infer<typeof KyselyMigrationSchema.shape.timestamp>;
}

export type KyselyMigration = Selectable<KyKyselyMigrationTable>;
export type NewKyselyMigration = Insertable<KyKyselyMigrationTable>;
export type KyselyMigrationUpdate = Updateable<KyKyselyMigrationTable>;
