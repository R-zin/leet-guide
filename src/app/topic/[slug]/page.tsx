import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCode,
  ArrowRight,
  Layers,
  Search,
  GitBranch,
  TrendingUp,
  Shuffle,
  Network,
  Cpu,
  Activity,
  FolderTree,
  Binary,
  Maximize2
} from 'lucide-react';
import { topics } from '@/data/topics';
import { getProblemsByTopic } from '@/data/problems';

export function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default function TopicDetailPage({ params }: { params: { slug: string } }) {
  const topic = topics.find((t) => t.slug === params.slug);

  if (!topic) {
    notFound();
  }

  const topicProblems = getProblemsByTopic(topic.slug);

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

  const Icon = getIcon(topic.icon);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/#topics" className="hover:text-emerald-400 transition-colors">
          Topics
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{topic.title}</span>
      </div>

      {/* Header Banner */}
      <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shadow-md">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              {topic.difficultyFocus}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {topic.title}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {topic.shortDescription}
        </p>
      </div>

      {/* IN-DEPTH THEORETICAL OVERVIEW */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span>Deep-Dive Theoretical Foundation</span>
        </h2>
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {topic.longOverview}
        </div>
      </section>

      {/* KEY CONCEPTS & MENTAL MODELS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <span>Core Mechanics & Mental Models</span>
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {topic.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3"
            >
              <h3 className="font-bold text-base text-white text-emerald-400">
                {idx + 1}. {concept.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {concept.explanation}
              </p>
              {concept.codeSnippet && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                  <pre className="font-mono text-xs text-slate-200">
                    <code>{concept.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO USE HEURISTIC CHECKLIST */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Pattern Recognition: When to Use</span>
        </h2>
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.whenToUse.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* UNIVERSAL CODE TEMPLATES */}
      {topic.templates.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-amber-400" />
            <span>Master Code Templates</span>
          </h2>
          <div className="space-y-5">
            {topic.templates.map((tpl, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{tpl.name}</span>
                  <span className="text-xs font-mono text-emerald-400">{tpl.language}</span>
                </div>
                <div className="p-4 bg-slate-950/80 overflow-x-auto">
                  <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                    <code>{tpl.code}</code>
                  </pre>
                </div>
                <div className="p-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
                  {tpl.explanation}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMMON PITFALLS */}
      {topic.commonMistakes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>Common Pitfalls & Anti-Patterns</span>
          </h2>
          <div className="p-5 bg-rose-950/20 border border-rose-900/50 rounded-2xl">
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
              {topic.commonMistakes.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SOLVED PROBLEMS UNDER THIS TOPIC */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Solved Problems in {topic.title} ({topicProblems.length})
          </h2>
          <Link
            href="/problems"
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
          >
            <span>All Problems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicProblems.map((prob) => (
            <Link
              key={prob.slug}
              href={`/problems/${prob.slug}`}
              className="p-4 bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
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

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Time: {prob.timeComplexity}</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform font-semibold">
                  View Solution →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
