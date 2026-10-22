# mermaid-diagrams

Create/update Mermaid diagrams: dataflow, architecture, syntax.

A generic operating skill from [arc-forge-tools](https://github.com/arcforgelabs/tools)
(`components/skills/mermaid-diagrams`, staged from `89dd44eb4433`). Fix and review it
there; this package is a generated release payload.

## Install

- **Claude, Codex, Cursor:** add the `arc-forge-agents` marketplace from
  this repository and install the `mermaid-diagrams` plugin. The skill loads as
  `mermaid-diagrams`. `plugin.json` follows Agent Plugins for Codex and Cursor;
  `.claude-plugin/plugin.json` is for Claude.
- **Manual:** copy `skills/mermaid-diagrams/` into your harness's skills directory.

The skill's own `SKILL.md` documents when it applies and what it needs.
Nothing in this package contains credentials or account-specific data.
