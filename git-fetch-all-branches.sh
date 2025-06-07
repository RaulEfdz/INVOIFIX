#!/bin/bash

# Fetch all remote branches
git fetch --all

# Get list of remote branches excluding HEAD and master/main
remote_branches=$(git branch -r | grep -vE 'HEAD|master|main' | sed 's/origin\///')

# For each remote branch, create local branch tracking remote if it doesn't exist
for branch in $remote_branches; do
  if ! git show-ref --verify --quiet refs/heads/"$branch"; then
    echo "Creating local branch '$branch' tracking origin/$branch"
    git branch --track "$branch" origin/"$branch"
  else
    echo "Local branch '$branch' already exists"
  fi
done
