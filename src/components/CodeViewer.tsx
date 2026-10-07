'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Language } from '@/types';

interface CodeViewerProps {
  solutions: Record<Language, string>;
}

export default function CodeViewer({ solutions }: CodeViewerProps) {
  const [activeLang, setActiveLang] = useState<Language>('python');
  const [copied, setCopied] = useState<boolean>(false);

  const languages: { id: Language; label: string; badge: string }[] = [
    { id: 'python', label: 'Python 3', badge: 'py' },
    { id: 'javascript', label: 'JavaScript', badge: 'js' },
    { id: 'cpp', label: 'C++', badge: 'cpp' },
    { id: 'java', label: 'Java', badge: 'java' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(solutions[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl my-4">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
                activeLang === lang.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-mono transition-colors ml-auto"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Display */}
      <div className="relative p-4 bg-slate-950/90 overflow-x-auto">
        <pre className="font-mono text-xs text-slate-200 leading-relaxed font-normal">
          <code>{solutions[activeLang]}</code>
        </pre>
      </div>
    </div>
  );
}
