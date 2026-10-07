import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  HardDrive,
  AlertTriangle,
  Lightbulb,
  ListOrdered,
  Eye,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { problems, getProblemBySlug } from '@/data/problems';
import CodeViewer from '@/components/CodeViewer';
import CodeRunner from '@/components/CodeRunner';
import TwoPointersVisualizer from '@/components/visualizers/TwoPointersVisualizer';
import BinarySearchVisualizer from '@/components/visualizers/BinarySearchVisualizer';
import SlidingWindowVisualizer from '@/components/visualizers/SlidingWindowVisualizer';
import StackVisualizer from '@/components/visualizers/StackVisualizer';

export function generateStaticParams() {
  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default function ProblemDetailPage({ params }: { params: { slug: string } }) {
  const problem = getProblemBySlug(params.slug);

  if (!problem) {
    notFound();
  }

  // Prev / Next Problem calculation
  const currentIndex = problems.findIndex((p) => p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Navigation Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Link href="/problems" className="hover:text-emerald-400 transition-colors">
            Problems
          </Link>
          <span>/</span>
          <Link href={`/topic/${problem.topic}`} className="hover:text-emerald-400 transition-colors">
            {problem.topicName}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">{problem.title}</span>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center gap-2">
          {prevProblem && (
            <Link
              href={`/problems/${prevProblem.slug}`}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          )}
          {nextProblem && (
            <Link
              href={`/problems/${nextProblem.slug}`}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-slate-500 font-bold">#{problem.id}</span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {problem.difficulty}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                {problem.pattern}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {problem.title}
            </h1>
          </div>

          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Company Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-xs text-slate-500 mr-1">Top Companies:</span>
          {problem.companies.map((company) => (
            <span
              key={company}
              className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800/90 text-slate-400 text-xs font-medium"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM STATEMENT & EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Problem Statement</span>
        </h2>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
          {problem.description}
        </div>

        {/* Examples */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-slate-300">Examples</h3>
          <div className="grid grid-cols-1 gap-3">
            {problem.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-950 border border-slate-800/90 rounded-xl text-xs font-mono space-y-1.5"
              >
                <div className="text-slate-400">
                  <span className="font-bold text-emerald-400">Example {idx + 1}:</span>
                </div>
                <div>
                  <span className="text-slate-500">Input: </span>
                  <span className="text-slate-200">{ex.input}</span>
                </div>
                <div>
                  <span className="text-slate-500">Output: </span>
                  <span className="text-emerald-300 font-semibold">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="text-slate-400 font-sans text-xs pt-1 border-t border-slate-900">
                    <span className="text-slate-500 font-mono">Explanation: </span>
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/70 rounded-xl space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Constraints
          </span>
          <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-300">
            {problem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPTIONAL INTERACTIVE VISUALIZER */}
      {problem.visualizerType && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span>Step-by-Step Algorithm Visualizer</span>
          </h2>
          {problem.visualizerType === 'two-pointers' && <TwoPointersVisualizer />}
          {problem.visualizerType === 'binary-search' && <BinarySearchVisualizer />}
          {problem.visualizerType === 'sliding-window' && <SlidingWindowVisualizer />}
          {problem.visualizerType === 'stack' && <StackVisualizer />}
        </section>
      )}

      {/* INTUITION & THOUGHT PROCESS */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Intuition & Pattern Recognition</span>
        </h2>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {problem.intuition}
        </div>
      </section>

      {/* STEP-BY-STEP ALGORITHM */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-emerald-400" />
          <span>Step-by-Step Algorithm Walkthrough</span>
        </h2>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 leading-relaxed font-sans">
            {problem.algorithmSteps.map((step, idx) => (
              <li key={idx} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MULTI-LANGUAGE CODE SOLUTIONS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Production Solutions</h2>
          <span className="text-xs text-slate-400 font-mono">Python • JavaScript • C++ • Java</span>
        </div>
        <CodeViewer solutions={problem.solutions} />
      </section>

      {/* IN-BROWSER CODE RUNNER */}
      {problem.runnable && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <span>In-Browser Test Case Runner</span>
          </h2>
          <p className="text-xs text-slate-400">
            Execute the solution against official test cases directly inside your browser:
          </p>
          <CodeRunner config={problem.runnable} />
        </section>
      )}

      {/* COMPLEXITY ANALYSIS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Complexity Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Time Complexity</span>
            </div>
            <p className="text-lg font-extrabold text-white font-mono">{problem.timeComplexity}</p>
          </div>
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Space Complexity</span>
            </div>
            <p className="text-lg font-extrabold text-white font-mono">{problem.spaceComplexity}</p>
          </div>
        </div>
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
          {problem.complexityAnalysis}
        </div>
      </section>

      {/* COMMON PITFALLS */}
      {problem.commonPitfalls && problem.commonPitfalls.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>Common Pitfalls & Interview Mistakes</span>
          </h2>
          <div className="p-4 bg-rose-950/20 border border-rose-900/50 rounded-2xl">
            <ul className="list-disc list-inside space-y-2 text-xs text-rose-200/90 leading-relaxed">
              {problem.commonPitfalls.map((pitfall, idx) => (
                <li key={idx}>{pitfall}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
