# Documentation Audit Checklist

Use this checklist to audit project documentation for completeness and quality.

---

## Core Documents Present

- [ ] **CLAUDE.md** exists
- [ ] **README.md** exists
- [ ] **ARCHITECTURE.md** exists
- [ ] **STATUS.md** exists
- [ ] **PROGRESS.md** exists
- [ ] **ISSUES.md** exists
- [ ] **CONTRIBUTING.md** exists
- [ ] **DEVELOPMENT.md** exists
- [ ] **CHANGELOG.md** exists

---

## Metadata Headers

All 9 core documents should have metadata headers:

### CLAUDE.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Living ...` header
- [ ] Purpose accurately describes navigation hub role

### README.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Stable ...` header

### ARCHITECTURE.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Living ...` header

### STATUS.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Living ...` header
- [ ] Includes "Last Updated:" date

### PROGRESS.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Living ...` header
- [ ] Includes "Last Updated:" date
- [ ] Has Project Overview section
- [ ] Has Epic/Feature/Task structure

### ISSUES.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Living ...` header
- [ ] Includes "Last Updated:" date
- [ ] Has Status/Priority guides
- [ ] Has Active Issues section

### CONTRIBUTING.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Stable ...` header

### DEVELOPMENT.md
- [ ] Has `> **Purpose**: ...` header
- [ ] Has `> **Lifecycle**: Stable ...` header

### CHANGELOG.md
- [ ] Follows Keep a Changelog format
- [ ] Has [Unreleased] section
- [ ] Links to GitHub releases

---

## CLAUDE.md Quality

Navigation Hub Principles:

- [ ] 100-200 lines (not 500+)
- [ ] "Before starting work" checklist present
- [ ] "Before finishing work" checklist present
- [ ] Critical Documents section with 1-line descriptions
- [ ] Architecture Quick Facts section
- [ ] Project-Specific Conventions section
- [ ] Critical Constraints section
- [ ] External Links section
- [ ] NO duplicated content from other docs (only pointers)

### Content Appropriateness

- [ ] Does NOT contain full architecture (link to ARCHITECTURE.md instead)
- [ ] Does NOT contain full workflow (link to CONTRIBUTING.md instead)
- [ ] Does NOT contain git workflow (link to DEVELOPMENT.md instead)
- [ ] Does NOT contain current bugs (link to STATUS.md instead)

---

## README.md Quality

- [ ] Project overview (2-3 sentences)
- [ ] Quick Start section with one-command setup (if possible)
- [ ] Architecture summary (not full details)
- [ ] Key features list
- [ ] Testing commands
- [ ] Links to other documentation
- [ ] Links to GitHub (repo, issues, project board)

---

## ARCHITECTURE.md Quality

- [ ] System Overview section
- [ ] Architecture Pattern explanation
- [ ] Technology Stack tables (with versions)
- [ ] Directory structure diagrams
- [ ] Database schema (if applicable)
- [ ] Infrastructure diagram (if deployed)
- [ ] Security section
- [ ] At least 2-3 ADRs (Architecture Decision Records)

### ADR Quality

For each ADR:
- [ ] Has Date field
- [ ] Has Status field (Accepted/Rejected/Superseded)
- [ ] Has Context section (why needed)
- [ ] Has Decision section (what was decided)
- [ ] Has Consequences section (✅ benefits, ❌ drawbacks)
- [ ] Has Alternatives Considered section (with rejection reasons)

---

## STATUS.md Quality

Rolling Window Principles:

- [ ] Last Updated date is recent (within 1 week for active projects)
- [ ] Quick Overview table present
- [ ] Current Focus section at top
- [ ] Deployment Status section
- [ ] Known Issues section
- [ ] Recent Achievements (last 2 weeks only)
- [ ] Next Steps (prioritized)
- [ ] NO items older than 2-4 weeks

### Content Freshness

- [ ] Known Issues are actually current (not resolved 3 months ago)
- [ ] Recent Achievements are actually recent (not from 6 months ago)
- [ ] Deployment Status reflects current state

---

## PROGRESS.md Quality

- [ ] Project Overview with summary and current phase
- [ ] Progress Metrics table (epics complete, features complete)
- [ ] Key Targets with checkboxes
- [ ] Epic sections with features nested inside
- [ ] Each feature has Status, Owner, Acceptance Criteria
- [ ] Immediate Tasks section for ad-hoc work
- [ ] Blocked Items section (if any)
- [ ] Progress Changelog with dated entries
- [ ] Status indicators legend present

### Structure Quality

- [ ] Clear hierarchy: Epic → Feature → Task
- [ ] Acceptance criteria are specific and testable
- [ ] Each item has unique ID (e.g., feature_1_1, task_001)
- [ ] Dependencies documented where relevant

---

## ISSUES.md Quality

- [ ] Status Guide table present (Open, In Progress, Resolved, Blocked)
- [ ] Priority Guide table present (P0-P3)
- [ ] Active Issues section with Bugs, Improvements, Technical Debt
- [ ] Each issue has unique ID (e.g., bug_001, issue_001, debt_001)
- [ ] Resolved Issues section (last 2 weeks only)
- [ ] Archived Issues section exists

### Issue Format Quality

For each issue:
- [ ] Has Status indicator
- [ ] Has Priority level
- [ ] Has Component reference
- [ ] Has Description
- [ ] Has Acceptance Criteria (for improvements/debt)
- [ ] Has Notes section

### Integration with STATUS.md

- [ ] STATUS.md Known Issues section links to ISSUES.md
- [ ] No duplicate issue details between STATUS.md and ISSUES.md
- [ ] STATUS.md shows summary counts, ISSUES.md has full details

---

## CONTRIBUTING.md Quality

- [ ] Getting Started / Local Development section
- [ ] Definition of Done section
- [ ] Progress Tracking workflow
- [ ] Working on Features/Tasks section with examples
- [ ] Git Workflow quick reference
- [ ] Best Practices section
- [ ] Example Workflow section

---

## DEVELOPMENT.md Quality

- [ ] Git Branching Strategy section with diagram
- [ ] Pre-Commit Checklist (CRITICAL) section
- [ ] CI/CD Workflow Expectations section
- [ ] Test Organization section
- [ ] Local Development Setup section
- [ ] Troubleshooting section

### Pre-Commit Checklist

- [ ] Checklist is actionable (has exact commands)
- [ ] Includes linting
- [ ] Includes formatting
- [ ] Includes tests
- [ ] Includes git diff review

---

## CHANGELOG.md Quality

- [ ] Follows Keep a Changelog format
- [ ] Has [Unreleased] section at top
- [ ] Version sections in reverse chronological order
- [ ] Each version has date
- [ ] Uses standard categories (Added, Changed, Deprecated, Removed, Fixed, Security)
- [ ] Links to GitHub releases/comparisons at bottom

---

## Cross-Reference Integrity

Documents should reference each other appropriately:

### CLAUDE.md References
- [ ] Links to STATUS.md
- [ ] Links to PROGRESS.md
- [ ] Links to ISSUES.md
- [ ] Links to ARCHITECTURE.md
- [ ] Links to CONTRIBUTING.md
- [ ] Links to DEVELOPMENT.md

### README.md References
- [ ] Links to ARCHITECTURE.md
- [ ] Links to STATUS.md
- [ ] Links to CONTRIBUTING.md
- [ ] Links to DEVELOPMENT.md

### CONTRIBUTING.md References
- [ ] Links to DEVELOPMENT.md (for git workflow details)
- [ ] Links to ARCHITECTURE.md (for technical specs)
- [ ] Links to PROGRESS.md (for task tracking)

### STATUS.md References
- [ ] Links to PROGRESS.md (for detailed tracking)
- [ ] Links to ISSUES.md (for issue details)
- [ ] Links to ARCHITECTURE.md (if mentioning architecture changes)
- [ ] Links to CONTRIBUTING.md (for workflow)
- [ ] Links to DEVELOPMENT.md (for testing)

### PROGRESS.md References
- [ ] Links to STATUS.md (for current snapshot)
- [ ] Links to ISSUES.md (for bug tracking)
- [ ] Links to ARCHITECTURE.md (for technical decisions)

### ISSUES.md References
- [ ] Links to PROGRESS.md (for project tracking)
- [ ] Links to STATUS.md (for current work)

---

## No Content Duplication

Check for duplicate content across documents:

- [ ] Git workflow appears ONLY in DEVELOPMENT.md (not duplicated in CONTRIBUTING.md)
- [ ] Architecture details appear ONLY in ARCHITECTURE.md (not duplicated in CLAUDE.md or README.md)
- [ ] Issue details appear ONLY in ISSUES.md (STATUS.md has summary only)
- [ ] Project tracking appears ONLY in PROGRESS.md (STATUS.md has snapshot only)
- [ ] Pre-commit checklist appears ONLY in DEVELOPMENT.md
- [ ] Definition of Done appears ONLY in CONTRIBUTING.md

---

## Optional Documents (If Applicable)

If project has these characteristics, check for these docs:

### For Projects with Deployments
- [ ] specs/ENVIRONMENTS.md (environment configuration)
- [ ] specs/RUNBOOK.md (operations procedures)

### For Projects with Complex Domains
- [ ] specs/FINANCIAL_MODEL.md (or equivalent domain-specific docs)
- [ ] specs/GOVERNANCE.md (access control policies)

### For Projects with Secrets
- [ ] specs/SECRETS_MANAGEMENT.md (credential handling)

---

## Quality Scoring

**Pass Criteria:** ✅ 90% or more items checked

**Grade:**
- A (95-100%): Excellent documentation
- B (85-94%): Good documentation, minor improvements needed
- C (75-84%): Adequate documentation, several improvements needed
- D (65-74%): Poor documentation, major improvements needed
- F (<65%): Documentation requires significant work

---

## Common Issues Found

After running audit, common issues include:

1. **CLAUDE.md too long** (500+ lines)
   - Solution: Extract content to appropriate documents

2. **STATUS.md contains historical content** (6+ months old)
   - Solution: Archive old items, keep 2-week rolling window

3. **Missing ADRs** in ARCHITECTURE.md
   - Solution: Retroactively document major architectural decisions

4. **Duplicate content** across multiple documents
   - Solution: Establish single source of truth, cross-reference from others

5. **Broken links** to GitHub or other docs
   - Solution: Update all links to current URLs

6. **No metadata headers**
   - Solution: Add Purpose + Lifecycle to all documents

7. **CHANGELOG not following Keep a Changelog format**
   - Solution: Restructure using standard categories

See `common-fixes.md` for detailed solutions.
