import HonoAuth from "hono-auth";
import { createMiddleware } from "hono/factory";
import moment from "moment";

export const useConfigs = () => {
  return createMiddleware(async (c, next) => {
    HonoAuth.initialize({
      jwt: {
        algorithm: "HS256",
        secret: "asdf",
        accessExpiry: moment().utc(false).add(180, "d").toISOString(),
        refreshExpiry: moment().utc(false).add(360, "d").toISOString(),
      },
      cookie: { key: "cooke", secret: "asdfasfda" },
      hook: {
        createUniqueId() {
          return "";
        },
        async insertTerminatedJWT(payload) {
          return true;
        },
        async selectTerminatedJWT(payload) {
          return true;
        },
      },
    });

    await next();
  });
};
