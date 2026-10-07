'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Star,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { problems } from '@/data/problems';
import { topics } from '@/data/topics';
import { useProgress } from '@/context/ProgressContext';
import { Difficulty } from '@/types';

export default function ProblemsPage() {
  const {
    isSolved,
    isBookmarked,
    toggleSolved,
    toggleBookmarked,
    totalSolved,
    totalProblems,
    resetProgress,
  } = useProgress();

  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | Difficulty>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved' | 'bookmarked'>('all');

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // Search
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.pattern.toLowerCase().includes(search.toLowerCase()) ||
        p.companies.some((c) => c.toLowerCase().includes(search.toLowerCase()));

      // Topic
      const matchTopic = selectedTopic === 'all' || p.topic === selectedTopic;

      // Difficulty
      const matchDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;

      // Status
      let matchStatus = true;
      if (statusFilter === 'solved') matchStatus = isSolved(p.slug);
      if (statusFilter === 'unsolved') matchStatus = !isSolved(p.slug);
      if (statusFilter === 'bookmarked') matchStatus = isBookmarked(p.slug);

      return matchSearch && matchTopic && matchDiff && matchStatus;
    });
  }, [search, selectedTopic, selectedDifficulty, statusFilter, isSolved, isBookmarked]);

  const easySolved = problems.filter((p) => p.difficulty === 'Easy' && isSolved(p.slug)).length;
  const easyTotal = problems.filter((p) => p.difficulty === 'Easy').length;

  const medSolved = problems.filter((p) => p.difficulty === 'Medium' && isSolved(p.slug)).length;
  const medTotal = problems.filter((p) => p.difficulty === 'Medium').length;

  const hardSolved = problems.filter((p) => p.difficulty === 'Hard' && isSolved(p.slug)).length;
  const hardTotal = problems.filter((p) => p.difficulty === 'Hard').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Curated LeetCode Problem Bank
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete collection of high-frequency interview questions with in-depth solutions, code runner, and complexities.
          </p>
        </div>

        {/* Difficulty Breakdown Pill Counters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 mr-1.5">Easy:</span>
            <span className="text-emerald-400 font-bold">{easySolved}</span>
            <span className="text-slate-600">/{easyTotal}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 mr-1.5">Medium:</span>
            <span className="text-amber-400 font-bold">{medSolved}</span>
            <span className="text-slate-600">/{medTotal}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 mr-1.5">Hard:</span>
            <span className="text-rose-400 font-bold">{hardSolved}</span>
            <span className="text-slate-600">/{hardTotal}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs font-mono text-emerald-300 font-bold">
            Total: {totalSolved}/{totalProblems}
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search box */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem, pattern, or company..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Topic Select */}
          <div>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-emerald-500/50"
            >
              <option value="all">All Topics ({problems.length})</option>
              {topics.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-emerald-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="solved">Solved Only</option>
              <option value="unsolved">Unsolved Only</option>
              <option value="bookmarked">Bookmarked Only</option>
            </select>
          </div>
        </div>

        {/* Difficulty Pill Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? diff === 'Easy'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : diff === 'Medium'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : diff === 'Hard'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">
              Showing {filteredProblems.length} questions
            </span>
            {totalSolved > 0 && (
              <button
                onClick={resetProgress}
                className="text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1 ml-2 transition-colors"
                title="Reset local storage progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Problems List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4 w-12 text-center">Save</th>
                <th className="py-3.5 px-4">Title & Pattern</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Companies</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                    No problems match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => {
                  const solved = isSolved(prob.slug);
                  const bookmarked = isBookmarked(prob.slug);

                  return (
                    <tr
                      key={prob.slug}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        solved ? 'bg-emerald-950/10' : ''
                      }`}
                    >
                      {/* Solved Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleSolved(prob.slug)}
                          className="text-slate-600 hover:text-emerald-400 transition-colors"
                          title={solved ? 'Mark as Unsolved' : 'Mark as Solved'}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 mx-auto ${
                              solved
                                ? 'text-emerald-400 fill-emerald-500/20'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Bookmark Star */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleBookmarked(prob.slug)}
                          className="text-slate-600 hover:text-amber-400 transition-colors"
                          title={bookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                        >
                          <Star
                            className={`w-4 h-4 mx-auto ${
                              bookmarked
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Title & Pattern */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <Link
                            href={`/problems/${prob.slug}`}
                            className={`font-semibold hover:text-emerald-400 transition-colors ${
                              solved ? 'text-slate-300 line-through decoration-slate-600' : 'text-white'
                            }`}
                          >
                            #{prob.id}. {prob.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {prob.pattern}
                          </span>
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-3 px-4">
                        <Link
                          href={`/topic/${prob.topic}`}
                          className="text-slate-300 hover:text-white transition-colors"
                        >
                          {prob.topicName}
                        </Link>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block font-bold px-2 py-0.5 rounded text-[10px] ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* Companies */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {prob.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] border border-slate-800"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={prob.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
                            title="Open on LeetCode"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            href={`/problems/${prob.slug}`}
                            className="px-3 py-1 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 rounded-lg text-xs font-semibold transition-all"
                          >
                            Solution
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
