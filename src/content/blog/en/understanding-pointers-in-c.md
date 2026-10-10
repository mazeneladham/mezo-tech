---
title: "Understanding Pointers in C"
description: "A practical introduction to pointers and memory: what they are, how to use them, and the mistakes that trip up most beginners."
pubDate: 2026-10-09
updatedDate:
language: en
translationKey: "understanding-pointers-in-c"
category: programming
tags:
  - C
  - Programming
  - Memory
cover:
draft: false
featured: true
example: true
---

> **Sample article.** This post ships with the template to demonstrate the authoring system. It is general technical content, not a record of my personal experience. Replace or delete it when you publish your own writing.

## What a pointer is

A pointer is a variable that stores a **memory address** instead of an ordinary value. Every variable lives somewhere in memory; a pointer lets you hold that location and work with the data stored there.

```c
#include <stdio.h>

int main(void) {
    int score = 42;
    int *p = &score;   // p holds the address of score

    printf("value of score  : %d\n", score);
    printf("address of score: %p\n", (void *)&score);
    printf("value of p      : %p\n", (void *)p);
    printf("value at *p     : %d\n", *p);

    *p = 100;          // change score through the pointer
    printf("score is now    : %d\n", score);
    return 0;
}
```

Run it and you will see that `p` and `&score` print the same address, and that writing through `*p` changes `score`.

## The three symbols to remember

- `int *p` declares `p` as a pointer to an `int`.
- `&x` is the **address-of** operator: it gives you the address of `x`.
- `*p` is the **dereference** operator: it gives you the value stored at the address in `p`.

The `*` appears in two roles. In a declaration it means "pointer to"; in an expression it means "the thing this points at".

## Why pointers matter: changing a caller's variable

C passes arguments **by value**, so a function normally receives a copy. To let a function modify the original, pass its address.

```c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 1, y = 2;
    swap(&x, &y);      // x is now 2, y is now 1
    return 0;
}
```

## Pointers and arrays

An array name usually *decays* to a pointer to its first element, and `a[i]` is defined as `*(a + i)`. Pointer arithmetic is scaled by the size of the element type, so `p + 1` moves to the next `int`, not the next byte.

```c
int nums[] = {10, 20, 30};
int *p = nums;

printf("%d\n", *(p + 2));   // 30
printf("%d\n", p[2]);       // 30 — same thing
```

## Common mistakes

1. **Uninitialised pointers.** A pointer you never set points at garbage. Initialise it to a valid address or to `NULL`.
2. **Dereferencing `NULL`.** Check a pointer before you use it if it might be `NULL`.
3. **Dangling pointers.** Returning the address of a local variable, or using memory after `free`, leaves you with a pointer to something that no longer exists.
4. **Going out of bounds.** Reading or writing past the end of an array is undefined behaviour.
5. **Leaking memory.** Every successful `malloc` needs a matching `free`.

## Practice ideas

- Write `strlen` yourself using a pointer that walks until `'\0'`.
- Reverse an array in place with two pointers, one from each end.
- Print the addresses of consecutive array elements and check the spacing equals `sizeof(int)`.

Pointers feel strange at first because they make memory visible. Draw boxes and arrows on paper while you practise — it helps more than it sounds.
