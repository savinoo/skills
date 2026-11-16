#!/usr/bin/env node
// Copies package.json's version into .claude-plugin/plugin.json, plugin.json, and gemini-extension.json.
// Runs as part of `npm run version`, immediately after `changeset version`.
// With --check it changes nothing and exits 1 if any version differs.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  join(repo, ".claude-plugin", "plugin.json"),
  join(repo, "plugin.json"),
  join(repo, "gemini-extension.json"),
].filter((p) => existsSync(p));

const { version } = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const checkOnly = process.argv.includes("--check");

for (const pluginPath of targets) {
  const source = readFileSync(pluginPath, "utf8");
  const plugin = JSON.parse(source);

  if (plugin.version === version) {
    console.log(`${pluginPath}: version is ${version} (already in sync)`);
    continue;
  }

  if (checkOnly) {
    console.error(
      `${pluginPath} version is ${plugin.version}, package.json is ${version}. Run \`node scripts/sync-plugin-version.mjs\`.`,
    );
    process.exit(1);
  }

  // Rewrite only the version line, to keep the key order and the formatting.
  const updated = source.replace(
    /("version"\s*:\s*")[^"]*(")/,
    `$1${version}$2`,
  );

  if (JSON.parse(updated).version !== version) {
    console.error(`Could not find a version field to replace in ${pluginPath}.`);
    process.exit(1);
  }

  writeFileSync(pluginPath, updated);
  console.log(`${pluginPath}: version ${plugin.version} -> ${version}`);
}
