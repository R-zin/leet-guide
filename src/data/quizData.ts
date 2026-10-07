import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which pattern is optimal for finding the longest contiguous subarray where the sum equals K in an array containing both negative and positive numbers?',
    scenario: 'nums = [1, -1, 5, -2, 3], k = 3. Find max length of contiguous subarray summing to k.',
    options: [
      'Two Pointers (converging from ends)',
      'Sliding Window with two pointers',
      'Prefix Sums with a Hash Map',
      'Binary Search on Answer Space'
    ],
    correctIndex: 2,
    explanation: 'Because the array contains negative numbers, the running sum is NOT monotonic (sum can increase and decrease). Sliding window fails because expanding right can decrease sum and shrinking left can increase sum. Prefix Sum + Hash Map stores the earliest occurrence of each prefix sum in O(N) time.',
    topic: 'arrays-and-hashing',
    pattern: 'Prefix Sums + Hash Map'
  },
  {
    id: 'q2',
    question: 'You are given an array of temperatures and asked to find how many days until a warmer day for each index. What is the optimal data structure and time complexity?',
    scenario: 'Daily temperatures = [73, 74, 75, 71, 69, 72, 76, 73]. For each day, find days until warmer temperature.',
    options: [
      'Binary Search Tree in O(N log N)',
      'Monotonic Decreasing Stack in O(N)',
      'Priority Queue (Max Heap) in O(N log N)',
      'Dynamic Programming in O(N²)'
    ],
    correctIndex: 1,
    explanation: 'A monotonic decreasing stack keeps track of indices waiting for a warmer temperature. When a warmer day arrives, it resolves all previous cooler days on top of the stack in amortized O(N) time.',
    topic: 'stacks-and-queues',
    pattern: 'Monotonic Stack'
  },
  {
    id: 'q3',
    question: 'Which algorithm finds the shortest path between two points in an unweighted grid with obstacles?',
    scenario: 'You are given a 2D matrix representing a maze with walls (1) and empty spaces (0). Find minimum steps from (0,0) to (R-1, C-1).',
    options: [
      'Depth-First Search (DFS)',
      'Dijkstra\'s Algorithm',
      'Breadth-First Search (BFS)',
      'Bellman-Ford Algorithm'
    ],
    correctIndex: 2,
    explanation: 'BFS explores in concentric outward waves. In an unweighted graph, the first time the target node is visited, it is guaranteed to have taken the minimal number of steps. DFS may find a path, but not necessarily the shortest.',
    topic: 'graphs',
    pattern: 'Breadth-First Search'
  },
  {
    id: 'q4',
    question: 'How do you detect whether an undirected graph has a cycle in near-constant time per edge addition?',
    scenario: 'Edges are added one by one to an undirected graph. Return the first edge that creates a cycle.',
    options: [
      'Topological Sort with in-degrees',
      'Disjoint Set Union (Union-Find) with path compression',
      'Breadth-First Search from every vertex',
      'Floyd-Warshall algorithm'
    ],
    correctIndex: 1,
    explanation: 'In an undirected graph, if find(u) == find(v) before adding edge (u, v), vertices u and v are already connected through another path, meaning adding (u, v) creates a cycle! With path compression, Union-Find runs in near-constant O(α(N)).',
    topic: 'graphs',
    pattern: 'Disjoint Set Union'
  },
  {
    id: 'q5',
    question: 'You must find the Kth largest element in an unsorted stream of numbers. What is the optimal data structure to maintain only the relevant state?',
    scenario: 'Incoming numbers stream continuously. At any point, query the Kth largest number.',
    options: [
      'Max-Heap of size N',
      'Min-Heap of size K',
      'Sorted Array with binary insertion in O(N)',
      'Hash Map of frequencies'
    ],
    correctIndex: 1,
    explanation: 'A Min-Heap of size K maintains the K largest elements seen so far. The root of the Min-Heap is always the smallest of these K elements, which is precisely the Kth largest overall! Insertion is O(log K) and peek is O(1).',
    topic: 'heaps-and-priority-queues',
    pattern: 'Min-Heap of Size K'
  },
  {
    id: 'q6',
    question: 'Given an array of tasks with cooldown intervals, what algorithm optimizes schedule length to minimize idle time?',
    scenario: 'Tasks = ["A","A","A","B","B","B"], cooldown n = 2.',
    options: [
      'Backtracking / Brute force search',
      'Greedy algorithm tracking the most frequent task count',
      'Bellman-Ford algorithm',
      'Binary Search on Answer'
    ],
    correctIndex: 1,
    explanation: 'Task Scheduler is solved greedily by scheduling the task with the maximum frequency first. The idle slots are determined by (max_freq - 1) * (n - (count of tasks with max_freq - 1)).',
    topic: 'greedy-and-intervals',
    pattern: 'Greedy Frequency Tracking'
  },
  {
    id: 'q7',
    question: 'You need to find a value X that minimizes a function f(X), where f(X) is monotonically decreasing up to a point and then monotonically increasing, or boolean predicate isPossible(X) transitions from False to True. Which pattern applies?',
    scenario: 'Koko Eating Bananas: find min speed K such that total hours <= H.',
    options: [
      'Sliding Window',
      'Two Pointers',
      'Binary Search on the Answer Space',
      'Greedy intervals'
    ],
    correctIndex: 2,
    explanation: 'When the feasibility condition is monotonic (if speed K works, all speeds > K also work), we binary search the answer range [1, max_speed].',
    topic: 'binary-search',
    pattern: 'Binary Search on Answer'
  },
  {
    id: 'q8',
    question: 'What is the space complexity of solving Fibonacci or House Robber using iterative DP with rolling variables?',
    scenario: 'rob(i) = max(rob(i-1), rob(i-2) + nums[i])',
    options: [
      'O(N) memory',
      'O(log N) memory',
      'O(1) memory',
      'O(N²) memory'
    ],
    correctIndex: 2,
    explanation: 'Because each state depends strictly on the immediate previous two states (i-1 and i-2), we only need to preserve two scalar variables, reducing auxiliary space from O(1).',
    topic: 'dynamic-programming',
    pattern: 'Space-Optimized DP'
  },
  {
    id: 'q9',
    question: 'You are given Q range updates [L, R, val], each adding val to array elements from index L to R. Then you must output the final array of length N. What is the optimal time complexity?',
    scenario: 'N = 100,000, Q = 100,000. Apply all range updates and return the resulting array.',
    options: [
      'O(N * Q) using a standard iterative loop',
      'O(N + Q) using a Difference Array',
      'O(Q * log N) using a Hash Map',
      'O(N log Q) using Binary Search'
    ],
    correctIndex: 1,
    explanation: 'With a Difference Array, each range update adds val at L and subtracts val at R+1 in O(1) time. After processing all Q updates in O(Q) time, computing the prefix sum once in O(N) reconstructs the final array in O(N + Q) overall time.',
    topic: 'prefix-sums',
    pattern: 'Difference Array'
  },
  {
    id: 'q10',
    question: 'Why does standard Breadth-First Search (BFS) fail to find the shortest path in a weighted graph with varied positive edge weights?',
    scenario: 'Graph has edge A -> B with weight 10, and path A -> C -> B with edge weights 2 and 3.',
    options: [
      'BFS cannot handle cycles in graphs',
      'BFS explores by hop count (edges), ignoring edge costs—so fewer edges might cost more than multiple light edges',
      'BFS requires an undirected graph to function correctly',
      'BFS uses exponential stack memory compared to DFS'
    ],
    correctIndex: 1,
    explanation: "Standard BFS assumes all edges have uniform weight 1, finding the path with fewest edge transitions. When edge weights vary, a path with fewer hops can have a much higher total weight (e.g., single hop 10 vs two hops 2+3=5). Dijkstra's Algorithm resolves this by expanding minimum-cost paths first using a Priority Queue in O((V + E) log V).",
    topic: 'graphs',
    pattern: "Dijkstra's Shortest Path"
  }
];
