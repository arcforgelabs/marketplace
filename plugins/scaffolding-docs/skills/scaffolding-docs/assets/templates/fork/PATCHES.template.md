# {{PROJECT_NAME}} Fork - Patch Details

**⚠️ This document is ONLY needed for forked projects**

**Purpose**: Detailed patch descriptions with code diffs
**Lifecycle**: Living (updated when patches change)
**Last Updated**: {{DATE}}

---

## Active Patches

### Patch: {{PATCH_NAME}}

**Branch**: `{{PATCH_BRANCH}}`
**Commit**: `{{PATCH_COMMIT}}`
**Created**: {{DATE}}
**Status**: 🟢 Active

#### Problem

{{DETAILED_PROBLEM_DESCRIPTION}}

**Symptoms**:
1. {{SYMPTOM_1}}
2. {{SYMPTOM_2}}
3. {{SYMPTOM_3}}

**Root Cause**: {{ROOT_CAUSE_EXPLANATION}}

**Affected Versions**: {{VERSION_RANGE}}

#### Solution

{{DETAILED_SOLUTION_DESCRIPTION}}

**Approach**: {{APPROACH_EXPLANATION}}

#### Code Changes

**File**: `{{FILE_PATH}}`
**Lines**: {{LINE_RANGE}}

**Original Code**:
```{{LANGUAGE}}
{{ORIGINAL_CODE}}
```

**Patched Code**:
```{{LANGUAGE}}
{{PATCHED_CODE}}
```

**Explanation**: {{CODE_CHANGE_EXPLANATION}}

#### Testing

**Quick Test**:
```bash
{{QUICK_TEST_COMMANDS}}
```

**Expected**: {{EXPECTED_RESULT}}

**Verified Configurations**:
- ✅ {{CONFIG_1}}
- ✅ {{CONFIG_2}}
- 🟡 {{CONFIG_3}} (not yet tested)

#### Upstream Issues

| Issue | Title | Status | Notes |
|-------|-------|--------|-------|
| [#{{N}}]({{URL}}) | {{TITLE}} | {{STATUS}} | {{NOTES}} |

**Tracking**: Check these issues weekly for upstream resolution

#### Requirements

**System Requirements**:
- {{SYSTEM_REQ_1}}
- {{SYSTEM_REQ_2}}

**Build Requirements**:
- {{BUILD_REQ_1}}
- {{BUILD_REQ_2}}

#### Limitations

1. **{{LIMITATION_1_TITLE}}**: {{LIMITATION_1_DESCRIPTION}}
2. **{{LIMITATION_2_TITLE}}**: {{LIMITATION_2_DESCRIPTION}}

#### Revert Conditions

Remove this patch when:
1. {{REVERT_CONDITION_1}}
2. {{REVERT_CONDITION_2}}
3. {{REVERT_CONDITION_3}}

**Verification Steps**:
```bash
{{REVERT_VERIFICATION_COMMANDS}}
```

---

## Patch History

### Removed Patches

None yet.

---

## Notes

- All patches should be temporary workarounds, not permanent divergence
- Document upstream issue links for weekly monitoring
- Test patches with multiple configurations before considering stable
- Benchmark performance impact when possible
