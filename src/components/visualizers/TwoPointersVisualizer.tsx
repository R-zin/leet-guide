'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  left: number;
  right: number;
  message: string;
  matched?: boolean;
  value?: number;
}

export default function TwoPointersVisualizer() {
  const [array] = useState<number[]>([1, 2, 4, 7, 11, 15]);
  const [target] = useState<number>(15);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Precompute steps for Two Sum II
  useEffect(() => {
    const computedSteps: Step[] = [];
    let l = 0;
    let r = array.length - 1;

    computedSteps.push({
      left: l,
      right: r,
      message: `Start pointers: left = ${l} (val: ${array[l]}), right = ${r} (val: ${array[r]}). Sum = ${array[l] + array[r]}.`,
      value: array[l] + array[r],
    });

    while (l < r) {
      const sum = array[l] + array[r];
      if (sum === target) {
        computedSteps.push({
          left: l,
          right: r,
          message: `Found target! nums[${l}] (${array[l]}) + nums[${r}] (${array[r]}) == ${target}!`,
          matched: true,
          value: sum,
        });
        break;
      } else if (sum < target) {
        l++;
        computedSteps.push({
          left: l,
          right: r,
          message: `Sum (${sum}) < target (${target}). Need a larger sum, so increment left pointer to index ${l} (val: ${array[l]}).`,
          value: array[l] + array[r],
        });
      } else {
        r--;
        computedSteps.push({
          left: l,
          right: r,
          message: `Sum (${sum}) > target (${target}). Need a smaller sum, so decrement right pointer to index ${r} (val: ${array[r]}).`,
          value: array[l] + array[r],
        });
      }
    }
    setSteps(computedSteps);
    setCurrentStep(0);
  }, [array, target]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1400);
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
          <h4 className="font-semibold text-emerald-400 flex items-center gap-2">
            <span>Interactive Two Pointers Demonstration</span>
          </h4>
          <p className="text-xs text-slate-400">Target Sum = {target}</p>
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium text-white shadow-sm"
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

      {/* Visual Array */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-6 py-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {array.map((val, idx) => {
          const isLeft = idx === step.left;
          const isRight = idx === step.right;
          const isMatched = step.matched && (isLeft || isRight);

          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono font-bold text-lg transition-all duration-300 shadow-md ${
                  isMatched
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400 scale-110'
                    : isLeft
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 scale-105'
                    : isRight
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-105'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                {val}
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-1">idx {idx}</span>
              <div className="h-5 flex items-center">
                {isLeft && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-1 rounded bg-cyan-950/60">
                    L
                  </span>
                )}
                {isRight && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-1 rounded bg-amber-950/60">
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status & Explanation Box */}
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm flex items-start gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
            step.matched ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
          }`}
        />
        <div className="space-y-1">
          <p className="font-mono text-xs text-slate-300">
            Step {currentStep + 1} of {steps.length}: {step.message}
          </p>
          {step.value !== undefined && (
            <p className="text-xs text-slate-400">
              Current Sum: <span className="font-mono text-white font-semibold">{step.value}</span> | Target:{' '}
              <span className="font-mono text-white font-semibold">{target}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
