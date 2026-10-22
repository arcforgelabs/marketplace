---
name: contributing-upstream
description: "Prepare upstream open source issues, PRs, and comments."
---

# Contributing Upstream

Upstream contribution is a maintainer-load negotiation. Before writing an issue,
PR, or public comment, learn the repository's contribution contract and current
maintainer posture.

For `openclaw/openclaw` or `openclaw/openclaw-enterprise`, also use
`contributing-openclaw`: it carries their routing, proof rules, ClawSweeper's
rubric and our lessons log.

## When to Use

- Investigating whether to open an upstream issue or PR
- Preparing comments on an existing upstream issue or PR
- Preparing commits for an upstream PR
- Writing PR titles and descriptions
- Deciding whether a finding belongs upstream at all
- Reviewing agent-assisted work before submitting it to someone else's tracker

## Core Rule

Read upstream instructions before opening anything.

Minimum first pass:

- `README.md`
- `CONTRIBUTING.md`
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or equivalent agent instructions
- `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE*`, and `.github/config.yml`
- `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `GOVERNANCE.md`, or `MAINTAINERS.md` when present
- relevant package README/docs/changelog for the code you touched
- pinned issues, recent maintainer comments, labels, releases, and project status notices

Also check inherited community-health files from an org-level `.github` repo when
GitHub surfaces them.

## Observation First

When asked to "check", "observe", or "research" an upstream account/thread:

- Do not comment, react, subscribe, edit, close, reopen, label, or otherwise write.
- Use public repo data and docs first.
- Treat `OWNER`, `MEMBER`, or `COLLABORATOR` author association as a strong signal that the comment is authoritative.
- Cross-check authority with recent merges, top-contributor position, pinned repos, CODEOWNERS, maintainer docs, and org membership.
- State uncertainty when exact permissions are not public.

## Contribution Gate Scan

Before recommending or creating an issue/PR, answer:

- Are new contributors allowed to open issues or PRs?
- Is prior approval required?
- Are issues/PRs auto-closed under certain conditions?
- Are weekends, refactors, freezes, or releases declared no-triage periods?
- Are agent-generated issues, bulk submissions, or low-signal reports explicitly banned?
- Which validation commands are required, and are any commands forbidden?
- Does the project require issue templates, reproduction repos, logs, tests, screenshots, or benchmarks?

If the docs say not to open a PR without approval, do not open one. If they say
issues from new contributors are auto-closed, write the issue as a concise
maintainer-ready artifact and expect silence unless reopened.

## Agent-Assisted Work

The human account owns the submission. Never use a coding agent as a reason to
lower the bar.

Before filing:

- Reproduce the problem yourself or clearly state that you cannot.
- Verify the issue is not explained by docs, build steps, install steps, or known current status.
- Prefer the documented setup exactly, even when local agent instructions differ.
- If local instructions conflict with upstream docs, upstream docs win for upstream submissions.
- Remove agent transcript noise, speculative root causes, and generic "suggested fixes" unless evidence supports them.
- Keep the report short enough for a maintainer to read in one screen unless the template requires more.

Avoid filing issues that only say "my agent could not validate this." Turn that
into a local note unless it demonstrates a real user-facing failure from the
documented workflow.

## Issue Shape

A good upstream issue is:

- concrete: one bug, request, or question
- current: checked against latest docs and releases
- reproducible: includes exact command/path/version/logs when relevant
- respectful of project scope: explains why it belongs in this repo
- concise: no agent chatter, no long theory dump

Use the project's issue template exactly. If no template exists:

```markdown
## Problem
[What breaks or what is missing.]

## Reproduction
[Minimal steps, commands, versions, relevant logs.]

## Expected
[What should happen.]

## Context
[Why this matters, and whether you can help implement it.]
```

## PR Shape

Do not open a PR unless the repo allows it and the change has an obvious review
path.

Before PR:

- Read contribution docs and package-specific docs.
- Search existing issues/PRs.
- Keep one logical change per PR.
- Run required validation exactly as documented.
- Self-review the diff for unrelated changes, secrets, generated noise, and formatting churn.
- Include tests for behavior changes unless maintainers' docs say otherwise.

## Commit Format (Conventional Commits)

```
<type>(<scope>): <description>

<body>

<footer>
```

### Types

| Type | Purpose | SemVer Impact |
|------|---------|---------------|
| `feat` | New feature | MINOR |
| `fix` | Bug fix | PATCH |
| `docs` | Documentation only | - |
| `style` | Formatting, no code change | - |
| `refactor` | Code restructuring, no behavior change | - |
| `perf` | Performance improvement | PATCH |
| `test` | Adding/fixing tests | - |
| `chore` | Maintenance, deps, tooling | - |
| `ci` | CI/CD changes | - |

### Rules

1. **Type**: Required, lowercase
2. **Scope**: Optional, in parentheses - identifies subsystem (e.g., `auth`, `api`, `ui`)
3. **Description**: Required, imperative mood ("add" not "added"), no period, <50 chars
4. **Body**: Optional, explain WHY not WHAT, wrap at 72 chars
5. **Footer**: Optional, reference issues (`Fixes #123`), note breaking changes

### Breaking Changes

Two notations:
```
feat!: remove deprecated API endpoint

feat(api): remove deprecated endpoint

BREAKING CHANGE: /v1/users endpoint removed, use /v2/users
```

## PR Best Practices

### Size Guidelines

| Size | Review Time | Recommendation |
|------|-------------|----------------|
| <50 lines | ~15 min | Ideal |
| 50-200 lines | ~30 min | Acceptable |
| 200-500 lines | ~60 min | Consider splitting |
| >500 lines | Hours | Split required |

**Principle**: Reviewers have limited attention. A 15-minute review gets more thorough attention than a 60-minute one.

### Splitting Strategies

| Pattern | When to Use |
|---------|-------------|
| Sequential PRs | Large feature broken into logical steps |
| Separate fix PRs | Unrelated fixes discovered during work |
| Extract refactors | Preparatory cleanup before feature |
| Tests first | Add tests in separate PR, then implementation |

### PR Title

- Match commit message format: `<type>(<scope>): <description>`
- Under 70 characters
- Describe the problem solved, not the solution method

### PR Description Template

```markdown
## Problem
[1-2 sentences: what's broken or missing]

## Solution
[1-2 sentences: approach taken]

## Screenshots (if UI change)
**Before:**
[image]

**After:**
[image]

## Testing
[How to verify: manual steps or test commands]

Fixes #<issue-number>
```

### Review Acceleration Tactics

1. **Self-review first** - Read your own diff before submission
2. **Atomic commits** - Each commit compiles and passes tests
3. **Keep fixups separate** - Don't squash until approved (reviewers see incremental changes)
4. **Allow maintainer edits** - Enable "Allow edits from maintainers"
5. **Respond promptly** - Momentum matters; stale PRs get abandoned

## Design Philosophy

| Principle | Meaning |
|-----------|---------|
| **KISS** | Simplest solution that works |
| **YAGNI** | Don't implement speculative features |
| **MVP** | Minimum viable change to solve the problem |

## Pre-Submission Checklist

```
[ ] Read README, CONTRIBUTING, templates, and agent instructions
[ ] Checked maintainer gates, current freezes, labels, and pinned notices
[ ] Confirmed issue/PR is allowed for this account/contributor state
[ ] Reproduced or clearly bounded uncertainty
[ ] Removed agent-generated noise and unsupported speculation
[ ] Single purpose (one logical change)
[ ] <200 lines changed (ideal <50)
[ ] Conventional commit title
[ ] Problem/solution in description
[ ] Screenshots if UI change
[ ] Tests if behavior change
[ ] Self-reviewed the diff
[ ] Required validation passes locally
[ ] Allow maintainer edits enabled
```

## What to Avoid

| Anti-Pattern | Why |
|--------------|-----|
| Filing before reading docs | Wastes maintainer time and can trigger bans on strict repos |
| Agent transcript dumps | Maintainers need distilled facts, not process residue |
| "My agent could not build" issues | Often just missed setup instructions |
| Ignoring auto-close / approval gates | Signals that you did not read the contribution contract |
| Multi-purpose PRs | Hard to review, often stall |
| Speculative features | Open issue for discussion first |
| Large refactors | High risk without prior buy-in |
| Missing context | Reviewer won't invest time guessing |
| Drive-by style fixes | Mix with functional changes = confusion |

## Optimal First Contributions

1. **Documentation fixes** - Typos, outdated info, broken links
2. **Single bug fixes** - Clear reproduction, minimal change
3. **Test additions** - Increase coverage without changing behavior
4. **CI improvements** - Build speed, reliability
5. **Accessibility fixes** - High value, usually small

## Process for Larger Contributions

1. **Open issue first** - Describe problem/feature, get buy-in
2. **Wait for response** - Maintainer may have context you lack
3. **Reference issue in PR** - `Fixes #123` links them
4. **Sequential PRs** - Break large work into reviewable chunks
5. **Rebase regularly** - Keep branch current with main

## Quick Reference

```
COMMIT:  <type>(<scope>): <imperative description>
         Types: feat|fix|docs|style|refactor|perf|test|chore|ci
         Breaking: feat!: or BREAKING CHANGE: footer

PR SIZE: <50 lines ideal, <200 acceptable, >500 split it

PR BODY: Problem → Solution → Screenshots → Testing → Fixes #N

SUCCESS: Small + Focused + Clear = Fast merge
```

## Strict Maintainer Posture

Some projects explicitly defend maintainer attention with auto-closing,
approval gates, no-weekend triage, or warnings against "clanker" or
agent-generated submissions. Treat those signals as policy, not tone to debate.

In that posture:

- Do not litigate the warning in the thread.
- Do not open a follow-up issue to explain the first issue.
- Convert the lesson into local workflow rules.
- Only return upstream with a short, verified, docs-compliant artifact when the docs allow it.
