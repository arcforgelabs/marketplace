# pr-review-loop

GitHub PR review loop: publish, review, fix, test, re-review.

A generic operating skill from [arc-forge-tools](https://github.com/arcforgelabs/tools)
(`components/skills/pr-review-loop`, staged from `89dd44eb4433`). Fix and review it
there; this package is a generated release payload.

## Install

- **Claude, Codex, Cursor:** add the `arc-forge-agents` marketplace from
  this repository and install the `pr-review-loop` plugin. The skill loads as
  `pr-review-loop`. `plugin.json` follows Agent Plugins for Codex and Cursor;
  `.claude-plugin/plugin.json` is for Claude.
- **Manual:** copy `skills/pr-review-loop/` into your harness's skills directory.

The skill's own `SKILL.md` documents when it applies and what it needs.
Nothing in this package contains credentials or account-specific data.
