import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const ArticleSchema = z.object({
	id: z.string().length(6),
	thumbnail: z.string().max(255).nullable(),
	title: z.string().max(99),
	summary: z.string(),
	is_enabled: z.coerce.boolean(),
	publisher_id: z.string().length(6),
	created_at: z
		.string()
		.transform((arg) => moment(arg).utc(false))
		.or(z.string()),
});

export interface KyArticleTable {
	id: z.infer<typeof ArticleSchema.shape.id>;
	thumbnail: z.infer<typeof ArticleSchema.shape.thumbnail>;
	title: z.infer<typeof ArticleSchema.shape.title>;
	summary: z.infer<typeof ArticleSchema.shape.summary>;
	is_enabled: ColumnType<z.infer<typeof ArticleSchema.shape.is_enabled>, number, number>;
	publisher_id: z.infer<typeof ArticleSchema.shape.publisher_id>;
	created_at: Generated<z.infer<typeof ArticleSchema.shape.created_at>>;
}

export type Article = Selectable<KyArticleTable>;
export type NewArticle = Insertable<KyArticleTable>;
export type ArticleUpdate = Updateable<KyArticleTable>;
