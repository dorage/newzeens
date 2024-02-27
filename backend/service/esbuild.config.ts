import * as esbuild from "esbuild";
import type { BuildOptions, Plugin } from "esbuild";
import path from "path";

const productionResolvePlugins: Plugin = {
	name: "replaceDev",
	setup(build) {
		// Redirect all paths starting with "images/" to "./public/images/"
		build.onResolve({ filter: /.*\.dev/ }, (args) => {
			return { path: path.join(process.cwd(), "src", "helpers", "mock.ts") };
		});
	},
};

const buildOption: BuildOptions = {
	platform: "node",
	entryPoints: ["src/index.ts"],
	loader: {
		// ensures .node binaries are copied to ./dist
		".node": "copy",
	},
	bundle: true,
	external: ["better-sqlite3"],
};

const devBuildOption: BuildOptions = {
	...buildOption,
	outfile: "dist/index.cjs",
};

const prdBuildOption: BuildOptions = {
	...buildOption,
	outfile: "dist/index.cjs",
	plugins: [productionResolvePlugins],
	minify: true,
};

function getBuildOption() {
	// development option
	if (process.argv.includes("--dev") || process.argv.includes("-d")) {
		console.log("🛠️ DEV MODE");
		return devBuildOption;
	}
	// production option
	if (process.argv.includes("--production") || process.argv.includes("-p")) {
		console.log("🚀 PRODUCTION MODE");
		return prdBuildOption;
	}
	return devBuildOption;
}

async function main() {
	const buildOption = getBuildOption();

	// watchmode
	if (process.argv.includes("--watch") || process.argv.includes("-w")) {
		const ctx = await esbuild.context(buildOption);
		await ctx.watch();
		return;
	}

	return await esbuild
		.build(buildOption)
		.then((e) => {
			console.log(e);
			console.log(`[Result]: ${buildOption.outfile}`);
		})
		.catch((e) => console.error(e));
}

main();
