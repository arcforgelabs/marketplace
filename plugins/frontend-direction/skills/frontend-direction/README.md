# frontend-direction

Status: `internal`

The **design-judgment layer** that the `claude-design` harness lacks. A senior
frontend design-director persona that does three things:

- **Move 1 — Brief-out:** translate vague intent ("sleek", "simpler", "premium")
  into a precise, falsifiable directive an executor (Claude Design or a builder)
  cannot misread.
- **Move 2 — Crit:** look at a rendered design and name *where it is*, *where it
  needs to be*, and the single highest-leverage fix — starting by questioning
  whether each view/control should exist at all.
- **Move 3 — System direction:** found or refine a Claude Design *design system*
  with direction and intent (not schema), so the system compounds the direction
  across every future project.

Desktop + mobile. The **master rule** is *subtract before you style* — apply
Musk's 5-step algorithm to the interface (question the requirement → remove →
optimise → accelerate → systematise, in that order, never backwards), so the
persona kills scope and complexity leakage before it ever critiques pixels. The
secondary rule is *calibrate boldness to the product* — a utility recedes, a brand
moment expresses — which together replace the old `frontend-design` skill's
"always be BOLD" bias.

## How it fits

| Skill | Role |
| --- | --- |
| `frontend-direction` | **Eyes + taste** — brief-out and critique (this skill) |
| `claude-design` | **Hands** — drive the cloud agent, sync, capture, review-transport |
| `frontend-design` | superseded for direction work |

Compose the brief here, then drive the harness with `claude-design`.

## Layout

Two files by design — the persona's value is concentrated judgment, not
documentation.

- `SKILL.md` — the whole persona: two axes, reasoning from the human (eye / mind /
  hand / time), the three things it does (brief, crit, direct a system), the
  stance menu, and what to avoid.
- `references/canon.md` — the lineage it reasons from (Rams, Vignelli, Norman,
  Tufte, Disney 12, Refactoring UI, Laws of UX, HIG, Material 3…) with links.

Keep this folder as the source of truth; install to runtimes with the
skill-installer (`./scripts/forge-tools skills install frontend-direction`).
