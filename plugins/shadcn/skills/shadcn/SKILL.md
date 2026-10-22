---
name: shadcn
description: "Use shadcn/ui components and CLI for React projects."
---

# shadcn

[shadcn/ui](https://ui.shadcn.com) components are copied into the target repo via CLI (not installed as an opaque package). Prefer the **official upstream skill** as the command reference.

## Install Official Skill

```bash
npx skills add shadcn/ui
```

Source of truth: [shadcn-ui/ui `skills/shadcn/SKILL.md`](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/SKILL.md).

## When To Use

- Target repo has or needs `components.json`.
- Implementing UI with Radix/Base primitives + Tailwind in a React/Next/Vite app.
- Adding, updating, or inspecting registry components.

## DESIGN.md Guardrails

- When `DESIGN.md` exists, it is the visual contract. Run `design-system-enforcer` before accepting UI changes.
- Map design tokens into shadcn CSS variables and variants. Do not let default shadcn theme presets override the contract.
- Use `npx shadcn@latest info --json` for project context; use `--dry-run` and `--diff` before overwriting installed components.

## Quick Commands

```bash
npx shadcn@latest info --json
npx shadcn@latest add button --dry-run
npx shadcn@latest docs combobox
```

Component catalogue (local cheat sheet): `references/components.md`.

## Docs

- https://ui.shadcn.com/docs/skills
- https://ui.shadcn.com/docs
