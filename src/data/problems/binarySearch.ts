import { Problem } from '@/types';

export const binarySearchProblems: Problem[] = [
  {
    id: 704,
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    topic: 'binary-search',
    topicName: 'Binary Search & Search Space Reduction',
    pattern: 'Classic Sorted Array Search',
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    companies: ['Apple', 'Microsoft', 'Google', 'Amazon'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.
You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    intuition: `Because the array is sorted, we can eliminate half of the remaining search space at every step.
Initialize \`low = 0\` and \`high = len(nums) - 1\`.
Calculate \`mid = low + (high - low) // 2\`.
- If \`nums[mid] == target\`, we found it!
- If \`nums[mid] < target\`, the target must reside in the right half, so set \`low = mid + 1\`.
- If \`nums[mid] > target\`, the target must reside in the left half, so set \`high = mid - 1\`.`,
    algorithmSteps: [
      'Initialize `low = 0`, `high = len(nums) - 1`.',
      'While `low <= high`:',
      '  `mid = low + (high - low) // 2`',
      '  If `nums[mid] == target`: return `mid`.',
      '  Else if `nums[mid] < target`: `low = mid + 1`.',
      '  Else: `high = mid - 1`.',
      'Return -1 if target is not found.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
                
        return -1`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
    },
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'At each comparison, the search range is divided by 2. Total steps = log2(N), taking O(log N) time. Uses only scalar index pointers, requiring O(1) space.',
    commonPitfalls: [
      'Using `(low + high) // 2` which can overflow 32-bit signed integers in languages like Java/C++.',
      'Using `<` instead of `<=` in the loop condition, missing single-element ranges.'
    ],
    visualizerType: 'binary-search',
    runnable: {
      functionName: 'search',
      starterCode: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      testCases: [
        { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
        { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 }
      ]
    }
  },
  {
    id: 33,
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'Medium',
    topic: 'binary-search',
    topicName: 'Binary Search & Search Space Reduction',
    pattern: 'Rotated Invariant Partitioning',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values).
Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (0-indexed).
Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.
You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4'
      },
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 3',
        output: '-1'
      },
      {
        input: 'nums = [1], target = 0',
        output: '-1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.',
      '-10^4 <= target <= 10^4'
    ],
    intuition: `Key Invariant: In any rotated sorted array, splitting at \`mid\` divides the array into two halves where AT LEAST ONE HALF IS ALWAYS STRICTLY SORTED!
Check if the left half is sorted (\`nums[low] <= nums[mid]\`):
- If yes, check if target falls within the sorted left boundaries: \`nums[low] <= target < nums[mid]\`. If so, search left (\`high = mid - 1\`); otherwise search right (\`low = mid + 1\`).
- If no, the right half MUST be sorted! Check if target falls within the sorted right boundaries: \`nums[mid] < target <= nums[high]\`. If so, search right; otherwise search left.`,
    algorithmSteps: [
      'Initialize `low = 0`, `high = len(nums) - 1`.',
      'While `low <= high`:',
      '  `mid = low + (high - low) // 2`',
      '  If `nums[mid] == target`: return `mid`.',
      '  If left half is sorted (`nums[low] <= nums[mid]`):',
      '    If `nums[low] <= target < nums[mid]`: `high = mid - 1`.',
      '    Else: `low = mid + 1`.',
      '  Else (right half is sorted):',
      '    If `nums[mid] < target <= nums[high]`: `low = mid + 1`.',
      '    Else: `high = mid - 1`.',
      'Return -1.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                return mid
                
            # Check if left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Otherwise, right half is sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
                    
        return -1`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`
    },
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'At each comparison, half of the array is eliminated, guaranteeing O(log N) runtime. Space is O(1) auxiliary variables.',
    commonPitfalls: [
      'Missing the `<=` in `nums[low] <= nums[mid]` (when `low == mid`, left side is still technically sorted!).',
      'Forgetting that target must be checked against both endpoints of the sorted segment.'
    ],
    visualizerType: 'binary-search',
    runnable: {
      functionName: 'search',
      starterCode: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return -1;
}`,
      testCases: [
        { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
        { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 }
      ]
    }
  },
  {
    id: 153,
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'Medium',
    topic: 'binary-search',
    topicName: 'Binary Search & Search Space Reduction',
    pattern: 'Pivot Point Convergence',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Goldman Sachs'],
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between 1 and n times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array.
You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      {
        input: 'nums = [3,4,5,1,2]',
        output: '1',
        explanation: 'The original array was [1,2,3,4,5] rotated 3 times.'
      },
      {
        input: 'nums = [4,5,6,7,0,1,2]',
        output: '0',
        explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.'
      },
      {
        input: 'nums = [11,13,15,17]',
        output: '11'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.',
      'nums is sorted and rotated between 1 and n times.'
    ],
    intuition: `Compare \`nums[mid]\` against \`nums[high]\`:
- If \`nums[mid] > nums[high]\`: the inflection point (minimum) MUST lie strictly to the right of \`mid\`. Therefore, \`low = mid + 1\`.
- If \`nums[mid] <= nums[high]\`: the minimum could be \`mid\` itself, or somewhere to the left of \`mid\`. Therefore, \`high = mid\`.
Repeat while \`low < high\`. When \`low == high\`, the search converged precisely on the minimum element!`,
    algorithmSteps: [
      'Initialize `low = 0`, `high = len(nums) - 1`.',
      'While `low < high`:',
      '  `mid = low + (high - low) // 2`',
      '  If `nums[mid] > nums[high]`: `low = mid + 1`.',
      '  Else: `high = mid`.',
      'Return `nums[low]`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        low, high = 0, len(nums) - 1
        
        while low < high:
            mid = low + (high - low) // 2
            if nums[mid] > nums[high]:
                low = mid + 1
            else:
                high = mid
                
        return nums[low]`,
      javascript: `function findMin(nums) {
    let low = 0, high = nums.length - 1;
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2);
        if (nums[mid] > nums[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return nums[low];
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) low = mid + 1;
            else high = mid;
        }
        return nums[low];
    }
};`,
      java: `class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) low = mid + 1;
            else high = mid;
        }
        return nums[low];
    }
}`
    },
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'At each step, half of the array is eliminated, taking O(log N) time. Auxiliary space is O(1).',
    commonPitfalls: [
      'Using `high = mid - 1` when `nums[mid] <= nums[high]`: this could skip the minimum element if `mid` itself is the minimum!',
      'Comparing `nums[mid]` with `nums[low]` instead of `nums[high]` (comparing with low does not distinguish between a sorted array and rotated array cleanly).'
    ],
    visualizerType: 'binary-search',
    runnable: {
      functionName: 'findMin',
      starterCode: `function findMin(nums) {
  let low = 0, high = nums.length - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] > nums[high]) low = mid + 1;
    else high = mid;
  }
  return nums[low];
}`,
      testCases: [
        { input: [[3, 4, 5, 1, 2]], expected: 1 },
        { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
        { input: [[11, 13, 15, 17]], expected: 11 }
      ]
    }
  },
  {
    id: 875,
    title: 'Koko Eating Bananas',
    slug: 'koko-eating-bananas',
    difficulty: 'Medium',
    topic: 'binary-search',
    topicName: 'Binary Search & Search Space Reduction',
    pattern: 'Binary Search on the Answer Space',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/',
    companies: ['Google', 'Airbnb', 'DoorDash', 'Amazon'],
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.
Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
    examples: [
      {
        input: 'piles = [3,6,7,11], h = 8',
        output: '4'
      },
      {
        input: 'piles = [30,11,23,4,20], h = 5',
        output: '30'
      },
      {
        input: 'piles = [30,11,23,4,20], h = 6',
        output: '23'
      }
    ],
    constraints: [
      '1 <= piles.length <= 10^4',
      'piles.length <= h <= 10^9',
      '1 <= piles[i] <= 10^9'
    ],
    intuition: `This is the quintessential example of "Binary Search on the Answer".
Notice the monotonicity:
- If eating speed K is fast enough to finish within H hours, any speed > K will ALSO be fast enough!
- If eating speed K is too slow, any speed < K will also be too slow!
The search range for speed K is from \`1\` to \`max(piles)\`.
We binary search this range. For each candidate speed \`mid\`, compute hours required: \`ceil(pile / mid)\`.
If hours <= h: record candidate and try a smaller speed (\`high = mid - 1\`).
Otherwise: too slow, try faster speed (\`low = mid + 1\`).`,
    algorithmSteps: [
      'Define search space: `low = 1`, `high = max(piles)`, `ans = high`.',
      'While `low <= high`:',
      '  `mid = low + (high - low) // 2`',
      '  Compute total hours `hours = sum(math.ceil(pile / mid) for pile in piles)`.',
      '  If `hours <= h`:',
      '    `ans = mid` (feasible, try to find smaller speed)',
      '    `high = mid - 1`',
      '  Else: `low = mid + 1` (too slow)',
      'Return `ans`.'
    ],
    solutions: {
      python: `import math
from typing import List

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        low, high = 1, max(piles)
        ans = high
        
        while low <= high:
            mid = low + (high - low) // 2
            hours = sum(math.ceil(p / mid) for p in piles)
            
            if hours <= h:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans`,
      javascript: `function minEatingSpeed(piles, h) {
    let low = 1, high = Math.max(...piles);
    let ans = high;
    
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / mid);
        }
        
        if (hours <= h) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`,
      cpp: `#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        long long low = 1, high = *max_element(piles.begin(), piles.end());
        int ans = high;
        
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid; // integer ceiling
            }
            if (hours <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);
        int ans = high;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
    },
    timeComplexity: 'O(N log(max(P)))',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'The binary search tests log(max(P)) candidate speeds. In each iteration, we scan the piles array of size N to sum up the hours. Overall time is O(N log(max(P))). Auxiliary space is O(1).',
    commonPitfalls: [
      'In C++/Java, `hours` can exceed 32-bit integer limits when `mid` is very small; use `long long` / `long` for the total hours sum.',
      'Using floating-point division without ceiling: each pile takes at least 1 full hour even if 1 banana is left.'
    ],
    visualizerType: 'binary-search',
    runnable: {
      functionName: 'minEatingSpeed',
      starterCode: `function minEatingSpeed(piles, h) {
  let low = 1, high = Math.max(...piles);
  let ans = high;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / mid);
    if (hours <= h) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`,
      testCases: [
        { input: [[3, 6, 7, 11], 8], expected: 4 },
        { input: [[30, 11, 23, 4, 20], 5], expected: 30 }
      ]
    }
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    topic: 'binary-search',
    topicName: 'Binary Search & Search Space Reduction',
    pattern: 'Binary Search on Partition Cut',
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    companies: ['Google', 'Amazon', 'Apple', 'Meta', 'Goldman Sachs'],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.
The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    intuition: `Merging both arrays takes O(M + N), which fails the strict O(log(M + N)) requirement!
To achieve O(log(min(M, N))), binary search the partition cut of the shorter array:
Let total length be \`total = m + n\`, and left half size be \`half = (total + 1) // 2\`.
Partition \`nums1\` at index \`i\` and \`nums2\` at index \`j = half - i\`.
The partition is valid when:
- \`nums1[i-1] <= nums2[j]\`
- \`nums2[j-1] <= nums1[i]\`
Once valid, the median is derived from the boundary elements:
If total is odd: \`max(nums1[i-1], nums2[j-1])\`.
If total is even: \`(max(lefts) + min(rights)) / 2.0\`.`,
    algorithmSteps: [
      'Ensure `nums1` is the shorter array (if not, swap arguments).',
      'Set `low = 0`, `high = len(nums1)`.',
      'While `low <= high`:',
      '  `i = (low + high) // 2`',
      '  `j = (m + n + 1) // 2 - i`',
      '  Define boundaries: `left1`, `right1`, `left2`, `right2` (using -inf/inf for out of bounds).',
      '  If `left1 <= right2` and `left2 <= right1`: valid partition found!',
      '    If odd: return `max(left1, left2)`.',
      '    Else: return `(max(left1, left2) + min(right1, right2)) / 2.0`.',
      '  Else if `left1 > right2`: `high = i - 1` (too many elements from nums1).',
      '  Else: `low = i + 1`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        if len(A) > len(B):
            A, B = B, A
            
        m, n = len(A), len(B)
        low, high = 0, m
        half = (m + n + 1) // 2
        
        while low <= high:
            i = (low + high) // 2
            j = half - i
            
            A_left = A[i - 1] if i > 0 else float('-inf')
            A_right = A[i] if i < m else float('inf')
            B_left = B[j - 1] if j > 0 else float('-inf')
            B_right = B[j] if j < n else float('inf')
            
            if A_left <= B_right and B_left <= A_right:
                if (m + n) % 2 == 1:
                    return float(max(A_left, B_left))
                return (max(A_left, B_left) + min(A_right, B_right)) / 2.0
            elif A_left > B_right:
                high = i - 1
            else:
                low = i + 1`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    let A = nums1, B = nums2;
    if (A.length > B.length) [A, B] = [B, A];
    
    const m = A.length, n = B.length;
    let low = 0, high = m;
    const half = Math.floor((m + n + 1) / 2);
    
    while (low <= high) {
        const i = Math.floor((low + high) / 2);
        const j = half - i;
        
        const ALeft = i > 0 ? A[i - 1] : -Infinity;
        const ARight = i < m ? A[i] : Infinity;
        const BLeft = j > 0 ? B[j - 1] : -Infinity;
        const BRight = j < n ? B[j] : Infinity;
        
        if (ALeft <= BRight && BLeft <= ARight) {
            if ((m + n) % 2 === 1) {
                return Math.max(ALeft, BLeft);
            }
            return (Math.max(ALeft, BLeft) + Math.min(ARight, BRight)) / 2.0;
        } else if (ALeft > BRight) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0.0;
}`,
      cpp: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        int half = (m + n + 1) / 2;
        
        while (low <= high) {
            int i = (low + high) / 2;
            int j = half - i;
            
            int A_left = (i > 0) ? nums1[i - 1] : INT_MIN;
            int A_right = (i < m) ? nums1[i] : INT_MAX;
            int B_left = (j > 0) ? nums2[j - 1] : INT_MIN;
            int B_right = (j < n) ? nums2[j] : INT_MAX;
            
            if (A_left <= B_right && B_left <= A_right) {
                if ((m + n) % 2 == 1) return max(A_left, B_left);
                return (max(A_left, B_left) + min(A_right, B_right)) / 2.0;
            } else if (A_left > B_right) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
};`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        int half = (m + n + 1) / 2;
        
        while (low <= high) {
            int i = (low + high) / 2;
            int j = half - i;
            
            int ALeft = (i > 0) ? nums1[i - 1] : Integer.MIN_VALUE;
            int ARight = (i < m) ? nums1[i] : Integer.MAX_VALUE;
            int BLeft = (j > 0) ? nums2[j - 1] : Integer.MIN_VALUE;
            int BRight = (j < n) ? nums2[j] : Integer.MAX_VALUE;
            
            if (ALeft <= BRight && BLeft <= ARight) {
                if ((m + n) % 2 == 1) return Math.max(ALeft, BLeft);
                return (Math.max(ALeft, BLeft) + Math.min(ARight, BRight)) / 2.0;
            } else if (ALeft > BRight) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
}`
    },
    timeComplexity: 'O(log(min(M, N)))',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We binary search only on the smaller array of size min(M, N), eliminating half the search space at each comparison. Space complexity is O(1).',
    commonPitfalls: [
      'Not swapping to ensure binary search runs on the smaller array (leads to negative index calculation for j).',
      'Forgetting boundary infinity values when partition cut is at index 0 or length m.'
    ],
    visualizerType: 'binary-search',
    runnable: {
      functionName: 'findMedianSortedArrays',
      starterCode: `function findMedianSortedArrays(nums1, nums2) {
  let A = nums1, B = nums2;
  if (A.length > B.length) [A, B] = [B, A];
  const m = A.length, n = B.length;
  let low = 0, high = m;
  const half = Math.floor((m + n + 1) / 2);
  while (low <= high) {
    const i = Math.floor((low + high) / 2);
    const j = half - i;
    const ALeft = i > 0 ? A[i - 1] : -Infinity;
    const ARight = i < m ? A[i] : Infinity;
    const BLeft = j > 0 ? B[j - 1] : -Infinity;
    const BRight = j < n ? B[j] : Infinity;
    if (ALeft <= BRight && BLeft <= ARight) {
      if ((m + n) % 2 === 1) return Math.max(ALeft, BLeft);
      return (Math.max(ALeft, BLeft) + Math.min(ARight, BRight)) / 2.0;
    } else if (ALeft > BRight) high = i - 1;
    else low = i + 1;
  }
  return 0.0;
}`,
      testCases: [
        { input: [[1, 3], [2]], expected: 2 },
        { input: [[1, 2], [3, 4]], expected: 2.5 }
      ]
    }
  }
];
