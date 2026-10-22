# {{PROJECT_NAME}} Fork - Testing Procedures

**⚠️ This document is ONLY needed for forked projects**

**Purpose**: Test procedures for fork patches
**Lifecycle**: Stable (updated when tests change)
**Last Updated**: {{DATE}}

---

## Quick Verification Test

**Purpose**: Verify patch is installed and working
**Time**: ~{{DURATION}} minutes
**Run**: After installing patch or syncing upstream

```bash
# 1. {{SETUP_STEP_1}}
{{SETUP_COMMAND_1}}

# 2. {{SETUP_STEP_2}}
{{SETUP_COMMAND_2}}

# 3. Run quick test
{{QUICK_TEST_COMMAND}}
```

**Expected Output**:
```
{{EXPECTED_OUTPUT}}
```

**Success Criteria**:
- ✅ {{SUCCESS_CRITERION_1}}
- ✅ {{SUCCESS_CRITERION_2}}
- ✅ {{SUCCESS_CRITERION_3}}

**Failure Indicators**:
- ❌ {{FAILURE_INDICATOR_1}}
- ❌ {{FAILURE_INDICATOR_2}}
- ❌ {{FAILURE_INDICATOR_3}}

**Troubleshooting**:
- If {{FAILURE_INDICATOR_1}}: {{TROUBLESHOOTING_STEP_1}}
- If {{FAILURE_INDICATOR_2}}: {{TROUBLESHOOTING_STEP_2}}

---

## Full Test Suite

**Purpose**: Comprehensive testing before deploying patches
**Time**: ~{{DURATION}} minutes
**Run**: After rebasing patches or before marking task complete

### Test 1: {{TEST_NAME_1}}

**Purpose**: {{TEST_PURPOSE_1}}

```bash
{{TEST_COMMANDS_1}}
```

**Expected**:
- {{EXPECTED_RESULT_1A}}
- {{EXPECTED_RESULT_1B}}

**Pass Criteria**: {{PASS_CRITERIA_1}}

---

### Test 2: {{TEST_NAME_2}}

**Purpose**: {{TEST_PURPOSE_2}}

```bash
{{TEST_COMMANDS_2}}
```

**Expected**:
- {{EXPECTED_RESULT_2A}}
- {{EXPECTED_RESULT_2B}}

**Pass Criteria**: {{PASS_CRITERIA_2}}

---

### Test 3: {{TEST_NAME_3}} (Regression Test)

**Purpose**: Verify patch doesn't break existing functionality

```bash
{{TEST_COMMANDS_3}}
```

**Expected**: {{EXPECTED_RESULT_3}}

**Pass Criteria**: All existing tests pass

---

### Test 4: Integration Test

**Purpose**: Verify patch works in downstream projects

```bash
# Test in {{DOWNSTREAM_PROJECT}}
cd {{DOWNSTREAM_PATH}}
{{INTEGRATION_TEST_COMMANDS}}
```

**Expected**: {{INTEGRATION_EXPECTED_RESULT}}

---

## Performance Benchmark (Optional)

**Purpose**: Compare patched vs unpatched performance
**Note**: Requires testing without patch (may fail if patch fixes critical bug)

```bash
{{BENCHMARK_SETUP}}

# Benchmark with patch
{{BENCHMARK_COMMAND}}

# Expected metrics
{{EXPECTED_METRICS}}
```

**Baseline** (to establish):
- **Patched Performance**: ___ {{METRIC_UNIT}}
- **Unpatched Performance**: ___ {{METRIC_UNIT}} (when upstream fixes issue)
- **Acceptable Overhead**: < {{THRESHOLD}}%

---

## Regression Test: Verify Patch Still Needed

**Purpose**: Check if upstream has fixed the issue
**Run**: Monthly or when upstream releases new version

```bash
# 1. Test with upstream main (without patch)
cd {{FORK_PATH}}
git checkout main
git pull origin main

# 2. Temporarily install unpatched version
{{INSTALL_UPSTREAM_COMMAND}}

# 3. Run test (expect failure if bug still exists)
timeout {{TIMEOUT_SECONDS}} {{TEST_COMMAND}}

# 4. Interpret results
# - Fails/times out: Patch still needed
# - Succeeds: Upstream fixed! Remove patch
```

**If Upstream Fixed**:
1. Document in docs/fork/SYNC.md
2. Update FORK.md (move to patch history)
3. Update {{DOWNSTREAM_PROJECT}} ISSUES.md
4. Reinstall from upstream
5. Delete patch branch (optional)

---

## Test Results Log

### {{DATE}} - {{TEST_RUN_DESCRIPTION}}

**Test Environment**:
- OS: {{OS}}
- {{LANGUAGE}} Version: {{VERSION}}
- Hardware: {{HARDWARE}}

**Results**:
- {{TEST_NAME_1}}: {{RESULT_1}}
- {{TEST_NAME_2}}: {{RESULT_2}}
- {{TEST_NAME_3}}: {{RESULT_3}}

**Performance**:
- {{METRIC_1}}: {{VALUE_1}} {{UNIT}}
- {{METRIC_2}}: {{VALUE_2}} {{UNIT}}

**Notes**: {{TEST_NOTES}}

---

## Automated Testing (Optional)

**CI/CD Integration**:

```yaml
# .github/workflows/test-patches.yml
name: Test Fork Patches

on:
  push:
    branches: [ {{PATCH_BRANCH}} ]
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday

jobs:
  test:
    runs-on: {{OS}}
    steps:
      - uses: actions/checkout@v4
      - name: Run quick test
        run: {{QUICK_TEST_COMMAND}}
      - name: Run full test suite
        run: {{FULL_TEST_COMMAND}}
```

---

## Notes

- Always test patches before deploying to production
- Document all test results with timestamps
- If any test fails, do NOT deploy patch
- Performance benchmarks help decide when to remove patches
- Regression tests prevent unnecessary patch maintenance
