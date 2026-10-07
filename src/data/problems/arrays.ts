import { Problem } from '@/types';

export const arrayProblems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Hash Map Lookup (Complement)',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 == 6.'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    intuition: `A brute-force approach checks all pairs using two nested loops in O(N²) time.
To optimize to O(N), recognize that when examining an element \`x\`, we need to know whether \`target - x\` already appeared earlier in the array.
A Hash Map (dictionary) stores numbers seen so far mapped to their indices. For each number, we query the map in O(1) average time. If found, we have our answer immediately!`,
    algorithmSteps: [
      'Initialize an empty hash map `seen` to store number -> index.',
      'Iterate through the array with index `i` and value `num`.',
      'Compute `complement = target - num`.',
      'Check if `complement` exists in `seen`. If it does, return `[seen[complement], i]`.',
      'Otherwise, record `seen[num] = i`.',
      'Return empty array if no pair found (guaranteed not to occur per problem constraints).'
    ],
    solutions: {
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}  # val -> index
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'We traverse the list containing N elements exactly once. Each lookup and insertion in the hash table takes O(1) average time. The auxiliary space is O(N) to store up to N elements in the hash map.',
    commonPitfalls: [
      'Inserting all elements into the hash map in a first pass before checking complements can cause self-matching if `target - num == num` unless careful with duplicate indices.',
      'Assuming the array is sorted (it is not; sorting takes O(N log N) and loses original indices).'
    ],
    runnable: {
      functionName: 'twoSum',
      starterCode: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ]
    }
  },
  {
    id: 242,
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Frequency Count',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    companies: ['Amazon', 'Bloomberg', 'Uber'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    intuition: `If two strings are anagrams, they must have the exact same length and identical counts for every single character.
Instead of sorting both strings in O(N log N), we can count frequencies using a fixed-size integer array of length 26 (since only lowercase English characters are present), running in optimal O(N) time and O(1) extra memory.`,
    algorithmSteps: [
      'If len(s) != len(t), return false immediately.',
      'Initialize an array of size 26 initialized to 0.',
      'For each character in s, increment its count; for each character in t, decrement its count.',
      'If all 26 entries remain 0, return true; otherwise, return false.'
    ],
    solutions: {
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = [0] * 26
        for char_s, char_t in zip(s, t):
            count[ord(char_s) - ord('a')] += 1
            count[ord(char_t) - ord('a')] -= 1
        return all(c == 0 for c in count)`,
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - base]++;
        count[t.charCodeAt(i) - base]--;
    }
    return count.every(c => c === 0);
}`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (int i = 0; i < s.length(); ++i) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We make a single pass through strings of length N. The count array has a constant size of 26 regardless of input size, so auxiliary space is O(1).',
    commonPitfalls: [
      'Sorting both strings (takes O(N log N) which is suboptimal compared to counting).',
      'Not validating initial lengths (if lengths differ, they can never be anagrams).'
    ],
    runnable: {
      functionName: 'isAnagram',
      starterCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - base]++;
    count[t.charCodeAt(i) - base]--;
  }
  return count.every(c => c === 0);
}`,
      testCases: [
        { input: ['anagram', 'nagaram'], expected: true },
        { input: ['rat', 'car'], expected: false }
      ]
    }
  },
  {
    id: 49,
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'Medium',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Hash Map Grouping (Categorization Key)',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta'],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    intuition: `To group strings that are anagrams, we need a canonical "hash key" that is identical for any two strings that are anagrams of one another.
Two approaches work:
1. Sort each string alphabetically: "eat" -> "aet", "tea" -> "aet". Use the sorted string as map key. Takes O(N * K log K).
2. Count the 26 character frequencies: tuple of length 26 representing counts. Takes O(N * K).
In Python or JS, a tuple of 26 counts or sorted string works cleanly!`,
    algorithmSteps: [
      'Initialize a hash map where key is the canonical representation and value is a list of strings.',
      'For each word in `strs`:',
      '  Generate the signature (either sorted word or 26-element character count tuple).',
      '  Append the word to `map[signature]`.',
      'Return the values of the hash map as a list of lists.'
    ],
    solutions: {
      python: `from collections import defaultdict
from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        ans = defaultdict(list)
        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1
            ans[tuple(count)].append(s)
        return list(ans.values())`,
      javascript: `function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 97]++;
        }
        const key = count.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}`,
      cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            groups[key].push_back(s);
        }
        vector<vector<string>> result;
        for (auto& pair : groups) {
            result.push_back(pair.second);
        }
        return result;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = String.valueOf(chars);
            map.putIfAbsent(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
    },
    timeComplexity: 'O(N * K)',
    spaceComplexity: 'O(N * K)',
    complexityAnalysis: 'Where N is the number of strings and K is the maximum length of a string. Counting characters takes O(K) per string, yielding total O(N * K). The hash map stores all strings and keys, occupying O(N * K) space.',
    commonPitfalls: [
      'In JavaScript, using an array as a Map key directly checks reference identity, not content equality. You must serialize to a string like `count.join("#")`.',
      'Forgetting that empty strings `""` are valid words and must group together.'
    ],
    runnable: {
      functionName: 'groupAnagrams',
      starterCode: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - 97]++;
    }
    const key = count.join('#');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
      testCases: [
        {
          input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
          expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
        }
      ]
    }
  },
  {
    id: 347,
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'Medium',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Bucket Sort / Min-Heap',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    companies: ['Amazon', 'Facebook', 'Uber', 'Google'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.
Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.`,
    examples: [
      {
        input: 'nums = [1,1,1,2,2,3], k = 2',
        output: '[1,2]'
      },
      {
        input: 'nums = [1], k = 1',
        output: '[1]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.'
    ],
    intuition: `1. Count the frequencies of all numbers using a Hash Map in O(N).
2. To beat O(N log N) sorting:
   - Option A: Min-Heap of size K takes O(N log K).
   - Option B: Bucket Sort! Since the frequency of any element cannot exceed N, create an array of buckets from index 0 to N. \`bucket[freq]\` contains all numbers appearing with that frequency.
Iterate the buckets backwards from N down to 0, collecting elements until we have collected K elements. This achieves true O(N) time!`,
    algorithmSteps: [
      'Count frequency of each number using a hash map `count`.',
      'Create an array `buckets` of size `len(nums) + 1`, where each bucket is an empty list.',
      'For each `(num, freq)` in `count`, append `num` to `buckets[freq]`.',
      'Iterate backwards from index `len(nums)` down to 1.',
      'Append elements from each bucket to `result` until `len(result) == k`.',
      'Return `result`.'
    ],
    solutions: {
      python: `from collections import Counter
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = Counter(nums)
        buckets = [[] for _ in range(len(nums) + 1)]
        
        for num, freq in count.items():
            buckets[freq].append(num)
            
        res = []
        for freq in range(len(buckets) - 1, 0, -1):
            for num in buckets[freq]:
                res.append(num)
                if len(res) == k:
                    return res
        return res`,
      javascript: `function topKFrequent(nums, k) {
    const count = new Map();
    for (const num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of count.entries()) {
        buckets[freq].push(num);
    }
    const res = [];
    for (let i = buckets.length - 1; i > 0 && res.length < k; i--) {
        for (const num of buckets[i]) {
            res.push(num);
            if (res.length === k) return res;
        }
    }
    return res;
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int num : nums) count[num]++;
        
        vector<vector<int>> buckets(nums.size() + 1);
        for (auto& pair : count) {
            buckets[pair.second].push_back(pair.first);
        }
        
        vector<int> res;
        for (int i = nums.size(); i > 0 && res.size() < k; --i) {
            for (int num : buckets[i]) {
                res.push_back(num);
                if (res.size() == k) return res;
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
            buckets[freq].add(key);
        }
        int[] res = new int[k];
        int idx = 0;
        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {
            if (buckets[i] != null) {
                for (int num : buckets[i]) {
                    res[idx++] = num;
                    if (idx == k) return res;
                }
            }
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Building the frequency map takes O(N). Populating the bucket array of size N + 1 takes O(N). Scanning the buckets from right to left takes O(N) because the total count of elements across all buckets is equal to the number of distinct elements (<= N). Space complexity is O(N) for map and buckets.',
    commonPitfalls: [
      'Using a Max-Heap initialized with all N elements and popping K times: this takes O(N + K log N), which is fine but slower than bucket sort.',
      'Off-by-one error: buckets array must have size `len(nums) + 1` because an element can appear up to `len(nums)` times.'
    ],
    runnable: {
      functionName: 'topKFrequent',
      starterCode: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const num of nums) count.set(num, (count.get(num) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of count.entries()) buckets[freq].push(num);
  const res = [];
  for (let i = buckets.length - 1; i > 0 && res.length < k; i--) {
    for (const num of buckets[i]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}`,
      testCases: [
        { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
        { input: [[1], 1], expected: [1] }
      ]
    }
  },
  {
    id: 238,
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'Medium',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Prefix and Suffix Accumulation',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    companies: ['Amazon', 'Apple', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.
The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.`,
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]'
      },
      {
        input: 'nums = [-1,1,0,-3,3]',
        output: '[0,0,9,0,0]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'
    ],
    intuition: `If division were allowed, we could multiply all numbers and divide by nums[i] (handling zeros carefully). But division is strictly forbidden!
Notice: for any index \`i\`, the product of all numbers except \`nums[i]\` is simply:
\`(product of all elements to the left of i) * (product of all elements to the right of i)\`
We can do this in two passes:
1. First pass (left to right): compute prefix products and store directly into the output array.
2. Second pass (right to left): maintain a running suffix product and multiply it into each output position in-place!
This achieves O(1) auxiliary space (output array does not count as extra space per problem description).`,
    algorithmSteps: [
      'Initialize `output` array of length N, with `output[0] = 1`.',
      'Forward pass: for `i` from 1 to N-1, `output[i] = output[i - 1] * nums[i - 1]`. Now `output[i]` contains the product of all elements to the left of `i`.',
      'Initialize `suffix = 1`.',
      'Backward pass: for `i` from N-1 down to 0, multiply `output[i] *= suffix`, then update `suffix *= nums[i]`.',
      'Return `output`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        
        # Left prefix pass
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
            
        # Right suffix pass
        suffix = 1
        for i in range(n - 1, -1, -1):
            res[i] *= suffix
            suffix *= nums[i]
            
        return res`,
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        
        for (int i = 1; i < n; ++i) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int suffix = 1;
        for (int i = n - 1; i >= 0; --i) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        
        return res;
    }
};`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Two linear passes through the array of length N take O(N) time total. Modifying the output array directly without additional left/right arrays achieves O(1) auxiliary space.',
    commonPitfalls: [
      'Using division: violates the explicit problem constraint.',
      'Creating separate `prefix` and `suffix` arrays: uses O(N) auxiliary space instead of O(1).'
    ],
    runnable: {
      functionName: 'productExceptSelf',
      starterCode: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
      testCases: [
        { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
        { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
      ]
    }
  },
  {
    id: 128,
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    difficulty: 'Medium',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: 'Hash Set Sequence Boundary',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    companies: ['Google', 'Meta', 'Amazon', 'Spotify'],
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.`,
    examples: [
      {
        input: 'nums = [100,4,200,1,3,2]',
        output: '4',
        explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.'
      },
      {
        input: 'nums = [0,3,7,2,5,8,4,6,0,1]',
        output: '9'
      }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    intuition: `Sorting the array takes O(N log N), which exceeds the required O(N) limit.
How can we verify consecutive sequences in O(N)?
Insert all numbers into a Hash Set for O(1) lookups.
Key insight: A number \`num\` is the start of a consecutive sequence IF AND ONLY IF \`num - 1\` is NOT in the set!
If \`num - 1\` is in the set, we skip \`num\` because it will be counted as part of a sequence that started earlier.
If \`num - 1\` is not in the set, we count upwards: \`num + 1, num + 2, ...\` while they exist in the set.
Since each number is visited at most twice across all sequence extensions, total time is strictly O(N)!`,
    algorithmSteps: [
      'Convert `nums` into a set `num_set`.',
      'Initialize `longest = 0`.',
      'For each `num` in `num_set`:',
      '  Check if `num - 1` is in `num_set`. If so, skip (not sequence start).',
      '  If `num - 1` is NOT in `num_set`, this is a sequence start:',
      '    Initialize `current_num = num` and `current_streak = 1`.',
      '    While `current_num + 1` in `num_set`: increment `current_num` and `current_streak`.',
      '    Update `longest = max(longest, current_streak)`.',
      'Return `longest`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        
        for num in num_set:
            # Only start counting if num is the beginning of a sequence
            if (num - 1) not in num_set:
                curr = num
                streak = 1
                while (curr + 1) in num_set:
                    curr += 1
                    streak += 1
                longest = max(longest, streak)
                
        return longest`,
      javascript: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    
    for (const num of set) {
        if (!set.has(num - 1)) {
            let curr = num;
            let streak = 1;
            while (set.has(curr + 1)) {
                curr++;
                streak++;
            }
            longest = Math.max(longest, streak);
        }
    }
    
    return longest;
}`,
      cpp: `#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end());
        int longest = 0;
        
        for (int num : num_set) {
            if (num_set.find(num - 1) == num_set.end()) {
                int curr = num;
                int streak = 1;
                while (num_set.find(curr + 1) != num_set.end()) {
                    curr++;
                    streak++;
                }
                longest = max(longest, streak);
            }
        }
        
        return longest;
    }
};`,
      java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);
        
        int longest = 0;
        for (int num : set) {
            if (!set.contains(num - 1)) {
                int curr = num;
                int streak = 1;
                while (set.contains(curr + 1)) {
                    curr++;
                    streak++;
                }
                longest = Math.max(longest, streak);
            }
        }
        
        return longest;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Inserting N numbers into a hash set takes O(N). The inner while loop only executes for numbers that represent sequence starts, and each number in a sequence is evaluated once. Hence the total operations across all loops is 2N, which is O(N). Space is O(N) for the hash set.',
    commonPitfalls: [
      'Iterating over the original `nums` list instead of `num_set` leads to duplicate work when there are duplicate values.',
      'Checking sequence length from every number without the `num - 1 not in set` condition degrades performance to O(N²).'
    ],
    runnable: {
      functionName: 'longestConsecutive',
      starterCode: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let curr = num;
      let streak = 1;
      while (set.has(curr + 1)) {
        curr++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}`,
      testCases: [
        { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
        { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 }
      ]
    }
  },
  {
    id: 53,
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Medium',
    topic: 'arrays-and-hashing',
    topicName: 'Arrays & Hashing',
    pattern: "Kadane's Algorithm",
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'LinkedIn'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    intuition: `Kadane's Algorithm maintains a running sum of the current subarray.
At each element \`num\`, we face a choice:
1. Extend the previous subarray: \`current_sum + num\`
2. Discard the previous subarray and start fresh at \`num\` because the previous sum was negative and would only drag down any future subarray!
Therefore, \`current_sum = max(num, current_sum + num)\`.
We keep track of the maximum \`current_sum\` seen so far.`,
    algorithmSteps: [
      'Initialize `max_sum = nums[0]` and `current_sum = nums[0]`.',
      'Iterate through the array starting from index 1 to N-1.',
      'At each element `num`, update `current_sum = max(num, current_sum + num)`.',
      'Update `max_sum = max(max_sum, current_sum)`.',
      'Return `max_sum`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        
        for num in nums[1:]:
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)
            
        return max_sum`,
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (size_t i = 1; i < nums.size(); ++i) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'Single linear scan through the array requires O(N) time. Only two scalar variables (`max_sum` and `current_sum`) are tracked, using O(1) auxiliary space.',
    commonPitfalls: [
      'Initializing `max_sum = 0`: fails if all numbers in the array are negative (e.g. `[-5, -2, -9]`, correct answer is `-2`, not `0`).',
      'Confusing subarray (must be contiguous) with subsequence (can skip elements).'
    ],
    runnable: {
      functionName: 'maxSubArray',
      starterCode: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      testCases: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
        { input: [[1]], expected: 1 },
        { input: [[5, 4, -1, 7, 8]], expected: 23 }
      ]
    }
  }
];
