---
title: "البدء مع Git و GitHub"
description: "الأوامر القليلة التي تحتاجها في Git لتتبّع مشروعك، وحفظ عملك على خطوات صغيرة، ونشره على GitHub."
pubDate: 2026-10-07
language: ar
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

> **مقال تجريبي.** مرفق مع القالب لشرح طريقة الكتابة والنشر. هو محتوى تقني عام وليس قصة شخصية. استبدله أو احذفه عند نشر كتاباتك.

## لماذا نستخدم التحكم في الإصدارات؟

يسجّل Git تاريخ مشروعك على شكل لقطات متتالية تُسمّى **الالتزامات** (commits). يمكنك التجريب بحرّية، ومقارنة الإصدارات، والتراجع عن الأخطاء، والعمل مع آخرين دون أن يمحو أحدكم تعديلات الآخر. أما GitHub فهو موقع يستضيف مستودعات Git لتبقى أعمالك محفوظة وقابلة للمشاركة.

## إعداد يتم مرة واحدة

عرّف Git باسمك. تُرفق هذه المعلومات بكل التزام.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## مستودعك الأول

```bash
mkdir my-project
cd my-project
git init -b main
```

أنشئ ملفًا ثم اعرف ما يراه Git:

```bash
echo "# My project" > README.md
git status
```

## الحلقة الأساسية: التجهيز ثم الالتزام

الالتزام عملية من خطوتين: **جهّز** التغييرات التي تريدها أولًا، ثم **التزم** بها مع رسالة.

```bash
git add README.md
git commit -m "Add README"
```

اكتب رسائل تقول بجملة قصيرة *ماذا تغيّر ولماذا*. الالتزامات الصغيرة والمتكرّرة أسهل في الفهم والتراجع من التزام واحد ضخم. استخدم `git log --oneline` لعرض تاريخ المشروع.

## تجاهل الملفات

هناك ملفات لا ينبغي التزامها أبدًا: المكتبات المثبّتة، ونواتج البناء، والأسرار. اذكرها في ملف `.gitignore`.

```text
node_modules/
dist/
.env
```

## النشر على GitHub

1. أنشئ مستودعًا فارغًا على GitHub (بدون ملف README حتى لا يحدث تعارض بين السجلّين).
2. اربط مشروعك المحلي به ثم ادفع التغييرات:

```bash
git remote add origin https://github.com/YOUR-USERNAME/my-project.git
git push -u origin main
```

بعد أول دفع يكفي الأمر `git push` وحده. ولنسخ مستودع موجود إلى جهازك استخدم `git clone <url>`.

## الفروع في فقرة واحدة

الفرع خط عمل مستقل. أنشئ فرعًا لكل ميزة أو تجربة، وانتقل إليه، والتزم كالمعتاد، ثم ادمجه عندما ترضى عن النتيجة.

```bash
git switch -c add-contact-page
# ...edit, add, commit...
git switch main
git merge add-contact-page
```

## عادات تستحق أن تبنيها

- نفّذ `git status` كثيرًا.
- التزم بتغييرات صغيرة وبشكل متكرّر.
- لا تلتزم أبدًا بكلمات المرور أو مفاتيح API. وإن حدث ذلك فاعتبرها مسرّبة واستبدلها.
- نفّذ `git pull` قبل `git push` عندما يشارك أكثر من شخص (أو أكثر من جهاز) في العمل.
