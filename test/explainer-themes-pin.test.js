import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");
const pluginRoot = join(repoRoot, "plugins", "explainer");
const skillRoot = join(pluginRoot, "skills", "explainer");
const pin = "github:arcforgelabs/themes#v2026.10.1";

async function exists(path) {
  return stat(path).then(() => true, () => false);
}

test("explainer pins the themes release and does not keep a theme catalog", async () => {
  const pkg = JSON.parse(await readFile(join(pluginRoot, "package.json"), "utf8"));
  assert.equal(pkg.dependencies["@arcforgelabs/themes"], pin);

  const renovate = JSON.parse(await readFile(join(repoRoot, "renovate.json"), "utf8"));
  assert.equal(renovate.automerge, false);
  assert.equal(renovate.dependencyDashboard, false);
  assert.deepEqual(renovate.enabledManagers, ["regex"]);
  assert.equal(renovate.regexManagers.length, 1);
  const manager = renovate.regexManagers[0];
  assert.deepEqual(manager.fileMatch, ["^plugins/explainer/package\\.json$"]);
  assert.equal(manager.depNameTemplate, "arcforgelabs/themes");
  assert.equal(manager.datasourceTemplate, "github-releases");
  assert.match(manager.matchStrings[0], /github:arcforgelabs\/themes#/);

  const themes = await readFile(join(skillRoot, "kit", "themes.js"), "utf8");
  assert.match(themes, /github:arcforgelabs\/themes#v2026\.10\.1/);
  assert.match(themes, /"themes": \[\]/);
  assert.doesNotMatch(themes, /arcforgelabs\/flow|#c41e30|oklch\(/);

  const tokens = await readFile(join(skillRoot, "kit", "tokens.css"), "utf8");
  assert.match(tokens, /github:arcforgelabs\/themes#v2026\.10\.1/);
  assert.doesNotMatch(tokens, /#[0-9a-fA-F]{3,8}|--key-stock|oklch\(/);

  const chartLab = await readFile(join(skillRoot, "references", "chart-lab.html"), "utf8");
  assert.doesNotMatch(chartLab, /--key-stock:|data-pal=maia-rose\{|#c41e30|arcforgelabs\/flow/);

  assert.equal(await exists(join(skillRoot, "scripts")), false);
  assert.equal(await exists(join(skillRoot, "logos")), false);
  assert.equal(await exists(join(pluginRoot, "logos")), false);
});
