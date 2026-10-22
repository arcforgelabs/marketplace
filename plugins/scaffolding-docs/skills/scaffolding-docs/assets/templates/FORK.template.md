# {{PROJECT_NAME}} Fork - Custom Patches

**⚠️ This document is ONLY needed for forked projects**
**If this is not a fork, delete this file**

**Purpose**: Fork management hub
**Lifecycle**: Living (updated on patch changes and monthly syncs)
**Last Updated**: {{DATE}}
**Project Type**: Fork of {{UPSTREAM_REPO}}

---

**Upstream**: {{UPSTREAM_REPO_URL}}
**Fork Purpose**: {{FORK_PURPOSE}}
**Last Sync**: {{DATE}} (commit {{UPSTREAM_COMMIT}})
**Maintainer**: {{MAINTAINER}}

---

## Active Patches

### Patch 1: {{PATCH_NAME}}

**Branch**: `{{PATCH_BRANCH}}`
**Commit**: `{{PATCH_COMMIT}}`
**Status**: 🟢 Active / 🟡 Testing / 🔴 Deprecated
**Created**: {{DATE}}

**Problem**: {{PROBLEM_DESCRIPTION}}

**Solution**: {{SOLUTION_DESCRIPTION}}

**Files Modified**:
- {{FILE_PATH}} (lines {{LINE_RANGE}})

**Upstream Issues**:
- [#{{ISSUE_NUMBER}}]({{ISSUE_URL}}): {{ISSUE_TITLE}}

**Revert Conditions**:
- {{CONDITION_1}}
- {{CONDITION_2}}

**Testing**: See `docs/fork/TESTING.md`

---

## Sync Strategy

### Weekly Checks
- [ ] Check upstream issues for fixes
- [ ] Monitor release notes for {{UPSTREAM_REPO}}

### Monthly Maintenance
- [ ] Rebase patches on `origin/main`
- [ ] Run full test suite (see docs/fork/TESTING.md)
- [ ] Update `Last Sync` date in this file
- [ ] Document conflicts in `docs/fork/SYNC.md`

### When to Revert Patches
1. Upstream issue marked as resolved
2. Test with upstream main (without patch) succeeds
3. Verify fix works with all tested configurations
4. Document removal in `docs/fork/SYNC.md`

---

## Installation

### Method 1: Manual File Copy (Current)

```bash
# Copy patched file to installation location
cp {{SOURCE_FILE}} {{DEST_FILE}}
```

### Method 2: Editable Install (Future)

```bash
cd {{FORK_PATH}}
git checkout {{PATCH_BRANCH}}
pip install -e .  # Python projects
# or
npm install       # Node.js projects
```

---

## Testing

Quick verification:
```bash
{{QUICK_TEST_COMMAND}}
```

**Expected output**:
```
{{EXPECTED_OUTPUT}}
```

**Success indicators**:
- ✅ {{SUCCESS_CRITERION_1}}
- ✅ {{SUCCESS_CRITERION_2}}

Full test suite: See `docs/fork/TESTING.md`

---

## Cross-References

**Used By**:
- {{DOWNSTREAM_PROJECT}}: `{{DOWNSTREAM_PATH}}` ({{DOWNSTREAM_ISSUE_REF}})

**Documentation**:
- {{DOWNSTREAM_PROJECT}} ISSUES.md: {{ISSUE_ID}} (resolution details)
- {{DOWNSTREAM_PROJECT}} PROGRESS.md: {{FEATURE_ID}} (implementation tracking)

---

## Patch History

| Date | Patch | Action | Notes |
|------|-------|--------|-------|
| {{DATE}} | {{PATCH_NAME}} | Created | {{NOTES}} |

---

## Notes

- **Performance Impact**: {{PERFORMANCE_NOTES}}
- **Temporary Workaround**: {{IS_TEMPORARY}}
- **Monitor Upstream**: {{MONITORING_SCHEDULE}}
- **Reapply on Reinstall**: {{REINSTALL_NOTES}}
