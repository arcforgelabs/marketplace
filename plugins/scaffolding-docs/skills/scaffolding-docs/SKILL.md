---
name: scaffolding-docs
description: "Scaffold project docs: templates, fork docs, repo structure."
---

# Scaffolding Docs

Establish documentation structure for new projects using lean templates. Templates define **what goes where**, not complete content.

## The 11 Core Documents

| Document | Purpose | Lifecycle |
|----------|---------|-----------|
| **VISION.md** | Philosophical north star, guiding axioms | Stable |
| **CLAUDE.md** | Navigation hub + critical constraints for AI | Stable |
| **README.md** | Project introduction + quick start | Stable |
| **ARCHITECTURE.md** | Tech stack, schema, ADRs | Living |
| **DESIGN.md** | Visual tokens, UI patterns, content guidelines | Living |
| **STATUS.md** | Current work (2-week rolling window) | Living |
| **PROGRESS.md** | Detailed project tracking (epics, features, tasks) | Living |
| **ISSUES.md** | Bug and improvement tracking | Living |
| **CONTRIBUTING.md** | Workflow + Definition of Done | Stable |
| **DEVELOPMENT.md** | Git workflow + CI/CD + testing | Stable |
| **CHANGELOG.md** | Release history (append-only) | Historical |

No content overlap between documents. Each has an exclusive domain.

## Setup

```bash
# Copy templates to project
cp assets/templates/*.template <project>/
for file in <project>/*.template; do mv "$file" "${file%.template}"; done
```

Fill in `{{PROJECT_NAME}}`, `{{TECH_STACK}}`, etc. Templates are minimal scaffolds — they grow with the project.

## Fork Projects

Run fork detection first. If confirmed fork, also copy fork templates:

```bash
cp assets/templates/FORK.template.md <project>/FORK.md
mkdir -p <project>/docs/fork
cp assets/templates/fork/*.template.md <project>/docs/fork/
```

Fork docs: `FORK.md` (hub), `docs/fork/PATCHES.md`, `docs/fork/SYNC.md`, `docs/fork/TESTING.md`.

## Key Patterns

- **VISION.md**: 3-5 lines. No jargon. If it needs explaining, it's too complicated.
- **CLAUDE.md**: ~50-60 lines. Navigation hub, not content dump. Pointers to other docs.
- **STATUS.md**: 2-week rolling window. Archive older items to CHANGELOG.md.
- **PROGRESS.md**: Default tracking method. GitHub Issues is opt-in only.

## Audit

Use `references/audit-checklist.md` for comprehensive checks. Quick audit:

- All 11 documents present?
- No content duplication?
- STATUS.md using rolling window (not historical dump)?
- CLAUDE.md under 100 lines?

## Resources

- Templates: `assets/templates/`
- Audit checklist: `references/audit-checklist.md`
- Common fixes: `references/common-fixes.md`
