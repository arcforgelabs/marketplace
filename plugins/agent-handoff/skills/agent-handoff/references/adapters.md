# Adapters: how each coding agent starts

The loop in `SKILL.md` is the same for every agent. Only the trigger, the
answer you wait for and the branch prefix change. Check a row on a test issue
before you rely on it: products change their triggers.

| Agent | Trigger | It started when | Branch prefix | Notes |
| --- | --- | --- | --- | --- |
| Cursor cloud agent | A comment that starts with `@cursor` on an issue or pull request | `cursor[bot]` replies "Taking a look!" with an agent link (about 5-10 s), and adds 👀 to your comment | `cursor/` | Runs in the Cursor account and cloud environment linked to the commenter's GitHub account, for that repo. Verified 2026-10-21. A follow-up `@cursor` comment on its pull request continues the same agent. |
| OpenAI Codex (cloud) | A comment that mentions `@codex` on a pull request or issue | Codex replies or reacts; a task appears in the Codex web app | `codex/` | Needs the Codex GitHub connector on the repo and an environment for it. Verify first. |
| Claude (GitHub App / Action) | A comment that mentions `@claude` | The workflow run starts; Claude posts a progress comment | `claude/` | Needs the Claude GitHub App or `anthropics/claude-code-action` in the repo. Verify first. |
| GitHub Copilot coding agent | Assign the issue to Copilot | Copilot opens a draft pull request | `copilot/` | Needs Copilot coding agent turned on for the repo. Verify first. |
| OpenClaw agent (for example "Arc") | An HTTP hook to the agent's Gateway (`POST /hooks/agent`), or a message on its channel, with the issue link | The agent answers on its channel or comments on the issue | `arc/` (or its own) | No GitHub mention: the coordinator or a GitHub workflow calls the hook. Keep the hook token in a secret store. |

## Not started?

1. The comment must come from an account the agent trusts (often the
   maintainer's linked account). A bot account's comment is often ignored.
2. The mention must be the first word for some agents (`@cursor ...`).
3. The agent's app must be installed on the repository, and its account must
   have usage left.
4. An edited comment may not trigger; post a new one.

Tell the maintainer which of these it is. Do not switch agents without
saying so.
