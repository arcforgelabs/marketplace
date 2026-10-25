# explainer

Visual explainer pages: diagrams first, every part opens a definition. Includes a chart catalogue, a theme engine, and a format guide for replies. Theme values and logos come from the `@arcforgelabs/themes` release pinned in `package.json` (`github:arcforgelabs/themes#v2026.10.1`). This package does not store that catalog.

A generic operating skill from [arc-forge-tools](https://github.com/arcforgelabs/tools)
(`components/skills/explainer`, staged from `0671fd84aabf`). Fix and review it
there; this package is a generated release payload.

## Install

- **Claude, Codex, Cursor:** add the `arc-forge-agents` marketplace from
  this repository and install the `explainer` plugin. The skill loads as
  `explainer`. `plugin.json` follows Agent Plugins for Codex and Cursor;
  `.claude-plugin/plugin.json` is for Claude.
- **Manual:** copy `skills/explainer/` into your harness's skills directory.

The skill's own `SKILL.md` documents when it applies and what it needs.
Nothing in this package contains credentials or account-specific data.
