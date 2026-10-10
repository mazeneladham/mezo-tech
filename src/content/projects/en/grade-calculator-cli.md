---
title: "Grade Calculator CLI"
description: "A small command-line program in C that reads marks, computes the average and prints a grade summary. Example project for the template."
language: en
translationKey: "grade-calculator-cli"
category: programming
technologies:
  - C
  - CLI
status: in-progress
featured: true
order: 1
startDate: 2026-09-01
github:
demo:
relatedPosts:
  - understanding-pointers-in-c
relatedProjects:
  - mezo-tech-portfolio-template
draft: false
example: true
---

> **Example project.** This entry demonstrates the project format. It is not a record of finished work by the site owner — replace it with your own project, or delete it.

## The problem

Calculating averages and letter grades by hand is repetitive and easy to get wrong. A tiny program is a good excuse to practise input handling, arrays and functions.

## Goals

- Read a list of marks from standard input.
- Validate every value (0–100).
- Print the average, highest and lowest mark, and a letter grade.

## How it works

The program reads numbers into an array, passes the array and its length to helper functions, and prints a formatted report. Pointers are used to return more than one result from a single function call.

## Implementation notes

- `scanf` return values are checked so bad input does not silently become garbage.
- Helper functions keep `main` short and each calculation easy to test on its own.
- The grade boundaries are defined as constants so they are simple to change.

## Challenges

Handling invalid input without crashing, and keeping the code readable as features were added.

## Lessons learned

Validating input early removes whole categories of bugs, and small functions with clear names are easier to debug than one long block of code.

## Future improvements

- Read marks from a file.
- Add unit tests for the calculation functions.
- Support weighted marks.
