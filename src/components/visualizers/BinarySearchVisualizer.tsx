'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  low: number;
  mid: number;
  high: number;
  message: string;
  matched?: boolean;
}

export default function BinarySearchVisualizer() {
  const [array] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);
  const [target, setTarget] = useState<number>(23);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const computedSteps: Step[] = [];
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = array[mid];

      if (midVal === target) {
        computedSteps.push({
          low,
          mid,
          high,
          message: `Match found! nums[${mid}] === ${target}!`,
          matched: true,
        });
        break;
      } else if (midVal < target) {
        computedSteps.push({
          low,
          mid,
          high,
          message: `nums[${mid}] (${midVal}) < target (${target}). Target must be in the right half. Move low to ${mid + 1}.`,
        });
        low = mid + 1;
      } else {
        computedSteps.push({
          low,
          mid,
          high,
          message: `nums[${mid}] (${midVal}) > target (${target}). Target must be in the left half. Move high to ${mid - 1}.`,
        });
        high = mid - 1;
      }
    }

    if (computedSteps.length === 0 || !computedSteps[computedSteps.length - 1].matched) {
      computedSteps.push({
        low,
        mid: -1,
        high,
        message: `Target ${target} not found in array (low > high).`,
      });
    }

    setSteps(computedSteps);
    setCurrentStep(0);
  }, [array, target]);

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
          <h4 className="font-semibold text-cyan-400 flex items-center gap-2">
            <span>Interactive Binary Search Visualizer</span>
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400">Target Value:</span>
            <select
              value={target}
              onChange={(e) => {
                setTarget(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="bg-slate-800 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200 outline-none"
            >
              {array.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
              <option value={99}>99 (Not Found)</option>
            </select>
          </div>
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-medium text-white shadow-sm"
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
      <div className="flex flex-wrap items-center justify-center gap-2 my-6 py-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {array.map((val, idx) => {
          const isMid = idx === step.mid;
          const isLow = idx === step.low;
          const isHigh = idx === step.high;
          const inRange = idx >= step.low && idx <= step.high;
          const isMatched = step.matched && isMid;

          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-11 h-14 sm:w-13 sm:h-16 rounded-xl flex items-center justify-center font-mono font-bold text-base transition-all duration-300 shadow-md ${
                  isMatched
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400 scale-110 z-10'
                    : isMid
                    ? 'bg-purple-500 text-white ring-4 ring-purple-400 scale-105 z-10'
                    : inRange
                    ? 'bg-slate-800 text-white border border-slate-600'
                    : 'bg-slate-900/40 text-slate-600 border border-slate-800/60 opacity-30'
                }`}
              >
                {val}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">idx {idx}</span>
              <div className="h-5 flex items-center gap-0.5">
                {isLow && (
                  <span className="text-[9px] font-bold text-cyan-400 px-1 bg-cyan-950/60 rounded">
                    L
                  </span>
                )}
                {isMid && (
                  <span className="text-[9px] font-bold text-purple-300 px-1 bg-purple-950/60 rounded">
                    MID
                  </span>
                )}
                {isHigh && (
                  <span className="text-[9px] font-bold text-amber-400 px-1 bg-amber-950/60 rounded">
                    H
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend & Details */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
          <span>Low ({step.low})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-purple-400" />
          <span>Mid ({step.mid >= 0 ? step.mid : 'N/A'})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-400" />
          <span>High ({step.high})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-slate-800 opacity-40 border border-slate-700" />
          <span>Eliminated Half</span>
        </div>
      </div>

      {/* Status Box */}
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm flex items-start gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
            step.matched ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
          }`}
        />
        <p className="font-mono text-xs text-slate-300">
          Step {currentStep + 1} of {steps.length}: {step.message}
        </p>
      </div>
    </div>
  );
}
