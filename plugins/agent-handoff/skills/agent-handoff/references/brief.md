# Brief templates

## Issue

```markdown
## Problem

<What is wrong or missing today, and where. One short paragraph.>

## What we want

1. <Behaviour, in the user's words.>
2. <...>

## Reuse first

- <The shared components, helpers or patterns to extend, with paths.>
- <The docs the agent reads first: VISION.md, AGENTS.md, design docs.>

## Limits

- <What not to change: schema, workflows, public API, external calls.>

## Done when

- <Tests that prove it.>
- Evidence: before/after screenshots of the real product on synthetic data
  (desktop and phone) for any screen.
- Draft pull request on a `<prefix>/<slug>` branch, the repo's template
  filled, `Closes #<n>`. <Who merges.>
```

Describe screenshots from a person in words ("the menu opens inline under
the row and pushes the rows below it"). Do not attach one that shows real
data to a public repo.

## Mention comment (new work)

```markdown
<trigger> Please take this issue.

- Read <docs> first. Reuse <component>; do not write a second one.
- <One-line limit.>
- Branch `<prefix>/<slug>`, draft pull request with the template filled,
  `Closes #<n>`, Evidence with <tests> and before/after screenshots.
- Mark ready for review when CI is green. <Who> merges it.
```

## Mention comment (finish a pull request)

```markdown
<trigger> Please finish this pull request<; why now>.

- Bring the branch up to date with `main` (merge, no force-push) and run
  the full tests.
- Add <missing proof>.
- Fill any empty template section, then mark it ready for review when CI is
  green. <Who> merges it.
```
