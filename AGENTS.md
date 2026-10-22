# AGENTS.md

Read `VISION.md` before starting work. `README.md` indexes the rest of the documentation.

## Layout

Each package lives once, in `plugins/<name>/`. A skill package holds one copy of the skill at `skills/<name>/SKILL.md`, which every platform reads unchanged (Agent Skills format). Only the wrappers differ, and they are generated, not hand-written:

| File | Read by |
| --- | --- |
| `plugins/<name>/plugin.json` (Agent Plugins format, agent-plugins.org) | Codex, Cursor |
| `plugins/<name>/.claude-plugin/plugin.json` | Claude |
| `.agents/plugins/marketplace.json` | Codex |
| `.cursor-plugin/marketplace.json` | Cursor |
| `.claude-plugin/marketplace.json` | Claude |

Skill packages (`PROVENANCE.json` with `kind: skill`) come from `arcforgelabs/tools` through `forge-tools skills cloud publish`. Fix a skill there, not here. OpenClaw packages keep their own layout under `plugins/<name>/openclaw/`.

## Install

The marketplace is `arc-forge-agents`, from `arcforgelabs/marketplace`.

- **Claude** (claude.ai, Cowork, Claude Code cloud sessions and project threads): on claude.ai open **Customize > Plugins > Add > Add marketplace**, enter `arcforgelabs/marketplace`, turn on **Sync automatically**, then install the plugins you want. Claude Code CLI: `claude plugin marketplace add arcforgelabs/marketplace`, then `claude plugin install <name>@arc-forge-agents`.
- **Codex**: `codex plugin marketplace add arcforgelabs/marketplace`, then `codex plugin add <name>@arc-forge-agents`.
- **Cursor**: import `arcforgelabs/marketplace` as a team marketplace, then install the plugins you want. A Cloud Agent keeps the plugin versions it started with.
- **OpenClaw**: install an OpenClaw package with the steps in its `plugins/<name>/README.md`. For a skill package, run `openclaw skills install` on `plugins/<name>/skills/<name>/`.
- **Any other harness that reads Agent Skills**: copy `plugins/<name>/skills/<name>/` into that harness's skills folder.

<!-- arc-forge-org-consistency:start -->
## Pull requests

Use `.github/pull_request_template.md`. Keep these sections current in the pull request body:

- What Problem This Solves
- User Impact
- Why This Change Was Made
- Evidence

Evidence names the command, the commit, the result, and what was not run. A screenshot is the real product, with the viewport and whether the data was synthetic or live. If the proof could not be run, name the gap in Evidence. When a review asks for more proof, edit the body. Maintainer authorship does not skip the sections. A passing test is evidence about this source. Production activation is a separate record.

The org default procedure is `.github/org-consistency/skill/SKILL.md`. A stricter rule already in this file wins.
<!-- arc-forge-org-consistency:end -->
