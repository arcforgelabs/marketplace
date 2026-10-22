# PR Review Loop Protocol

Last updated: 2026-05-24.

The GitHub pull request is the durable ledger for PR Review Loop. Agents read and write loop state through PR labels, one managed comment block, and normal PR artifacts (commits, checks, review comments).

Target repos may keep optional local mirrors under `.pr-review-loop/`, but GitHub PR state is authoritative for cross-machine handoff.

## Loop shape

```text
task -> implement -> publish diff -> review -> triage -> fix -> test -> republish -> re-review -> close
```

## Labels

### Enrollment label

| Label | Meaning |
| --- | --- |
| `agent:loop` | PR is enrolled in an agent review loop |

Keep `agent:loop` on the PR for the entire enrolled loop. Remove it only when the loop is closed.

### Status labels (mutually exclusive)

Apply exactly **one** status label at a time from this set:

| Label | Meaning |
| --- | --- |
| `agent:needs-review` | Diff is published; waiting for reviewer |
| `agent:needs-fix` | Actionable findings accepted; implementer should fix |
| `agent:tests-failing` | Findings may be resolved but required tests/checks fail |
| `agent:clean` | No accepted actionable findings; checks satisfied for this pass |
| `agent:blocked` | Loop cannot proceed without human decision |
| `agent:ready-human` | Agent loop complete; human may merge or do final review |

Rules:

- Enrolled PRs carry **`agent:loop` plus exactly one status label**.
- Replace the previous status label when transitioning; do not stack conflicting status labels.
- Labels are hints for humans and agents; the managed comment is the structured source of truth.

## Managed state comment

Maintain **one** bot- or agent-owned comment on the PR containing a fenced YAML block between markers:

```markdown
<!-- pr-review-loop:state -->
status: needs-fix
pass: 2
max_passes: 5
mode: local-to-remote
implementer: claude-code
reviewer: codex-github
branch: feature/example
pr: 123
tests:
  - uv run pytest tests/test_storefront.py
last_review_at: "2026-05-24T00:00:00Z"
last_commit: abc1234
accepted_findings:
  - PRL-0001
rejected_findings:
  - id: PRL-0002
    reason: intentional existing behavior outside requested diff
next_actor: implementer
notes: ""
<!-- /pr-review-loop:state -->
```

### Update rules

1. Agents update **only** the managed block in the designated comment, not arbitrary user comments.
2. Create the comment if missing; edit in place if present.
3. Preserve marker lines exactly so parsers remain deterministic.
4. Validate field values against `references/schemas/loop-state.schema.json` (from the installed skill root) before writing.
5. Increment `pass` when a new review cycle starts after republish.
6. Set `next_actor` to `implementer`, `reviewer`, or `human` according to who must act next.

### Field semantics

| Field | Purpose |
| --- | --- |
| `status` | Current loop phase |
| `pass` | Current review cycle number |
| `max_passes` | Stop guard; default 5 unless raised |
| `mode` | Coordination mode (see `modes.md`) |
| `implementer` | Adapter doing edits (`claude-code`, `codex-cloud`, `human`, …) |
| `reviewer` | Adapter producing findings (`codex-cli`, `codex-github`, `human`, …) |
| `branch` | Head branch name |
| `pr` | PR number |
| `tests` | Focused commands run after fixes |
| `accepted_findings` | Stable finding IDs implementer must address |
| `rejected_findings` | Findings dismissed with recorded reason |
| `next_actor` | Who acts next |
| `last_review_at` | ISO-8601 timestamp of last ingested review |
| `last_commit` | Short SHA reviewed or fixed |
| `notes` | Freeform operator context |

## Finding ledger

Each finding is a structured record conforming to `references/schemas/review-finding.schema.json` (from the installed skill root).

### Stable IDs

Assign stable IDs at ingest time:

```text
PRL-0001, PRL-0002, ...
```

Rules:

- IDs never change once assigned.
- Re-ingesting the same provider comment maps to the existing ID when file, line, and title match closely enough for deterministic dedup (future CLI owns matching rules).
- Provider-native IDs may be stored in `source` metadata but must map to `PRL-*` in loop state.

### Triage states

| Status | Meaning |
| --- | --- |
| `open` | Reported, not yet triaged |
| `accepted` | Implementer should fix |
| `fixed` | Addressed in a subsequent commit |
| `rejected` | Dismissed with `triage_reason` |

Rejected findings must keep a reason in both the finding record and `rejected_findings` in loop state.

## Review ingest

Review providers emit findings in provider-native form (Codex `[P0]`–`[P3]` lines, GitHub review comments, human notes). Ingest adapters must normalize to the finding schema and assign `PRL-*` IDs.

Do not treat provider output as automatically accepted. An implementer or operator triages first.

## Publish and republish

- **Publish:** push commits that move the PR forward and set `status: needs-review`.
- **Republish:** after fixes, push new commits, update `last_commit`, increment `pass` when starting the next review cycle, and request review again.

Push is expected in PR modes. Merge is **not** part of publish.

## Stop and close

Stop the loop when all are true:

1. No `open` or `accepted` actionable findings remain.
2. Required tests and checks pass.
3. `pass <= max_passes`.
4. Merge policy is satisfied or a human explicitly requests merge.

Closeout actions:

- Set managed comment `status: clean` or `status: ready-human` depending on whether human merge review is still required.
- Apply the matching GitHub label (`agent:clean` or `agent:ready-human`) separately from the managed comment enum.
- Record final pass count, tests run, and last commit in the managed comment.
- Do not run extra review passes after clean just for nicer wording.

## Commit hygiene

- Scope commits to the loop task only.
- Do not include unrelated dirty files from the working tree.
- Prefer one logical fix per finding or one cohesive fix batch with clear commit message.

## Merge policy

- Agents must **not** merge unless explicitly requested by the operator or enabled by repo policy.
- `agent:ready-human` means the agent loop is done, not that auto-merge is allowed.

## Optional local mirror

Target repos may store:

```text
.pr-review-loop/config.json
.pr-review-loop/runs/<run-id>/loop-state.json
.pr-review-loop/runs/<run-id>/findings.json
```

Local mirrors are optional accelerators. If GitHub and local state disagree, GitHub wins.

## Anti-patterns

- Session-to-session handoff without updating PR state
- Editing user comments instead of the managed block
- Blindly accepting every provider finding
- Merging while `agent:needs-fix` or with open accepted findings
- Extra review passes after a clean stop
- Pulling unrelated local changes into loop commits
