'use client';

import React, { useState } from 'react';
import { Eye, Layers, Search, Maximize2, Layers3 } from 'lucide-react';
import TwoPointersVisualizer from '@/components/visualizers/TwoPointersVisualizer';
import BinarySearchVisualizer from '@/components/visualizers/BinarySearchVisualizer';
import SlidingWindowVisualizer from '@/components/visualizers/SlidingWindowVisualizer';
import StackVisualizer from '@/components/visualizers/StackVisualizer';

export default function VisualizersPage() {
  const [activeTab, setActiveTab] = useState<'two-pointers' | 'binary-search' | 'sliding-window' | 'stack'>(
    'two-pointers'
  );

  const tabs = [
    { id: 'two-pointers', label: 'Two Pointers', icon: Maximize2, desc: 'Convergent pointers on sorted arrays' },
    { id: 'binary-search', label: 'Binary Search', icon: Search, desc: 'Logarithmic search space halving' },
    { id: 'sliding-window', label: 'Sliding Window', icon: Layers, desc: 'Dynamic window expand and shrink' },
    { id: 'stack', label: 'Monotonic Stack', icon: Layers3, desc: 'Next greater element evaluation' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3 text-center sm:text-left pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-800/80 rounded-full text-xs font-mono text-cyan-400">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive Algorithm Workbench</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visual DSA Playgrounds
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Step through fundamental algorithm patterns frame-by-frame. Observe how indices move, window states contract, and monotonic stacks resolve historical elements in real time.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900/60 text-slate-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {tab.label}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Visualizer Display Area */}
      <div className="space-y-6">
        {activeTab === 'two-pointers' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Pattern Intuition: </strong>
              In Two Sum II (sorted array), if the sum of elements at \`left\` and \`right\` is smaller than target, incrementing \`left\` is the ONLY way to increase the sum. If the sum is greater than target, decrementing \`right\` is the ONLY way to decrease the sum. This eliminates an entire row/column of candidate pairs in O(1) per step!
            </div>
            <TwoPointersVisualizer />
          </div>
        )}

        {activeTab === 'binary-search' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Pattern Intuition: </strong>
              At every comparison between target and \`nums[mid]\`, half of the remaining array is discarded. Notice the grayed-out elements: they are mathematically guaranteed never to contain the target!
            </div>
            <BinarySearchVisualizer />
          </div>
        )}

        {activeTab === 'sliding-window' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Pattern Intuition: </strong>
              The window expands by pushing \`right\` forward. As soon as a duplicate character is encountered, the \`left\` pointer snaps past the duplicate position, guaranteeing all substrings within the window have unique characters in O(N).
            </div>
            <SlidingWindowVisualizer />
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Pattern Intuition: </strong>
              In Daily Temperatures, the monotonic stack holds indices of temperatures waiting for a warmer day in strictly decreasing order. When a warmer temperature arrives, it pops and resolves multiple colder days in a single step!
            </div>
            <StackVisualizer />
          </div>
        )}
      </div>
    </div>
  );
}
