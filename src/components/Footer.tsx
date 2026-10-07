import React from 'react';
import Link from 'next/link';
import { Code2, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">LeetGuide</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A comprehensive, battle-tested Data Structures & Algorithms guide with solved LeetCode problems, interactive visualizers, and complexity cheat sheets.
          </p>
        </div>

        {/* Core Topics */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Core Topics</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/topic/arrays-and-hashing" className="hover:text-emerald-400 transition-colors">
                Arrays & Hashing
              </Link>
            </li>
            <li>
              <Link href="/topic/two-pointers" className="hover:text-emerald-400 transition-colors">
                Two Pointers & Sliding Window
              </Link>
            </li>
            <li>
              <Link href="/topic/binary-search" className="hover:text-emerald-400 transition-colors">
                Binary Search
              </Link>
            </li>
            <li>
              <Link href="/topic/graphs" className="hover:text-emerald-400 transition-colors">
                Graphs & Connectivity
              </Link>
            </li>
            <li>
              <Link href="/topic/dynamic-programming" className="hover:text-emerald-400 transition-colors">
                Dynamic Programming
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/problems" className="hover:text-emerald-400 transition-colors">
                Problem Tracker
              </Link>
            </li>
            <li>
              <Link href="/visualizers" className="hover:text-emerald-400 transition-colors">
                Algorithm Visualizers
              </Link>
            </li>
            <li>
              <Link href="/cheatsheets" className="hover:text-emerald-400 transition-colors">
                Big-O & Pattern Cheat Sheet
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="hover:text-emerald-400 transition-colors">
                Pattern Recognition Quiz
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Open Source</h4>
          <p className="text-xs leading-relaxed text-slate-400">
            Deployed on GitHub Pages using Next.js static export. Free and open-source for tech interview preparation.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://github.com/R-zin/leet-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>© {new Date().getFullYear()} LeetGuide. Engineered for top tech interview excellence.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for developers everywhere
        </p>
      </div>
    </footer>
  );
}
