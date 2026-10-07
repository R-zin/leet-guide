'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { quizQuestions } from '@/data/quizData';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const accuracy = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/60 border border-purple-800/80 rounded-full text-xs font-mono text-purple-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Pattern Recognition Gym</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          DSA Pattern Quiz
        </h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Test your intuition. Can you look at an interview problem description and immediately identify the optimal data structure and algorithmic pattern?
        </p>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            <span>
              Current Score: <strong className="text-emerald-400">{score}</strong> / {currentIndex}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                Pattern Challenge
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Scenario snippet */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300">
              <span className="text-slate-500 block mb-1">Problem Scenario:</span>
              <span>{currentQuestion.scenario}</span>
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isCorrect = idx === currentQuestion.correctIndex;
                const isSelected = idx === selectedOption;

                let buttonStyles =
                  'bg-slate-950/80 border-slate-800 hover:bg-slate-800 text-slate-300';
                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyles =
                      'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                  } else if (isSelected) {
                    buttonStyles =
                      'bg-red-950/40 border-red-500 text-red-200 ring-2 ring-red-500/50';
                  } else {
                    buttonStyles = 'bg-slate-950/40 border-slate-850 opacity-40 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 ${buttonStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswered && (
                      <div>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                        {isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {isAnswered && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-fade-in text-xs leading-relaxed">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Explanation & Rationale</span>
                </span>
                <p className="text-slate-300">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-lg transition-all"
                >
                  <span>{currentIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-sm text-slate-400">
              You scored <span className="font-bold text-emerald-400">{score}</span> out of{' '}
              <span className="font-bold text-white">{quizQuestions.length}</span> ({accuracy}% accuracy)
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 max-w-sm mx-auto text-xs text-slate-300">
            {accuracy >= 80 ? (
              <p className="text-emerald-300">
                Outstanding pattern recognition! You possess the intuition needed to tackle Tier-1 interview questions.
              </p>
            ) : (
              <p className="text-slate-400">
                Great effort! Review the theoretical cheat sheets and problem breakdowns to sharpen your instinct.
              </p>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
