import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const useDev = () => {
  return createMiddleware(async (c, next) => {
    if (process.env.NODE_ENV === "production") {
      throw new HTTPException(404, { message: "Not found." });
    }
    await next();
  });
};
