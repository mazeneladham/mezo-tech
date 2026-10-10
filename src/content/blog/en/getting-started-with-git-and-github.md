---
title: "Getting Started with Git and GitHub"
description: "The handful of Git commands you need to track a project, save your work in small steps, and publish it to GitHub."
pubDate: 2026-10-07
language: en
translationKey: "getting-started-with-git-and-github"
category: software-engineering
tags:
  - Git
  - GitHub
  - Version Control
  - Beginners
draft: false
featured: false
example: true
---

> **Sample article.** Included with the template to demonstrate the authoring system. It is general technical content, not a personal story. Replace or delete it when you publish your own writing.

## Why version control

Git records the history of your project as a series of snapshots called **commits**. You can experiment freely, compare versions, undo mistakes and work with other people without overwriting each other's changes. GitHub is a website that hosts Git repositories so your work is backed up and shareable.

## One-time setup

Tell Git who you are. This information is attached to every commit.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Your first repository

```bash
mkdir my-project
cd my-project
git init -b main
```

Create a file, then check what Git sees:

```bash
echo "# My project" > README.md
git status
```

## The core loop: stage, commit

A commit is a two-step process. First **stage** the changes you want, then **commit** them with a message.

```bash
git add README.md
git commit -m "Add README"
```

Write messages that say *what changed and why* in a short sentence. Small, frequent commits are easier to understand and to undo than one giant one. Use `git log --oneline` to see your history.

## Ignoring files

Some files should never be committed: dependencies, build output, secrets. List them in a `.gitignore` file.

```text
node_modules/
dist/
.env
```

## Publishing to GitHub

1. Create an empty repository on GitHub (no README, so the histories do not conflict).
2. Connect your local project to it and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/my-project.git
git push -u origin main
```

After the first push, `git push` alone is enough. To copy an existing repository to your machine, use `git clone <url>`.

## Branches in one paragraph

A branch is a separate line of work. Create one for each feature or experiment, switch to it, commit as usual, and merge it back when you are happy.

```bash
git switch -c add-contact-page
# ...edit, add, commit...
git switch main
git merge add-contact-page
```

## Habits worth building

- Run `git status` often.
- Commit small and often.
- Never commit passwords or API keys. If you do, treat them as leaked and replace them.
- Pull before you push when more than one person (or computer) is involved.
