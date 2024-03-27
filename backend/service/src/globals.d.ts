import { z } from "@hono/zod-openapi";
import { UserSchema } from "app-schema";
import { Env } from "hono";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string,
      // admin id/pwd
      ADMIN_ID: string,
      ADMIN_PWD: string,
      // auth cookie
      COOKIE_AUTH_NAME: string,
      COOKIE_AUTH_SECRET: string,
      COOKIE_AUTH_EXP: number,
      // refresh cookie
      COOKIE_REFRESH_NAME: string,
      COOKIE_REFRESH_SECRET: string,
      COOKIE_REFRESH_EXP: number,
    }
  }
}

export interface HonoVariables extends Env {
  auth_payload: string;
}
