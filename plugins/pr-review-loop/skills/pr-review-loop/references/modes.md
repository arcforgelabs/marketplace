# PR Review Loop Modes

Last updated: 2026-09-29.

PR Review Loop supports four coordination modes. All modes use the same PR protocol (`protocol.md`); they differ in **where** implementation and review run.

## Mode summary

| Mode | Implementer | Reviewer | Durable state | Typical use |
| --- | --- | --- | --- | --- |
| `local-to-local` | Local agent | Local Codex CLI | Session log + optional local mirror | Pre-commit closeout |
| `local-to-remote` | Local agent | ClawSweeper/GitHub | GitHub PR | **Default** for feature work |
| `remote-to-remote` | Remote agent | ClawSweeper/GitHub | GitHub PR | Background/async work |
| `remote-to-local` | Local agent (rescue) | Remote or prior review | GitHub PR | Debug, rescue, local tests |

**Recommended default:** `local-to-remote`

## 1. local-to-local

Pre-commit closeout on a dirty working tree.

```text
implement locally -> codex review --uncommitted -> triage -> fix -> test -> codex review again -> commit
```

Characteristics:

- No PR required until the operator chooses to publish.
- Reviewer adapter: **Codex CLI** (`codex review --uncommitted`).
- Best for small patches before opening a PR.
- Optional bridge: once clean locally, push and switch to `local-to-remote` for PR audit trail.

Claude Code binding: `codex-review` skill in host mode (subprocess to `~/.codex/skills/codex-review`) or a personal adapter skill.  
Codex binding: `codex-review` helper and `codex review --uncommitted`.

Stop condition: local review clean, tests pass, then commit. Push only if requested.

## 2. local-to-remote (recommended default)

Serious feature work with visible PR history.

```text
implement locally -> push branch -> open PR -> request review
  -> triage on PR -> fix locally -> push -> re-review -> close
```

Characteristics:

- Implementer runs on the developer machine (Claude Code, Codex CLI exec, human).
- Reviewer runs against the PR (ClawSweeper on the gateway, or a human).
- Loop state lives on the PR; any machine can resume.
- Push is part of normal operation.

Typical flow:

1. Open PR and add `agent:loop`, `agent:needs-review`.
2. Write managed state comment with `mode: local-to-remote`.
3. On repositories enrolled in ClawSweeper activity, trigger review with an exact `@clawsweeper review` PR comment. New commits also request review. Verify the formal review and required check match the current head; a comment alone is not approval. For an unenrolled repository, use the gateway `clawsweeper-review` CLI or an independent human review. Do not fall back to pinging Codex automatically.
4. Implementer triages findings, fixes, runs focused tests, pushes.
5. Set `agent:needs-review`, increment pass, repeat until clean.

## 3. remote-to-remote

Background or async implementation with remote review.

```text
remote implementer -> PR updates -> remote review -> triage/fix cycles on PR
```

Characteristics:

- Implementer may be Codex Cloud task, cloud agent, or another remote worker.
- Reviewer is remote (ClawSweeper through the gateway).
- Entire loop state lives in GitHub; no local machine required.
- **Human merge should remain required initially** even when the loop reports clean.

Use when:

- Delegating long-running feature work.
- Running parallel tasks while the operator reviews PRs later.

Risk: harder to run repo-specific local tests unless the remote implementer has that capability. Record test commands in loop state and rely on CI where local runs are unavailable.

## 4. remote-to-local

Rescue or deep-debug mode: PR already exists remotely; local operator takes over implementation.

```text
pull PR branch locally -> read PR state -> fix findings -> run local tests -> push
```

Characteristics:

- Review may already be present on the PR from a prior remote pass.
- Local implementer ingests existing findings from PR comments/state.
- Useful when remote agent stalled, tests need local secrets, or debugging requires IDE tooling.

Steps:

1. Check out PR branch.
2. Read managed state comment and open findings.
3. Fix, test locally, push follow-up commits.
4. Update loop state; set `agent:needs-review` for another pass.

## Choosing a mode

```text
Dirty tree, not ready for PR yet?     -> local-to-local
Feature branch, normal development?   -> local-to-remote (default)
Async/cloud implementer?              -> remote-to-remote
Existing PR needs local rescue?       -> remote-to-local
```

## Mode transitions

| From | To | Trigger |
| --- | --- | --- |
| `local-to-local` | `local-to-remote` | First push + PR opened |
| `local-to-remote` | `remote-to-local` | Another operator/machine checks out PR |
| `remote-to-remote` | `remote-to-local` | Local rescue/debug |
| any | `local-to-local` | Only before PR exists; do not downgrade enrolled PR without closing loop |

Update `mode` in the managed state comment when transitioning.

## Actor matrix

| Mode | `implementer` examples | `reviewer` examples |
| --- | --- | --- |
| local-to-local | `claude-code`, `codex-cli`, `human` | `codex-cli` |
| local-to-remote | `claude-code`, `human` | `clawsweeper-github`, `human` |
| remote-to-remote | `codex-cloud`, `human` | `clawsweeper-github`, `human` |
| remote-to-local | `claude-code`, `human` | prior `clawsweeper-github` + optional re-review |

## Boundaries

- Mode selection does not change the finding schema or label vocabulary.
- Mode does not grant merge permission.
- Remote modes still require triage before fixes; providers do not auto-apply findings.
