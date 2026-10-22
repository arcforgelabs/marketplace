#!/usr/bin/env bash
# List open pull requests that already claim an issue (Closes/Fixes/Resolves
# #N in the body, or the issue's link), so a coordinator does not start a
# second agent on it. Uses the GitHub REST API through a signed-in `gh`.
# Usage: claim-check.sh <owner/repo> <issue-number>
# Prints one line per claiming pull request; prints nothing when free.
set -euo pipefail
repo="${1:?owner/repo}"
issue="${2:?issue number}"
gh api --paginate "repos/${repo}/pulls?state=open&per_page=100" \
  --jq ".[] | select((.body // \"\") | test(\"(?i)(close[sd]?|fix(e[sd])?|resolve[sd]?)\\\\s+#${issue}\\\\b|/issues/${issue}\\\\b\")) | \"#\\(.number) \\(if .draft then \"draft\" else \"ready\" end) \\(.head.ref) \\(.html_url)\""
