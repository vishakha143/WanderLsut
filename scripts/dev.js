// @ts-check
import chalk from "chalk";
import esbuild from "./esbuild";
import { watch } from "chokidar";
// @ts-expect-error
import packageJson from "./package.json" assert { type: "json" };
import { copyFile } from "fs/promises";
const { name } = packageJson;
const { platform } = process;

const log = (ctx, ...args) => {
    console.log(chalk.cyan(`[${ctx}]`), ...args.map(a => chalk.blueBright(a)));
};

const watcher = watch("./src/**/*", { persistent: true, ignored: /(^|[/\\])\../ });

let appDataPath = "";
switch(platform) {
    case "win32":
        appDataPath = process.env.APPDATA + "";
        break;
    case "darwin":
        appDataPath = process.env.HOME + "/Library/Application Support";
        break;
    default:
        appDataPath = process.env.XDG_CONFIG_HOME ?? process.env.HOME + "/.config";
}

const builder = async () => {
    await esbuild();
    await copyFile("./dist/" + name + ".plugin.js", appDataPath + "/OL/plugins/" + name + ".plugin.js");
    log("Dev", "copied, reload!");
}

watcher.on("ready", () => {
    log("Dev", "ready");
    watcher.on("add", builder);
    watcher.on("change", builder);
    watcher.on("unlink", builder);
})