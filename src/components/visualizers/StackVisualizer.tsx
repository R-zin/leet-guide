'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  currentIdx: number;
  stack: number[]; // indices
  result: number[];
  message: string;
}

export default function StackVisualizer() {
  const [temps] = useState<number[]>([73, 74, 75, 71, 69, 72, 76, 73]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const computedSteps: Step[] = [];
    const n = temps.length;
    const res = new Array(n).fill(0);
    const stack: number[] = [];

    computedSteps.push({
      currentIdx: -1,
      stack: [],
      result: [...res],
      message: 'Initial state: empty monotonic decreasing stack, result initialized to 0.',
    });

    for (let i = 0; i < n; i++) {
      const currentTemp = temps[i];

      while (stack.length > 0 && currentTemp > temps[stack[stack.length - 1]]) {
        const prevIdx = stack.pop()!;
        res[prevIdx] = i - prevIdx;
        computedSteps.push({
          currentIdx: i,
          stack: [...stack],
          result: [...res],
          message: `Day ${i} (${currentTemp}°) is warmer than day ${prevIdx} (${temps[prevIdx]}°)! Pop index ${prevIdx} and set res[${prevIdx}] = ${i} - ${prevIdx} = ${res[prevIdx]} days.`,
        });
      }

      stack.push(i);
      computedSteps.push({
        currentIdx: i,
        stack: [...stack],
        result: [...res],
        message: `Push day ${i} (${currentTemp}°) onto the stack.`,
      });
    }

    computedSteps.push({
      currentIdx: n,
      stack: [...stack],
      result: [...res],
      message: 'Finished! Elements remaining in stack have no warmer future day and remain 0.',
    });

    setSteps(computedSteps);
    setCurrentStep(0);
  }, [temps]);

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
          <h4 className="font-semibold text-rose-400 flex items-center gap-2">
            <span>Monotonic Stack: Daily Temperatures</span>
          </h4>
          <p className="text-xs text-slate-400">Temperatures Array: [{temps.join(', ')}]</p>
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-xs font-medium text-white shadow-sm"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {/* Array representation */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block mb-2">Input Temperatures:</span>
            <div className="flex flex-wrap gap-2">
              {temps.map((t, idx) => {
                const isCurrent = idx === step.currentIdx;
                const inStack = step.stack.includes(idx);
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-11 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-200 ${
                        isCurrent
                          ? 'bg-rose-500 text-white ring-2 ring-rose-400 scale-105'
                          : inStack
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t}°
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">i={idx}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block mb-2">Wait Days Result Array:</span>
            <div className="flex flex-wrap gap-2">
              {step.result.map((r, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-11 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                      r > 0 ? 'bg-emerald-600/80 text-white border border-emerald-500' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {r}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">i={idx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Stack representation */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center">
          <span className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider font-semibold">
            Monotonic Stack (LIFO)
          </span>
          <div className="w-full flex-1 min-h-[160px] max-h-[220px] overflow-y-auto border-2 border-dashed border-slate-700 rounded-lg p-2 flex flex-col-reverse gap-1.5">
            {step.stack.length === 0 ? (
              <span className="text-xs text-slate-600 font-mono m-auto">Stack is Empty</span>
            ) : (
              step.stack.map((idx, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded font-mono text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in"
                >
                  <span>idx: {idx}</span>
                  <span className="text-indigo-200">({temps[idx]}°)</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Status Box */}
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm flex items-start gap-3">
        <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-rose-400" />
        <p className="font-mono text-xs text-slate-300">
          Step {currentStep + 1} of {steps.length}: {step.message}
        </p>
      </div>
    </div>
  );
}
