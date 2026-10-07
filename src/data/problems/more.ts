import { Problem } from '@/types';

export const moreProblems: Problem[] = [
  // HEAPS
  {
    id: 215,
    title: 'Kth Largest Element in an Array',
    slug: 'kth-largest-element-in-an-array',
    difficulty: 'Medium',
    topic: 'heaps-and-priority-queues',
    topicName: 'Heaps & Priority Queues',
    pattern: 'Min-Heap of Size K / Quickselect',
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    companies: ['Meta', 'Amazon', 'Apple', 'Google', 'Microsoft'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array.
Note that it is the \`k\`-th largest element in the sorted order, not the \`k\`-th distinct element.
Can you solve it without sorting?`,
    examples: [
      {
        input: 'nums = [3,2,1,5,6,4], k = 2',
        output: '5'
      },
      {
        input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
        output: '4'
      }
    ],
    constraints: [
      '1 <= k <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    intuition: `Sorting the array takes O(N log N).
We can optimize this with a Min-Heap of size K:
Maintain a heap containing the K largest elements seen so far.
For each element \`x\` in \`nums\`:
- Push \`x\` into the heap.
- If heap size exceeds K, pop the minimum.
After scanning all elements, the heap contains the K largest elements, and the root is the Kth largest element!
Time is O(N log K) and space is O(K).`,
    algorithmSteps: [
      'Initialize an empty min-heap `heap`.',
      'For each `num` in `nums`:',
      '  Push `num` to `heap`.',
      '  If `len(heap) > k`, pop the smallest element.',
      'Return the top element of `heap`.'
    ],
    solutions: {
      python: `import heapq
from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`,
      javascript: `function findKthLargest(nums, k) {
    // Quickselect or Min-Heap simulation
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> min_heap;
        for (int num : nums) {
            min_heap.push(num);
            if (min_heap.size() > k) {
                min_heap.pop();
            }
        }
        return min_heap.top();
    }
};`,
      java: `import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`
    },
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    complexityAnalysis: 'Maintaining a heap of size K across N elements takes O(N log K). Heap space is capped at K, using O(K) space.',
    commonPitfalls: [
      'Using a Max-Heap of size N: takes O(N + K log N) which uses O(N) space instead of O(K).',
      'Confusing Kth largest with Kth distinct (duplicate values count).'
    ],
    runnable: {
      functionName: 'findKthLargest',
      starterCode: `function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,
      testCases: [
        { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 }
      ]
    }
  },

  // BACKTRACKING
  {
    id: 78,
    title: 'Subsets',
    slug: 'subsets',
    difficulty: 'Medium',
    topic: 'backtracking',
    topicName: 'Backtracking & Combinatorial Search',
    pattern: 'Power Set Generation (Decision Tree)',
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]'
      },
      {
        input: 'nums = [0]',
        output: '[[],[0]]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique.'
    ],
    intuition: `For an array of N unique elements, there are 2^N subsets.
At each index \`i\`, we have a binary choice:
1. Include \`nums[i]\` in the current subset.
2. Exclude \`nums[i]\` from the current subset.
Alternatively, in loop-based backtracking, every state \`path\` is an independent valid subset. We add \`list(path)\` to results, iterate through remaining candidates from \`start\`, make a choice, recurse, and pop to undo.`,
    algorithmSteps: [
      'Initialize `res = []`.',
      'Define helper function `backtrack(start, path)`:',
      '  Append a copy of `path` to `res`.',
      '  For `i` from `start` to `len(nums) - 1`:',
      '    `path.append(nums[i])` (Choose)',
      '    `backtrack(i + 1, path)` (Explore)',
      '    `path.pop()` (Un-choose)',
      'Call `backtrack(0, [])` and return `res`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        
        def backtrack(start, path):
            res.append(list(path))
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
                
        backtrack(0, [])
        return res`,
      javascript: `function subsets(nums) {
    const res = [];
    
    function backtrack(start, path) {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(0, []);
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
    void backtrack(int start, vector<int>& path, const vector<int>& nums, vector<vector<int>>& res) {
        res.push_back(path);
        for (size_t i = start; i < nums.size(); ++i) {
            path.push_back(nums[i]);
            backtrack(i + 1, path, nums, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, path, nums, res);
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, new ArrayList<>(), nums, res);
        return res;
    }
    
    private void backtrack(int start, List<Integer> path, int[] nums, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(i + 1, path, nums, res);
            path.remove(path.size() - 1);
        }
    }
}`
    },
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'There are 2^N subsets generated, and copying each subset of average length N/2 into results takes O(N). Call stack depth is at most N, taking O(N) auxiliary space.',
    commonPitfalls: [
      'Appending `path` directly to results instead of a copy (`list(path)` or `[...path]`), resulting in empty arrays at the end!',
      'Passing `start + 1` instead of `i + 1` in the recursive call.'
    ],
    runnable: {
      functionName: 'subsets',
      starterCode: `function subsets(nums) {
  const res = [];
  function backtrack(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      testCases: [
        { input: [[1, 2]], expected: [[], [1], [1, 2], [2]] }
      ]
    }
  },
  {
    id: 39,
    title: 'Combination Sum',
    slug: 'combination-sum',
    difficulty: 'Medium',
    topic: 'backtracking',
    topicName: 'Backtracking & Combinatorial Search',
    pattern: 'Backtracking with Reuse',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.
The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      {
        input: 'candidates = [2,3,6,7], target = 7',
        output: '[[2,2,3],[7]]',
        explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.'
      },
      {
        input: 'candidates = [2,3,5], target = 8',
        output: '[[2,2,2,2],[2,3,3],[3,5]]'
      }
    ],
    constraints: [
      '1 <= candidates.length <= 30',
      '2 <= candidates[i] <= 40',
      'All elements of candidates are distinct.',
      '1 <= target <= 40'
    ],
    intuition: `Because each candidate can be reused unlimited times:
When we choose candidate \`candidates[i]\`, the recursive call passes \`i\` (NOT \`i + 1\`)!
To prevent infinite recursion, decrement remaining target by \`candidates[i]\`.
Base cases:
- \`remain == 0\`: valid combination, record \`list(path)\`.
- \`remain < 0\`: exceeded target, prune branch.`,
    algorithmSteps: [
      'Initialize `res = []`.',
      'Define helper function `backtrack(remain, start, path)`:',
      '  If `remain == 0`: `res.append(list(path))`, return.',
      '  If `remain < 0`: return (prune).',
      '  For `i` from `start` to `len(candidates) - 1`:',
      '    `path.append(candidates[i])`',
      '    `backtrack(remain - candidates[i], i, path)` (pass `i` for reuse)',
      '    `path.pop()`',
      'Call `backtrack(target, 0, [])` and return `res`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        
        def backtrack(remain, start, path):
            if remain == 0:
                res.append(list(path))
                return
            if remain < 0:
                return
                
            for i in range(start, len(candidates)):
                path.append(candidates[i])
                backtrack(remain - candidates[i], i, path)
                path.pop()
                
        backtrack(target, 0, [])
        return res`,
      javascript: `function combinationSum(candidates, target) {
    const res = [];
    
    function backtrack(remain, start, path) {
        if (remain === 0) {
            res.push([...path]);
            return;
        }
        if (remain < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(remain - candidates[i], i, path);
            path.pop();
        }
    }
    
    backtrack(target, 0, []);
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
    void backtrack(int remain, int start, vector<int>& path, const vector<int>& candidates, vector<vector<int>>& res) {
        if (remain == 0) {
            res.push_back(path);
            return;
        }
        if (remain < 0) return;
        
        for (size_t i = start; i < candidates.size(); ++i) {
            path.push_back(candidates[i]);
            backtrack(remain - candidates[i], i, path, candidates, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(target, 0, path, candidates, res);
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(target, 0, new ArrayList<>(), candidates, res);
        return res;
    }
    
    private void backtrack(int remain, int start, List<Integer> path, int[] candidates, List<List<Integer>> res) {
        if (remain == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        if (remain < 0) return;
        
        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            backtrack(remain - candidates[i], i, path, candidates, res);
            path.remove(path.size() - 1);
        }
    }
}`
    },
    timeComplexity: 'O(N^(T/M))',
    spaceComplexity: 'O(T/M)',
    complexityAnalysis: 'Where T is target and M is minimum candidate value. Recursion tree depth is at most T / M. Space is O(T / M) for recursion call stack.',
    commonPitfalls: [
      'Sorting candidates is optional, but if sorted, we can break early when `candidates[i] > remain` to optimize pruning.',
      'Passing 0 instead of `start` in the recursive loop, generating duplicate permutations like `[2, 3]` and `[3, 2]`.'
    ],
    runnable: {
      functionName: 'combinationSum',
      starterCode: `function combinationSum(candidates, target) {
  const res = [];
  function backtrack(remain, start, path) {
    if (remain === 0) { res.push([...path]); return; }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(remain - candidates[i], i, path);
      path.pop();
    }
  }
  backtrack(target, 0, []);
  return res;
}`,
      testCases: [
        { input: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]] }
      ]
    }
  },

  // GREEDY
  {
    id: 55,
    title: 'Jump Game',
    slug: 'jump-game',
    difficulty: 'Medium',
    topic: 'greedy-and-intervals',
    topicName: 'Greedy Algorithms & Intervals',
    pattern: 'Farthest Reach Greedy Tracking',
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    companies: ['Amazon', 'Apple', 'Meta', 'Google', 'Microsoft'],
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: 'true',
        explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.'
      },
      {
        input: 'nums = [3,2,1,0,4]',
        output: 'false',
        explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    intuition: `Maintain a variable \`max_reach\` representing the furthest index reachable so far.
Iterate through the array:
- If current index \`i > max_reach\`: we are stranded and cannot even reach index \`i\`! Return \`false\`.
- Update \`max_reach = max(max_reach, i + nums[i])\`.
- If \`max_reach >= len(nums) - 1\`: we can reach the end! Return \`true\`.`,
    algorithmSteps: [
      'Initialize `max_reach = 0`.',
      'For `i, jump` in enumerate(nums):',
      '  If `i > max_reach`: return False.',
      '  `max_reach = max(max_reach, i + jump)`',
      '  If `max_reach >= len(nums) - 1`: return True.',
      'Return True.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_reach = 0
        for i, jump in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + jump)
            if max_reach >= len(nums) - 1:
                return True
        return True`,
      javascript: `function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return true;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int max_reach = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (i > max_reach) return false;
            max_reach = max(max_reach, i + nums[i]);
            if (max_reach >= nums.size() - 1) return true;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Single pass through array of length N requires O(N) time. Uses only a single integer tracking variable, requiring O(1) space.',
    commonPitfalls: [
      'Using DP or BFS which takes O(N²) or O(N) space when a simple greedy O(1) space tracker suffices.',
      'Forgetting that a single-element array `[0]` returns `true` because you already start at the end.'
    ],
    runnable: {
      functionName: 'canJump',
      starterCode: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
      testCases: [
        { input: [[2, 3, 1, 1, 4]], expected: true },
        { input: [[3, 2, 1, 0, 4]], expected: false }
      ]
    }
  },
  {
    id: 56,
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    topic: 'greedy-and-intervals',
    topicName: 'Greedy Algorithms & Intervals',
    pattern: 'Interval Sorting and Merging',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    intuition: `1. Sort the intervals by their start times: \`intervals.sort(key=lambda x: x[0])\`.
2. Iterate through intervals:
   - If \`merged\` is empty, or the current interval's start is strictly greater than the last merged interval's end: no overlap! Append it directly.
   - Otherwise, there is an overlap: merge them by updating \`merged[-1][1] = max(merged[-1][1], current[1])\`.`,
    algorithmSteps: [
      'Sort `intervals` ascending by start time.',
      'Initialize `merged = []`.',
      'For each `interval` in `intervals`:',
      '  If `not merged` or `merged[-1][1] < interval[0]`:',
      '    `merged.append(interval)`',
      '  Else: `merged[-1][1] = max(merged[-1][1], interval[1])`',
      'Return `merged`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        
        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])
                
        return merged`,
      javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];
    
    for (const interval of intervals) {
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }
    return merged;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        
        for (const auto& interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }
        return merged;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
    },
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Sorting the intervals takes O(N log N). The linear scan takes O(N). Output space is O(N) to store merged intervals.',
    commonPitfalls: [
      'Assuming input intervals are already sorted (they are often unsorted).',
      'Using `merged[-1][1] = interval[1]` instead of `max(merged[-1][1], interval[1])` (an interval could be completely subsumed, e.g. `[1, 5]` and `[2, 3]`).'
    ],
    runnable: {
      functionName: 'merge',
      starterCode: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }
  return merged;
}`,
      testCases: [
        { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
        { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
      ]
    }
  },

  // TRIES
  {
    id: 208,
    title: 'Implement Trie (Prefix Tree)',
    slug: 'implement-trie-prefix-tree',
    difficulty: 'Medium',
    topic: 'tries',
    topicName: 'Tries (Prefix Trees)',
    pattern: 'N-ary Prefix Tree Node Linking',
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
Implement the \`Trie\` class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string word into the trie.
- \`boolean search(String word)\` Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
- \`boolean startsWith(String prefix)\` Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.`,
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: '[null, null, true, false, true, null, true]',
        explanation: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True'
      }
    ],
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    intuition: `Each \`TrieNode\` holds:
1. \`children\`: mapping each character to the corresponding child TrieNode.
2. \`is_end_of_word\`: boolean flag indicating if a complete word terminates at this node.
- \`insert(word)\`: traverse character by character, creating new child nodes as needed. Set \`is_end_of_word = True\` at the final node.
- \`search(word)\`: traverse characters. If any character is missing, return false. At the end, return \`node.is_end_of_word\`.
- \`startsWith(prefix)\`: traverse prefix. If any character is missing, return false. If prefix is found, return true regardless of \`is_end_of_word\`.`,
    algorithmSteps: [
      'Define `TrieNode` with `children = {}` and `is_end = False`.',
      'insert(word): walk through chars, adding child nodes; set `is_end = True`.',
      'search(word): walk through chars; return `node.is_end`.',
      'startsWith(prefix): walk through chars; return true if path exists.'
    ],
    solutions: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
      javascript: `class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
}`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Trie {
    struct Node {
        Node* children[26] = {nullptr};
        bool is_end = false;
    };
    Node* root;
public:
    Trie() { root = new Node(); }
    
    void insert(string word) {
        Node* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) node->children[idx] = new Node();
            node = node->children[idx];
        }
        node->is_end = true;
    }
    
    bool search(string word) {
        Node* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return node->is_end;
    }
    
    bool startsWith(string prefix) {
        Node* node = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return true;
    }
};`,
      java: `class Trie {
    private class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }
    private Node root;

    public Trie() { root = new Node(); }

    public void insert(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) node.children[idx] = new Node();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        Node node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;
    }
}`
    },
    timeComplexity: 'O(L) for insert, search, startsWith',
    spaceComplexity: 'O(Total Chars)',
    complexityAnalysis: 'Where L is the length of the query string or word. Each character lookup takes O(1) time. Space complexity is proportional to the total number of characters across all unique prefixes inserted.',
    commonPitfalls: [
      'Returning `true` in `search(word)` without checking `node.is_end`: finding prefix is not enough for exact word search.',
      'Allocating full 26-pointer arrays in deep sparse nodes if memory is restricted.'
    ]
  },

  // BIT MANIPULATION
  {
    id: 136,
    title: 'Single Number',
    slug: 'single-number',
    difficulty: 'Easy',
    topic: 'bit-manipulation',
    topicName: 'Bit Manipulation & Low-Level Math',
    pattern: 'Bitwise XOR Self-Cancellation',
    leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    companies: ['Amazon', 'Google', 'Meta', 'Apple'],
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1'
      },
      {
        input: 'nums = [4,1,2,1,2]',
        output: '4'
      },
      {
        input: 'nums = [1]',
        output: '1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4',
      'Each element in the array appears twice except for one element which appears only once.'
    ],
    intuition: `Using a Hash Set takes O(N) auxiliary space.
To achieve O(1) space, exploit the algebraic properties of Bitwise XOR (\`^\`):
1. \`x ^ 0 = x\`
2. \`x ^ x = 0\`
3. XOR is associative and commutative: \`a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b\`.
XORing all elements together cancels out every duplicated number, leaving strictly the single unique number!`,
    algorithmSteps: [
      'Initialize `res = 0`.',
      'For each `num` in `nums`: `res ^= num`.',
      'Return `res`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res ^= num
        return res`,
      javascript: `function singleNumber(nums) {
    let res = 0;
    for (const num of nums) {
        res ^= num;
    }
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int num : nums) res ^= num;
        return res;
    }
};`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int num : nums) res ^= num;
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Processes N numbers in a single loop using 1 XOR operation per number in O(N) time. Uses only a single integer variable, requiring O(1) space.',
    commonPitfalls: [
      'Using a Hash Map or sorting (sorting takes O(N log N) and hash map uses O(N) space, violating constraints).'
    ],
    runnable: {
      functionName: 'singleNumber',
      starterCode: `function singleNumber(nums) {
  let res = 0;
  for (const num of nums) res ^= num;
  return res;
}`,
      testCases: [
        { input: [[2, 2, 1]], expected: 1 },
        { input: [[4, 1, 2, 1, 2]], expected: 4 }
      ]
    }
  },
  {
    id: 191,
    title: 'Number of 1 Bits',
    slug: 'number-of-1-bits',
    difficulty: 'Easy',
    topic: 'bit-manipulation',
    topicName: 'Bit Manipulation & Low-Level Math',
    pattern: "Brian Kernighan's Bit Clearing",
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    companies: ['Apple', 'Microsoft', 'Amazon'],
    description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).`,
    examples: [
      {
        input: 'n = 11',
        output: '3',
        explanation: 'The input binary string 1011 has a total of three set bits.'
      },
      {
        input: 'n = 128',
        output: '1',
        explanation: 'The input binary string 10000000 has a total of one set bit.'
      },
      {
        input: 'n = 2147483645',
        output: '30'
      }
    ],
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    intuition: `Standard approach: check the lowest bit \`n & 1\`, then shift right \`n >>= 1\`. Runs in 32 iterations.
Brian Kernighan's Algorithm:
Notice that \`n & (n - 1)\` clears the least significant set bit in \`n\`!
Example: 12 (1100) & 11 (1011) = 8 (1000). The lowest 1-bit is wiped out in a single step!
We repeat \`n &= (n - 1)\` until \`n == 0\`.
Iterations equal ONLY the number of 1-bits!`,
    algorithmSteps: [
      'Initialize `count = 0`.',
      'While `n > 0`:',
      '  `n &= (n - 1)`',
      '  `count += 1`',
      'Return `count`.'
    ],
    solutions: {
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count`,
      javascript: `function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
      cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`
    },
    timeComplexity: 'O(K) where K is number of set bits (at most 32)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Loops exactly K times where K is the count of 1-bits. In the worst case (all 1s), it takes 32 iterations, which is O(1) constant time.',
    commonPitfalls: [
      'Shifting negative numbers in languages with arithmetic vs logical shift (use `>>>` in Java/JS if treating as unsigned).',
      'Thinking `n & (n - 1)` is O(N) — it is bounded by 32 bits.'
    ],
    runnable: {
      functionName: 'hammingWeight',
      starterCode: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= (n - 1);
    count++;
  }
  return count;
}`,
      testCases: [
        { input: [11], expected: 3 },
        { input: [128], expected: 1 }
      ]
    }
  }
];
