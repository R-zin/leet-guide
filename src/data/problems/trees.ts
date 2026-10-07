import { Problem } from '@/types';

export const treeProblems: Problem[] = [
  {
    id: 226,
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    difficulty: 'Easy',
    topic: 'trees',
    topicName: 'Trees & Binary Search Trees',
    pattern: 'Recursive Tree DFS',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]'
      },
      {
        input: 'root = [2,1,3]',
        output: '[2,3,1]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    intuition: `To invert (mirror) a binary tree:
At every node, swap its left and right children, then recursively invert the left and right subtrees.
Base case: if \`root\` is null, return null.`,
    algorithmSteps: [
      'If `root` is None: return None.',
      'Swap `root.left` and `root.right`.',
      'Recursively call `invertTree(root.left)` and `invertTree(root.right)`.',
      'Return `root`.'
    ],
    solutions: {
      python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
            
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        
        return root`,
      javascript: `function invertTree(root) {
    if (!root) return null;
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    complexityAnalysis: 'Every node is visited once, requiring O(N) time. The call stack consumes O(H) space where H is tree height (O(log N) for balanced trees, O(N) worst case for skewed trees).',
    commonPitfalls: [
      'Overwriting `root.left` before saving its reference to swap with `root.right` in languages without tuple unpack.',
      'Forgetting the null check base case.'
    ]
  },
  {
    id: 104,
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    difficulty: 'Easy',
    topic: 'trees',
    topicName: 'Trees & Binary Search Trees',
    pattern: 'Divide and Conquer Post-Order DFS',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    companies: ['Amazon', 'Google', 'Meta', 'LinkedIn'],
    description: `Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      },
      {
        input: 'root = [1,null,2]',
        output: '2'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    intuition: `The height of a binary tree rooted at node \`root\` is:
\`1 + max(height(root.left), height(root.right))\`.
If \`root\` is null, depth is 0.`,
    algorithmSteps: [
      'If `root` is None: return 0.',
      'Compute `left_depth = maxDepth(root.left)`.',
      'Compute `right_depth = maxDepth(root.right)`.',
      'Return `1 + max(left_depth, right_depth)`.'
    ],
    solutions: {
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
      javascript: `function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    complexityAnalysis: 'We traverse all N nodes once, taking O(N) runtime. Call stack memory is bounded by tree height H (worst case O(N), balanced O(log N)).',
    commonPitfalls: [
      'Confusing depth (distance from root) with height or node count.',
      'Forgetting that empty tree has depth 0.'
    ]
  },
  {
    id: 102,
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    topic: 'trees',
    topicName: 'Trees & Binary Search Trees',
    pattern: 'Queue-Based BFS Level Order',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]'
      },
      {
        input: 'root = [1]',
        output: '[[1]]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    intuition: `Use Breadth-First Search (BFS) with a Queue.
At the beginning of each level loop, capture \`level_size = len(queue)\`.
Pop exactly \`level_size\` nodes: all these nodes belong to the CURRENT level!
For each popped node, add its children to the queue for the NEXT level.`,
    algorithmSteps: [
      'If `root` is None: return [].',
      'Initialize `queue = deque([root])` and `result = []`.',
      'While `queue` is not empty:',
      '  `level_size = len(queue)`, initialize `current_level = []`.',
      '  For `_` in range(level_size):',
      '    `node = queue.popleft()`',
      '    `current_level.append(node.val)`',
      '    If `node.left`: queue.append(node.left)',
      '    If `node.right`: queue.append(node.right)',
      '  `result.append(current_level)`',
      'Return `result`.'
    ],
    solutions: {
      python: `from collections import deque
from typing import List, Optional

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
            
        res = []
        queue = deque([root])
        
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            res.append(level)
            
        return res`,
      javascript: `function levelOrder(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(currentLevel);
    }
    return res;
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int level_size = q.size();
            vector<int> level;
            for (int i = 0; i < level_size; ++i) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'Each node is enqueued and dequeued once, taking O(N) runtime. The queue holds at most N/2 nodes at the bottom level of a balanced tree, taking O(N) space.',
    commonPitfalls: [
      'Using `len(queue)` inside the loop condition without caching `level_size` first (as queue size expands while adding child nodes!).',
      'Forgetting to check if root is null at start.'
    ]
  },
  {
    id: 98,
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    difficulty: 'Medium',
    topic: 'trees',
    topicName: 'Trees & Binary Search Trees',
    pattern: 'Range Invariant BST Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    companies: ['Amazon', 'Bloomberg', 'Meta', 'Microsoft'],
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true'
      },
      {
        input: 'root = [5,1,4,null,null,3,6]',
        output: 'false',
        explanation: 'The root node\'s value is 5 but its right child\'s value is 4.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    intuition: `Common Trap: Checking only that \`node.left.val < node.val < node.right.val\` locally is INSUFFICIENT.
Every node in the left subtree must be smaller than the ancestor!
Example: [5, 4, 6, null, null, 3, 7] — 3 is in 5's right subtree, which is invalid even though 3 < 6 locally.
Correct approach: Pass valid boundaries \`(low, high)\` down the recursion.
Initially: \`(-inf, +inf)\`.
For left child: update upper bound \`(low, node.val)\`.
For right child: update lower bound \`(node.val, high)\`.`,
    algorithmSteps: [
      'Define helper function `validate(node, low, high)`.',
      'If `node` is None: return true.',
      'If not `low < node.val < high`: return false.',
      'Return `validate(node.left, low, node.val) and validate(node.right, node.val, high)`.',
      'Call `validate(root, -inf, +inf)`.'
    ],
    solutions: {
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
            
        return validate(root, float('-inf'), float('inf'))`,
      javascript: `function isValidBST(root) {
    function validate(node, low, high) {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    return validate(root, -Infinity, Infinity);
}`,
      cpp: `#include <climits>

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
    
    bool validate(TreeNode* node, long long low, long long high) {
        if (!node) return true;
        if (node->val <= low || node->val >= high) return false;
        return validate(node->left, low, node->val) && validate(node->right, node->val, high);
    }
};`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    
    private boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) {
            return false;
        }
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    complexityAnalysis: 'Each node is visited once in O(N) time. Recursion stack takes O(H) space where H is tree height.',
    commonPitfalls: [
      'Using `<=` or `>=` instead of strict `<` and `>` (BST keys must be strictly unique).',
      'Using `INT_MIN` / `INT_MAX` directly in C++/Java without `long` (if a node value is `Integer.MIN_VALUE`, comparison overflows).'
    ]
  },
  {
    id: 124,
    title: 'Binary Tree Maximum Path Sum',
    slug: 'binary-tree-maximum-path-sum',
    difficulty: 'Hard',
    topic: 'trees',
    topicName: 'Trees & Binary Search Trees',
    pattern: 'Bottom-Up Post-Order Split Path',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'ByteDance'],
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
The path sum of a path is the sum of the node's values in the path.
Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '6',
        explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.'
      },
      {
        input: 'root = [-10,9,20,null,null,15,7]',
        output: '42',
        explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    intuition: `At each node, there are two distinct concepts:
1. Max Path Passing Through Node (as the peak of the inverted "V" path):
   \`node.val + max(0, left_gain) + max(0, right_gain)\`.
   This path cannot be extended to node's parent because a path cannot branch into both children and also go up to the parent!
2. Max Path Branch To Return to Parent:
   \`node.val + max(0, max(left_gain, right_gain))\`.
   This can be extended upwards to the parent.
We maintain a global \`max_sum\` initialized to \`-inf\`. At every node, we update \`max_sum\` with the peak path sum, and return the single branch gain to the parent.`,
    algorithmSteps: [
      'Initialize `max_sum = -infinity`.',
      'Define helper function `max_gain(node)`:',
      '  If node is None, return 0.',
      '  `left_gain = max(0, max_gain(node.left))` (ignore negative subpaths).',
      '  `right_gain = max(0, max_gain(node.right))`.',
      '  `current_peak = node.val + left_gain + right_gain`.',
      '  `max_sum = max(max_sum, current_peak)`.',
      '  Return `node.val + max(left_gain, right_gain)`.',
      'Call `max_gain(root)` and return `max_sum`.'
    ],
    solutions: {
      python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float('-inf')
        
        def max_gain(node):
            nonlocal max_sum
            if not node:
                return 0
                
            left_gain = max(0, max_gain(node.left))
            right_gain = max(0, max_gain(node.right))
            
            # Path with current node as highest point
            price_newpath = node.val + left_gain + right_gain
            max_sum = max(max_sum, price_newpath)
            
            # Return max gain extending to parent
            return node.val + max(left_gain, right_gain)
            
        max_gain(root)
        return max_sum`,
      javascript: `function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        const leftGain = Math.max(0, maxGain(node.left));
        const rightGain = Math.max(0, maxGain(node.right));
        
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}`,
      cpp: `#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    int max_sum = INT_MIN;
    
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int left = max(0, maxGain(node->left));
        int right = max(0, maxGain(node->right));
        max_sum = max(max_sum, node->val + left + right);
        return node->val + max(left, right);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return max_sum;
    }
};`,
      java: `class Solution {
    private int maxSum = Integer.MIN_VALUE;
    
    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }
    
    private int maxGain(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, maxGain(node.left));
        int right = Math.max(0, maxGain(node.right));
        maxSum = Math.max(maxSum, node.val + left + right);
        return node.val + Math.max(left, right);
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    complexityAnalysis: 'Traverses each node in the tree once in post-order DFS, taking O(N) time. Call stack depth is bounded by tree height H, taking O(H) space.',
    commonPitfalls: [
      'Not taking `max(0, child_gain)`: if a child branch has a negative total sum, adding it would decrease the path sum! We must discard negative paths.',
      'Returning `node.val + left + right` to parent (illegal because a path cannot bifurcate and also continue up to parent).'
    ]
  }
];
