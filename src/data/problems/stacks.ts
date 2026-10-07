import { Problem } from '@/types';

export const stackProblems: Problem[] = [
  {
    id: 20,
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'stacks-and-queues',
    topicName: 'Stacks, Queues & Monotonic Structures',
    pattern: 'LIFO Bracket Matching',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google', 'Apple'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    intuition: `Parentheses problems follow a strictly nested Last-In, First-Out structure: the most recently opened bracket must be the first one closed.
Maintain a Stack:
- When encountering an opening bracket \`(\`, \`[\`, \`{\`, push it onto the stack.
- When encountering a closing bracket, the stack must not be empty, and the top element must match the closing bracket. Pop it.
- At the end of the string, the stack must be completely empty.`,
    algorithmSteps: [
      'Initialize an empty stack.',
      'Define a mapping of closing bracket to opening bracket: `{\')\': \'(\', \'}\': \'{\', \']\': \'[\'}`.',
      'Iterate through each character in the string:',
      '  If char is a closing bracket:',
      '    If stack is empty or top of stack != mapping[char], return false.',
      '    Pop the top element.',
      '  Else (opening bracket): push char onto stack.',
      'Return true if stack is empty, otherwise false.'
    ],
    solutions: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
                
        return not stack`,
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (map[char]) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
        
        for (char c : s) {
            if (map.count(c)) {
                if (st.empty() || st.top() != map[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      java: `import java.util.Stack;
import java.util.Map;
import java.util.HashMap;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = new HashMap<>();
        map.put(')', '(');
        map.put('}', '{');
        map.put(']', '[');
        
        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'We traverse the string of length N once. Push and pop operations on a stack take O(1). In the worst case (e.g. "((((("), the stack holds N characters, requiring O(N) space.',
    commonPitfalls: [
      'Popping without checking `if stack` first (throws underflow/empty stack error).',
      'Forgetting to check `not stack` at the end: unclosed opening brackets like `"(("` would return true without this check.'
    ],
    visualizerType: 'stack',
    runnable: {
      functionName: 'isValid',
      starterCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.length === 0 || stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      testCases: [
        { input: ['()'], expected: true },
        { input: ['()[]{}'], expected: true },
        { input: ['(]'], expected: false }
      ]
    }
  },
  {
    id: 155,
    title: 'Min Stack',
    slug: 'min-stack',
    difficulty: 'Medium',
    topic: 'stacks-and-queues',
    topicName: 'Stacks, Queues & Monotonic Structures',
    pattern: 'Dual Stack / Auxiliary Minimums',
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
    companies: ['Amazon', 'Bloomberg', 'Google', 'Microsoft'],
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element val onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each operation.`,
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2'
      }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'Methods pop, top and getMin operations will always be called on non-empty stacks.',
      'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'
    ],
    intuition: `A standard stack retrieves the top element in O(1). However, when we pop the minimum element, we must know what the previous minimum was.
To achieve O(1) retrieval for getMin(), pair each value with the current minimum at that point in time, or maintain a secondary \`min_stack\`.
Every time we push \`x\`, push \`min(x, min_stack[-1])\` to the min stack. Every time we pop, pop from both stacks.
Now \`getMin()\` is simply \`min_stack[-1]\` in O(1)!`,
    algorithmSteps: [
      'Maintain two internal lists: `stack` (normal values) and `min_stack` (prefix minimums).',
      'push(val): append `val` to `stack`. Append `min(val, min_stack[-1])` to `min_stack` (or just `val` if `min_stack` is empty).',
      'pop(): pop from both `stack` and `min_stack`.',
      'top(): return `stack[-1]`.',
      'getMin(): return `min_stack[-1]`.'
    ],
    solutions: {
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(current_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
      javascript: `class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    push(val) {
        this.stack.push(val);
        const currentMin = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(currentMin);
    }
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}`,
      cpp: `#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
private:
    stack<int> st;
    stack<int> min_st;
public:
    MinStack() {}
    
    void push(int val) {
        st.push(val);
        if (min_st.empty() || val <= min_st.top()) {
            min_st.push(val);
        } else {
            min_st.push(min_st.top());
        }
    }
    
    void pop() {
        st.pop();
        min_st.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return min_st.top();
    }
};`,
      java: `import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public MinStack() {}

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`
    },
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Each operation (push, pop, top, getMin) executes constant-time array access / appends in O(1). The secondary stack stores at most N elements, using O(N) space.',
    commonPitfalls: [
      'Iterating through the stack on each call to `getMin()` (takes O(N), which violates O(1) requirement).',
      'Forgetting to pop from the min stack when an element is popped from the main stack.'
    ],
    visualizerType: 'stack'
  },
  {
    id: 739,
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    difficulty: 'Medium',
    topic: 'stacks-and-queues',
    topicName: 'Stacks, Queues & Monotonic Structures',
    pattern: 'Monotonic Decreasing Stack',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
    companies: ['Amazon', 'Meta', 'Google', 'Apple'],
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i-th\` day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    examples: [
      {
        input: 'temperatures = [73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]'
      },
      {
        input: 'temperatures = [30,40,50,60]',
        output: '[1,1,1,0]'
      },
      {
        input: 'temperatures = [30,60,90]',
        output: '[1,1,0]'
      }
    ],
    constraints: [
      '1 <= temperatures.length <= 10^5',
      '30 <= temperatures[i] <= 100'
    ],
    intuition: `This is the classic "Next Greater Element" problem!
Brute force checks all future days in O(N²).
With a Monotonic Stack: maintain a stack of day indices with strictly decreasing temperatures.
When the current day temperature \`curr_temp\` is strictly warmer than the temperature at the stack top index \`prev_idx\`:
Pop \`prev_idx\`! We just found its warmer day! The wait distance is \`i - prev_idx\`.
Continue popping as long as \`curr_temp > temperatures[stack[-1]]\`.
Then push the current day \`i\` onto the stack.`,
    algorithmSteps: [
      'Initialize `res` array of size N filled with 0s.',
      'Initialize an empty stack `stack` to store indices.',
      'For `i` from 0 to N - 1 with `temp = temperatures[i]`:',
      '  While `stack` is not empty and `temp > temperatures[stack[-1]]:`',
      '    `prev_idx = stack.pop()`',
      '    `res[prev_idx] = i - prev_idx`',
      '  Append `i` to `stack`.',
      'Return `res`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n
        stack = []  # indices
        
        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_idx = stack.pop()
                res[prev_idx] = i - prev_idx
            stack.append(i)
            
        return res`,
      javascript: `function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const res = new Array(n).fill(0);
    const stack = []; // indices
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIdx = stack.pop();
            res[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }
    return res;
}`,
      cpp: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // indices
        
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top();
                st.pop();
                res[prev] = i - prev;
            }
            st.push(i);
        }
        return res;
    }
};`,
      java: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIdx = stack.pop();
                res[prevIdx] = i - prevIdx;
            }
            stack.push(i);
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Even with the while loop, each index is pushed onto the stack exactly once and popped at most once. Hence, total operations across all iterations is at most 2N = O(N). Space is O(N) to store indices in the stack.',
    commonPitfalls: [
      'Storing temperature values instead of indices in the stack (indices allow calculating distance `i - prev_idx` AND looking up the temperature `temperatures[idx]`).',
      'Using `>=` instead of `>` when popping (we only pop when the day is STRICTLY warmer).'
    ],
    visualizerType: 'stack',
    runnable: {
      functionName: 'dailyTemperatures',
      starterCode: `function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      res[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return res;
}`,
      testCases: [
        { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
        { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] }
      ]
    }
  },
  {
    id: 84,
    title: 'Largest Rectangle in Histogram',
    slug: 'largest-rectangle-in-histogram',
    difficulty: 'Hard',
    topic: 'stacks-and-queues',
    topicName: 'Stacks, Queues & Monotonic Structures',
    pattern: 'Monotonic Increasing Stack',
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
    examples: [
      {
        input: 'heights = [2,1,5,6,2,3]',
        output: '10',
        explanation: 'The largest rectangle is shown in red, which has an area = 10 units (height 5 * width 2 formed by [5, 6]).'
      },
      {
        input: 'heights = [2,4]',
        output: '4'
      }
    ],
    constraints: [
      '1 <= heights.length <= 10^5',
      '0 <= heights[i] <= 10^4'
    ],
    intuition: `For each bar of height \`h\`, how far can a rectangle of height \`h\` extend to the left and right?
It extends until it hits a bar strictly SHORTER than \`h\`!
Maintain a Monotonic Increasing Stack of \`(index, height)\`.
When an incoming bar is shorter than the stack top:
The popped bar cannot extend to the right past the current index.
Its width extends from the popped bar's start index to the current index \`i\`.
Area = \`height * (i - start_index)\`.
Furthermore, the current incoming bar can extend all the way left to the start of the popped taller bar!`,
    algorithmSteps: [
      'Initialize `max_area = 0` and `stack = []` storing tuples `(start_index, height)`.',
      'For `i, h` in enumerate(heights):',
      '  `start = i`',
      '  While `stack` and `stack[-1][1] > h`:',
      '    `idx, height = stack.pop()`',
      '    `max_area = max(max_area, height * (i - idx))`',
      '    `start = idx` (current bar can extend leftwards)',
      '  Append `(start, h)` to `stack`.',
      'For any remaining bars in stack after iteration:',
      '  `max_area = max(max_area, height * (len(heights) - idx))`',
      'Return `max_area`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        max_area = 0
        stack = []  # (index, height)
        
        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] > h:
                idx, height = stack.pop()
                max_area = max(max_area, height * (i - idx))
                start = idx
            stack.append((start, h))
            
        n = len(heights)
        for idx, height in stack:
            max_area = max(max_area, height * (n - idx))
            
        return max_area`,
      javascript: `function largestRectangleArea(heights) {
    let maxArea = 0;
    const stack = []; // [index, height]
    
    for (let i = 0; i < heights.length; i++) {
        let start = i;
        while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
            const [idx, h] = stack.pop();
            maxArea = Math.max(maxArea, h * (i - idx));
            start = idx;
        }
        stack.push([start, heights[i]]);
    }
    
    const n = heights.length;
    for (const [idx, h] of stack) {
        maxArea = Math.max(maxArea, h * (n - idx));
    }
    return maxArea;
}`,
      cpp: `#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int max_area = 0;
        stack<pair<int, int>> st; // {start_index, height}
        
        for (int i = 0; i < heights.size(); ++i) {
            int start = i;
            while (!st.empty() && st.top().second > heights[i]) {
                auto [idx, h] = st.top();
                st.pop();
                max_area = max(max_area, h * (i - idx));
                start = idx;
            }
            st.push({start, heights[i]});
        }
        
        int n = heights.size();
        while (!st.empty()) {
            auto [idx, h] = st.top();
            st.pop();
            max_area = max(max_area, h * (n - idx));
        }
        return max_area;
    }
};`,
      java: `import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<int[]> stack = new Stack<>(); // [start_index, height]
        
        for (int i = 0; i < heights.length; i++) {
            int start = i;
            while (!stack.isEmpty() && stack.peek()[1] > heights[i]) {
                int[] top = stack.pop();
                maxArea = Math.max(maxArea, top[1] * (i - top[0]));
                start = top[0];
            }
            stack.push(new int[]{start, heights[i]});
        }
        
        int n = heights.length;
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            maxArea = Math.max(maxArea, top[1] * (n - top[0]));
        }
        return maxArea;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Each bar is pushed and popped at most once. All rectangle evaluations execute in O(1), leading to O(N) overall execution. The stack holds at most N elements, consuming O(N) space.',
    commonPitfalls: [
      'Forgetting that the remaining elements in the stack at the end can extend all the way to index N.',
      'Resetting `start = i` instead of remembering the leftmost popped bar index.'
    ],
    visualizerType: 'stack',
    runnable: {
      functionName: 'largestRectangleArea',
      starterCode: `function largestRectangleArea(heights) {
  let maxArea = 0;
  const stack = [];
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
      const [idx, h] = stack.pop();
      maxArea = Math.max(maxArea, h * (i - idx));
      start = idx;
    }
    stack.push([start, heights[i]]);
  }
  const n = heights.length;
  for (const [idx, h] of stack) {
    maxArea = Math.max(maxArea, h * (n - idx));
  }
  return maxArea;
}`,
      testCases: [
        { input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
        { input: [[2, 4]], expected: 4 }
      ]
    }
  },
  {
    id: 239,
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    difficulty: 'Hard',
    topic: 'stacks-and-queues',
    topicName: 'Stacks, Queues & Monotonic Structures',
    pattern: 'Monotonic Decreasing Deque',
    leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
    companies: ['Amazon', 'Google', 'Meta', 'Uber', 'Microsoft'],
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.`,
    examples: [
      {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
        explanation: 'Window position                Max\n------------------------     -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7'
      },
      {
        input: 'nums = [1], k = 1',
        output: '[1]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      '1 <= k <= nums.length'
    ],
    intuition: `Using a Max-Heap takes O(N log K), which is too slow or complex to evict out-of-window elements.
Instead, use a Monotonic Decreasing Deque storing indices:
1. When a new element \`nums[i]\` arrives, any elements in the deque smaller than \`nums[i]\` can NEVER be the maximum in this or any future window! Pop them from the back.
2. Evict the front element if its index is out of bounds (\`idx <= i - k\`).
3. The maximum for the current window is ALWAYS the element at \`deque[0]\`!
Since each element is added and removed at most once, total runtime is O(N)!`,
    algorithmSteps: [
      'Initialize `deque = collections.deque()` storing indices, and `res = []`.',
      'For `i` from 0 to len(nums) - 1:',
      '  If `deque[0] == i - k`, popleft (expired from window).',
      '  While `deque` and `nums[deque[-1]] < nums[i]`: pop from back.',
      '  Append `i` to deque.',
      '  If `i >= k - 1`: append `nums[deque[0]]` to `res`.',
      'Return `res`.'
    ],
    solutions: {
      python: `from collections import deque
from typing import List

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q = deque()  # stores indices
        res = []
        
        for i, num in enumerate(nums):
            # Remove indices outside current window
            if q and q[0] <= i - k:
                q.popleft()
                
            # Maintain decreasing monotonicity
            while q and nums[q[-1]] < num:
                q.pop()
                
            q.append(i)
            
            # Start recording results once window size is reached
            if i >= k - 1:
                res.append(nums[q[0]])
                
        return res`,
      javascript: `function maxSlidingWindow(nums, k) {
    const q = []; // stores indices
    const res = [];
    
    for (let i = 0; i < nums.length; i++) {
        if (q.length > 0 && q[0] <= i - k) {
            q.shift();
        }
        while (q.length > 0 && nums[q[q.length - 1]] < nums[i]) {
            q.pop();
        }
        q.push(i);
        if (i >= k - 1) {
            res.push(nums[q[0]]);
        }
    }
    return res;
}`,
      cpp: `#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> q;
        vector<int> res;
        
        for (int i = 0; i < nums.size(); ++i) {
            if (!q.empty() && q.front() <= i - k) {
                q.pop_front();
            }
            while (!q.empty() && nums[q.back()] < nums[i]) {
                q.pop_back();
            }
            q.push_back(i);
            if (i >= k - 1) {
                res.push_back(nums[q.front()]);
            }
        }
        return res;
    }
};`,
      java: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> q = new ArrayDeque<>();
        int[] res = new int[nums.length - k + 1];
        int idx = 0;
        
        for (int i = 0; i < nums.length; i++) {
            if (!q.isEmpty() && q.peekFirst() <= i - k) {
                q.pollFirst();
            }
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            q.offerLast(i);
            if (i >= k - 1) {
                res[idx++] = nums[q.peekFirst()];
            }
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    complexityAnalysis: 'Every index is pushed to and popped from the deque at most once. The deque holds at most K elements simultaneously, requiring O(K) extra space.',
    commonPitfalls: [
      'In JavaScript, using `Array.shift()` inside a hot loop is O(K), which degrades worst case to O(N * K). For strict O(N) in JS, use a pointer or a custom linked queue.',
      'Pushing values instead of indices (indices are needed to check if an element is expired from the sliding window).'
    ],
    visualizerType: 'sliding-window',
    runnable: {
      functionName: 'maxSlidingWindow',
      starterCode: `function maxSlidingWindow(nums, k) {
  const q = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (q.length > 0 && q[0] <= i - k) q.shift();
    while (q.length > 0 && nums[q[q.length - 1]] < nums[i]) q.pop();
    q.push(i);
    if (i >= k - 1) res.push(nums[q[0]]);
  }
  return res;
}`,
      testCases: [
        { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
        { input: [[1], 1], expected: [1] }
      ]
    }
  }
];
