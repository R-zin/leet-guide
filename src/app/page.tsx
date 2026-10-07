'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  BookOpen,
  Eye,
  FileText,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Layers,
  Search,
  Cpu,
  GitBranch,
  Network,
  Activity,
  Binary,
  FolderTree,
  Maximize2,
  TrendingUp,
  Shuffle
} from 'lucide-react';
import { topics } from '@/data/topics';
import { problems } from '@/data/problems';
import { useProgress } from '@/context/ProgressContext';

export default function HomePage() {
  const { totalSolved, totalProblems, getSolvedCountByTopic } = useProgress();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return Layers;
      case 'Maximize2':
        return Maximize2;
      case 'Search':
        return Search;
      case 'GitBranch':
        return GitBranch;
      case 'GitCommit':
        return GitBranch;
      case 'TrendingUp':
        return TrendingUp;
      case 'Shuffle':
        return Shuffle;
      case 'Network':
        return Network;
      case 'Cpu':
        return Cpu;
      case 'Activity':
        return Activity;
      case 'FolderTree':
        return FolderTree;
      case 'Binary':
        return Binary;
      default:
        return BookOpen;
    }
  };

  const percentage = Math.round((totalSolved / totalProblems) * 100) || 0;

  // Selected top high-yield problems for quick start
  const featuredProblems = problems.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Master FAANG & Top Tech DSA Interviews</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            The Deep-Dive{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              DSA & LeetCode
            </span>{' '}
            Guide
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Theoretical mastery meets production-grade code. Every pattern explained from first principles with verified solutions in{' '}
            <span className="text-white font-medium">Python, JavaScript, C++, and Java</span>, interactive visualizers, and an in-browser code runner.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/problems"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Solved Questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#topics"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Browse All Topics</span>
            </Link>
            <Link
              href="/visualizers"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              <span>Try Visualizers</span>
            </Link>
          </div>

          {/* Live Progress Card */}
          <div className="max-w-xl mx-auto mt-8 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Your Solving Progress</span>
              </span>
              <span className="text-emerald-400 font-bold">
                {totalSolved} / {totalProblems} Solved ({percentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(percentage, 4)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHT STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">14+</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Core DSA Topics</span>
          </div>
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block">4</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Languages Per Solution</span>
          </div>
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono block">Interactive</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Algorithm Visualizers</span>
          </div>
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono block">O(1) to O(N)</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Big-O Cheat Sheets</span>
          </div>
        </div>
      </section>

      {/* TOPICS DIRECTORY */}
      <section id="topics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Curated Topic Roadmaps
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a domain to study memory layouts, template blueprints, common pitfalls, and solved challenges.
            </p>
          </div>
          <Link
            href="/problems"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
          >
            <span>View All Problems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => {
            const Icon = getIcon(topic.icon);
            const { solved, total } = getSolvedCountByTopic(topic.slug);
            const topicPercent = total > 0 ? Math.round((solved / total) * 100) : 0;

            return (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className="group p-5 bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-emerald-950/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-emerald-500/10 text-slate-300 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {total} Problems
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {topic.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>Topic Progress</span>
                    <span className={solved > 0 ? 'text-emerald-400 font-bold' : ''}>
                      {solved}/{total} ({topicPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${topicPercent}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED SOLVED PROBLEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              High-Frequency Solved Questions
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top interview staples with intuition, step-by-step algorithms, multi-language solutions, and test cases.
            </p>
          </div>
          <Link
            href="/problems"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
          >
            <span>See Full Problem Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProblems.map((prob) => (
            <Link
              key={prob.slug}
              href={`/problems/${prob.slug}`}
              className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-500">#{prob.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                  {prob.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono">{prob.pattern}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{prob.topicName}</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Solve →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THREE SPECIAL INTERACTIVE HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Algorithm Visualizers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step through Two Pointers, Binary Search, Sliding Windows, and Monotonic Stacks frame-by-frame to cement mental models.
            </p>
            <Link
              href="/visualizers"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Launch visualizers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Big-O & Pattern Cheat Sheet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quick-reference lookup table for data structure complexities, sorting algorithms, and the 60-second pattern decision flowchart.
            </p>
            <Link
              href="/cheatsheets"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <span>View cheat sheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Pattern Recognition Quiz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test your ability to diagnose the correct algorithm pattern from raw interview problem descriptions.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              <span>Take pattern quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
