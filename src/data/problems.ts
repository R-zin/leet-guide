import { Problem } from '@/types';
import { arrayProblems } from './problems/arrays';
import { twoPointersProblems } from './problems/twoPointers';
import { stackProblems } from './problems/stacks';
import { binarySearchProblems } from './problems/binarySearch';
import { linkedListProblems } from './problems/linkedLists';
import { treeProblems } from './problems/trees';
import { graphProblems } from './problems/graphs';
import { dpProblems } from './problems/dp';
import { moreProblems } from './problems/more';

export const problems: Problem[] = [
  ...arrayProblems,
  ...twoPointersProblems,
  ...stackProblems,
  ...binarySearchProblems,
  ...linkedListProblems,
  ...treeProblems,
  ...graphProblems,
  ...dpProblems,
  ...moreProblems,
];

export const getProblemBySlug = (slug: string): Problem | undefined => {
  return problems.find((p) => p.slug === slug);
};

export const getProblemsByTopic = (topicSlug: string): Problem[] => {
  return problems.filter((p) => p.topic === topicSlug);
};
