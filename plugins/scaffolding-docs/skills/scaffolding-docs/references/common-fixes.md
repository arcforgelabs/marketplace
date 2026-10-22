# Common Documentation Fixes

Solutions for typical documentation drift issues discovered during audits.

---

## Issue 1: CLAUDE.md is Too Long (500+ lines)

**Problem:** CLAUDE.md contains duplicated content from ARCHITECTURE.md, CONTRIBUTING.md, or other documents.

**Why it matters:** CLAUDE.md is always loaded into agent context. Verbose content wastes tokens and makes navigation harder.

**Solution:**

1. Identify duplicated sections:
   - Full architecture details → Should be in ARCHITECTURE.md only
   - Git workflow → Should be in DEVELOPMENT.md only
   - Current bugs → Should be in STATUS.md only
   - Progress tracking → Should be in CONTRIBUTING.md only

2. Replace duplicated content with pointers:
   ```markdown
   ## Architecture

   See `ARCHITECTURE.md` for complete details (database schema, tech stack, ADRs, infrastructure).
   ```

3. Keep only:
   - Before/after work checklists
   - Critical constraints
   - Quick facts (3-5 bullet points)
   - Project-specific conventions

**Target:** 100-200 lines

---

## Issue 2: STATUS.md Contains Old Content (6+ months)

**Problem:** STATUS.md has become a historical dumping ground with bugs from 6 months ago.

**Why it matters:** Old content obscures current work and makes the document useless for understanding project state.

**Solution:**

1. Establish 2-week rolling window:
   - **Recent Achievements:** Last 2 weeks only
   - **Known Issues:** Currently active only (not resolved months ago)

2. Archive old content:
   - Move resolved issues older than 2 weeks to git history
   - Update CHANGELOG.md with major achievements
   - Delete or archive items no longer relevant

3. Add "Last Updated" date prominently:
   ```markdown
   **Last Updated:** 2025-11-11 (Session: Fixed X and Y)
   ```

4. Restructure STATUS.md:
   - Current Focus (this week) at top
   - Known Issues (active only)
   - Recent Achievements (last 2 weeks)
   - Next Steps (prioritized)

---

## Issue 3: README.md is Outdated

**Problem:** Quick start commands don't work, links are broken, version numbers are wrong.

**Why it matters:** New developers and AI agents can't onboard successfully.

**Solution:**

1. Test Quick Start commands:
   ```bash
   # Follow your own README from scratch
   # Fix any commands that fail
   ```

2. Verify all links:
   - GitHub repository URL
   - Project board URL
   - Issues URL
   - External documentation

3. Update version numbers:
   - Tech stack versions
   - Current release version
   - Deployment status

4. Refresh architecture summary:
   - Verify tech stack still accurate
   - Update cost estimates if changed
   - Confirm environment URLs

---

## Issue 4: ARCHITECTURE.md Missing ADRs

**Problem:** Why architectural decisions were made is lost to history.

**Why it matters:** Future developers (and AI agents) will re-debate decisions or accidentally violate architectural principles.

**Solution:**

1. Identify major decisions made:
   - Framework choices (React vs Vue, PostgreSQL vs MongoDB)
   - Architectural patterns (Offline-first, Vertical Slice, Microservices)
   - State management (Redux vs Zustand)
   - Infrastructure (AWS vs GCP, ECS vs Lambda)

2. For each decision, create ADR:
   ```markdown
   ### ADR-001: PostgreSQL Over MongoDB
   **Date:** 2024-11-15
   **Status:** Accepted

   **Context:** Need database for relational data (quotes, jobs, financials) with complex queries and ACID transactions.

   **Decision:** Use PostgreSQL (AWS RDS) for cloud database.

   **Consequences:**
   - ✅ Relational data model fits domain perfectly
   - ✅ ACID transactions for financial data
   - ✅ Mature ecosystem, SQL familiarity
   - ❌ Higher cost than DynamoDB
   - ❌ Scaling requires more planning

   **Alternatives Considered:**
   - MongoDB (rejected - no need for document flexibility)
   - DynamoDB (rejected - awkward for relational data)
   ```

3. Prioritize documenting:
   - Decisions that prevent major refactors
   - Decisions with non-obvious trade-offs
   - Decisions that rejected popular alternatives

---

## Issue 5: Duplicate Content Across Documents

**Problem:** Same workflow documented in both CONTRIBUTING.md and DEVELOPMENT.md, or architecture in both CLAUDE.md and ARCHITECTURE.md.

**Why it matters:** Causes maintenance burden (update in two places) and confusion (which version is correct?).

**Solution:**

1. Establish single source of truth:
   - Git workflow → DEVELOPMENT.md
   - Progress tracking → CONTRIBUTING.md
   - Architecture → ARCHITECTURE.md
   - Current work → STATUS.md
   - Navigation → CLAUDE.md (pointers only)

2. Cross-reference from other docs:
   ```markdown
   ## Git Workflow

   This project uses a three-tier branching strategy.

   **See [`DEVELOPMENT.md`](./DEVELOPMENT.md) § Git Branching Strategy** for complete workflow, branch protection rules, and CI/CD expectations.
   ```

3. Delete duplicate content entirely:
   - Don't just add a link, remove the duplication
   - Ensures only one version exists

---

## Issue 6: Missing Metadata Headers

**Problem:** Documents lack `> **Purpose**: ...` and `> **Lifecycle**: ...` headers.

**Why it matters:** AI agents (and humans) don't know what each document is for or how often to update it.

**Solution:**

Add metadata headers to all 7 core documents:

```markdown
# Document Title

> **Purpose**: [One-sentence description of document's role]
> **Lifecycle**: [Living | Stable | Historical] (update conditions)
```

**Examples:**

- **CLAUDE.md**: Living (keep minimal, move verbose content to other docs)
- **README.md**: Stable (update when project fundamentals change)
- **ARCHITECTURE.md**: Living (update as implementation diverges from plan)
- **STATUS.md**: Living (2-week rolling window)
- **CONTRIBUTING.md**: Stable (update when workflow processes change)
- **DEVELOPMENT.md**: Stable (update when branching strategy or CI/CD changes)
- **CHANGELOG.md**: Historical (append-only, follows Keep a Changelog)

---

## Issue 7: CHANGELOG Not Following Keep a Changelog Format

**Problem:** CHANGELOG is freeform text or missing standard categories.

**Why it matters:** Users and tools can't parse releases programmatically.

**Solution:**

1. Add [Unreleased] section at top:
   ```markdown
   ## [Unreleased]

   ### Added
   - New features

   ### Fixed
   - Bug fixes
   ```

2. Structure version sections:
   ```markdown
   ## [1.0.0] - 2025-11-11

   ### Summary
   MVP completion - All 8 epics implemented.

   ### Added
   - **Feature X** - Description

   ### Changed
   - **Update Y** - Reason

   ### Fixed
   - **Bug Z** - How fixed
   ```

3. Use standard categories:
   - Added
   - Changed
   - Deprecated
   - Removed
   - Fixed
   - Security

4. Add comparison links at bottom:
   ```markdown
   [Unreleased]: https://github.com/org/repo/compare/v1.0.0...HEAD
   [1.0.0]: https://github.com/org/repo/compare/v0.1.0...v1.0.0
   ```

---

## Issue 8: No Pre-Commit Checklist

**Problem:** DEVELOPMENT.md doesn't include actionable pre-commit checklist.

**Why it matters:** CI failures from easily-caught issues (linting, formatting) waste time.

**Solution:**

Add Pre-Commit Checklist to DEVELOPMENT.md:

```markdown
## 🔍 Pre-Commit Checklist (CRITICAL)

**Before EVERY commit**, complete this checklist:

\`\`\`bash
# 1. Run linting and auto-fix issues
npm run lint:fix

# 2. Format code with Prettier
npm run format

# 3. Run unit tests
npm run test:unit

# 4. Review staged changes
git status
git diff --staged

# 5. Verify commit message includes issue reference
#    Use: "Closes #N", "Relates to #N", "Fixes #N"
\`\`\`

**Why**: CI runs these same checks. Catching issues locally saves time.
```

---

## Issue 9: No Definition of Done

**Problem:** CONTRIBUTING.md doesn't define when work is "complete".

**Why it matters:** Leads to incomplete work being marked done, missing tests, or forgotten documentation updates.

**Solution:**

Add Definition of Done section to CONTRIBUTING.md:

```markdown
## Definition of Done

### For Feature Development

**Required:**
- [ ] Feature implemented and tested locally
- [ ] Unit tests written and passing
- [ ] Integration tests written (if applicable)
- [ ] Documentation updated
- [ ] PR created and reviewed
- [ ] CI/CD pipeline passing

### For Bug Fixes

**⚠️ CRITICAL REQUIREMENT**: All bug fixes MUST include automated tests.

**Required:**
- [ ] Root cause identified and documented
- [ ] Fix implemented
- [ ] Test written that reproduces the bug
- [ ] Regression test added to test suite
- [ ] Issue updated with investigation notes
```

---

## Issue 10: Broken External Links

**Problem:** Links to GitHub, project boards, or documentation return 404.

**Why it matters:** Agents and developers can't access referenced resources.

**Solution:**

1. Audit all links:
   ```bash
   grep -r "https://" *.md | grep -E "(github|docs|board)"
   ```

2. Test each link manually or with tool:
   ```bash
   # Use link checker tool
   npx markdown-link-check *.md
   ```

3. Update broken links:
   - GitHub repository URLs (check org/repo name)
   - Project board URLs (verify project number)
   - Documentation URLs (check domain and path)

4. Use placeholders in templates:
   - `{{GITHUB_REPO}}` instead of hardcoded URL
   - Makes future updates easier

---

## Quick Fix Priority

If time is limited, fix in this order:

1. **CLAUDE.md bloat** (highest ROI - affects every agent session)
2. **STATUS.md staleness** (critical for understanding current state)
3. **Missing ADRs** (prevents repeated debates)
4. **Duplicate content** (maintenance burden)
5. **Broken links** (prevents navigation)
6. **Missing metadata headers** (clarity)
7. **Pre-commit checklist** (prevents CI failures)
8. **Definition of Done** (prevents incomplete work)
9. **CHANGELOG format** (user-facing)
10. **README outdated** (onboarding)

---

## Validation

After applying fixes, run audit checklist again:

```
Use references/audit-checklist.md to verify all issues resolved
```

Target: ✅ 90%+ items checked
