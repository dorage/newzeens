import { createMiddleware } from "hono/factory";
import * as jwt from "hono/jwt";
import { HTTPException } from "hono/http-exception";

export const useAuth = () => {
	return createMiddleware(async (c, next) => {
		const token = c.req.header("authorization")?.split(" ")?.[1];
		if (token == null) throw new HTTPException(401, { message: "Unauthorized" });

		await jwt.verify(token, process.env.JWT_SECRET);

		await next();
	});
};
