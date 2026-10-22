import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");
const pluginsRoot = join(repoRoot, "plugins");
const AGENT_PLUGINS_SCHEMA = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";

async function exists(path) {
  return stat(path).then(() => true, () => false);
}

// Generic skill plugins are staged by arc-forge-tools `forge-tools skills stage`.
// Every plugin whose PROVENANCE.json says kind=skill must be a complete,
// consistently versioned payload listed in all three marketplace catalogs.
test("staged skill plugins are complete and listed for every host", async () => {
  const manifests = {};
  for (const [host, rel] of [["codex", ".agents/plugins/marketplace.json"], ["claude", ".claude-plugin/marketplace.json"], ["cursor", ".cursor-plugin/marketplace.json"]]) {
    manifests[host] = JSON.parse(await readFile(join(repoRoot, rel), "utf8")).plugins.map((p) => p.name);
  }
  let count = 0;
  for (const name of await readdir(pluginsRoot)) {
    const root = join(pluginsRoot, name);
    const provPath = join(root, "PROVENANCE.json");
    if (!(await exists(provPath))) continue;
    const prov = JSON.parse(await readFile(provPath, "utf8"));
    if (prov.kind !== "skill") continue;
    count += 1;
    assert.equal(prov.sourcePath, `components/skills/${name}`, `${name} provenance path`);
    assert.ok(await exists(join(root, "skills", name, "SKILL.md")), `${name} SKILL.md`);
    const frontmatter = (await readFile(join(root, "skills", name, "SKILL.md"), "utf8")).match(/^---\n([\s\S]*?)\n---/);
    assert.ok(frontmatter && /^name:\s*"?/m.test(frontmatter[1]) && /^description:/m.test(frontmatter[1]), `${name} frontmatter`);
    // Claude reads .claude-plugin/plugin.json; Codex and Cursor read the root
    // plugin.json in the Agent Plugins format (agent-plugins.org).
    for (const rel of [".claude-plugin/plugin.json", "plugin.json"]) {
      const manifest = JSON.parse(await readFile(join(root, rel), "utf8"));
      assert.equal(manifest.name, name, `${name} ${rel} name`);
      assert.equal(manifest.version, prov.version, `${name} ${rel} version`);
    }
    const portable = JSON.parse(await readFile(join(root, "plugin.json"), "utf8"));
    assert.equal(portable.$schema, AGENT_PLUGINS_SCHEMA, `${name} plugin.json $schema`);
    for (const [host, names] of Object.entries(manifests)) {
      assert.ok(names.includes(name), `${name} missing from ${host} marketplace manifest`);
    }
    for (const [rel, hash] of Object.entries(prov.files)) {
      assert.ok(await exists(join(root, rel)), `${name} provenance file ${rel}`);
    }
  }
  assert.ok(count >= 1, "at least one staged skill plugin");
});
