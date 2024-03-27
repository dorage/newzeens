import { createMiddleware } from "hono/factory";

export const useAuth = () => {
	return createMiddleware(async (c, next) => {
		await next();
	});
};
