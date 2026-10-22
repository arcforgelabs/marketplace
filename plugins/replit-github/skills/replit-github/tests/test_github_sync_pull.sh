#!/usr/bin/env bash
# Exercises github-sync.sh pull against a local bare repo posing as GitHub.
set -uo pipefail
SCRIPT="${1:-$(cd "$(dirname "$0")/.." && pwd)/assets/github-sync.sh}"; T="$(mktemp -d)"; pass=0; fail=0
O="$T/github.com/x/y.git"; export GITHUB_REPO="$T/github.com/x/y" GITHUB_TOKEN=dummy GITHUB_DEFAULT_BRANCH=main GIT_AUTHOR_NAME=t GIT_AUTHOR_EMAIL=t@t GIT_COMMITTER_NAME=t GIT_COMMITTER_EMAIL=t@t
setup() {
  rm -rf "$T"/*; mkdir -p "$T/github.com/x"; git init -q --bare -b main "$O"
  git clone -q "$O" "$T/seed" 2>/dev/null; mkdir -p "$T/seed/scripts"
  cp "$SCRIPT" "$T/seed/scripts/github-sync.sh"; printf '#!/bin/sh\n' > "$T/seed/scripts/git-credential-github.sh"; chmod +x "$T/seed/scripts/"*
  echo v1 > "$T/seed/app.txt"; git -C "$T/seed" add -A; git -C "$T/seed" commit -qm init; git -C "$T/seed" push -q origin main
  git clone -q "$O" "$T/ws"
}
advance_origin() { echo "$1" > "$T/seed/app.txt"; git -C "$T/seed" commit -qam "upstream $1"; git -C "$T/seed" push -q origin main; }
pull() { (cd "$T/ws" && bash scripts/github-sync.sh pull) > "$T/out" 2>&1; }
check() { if eval "$2"; then pass=$((pass+1)); echo "ok   $1"; else fail=$((fail+1)); echo "FAIL $1"; sed 's/^/     /' "$T/out"; fi; }
at_origin() { [ "$(git -C "$T/ws" rev-parse HEAD)" = "$(git -C "$O" rev-parse main)" ]; }

setup; advance_origin v2; pull
check "no local commits: plain fast-forward" 'at_origin'

setup; git -C "$T/ws" commit -q --allow-empty -m "Published your App"; git -C "$T/ws" commit -q --allow-empty -m "Published your App"; advance_origin v2; pull
check "empty publish commits + upstream moved: dropped, fast-forwarded" 'at_origin && grep -q "dropping local-only" "$T/out"'

setup; git -C "$T/ws" commit -q --allow-empty -m "Published your App"; pull
check "empty publish commit, upstream unchanged: dropped" 'at_origin'

setup; echo extra >> "$T/ws/app.txt"; git -C "$T/ws" commit -qam "agent config"; git -C "$T/ws" revert --no-edit HEAD >/dev/null; git -C "$T/ws" commit -q --allow-empty -m "Published your App"; advance_origin v2; pull
check "commit + revert + publish commit: dropped" 'at_origin'

setup; echo real > "$T/ws/new.txt"; git -C "$T/ws" add new.txt; git -C "$T/ws" commit -qm "real work"; before=$(git -C "$T/ws" rev-parse HEAD); advance_origin v2; pull; rc=$?
check "real local change: refuses, HEAD untouched" '[ $rc -ne 0 ] && [ "$(git -C "$T/ws" rev-parse HEAD)" = "$before" ] && grep -q "change files" "$T/out"'

echo "pass=$pass fail=$fail"; rm -rf "$T"; [ $fail -eq 0 ]
