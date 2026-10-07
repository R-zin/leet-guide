# 🚀 LeetGuide - The Deep-Dive DSA & LeetCode Guide

> A modern, comprehensive Data Structures & Algorithms handbook with battle-tested solutions in **Python**, **JavaScript**, **C++**, and **Java**, interactive algorithm visualizers, an in-browser code sandbox, Big-O reference matrices, and algorithmic pattern flowcharts.

🌐 **Live GitHub Pages Deployment:** [https://r-zin.github.io/leet-guide/](https://r-zin.github.io/leet-guide/)

---

## 🎯 Highlights & Features

- **14 Core DSA Topic Roadmaps:**
  - Arrays & Hashing
  - Two Pointers & Sliding Window
  - Stacks, Queues & Monotonic Structures
  - Binary Search & Search Space Reduction
  - Linked Lists & Pointer Rewiring
  - Trees & Binary Search Trees
  - Heaps & Priority Queues
  - Backtracking & Combinatorial Search
  - Graphs, BFS, DFS & Connectivity
  - Dynamic Programming (1D & 2D)
  - Greedy Algorithms & Intervals
  - Tries (Prefix Trees)
  - Bit Manipulation & Low-Level Math
- **Solved LeetCode Questions:**
  - High-frequency Blind 75 / NeetCode 150 questions
  - Verified solutions with syntax highlighting across **4 languages** (Python 3, JavaScript, C++, Java)
  - Mathematical Big-O Time & Space complexity analysis
  - Detailed Intuition, Step-by-Step Algorithm Walkthrough, and Common Interview Pitfalls
- **Interactive Algorithm Visualizers:**
  - Two Pointers Visualizer (Convergent indices with sum matching)
  - Binary Search Visualizer (Logarithmic range elimination)
  - Sliding Window Visualizer (Dynamic expand and shrink)
  - Monotonic Stack Visualizer (Daily Temperatures Next Greater Element)
- **In-Browser Code Execution Engine:**
  - Real-time JavaScript code runner
  - Executes test cases in-browser with pass/fail indicators and latency measurements
  - Editable sandbox for practicing implementations
- **Pattern Recognition Quiz:**
  - Interactive multiple-choice scenario challenges to sharpen problem diagnosis instincts
- **Big-O Cheat Sheets:**
  - Operations matrix for 11 data structures
  - 6 classic sorting algorithms
  - 60-Second Pattern Identification Flowchart
  - Copy-pasteable universal algorithm templates
- **Local Progress & Bookmark Tracker:**
  - Automatically preserves solved questions and favorites in browser `localStorage`
  - Real-time progress bars and difficulty stats

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Static HTML Export `output: 'export'`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with modern dark UI
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation:** Canvas Confetti
- **CI/CD:** GitHub Actions deploying to GitHub Pages

---

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/R-zin/leet-guide.git
cd leet-guide
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🏗️ Production Build & Export

To test the static HTML export locally:

```bash
npm run build
```

The exported website is generated in the `./out` directory.

---

## 🚢 GitHub Pages Automated Deployment

This repository includes a continuous deployment workflow in `.github/workflows/nextjs.yml`.
Every push to the `main` branch automatically:
1. Installs npm dependencies
2. Builds the Next.js static export
3. Publishes the `./out` directory to GitHub Pages at `https://r-zin.github.io/leet-guide/`
