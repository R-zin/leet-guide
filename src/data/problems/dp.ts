import { Problem } from '@/types';

export const dpProblems: Problem[] = [
  {
    id: 70,
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: '1D Fibonacci State Transition',
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    companies: ['Amazon', 'Google', 'Apple', 'Meta', 'Microsoft'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1 step + 1 step, or 2 steps.'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways to climb to the top: 1+1+1, 1+2, or 2+1.'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    intuition: `To reach step \`i\`, you can only come from step \`i - 1\` (taking a 1-step hop) or step \`i - 2\` (taking a 2-step hop).
Therefore: \`ways(i) = ways(i - 1) + ways(i - 2)\`.
Base cases:
- \`ways(1) = 1\`
- \`ways(2) = 2\`
This is identical to the Fibonacci sequence! We only need two variables to track the previous two steps in O(1) space.`,
    algorithmSteps: [
      'If `n <= 2`, return `n`.',
      'Initialize `prev2 = 1` and `prev1 = 2`.',
      'For `i` from 3 to `n`:',
      '  `curr = prev1 + prev2`',
      '  `prev2 = prev1`',
      '  `prev1 = curr`',
      'Return `prev1`.'
    ],
    solutions: {
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
            
        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            curr = prev1 + prev2
            prev2 = prev1
            prev1 = curr
            
        return prev1`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; ++i) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Computes each step sequentially up to N in linear O(N) time. Uses only two scalar tracking variables, consuming O(1) auxiliary space.',
    commonPitfalls: [
      'Using naive recursion without memoization: runs in O(2^N) time and times out on n = 35+.',
      'Off-by-one with base cases (e.g. n=0 vs n=1).'
    ],
    runnable: {
      functionName: 'climbStairs',
      starterCode: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      testCases: [
        { input: [2], expected: 2 },
        { input: [3], expected: 3 },
        { input: [5], expected: 8 }
      ]
    }
  },
  {
    id: 198,
    title: 'House Robber',
    slug: 'house-robber',
    difficulty: 'Medium',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: '1D DP Decision (Take or Skip)',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '4',
        explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.'
      },
      {
        input: 'nums = [2,7,9,3,1]',
        output: '12',
        explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 400'
    ],
    intuition: `For each house \`i\`, we have two options:
1. Rob house \`i\`: Cannot rob house \`i - 1\`. Gain is \`nums[i] + max_loot(i - 2)\`.
2. Skip house \`i\`: Max loot is \`max_loot(i - 1)\`.
Recurrence:
\`rob(i) = max(rob(i - 1), rob(i - 2) + nums[i])\`.
Notice again that only the previous two houses' max values are needed, yielding O(1) space!`,
    algorithmSteps: [
      'Initialize `rob1 = 0` (max loot up to i - 2) and `rob2 = 0` (max loot up to i - 1).',
      'For each `num` in `nums`:',
      '  `new_rob = max(rob2, rob1 + num)`',
      '  `rob1 = rob2`',
      '  `rob2 = new_rob`',
      'Return `rob2`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        rob1, rob2 = 0, 0
        
        # [rob1, rob2, num, ...]
        for num in nums:
            new_rob = max(rob2, rob1 + num)
            rob1 = rob2
            rob2 = new_rob
            
        return rob2`,
      javascript: `function rob(nums) {
    let rob1 = 0, rob2 = 0;
    for (const num of nums) {
        const newRob = Math.max(rob2, rob1 + num);
        rob1 = rob2;
        rob2 = newRob;
    }
    return rob2;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int new_rob = max(rob2, rob1 + num);
            rob1 = rob2;
            rob2 = new_rob;
        }
        return rob2;
    }
};`,
      java: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int newRob = Math.max(rob2, rob1 + num);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Processes the array of houses in a single linear pass in O(N) time. Uses two rolling integer variables, requiring O(1) auxiliary space.',
    commonPitfalls: [
      'Assuming you must alternate even and odd index houses: houses like `[2, 1, 1, 2]` allow robbing index 0 and 3, skipping two adjacent houses.',
      'Allocating a full DP array of size N when two variables suffice.'
    ],
    runnable: {
      functionName: 'rob',
      starterCode: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const num of nums) {
    const newRob = Math.max(rob2, rob1 + num);
    rob1 = rob2;
    rob2 = newRob;
  }
  return rob2;
}`,
      testCases: [
        { input: [[1, 2, 3, 1]], expected: 4 },
        { input: [[2, 7, 9, 3, 1]], expected: 12 }
      ]
    }
  },
  {
    id: 322,
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: 'Unbounded Knapsack / Minimum Combinations',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Bloomberg'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.
You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    intuition: `Greedy choice (picking the largest coin first) FAILS for arbitrary denominations:
Example: coins = [1, 3, 4, 5], amount = 7.
Greedy: 5 + 1 + 1 = 3 coins.
Optimal: 4 + 3 = 2 coins!
We must use Dynamic Programming:
Define \`dp[a]\` = minimum coins needed to make amount \`a\`.
Recurrence:
\`dp[a] = min(dp[a - c] + 1)\` for all \`c\` in \`coins\` where \`a - c >= 0\`.
Base case: \`dp[0] = 0\`. All other entries initialized to infinity.`,
    algorithmSteps: [
      'Initialize `dp` array of size `amount + 1` filled with `amount + 1` (acting as infinity).',
      'Set `dp[0] = 0`.',
      'For `a` from 1 to `amount`:',
      '  For each `c` in `coins`:',
      '    If `a - c >= 0`:',
      '      `dp[a] = min(dp[a], 1 + dp[a - c])`',
      'Return `dp[amount]` if `dp[amount] <= amount` else `-1`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
                    
        return dp[amount] if dp[amount] != (amount + 1) else -1`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a - c >= 0) {
                dp[a] = Math.min(dp[a], 1 + dp[a - c]);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    timeComplexity: 'O(amount * len(coins))',
    spaceComplexity: 'O(amount)',
    complexityAnalysis: 'There are `amount` subproblems, and each subproblem iterates through `len(coins)` choices. Total operations = amount * len(coins). The DP table has length `amount + 1`, consuming O(amount) space.',
    commonPitfalls: [
      'Assuming greedy works: always verify whether problem requires DP.',
      'Using `Integer.MAX_VALUE` without caution in Java/C++: adding `1 + dp[a - c]` causes 32-bit overflow into negative numbers!'
    ],
    runnable: {
      functionName: 'coinChange',
      starterCode: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
      testCases: [
        { input: [[1, 2, 5], 11], expected: 3 },
        { input: [[2], 3], expected: -1 },
        { input: [[1], 0], expected: 0 }
      ]
    }
  },
  {
    id: 300,
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Medium',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: 'Patience Sorting / Binary Search LIS',
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    companies: ['Google', 'Meta', 'Microsoft', 'Amazon'],
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.
Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?`,
    examples: [
      {
        input: 'nums = [10,9,2,5,3,7,101,18]',
        output: '4',
        explanation: 'The longest increasing subsequence is [2,3,7,101], therefore the length is 4.'
      },
      {
        input: 'nums = [0,1,0,3,2,3]',
        output: '4'
      },
      {
        input: 'nums = [7,7,7,7,7,7,7]',
        output: '1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    intuition: `Standard DP takes O(N²): \`dp[i] = 1 + max(dp[j])\` for all \`j < i\` where \`nums[j] < nums[i]\`.
To achieve optimal O(N log N):
Use Patience Sorting (Binary Search):
Maintain an array \`tails\` where \`tails[i]\` stores the smallest tail of all increasing subsequences of length \`i + 1\` found so far.
For each \`x\` in \`nums\`:
- Binary search for the first element in \`tails >= x\` (bisect_left).
- If \`x\` is larger than all elements in \`tails\`, append \`x\` (we just discovered a longer subsequence!).
- Otherwise, replace \`tails[idx] = x\` (lowering the barrier for future numbers to extend this length!).
The length of \`tails\` at the end is the exact length of the LIS!`,
    algorithmSteps: [
      'Initialize an empty list `tails`.',
      'For each `num` in `nums`:',
      '  Use binary search (`bisect_left`) to find index `idx` of the first element in `tails` >= `num`.',
      '  If `idx == len(tails)`: append `num` to `tails`.',
      '  Else: replace `tails[idx] = num`.',
      'Return `len(tails)`.'
    ],
    solutions: {
      python: `import bisect
from typing import List

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
      javascript: `function lengthOfLIS(nums) {
    const tails = [];
    
    for (const x of nums) {
        let low = 0, high = tails.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (tails[mid] < x) low = mid + 1;
            else high = mid;
        }
        if (low === tails.length) {
            tails.push(x);
        } else {
            tails[low] = x;
        }
    }
    return tails.length;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) {
                tails.add(x);
            } else {
                tails.set(idx, x);
            }
        }
        return tails.size();
    }
}`
    },
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'For each of the N numbers, we perform a binary search taking O(log N) comparisons. Total time is O(N log N). The `tails` array stores at most N elements, using O(N) space.',
    commonPitfalls: [
      'Assuming `tails` represents the actual LIS sequence itself: `tails` only preserves minimal tail boundaries to correctly calculate the LENGTH, not the exact sequence of elements.',
      'Using `bisect_right` instead of `bisect_left` (the problem asks for strictly increasing, so equal numbers must replace, not append).'
    ],
    runnable: {
      functionName: 'lengthOfLIS',
      starterCode: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let low = 0, high = tails.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (tails[mid] < x) low = mid + 1;
      else high = mid;
    }
    if (low === tails.length) tails.push(x);
    else tails[low] = x;
  }
  return tails.length;
}`,
      testCases: [
        { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
        { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
        { input: [[7, 7, 7, 7, 7, 7, 7]], expected: 1 }
      ]
    }
  },
  {
    id: 62,
    title: 'Unique Paths',
    slug: 'unique-paths',
    difficulty: 'Medium',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: '2D Grid Path Counting',
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner (i.e., \`grid[0][0]\`). The robot tries to move to the bottom-right corner (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.
Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    examples: [
      {
        input: 'm = 3, n = 7',
        output: '28'
      },
      {
        input: 'm = 3, n = 2',
        output: '3',
        explanation: 'From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down'
      }
    ],
    constraints: [
      '1 <= m, n <= 100'
    ],
    intuition: `To reach cell \`(r, c)\`, the robot must come from either:
- The cell directly above \`(r - 1, c)\`
- The cell directly to the left \`(r, c - 1)\`
Therefore: \`dp[r][c] = dp[r - 1][c] + dp[r][c - 1]\`.
Base cases: The first row and first column have only 1 unique path (moving all right or all down).
Space optimization: Since each row only depends on the previous row and the cell to the left, we can collapse the 2D table into a single 1D array of size \`n\`!`,
    algorithmSteps: [
      'Initialize a 1D array `row` of size `n` filled with 1s.',
      'For `r` from 1 to `m - 1`:',
      '  For `c` from 1 to `n - 1`:',
      '    `row[c] += row[c - 1]`',
      'Return `row[-1]`.'
    ],
    solutions: {
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        
        for _ in range(1, m):
            for c in range(1, n):
                row[c] += row[c - 1]
                
        return row[-1]`,
      javascript: `function uniquePaths(m, n) {
    const row = new Array(n).fill(1);
    
    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            row[c] += row[c - 1];
        }
    }
    return row[n - 1];
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);
        for (int r = 1; r < m; ++r) {
            for (int c = 1; c < n; ++c) {
                row[c] += row[c - 1];
            }
        }
        return row[n - 1];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        
        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                row[c] += row[c - 1];
            }
        }
        return row[n - 1];
    }
}`
    },
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Iterates through the M x N grid cells once, requiring O(M * N) time. The rolling 1D row array uses only O(N) space.',
    commonPitfalls: [
      'Using combinatorial formula `(m + n - 2)! / ((m - 1)! * (n - 1)!)` without handling integer overflow: the factorial values quickly exceed 64-bit integer limits.'
    ],
    runnable: {
      functionName: 'uniquePaths',
      starterCode: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }
  return row[n - 1];
}`,
      testCases: [
        { input: [3, 7], expected: 28 },
        { input: [3, 2], expected: 3 }
      ]
    }
  },
  {
    id: 1143,
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    difficulty: 'Medium',
    topic: 'dynamic-programming',
    topicName: 'Dynamic Programming (1D & 2D)',
    pattern: '2D String Matrix Alignment',
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
A common subsequence of two strings is a subsequence that is common to both strings.`,
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: '3',
        explanation: 'The longest common subsequence is "ace" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: '3'
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: '0'
      }
    ],
    constraints: [
      '1 <= text1.length, text2.length <= 1000',
      'text1 and text2 consist of only lowercase English characters.'
    ],
    intuition: `Let \`dp[i][j]\` be the LCS length of substrings \`text1[i:]\` and \`text2[j:]\`.
Comparing \`text1[i]\` and \`text2[j]\`:
- If \`text1[i] == text2[j]\`: characters match! We gain 1 to the answer and move diagonally:
  \`dp[i][j] = 1 + dp[i + 1][j + 1]\`.
- If \`text1[i] != text2[j]\`: characters mismatch. We take the best of either skipping text1's char or text2's char:
  \`dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\`.
Bottom-up tabular traversal from bottom-right to top-left builds the answer.`,
    algorithmSteps: [
      'Create 2D table `dp` of dimensions `(len(text1) + 1) x (len(text2) + 1)` filled with 0s.',
      'Iterate `i` backwards from `len(text1) - 1` down to 0:',
      '  Iterate `j` backwards from `len(text2) - 1` down to 0:',
      '    If `text1[i] == text2[j]`: `dp[i][j] = 1 + dp[i + 1][j + 1]`.',
      '    Else: `dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])`.',
      'Return `dp[0][0]`.'
    ],
    solutions: {
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if text1[i] == text2[j]:
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
                    
        return dp[0][0]`,
      javascript: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (text1[i] === text2[j]) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }
    return dp[0][0];
}`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (text1[i] == text2[j]) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[0][0];
    }
};`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[0][0];
    }
}`
    },
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    complexityAnalysis: 'There are M * N states in the 2D matrix, each taking O(1) transition time. Total time and space is O(M * N). Space can optionally be optimized to O(min(M, N)) with 1D rolling rows.',
    commonPitfalls: [
      'Confusing subsequence (can skip letters) with substring (must be contiguous).',
      'Index out of bounds when sizing the DP grid (grid must be size `(M + 1) x (N + 1)` for 0 base cases).'
    ],
    runnable: {
      functionName: 'longestCommonSubsequence',
      starterCode: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  return dp[0][0];
}`,
      testCases: [
        { input: ['abcde', 'ace'], expected: 3 },
        { input: ['abc', 'abc'], expected: 3 },
        { input: ['abc', 'def'], expected: 0 }
      ]
    }
  }
];
