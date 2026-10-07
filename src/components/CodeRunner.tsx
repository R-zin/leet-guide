'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { RunnableConfig } from '@/types';

interface TestResult {
  testIndex: number;
  inputStr: string;
  expectedStr: string;
  actualStr: string;
  passed: boolean;
  timeMs: number;
  error?: string;
}

export default function CodeRunner({ config }: { config: RunnableConfig }) {
  const [code, setCode] = useState<string>(config.starterCode);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setGlobalError(null);
    const testResults: TestResult[] = [];

    try {
      // Evaluate user function safely in function scope
      // eslint-disable-next-line no-new-func
      const runner = new Function(`
        ${code}
        return ${config.functionName};
      `)();

      if (typeof runner !== 'function') {
        throw new Error(`Function "${config.functionName}" is not defined or is not a function.`);
      }

      for (let i = 0; i < config.testCases.length; i++) {
        const tc = config.testCases[i];
        const inputCopy = JSON.parse(JSON.stringify(tc.input));
        const inputStr = JSON.stringify(tc.input);
        const expectedStr = JSON.stringify(tc.expected);

        const startTime = performance.now();
        let actual: any;
        let errorMsg: string | undefined;

        try {
          actual = runner(...inputCopy);
        } catch (err: any) {
          errorMsg = err.message || String(err);
        }
        const endTime = performance.now();
        const actualStr = actual !== undefined ? JSON.stringify(actual) : 'undefined';

        let passed = false;
        if (!errorMsg) {
          // Normalize sorting for nested arrays/sets if needed, or strict deep equality
          passed = actualStr === expectedStr;
        }

        testResults.push({
          testIndex: i + 1,
          inputStr,
          expectedStr,
          actualStr,
          passed,
          timeMs: Math.round((endTime - startTime) * 100) / 100,
          error: errorMsg,
        });
      }

      setResults(testResults);
    } catch (err: any) {
      setGlobalError(err.message || String(err));
      setResults(null);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(config.starterCode);
    setResults(null);
    setGlobalError(null);
  };

  const allPassed = results && results.every((r) => r.passed);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl my-6">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          <span className="text-xs font-mono text-slate-400 ml-2">
            In-Browser Sandbox (JavaScript Execution)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            title="Reset to default solution"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Test Cases'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="p-2 bg-slate-950 font-mono text-xs">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={11}
          spellCheck={false}
          className="w-full bg-transparent text-emerald-300 outline-none resize-y p-2 font-mono leading-relaxed"
        />
      </div>

      {/* Execution Results */}
      {globalError && (
        <div className="p-4 bg-red-950/40 border-t border-red-900 text-red-200 text-xs font-mono">
          <p className="font-semibold text-red-400 mb-1">Execution Error:</p>
          <pre className="whitespace-pre-wrap">{globalError}</pre>
        </div>
      )}

      {results && (
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Test Case Results
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                allPassed
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-red-950 text-red-400 border border-red-800'
              }`}
            >
              {allPassed ? '✓ All Tests Passed' : '✗ Some Tests Failed'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {results.map((r) => (
              <div
                key={r.testIndex}
                className={`p-3 rounded-lg border text-xs font-mono ${
                  r.passed
                    ? 'bg-emerald-950/20 border-emerald-900/60 text-slate-300'
                    : 'bg-red-950/20 border-red-900/60 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {r.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className="font-bold text-white">Case {r.testIndex}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    {r.timeMs}ms
                  </span>
                </div>

                <div className="space-y-1 text-[11px] pl-6">
                  <div>
                    <span className="text-slate-500">Input: </span>
                    <span className="text-slate-200">{r.inputStr}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Expected: </span>
                    <span className="text-emerald-400 font-semibold">{r.expectedStr}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Output: </span>
                    <span className={r.passed ? 'text-emerald-300' : 'text-red-400 font-semibold'}>
                      {r.actualStr}
                    </span>
                  </div>
                  {r.error && (
                    <div className="text-red-400">
                      <span className="text-red-500 font-semibold">Error: </span>
                      {r.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
