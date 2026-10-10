---
title: "A Beginner's Debugging Checklist"
description: "A short, repeatable routine for finding bugs: reproduce, read the error, narrow it down, change one thing at a time."
pubDate: 2026-10-05
language: en
translationKey: "beginners-debugging-checklist"
category: learning-notes
tags:
  - Debugging
  - Programming
  - Beginners
draft: false
featured: false
example: true
---

> **Sample article (English only).** This post exists to show that a piece of content can be published in a single language. The language switcher will not offer an Arabic version of it, because none exists.

## 1. Reproduce it reliably

If you cannot make the bug happen on demand, you cannot know whether you fixed it. Write down the exact steps and the exact input.

## 2. Read the error message — slowly

Most error messages tell you the file, the line and the kind of problem. Read the **first** error, not the last; later ones are often consequences of the first.

## 3. Shrink the problem

Remove code until the bug disappears, then put the last piece back. A ten-line example is far easier to reason about than a ten-thousand-line project.

## 4. Look at the real values

Do not assume what a variable contains — print it, or step through with a debugger.

```c
printf("index=%d length=%d\n", index, length);
```

## 5. Change one thing at a time

Two changes at once means you will not know which one mattered.

## 6. Explain it out loud

Describing the problem to a friend, or to a rubber duck, often exposes the wrong assumption before they say a word.

## 7. Write down what you learned

A line in a notes file ("off-by-one in the loop bound") turns today's bug into tomorrow's instinct.
