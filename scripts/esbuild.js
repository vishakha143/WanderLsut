// Don't modify this file unless you're updating the build script to a newer version!

import { build } from "esbuild";
import chalk from "chalk";
import olResolvePlugin from "@openloader/esbuild";
import packageJson from "../package.json" assert { type: "json" };
const { name } = packageJson;

const log = (ctx, ...args) => {
    console.log(chalk.cyan(`[${ctx}]`), ...args.map(a => chalk.blueBright(a)));
};

export default async function() {
    log("BuildScript", "building plugin", name);
    const buildTime = new Date();

    await build({
        bundle: true,
        entryPoints: ["./src/main.ts"],
        format: "iife",
        globalName: "__SECRET_OL_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
        minify: true,
        outfile: `./dist/${name}.plugin.js`,
        plugins: [olResolvePlugin()]
    });
    log("BuildScript", "build finished in", ((new Date().getMilliseconds() - buildTime.getMilliseconds()) / 1000) + "ms");
}