# {{PROJECT_NAME}} Fork - Upstream Sync Log

**⚠️ This document is ONLY needed for forked projects**

**Purpose**: Upstream sync history and conflict resolution
**Lifecycle**: Historical (append-only log)
**Last Updated**: {{DATE}}

---

## Sync History

### {{DATE}} - Initial Fork

**Action**: Cloned upstream {{UPSTREAM_REPO}}
**Commit**: `{{COMMIT}}` - "{{COMMIT_MESSAGE}}"
**Branch**: `main`

**Changes**:
- Cloned from {{UPSTREAM_REPO_URL}}
- Created branch `{{PATCH_BRANCH}}`
- Applied initial patches
- Committed as `{{PATCH_COMMIT}}`

**Conflicts**: None (new fork)

**Testing**:
- ✅ {{TEST_RESULT_1}}
- ✅ {{TEST_RESULT_2}}

---

## Sync Strategy

### Weekly Tasks
- [ ] Check upstream issues for resolution: {{ISSUE_REFS}}
- [ ] Monitor release notes for {{UPSTREAM_REPO}}
- [ ] Check if patches still needed

### Monthly Tasks
- [ ] Fetch latest from `origin/main`
- [ ] Rebase patch branches on updated main
- [ ] Run full test suite after rebase
- [ ] Document any conflicts in this file
- [ ] Update `Last Sync` date in FORK.md

### When Upstream Fixes Issue

1. **Verify Fix**:
   ```bash
   git checkout main
   git pull origin main
   # Test without patch - should work now
   {{VERIFICATION_COMMANDS}}
   ```

2. **If Fix Confirmed**:
   - Update FORK.md (move patch to history)
   - Add entry to this file with resolution details
   - Update {{DOWNSTREAM_PROJECT}} ISSUES.md (mark as "Resolved by upstream v{{VERSION}}")
   - Reinstall from upstream (no patch needed)
   - Delete patch branch (optional): `git branch -d {{PATCH_BRANCH}}`

---

## Conflict Resolution Log

None yet.

**Template for future conflicts**:

### {{DATE}} - Conflict During Rebase

**Context**: Rebasing `{{PATCH_BRANCH}}` on `{{BASE_COMMIT}}`

**Conflicting Files**:
- {{FILE_1}}: {{CONFLICT_DESCRIPTION_1}}
- {{FILE_2}}: {{CONFLICT_DESCRIPTION_2}}

**Resolution**:
```bash
{{RESOLUTION_COMMANDS}}
```

**Explanation**: {{RESOLUTION_EXPLANATION}}

**Testing After Resolution**:
- ✅ {{TEST_RESULT_1}}
- ✅ {{TEST_RESULT_2}}

---

## Upstream Monitoring

### Issues to Watch

| Issue | Title | Check Weekly | Last Checked |
|-------|-------|--------------|--------------|
| [#{{N}}]({{URL}}) | {{TITLE}} | ✅ Priority | {{DATE}} |

### Release Notes to Monitor

- **{{RELEASE_SERIES}}**: {{FEATURE_AREA}} improvements
- **{{COMPONENT}}**: Stability fixes

### Monitoring Schedule

**Weekly** (every Monday):
- Check upstream issue status
- Review new releases
- Scan for relevant pull requests

**Monthly** (first of month):
- Sync with upstream main
- Rebase all patch branches
- Run full test suite
- Update this log

---

## Notes

- Keep main branch clean (no local commits)
- Always rebase patches (never merge) to maintain clean history
- Test patches after each rebase to ensure they still work
- Document all conflicts and resolutions in this file
- Consider submitting patches upstream if they solve general problems
