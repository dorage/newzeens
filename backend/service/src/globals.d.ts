import { z } from "@hono/zod-openapi";
import { UserSchema } from "app-schema";
import { Env } from "hono";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			ORIGIN: string;
			ORIGIN_IMAGE: string;

			ADMIN_ID: string;
			ADMIN_PWD: string;
			// auth cookie
			COOKIE_AUTH_NAME: string;
			COOKIE_AUTH_SECRET: string;
			COOKIE_AUTH_EXP: number;
			// refresh cookie
			COOKIE_REFRESH_NAME: string;
			COOKIE_REFRESH_SECRET: string;
			COOKIE_AUTH_EXP: number;
			// cloudflare R2
			R2_REGION: string;
			R2_PUBLIC_DOMAIN: string;
			R2_ENDPOINT: string;
			R2_TOKEN: string;
			R2_ACCESS_KEY_ID: string;
			R2_SECRET_ACCESS_KEY: string;
			R2_BUCKET: string;
		}
	}
}

export interface HonoVariables extends Env {
	auth_payload: string;
}
