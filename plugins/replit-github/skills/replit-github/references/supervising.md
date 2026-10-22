# Supervising a Replit project from outside (Claude Code / Codex + MCP + browser)

Division of labour that works:

| Need | Use |
|---|---|
| Run shell/git commands in the workspace, read files | Replit MCP: `ask_question` (read-only), `update_app_using_prompt` (changes). Ask for exact command output. Personal workspace only. |
| The same, for a project in a team workspace | The browser: prompt the project's Agent in its chat, and read the preview page. The MCP connector is refused there. |
| GitHub auth from the Replit side, personal workspace | Human, or an agent driving the **Replit Git tool** in a logged-in browser. |
| GitHub auth from the Replit side, team workspace | The project Agent, in its chat, running `scripts/github-sync.sh` with the `GITHUB_TOKEN` secret. Do not rely on the Git tool there (see `SKILL.md` gotchas). |
| Push/merge on GitHub | Your own clone + `gh`. Author with the noreply email. |
| Publish / status, personal workspace | Replit MCP `publish_app`, `get_publish_status` (poll every 60–90 s; 5–8 min). |
| Publish / status, team workspace | The browser: the project's **Publish** button (top right), then follow its dialog. Watch progress and the live URL in the Publishing pane (`?deploymentPane=true` on the project URL). Not yet run: the button and pane were only observed on 2026-10-12; record what happens the first time. |
| Any publish with a database migration | It waits for approval in the Replit web UI. Read the migration before approving it: one proposed `DROP TABLE enquiries`. |

Loop for "get a fix live":

1. Reproduce and fix on your clone; open a PR; merge.
2. Agent: `scripts/github-sync.sh pull` (with token). Git tool Pull is a
   fallback in a personal workspace only.
3. Publish (`publish_app` in a personal workspace, the **Publish** button in a
   team workspace, not yet run there); poll; then verify the **live URL renders**, not just that
   status says `success` (a blank page with 200s is the classic failure —
   check asset URLs return JS, not HTML).

Browser-driving notes:

- Replit's new UI hides tools; open them via the "+" tab → search
  ("git", "shell", "secrets").
- Make sure you are in *Return to main version*, not a task, before touching Git.
- Never type into Replit until `document.activeElement` is the target. Check
  it with page JavaScript first. Keys that miss the Shell or editor go to the
  command palette, and Return submits it. That is how a stray run submitted
  the one-time "Change your username" form. Prefer MCP (personal workspace)
  or the project Agent's chat.
- Read screenshots as possibly stale. The pane can lag a click by a few
  seconds; confirm state with page JavaScript before the next click.
- The home page's "Suggested for you" chips fill the prompt and can open an
  integration dialog ("Connect Gmail"). Click the prompt box itself, never
  near the chips. Close a dialog by clicking outside it; Escape does not.
- The home prompt and Agent chat are CodeMirror. A long paste becomes a
  "Pasted-…txt" attachment the Agent reads. Dispatch a `paste` ClipboardEvent
  on `.cm-content` rather than typing long text.
- The in-app browser needs its own Replit/GitHub login; check before assuming.

Token handling: an agent may prefill the GitHub fine-grained-token form
(name, owner, repo, permissions, expiry) and stop at "Generate token". The
human generates it and pastes it into Replit Secrets. Agents never see, store,
or relay the value.
