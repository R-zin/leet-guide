import { Problem } from '@/types';

export const prefixSumProblems: Problem[] = [
  {
    id: 560,
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    difficulty: 'Medium',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: 'Running Prefix Sum + Hash Map Frequency',
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.
A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: 'nums = [1,1,1], k = 2',
        output: '2',
        explanation: 'Subarrays [1, 1] at index [0, 1] and [1, 2] both sum to 2.'
      },
      {
        input: 'nums = [1,2,3], k = 3',
        output: '2',
        explanation: 'Subarrays [1, 2] and [3] both sum to 3.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '-1000 <= nums[i] <= 1000',
      '-10^7 <= k <= 10^7'
    ],
    intuition: `Why does Sliding Window fail?
Because \`nums\` contains negative numbers! In an array with negative values, expanding right does not monotonically increase the sum, and shrinking left does not monotonically decrease it.
Key Mathematical Insight:
Let \`prefix[i]\` be the cumulative sum from index 0 to \`i\`.
The sum of any contiguous subarray \`nums[j...i]\` is:
\`sum(nums[j...i]) = prefix[i] - prefix[j - 1]\`
Setting this equal to \`k\`:
\`prefix[i] - prefix[j - 1] = k  ===>  prefix[j - 1] = prefix[i] - k\`
As we calculate running \`curr_sum\`, we query a Hash Map for how many times \`curr_sum - k\` has appeared previously!
Initialize the map with \`{0: 1}\` to account for subarrays starting at index 0.`,
    algorithmSteps: [
      'Initialize `count = 0`, `curr_sum = 0`, and `prefix_map = {0: 1}`.',
      'Iterate through each number in `nums`:',
      '  `curr_sum += num`',
      '  If `(curr_sum - k)` in `prefix_map`: `count += prefix_map[curr_sum - k]`.',
      '  Increment `prefix_map[curr_sum]` by 1.',
      'Return `count`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        curr_sum = 0
        prefix_map = {0: 1}  # prefix_sum -> frequency
        
        for num in nums:
            curr_sum += num
            if (curr_sum - k) in prefix_map:
                count += prefix_map[curr_sum - k]
            prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
            
        return count`,
      javascript: `function subarraySum(nums, k) {
    let count = 0;
    let currSum = 0;
    const prefixMap = new Map();
    prefixMap.set(0, 1);
    
    for (const num of nums) {
        currSum += num;
        if (prefixMap.has(currSum - k)) {
            count += prefixMap.get(currSum - k);
        }
        prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);
    }
    return count;
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int count = 0;
        int curr_sum = 0;
        unordered_map<int, int> prefix_map;
        prefix_map[0] = 1;
        
        for (int num : nums) {
            curr_sum += num;
            if (prefix_map.count(curr_sum - k)) {
                count += prefix_map[curr_sum - k];
            }
            prefix_map[curr_sum]++;
        }
        return count;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int currSum = 0;
        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1);
        
        for (int num : nums) {
            currSum += num;
            if (prefixMap.containsKey(currSum - k)) {
                count += prefixMap.get(currSum - k);
            }
            prefixMap.put(currSum, prefixMap.getOrDefault(currSum, 0) + 1);
        }
        return count;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'A single linear pass scans the array in O(N) time. Each hash map lookup and insertion executes in O(1) average time. Space is O(N) for the prefix frequency map.',
    commonPitfalls: [
      'Forgetting to seed `prefix_map` with `{0: 1}`, which causes any valid subarray starting at index 0 to be missed.',
      'Incrementing the hash map frequency BEFORE checking `(curr_sum - k)` (leads to incorrect self-matches when k == 0).'
    ],
    runnable: {
      functionName: 'subarraySum',
      starterCode: `function subarraySum(nums, k) {
  let count = 0;
  let currSum = 0;
  const prefixMap = new Map();
  prefixMap.set(0, 1);
  for (const num of nums) {
    currSum += num;
    if (prefixMap.has(currSum - k)) {
      count += prefixMap.get(currSum - k);
    }
    prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);
  }
  return count;
}`,
      testCases: [
        { input: [[1, 1, 1], 2], expected: 2 },
        { input: [[1, 2, 3], 3], expected: 2 }
      ]
    }
  },
  {
    id: 303,
    title: 'Range Sum Query - Immutable',
    slug: 'range-sum-query-immutable',
    difficulty: 'Easy',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: '1D Static Cumulative Prefix Array',
    leetcodeUrl: 'https://leetcode.com/problems/range-sum-query-immutable/',
    companies: ['Meta', 'Amazon', 'Apple'],
    description: `Given an integer array \`nums\`, handle multiple queries of the following type:
Calculate the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive where \`left <= right\`.
Implement the \`NumArray\` class:
- \`NumArray(int[] nums)\` Initializes the object with the integer array nums.
- \`int sumRange(int left, int right)\` Returns the sum of the elements of nums between indices left and right inclusive (i.e. \`nums[left] + nums[left + 1] + ... + nums[right]\`).`,
    examples: [
      {
        input: '["NumArray", "sumRange", "sumRange", "sumRange"]\n[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]',
        output: '[null, 1, -1, -3]',
        explanation: 'NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);\nnumArray.sumRange(0, 2); // return 1 (-2 + 0 + 3)\nnumArray.sumRange(2, 5); // return -1 (3 + -5 + 2 + -1)\nnumArray.sumRange(0, 5); // return -3'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^5 <= nums[i] <= 10^5',
      '0 <= left <= right < nums.length',
      'At most 10^4 calls will be made to sumRange.'
    ],
    intuition: `If we iterate and sum elements from left to right on every query, each query takes O(N) time. For Q queries, that is O(Q * N).
Precompute a prefix sum array of size N + 1 where:
\`prefix[i] = nums[0] + ... + nums[i - 1]\`
Then any range sum \`[left, right]\` is answered in exact O(1) time:
\`sumRange(left, right) = prefix[right + 1] - prefix[left]\`.`,
    algorithmSteps: [
      'In constructor: create array `prefix` of length `len(nums) + 1` filled with 0.',
      'For `i` from 0 to len(nums) - 1: `prefix[i + 1] = prefix[i] + nums[i]`.',
      'In `sumRange(left, right)`: return `prefix[right + 1] - prefix[left]`.'
    ],
    solutions: {
      python: `from typing import List

class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0] * (len(nums) + 1)
        for i, num in enumerate(nums):
            self.prefix[i + 1] = self.prefix[i] + num

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
      javascript: `class NumArray {
    constructor(nums) {
        this.prefix = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}`,
      cpp: `#include <vector>
using namespace std;

class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (size_t i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
      java: `class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`
    },
    timeComplexity: 'O(N) initialization, O(1) per query',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Constructor traverses nums of length N once in O(N). Each sumRange query computes a single arithmetic subtraction in O(1). Space is O(N) for prefix array.',
    commonPitfalls: [
      'Off-by-one errors: using a prefix array of size N instead of N + 1 requires a special branch condition when `left == 0`.'
    ]
  },
  {
    id: 304,
    title: 'Range Sum Query 2D - Immutable',
    slug: 'range-sum-query-2d-immutable',
    difficulty: 'Medium',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: '2D Matrix Inclusion-Exclusion Prefix Sum',
    leetcodeUrl: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    description: `Given a 2D matrix \`matrix\`, handle multiple queries of the following type:
Calculate the sum of the elements of \`matrix\` inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.
Implement the \`NumMatrix\` class:
- \`NumMatrix(int[][] matrix)\` Initializes the object with the integer matrix.
- \`int sumRegion(int row1, int col1, int row2, int col2)\` Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.
You must design an algorithm where \`sumRegion\` works on O(1) time complexity.`,
    examples: [
      {
        input: 'matrix = [\n  [3, 0, 1, 4, 2],\n  [5, 6, 3, 2, 1],\n  [1, 2, 0, 1, 5],\n  [4, 1, 0, 1, 7],\n  [1, 0, 3, 0, 5]\n]\nsumRegion(2, 1, 4, 3) -> 8\nsumRegion(1, 1, 2, 2) -> 11\nsumRegion(1, 2, 2, 4) -> 12',
        output: '[8, 11, 12]'
      }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 200',
      '-10^4 <= matrix[i][j] <= 10^4',
      '0 <= row1 <= row2 < m',
      '0 <= col1 <= col2 < n',
      'At most 10^4 calls will be made to sumRegion.'
    ],
    intuition: `To achieve O(1) per 2D subgrid sum, extend the prefix sum formula using the 2D Inclusion-Exclusion Principle:
Define \`prefix[r+1][c+1]\` as the sum of all elements in the subgrid from \`(0, 0)\` to \`(r, c)\`.
Prefix Construction:
\`prefix[r+1][c+1] = matrix[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]\`
Query Region:
The sum inside rectangle \`(r1, c1)\` to \`(r2, c2)\` is:
\`prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]\`.
The top region and left region are subtracted, and the top-left overlapping corner (subtracted twice) is added back!`,
    algorithmSteps: [
      'Construct a 2D array `prefix` of size `(rows + 1) x (cols + 1)` filled with 0.',
      'For `r` from 0 to rows - 1 and `c` from 0 to cols - 1:',
      '  `prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c]`.',
      'In `sumRegion(r1, c1, r2, c2)`:',
      '  Return `prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]`.'
    ],
    solutions: {
      python: `from typing import List

class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]:
            return
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        
        for r in range(m):
            for c in range(n):
                self.prefix[r + 1][c + 1] = (
                    matrix[r][c]
                    + self.prefix[r][c + 1]
                    + self.prefix[r + 1][c]
                    - self.prefix[r][c]
                )

    def sumRegion(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return (
            self.prefix[r2 + 1][c2 + 1]
            - self.prefix[r1][c2 + 1]
            - self.prefix[r2 + 1][c1]
            + self.prefix[r1][c1]
        )`,
      javascript: `class NumMatrix {
    constructor(matrix) {
        const m = matrix.length, n = matrix[0].length;
        this.prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                this.prefix[r + 1][c + 1] =
                    matrix[r][c] +
                    this.prefix[r][c + 1] +
                    this.prefix[r + 1][c] -
                    this.prefix[r][c];
            }
        }
    }

    sumRegion(r1, c1, r2, c2) {
        return (
            this.prefix[r2 + 1][c2 + 1] -
            this.prefix[r1][c2 + 1] -
            this.prefix[r2 + 1][c1] +
            this.prefix[r1][c1]
        );
    }
}`,
      cpp: `#include <vector>
using namespace std;

class NumMatrix {
    vector<vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        prefix.assign(m + 1, vector<int>(n + 1, 0));
        
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];
            }
        }
    }
    
    int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];
    }
};`,
      java: `class NumMatrix {
    private int[][] prefix;

    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];
            }
        }
    }

    public int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];
    }
}`
    },
    timeComplexity: 'O(M * N) precomputation, O(1) per query',
    spaceComplexity: 'O(M * N)',
    complexityAnalysis: 'Precomputing the prefix matrix takes O(M * N) time. Each sumRegion query uses 4 table lookups and 3 arithmetic operations in exact O(1) time. Space is O(M * N) for the 2D prefix table.',
    commonPitfalls: [
      'Signs in inclusion-exclusion: forgetting to ADD `prefix[r1][c1]` back (since it was subtracted twice by left and top strips).',
      'Using 0-indexed bounds without 1-padding (leads to complicated boundary branches).'
    ]
  },
  {
    id: 974,
    title: 'Subarray Sums Divisible by K',
    slug: 'subarray-sums-divisible-by-k',
    difficulty: 'Medium',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: 'Modular Arithmetic Prefix Frequency',
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
    companies: ['Amazon', 'Microsoft', 'Google'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the number of non-empty subarrays that have a sum divisible by \`k\`.
A subarray is a contiguous part of an array.`,
    examples: [
      {
        input: 'nums = [4,5,0,-2,-3,1], k = 5',
        output: '7',
        explanation: 'There are 7 subarrays with a sum divisible by k = 5: [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]'
      },
      {
        input: 'nums = [5], k = 9',
        output: '0'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-10^4 <= nums[i] <= 10^4',
      '2 <= k <= 10^4'
    ],
    intuition: `If \`sum(nums[j...i])\` is divisible by \`k\`, then:
\`(prefix[i] - prefix[j - 1]) % k == 0\`
Which implies:
\`prefix[i] % k == prefix[j - 1] % k\`
Whenever two prefix sums have the EXACT SAME remainder modulo \`k\`, the subarray between them must sum to a multiple of \`k\`!
Handling Negative Remainders:
In languages like C++, Java, and JavaScript, \`(-2) % 5 = -2\`. We normalize negative remainders into positive domain using:
\`rem = ((rem % k) + k) % k\`.
Initialize remainder frequency map with \`{0: 1}\`.`,
    algorithmSteps: [
      'Initialize `count = 0`, `curr_sum = 0`, and `rem_map = {0: 1}`.',
      'For each `num` in `nums`:',
      '  `curr_sum += num`',
      '  `rem = ((curr_sum % k) + k) % k` (normalize remainder)',
      '  If `rem in rem_map`: `count += rem_map[rem]`',
      '  `rem_map[rem] = rem_map.get(rem, 0) + 1`',
      'Return `count`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        count = 0
        curr_sum = 0
        rem_map = {0: 1}  # remainder -> frequency
        
        for num in nums:
            curr_sum += num
            rem = curr_sum % k
            # Python automatically returns positive remainder for modulo
            if rem in rem_map:
                count += rem_map[rem]
            rem_map[rem] = rem_map.get(rem, 0) + 1
            
        return count`,
      javascript: `function subarraysDivByK(nums, k) {
    let count = 0;
    let currSum = 0;
    const remMap = new Map();
    remMap.set(0, 1);
    
    for (const num of nums) {
        currSum += num;
        let rem = ((currSum % k) + k) % k; // handle negative remainder in JS
        if (remMap.has(rem)) {
            count += remMap.get(rem);
        }
        remMap.set(rem, (remMap.get(rem) || 0) + 1);
    }
    return count;
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        int count = 0;
        int curr_sum = 0;
        unordered_map<int, int> rem_map;
        rem_map[0] = 1;
        
        for (int num : nums) {
            curr_sum += num;
            int rem = ((curr_sum % k) + k) % k;
            if (rem_map.count(rem)) {
                count += rem_map[rem];
            }
            rem_map[rem]++;
        }
        return count;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int count = 0;
        int currSum = 0;
        Map<Integer, Integer> remMap = new HashMap<>();
        remMap.put(0, 1);
        
        for (int num : nums) {
            currSum += num;
            int rem = ((currSum % k) + k) % k;
            if (remMap.containsKey(rem)) {
                count += remMap.get(rem);
            }
            remMap.put(rem, remMap.getOrDefault(rem, 0) + 1);
        }
        return count;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, K))',
    complexityAnalysis: 'Processes array of length N in a single pass in O(N) time. The remainder map holds at most K possible remainders (from 0 to K - 1), consuming O(min(N, K)) space.',
    commonPitfalls: [
      'Failing to normalize negative remainders in JS, C++, and Java: `(-2) % 5` is `-2`, but mathematically `-2 ≡ 3 (mod 5)`.',
      'Forgetting initial `{0: 1}` base case.'
    ],
    runnable: {
      functionName: 'subarraysDivByK',
      starterCode: `function subarraysDivByK(nums, k) {
  let count = 0;
  let currSum = 0;
  const remMap = new Map();
  remMap.set(0, 1);
  for (const num of nums) {
    currSum += num;
    let rem = ((currSum % k) + k) % k;
    if (remMap.has(rem)) count += remMap.get(rem);
    remMap.set(rem, (remMap.get(rem) || 0) + 1);
  }
  return count;
}`,
      testCases: [
        { input: [[4, 5, 0, -2, -3, 1], 5], expected: 7 },
        { input: [[5], 9], expected: 0 }
      ]
    }
  },
  {
    id: 1109,
    title: 'Corporate Flight Bookings',
    slug: 'corporate-flight-bookings',
    difficulty: 'Medium',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: 'Difference Array Range Accumulation',
    leetcodeUrl: 'https://leetcode.com/problems/corporate-flight-bookings/',
    companies: ['Google', 'Amazon'],
    description: `There are \`n\` flights that are labeled from \`1\` to \`n\`.
You are given an array of flight bookings \`bookings\`, where \`bookings[i] = [first_i, last_i, seats_i]\` represents a booking for flights \`first_i\` through \`last_i\` (inclusive) with \`seats_i\` seats reserved for each flight in the range.
Return an array \`answer\` of length \`n\`, where \`answer[i]\` is the total number of seats reserved for flight \`i\`.`,
    examples: [
      {
        input: 'bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5',
        output: '[10,55,45,25,25]',
        explanation: 'Flight labels:        1   2   3   4   5\nBooking 1 reserved:  10  10\nBooking 2 reserved:      20  20\nBooking 3 reserved:      25  25  25  25\nTotal seats:         10  55  45  25  25'
      },
      {
        input: 'bookings = [[1,2,10],[2,2,15]], n = 2',
        output: '[10,25]'
      }
    ],
    constraints: [
      '1 <= n <= 2 * 10^4',
      '1 <= bookings.length <= 2 * 10^4',
      'bookings[i].length == 3',
      '1 <= first_i <= last_i <= n',
      '1 <= seats_i <= 10^4'
    ],
    intuition: `Naive approach: for each booking, loop from \`first\` to \`last\` adding seats. Takes O(B * N) which times out.
Optimal Pattern: Difference Array (Sweep-line)!
To add value \`v\` to all elements in range \`[first, last]\`:
1. \`diff[first] += v\` (increment starts here)
2. \`diff[last + 1] -= v\` (increment stops after last)
Each range update is done in exact O(1) time!
After applying all bookings, a single running prefix sum pass transforms the difference array into the final seat totals in O(N)!
Total time reduces from O(B * N) to O(B + N).`,
    algorithmSteps: [
      'Initialize `diff` array of size `n + 2` with zeros.',
      'For each `[first, last, seats]` in `bookings`:',
      '  `diff[first] += seats`',
      '  `diff[last + 1] -= seats`',
      'Build prefix sums for flights 1 to n: `diff[i] += diff[i - 1]`.',
      'Return `diff[1...n]`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
        diff = [0] * (n + 2)
        
        # O(1) range markings
        for first, last, seats in bookings:
            diff[first] += seats
            diff[last + 1] -= seats
            
        # Prefix sum reconstruction
        for i in range(1, n + 1):
            diff[i] += diff[i - 1]
            
        return diff[1:n + 1]`,
      javascript: `function corpFlightBookings(bookings, n) {
    const diff = new Array(n + 2).fill(0);
    
    for (const [first, last, seats] of bookings) {
        diff[first] += seats;
        diff[last + 1] -= seats;
    }
    
    for (let i = 1; i <= n; i++) {
        diff[i] += diff[i - 1];
    }
    
    return diff.slice(1, n + 1);
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> diff(n + 2, 0);
        for (const auto& b : bookings) {
            diff[b[0]] += b[2];
            diff[b[1] + 1] -= b[2];
        }
        for (int i = 1; i <= n; ++i) {
            diff[i] += diff[i - 1];
        }
        return vector<int>(diff.begin() + 1, diff.begin() + n + 1);
    }
};`,
      java: `class Solution {
    public int[] corpFlightBookings(int[][] bookings, int n) {
        int[] diff = new int[n + 2];
        for (int[] b : bookings) {
            diff[b[0]] += b[2];
            diff[b[1] + 1] -= b[2];
        }
        for (int i = 1; i <= n; i++) {
            diff[i] += diff[i - 1];
        }
        int[] res = new int[n];
        System.arraycopy(diff, 1, res, 0, n);
        return res;
    }
}`
    },
    timeComplexity: 'O(B + N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Where B is the number of bookings and N is the number of flights. Each booking applies two O(1) endpoints. Running prefix sum takes O(N). Total runtime is O(B + N). Auxiliary space is O(N) for difference array.',
    commonPitfalls: [
      'Index out of bounds on `last + 1`: when `last == n`, `last + 1 == n + 1`, so the difference array must have size at least `n + 2`.',
      'Forgetting that flight IDs are 1-indexed.'
    ],
    runnable: {
      functionName: 'corpFlightBookings',
      starterCode: `function corpFlightBookings(bookings, n) {
  const diff = new Array(n + 2).fill(0);
  for (const [first, last, seats] of bookings) {
    diff[first] += seats;
    diff[last + 1] -= seats;
  }
  for (let i = 1; i <= n; i++) {
    diff[i] += diff[i - 1];
  }
  return diff.slice(1, n + 1);
}`,
      testCases: [
        { input: [[[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5], expected: [10, 55, 45, 25, 25] },
        { input: [[[1, 2, 10], [2, 2, 15]], 2], expected: [10, 25] }
      ]
    }
  },
  {
    id: 525,
    title: 'Contiguous Array',
    slug: 'contiguous-array',
    difficulty: 'Medium',
    topic: 'prefix-sums',
    topicName: 'Prefix Sums & Difference Arrays',
    pattern: 'Relative Balance Prefix Sum',
    leetcodeUrl: 'https://leetcode.com/problems/contiguous-array/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    description: `Given a binary array \`nums\`, return the maximum length of a contiguous subarray with an equal number of \`0\` and \`1\`.`,
    examples: [
      {
        input: 'nums = [0,1]',
        output: '2',
        explanation: '[0, 1] is the longest contiguous subarray with an equal number of 0 and 1.'
      },
      {
        input: 'nums = [0,1,0]',
        output: '2',
        explanation: '[0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      'nums[i] is either 0 or 1.'
    ],
    intuition: `Transform the problem:
Treat every \`0\` as \`-1\`, and keep every \`1\` as \`+1\`.
Now, an equal number of 0s and 1s means the sum of the transformed elements is EXACTLY 0!
We maintain a running prefix sum:
If \`prefix[i] == prefix[j]\`, the sum between index \`j + 1\` and \`i\` is 0!
To maximize the length, store the EARLIEST index where each prefix sum was seen.
When a prefix sum repeats at index \`i\`, the subarray length is \`i - first_seen[prefix]\`.
Initialize \`first_seen\` with \`{0: -1}\` to handle valid subarrays starting at index 0.`,
    algorithmSteps: [
      'Initialize `max_len = 0`, `curr_sum = 0`, and `seen = {0: -1}`.',
      'For `i, num` in enumerate(nums):',
      '  `curr_sum += (1 if num == 1 else -1)`',
      '  If `curr_sum in seen`:',
      '    `max_len = max(max_len, i - seen[curr_sum])`',
      '  Else: `seen[curr_sum] = i` (store only first occurrence!)',
      'Return `max_len`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        seen = {0: -1}  # sum -> earliest_index
        max_len = 0
        curr_sum = 0
        
        for i, num in enumerate(nums):
            curr_sum += 1 if num == 1 else -1
            if curr_sum in seen:
                max_len = max(max_len, i - seen[curr_sum])
            else:
                seen[curr_sum] = i
                
        return max_len`,
      javascript: `function findMaxLength(nums) {
    const seen = new Map();
    seen.set(0, -1);
    let maxLen = 0;
    let currSum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        currSum += nums[i] === 1 ? 1 : -1;
        if (seen.has(currSum)) {
            maxLen = Math.max(maxLen, i - seen.get(currSum));
        } else {
            seen.set(currSum, i);
        }
    }
    return maxLen;
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> seen;
        seen[0] = -1;
        int max_len = 0, curr_sum = 0;
        
        for (int i = 0; i < nums.size(); ++i) {
            curr_sum += (nums[i] == 1) ? 1 : -1;
            if (seen.count(curr_sum)) {
                max_len = max(max_len, i - seen[curr_sum]);
            } else {
                seen[curr_sum] = i;
            }
        }
        return max_len;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, -1);
        int maxLen = 0, currSum = 0;
        
        for (int i = 0; i < nums.length; i++) {
            currSum += (nums[i] == 1) ? 1 : -1;
            if (seen.containsKey(currSum)) {
                maxLen = Math.max(maxLen, i - seen.get(currSum));
            } else {
                seen.put(currSum, i);
            }
        }
        return maxLen;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Single pass through array of length N requires O(N) time. Auxiliary space is O(N) for the hash map storing prefix sum earliest indices.',
    commonPitfalls: [
      'Overwriting `seen[curr_sum]` when it is already in the map: we want the EARLIEST index to maximize length `i - seen[curr_sum]`.',
      'Forgetting `{0: -1}` initialization.'
    ],
    runnable: {
      functionName: 'findMaxLength',
      starterCode: `function findMaxLength(nums) {
  const seen = new Map();
  seen.set(0, -1);
  let maxLen = 0, currSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i] === 1 ? 1 : -1;
    if (seen.has(currSum)) maxLen = Math.max(maxLen, i - seen.get(currSum));
    else seen.set(currSum, i);
  }
  return maxLen;
}`,
      testCases: [
        { input: [[0, 1]], expected: 2 },
        { input: [[0, 1, 0]], expected: 2 }
      ]
    }
  }
];
