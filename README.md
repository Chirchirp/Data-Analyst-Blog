# Data Insights Blog — Pharaoh Chirchir

> *"Numbers don't lie. But they rarely tell the full story."*

[![Posts](https://img.shields.io/badge/Posts-8-1a1a18?style=flat-square&labelColor=185FA5&color=E6F1FB)](./posts)
[![Stack](https://img.shields.io/badge/Stack-SQL%20·%20Python%20·%20Power%20BI-1a1a18?style=flat-square&labelColor=185FA5&color=E6F1FB)](./posts)
[![Experience](https://img.shields.io/badge/Experience-8%2B%20Years-1a1a18?style=flat-square&labelColor=185FA5&color=E6F1FB)](./posts)

---

## About Me

I'm **Pharaoh Chirchir**, a Senior Data Analyst with over 8 years of experience turning messy, contested data into decisions that people actually trust and act on.

My journey started with a 50,000-row insurance claims sheet, mismatched date formats, and a stubborn refusal to admit I didn't know what I was doing. That humbling first week taught me more about analytical thinking than any course I'd ever taken. Since then I've worked across **insurance, telecoms, retail, and financial services** — building dashboards that drive real decisions, cleaning data pipelines that run reliably in production, and explaining complex findings to audiences ranging from operations teams to C-suite executives.

My toolkit spans SQL, Python, R, Power BI, Tableau, and machine learning — but the tools have always been secondary to the questions. **The right question, asked clearly, is worth more than the most technically sophisticated model built on the wrong one.**

---

## Why I Blog

I blog because I spent years learning things the hard way that nobody had bothered to write down clearly.

There are thousands of tutorials that will teach you how to write a window function or build a dashboard. Far fewer will tell you:

- Why a `JOIN` silently inflated a client's revenue by **340%** and nearly made it into a board presentation
- What it actually feels like to watch a model with **87% accuracy** fail completely in production because nobody thought about what the accuracy metric was actually measuring
- Why the most important thing I've ever learned in this profession has nothing to do with Python

That's what this blog is for — **the craft behind the code.** The judgment calls, the failure stories, the mental models that don't show up in documentation.

I write for analysts who are past the basics and want to go deeper: technically, strategically, and honestly.

Every post is written from direct experience. No filler, no generic advice, no recycled listicles. Just what I've actually learned, in the order I learned it, with enough context to be genuinely useful.

> *If something here saves you the hours I spent figuring it out the hard way — that's exactly why I wrote it.*

---

## Posts

| # | Title | Topics | Date | Read |
|---|-------|--------|------|------|
| 7 | [One Platform to Rule All Your Data — Microsoft Fabric](./posts/blog7.html) | `Microsoft Fabric` `Data Engineering` `OneLake` `Medallion` `Power BI` | Mar 2026 | 10 min |
| 6 | [What AI Can Actually Do to Your Data — and What It Can't](./posts/blog-ai.html) | `AI` `Python` `ML` `Automation` | Feb 2026 | 9 min |
| 5 | [The Art of Data Cleaning: The Most Important Hour You're Probably Skipping](./posts/blog5.html) | `Python` `Pandas` `SQL` `Data Quality` | Jan 2026 | 4 min |
| 4 | [Advanced SQL Techniques for Analysts](./posts/blog6.html) | `SQL` `Window Functions` `Performance` | May 2025 | 8 min |
| 3 | [7 Things I Wish Someone Had Told Me Earlier](./posts/blog3.html) | `Career` `EDA` `Mindset` | Feb 2025 | 7 min |
| 2 | [Reflections on the Future of Data Science](./posts/blog4.html) | `ML` `Trends` `AI` | Dec 2024 | 5 min |
| 1 | [Embracing the Power of Data Visualization](./posts/blog2.html) | `Tableau` `Power BI` `Storytelling` | Oct 2025 | 6 min |
| 0 | [The Journey of a Data Analyst: From Excel to Machine Learning](./posts/blog1.html) | `Excel` `SQL` `ML` `Career` | Jul 2025 | 5 min |

---

## What You'll Find Here

| Topic | What I Cover |
|-------|-------------|
| 🛠 **Career & Craft** | The mindset shifts, hard lessons, and inflection points that compound over time |
| 📊 **Data Visualization** | Practical chart selection, design principles, and real case studies |
| 🗄 **SQL** | Window functions, CTEs, query optimization — techniques that matter on the job |
| 🐍 **Python & Pandas** | EDA workflows, data cleaning pipelines, and automation that holds up in production |
| 🤖 **Machine Learning** | Applied ML for analysts — model utility vs. accuracy, explainability, real use cases |
| ✨ **AI in Analytics** | What AI tooling actually changes, what it doesn't, and where it quietly breaks your work |
| 🧹 **Data Cleaning** | The systematic, auditable approach to the step that determines whether your analysis is trustworthy |
| 🔷 **Microsoft Fabric** | OneLake, Medallion architecture, and honest production assessments |

---

## Tech Stack

```
Frontend    HTML5 · CSS3 · Vanilla JavaScript
Fonts       Syne (display) · DM Sans (body)
Architecture  Component-based SPA with fragment loading
Hosting     GitHub Pages
```

---

## Project Structure

```
Data-Analyst-Blog/
├── index.html              # Entry point — loads all components
├── css/
│   └── styles.css          # Global design system
├── js/
│   ├── loader.js           # Async component & post fragment loader
│   └── main.js             # Navigation, transitions, reactions
├── components/
│   ├── header.html         # Site header & nav
│   ├── home.html           # Home view (hero, post list, sidebar)
│   ├── footer.html         # Site footer
│   └── modals.html         # Contact & modal overlays
└── posts/
    ├── blog7.html          # Microsoft Fabric
    ├── blog-ai.html        # AI in Analytics
    ├── blog1.html – blog6.html
    └── ...
```

### Adding a New Post

1. Create `posts/blogN.html` as a fragment — **no** `<html>`, `<head>`, or `<body>` tags; open with `<div class="post-detail" id="blogN" role="main">`
2. Add `'blogN'` to the `POSTS` array in `js/loader.js`
3. Add a card to the post list in `components/home.html`
4. If it's the newest post, update the featured section at the top of `components/home.html`

That's it — no build step, no bundler.

---

## Connect

I'm always interested in conversations about data, craft, and the honest realities of analytical work.

- 🌐 **Blog** — [chirchirp.github.io](https://chirchirp.github.io)
- 💼 **LinkedIn** — [linkedin.com/in/pharaahchirchir](https://linkedin.com/in/pharaahchirchir)

---

<sub>Built and written by Pharaoh Chirchir · Senior Data Analyst · © 2026</sub>
