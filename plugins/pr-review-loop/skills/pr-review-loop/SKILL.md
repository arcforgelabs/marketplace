---
name: pr-review-loop
description: "GitHub PR review loop: publish, review, fix, test, re-review."
---

# PR Review Loop

Use when coordination happens on a **GitHub pull request**, not on a local dirty tree alone.

Local Codex closeout belongs to **`codex-review`** (`executor=host`) calling `~/.codex/skills/codex-review`. This skill owns PR labels, the managed state comment, and cross-machine handoff.

## Default mode

**`local-to-remote`**: implement locally → push branch → open PR → review on PR → fix → re-review.

Use **`local-to-local`** only before a PR exists (pair with `codex-review`).

## Agent responsibilities (implementer)

1. Read PR labels and the managed `<!-- pr-review-loop:state -->` block first.
2. Fix only **accepted** findings after verifying code paths.
3. Run focused tests listed in loop state before requesting re-review.
4. Set `agent:needs-review` when ready for another review pass.
5. Do not merge unless the user explicitly requests merge.
6. Put an evidence section in the pull request body before requesting review.

## Pull request evidence

A reviewer that cannot see the proof has to guess, and a guess is not an approval. Write these headings in the pull request body:

- **What problem this solves**
- **User impact**
- **Why this change was made**
- **Evidence**: the command, the commit SHA, the pass count, and the one-worker wall time. Name what you did not run.

For a change someone can see on screen, attach screenshots of the real product, with the viewport size and whether the data is synthetic or live. A design mock does not count. A screenshot raises proof for the behavior it shows. It does not clear a defect it does not show, and it does not prove a live login, revocation, or customer cutover.

Unfinished production activation is a separate record. Say what remains, and do not describe that remaining pilot as a broken patch. Passing tests are evidence about the source. They are not production acceptance.

## ClawSweeper delivery

For repositories enrolled in the durable gateway queue, PR updates and authorized
`@clawsweeper review` / `@clawsweeper re-review` comments use the same queue.
An intake receipt means persisted, not approved. Inspect current-head bot reviews
and the private queue before repeating a request. Recovery and operator commands
live in `docs/clawsweeper-durable-gateway.md` in the Arc Forge Tools repository.

## Status labels

Enrolled PRs carry **`agent:loop`** plus exactly one of:

`agent:needs-review`, `agent:needs-fix`, `agent:tests-failing`, `agent:clean`, `agent:blocked`, `agent:ready-human`.

## Protocol detail

See `references/protocol.md` and `references/modes.md` in this skill directory (mirrors `tools/pr-review-loop/docs/` in arc-forge-tools).

Harness binding: `harnesses/codex/pr-review-loop` in the source repo.
