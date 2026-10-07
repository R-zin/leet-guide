import { Problem } from '@/types';

export const twoPointersProblems: Problem[] = [
  {
    id: 125,
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Opposite Ends Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    companies: ['Meta', 'Microsoft', 'Amazon', 'Apple'],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: 'true',
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    intuition: `Rather than creating a cleaned copy of the string (which takes O(N) extra memory), use two pointers: \`left\` starting at 0 and \`right\` starting at \`len(s) - 1\`.
Skip non-alphanumeric characters at both ends. When both pointers rest on valid alphanumeric characters, compare them case-insensitively. If they match, advance inward; if they mismatch, return \`false\` immediately.`,
    algorithmSteps: [
      'Initialize `left = 0` and `right = len(s) - 1`.',
      'While `left < right`:',
      '  While `left < right` and `s[left]` is not alphanumeric, increment `left`.',
      '  While `left < right` and `s[right]` is not alphanumeric, decrement `right`.',
      '  Compare `s[left].lower()` with `s[right].lower()`. If mismatch, return false.',
      '  Increment `left` and decrement `right`.',
      'Return true.'
    ],
    solutions: {
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
                
            if s[left].lower() != s[right].lower():
                return False
                
            left += 1
            right -= 1
            
        return True`,
      javascript: `function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    const isAlphanumeric = (c) => /[a-zA-Z0-9]/.test(c);
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We scan the string of length N inward once. All pointer comparisons and alphanumeric checks run in constant O(1) time. No auxiliary string or arrays are created, so space complexity is O(1).',
    commonPitfalls: [
      'Forgetting to re-check `left < right` inside the inner character-skipping while loops, risking index out-of-bounds.',
      'Forgetting digits are alphanumeric (treating only letters as valid).'
    ],
    visualizerType: 'two-pointers',
    runnable: {
      functionName: 'isPalindrome',
      starterCode: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  const isAlphanumeric = (c) => /[a-zA-Z0-9]/.test(c);
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
      testCases: [
        { input: ['A man, a plan, a canal: Panama'], expected: true },
        { input: ['race a car'], expected: false },
        { input: [' '], expected: true }
      ]
    }
  },
  {
    id: 15,
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Sort + Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    companies: ['Meta', 'Amazon', 'Apple', 'Google', 'Microsoft', 'Bloomberg'],
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.
Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. Distinct triplets are [-1,0,1] and [-1,-1,2].'
      },
      {
        input: 'nums = [0,1,1]',
        output: '[]'
      },
      {
        input: 'nums = [0,0,0]',
        output: '[[0,0,0]]'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    intuition: `Brute force O(N³) checks all triplets.
By sorting the array in O(N log N), we can fix the first number \`nums[i]\` and turn the remainder into Two Sum II: finding two numbers in the sorted subarray \`nums[i+1...N-1]\` that sum to \`-nums[i]\` in O(N).
Total time becomes O(N²).
To prevent duplicate triplets without a hash set, simply skip identical consecutive numbers when advancing \`i\`, \`left\`, and \`right\`.`,
    algorithmSteps: [
      'Sort `nums` in ascending order.',
      'Iterate `i` from 0 to N - 3:',
      '  If `nums[i] > 0`, break early (since array is sorted, positive numbers cannot sum to 0).',
      '  If `i > 0` and `nums[i] == nums[i-1]`, skip to avoid duplicate triplets.',
      '  Set `left = i + 1` and `right = N - 1`.',
      '  While `left < right`:',
      '    `total = nums[i] + nums[left] + nums[right]`',
      '    If `total == 0`: record triplet, advance `left` and `right`, skipping duplicates.',
      '    If `total < 0`: increment `left` to increase sum.',
      '    If `total > 0`: decrement `right` to decrease sum.',
      'Return results.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        n = len(nums)
        
        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
                
            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                    
        return res`,
      javascript: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const n = nums.length;
    
    for (let i = 0; i < n - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            }
        }
    }
    return res;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        
        for (int i = 0; i < n - 2; ++i) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            int left = i + 1, right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total < 0) left++;
                else if (total > 0) right--;
                else {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        
        for (int i = 0; i < n - 2; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            int left = i + 1, right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total < 0) left++;
                else if (total > 0) right--;
                else {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1) (excluding output)',
    complexityAnalysis: 'Sorting the array takes O(N log N). The outer loop runs N times and the inner two-pointer search runs in O(N), giving O(N²) overall time. Aside from sorting and the returned result array, auxiliary memory is O(1).',
    commonPitfalls: [
      'Missing the duplicate skip logic for `nums[i]` or for `nums[left]` and `nums[right]`, generating duplicate triplets in output.',
      'Checking `nums[i] == nums[i+1]` instead of `nums[i] == nums[i-1]` for the outer loop (which incorrectly skips valid duplicates like `[-1, -1, 2]`).'
    ],
    visualizerType: 'two-pointers',
    runnable: {
      functionName: 'threeSum',
      starterCode: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const n = nums.length;
  for (let i = 0; i < n - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = n - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
  }
  return res;
}`,
      testCases: [
        { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
        { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
      ]
    }
  },
  {
    id: 11,
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Greedy Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Adobe'],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
Notice that you may not slant the container.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, max area of water between index 1 and 8 is 7 * 7 = 49.'
      },
      {
        input: 'height = [1,1]',
        output: '1'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    intuition: `Water area is determined by: \`width * min(height[left], height[right])\`.
Start with the widest possible container: \`left = 0\` and \`right = n - 1\`.
To potentially find a larger area with a smaller width, we MUST find a taller boundary.
The bottleneck is always the shorter line. Moving the taller line inward can only keep the bottleneck the same or make it even shorter while reducing width—guaranteed to never produce a larger area!
Therefore, we greedily advance whichever pointer points to the shorter bar.`,
    algorithmSteps: [
      'Initialize `left = 0`, `right = len(height) - 1`, and `max_water = 0`.',
      'While `left < right`:',
      '  `w = right - left`',
      '  `h = min(height[left], height[right])`',
      '  `max_water = max(max_water, w * h)`',
      '  If `height[left] < height[right]`: increment `left`.',
      '  Else: decrement `right`.',
      'Return `max_water`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_water = 0
        
        while left < right:
            h = min(height[left], height[right])
            max_water = max(max_water, (right - left) * h)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
                
        return max_water`,
      javascript: `function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, (right - left) * h);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int max_water = 0;
        
        while (left < right) {
            int h = min(height[left], height[right]);
            max_water = max(max_water, (right - left) * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return max_water;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, (right - left) * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Both pointers start at opposite ends and move toward each other by 1 step at every iteration, resulting in at most N steps. Space complexity is O(1) auxiliary variables.',
    commonPitfalls: [
      'Moving both pointers simultaneously: this might skip the optimal configuration.',
      'Moving the pointer with the greater height instead of the shorter height.'
    ],
    visualizerType: 'two-pointers',
    runnable: {
      functionName: 'maxArea',
      starterCode: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, (right - left) * h);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
      testCases: [
        { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
        { input: [[1, 1]], expected: 1 }
      ]
    }
  },
  {
    id: 42,
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Two Pointers Max-Boundary Tracking',
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    companies: ['Amazon', 'Google', 'Meta', 'Goldman Sachs', 'Microsoft'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    intuition: `Water trapped at any index \`i\` is given by: \`max(0, min(max_left, max_right) - height[i])\`.
We can compute this with O(N) space using prefix/suffix max arrays.
However, we can optimize space to O(1) using Two Pointers!
Maintain \`left = 0\`, \`right = n - 1\`, \`left_max = 0\`, and \`right_max = 0\`.
If \`left_max < right_max\`, the bottleneck is guaranteed to be on the left side! The water trapped at \`left\` is completely determined by \`left_max - height[left]\`, regardless of what heights lie between left and right.
Conversely, if \`right_max <= left_max\`, the right side is the bottleneck!`,
    algorithmSteps: [
      'Initialize `left = 0`, `right = len(height) - 1`.',
      'Initialize `left_max = 0`, `right_max = 0`, and `water = 0`.',
      'While `left < right`:',
      '  If `height[left] <= height[right]`:',
      '    If `height[left] >= left_max`: update `left_max = height[left]`.',
      '    Else: `water += left_max - height[left]`.',
      '    `left += 1`',
      '  Else:',
      '    If `height[right] >= right_max`: update `right_max = height[right]`.',
      '    Else: `water += right_max - height[right]`.',
      '    `right -= 1`',
      'Return `water`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
            
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        water = 0
        
        while left < right:
            if left_max < right_max:
                left += 1
                left_max = max(left_max, height[left])
                water += left_max - height[left]
            else:
                right -= 1
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                
        return water`,
      javascript: `function trap(height) {
    if (!height.length) return 0;
    let left = 0, right = height.length - 1;
    let leftMax = height[left], rightMax = height[right];
    let water = 0;
    
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) return 0;
        int left = 0, right = height.size() - 1;
        int left_max = height[left], right_max = height[right];
        int water = 0;
        
        while (left < right) {
            if (left_max < right_max) {
                left++;
                left_max = max(left_max, height[left]);
                water += left_max - height[left];
            } else {
                right--;
                right_max = max(right_max, height[right]);
                water += right_max - height[right];
            }
        }
        return water;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        if (height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = height[left], rightMax = height[right];
        int water = 0;
        
        while (left < right) {
            if (leftMax < rightMax) {
                left++;
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
            } else {
                right--;
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
            }
        }
        return water;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Single pass where `left` and `right` meet, processing all N bars in O(N) time. Uses only scalar max tracking variables, taking O(1) auxiliary space.',
    commonPitfalls: [
      'Using Monotonic Stack without accounting for height baselines correctly (two-pointers is much simpler and O(1) space).',
      'Forgetting that water at an elevation peak is 0 (`left_max - height[left] == 0`).'
    ],
    visualizerType: 'two-pointers',
    runnable: {
      functionName: 'trap',
      starterCode: `function trap(height) {
  if (!height.length) return 0;
  let left = 0, right = height.length - 1;
  let leftMax = height[left], rightMax = height[right];
  let water = 0;
  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
    }
  }
  return water;
}`,
      testCases: [
        { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
        { input: [[4, 2, 0, 3, 2, 5]], expected: 9 }
      ]
    }
  },
  {
    id: 121,
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Sliding Window / Min Price Tracking',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    companies: ['Amazon', 'Apple', 'Meta', 'Google', 'Microsoft'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    intuition: `To maximize profit, for every selling day \`right\`, we want to have bought on the minimum price day \`left\` prior to \`right\`.
Maintain a running minimum \`min_price\`. For each price, compute \`price - min_price\`, update the maximum profit, and update \`min_price = min(min_price, price)\`.`,
    algorithmSteps: [
      'Initialize `min_price = prices[0]` and `max_profit = 0`.',
      'Iterate through prices from index 1 to N-1:',
      '  If `prices[i] < min_price`: update `min_price = prices[i]`.',
      '  Else: update `max_profit = max(max_profit, prices[i] - min_price)`.',
      'Return `max_profit`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        
        for price in prices:
            if price < min_price:
                min_price = price
            else:
                max_profit = max(max_profit, price - min_price)
                
        return max_profit`,
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
    }
    return maxProfit;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_price = 1e9;
        int max_profit = 0;
        
        for (int price : prices) {
            if (price < min_price) {
                min_price = price;
            } else {
                max_profit = max(max_profit, price - min_price);
            }
        }
        return max_profit;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                maxProfit = Math.max(maxProfit, price - minPrice);
            }
        }
        return maxProfit;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Single pass through array of length N requires O(N) time. Uses only two variables for min price and max profit, requiring O(1) space.',
    commonPitfalls: [
      'Buying and selling on the same day or selling before buying.',
      'Assuming you can do multiple transactions (that is LeetCode 122, Best Time to Buy and Sell Stock II).'
    ],
    visualizerType: 'sliding-window',
    runnable: {
      functionName: 'maxProfit',
      starterCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      testCases: [
        { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
        { input: [[7, 6, 4, 3, 1]], expected: 0 }
      ]
    }
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Dynamic Sliding Window with Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Microsoft'],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    intuition: `Use a Sliding Window defined by pointers \`left\` and \`right\`.
Keep a Hash Map \`last_seen\` mapping each character to its most recent index.
As \`right\` iterates across the string:
If \`s[right]\` was seen at or after \`left\`, jump \`left = last_seen[s[right]] + 1\` to skip past the duplicate immediately in O(1)!
Update \`last_seen[s[right]] = right\` and track \`max_length = max(max_length, right - left + 1)\`.`,
    algorithmSteps: [
      'Initialize `last_seen = {}`, `left = 0`, and `max_len = 0`.',
      'For `right` from 0 to len(s) - 1:',
      '  `char = s[right]`',
      '  If `char in last_seen and last_seen[char] >= left`:',
      '    `left = last_seen[char] + 1`',
      '  `last_seen[char] = right`',
      '  `max_len = max(max_len, right - left + 1)`',
      'Return `max_len`.'
    ],
    solutions: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = 0
        max_len = 0
        
        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            max_len = max(max_len, right - left + 1)
            
        return max_len`,
      javascript: `function lengthOfLongestSubstring(s) {
    const lastSeen = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (lastSeen.has(char) && lastSeen.get(char) >= left) {
            left = lastSeen.get(char) + 1;
        }
        lastSeen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> last_seen;
        int left = 0;
        int max_len = 0;
        
        for (int right = 0; right < s.length(); ++right) {
            char c = s[right];
            if (last_seen.find(c) != last_seen.end() && last_seen[c] >= left) {
                left = last_seen[c] + 1;
            }
            last_seen[c] = right;
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    complexityAnalysis: 'The string of length N is scanned once. Auxiliary space is bounded by the alphabet size M (at most 128 ASCII or 256 extended ASCII characters) or N.',
    commonPitfalls: [
      'Forgetting to check `last_seen[char] >= left`: if a character was seen prior to `left`, moving `left` backward would expand the window inappropriately.',
      'Confusing substring (contiguous) with subsequence.'
    ],
    visualizerType: 'sliding-window',
    runnable: {
      functionName: 'lengthOfLongestSubstring',
      starterCode: `function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      testCases: [
        { input: ['abcabcbb'], expected: 3 },
        { input: ['bbbbb'], expected: 1 },
        { input: ['pwwkew'], expected: 3 }
      ]
    }
  },
  {
    id: 424,
    title: 'Longest Repeating Character Replacement',
    slug: 'longest-repeating-character-replacement',
    difficulty: 'Medium',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Sliding Window Invariant',
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    companies: ['Google', 'Amazon', 'Meta'],
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    examples: [
      {
        input: 's = "ABAB", k = 2',
        output: '4',
        explanation: 'Replace the two \'A\'s with two \'B\'s or vice versa.'
      },
      {
        input: 's = "AABABBA", k = 1',
        output: '4',
        explanation: 'Replace the one \'A\' in the middle with \'B\' and form "AABBBBA". The substring "BBBB" has length 4.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of only uppercase English letters.',
      '0 <= k <= s.length'
    ],
    intuition: `A window of length \`len = (right - left + 1)\` is valid if:
\`(window_length - max_frequency_character) <= k\`
Because that means we can replace all other characters (at most k) with the majority character.
As \`right\` expands, we track \`max_freq\`. If \`(right - left + 1) - max_freq > k\`, shrink \`left\` by 1 step.
Notice: we don't even need to decrement \`max_freq\` when shrinking \`left\` because we only care about discovering windows that beat our previously recorded maximum!`,
    algorithmSteps: [
      'Initialize `count = {}`, `left = 0`, `max_freq = 0`, and `max_len = 0`.',
      'For `right` from 0 to len(s) - 1:',
      '  `count[s[right]] = count.get(s[right], 0) + 1`',
      '  `max_freq = max(max_freq, count[s[right]])`',
      '  If `(right - left + 1) - max_freq > k`:',
      '    `count[s[left]] -= 1`',
      '    `left += 1`',
      '  `max_len = max(max_len, right - left + 1)`',
      'Return `max_len`.'
    ],
    solutions: {
      python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        left = 0
        max_freq = 0
        max_len = 0
        
        for right in range(len(s)):
            char = s[right]
            count[char] = count.get(char, 0) + 1
            max_freq = max(max_freq, count[char])
            
            while (right - left + 1) - max_freq > k:
                count[s[left]] -= 1
                left += 1
                
            max_len = max(max_len, right - left + 1)
            
        return max_len`,
      javascript: `function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let left = 0, maxFreq = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 65;
        count[idx]++;
        maxFreq = Math.max(maxFreq, count[idx]);
        
        while ((right - left + 1) - maxFreq > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int left = 0, max_freq = 0, max_len = 0;
        
        for (int right = 0; right < s.length(); ++right) {
            count[s[right] - 'A']++;
            max_freq = max(max_freq, count[s[right] - 'A']);
            
            while ((right - left + 1) - max_freq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};`,
      java: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);
            
            while ((right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We expand `right` and increment `left` at most N times total. The frequency array has fixed size 26, using O(1) auxiliary space.',
    commonPitfalls: [
      'Scanning all 26 frequencies in the inner loop on every step (unnecessary since `max_freq` only affects valid condition if it increases).',
      'Forgetting that characters are strictly uppercase A-Z.'
    ],
    visualizerType: 'sliding-window',
    runnable: {
      functionName: 'characterReplacement',
      starterCode: `function characterReplacement(s, k) {
  const count = new Array(26).fill(0);
  let left = 0, maxFreq = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const idx = s.charCodeAt(right) - 65;
    count[idx]++;
    maxFreq = Math.max(maxFreq, count[idx]);
    while ((right - left + 1) - maxFreq > k) {
      count[s.charCodeAt(left) - 65]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      testCases: [
        { input: ['ABAB', 2], expected: 4 },
        { input: ['AABABBA', 1], expected: 4 }
      ]
    }
  },
  {
    id: 76,
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    difficulty: 'Hard',
    topic: 'two-pointers',
    topicName: 'Two Pointers & Sliding Window',
    pattern: 'Sliding Window Match Count',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    companies: ['Meta', 'Amazon', 'Airbnb', 'Google', 'LinkedIn'],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.'
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"'
      },
      {
        input: 's = "a", t = "aa"',
        output: '""',
        explanation: 'Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.'
      }
    ],
    constraints: [
      'm == s.length, n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    intuition: `Maintain two frequency maps: \`need\` (target counts from t) and \`window\` (counts in current substring).
Track \`have\` (how many distinct characters currently satisfy their required count) and \`required\` (number of distinct characters in t).
Expand \`right\`:
- When adding \`s[right]\`, if \`window[char] == need[char]\`, increment \`have\`.
- While \`have == required\` (valid window containing all characters of t):
  - Record the window if smaller than current best.
  - Contract \`left\`: decrement \`window[s[left]]\`. If \`window[s[left]] < need[s[left]]\`, decrement \`have\`.
  - Advance \`left\`.`,
    algorithmSteps: [
      'If len(s) < len(t), return "".',
      'Count frequencies of characters in `t` using `need` hash map.',
      'Initialize `window = {}`, `have = 0`, `required = len(need)`, `left = 0`.',
      'Track `min_len = inf` and `best_range = (-1, -1)`.',
      'For `right` from 0 to len(s) - 1:',
      '  Add `s[right]` to `window`. If `window[s[right]] == need[s[right]]`: increment `have`.',
      '  While `have == required`:',
      '    Update `best_range` if `right - left + 1 < min_len`.',
      '    Remove `s[left]` from `window`. If `window[s[left]] < need[s[left]]`: decrement `have`.',
      '    Increment `left`.',
      'Return `s[best_start:best_end+1]` or `""` if no valid window found.'
    ],
    solutions: {
      python: `from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not s or not t:
            return ""
            
        need = Counter(t)
        window = {}
        have, required = 0, len(need)
        res, res_len = [-1, -1], float('inf')
        left = 0
        
        for right, char in enumerate(s):
            window[char] = window.get(char, 0) + 1
            if char in need and window[char] == need[char]:
                have += 1
                
            while have == required:
                if (right - left + 1) < res_len:
                    res = [left, right]
                    res_len = right - left + 1
                    
                window[s[left]] -= 1
                if s[left] in need and window[s[left]] < need[s[left]]:
                    have -= 1
                left += 1
                
        l, r = res
        return s[l:r + 1] if res_len != float('inf') else ""`,
      javascript: `function minWindow(s, t) {
    if (s.length < t.length) return "";
    const need = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    
    const window = new Map();
    let have = 0, required = need.size;
    let res = [-1, -1], resLen = Infinity;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }
        
        while (have === required) {
            if (right - left + 1 < resLen) {
                res = [left, right];
                resLen = right - left + 1;
            }
            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);
            if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            left++;
        }
    }
    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
}`,
      cpp: `#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        if (s.length() < t.length()) return "";
        unordered_map<char, int> need, window;
        for (char c : t) need[c]++;
        
        int have = 0, required = need.size();
        int left = 0, min_len = INT_MAX, start_idx = 0;
        
        for (int right = 0; right < s.length(); ++right) {
            char c = s[right];
            window[c]++;
            if (need.count(c) && window[c] == need[c]) have++;
            
            while (have == required) {
                if (right - left + 1 < min_len) {
                    min_len = right - left + 1;
                    start_idx = left;
                }
                char l_char = s[left];
                window[l_char]--;
                if (need.count(l_char) && window[l_char] < need[l_char]) have--;
                left++;
            }
        }
        return min_len == INT_MAX ? "" : s.substr(start_idx, min_len);
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
        
        Map<Character, Integer> window = new HashMap<>();
        int have = 0, required = need.size();
        int left = 0, minLen = Integer.MAX_VALUE, startIdx = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue()) {
                have++;
            }
            
            while (have == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char lChar = s.charAt(left);
                window.put(lChar, window.get(lChar) - 1);
                if (need.containsKey(lChar) && window.get(lChar) < need.get(lChar)) {
                    have--;
                }
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(startIdx, startIdx + minLen);
    }
}`
    },
    timeComplexity: 'O(M + N)',
    spaceComplexity: 'O(M + N)',
    complexityAnalysis: 'Building the frequency table of t takes O(N). Each character in s is visited at most twice (once by right and once by left), taking O(M). Space complexity is bounded by the size of the alphabet stored in hash maps.',
    commonPitfalls: [
      'In Java, comparing `Integer` objects with `==` instead of `.intValue()` or `.equals()` fails for values > 127 due to integer object caching!',
      'Using a counter that increments every time a character matches, even when exceeding the required frequency.'
    ],
    visualizerType: 'sliding-window',
    runnable: {
      functionName: 'minWindow',
      starterCode: `function minWindow(s, t) {
  if (s.length < t.length) return "";
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  const window = new Map();
  let have = 0, required = need.size;
  let res = [-1, -1], resLen = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (right - left + 1 < resLen) {
        res = [left, right];
        resLen = right - left + 1;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) have--;
      left++;
    }
  }
  return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
}`,
      testCases: [
        { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
        { input: ['a', 'a'], expected: 'a' },
        { input: ['a', 'aa'], expected: '' }
      ]
    }
  }
];
