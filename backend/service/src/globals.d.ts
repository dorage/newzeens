import { z } from "@hono/zod-openapi";
import { UserSchema } from "app-schema";
import { Env } from "hono";

declare global {
  namespace NodeJS {
    interface ProcessEnv { }
  }
}

export interface HonoVariables extends Env {
  auth_payload: string;
}
