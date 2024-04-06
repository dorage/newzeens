import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { uploadObject } from "@/src/libs/s3";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { ArticleSchema } from "kysely-schema";
import moment from "moment";

export const zParam = z.object({
	id: ArticleSchema.shape.id,
});

export const zRes = z.object({
	okay: z.boolean(),
});

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "post",
	summary: "업로드 article 썸네일",
	description: "",
	request: {
		params: zParam,
	},
	requestBody: {
		content: {
			"multipart/form-data": {
				description: "multipart/form-data 형태로 file 키에 이미지를 전달해주세요",
				schema: {
					type: "object",
					properties: {
						file: {
							type: "string",
							format: "binary",
						},
					},
				},
				required: true,
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: zRes,
				},
			},
			description: "",
		},
	},
	security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const { id } = zParam.parse(c.req.param());
	const formData = await c.req.formData();
	const file = formData.get("file") as Blob & { type: string; name: string };
	const buffer = Buffer.from(await file.arrayBuffer());

	try {
		const thumbnailUrl = await uploadObject({
			Key: ["articles", id, `${Number(moment())}-${file.name}`].join("/"),
			Body: buffer,
		});

		await Ky.updateTable("articles").set({ thumbnail: thumbnailUrl }).execute();

		return c.json(zRes.parse({ okay: true }));
	} catch (err) {
		console.error(err);
		throw new HTTPException(400);
	}
});

export default app;
