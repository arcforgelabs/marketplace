# Documentation Pattern Examples

Real-world examples of each pattern in use, extracted from production systems.

---

## Pattern 1: Minimal Navigation Hub (CLAUDE.md)

**Good Example:**

```markdown
# Project Name - CLAUDE.md

> **Purpose**: Minimal critical directives for AI agents (pointers to detailed documentation)
> **Lifecycle**: Living (keep minimal, move verbose content to CONTRIBUTING.md or DEVELOPMENT.md)

## 📍 Critical Documents

**Before starting work:**
1. Read `STATUS.md` → Current issues, active work, what's broken
2. Read `ARCHITECTURE.md` → System architecture, database schema, tech stack
3. Read `CONTRIBUTING.md` → How to track progress with GitHub issues

**Before finishing work:**
1. Update `STATUS.md` → Add investigation notes, mark issues resolved
2. Update GitHub issues → Close completed tasks, link commits
3. Check `DEVELOPMENT.md` → Run pre-commit checklist

## 🏗️ Architecture Quick Facts

### Style
- **Vertical Slice Architecture** (each feature = UI + service + DB in one folder)
- **Offline-First** (IndexedDB → Cloud sync, NOT cloud-first)

### Structure Pattern
\`\`\`
features/
└── featureName/
    ├── ComponentName.tsx      # UI
    ├── useFeature.ts          # State hook (Zustand)
    ├── featureService.ts      # Business logic
    └── featureDb.ts           # IndexedDB operations
\`\`\`

See `ARCHITECTURE.md` for complete details.

## ⚠️ Critical Constraints

1. **Offline-First**: App MUST work 100% offline (no degraded functionality)
2. **Mobile-First**: Designed for field use (phones/tablets, often no connectivity)
3. **Vertical Slices**: Keep feature code together (UI + service + DB in one folder)
```

**Why this works:**
- ~100-150 lines total (MAX 200 lines, preferably closer to 100)
- Pointers to other docs, not content duplication
- Quick facts, not detailed explanations
- Critical constraints clearly flagged
- "Before starting/finishing work" checklists provide immediate action items

**Bad Example (DON'T DO THIS):**

```markdown
# Project Name - CLAUDE.md

[300+ lines of content]

## Architecture

[Full architecture copied from ARCHITECTURE.md - 100 lines]

## Git Workflow

[Complete git workflow copied from DEVELOPMENT.md - 50 lines]

## Current Bugs

[Bug list copied from STATUS.md - 40 lines]

## Database Schema

[Full schema copied from ARCHITECTURE.md - 80 lines]
```

**Why this is bad:**
- 500+ lines wastes context tokens
- Duplicates content from other documents
- Hard to maintain (update in multiple places)
- Obscures critical information with noise

---

## Pattern 2: Rolling Window (STATUS.md)

**Good Example:**

```markdown
# Project Status

> **Purpose**: Current work, active bugs, and recent changes (~2 week rolling window)
> **Lifecycle**: Living document (update daily/weekly during active development)

**Last Updated:** 2025-11-11 (Session: Resolved 2 critical bugs)
**Current Phase:** Post-MVP Bug Fixes
**Version:** 1.0.0-beta

## Current Focus

**Completed 2025-11-11 (Today's Session):**
- ✅ Sync Queue Fix - Auto-sync now updates UI state
- ✅ Job Calculations Fix - Backend bugs fixed + frontend captures responses

**In Progress:**
- 🔵 Manual testing and verification
- 🔵 Update CHANGELOG.md

## Known Issues

### Critical Blockers

#### Issue #1: Sync Queue Not Clearing While Online ✅ RESOLVED
**Status:** FIXED - 2025-11-11
**Root Cause:** Auto-sync bypassed UI state management
**Solution:** 3-part fix implemented (see detailed notes)

## Recent Achievements (Last 2 Weeks)

### Offline Authentication Feature ✅
**Completed:** 2025-11-11
- Secure credential storage using Web Crypto API
- 4/4 E2E tests passing

## Next Steps

1. **📋 Manual testing** - Test sync queue fix end-to-end
2. **📝 Update CHANGELOG** - Document resolved issues
```

**Why this works:**
- "Last Updated" date prominently displayed
- Current Focus at top (what's happening now)
- Known Issues are actually current (not 6 months old)
- Recent Achievements limited to 2 weeks
- Old content has been archived

**Bad Example (DON'T DO THIS):**

```markdown
# Project Status

## Known Issues

- Bug from 2024-05-12 (6 months ago)
- Bug from 2024-08-15 (3 months ago)
- Bug from 2024-10-01 (still investigating)

## Achievements

- [100+ lines of achievements from past 6 months]
- No dates, no way to know what's recent
```

**Why this is bad:**
- No rolling window (historical dump)
- Can't tell what's current vs old
- No "Last Updated" date
- Obscures current work with historical noise

---

## Pattern 3: ADRs (ARCHITECTURE.md)

**Good Example:**

```markdown
### ADR-001: Offline-First Over Cloud-First
**Date:** 2024-11 (during planning)
**Status:** Accepted

**Context:** Field workers often lack reliable internet connectivity.

**Decision:** Implement offline-first architecture with IndexedDB as primary data store, cloud as backup/sync target.

**Consequences:**
- ✅ Full functionality without internet
- ✅ Instant user interactions (no network latency)
- ❌ Increased complexity (sync conflicts, data consistency)
- ❌ Browser storage limitations (IndexedDB quota)

**Alternatives Considered:**
- Cloud-first with offline cache (rejected - degraded offline experience)
- Native mobile app (rejected - cross-platform maintenance burden)
```

**Why this works:**
- Documents WHY decision was made
- Shows trade-offs explicitly (benefits AND drawbacks)
- Lists rejected alternatives with reasons
- Prevents re-debating settled decisions

**Bad Example (DON'T DO THIS):**

```markdown
## Architecture

We use IndexedDB for offline storage.
```

**Why this is bad:**
- No context (why was this chosen?)
- No trade-offs shown
- No alternatives considered
- Future developers will question this choice

---

## Pattern 4: Definition of Done (CONTRIBUTING.md)

**Good Example:**

```markdown
## Definition of Done: UI Bug Fixes

**⚠️ CRITICAL REQUIREMENT**: All UI bug fixes MUST include a passing E2E test that verifies the fix works in the actual UI.

### Why This Matters

The offline-first architecture adds complexity - data flows through multiple layers (UI → IndexedDB → Sync → API → Response → IndexedDB → UI), and any broken link causes silent failures. Backend tests alone don't catch UI display issues.

### Requirements for UI Fixes

1. **Write E2E test first** (Test-Driven Development)
2. **Test must fail initially** - proves it reproduces the bug
3. **Apply fix** - update code to resolve the issue
4. **Test must pass** - verifies the fix works end-to-end
5. **Keep test in suite** - prevents regression

### What Counts as a UI Bug

- Data not displaying correctly
- Form submissions not working
- Sync status not updating

**Bottom line**: If a user can see it's broken in the UI, an E2E test must verify the fix. No exceptions.
```

**Why this works:**
- Explicit requirements (no ambiguity)
- Explains WHY (not just what)
- Provides concrete checklist
- Defines scope clearly

**Bad Example (DON'T DO THIS):**

```markdown
## Contributing

Please write tests for your code.
```

**Why this is bad:**
- Vague ("tests" - what kind?)
- No requirements
- No consequences for skipping
- No explanation of why

---

## Pattern 5: Pre-Commit Checklist (DEVELOPMENT.md)

**Good Example:**

```markdown
## 🔍 Pre-Commit Checklist (CRITICAL)

**Before EVERY commit**, complete this checklist:

\`\`\`bash
# 1. Run linting and auto-fix issues
cd backend && npm run lint:fix
cd frontend && npm run lint:fix

# 2. Format code with Prettier
cd backend && npm run format
cd frontend && npm run format

# 3. Run unit tests (if applicable to changes)
cd backend && npm run test:unit
cd frontend && npm run test:unit

# 4. Review staged changes
git status
git diff --staged

# 5. Verify commit message includes issue reference
#    Use: "Closes #N", "Relates to #N", "Fixes #N"
\`\`\`

**Why**: CI runs these same checks. Catching issues locally saves time and prevents broken builds.
```

**Why this works:**
- Exact commands (no ambiguity)
- Explains WHY (prevents CI failures)
- Covers all critical steps
- Actionable checklist format

**Bad Example (DON'T DO THIS):**

```markdown
## Before Committing

Make sure your code is clean and tested.
```

**Why this is bad:**
- No specific commands
- Vague requirements
- No checklist format
- No explanation of consequences

---

## Pattern 6: Cross-Referencing

**Good Example (CLAUDE.md):**

```markdown
## Architecture Quick Facts

- **Vertical Slice Architecture**
- **Offline-First** (IndexedDB → Cloud sync)

See `ARCHITECTURE.md` for complete details (database schema, tech stack, ADRs, infrastructure).
```

**Good Example (CONTRIBUTING.md):**

```markdown
## Git Workflow: Quick Reference

\`\`\`bash
git checkout dev && git pull origin dev
git checkout -b feature/my-feature
\`\`\`

**See [`DEVELOPMENT.md`](./DEVELOPMENT.md) § Git Branching Strategy** for complete workflow, branch protection rules, and CI/CD expectations.
```

**Why this works:**
- Provides quick facts/commands
- Links to detailed documentation
- No content duplication
- Single source of truth maintained

**Bad Example (DON'T DO THIS):**

```markdown
## Git Workflow (in both CONTRIBUTING.md AND DEVELOPMENT.md)

[Full 200-line git workflow duplicated in both files]
```

**Why this is bad:**
- Duplication requires updating two places
- Versions drift over time
- No clear source of truth

---

## Pattern 7: Metadata Headers

**Good Example:**

```markdown
# Architecture Documentation

> **Purpose**: Technical reference for system architecture, database schema, tech stack, and ADRs
> **Lifecycle**: Living (update as implementation diverges from original plan)

**Version:** 1.0
**Last Updated:** 2025-11-11
```

**Why this works:**
- Clear purpose statement
- Lifecycle policy explicit
- Version tracking
- Last updated date

**Bad Example (DON'T DO THIS):**

```markdown
# Architecture

[No metadata, no context, no lifecycle policy]
```

**Why this is bad:**
- No indication what doc is for
- No update policy
- Unclear when content is stale

---

## Pattern 8: CHANGELOG Format

**Good Example:**

```markdown
# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features coming in next release

### Fixed
- Bug fixes not yet released

## [1.0.0-beta] - 2025-11-08

### Summary
MVP completion - All 8 epics implemented and tested locally.

### Added
- **Epic 1: Foundation** - AWS infrastructure, database schema, authentication
- **Epic 2: Backend Quote API** - RESTful API for quote CRUD operations

### Fixed
- **Critical**: Race condition preventing users from adding jobs
  - Root cause: Jobs were backend-dependent while quotes were offline-first
  - Solution: Jobs now use IndexedDB → Sync Queue → Backend pattern

[1.0.0-beta]: https://github.com/org/repo/compare/v0.1.0...v1.0.0-beta
```

**Why this works:**
- Follows Keep a Changelog format
- [Unreleased] section for WIP
- Summary for each version
- Standard categories (Added, Changed, Fixed, etc.)
- Links to GitHub comparisons

**Bad Example (DON'T DO THIS):**

```markdown
# Changes

- Fixed some bugs
- Added features
- Did stuff

(No dates, no structure, no links)
```

**Why this is bad:**
- No standard format
- Can't parse programmatically
- No dates or versions
- No links to releases

---

## Using These Patterns

When creating new documentation:

1. **Start with templates** from `assets/templates/`
2. **Follow patterns** shown in examples above
3. **Avoid anti-patterns** shown in "bad examples"
4. **Cross-reference** instead of duplicating
5. **Audit regularly** using `references/audit-checklist.md`

When fixing existing documentation:

1. **Identify anti-patterns** using examples above
2. **Apply fixes** from `references/common-fixes.md`
3. **Re-audit** to verify improvements
4. **Maintain quality** over time with rolling updates
