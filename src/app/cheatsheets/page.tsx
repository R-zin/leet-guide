'use client';

import React, { useState } from 'react';
import {
  FileText,
  Clock,
  ArrowRight,
  Copy,
  Check,
  CheckCircle2,
  HelpCircle,
  Code
} from 'lucide-react';
import {
  dataStructureComplexity,
  sortingComplexity,
  decisionFlowchart,
  universalTemplates
} from '@/data/cheatsheets';

export default function CheatsheetsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getComplexityColor = (comp: string) => {
    if (comp.includes('1') || comp.includes('α')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (comp.includes('log N')) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    if (comp.includes('N²')) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (comp.includes('N')) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-800/80 rounded-full text-xs font-mono text-emerald-400">
          <FileText className="w-3.5 h-3.5" />
          <span>Quick Reference Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          DSA & Big-O Cheat Sheets
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          The essential formulas, operation complexities, sorting algorithms, decision trees, and code blueprints needed before any coding interview.
        </p>
      </div>

      {/* 60-SECOND PATTERN DECISION FLOWCHART */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>The 60-Second Pattern Identification Tree</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How to recognize the correct algorithmic pattern from raw interview problem signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decisionFlowchart.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-2.5 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Problem Signal #{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-200">{item.scenario}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ArrowRight className="w-4 h-4 shrink-0" />
                  <span>Use: {item.solution}</span>
                </div>
                <p className="text-xs text-slate-400 pl-6">{item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DATA STRUCTURES BIG-O COMPLEXITY TABLE */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Data Structure Operations Complexity</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access, search, insertion, deletion, and auxiliary memory bounds.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-sans">Data Structure</th>
                  <th className="py-3.5 px-4 text-center">Access</th>
                  <th className="py-3.5 px-4 text-center">Search</th>
                  <th className="py-3.5 px-4 text-center">Insertion</th>
                  <th className="py-3.5 px-4 text-center">Deletion</th>
                  <th className="py-3.5 px-4 text-center">Space</th>
                  <th className="py-3.5 px-4 font-sans">Interview Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {dataStructureComplexity.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-bold text-white whitespace-nowrap">
                      {row.structure}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.access)}`}>
                        {row.access}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.search)}`}>
                        {row.search}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.insertion)}`}>
                        {row.insertion}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.deletion)}`}>
                        {row.deletion}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300 font-bold">
                      {row.space}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-400 text-xs min-w-[200px]">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SORTING ALGORITHMS COMPLEXITY TABLE */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Sorting Algorithms Complexity</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Best, average, and worst-case comparison along with stability guarantees.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-sans">Algorithm</th>
                  <th className="py-3.5 px-4 text-center">Best Case</th>
                  <th className="py-3.5 px-4 text-center">Average Case</th>
                  <th className="py-3.5 px-4 text-center">Worst Case</th>
                  <th className="py-3.5 px-4 text-center">Space</th>
                  <th className="py-3.5 px-4 text-center">Stable?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {sortingComplexity.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-bold text-white">{row.algorithm}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.best)}`}>
                        {row.best}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.average)}`}>
                        {row.average}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${getComplexityColor(row.worst)}`}>
                        {row.worst}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300 font-bold">{row.space}</td>
                    <td className="py-3 px-4 text-center font-sans">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          row.stable === 'Yes'
                            ? 'text-emerald-400 bg-emerald-950/60'
                            : 'text-slate-400 bg-slate-950'
                        }`}
                      >
                        {row.stable}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CORE ALGORITHM CODE TEMPLATES */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-amber-400" />
            <span>Universal Code Templates</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Copy-pasteable boilerplate for the most frequent interview algorithms.
          </p>
        </div>

        <div className="space-y-5">
          {universalTemplates.map((template, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-white">{template.name}</span>
                  <span className="text-xs font-mono text-emerald-400 ml-2">({template.language})</span>
                </div>
                <button
                  onClick={() => handleCopy(template.code, idx)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-mono transition-colors"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedIndex === idx ? 'Copied!' : 'Copy Template'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950/80 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                  <code>{template.code}</code>
                </pre>
              </div>

              <div className="p-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                {template.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
