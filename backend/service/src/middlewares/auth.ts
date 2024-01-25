import HonoAuth from "hono-auth";
import { createMiddleware } from "hono/factory";

export const useAuth = () => {
  return createMiddleware(async (c, next) => {
    c.set("", HonoAuth.useAuthHandler(c, false));
    await next();
  });
};
