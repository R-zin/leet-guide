import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    slug: 'arrays-and-hashing',
    title: 'Arrays & Hashing',
    icon: 'Layers',
    shortDescription: 'Master memory layouts, O(1) amortized hash tables, prefix sums, frequency counting, and two-pass techniques.',
    difficultyFocus: 'Fundamental - High Frequency',
    longOverview: `Arrays are contiguous blocks of memory where items can be accessed in O(1) time by index. However, insertions and deletions at arbitrary indices take O(N) due to element shifting.
    
Hash Tables (HashMaps and HashSets) provide average O(1) lookup, insertion, and deletion by mapping keys to array buckets through a hash function.
When combined, Arrays and Hashing form the bedrock of technical interviews. They transform brute-force O(N²) search problems into optimal O(N) single-pass scans by trading O(N) auxiliary space for time.`,
    keyConcepts: [
      {
        title: 'Memory Contiguity & Cache Locality',
        explanation: 'Because array elements reside consecutively in physical RAM, CPU caching (L1/L2/L3) prefetches adjacent elements into cache lines. This makes sequential array iteration orders of magnitude faster in practice than traversing pointer-linked data structures.',
      },
      {
        title: 'Hash Collisions & Amortization',
        explanation: 'When multiple keys hash to the same bucket index, hash tables resolve collisions via Chaining (linked lists or balanced trees per bucket) or Open Addressing (linear/quadratic probing). When the load factor exceeds a threshold (typically 0.75), the backing array doubles in size, resulting in amortized O(1) insertions.',
      },
      {
        title: 'Prefix Sums / Cumulative Frequencies',
        explanation: 'Precomputing prefix[i] = nums[0] + ... + nums[i] enables any range sum query sum(nums[L...R]) in exact O(1) time: prefix[R] - prefix[L - 1]. This technique is vital for subarray sum problems with targets.',
        codeSnippet: `// Python Prefix Sum Template
prefix = [0] * (len(nums) + 1)
for i in range(len(nums)):
    prefix[i + 1] = prefix[i] + nums[i]
# Range sum [L, R] inclusive:
# total = prefix[R + 1] - prefix[L]`
      },
      {
        title: 'Frequency Counter Pattern',
        explanation: 'Instead of comparing elements pairwise (O(N²)), build a frequency table (HashMap or fixed-size array of 26 integers for lowercase ASCII). Anagrams, permutations, and uniqueness checks boil down to comparing counts in O(N).',
      }
    ],
    whenToUse: [
      'Problem asks to find a pair, triplet, or subarray summing to a target value',
      'Need to check if elements have appeared before (seen set) in O(1)',
      'Anagram detection, string character frequency comparisons',
      'Subarray sum equals K problems (use Prefix Sum + HashMap)',
      'Finding duplicates, majority elements, or missing numbers'
    ],
    templates: [
      {
        name: 'Two Sum / Seen Map Template',
        language: 'python',
        code: `def two_sum_pattern(nums, target):
    seen = {} # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        explanation: 'Store visited elements in a map to verify complements in O(1) time without nested loops.'
      },
      {
        name: 'Prefix Sum with Target Hash Map',
        language: 'python',
        code: `def subarray_sum(nums, k):
    count = 0
    curr_sum = 0
    prefix_map = {0: 1} # sum -> frequency
    
    for num in nums:
        curr_sum += num
        # If curr_sum - k was seen, that means subarray sum is k!
        if (curr_sum - k) in prefix_map:
            count += prefix_map[curr_sum - k]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
        
    return count`,
        explanation: 'Solves Subarray Sum Equals K in O(N) time and O(N) space using running prefix sum differences.'
      }
    ],
    commonMistakes: [
      'Forgetting that Hash Table lookups can degenerate to O(N) in worst-case collisions (or with poorly distributed hash keys).',
      'Modifying an array in-place while iterating forwards through it, causing index shifting errors.',
      'Using a full HashMap when the character set is strictly lowercase English letters (an int array of size 26 is much faster and O(1) auxiliary memory).',
      'Not initializing the prefix map with {0: 1} for subarray sum problems, missing subarrays that start at index 0.'
    ],
    problemSlugs: [
      'two-sum',
      'valid-anagram',
      'group-anagrams',
      'top-k-frequent-elements',
      'product-of-array-except-self',
      'longest-consecutive-sequence',
      'maximum-subarray'
    ]
  },
  {
    slug: 'two-pointers',
    title: 'Two Pointers & Sliding Window',
    icon: 'Maximize2',
    shortDescription: 'Master convergent pointers, fast & slow pointers, and dynamic window expansion & contraction.',
    difficultyFocus: 'High Frequency - Core Pattern',
    longOverview: `The Two Pointers technique coordinates two index references moving across an iterable to evaluate conditions in O(N) time instead of O(N²).
    
Sliding Window is a specialized two-pointer pattern where the pointers define the left and right boundaries of a contiguous subarray or substring. The right pointer expands the window to satisfy a constraint, and the left pointer contracts it to restore invariants or optimize window length.`,
    keyConcepts: [
      {
        title: 'Convergent Pointers (Opposite Ends)',
        explanation: 'Commonly applied on sorted arrays or palindromic strings. Initialize left at 0 and right at n - 1. Based on the sum or character match, move left inwards (to increase sum) or right inwards (to decrease sum).',
        codeSnippet: `left, right = 0, len(nums) - 1
while left < right:
    curr = nums[left] + nums[right]
    if curr == target:
        return [left, right]
    elif curr < target:
        left += 1
    else:
        right -= 1`
      },
      {
        title: 'Dynamic Sliding Window (Expand & Shrink)',
        explanation: 'Maintain a running state (e.g. character count, sum). For each step, expand right pointer and include nums[right] in state. While condition is violated (e.g. duplicate chars or sum > target), shrink left pointer and exclude nums[left]. Record the optimal length.',
      },
      {
        title: 'Fixed Size Sliding Window',
        explanation: 'When the window size K is constant, initialize the first K elements. Then, slide the window one element at a time: add nums[i] and subtract nums[i - K] in O(1) per step.',
      },
      {
        title: 'Fast and Slow Pointers (Floyd\'s Tortoise and Hare)',
        explanation: 'One pointer advances 1 step while the other advances 2 steps. Used to detect cycles in linked lists, find middle nodes, or find duplicates in arrays without modifying memory.',
      }
    ],
    whenToUse: [
      'Array is sorted and you must find pairs or triplets matching a condition (Two Sum II, 3Sum)',
      'String palindrome verification or in-place array reversal',
      'Contiguous subarray or substring problems looking for maximum, minimum, or exact length',
      'Substrings containing "at most K distinct characters" or "without repeating characters"',
      'Finding cycle or middle of linked list'
    ],
    templates: [
      {
        name: 'Universal Sliding Window Template',
        language: 'python',
        code: `def sliding_window(s):
    window_state = {}
    left = 0
    ans = 0
    
    for right in range(len(s)):
        # 1. Expand: include s[right]
        char = s[right]
        window_state[char] = window_state.get(char, 0) + 1
        
        # 2. Shrink: while window violates condition
        while window_invalid_condition(window_state):
            window_state[s[left]] -= 1
            left += 1
            
        # 3. Update result with valid window
        ans = max(ans, right - left + 1)
        
    return ans`,
        explanation: 'The golden template for solving substring and subarray sliding window challenges.'
      }
    ],
    commonMistakes: [
      'Advancing both left and right pointers in the same direction blindly without checking if the array is sorted.',
      'Off-by-one errors when calculating window length: the length is (right - left + 1), not (right - left).',
      'Forgetting to decrement frequency counts or evict zero-count keys when contracting the left window border.',
      'In 3Sum, forgetting to skip adjacent duplicates for both the anchor and the two moving pointers, leading to duplicate triplets.'
    ],
    problemSlugs: [
      'valid-palindrome',
      '3sum',
      'container-with-most-water',
      'trapping-rain-water',
      'best-time-to-buy-and-sell-stock',
      'longest-substring-without-repeating-characters',
      'longest-repeating-character-replacement',
      'minimum-window-substring'
    ]
  },
  {
    slug: 'stacks-and-queues',
    title: 'Stacks, Queues & Monotonic Structures',
    icon: 'Layers',
    shortDescription: 'Master LIFO, FIFO, Monotonic Stacks for Next Greater Element, and Deques for sliding window extremes.',
    difficultyFocus: 'Intermediate to Advanced',
    longOverview: `A Stack operates on Last-In, First-Out (LIFO), making it ideal for nested evaluations, balanced parentheses, expression parsing, and backtracking state histories.
    
A Queue operates on First-In, First-Out (FIFO) and serves as the operational engine for Breadth-First Search (BFS).
    
A Monotonic Stack/Deque maintains elements in strictly increasing or decreasing order. Whenever an incoming element violates monotonicity, elements are popped. This yields O(N) solutions for complex range queries like "Next Greater Element" or "Largest Rectangle in Histogram" where brute force takes O(N²).`,
    keyConcepts: [
      {
        title: 'Monotonic Stack (Decreasing / Increasing)',
        explanation: 'To find the Next Greater Element for each position: maintain a monotonic decreasing stack of indices. When the current element is greater than the stack top, the current element is the next greater element for that top index! Pop it, record the answer, and repeat.',
        codeSnippet: `stack = [] # stores indices
result = [-1] * len(nums)
for i, num in enumerate(nums):
    while stack and nums[stack[-1]] < num:
        prev_idx = stack.pop()
        result[prev_idx] = num
    stack.append(i)`
      },
      {
        title: 'Matching & Nested Scopes',
        explanation: 'Whenever you encounter open brackets (, [, {, push to stack. When encountering a closing bracket, verify that the stack is non-empty and the top matches the corresponding open bracket.',
      },
      {
        title: 'Monotonic Deque for Sliding Window Maximum',
        explanation: 'Maintain indices in a double-ended queue such that values are in descending order. The front of the deque is always the maximum for the current window. Discard stale indices that fell out of the left window boundary in O(1).',
      }
    ],
    whenToUse: [
      'Parentheses matching, syntax validation, XML/HTML tag validation',
      'Evaluating expressions, reverse polish notation, arithmetic calculators',
      'Finding the Next Greater / Smaller element to the left or right',
      'Span problems, temperature spikes, stock spans',
      'Histogram area calculations and maximal rectangle in binary matrices'
    ],
    templates: [
      {
        name: 'Monotonic Stack (Next Greater Element)',
        language: 'python',
        code: `def next_greater_element(nums):
    n = len(nums)
    res = [-1] * n
    stack = [] # store indices
    
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            res[idx] = nums[i]
        stack.append(i)
        
    return res`,
        explanation: 'Each element is pushed once and popped at most once, guaranteeing total O(N) time complexity.'
      }
    ],
    commonMistakes: [
      'Popping from an empty stack without checking `if stack:` first, triggering IndexError.',
      'Storing values instead of indices in monotonic stack: storing indices is almost always superior because you have access to both index (distance) and value (`nums[i]`).',
      'Forgetting that while loop inside monotonic stack does NOT make it O(N²); each element is pushed once and popped once, giving amortized O(N).'
    ],
    problemSlugs: [
      'valid-parentheses',
      'min-stack',
      'daily-temperatures',
      'largest-rectangle-in-histogram',
      'sliding-window-maximum'
    ]
  },
  {
    slug: 'binary-search',
    title: 'Binary Search & Search Space Reduction',
    icon: 'Search',
    shortDescription: 'Master logarithmic search: sorted arrays, rotated arrays, and binary search on monotonic answer spaces.',
    difficultyFocus: 'Core Pattern - O(log N)',
    longOverview: `Binary Search is an optimal algorithm that halves the search space at every comparison, achieving O(log N) time complexity.
    
While beginners associate binary search solely with looking up numbers in a sorted array, master interviewees recognize the broader pattern: "Binary Search on the Answer Space". If a problem asks for the minimum or maximum value of K that satisfies a monotonic condition (isPossible(K)), binary search can find the threshold in O(N log(Range)).`,
    keyConcepts: [
      {
        title: 'Classic Boundary & Overflow Prevention',
        explanation: 'Always compute mid using `mid = low + (high - low) // 2` to prevent 32-bit integer overflow in languages like C++ and Java. Carefully choose loop termination: `while low <= high` for exact search, or `while low < high` for boundary/range convergence.',
      },
      {
        title: 'Rotated Sorted Array Invariant',
        explanation: 'If a sorted array is rotated at some pivot, at least one half of the array (left or right of mid) is ALWAYS sorted. Check if `nums[low] <= nums[mid]` to determine if left half is sorted, then check if target lies within that sorted range.',
      },
      {
        title: 'Binary Search on the Answer (Predicate Monotonicity)',
        explanation: 'If f(x) is monotonic (e.g. True, True, True, False, False), we binary search the domain of x. Examples include Koko Eating Bananas, Capacity to Ship Packages, and Painter\'s Partition.',
        codeSnippet: `low, high = min_speed, max_speed
ans = high
while low <= high:
    mid = low + (high - low) // 2
    if can_finish_in_time(mid):
        ans = mid # potential answer, try smaller
        high = mid - 1
    else:
        low = mid + 1 # too slow, need faster`
      }
    ],
    whenToUse: [
      'Target lookup in sorted or rotated sorted collections',
      'Finding first/last occurrence or boundary transition point',
      'Problem asks to "minimize the maximum" or "maximize the minimum" value',
      'Computing integer square roots, peak elements, or median of sorted arrays'
    ],
    templates: [
      {
        name: 'Standard Binary Search Template',
        language: 'python',
        code: `def binary_search(nums, target):
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
        explanation: 'Standard O(log N) search template covering empty and single-element bounds correctly.'
      }
    ],
    commonMistakes: [
      'Writing `mid = (low + high) // 2`, which can cause 32-bit integer overflow when low + high > 2^31 - 1.',
      'Infinite loops caused by updating `low = mid` without integer round-up, or `high = mid` in `while low <= high`.',
      'Not recognizing that non-array problems (e.g. eating bananas, shipping packages) can be framed as binary search on answer.'
    ],
    problemSlugs: [
      'binary-search',
      'search-in-rotated-sorted-array',
      'find-minimum-in-rotated-sorted-array',
      'koko-eating-bananas',
      'median-of-two-sorted-arrays'
    ]
  },
  {
    slug: 'linked-lists',
    title: 'Linked Lists & Pointer Manipulation',
    icon: 'GitCommit',
    shortDescription: 'Master pointer rewiring, sentinel dummy nodes, fast & slow pointers, and in-place list reversal.',
    difficultyFocus: 'Fundamental - Pointer Mechanics',
    longOverview: `A Linked List is a linear collection of nodes connected via pointers. Unlike arrays, elements do not have fixed memory locations, enabling O(1) insertions and deletions given a pointer to the predecessor, but requiring O(N) sequential traversal to access an arbitrary element.
    
Interviewers love Linked List questions because they rigorously test edge-case handling (null pointers, head/tail changes) and manual pointer bookkeeping without auxiliary memory.`,
    keyConcepts: [
      {
        title: 'Sentinel / Dummy Head Pattern',
        explanation: 'Creating a `dummy = ListNode(0)` pointing to the head simplifies edge cases where the head itself may be deleted, swapped, or merged. You never have to treat the head node as a special case, and you always return `dummy.next`.',
        codeSnippet: `dummy = ListNode(0)
dummy.next = head
curr = dummy
# Perform manipulations...
return dummy.next`
      },
      {
        title: 'In-Place Reversal',
        explanation: 'Maintain three pointers: `prev = None`, `curr = head`, and temporary `nxt = curr.next`. Reassign `curr.next = prev`, then shift `prev = curr` and `curr = nxt`. Runs in O(N) time and O(1) space.',
      },
      {
        title: 'Floyd\'s Cycle Finding (Tortoise and Hare)',
        explanation: 'Move slow pointer by 1 step, fast pointer by 2 steps. If there is a cycle, fast will eventually lap and meet slow. To find the cycle entry node: reset slow to head and move both slow and fast by 1 step until they meet.',
      }
    ],
    whenToUse: [
      'Reversing full or sub-segments of lists',
      'Merging two or K sorted sequences',
      'Detecting loops or finding mid-point in a single pass',
      'Designing caching structures (e.g. LRU Cache with Doubly Linked List + HashMap)'
    ],
    templates: [
      {
        name: 'In-Place List Reversal Template',
        language: 'python',
        code: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        explanation: 'Classic O(N) time and O(1) auxiliary space list reversal.'
      }
    ],
    commonMistakes: [
      'Losing reference to `curr.next` before overwriting `curr.next = prev`, severing the rest of the list.',
      'Dereferencing `fast.next.next` when `fast.next` is None, causing null-pointer crashes.',
      'Forgetting to break the cycle or null-terminate the end of a newly reversed sublist.'
    ],
    problemSlugs: [
      'reverse-linked-list',
      'merge-two-sorted-lists',
      'reorder-list',
      'remove-nth-node-from-end-of-list',
      'linked-list-cycle',
      'lru-cache',
      'merge-k-sorted-lists'
    ]
  },
  {
    slug: 'trees',
    title: 'Trees & Binary Search Trees',
    icon: 'GitBranch',
    shortDescription: 'Master recursive DFS traversals, BFS level-order queues, BST properties, and lowest common ancestors.',
    difficultyFocus: 'Core Pattern - Very High Frequency',
    longOverview: `A Tree is a hierarchical connected acyclic graph with N nodes and N - 1 edges. A Binary Tree restricts each node to at most two children (left and right).
    
A Binary Search Tree (BST) enforces the ordering invariant: for every node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater. Inorder traversal of a BST yields elements in strictly ascending sorted order.`,
    keyConcepts: [
      {
        title: 'Depth-First Search (DFS) Traversal Orders',
        explanation: 'Preorder (Node, Left, Right) is ideal for cloning or serializing; Inorder (Left, Node, Right) yields sorted values in BSTs; Postorder (Left, Right, Node) computes subtree properties (like height and diameter) from bottom-up.',
      },
      {
        title: 'Breadth-First Search (BFS) / Level-Order',
        explanation: 'Use a Queue. Loop level by level using the queue snapshot size `for _ in range(len(queue))`. This ensures all nodes at distance D from root are processed before nodes at distance D + 1.',
        codeSnippet: `queue = deque([root])
while queue:
    level_size = len(queue)
    level = []
    for _ in range(level_size):
        node = queue.popleft()
        level.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    result.append(level)`
      },
      {
        title: 'Bottom-Up Information Passing',
        explanation: 'In problems like Tree Diameter, Balanced Tree, or Max Path Sum, recursive helper functions return a single subtree measure (e.g. max path down) while updating a global max answer passing through the current node.',
      }
    ],
    whenToUse: [
      'Hierarchical data evaluation, directory structures, DOM trees',
      'Finding Lowest Common Ancestor (LCA)',
      'Subtree size, maximum depth, diameter, and path sum calculations',
      'Validating BST properties and range queries'
    ],
    templates: [
      {
        name: 'Max Depth / Post-Order DFS Template',
        language: 'python',
        code: `def max_depth(root):
    if not root:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)`,
        explanation: 'Base case returns 0, recursive step computes max child depth and adds 1.'
      }
    ],
    commonMistakes: [
      'Validating a BST by checking only `node.left.val < node.val < node.right.val` locally. A node must be strictly greater than ALL nodes in its left subtree, not just its direct child! Must pass (min_val, max_val) bounds.',
      'Forgetting that tree recursion consumes O(H) call stack memory, which degrades to O(N) in skewed trees.',
      'Forgetting base case `if not root: return ...`, causing Infinite Recursion / Maximum Call Stack Exceeded.'
    ],
    problemSlugs: [
      'invert-binary-tree',
      'maximum-depth-of-binary-tree',
      'diameter-of-binary-tree',
      'balanced-binary-tree',
      'lowest-common-ancestor-of-a-bst',
      'binary-tree-level-order-traversal',
      'validate-binary-search-tree',
      'binary-tree-maximum-path-sum',
      'serialize-and-deserialize-binary-tree'
    ]
  },
  {
    slug: 'heaps-and-priority-queues',
    title: 'Heaps & Priority Queues',
    icon: 'TrendingUp',
    shortDescription: 'Master Min-Heaps, Max-Heaps, Top-K elements, streaming medians, and interval scheduling.',
    difficultyFocus: 'Intermediate - High Yield',
    longOverview: `A Binary Heap is a complete binary tree implemented within a flat array that satisfies the heap property: in a Min-Heap, every parent is smaller than or equal to its children; in a Max-Heap, every parent is greater.
    
Heaps allow O(1) peek of the extreme element (min or max) and O(log N) insertion and deletion. Building a heap from an array of N elements ('heapify') takes O(N) time.
Whenever you hear "Top K", "Smallest K", "Kth largest", or need dynamic order preservation as items arrive, Heap is the premier data structure.`,
    keyConcepts: [
      {
        title: 'Top K Elements Pattern (Min-Heap of Size K)',
        explanation: 'To find the K largest elements in a stream of N items: maintain a Min-Heap capped at size K. For each element, push it into the heap; if size exceeds K, pop the minimum. At the end, the heap contains the K largest items, and the root is the K-th largest! Time: O(N log K) instead of O(N log N).',
      },
      {
        title: 'Two Heaps Pattern (Find Median from Stream)',
        explanation: 'Divide the numbers into two halves: a Max-Heap for the smaller half and a Min-Heap for the larger half. Balance sizes so they differ by at most 1. The median is either the top of the larger heap or the average of both tops in O(1)!',
      }
    ],
    whenToUse: [
      'Finding Kth smallest or Kth largest elements',
      'Merging K sorted lists or arrays',
      'Task scheduling, meeting rooms, and priority task processing',
      'Tracking real-time median in a stream of continuous numbers'
    ],
    templates: [
      {
        name: 'Top K Elements with Min-Heap',
        language: 'python',
        code: `import heapq

def find_kth_largest(nums, k):
    heap = [] # min-heap of size k
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        explanation: 'O(N log K) time and O(K) space: keeps only the top K largest elements in the heap.'
      }
    ],
    commonMistakes: [
      'In Python, `heapq` is a Min-Heap by default. To implement a Max-Heap, multiply values by -1.',
      'Re-sorting the array on each insertion (O(N log N)) instead of using a Priority Queue (O(log N)).',
      'Assuming that `heap[1]` is the second smallest element: heaps only guarantee root is extreme; children are partially ordered.'
    ],
    problemSlugs: [
      'kth-largest-element-in-an-array',
      'task-scheduler',
      'find-median-from-data-stream'
    ]
  },
  {
    slug: 'backtracking',
    title: 'Backtracking & Combinatorial Search',
    icon: 'Shuffle',
    shortDescription: 'Master state-space exploration, decision trees, pruning, subsets, combinations, and permutations.',
    difficultyFocus: 'Intermediate to Advanced',
    longOverview: `Backtracking is an algorithmic paradigm that systematically explores all candidate solutions to a computational problem by incrementally building candidates and abandoning ("backtracking" from) a candidate as soon as it is determined it cannot lead to a valid solution.
    
Think of backtracking as a Depth-First Search on a virtual decision tree where you:
1. Make a choice (add element to path)
2. Recurse (explore deeper states)
3. Undo the choice (pop from path / restore state)`,
    keyConcepts: [
      {
        title: 'The 3-Step Backtracking Blueprint',
        explanation: 'Every backtracking problem has three components: State/Path (current candidate), Choices (valid next moves), and Constraints/Pruning (discarding invalid branches early).',
        codeSnippet: `def backtrack(start_idx, current_path):
    if is_solution(current_path):
        results.append(list(current_path))
        return
        
    for i in range(start_idx, len(candidates)):
        if is_invalid(candidates[i]): 
            continue # Prune branch!
            
        current_path.append(candidates[i]) # 1. Make choice
        backtrack(i + 1, current_path)     # 2. Recurse
        current_path.pop()                 # 3. Undo choice`
      },
      {
        title: 'Subsets vs Permutations vs Combinations',
        explanation: 'Subsets: pass `start_idx` so you only pick elements forward (no duplicates). Permutations: order matters, use a `visited` boolean set to pick any unused element. Combinations with replacement: pass `i` instead of `i + 1`.',
      }
    ],
    whenToUse: [
      'Generating all power sets, combinations, or permutations',
      'Solving puzzles like Sudoku, N-Queens, Word Search, Crosswords',
      'Partitioning problems (Palindrome Partitioning, IP Address Restoration)'
    ],
    templates: [
      {
        name: 'Subsets Generation Template',
        language: 'python',
        code: `def subsets(nums):
    res = []
    
    def backtrack(start, path):
        res.append(list(path)) # Every prefix is a valid subset
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
            
    backtrack(0, [])
    return res`,
        explanation: 'Generates all 2^N subsets without duplicate combinations.'
      }
    ],
    commonMistakes: [
      'Appending `path` directly to results (`res.append(path)`) instead of making a copy (`res.append(list(path))` or `path[:]`). When path is modified later, all references change!',
      'Forgetting to backtrack (pop) after the recursive call returns.',
      'Failing to sort the array first when input contains duplicate elements (e.g. Subsets II, 40. Combination Sum II).'
    ],
    problemSlugs: [
      'subsets',
      'combination-sum',
      'permutations',
      'word-search',
      'n-queens'
    ]
  },
  {
    slug: 'graphs',
    title: 'Graphs, BFS, DFS & Connectivity',
    icon: 'Network',
    shortDescription: 'Master adjacency representations, BFS shortest paths, DFS cycles, Topological Sort, and Disjoint Set Union.',
    difficultyFocus: 'Core Pattern - High Frequency',
    longOverview: `A Graph G = (V, E) consists of vertices and edges, which may be directed or undirected, weighted or unweighted, cyclic or acyclic.
    
Graphs model networks, dependencies, maps, and grid worlds. Common graph interview challenges center around traversal (BFS for unweighted shortest paths, DFS for reachability/cycles), Topological Sorting for prerequisite ordering, and Disjoint Set Union (Union-Find) for connected components and cycle detection.`,
    keyConcepts: [
      {
        title: 'Adjacency List Construction',
        explanation: 'Always convert edge lists [[u, v], ...] into an adjacency map or list graph[u].append(v) in O(V + E) before running graph algorithms.',
      },
      {
        title: 'BFS for Shortest Path in Unweighted Graphs',
        explanation: 'Because BFS explores nodes in concentric layers outward from the source, the first time you reach the target node is GUARANTEED to be via the shortest number of edges.',
      },
      {
        title: 'Dijkstra\'s Algorithm for Weighted Graphs',
        explanation: 'For directed/undirected graphs with non-negative edge weights, Dijkstra uses a Min-Heap (priority queue) to greedily extract the unvisited node with the smallest tentative distance in O((V + E) log V).',
      },
      {
        title: 'Topological Sort (Kahn\'s In-Degree Algorithm)',
        explanation: 'Count in-degrees for all vertices. Push all vertices with in-degree 0 into a queue. While queue is non-empty, pop node, append to topo-order, and decrement in-degrees of its neighbors. If neighbor in-degree reaches 0, push it. If processed count < V, a cycle exists!',
      },
      {
        title: 'Disjoint Set Union (Union-Find / DSU)',
        explanation: 'Tracks partitioning of elements into disjoint sets. With Path Compression and Union by Rank, both find(x) and union(x, y) run in near-constant amortized O(α(N)) time (inverse Ackermann function). Ideal for connected components and cycle detection.',
      },
      {
        title: 'Bipartite Graphs & 2-Coloring',
        explanation: 'A graph is bipartite if and only if it has NO odd-length cycles. Attempt to color every node with 2 alternating colors (e.g. 1 and -1); if any adjacent neighbor has the same color, a cycle of odd length exists!',
      }
    ],
    whenToUse: [
      'Grid traversal (islands, mazes, matrix pathfinding)',
      'Dependency resolution & prerequisite order (Course Schedule)',
      'Single-source shortest path in weighted graphs with non-negative weights (Dijkstra)',
      'Detecting cycles or redundant edges in undirected graphs (Union-Find)',
      'Testing if a graph can be split into two independent sets (Bipartite 2-Coloring)'
    ],
    templates: [
      {
        name: 'Kahn\'s Topological Sort Template',
        language: 'python',
        code: `from collections import deque, defaultdict

def topological_sort(num_courses, prerequisites):
    graph = defaultdict(list)
    in_degree = [0] * num_courses
    
    for dest, src in prerequisites:
        graph[src].append(dest)
        in_degree[dest] += 1
        
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return order if len(order) == num_courses else []`,
        explanation: 'Kahn\'s algorithm detects cycles while producing valid topological order in O(V + E).'
      },
      {
        name: 'Dijkstra\'s Shortest Path Template',
        language: 'python',
        code: `import heapq
from collections import defaultdict

def dijkstra(n, edges, start_node):
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
        
    dist = {i: float('inf') for i in range(1, n + 1)}
    dist[start_node] = 0
    min_heap = [(0, start_node)] # (distance, node)
    
    while min_heap:
        d, u = heapq.heappop(min_heap)
        if d > dist[u]:
            continue
            
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(min_heap, (dist[v], v))
                
    return dist`,
        explanation: 'Dijkstra finds shortest path in non-negative weighted graphs in O((V + E) log V).'
      }
    ],
    commonMistakes: [
      'Forgetting to mark nodes as visited immediately upon adding to BFS queue, resulting in duplicate queue insertions and exponential blowup.',
      'Using unweighted BFS for weighted graphs (Dijkstra is required).',
      'Not checking boundary conditions 0 <= r < rows and 0 <= c < cols when traversing 4-directional matrix neighbors.'
    ],
    problemSlugs: [
      'number-of-islands',
      'course-schedule',
      'course-schedule-ii',
      'rotting-oranges',
      'network-delay-time',
      'redundant-connection',
      'pacific-atlantic-water-flow',
      'is-graph-bipartite'
    ]
  },
  {
    slug: 'prefix-sums',
    title: 'Prefix Sums & Difference Arrays',
    icon: 'TrendingUp',
    shortDescription: 'Master 1D/2D cumulative sums, hash map target lookups with negatives, difference arrays for O(1) range updates, and modulo frequencies.',
    difficultyFocus: 'Core High-Yield Pattern',
    longOverview: `A Prefix Sum array precalculates the cumulative sum of an iterable from index 0 to i.
This empowers instant O(1) range sum queries for any interval [L, R] using:
sum(nums[L...R]) = prefix[R + 1] - prefix[L].

When paired with Hash Maps, prefix sums become the single most powerful tool for solving subarray problems with target sums (e.g. Subarray Sum Equals K), especially when the array contains negative numbers where Sliding Window and Two Pointers completely fail!

Difference Arrays invert this relationship: instead of querying range sums in O(1), a difference array allows updating a continuous range [L, R] += value in exact O(1) time by marking only the boundary endpoints diff[L] += v and diff[R + 1] -= v, followed by a single O(N) sweep to reconstruct the array.`,
    keyConcepts: [
      {
        title: '1D Static Cumulative Range Queries',
        explanation: 'prefix[i + 1] = prefix[i] + nums[i]. Any contiguous segment sum [L, R] is computed in O(1) via prefix[R + 1] - prefix[L].',
      },
      {
        title: 'Prefix Sum + Hash Map (The Negative Numbers Superpower)',
        explanation: 'In arrays with negative values, two-pointer sliding windows fail because running sum is not monotonic. Instead, we recognize: sum(j...i) = prefix[i] - prefix[j - 1] = k  ==>  prefix[j - 1] = prefix[i] - k. By storing seen prefix sums in a frequency map, we find all target subarrays in single-pass O(N) time and O(N) space.',
      },
      {
        title: '2D Matrix Inclusion-Exclusion Prefix Sum',
        explanation: 'For a 2D grid, prefix[r+1][c+1] stores the rectangle sum from (0,0) to (r,c). The query sum for rectangle (r1, c1) to (r2, c2) is evaluated in O(1): prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1].',
      },
      {
        title: 'Difference Array (O(1) Range Updates)',
        explanation: 'To add a value v to range [L, R] across multiple updates: increment diff[L] += v and decrement diff[R + 1] -= v. A single running prefix sum pass reconstructs the final values in O(N) time total.',
      },
      {
        title: 'Modular Prefix Sums (Divisibility by K)',
        explanation: 'If (prefix[i] - prefix[j]) % k == 0, then prefix[i] % k == prefix[j] % k. Equal remainders identify subarrays summing to a multiple of K. Always normalize negative remainders in C++/Java/JS with ((rem % k) + k) % k.',
      }
    ],
    whenToUse: [
      'Subarray sum equals K when array contains negative numbers',
      'Frequent range sum queries on immutable 1D arrays or 2D matrices',
      'Batch range updates [L, R] += v (use Difference Array)',
      'Subarray sums divisible by K or multiple of K',
      'Balancing binary arrays with equal 0s and 1s'
    ],
    templates: [
      {
        name: 'Prefix Sum + Hash Map Template',
        language: 'python',
        code: `def subarray_sum_k(nums, k):
    count = 0
    curr_sum = 0
    prefix_map = {0: 1} # sum -> frequency
    
    for num in nums:
        curr_sum += num
        if (curr_sum - k) in prefix_map:
            count += prefix_map[curr_sum - k]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
        
    return count`,
        explanation: 'Standard O(N) time and O(N) space template for target sum queries with negatives.'
      },
      {
        name: 'Difference Array Template',
        language: 'python',
        code: `def difference_array_updates(n, updates):
    diff = [0] * (n + 2)
    # Each update is [L, R, value]
    for L, R, val in updates:
        diff[L] += val
        diff[R + 1] -= val
        
    # Reconstruct array in O(N)
    for i in range(1, n + 1):
        diff[i] += diff[i - 1]
        
    return diff[1:n + 1]`,
        explanation: 'Processes M range updates in O(M + N) time instead of O(M * N).'
      }
    ],
    commonMistakes: [
      'Using Sliding Window when array has negative numbers: sliding window requires monotonic sum progression.',
      'Forgetting initial {0: 1} base case in hash map for subarrays starting at index 0.',
      'Negative modulo trap: in Java, JS, and C++, (-2) % 5 returns -2, not 3! Always normalize with ((rem % k) + k) % k.'
    ],
    problemSlugs: [
      'subarray-sum-equals-k',
      'range-sum-query-immutable',
      'range-sum-query-2d-immutable',
      'subarray-sums-divisible-by-k',
      'corporate-flight-bookings',
      'contiguous-array'
    ]
  },
  {
    slug: 'dynamic-programming',
    title: 'Dynamic Programming (1D & 2D)',
    icon: 'Cpu',
    shortDescription: 'Master optimal substructure, memoization vs tabulation, knapsack patterns, and string alignments.',
    difficultyFocus: 'Advanced - The Interview Boss',
    longOverview: `Dynamic Programming (DP) solves complex problems by breaking them down into simpler subproblems, solving each subproblem once, and storing the answers.
    
A problem admits a DP solution if it possesses:
1. Overlapping Subproblems: The same subproblems are solved repeatedly.
2. Optimal Substructure: An optimal solution can be constructed from optimal solutions of its subproblems.
    
Mastery requires transitioning between Top-Down (Recursion + Memoization) and Bottom-Up (Tabulation), followed by Space Optimization (rolling arrays).`,
    keyConcepts: [
      {
        title: 'Top-Down Memoization vs Bottom-Up Tabulation',
        explanation: 'Top-down starts at the target state and recursively queries dependencies, caching results in a memo hashmap/array. Bottom-up starts at base cases and fills an iterative table in topological dependency order.',
      },
      {
        title: '1D State Transitions (House Robber, Coin Change)',
        explanation: 'Define `dp[i]` as optimal answer for prefix ending at index i. Determine the recurrence: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Notice that only the last two states are needed, reducing space to O(1)!',
      },
      {
        title: '2D Grid & Two-Sequence DP (LCS, Edit Distance)',
        explanation: '`dp[i][j]` represents the relationship between prefix s1[0...i-1] and s2[0...j-1]. If characters match, `dp[i][j] = 1 + dp[i-1][j-1]`. If not, take the max/min of excluding one character or another.',
      },
      {
        title: '0/1 Knapsack Pattern',
        explanation: 'For each item, we decide whether to include or exclude it without exceeding capacity. If we iterate capacity backwards from capacity down to weight, 2D DP collapses into a single 1D array!',
      }
    ],
    whenToUse: [
      'Counting total number of distinct ways to achieve a goal (Climbing Stairs, Unique Paths)',
      'Finding minimum or maximum cost, profit, or reward (Coin Change, Robber)',
      'Determining if a state is possible/reachable (Word Break, Jump Game)',
      'String matching, editing, and subsequence alignment (LCS, Edit Distance)'
    ],
    templates: [
      {
        name: 'Coin Change (Unbounded Knapsack) Tabulation',
        language: 'python',
        code: `def coin_change(coins, amount):
    # dp[i] = min coins to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0 # base case: 0 coins for amount 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
                
    return dp[amount] if dp[amount] != float('inf') else -1`,
        explanation: 'Classic bottom-up DP solving Coin Change in O(amount * len(coins)) time and O(amount) space.'
      }
    ],
    commonMistakes: [
      'Not identifying the correct base cases (e.g. `dp[0] = 0` vs `dp[0] = 1`).',
      'Iterating in the wrong order: if `dp[i][j]` depends on `dp[i-1][j]`, you must iterate row by row.',
      'Trying to jump straight to bottom-up code without defining state meaning: always write down in plain English: "dp[i] represents..."',
      'Forgetting that 0/1 Knapsack in 1D array must iterate capacity backwards to avoid reusing the same item multiple times.'
    ],
    problemSlugs: [
      'climbing-stairs',
      'house-robber',
      'coin-change',
      'longest-increasing-subsequence',
      'word-break',
      'unique-paths',
      'longest-common-subsequence',
      'edit-distance'
    ]
  },
  {
    slug: 'greedy-and-intervals',
    title: 'Greedy Algorithms & Intervals',
    icon: 'Activity',
    shortDescription: 'Master locally optimal choices, interval sorting, overlapping merges, and schedule optimizations.',
    difficultyFocus: 'Intermediate - High Frequency',
    longOverview: `A Greedy Algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate (locally optimal) benefit without backtracking.
    
Greedy works when the problem possesses the "Greedy Choice Property": globally optimal solutions can be reached by making locally optimal decisions.
Interval problems are classic greedy scenarios: sorting intervals by start or end times allows optimal decisions regarding merging, erasing overlaps, or assigning conference rooms.`,
    keyConcepts: [
      {
        title: 'Interval Sorting Rule of Thumb',
        explanation: 'Sort by start time `intervals.sort(key=lambda x: x[0])` when merging overlapping intervals or checking conflicts. Sort by end time `intervals.sort(key=lambda x: x[1])` when maximizing non-overlapping intervals (Activity Selection).',
      },
      {
        title: 'Meeting Rooms II (Min Rooms Required)',
        explanation: 'Separate start and end times into two sorted arrays. When start < end, a new room is needed (increment counter). When start >= end, a room freed up (decrement counter, advance end pointer).',
      }
    ],
    whenToUse: [
      'Merging overlapping time ranges or calendar events',
      'Finding minimum number of arrows to burst balloons',
      'Jump game reachability or gas station circular tours',
      'Huffman coding or fractional knapsack'
    ],
    templates: [
      {
        name: 'Merge Intervals Template',
        language: 'python',
        code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
            
    return merged`,
        explanation: 'O(N log N) sorting followed by single O(N) sweep to merge all overlapping intervals.'
      }
    ],
    commonMistakes: [
      'Assuming Greedy works for problems that require DP (e.g. general Coin Change with arbitrary denominations).',
      'Forgetting to sort intervals before comparing adjacent elements.',
      'Using `>` instead of `>=` when checking interval boundary touch points (e.g. [1, 2] and [2, 3]).'
    ],
    problemSlugs: [
      'jump-game',
      'jump-game-ii',
      'merge-intervals',
      'non-overlapping-intervals',
      'meeting-rooms-ii'
    ]
  },
  {
    slug: 'tries',
    title: 'Tries (Prefix Trees)',
    icon: 'FolderTree',
    shortDescription: 'Master prefix tree node structures, fast character search, word lookup, and Boggle board traversals.',
    difficultyFocus: 'Specialized Data Structure',
    longOverview: `A Trie (pronounced "try", from retrieval) is an efficient tree-like data structure used to store a dynamic set of strings where keys are usually sequences of characters.
    
Unlike a balanced BST, no node in the tree stores the key associated with that node; instead, its position in the tree defines the key. All descendants of a node share a common string prefix. Operations like search, insert, and prefix lookup take O(L) time where L is the length of the string, independent of the total number of words in the dictionary!`,
    keyConcepts: [
      {
        title: 'Trie Node Architecture',
        explanation: 'Each TrieNode contains: `children = {}` (or array of size 26) and a boolean flag `is_end_of_word = False`.',
        codeSnippet: `class TrieNode:
    def __init__(self):
        self.children = {} # char -> TrieNode
        self.is_end_of_word = False`
      },
      {
        title: 'Trie with Backtracking (Word Search II)',
        explanation: 'Searching a 2D letter grid for hundreds of words takes exponential time with naive DFS. By indexing dictionary words in a Trie, we prune grid DFS branches immediately whenever a prefix is not present in the Trie!',
      }
    ],
    whenToUse: [
      'Autocomplete systems and search suggestion engines',
      'Spell checkers and IP routing longest prefix match',
      'Word search in a 2D Boggle grid with multiple dictionary targets'
    ],
    templates: [
      {
        name: 'Trie Class Implementation',
        language: 'python',
        code: `class Trie:
    def __init__(self):
        self.root = {}
        
    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node:
                node[char] = {}
            node = node[char]
        node['#'] = True # word terminator
        
    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return '#' in node
        
    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node:
                return False
            node = node[char]
        return True`,
        explanation: 'Clean Python dictionary implementation of Prefix Tree.'
      }
    ],
    commonMistakes: [
      'Confusing `startsWith(prefix)` with `search(word)`: a word search requires `is_end_of_word == True`.',
      'Excessive memory usage: in languages like Java or C++, allocating a 26-pointer array for each node in sparse Tries can waste memory (use hash maps or ternary search trees if sparse).'
    ],
    problemSlugs: [
      'implement-trie-prefix-tree',
      'design-add-and-search-words-data-structure',
      'word-search-ii'
    ]
  },
  {
    slug: 'bit-manipulation',
    title: 'Bit Manipulation & Low-Level Math',
    icon: 'Binary',
    shortDescription: 'Master bitwise AND, OR, XOR, shifts, two\'s complement, Brian Kernighan\'s algorithm, and bitmasks.',
    difficultyFocus: 'Niche - High Speed O(1)',
    longOverview: `Bit Manipulation performs operations directly on binary digits (bits) representing integers in memory. Bitwise operations execute in a single CPU cycle, providing unbeatable performance and O(1) auxiliary space.
    
Crucial properties include:
- XOR: x ^ x = 0, x ^ 0 = x, commutative and associative. Any number XORed with itself cancels out.
- Brian Kernighan's Algorithm: n & (n - 1) clears the lowest set bit in O(number of 1s).
- Power of Two check: (n > 0) and (n & (n - 1) == 0).`,
    keyConcepts: [
      {
        title: 'The Power of XOR',
        explanation: 'Because duplicate numbers cancel out (`a ^ a = 0`), XORing an array containing duplicates where only one element appears once isolates that unique element in O(N) time and O(1) space.',
      },
      {
        title: 'Bitmasks for Subset State Representation',
        explanation: 'An integer of 32 bits can represent a subset of up to 32 items. Bit i is 1 if item i is selected. This enables DP with Bitmask in traveling salesman or assignment problems.',
      }
    ],
    whenToUse: [
      'Finding the single unique number or missing number in an array',
      'Counting set bits (Hamming Weight)',
      'Subsets representation without arrays',
      'Fast arithmetic without multiplication or division operators'
    ],
    templates: [
      {
        name: 'Counting Set Bits (Brian Kernighan)',
        language: 'python',
        code: `def count_set_bits(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1) # Clears lowest set bit
        count += 1
    return count`,
        explanation: 'Runs in O(K) iterations where K is the number of 1-bits, faster than shifting 32 times.'
      }
    ],
    commonMistakes: [
      'Operator precedence: in Python and C++, `==` has higher precedence than `&`! Always write `(n & 1) == 0`, not `n & 1 == 0`.',
      'Handling negative numbers in Python: Python integers have arbitrary precision, so bit shifts on negative numbers do not wrap around 32 bits without masking `& 0xFFFFFFFF`.'
    ],
    problemSlugs: [
      'single-number',
      'number-of-1-bits',
      'counting-bits',
      'reverse-bits'
    ]
  }
];
