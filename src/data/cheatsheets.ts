import { BigOComplexityItem, CodeTemplate } from '@/types';

export const dataStructureComplexity: BigOComplexityItem[] = [
  {
    structure: 'Array / Dynamic Array',
    access: 'O(1)',
    search: 'O(N)',
    insertion: 'O(N) (O(1) amortized append)',
    deletion: 'O(N)',
    space: 'O(N)',
    notes: 'Contiguous RAM block with excellent CPU cache locality.'
  },
  {
    structure: 'Singly Linked List',
    access: 'O(N)',
    search: 'O(N)',
    insertion: 'O(1) (given pointer to node)',
    deletion: 'O(1) (given pointer to predecessor)',
    space: 'O(N)',
    notes: 'Non-contiguous node pointers; no indexing overhead.'
  },
  {
    structure: 'Doubly Linked List',
    access: 'O(N)',
    search: 'O(N)',
    insertion: 'O(1)',
    deletion: 'O(1)',
    space: 'O(N)',
    notes: 'Used in LRU Cache paired with Hash Map.'
  },
  {
    structure: 'Stack (LIFO)',
    access: 'O(N)',
    search: 'O(N)',
    insertion: 'O(1) (Push)',
    deletion: 'O(1) (Pop)',
    space: 'O(N)',
    notes: 'Used in DFS, matching brackets, monotonic ranges.'
  },
  {
    structure: 'Queue (FIFO)',
    access: 'O(N)',
    search: 'O(N)',
    insertion: 'O(1) (Enqueue)',
    deletion: 'O(1) (Dequeue)',
    space: 'O(N)',
    notes: 'Used in BFS, multi-source traversals, level-order scans.'
  },
  {
    structure: 'Hash Table (HashMap / HashSet)',
    access: 'N/A',
    search: 'O(1) avg / O(N) worst',
    insertion: 'O(1) avg / O(N) worst',
    deletion: 'O(1) avg / O(N) worst',
    space: 'O(N)',
    notes: 'Collisions resolved by chaining or open addressing.'
  },
  {
    structure: 'Binary Search Tree (Unbalanced)',
    access: 'O(H) -> O(N) worst',
    search: 'O(H) -> O(N) worst',
    insertion: 'O(H) -> O(N) worst',
    deletion: 'O(H) -> O(N) worst',
    space: 'O(N)',
    notes: 'Degenerates to a linked list if inserted in sorted order.'
  },
  {
    structure: 'Balanced BST (AVL / Red-Black Tree)',
    access: 'O(log N)',
    search: 'O(log N)',
    insertion: 'O(log N)',
    deletion: 'O(log N)',
    space: 'O(N)',
    notes: 'Guarantees O(log N) height via self-balancing tree rotations.'
  },
  {
    structure: 'Binary Heap (Priority Queue)',
    access: 'O(1) (Peek min/max)',
    search: 'O(N)',
    insertion: 'O(log N)',
    deletion: 'O(log N) (Pop min/max)',
    space: 'O(N)',
    notes: 'Building heap from array takes O(N) via heapify.'
  },
  {
    structure: 'Trie (Prefix Tree)',
    access: 'O(L)',
    search: 'O(L)',
    insertion: 'O(L)',
    deletion: 'O(L)',
    space: 'O(ALPHABET * L * N)',
    notes: 'L = length of string key. Fastest prefix query structure.'
  },
  {
    structure: 'Disjoint Set Union (Union-Find)',
    access: 'N/A',
    search: 'O(α(N)) (Find)',
    insertion: 'O(α(N)) (Union)',
    deletion: 'N/A',
    space: 'O(N)',
    notes: 'α(N) is the inverse Ackermann function (effectively <= 4).'
  }
];

export const sortingComplexity = [
  { algorithm: 'Quick Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)', space: 'O(log N)', stable: 'No' },
  { algorithm: 'Merge Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', stable: 'Yes' },
  { algorithm: 'Heap Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(1)', stable: 'No' },
  { algorithm: 'Insertion Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', stable: 'Yes' },
  { algorithm: 'Tim Sort (Python/Java)', best: 'O(N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', stable: 'Yes' },
  { algorithm: 'Counting Sort', best: 'O(N + K)', average: 'O(N + K)', worst: 'O(N + K)', space: 'O(K)', stable: 'Yes' }
];

export const decisionFlowchart = [
  {
    scenario: 'Array is SORTED, and you need to search for a target or evaluate pairs',
    solution: 'Binary Search (O(log N)) or Two Pointers (O(N))',
    explanation: 'Opposite ends pointers converge inward. Binary search cuts the domain in half.'
  },
  {
    scenario: 'Asked to find all combinations, subsets, permutations, or solve a puzzle (N-Queens, Sudoku)',
    solution: 'Backtracking (Recursion + Pruning)',
    explanation: 'Build state step-by-step, explore deeper branches, and undo choices upon return.'
  },
  {
    scenario: 'Shortest path in an UNWEIGHTED graph or grid matrix',
    solution: 'Breadth-First Search (BFS) with Queue',
    explanation: 'Explores level-by-level; the first time the destination is dequeued, it is guaranteed minimal distance.'
  },
  {
    scenario: 'Shortest path in a WEIGHTED graph with non-negative weights',
    solution: "Dijkstra's Algorithm with Min-Heap",
    explanation: 'Greedily extracts the smallest tentative distance in O((V + E) log V).'
  },
  {
    scenario: 'Finding the Next Greater or Next Smaller element for each item',
    solution: 'Monotonic Stack',
    explanation: 'Maintain elements in strictly increasing or decreasing order. Amortized O(N) time.'
  },
  {
    scenario: 'Continuous range/subarray with max length, min length, or matching characters',
    solution: 'Sliding Window (Expand Right, Shrink Left)',
    explanation: 'Maintains invariant inside window. Runs in single pass O(N).'
  },
  {
    scenario: 'Subarray sum equals K (contains negative numbers)',
    solution: 'Prefix Sums + Hash Map',
    explanation: 'Track running cumulative sums. If (curr_sum - K) was seen earlier, that subarray sums to K!'
  },
  {
    scenario: 'Top K elements or stream median calculation',
    solution: 'Heap / Priority Queue',
    explanation: 'Min-Heap of size K for K largest elements; dual Min/Max heaps for real-time median.'
  },
  {
    scenario: 'Ordering tasks with prerequisites or detecting circular dependencies',
    solution: "Topological Sort (Kahn's In-Degree Algorithm)",
    explanation: 'Queue vertices with in-degree 0, reduce dependencies of neighbors in O(V + E).'
  },
  {
    scenario: 'Grouping connected items, dynamic graph connectivity, or cycle detection',
    solution: 'Disjoint Set Union (Union-Find) with Path Compression',
    explanation: 'Near-instantaneous O(α(N)) component merges and set checks.'
  },
  {
    scenario: 'Multiple range sum queries or finding subarrays matching target sum with negative values',
    solution: 'Prefix Sums with Hash Map',
    explanation: 'Precompute cumulative running sum. prefix[j] - prefix[i-1] = sum(i..j). For subarray equals k, look up prefix - k in map.'
  },
  {
    scenario: 'Batch range addition/modification queries on an array in O(1) per query',
    solution: 'Difference Array',
    explanation: 'Add +val at start index L and -val at index R+1. Reconstruct final array via prefix sum in O(N).'
  },
  {
    scenario: 'Shortest path in weighted graph with non-negative edge weights',
    solution: "Dijkstra's Algorithm (Priority Queue)",
    explanation: 'Greedily relax shortest distances using min-heap in O((V + E) log V). Guaranteed optimal for non-negative weights.'
  },
  {
    scenario: 'Counting distinct ways, optimizing min/max score with overlapping subproblems',
    solution: 'Dynamic Programming (1D / 2D Memoization or Tabulation)',
    explanation: 'Formulate state recurrence, identify base cases, and optimize space with rolling variables.'
  }
];

export const universalTemplates: CodeTemplate[] = [
  {
    name: 'Binary Search (Exact / Insertion Point)',
    language: 'Python',
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
    explanation: 'Safely computes mid without 32-bit overflow. Terminating condition low <= high ensures single elements are evaluated.'
  },
  {
    name: 'Sliding Window (Dynamic Contractive)',
    language: 'Python',
    code: `def dynamic_sliding_window(s):
    state = {}
    left = 0
    ans = 0
    for right in range(len(s)):
        # 1. Expand right
        char = s[right]
        state[char] = state.get(char, 0) + 1
        
        # 2. Contract while invalid
        while window_is_invalid(state):
            state[s[left]] -= 1
            left += 1
            
        # 3. Update optimal answer
        ans = max(ans, right - left + 1)
    return ans`,
    explanation: 'The universal pattern for substring problems: Longest Substring, Character Replacement, Minimum Window.'
  },
  {
    name: 'Breadth-First Search (2D Grid / Graph)',
    language: 'Python',
    code: `from collections import deque

def bfs_grid(grid, start_r, start_c):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start_r, start_c, 0)]) # (r, c, distance)
    visited = {(start_r, start_c)}
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    
    while queue:
        r, c, dist = queue.popleft()
        if is_target(r, c):
            return dist
            
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited:
                if is_valid(grid[nr][nc]):
                    visited.add((nr, nc)) # Mark immediately!
                    queue.append((nr, nc, dist + 1))
    return -1`,
    explanation: 'Crucial: Mark nodes as visited immediately upon appending to queue to prevent duplicate node exploration!'
  },
  {
    name: 'Disjoint Set Union (Union-Find with Rank & Path Compression)',
    language: 'Python',
    code: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [1] * size
        self.components = size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # Path compression
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False # Already connected! (Cycle detected)
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        self.components -= 1
        return True`,
    explanation: 'Runs in amortized O(α(N)) near-constant time. Ideal for Number of Connected Components, Redundant Connection, and Kruskal\'s MST.'
  },
  {
    name: "Dijkstra's Algorithm (Single-Source Shortest Path)",
    language: 'Python',
    code: `import heapq

def dijkstra(graph, start, n):
    # graph: {node: [(neighbor, weight)]}
    min_dist = {i: float('inf') for i in range(n)}
    min_dist[start] = 0
    pq = [(0, start)] # (distance, node)
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > min_dist[u]:
            continue # Outdated distance entry
            
        for v, weight in graph.get(u, []):
            if min_dist[u] + weight < min_dist[v]:
                min_dist[v] = min_dist[u] + weight
                heapq.heappush(pq, (min_dist[v], v))
                
    return min_dist`,
    explanation: 'Guarantees the shortest path in graphs with non-negative weights. Pops each vertex with minimum tentative distance in O((V + E) log V).'
  },
  {
    name: 'Difference Array (Batch Range Updates)',
    language: 'Python',
    code: `def apply_range_updates(length, updates):
    # updates: list of [start, end, inc] (0-indexed inclusive)
    diff = [0] * (length + 1)
    for l, r, inc in updates:
        diff[l] += inc
        diff[r + 1] -= inc
        
    res = [0] * length
    running = 0
    for i in range(length):
        running += diff[i]
        res[i] = running
    return res`,
    explanation: 'Applies any number Q of range addition operations in O(1) time each, rebuilding the final array in O(N) total time.'
  }
];
