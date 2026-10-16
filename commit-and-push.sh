
#!/usr/bin/env bash
set -euo pipefail

# CA3 project: commit genuine changes and push to GitHub.

# Confirm we are in a Git repository.
git rev-parse --is-inside-work-tree >/dev/null

# Confirm a remote is configured.
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Error: No 'origin' remote configured."
  echo "Configure your GitHub remote before continuing."
  exit 1
fi

echo "Current branch: $(git branch --show-current)"
echo
git status --short

echo
echo "Review and stage ONLY the genuine changes you want to commit."
echo "Example: git add app/ lib/ README.md"
echo "Then run this script again."

if ! git diff --cached --quiet; then
  echo
  echo "Staged changes found."
  read -r -p "Enter a meaningful commit message: " message

  if [[ -z "$message" ]]; then
    echo "Commit message cannot be empty."
    exit 1
  fi

  git commit -m "$message"
  git push -u origin "$(git branch --show-current)"
else
  echo
  echo "No staged changes found. Nothing committed or pushed."
fi
