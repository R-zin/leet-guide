'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  left: number;
  right: number;
  windowStr: string;
  maxLen: number;
  message: string;
}

export default function SlidingWindowVisualizer() {
  const [str] = useState<string>('pwwkew');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const computedSteps: Step[] = [];
    const lastSeen: Record<string, number> = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < str.length; right++) {
      const char = str[right];

      if (char in lastSeen && lastSeen[char] >= left) {
        const prevIdx = lastSeen[char];
        left = prevIdx + 1;
        computedSteps.push({
          left,
          right,
          windowStr: str.slice(left, right + 1),
          maxLen,
          message: `Duplicate '${char}' at index ${right} was previously at index ${prevIdx}. Shrink left boundary to ${left}.`,
        });
      }

      lastSeen[char] = right;
      const currentLen = right - left + 1;
      maxLen = Math.max(maxLen, currentLen);

      computedSteps.push({
        left,
        right,
        windowStr: str.slice(left, right + 1),
        maxLen,
        message: `Include '${char}' at index ${right}. Current window "${str.slice(
          left,
          right + 1
        )}" (length: ${currentLen}). Max length so far: ${maxLen}.`,
      });
    }

    setSteps(computedSteps);
    setCurrentStep(0);
  }, [str]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  if (steps.length === 0) return null;

  const step = steps[currentStep];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="font-semibold text-amber-400 flex items-center gap-2">
            <span>Sliding Window: Longest Substring Without Repeating</span>
          </h4>
          <p className="text-xs text-slate-400">Input String: &quot;{str}&quot;</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
            disabled={currentStep === 0}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-slate-200"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-medium text-white shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
            disabled={currentStep === steps.length - 1}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-slate-200"
            title="Next step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual String */}
      <div className="flex flex-wrap items-center justify-center gap-2 my-6 py-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {str.split('').map((char, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;
          const isLeft = idx === step.left;
          const isRight = idx === step.right;

          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-12 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-lg transition-all duration-300 shadow-md ${
                  inWindow
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 scale-105'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/60 opacity-40'
                }`}
              >
                {char}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">idx {idx}</span>
              <div className="h-5 flex items-center gap-0.5">
                {isLeft && (
                  <span className="text-[9px] font-bold text-cyan-400 px-1 bg-cyan-950/60 rounded">
                    L
                  </span>
                )}
                {isRight && (
                  <span className="text-[9px] font-bold text-amber-300 px-1 bg-amber-950/60 rounded">
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Window Status */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
        <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-0.5">Active Window:</span>
          <span className="text-amber-400 font-bold text-sm">&quot;{step.windowStr}&quot;</span> (len:{' '}
          {step.windowStr.length})
        </div>
        <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-0.5">Max Substring Length:</span>
          <span className="text-emerald-400 font-bold text-sm">{step.maxLen}</span>
        </div>
      </div>

      {/* Status Box */}
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm flex items-start gap-3">
        <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-amber-400" />
        <p className="font-mono text-xs text-slate-300">
          Step {currentStep + 1} of {steps.length}: {step.message}
        </p>
      </div>
    </div>
  );
}
