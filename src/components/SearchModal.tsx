'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, Code2 } from 'lucide-react';
import { problems } from '@/data/problems';
import { topics } from '@/data/topics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredProblems = cleanQuery
    ? problems.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.pattern.toLowerCase().includes(cleanQuery) ||
          p.topicName.toLowerCase().includes(cleanQuery) ||
          p.companies.some((c) => c.toLowerCase().includes(cleanQuery))
      ).slice(0, 8)
    : problems.slice(0, 5);

  const filteredTopics = cleanQuery
    ? topics.filter(
        (t) =>
          t.title.toLowerCase().includes(cleanQuery) ||
          t.shortDescription.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, patterns, topics, or companies..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Topics matches */}
          {filteredTopics.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                Topics
              </span>
              <div className="space-y-1">
                {filteredTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topic/${topic.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {topic.title}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-1">{topic.shortDescription}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Problems matches */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 block mb-1">
              {cleanQuery ? 'Matched Problems' : 'Featured Problems'}
            </span>
            <div className="space-y-1">
              {filteredProblems.length === 0 ? (
                <p className="text-xs text-slate-500 p-3 text-center">No problems found matching &quot;{query}&quot;</p>
              ) : (
                filteredProblems.map((problem) => (
                  <Link
                    key={problem.slug}
                    href={`/problems/${problem.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {problem.title}
                          </p>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              problem.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : problem.difficulty === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {problem.topicName} • <span className="text-slate-300">{problem.pattern}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
