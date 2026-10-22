# agent-handoff

Hand coding work to another agent (Cursor, Codex, Claude, Copilot, an OpenClaw agent) through GitHub: a self-contained issue, a mention comment, a claim check, CI nudges and a merge gate.

A generic operating skill from [arc-forge-tools](https://github.com/arcforgelabs/tools)
(`components/skills/agent-handoff`, staged from `66058327418c`). Fix and review it
there; this package is a generated release payload.

## Install

- **Claude, Codex, Cursor:** add the `arc-forge-agents` marketplace from
  this repository and install the `agent-handoff` plugin. The skill loads as
  `agent-handoff`. `plugin.json` follows Agent Plugins for Codex and Cursor;
  `.claude-plugin/plugin.json` is for Claude.
- **Manual:** copy `skills/agent-handoff/` into your harness's skills directory.

The skill's own `SKILL.md` documents when it applies and what it needs.
Nothing in this package contains credentials or account-specific data.
