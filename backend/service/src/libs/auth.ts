import { z } from "@hono/zod-openapi";
import crypto from "crypto";
import { Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import * as jwt from "hono/jwt";
import moment from "moment";
import { Ky } from "./kysely";

const zRefreshPayload = z.object({
	jti: z.string().length(36),
	exp: z.string(),
});

const issueTokens = async (c: Context) => {
	const now = moment();
	const payload = {
		// The token is checked to ensure it is not being used before a specified time.
		nbf: now.toISOString(),
		// The token is checked to ensure it is not issued in the future.
		iat: now.toISOString(),
	};

	const accessToken = await jwt.sign(
		{
			...payload,
			exp: now.add(3, "ms").toISOString(),
		},
		process.env.JWT_SECRET
	);
	const refreshToken = await jwt.sign(
		{
			...payload,
			jti: crypto.randomUUID(),
			exp: now.add(process.env.JWT_REFRESH_EXP, "ms").toISOString(),
		},
		process.env.JWT_SECRET
	);

	await setSignedCookie(
		c,
		process.env.COOKIE_REFRESH_NAME,
		refreshToken,
		process.env.COOKIE_REFRESH_SECRET,
		{
			path: "/",
			secure: true,
			domain: process.env.DOMAIN,
			httpOnly: true,
			maxAge: process.env.COOKIE_REFRESH_EXP,
			expires: now.add(process.env.COOKIE_REFRESH_EXP, "ms").toDate(),
			sameSite: "Strict",
		}
	);

	return accessToken;
};

const refresh = async (c: Context) => {
	const refreshToken = await getSignedCookie(
		c,
		process.env.COOKIE_REFRESH_SECRET,
		process.env.COOKIE_REFRESH_NAME
	);
	if (typeof refreshToken !== "string") {
		throw new HTTPException(401, { message: "Unauthorized" });
	}
	const payload = zRefreshPayload.parse(await jwt.verify(refreshToken, process.env.JWT_SECRET));

	// insert jti. if it is alredy exists, throw an error
	try {
		await Ky.insertInto("jtis")
			.values({
				jti: payload.jti,
				expires_in: payload.exp,
			})
			.execute();
	} catch (err) {
		throw new HTTPException(401, { message: "Invalid refresh token" });
	}

	return issueTokens(c);
};

const signIn = async (c: Context) => {
	return issueTokens(c);
};

const signOut = async (c: Context) => {
	const refreshToken = await getSignedCookie(
		c,
		process.env.COOKIE_REFRESH_SECRET,
		process.env.COOKIE_REFRESH_NAME
	);
	if (typeof refreshToken !== "string") {
		throw new HTTPException(401, { message: "Unauthorized" });
	}
	const payload = zRefreshPayload.parse(await jwt.verify(refreshToken, process.env.JWT_SECRET));

	try {
		await Ky.insertInto("jtis")
			.values({
				jti: payload.jti,
				expires_in: payload.exp,
			})
			.execute();
	} catch (err) {
		console.error(err);
	}

	deleteCookie(c, process.env.COOKIE_REFRESH_NAME, {
		path: "/",
		secure: true,
		domain: process.env.DOMAIN,
	});
};

export default {
	signIn,
	refresh,
	signOut,
};
