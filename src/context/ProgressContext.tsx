'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Difficulty, ProblemStatus } from '@/types';
import { problems } from '@/data/problems';

interface ProgressContextType {
  solvedSlugs: string[];
  bookmarkedSlugs: string[];
  reviewSlugs: string[];
  toggleSolved: (slug: string) => void;
  toggleBookmarked: (slug: string) => void;
  toggleReview: (slug: string) => void;
  isSolved: (slug: string) => boolean;
  isBookmarked: (slug: string) => boolean;
  isReview: (slug: string) => boolean;
  getStatus: (slug: string) => ProblemStatus;
  getSolvedCountByDifficulty: (difficulty: Difficulty) => { solved: number; total: number };
  getSolvedCountByTopic: (topicSlug: string) => { solved: number; total: number };
  totalSolved: number;
  totalProblems: number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([]);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [reviewSlugs, setReviewSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSolved = localStorage.getItem('dsa_guide_solved');
      if (storedSolved) setSolvedSlugs(JSON.parse(storedSolved));

      const storedBookmarked = localStorage.getItem('dsa_guide_bookmarked');
      if (storedBookmarked) setBookmarkedSlugs(JSON.parse(storedBookmarked));

      const storedReview = localStorage.getItem('dsa_guide_review');
      if (storedReview) setReviewSlugs(JSON.parse(storedReview));
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('dsa_guide_solved', JSON.stringify(solvedSlugs));
      localStorage.setItem('dsa_guide_bookmarked', JSON.stringify(bookmarkedSlugs));
      localStorage.setItem('dsa_guide_review', JSON.stringify(reviewSlugs));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [solvedSlugs, bookmarkedSlugs, reviewSlugs, isLoaded]);

  const toggleSolved = (slug: string) => {
    setSolvedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleBookmarked = (slug: string) => {
    setBookmarkedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleReview = (slug: string) => {
    setReviewSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isSolved = (slug: string) => solvedSlugs.includes(slug);
  const isBookmarked = (slug: string) => bookmarkedSlugs.includes(slug);
  const isReview = (slug: string) => reviewSlugs.includes(slug);

  const getStatus = (slug: string): ProblemStatus => {
    if (solvedSlugs.includes(slug)) return 'solved';
    if (reviewSlugs.includes(slug)) return 'review';
    return 'unsolved';
  };

  const getSolvedCountByDifficulty = (difficulty: Difficulty) => {
    const list = problems.filter((p) => p.difficulty === difficulty);
    const solved = list.filter((p) => solvedSlugs.includes(p.slug)).length;
    return { solved, total: list.length };
  };

  const getSolvedCountByTopic = (topicSlug: string) => {
    const list = problems.filter((p) => p.topic === topicSlug);
    const solved = list.filter((p) => solvedSlugs.includes(p.slug)).length;
    return { solved, total: list.length };
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all your solved progress and bookmarks?')) {
      setSolvedSlugs([]);
      setBookmarkedSlugs([]);
      setReviewSlugs([]);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        solvedSlugs,
        bookmarkedSlugs,
        reviewSlugs,
        toggleSolved,
        toggleBookmarked,
        toggleReview,
        isSolved,
        isBookmarked,
        isReview,
        getStatus,
        getSolvedCountByDifficulty,
        getSolvedCountByTopic,
        totalSolved: solvedSlugs.length,
        totalProblems: problems.length,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
