# contributing-upstream

Prepare upstream open source issues, PRs, and comments.

A generic operating skill from [arc-forge-tools](https://github.com/arcforgelabs/tools)
(`components/skills/contributing-upstream`, staged from `66058327418c`). Fix and review it
there; this package is a generated release payload.

## Install

- **Claude, Codex, Cursor:** add the `arc-forge-agents` marketplace from
  this repository and install the `contributing-upstream` plugin. The skill loads as
  `contributing-upstream`. `plugin.json` follows Agent Plugins for Codex and Cursor;
  `.claude-plugin/plugin.json` is for Claude.
- **Manual:** copy `skills/contributing-upstream/` into your harness's skills directory.

The skill's own `SKILL.md` documents when it applies and what it needs.
Nothing in this package contains credentials or account-specific data.
