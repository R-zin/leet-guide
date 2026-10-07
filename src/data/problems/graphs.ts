import { Problem } from '@/types';

export const graphProblems: Problem[] = [
  {
    id: 200,
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: '2D Grid Connected Components (DFS / BFS)',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Bloomberg'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: '1'
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: '3'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    intuition: `Iterate through every cell \`(r, c)\` in the grid.
When we encounter an unvisited land cell \`'1'\`:
- Increment the island counter.
- Trigger a DFS or BFS traversal from that cell to sink/visit all 4-directionally connected land cells belonging to this island (changing them from \`'1'\` to \`'0'\` in-place).
When all cells have been scanned, the island counter equals the total number of connected components!`,
    algorithmSteps: [
      'Initialize `islands = 0`, `rows = len(grid)`, `cols = len(grid[0])`.',
      'Define helper function `dfs(r, c)`:',
      '  If `r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != \'1\'`: return.',
      '  Set `grid[r][c] = \'0\'` (sink visited land).',
      '  Call `dfs` on all 4 neighbors: (r+1, c), (r-1, c), (r, c+1), (r, c-1).',
      'Loop `r` in range(rows) and `c` in range(cols):',
      '  If `grid[r][c] == \'1\'`:',
      '    `dfs(r, c)`',
      '    `islands += 1`',
      'Return `islands`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
            
        rows, cols = len(grid), len(grid[0])
        islands = 0
        
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'  # Mark visited
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    dfs(r, c)
                    islands += 1
                    
        return islands`,
      javascript: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int rows = grid.size(), cols = grid[0].size();
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int count = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`
    },
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    complexityAnalysis: 'Every cell is visited at most a constant number of times across outer loops and DFS. Space complexity is O(M * N) for the recursion call stack in the worst case where grid is filled entirely with land.',
    commonPitfalls: [
      'Comparing `grid[r][c] == 1` with an integer instead of string/char `\'1\'`.',
      'Forgetting to mark cell as visited before recursing into neighbors, causing infinite recursion / call stack overflow.'
    ],
    runnable: {
      functionName: 'numIslands',
      starterCode: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,
      testCases: [
        {
          input: [[['1', '1', '0', '0'], ['1', '1', '0', '0'], ['0', '0', '1', '0'], ['0', '0', '0', '1']]],
          expected: 3
        }
      ]
    }
  },
  {
    id: 207,
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: "Topological Sort / Kahn's Algorithm",
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.
Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    intuition: `This problem reduces to detecting a cycle in a directed graph:
Can we find a valid Topological Ordering of all vertices?
Kahn's Algorithm (BFS):
1. Compute the in-degree (number of prerequisites) for every course.
2. Initialize a queue containing all courses with \`in_degree == 0\` (no prerequisites needed).
3. While queue is non-empty, dequeue a course, increment \`completed_courses\`, and decrement the in-degree of all dependent courses.
4. If a dependent course's in-degree drops to 0, enqueue it.
If \`completed_courses == numCourses\`, then all courses can be finished without cycles!`,
    algorithmSteps: [
      'Build adjacency list `graph` and `in_degree` array of size `numCourses`.',
      'For each `[course, prereq]` in `prerequisites`: `graph[prereq].append(course)` and `in_degree[course] += 1`.',
      'Enqueue all courses where `in_degree[i] == 0`.',
      'Initialize `taken = 0`.',
      'While queue is not empty:',
      '  `curr = queue.popleft()`',
      '  `taken += 1`',
      '  For each `neighbor` in `graph[curr]`:',
      '    `in_degree[neighbor] -= 1`',
      '    If `in_degree[neighbor] == 0`: queue.append(neighbor)',
      'Return `taken == numCourses`.'
    ],
    solutions: {
      python: `from collections import deque, defaultdict
from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = defaultdict(list)
        in_degree = [0] * numCourses
        
        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1
            
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        taken = 0
        
        while queue:
            node = queue.popleft()
            taken += 1
            for neighbor in graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
                    
        return taken == numCourses`,
      javascript: `function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let taken = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        taken++;
        for (const neighbor of graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    return taken === numCourses;
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (const auto& pre : prerequisites) {
            graph[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        int taken = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            taken++;
            for (int neighbor : graph[curr]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        return taken == numCourses;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<Integer>[] graph = new List[numCourses];
        for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        
        for (int[] pre : prerequisites) {
            graph[pre[1]].add(pre[0]);
            inDegree[pre[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        
        int taken = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            taken++;
            for (int neighbor : graph[curr]) {
                if (--inDegree[neighbor] == 0) {
                    q.offer(neighbor);
                }
            }
        }
        return taken == numCourses;
    }
}`
    },
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    complexityAnalysis: 'Where V = numCourses and E = len(prerequisites). Building the graph takes O(E). Each course is enqueued and dequeued once, and each edge is processed once. Total time is O(V + E). Space is O(V + E) for adjacency list and in-degree table.',
    commonPitfalls: [
      'Reversing the edge direction: prerequisites[i] = [course, prereq] means edge goes from `prereq -> course`.',
      'Using pure DFS without three-color cycle detection (white, gray, black), leading to false cycle reporting on DAG branches.'
    ],
    runnable: {
      functionName: 'canFinish',
      starterCode: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let taken = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    taken++;
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return taken === numCourses;
}`,
      testCases: [
        { input: [2, [[1, 0]]], expected: true },
        { input: [2, [[1, 0], [0, 1]]], expected: false }
      ]
    }
  },
  {
    id: 994,
    title: 'Rotting Oranges',
    slug: 'rotting-oranges',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: 'Multi-Source BFS',
    leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
    examples: [
      {
        input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
        output: '4'
      },
      {
        input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
        output: '-1',
        explanation: 'The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.'
      },
      {
        input: 'grid = [[0,2]]',
        output: '0',
        explanation: 'Since there are already no fresh oranges at minute 0, the answer is just 0.'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 10',
      'grid[i][j] is 0, 1, or 2.'
    ],
    intuition: `This is a classic Multi-Source BFS problem.
All rotten oranges at minute 0 rot their neighbors simultaneously!
1. Scan grid: enqueue ALL cells with \`grid[r][c] == 2\` and count total \`fresh\` oranges.
2. If \`fresh == 0\`, return 0 immediately.
3. Process BFS layer by layer: in each minute, rot all 4-directional fresh neighbors, decrement \`fresh\`, and enqueue new rotten oranges.
4. Stop when queue is empty.
5. If \`fresh == 0\`, return elapsed minutes; otherwise return -1.`,
    algorithmSteps: [
      'Initialize `queue = deque()` and `fresh = 0`.',
      'Populate queue with all (r, c) where `grid[r][c] == 2`; count `grid[r][c] == 1` into `fresh`.',
      'If `fresh == 0`: return 0.',
      'Initialize `minutes = 0`.',
      'While queue is non-empty and `fresh > 0`:',
      '  `minutes += 1`',
      '  For each orange in current minute layer:',
      '    For each 4-directional neighbor (nr, nc):',
      '      If `grid[nr][nc] == 1`:',
      '        `grid[nr][nc] = 2`',
      '        `fresh -= 1`',
      '        queue.append((nr, nc))',
      'Return `minutes` if `fresh == 0` else `-1`.'
    ],
    solutions: {
      python: `from collections import deque
from typing import List

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
                    
        if fresh == 0:
            return 0
            
        minutes = 0
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        while queue and fresh > 0:
            minutes += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        queue.append((nr, nc))
                        
        return minutes if fresh == 0 else -1`,
      javascript: `function orangesRotting(grid) {
    const rows = grid.length, cols = grid[0].length;
    const queue = [];
    let fresh = 0;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) queue.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    
    if (fresh === 0) return 0;
    let minutes = 0;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    
    while (queue.length > 0 && fresh > 0) {
        minutes++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    return fresh === 0 ? minutes : -1;
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        
        if (fresh == 0) return 0;
        int minutes = 0;
        vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        
        while (!q.empty() && fresh > 0) {
            minutes++;
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                auto [r, c] = q.front();
                q.pop();
                for (auto [dr, dc] : dirs) {
                    int nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) queue.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        
        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        
        while (!queue.isEmpty() && fresh > 0) {
            minutes++;
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0], nc = curr[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}`
    },
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    complexityAnalysis: 'Each grid cell is visited and pushed to the queue at most once. Grid dimensions are bounded, taking O(M * N) time and O(M * N) auxiliary memory for the BFS queue.',
    commonPitfalls: [
      'Incrementing minutes when the queue is processed but no fresh oranges were converted (leads to off-by-one in minutes calculation).',
      'Forgetting the initial `if fresh == 0: return 0` check.'
    ],
    runnable: {
      functionName: 'orangesRotting',
      starterCode: `function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;
  let minutes = 0;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
  while (queue.length > 0 && fresh > 0) {
    minutes++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; queue.push([nr, nc]);
        }
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`,
      testCases: [
        { input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
        { input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 }
      ]
    }
  },

  // NEW GRAPH PROBLEMS
  {
    id: 743,
    title: 'Network Delay Time',
    slug: 'network-delay-time',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: "Dijkstra's Shortest Path Algorithm",
    leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',
    companies: ['Google', 'Amazon', 'Microsoft', 'DoorDash'],
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (u_i, v_i, w_i)\`, where \`u_i\` is the source node, \`v_i\` is the target node, and \`w_i\` is the time it takes for a signal to travel from source to target.
We will send a signal from a given node \`k\`. Return the minimum time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
    examples: [
      {
        input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
        output: '2',
        explanation: 'Signal starts at node 2. Reaches 1 in 1 unit, 3 in 1 unit, and 4 in 2 units. Max time = 2.'
      },
      {
        input: 'times = [[1,2,1]], n = 2, k = 1',
        output: '1'
      },
      {
        input: 'times = [[1,2,1]], n = 2, k = 2',
        output: '-1',
        explanation: 'Signal starts at node 2, but cannot reach node 1. Returns -1.'
      }
    ],
    constraints: [
      '1 <= k <= n <= 100',
      '1 <= times.length <= 6000',
      'times[i].length == 3',
      '1 <= u_i, v_i <= n',
      'u_i != v_i',
      '0 <= w_i <= 100',
      'All pairs (u_i, v_i) are unique.'
    ],
    intuition: `This is a single-source shortest path problem on a directed graph with non-negative edge weights.
The classic optimal algorithm is Dijkstra's Algorithm using a Min-Priority Queue (Min-Heap):
1. Maintain a min-heap storing pairs \`(distance, node)\`, initialized with \`(0, k)\`.
2. Maintain a hash map/array \`shortest_dist\` to track the confirmed shortest time to each node.
3. While the heap is not empty, extract the minimum distance node \`(d, u)\`.
   - If \`u\` has already been visited with a shorter or equal distance, skip it.
   - Record \`shortest_dist[u] = d\`.
   - For each outgoing edge \`(u -> v, weight)\`, push \`(d + weight, v)\` into the heap.
4. When done, if \`len(shortest_dist) == n\`, the total time is \`max(shortest_dist.values())\`. Otherwise, some nodes were unreachable, return \`-1\`.`,
    algorithmSteps: [
      'Build adjacency list `graph`: map `u -> list of (v, weight)`.',
      'Initialize `min_heap = [(0, k)]` and `visited = {}`.',
      'While `min_heap` is not empty:',
      '  Pop `(time, node)` with smallest time.',
      '  If `node in visited`: continue.',
      '  Record `visited[node] = time`.',
      '  For each `(neighbor, weight)` in `graph[node]`:',
      '    If `neighbor not in visited`:',
      '      Push `(time + weight, neighbor)` to `min_heap`.',
      'Return `max(visited.values())` if `len(visited) == n` else `-1`.'
    ],
    solutions: {
      python: `import heapq
from collections import defaultdict
from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))
            
        min_heap = [(0, k)]  # (travel_time, node)
        shortest = {}
        
        while min_heap:
            time, node = heapq.heappop(min_heap)
            if node in shortest:
                continue
            shortest[node] = time
            
            for neighbor, weight in graph[node]:
                if neighbor not in shortest:
                    heapq.heappush(min_heap, (time + weight, neighbor))
                    
        return max(shortest.values()) if len(shortest) == n else -1`,
      javascript: `function networkDelayTime(times, n, k) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }
    
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    
    // Priority Queue simulation using simple array
    const pq = [[0, k]];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();
        
        if (d > dist[u]) continue;
        
        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    return maxTime;
}`,
      cpp: `#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> graph(n + 1);
        for (const auto& t : times) {
            graph[t[0]].push_back({t[1], t[2]});
        }
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(n + 1, 1e9);
        dist[k] = 0;
        pq.push({0, k});
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            if (d > dist[u]) continue;
            
            for (auto& edge : graph[u]) {
                int v = edge.first, w = edge.second;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        int max_time = 0;
        for (int i = 1; i <= n; ++i) {
            if (dist[i] == 1e9) return -1;
            max_time = max(max_time, dist[i]);
        }
        return max_time;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] t : times) {
            graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
        }
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        pq.offer(new int[]{0, k});
        
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];
            if (d > dist[u]) continue;
            
            if (graph.containsKey(u)) {
                for (int[] edge : graph.get(u)) {
                    int v = edge[0], w = edge[1];
                    if (dist[u] + w < dist[v]) {
                        dist[v] = dist[u] + w;
                        pq.offer(new int[]{dist[v], v});
                    }
                }
            }
        }
        
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxTime = Math.max(maxTime, dist[i]);
        }
        return maxTime;
    }
}`
    },
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V + E)',
    complexityAnalysis: 'Dijkstra with a binary priority queue takes O(E log V) time, where E is the number of edges (times) and V is the number of nodes (n). The graph and heap occupy O(V + E) space.',
    commonPitfalls: [
      'Nodes are 1-indexed (from 1 to n), so arrays must be size n + 1.',
      'Using standard unweighted BFS: edge weights vary, so standard BFS does NOT find shortest paths.'
    ],
    runnable: {
      functionName: 'networkDelayTime',
      starterCode: `function networkDelayTime(times, n, k) {
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  // Bellman-Ford pass for simple in-browser execution
  for (let i = 1; i <= n - 1; i++) {
    for (const [u, v, w] of times) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}`,
      testCases: [
        { input: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], expected: 2 },
        { input: [[[1, 2, 1]], 2, 1], expected: 1 },
        { input: [[[1, 2, 1]], 2, 2], expected: -1 }
      ]
    }
  },
  {
    id: 210,
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: "Topological Sort Order Generation",
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.`,
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0,1]',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].'
      },
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        output: '[0,2,1,3]',
        explanation: 'There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after course 0. So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].'
      },
      {
        input: 'numCourses = 1, prerequisites = []',
        output: '[0]'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'a_i != b_i',
      'All the pairs [a_i, b_i] are distinct.'
    ],
    intuition: `Unlike Course Schedule I which only asked if finishing all courses is possible, Course Schedule II asks for the actual topological order.
Kahn's algorithm is ideal:
1. Track in-degree of all courses.
2. Initialize queue with courses having 0 in-degree.
3. Every time a node is dequeued, append it to \`order\`.
4. Decrement neighbors' in-degrees. Enqueue any neighbor whose in-degree drops to 0.
5. If \`len(order) == numCourses\`, return \`order\`. Otherwise a cycle prevented taking all courses; return \`[]\`.`,
    algorithmSteps: [
      'Create `graph` and `in_degree` table for all `numCourses`.',
      'For each `[course, prereq]` in `prerequisites`: add edge `prereq -> course`, increment `in_degree[course]`.',
      'Enqueue all courses with in-degree 0.',
      'Initialize `order = []`.',
      'While queue is not empty:',
      '  Pop `u = queue.popleft()`, append to `order`.',
      '  For each `v` in `graph[u]`: decrement `in_degree[v]`. If `in_degree[v] == 0`: enqueue `v`.',
      'Return `order` if `len(order) == numCourses` else `[]`.'
    ],
    solutions: {
      python: `from collections import deque, defaultdict
from typing import List

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = defaultdict(list)
        in_degree = [0] * numCourses
        
        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1
            
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        order = []
        
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
                    
        return order if len(order) == numCourses else []`,
      javascript: `function findOrder(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const order = [];
    while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);
        for (const neighbor of graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    return order.length === numCourses ? order : [];
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (const auto& pre : prerequisites) {
            graph[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            order.push_back(u);
            for (int v : graph[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        return order.size() == numCourses ? order : vector<int>();
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<Integer>[] graph = new List[numCourses];
        for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        
        for (int[] pre : prerequisites) {
            graph[pre[1]].add(pre[0]);
            inDegree[pre[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        
        int[] order = new int[numCourses];
        int idx = 0;
        
        while (!q.isEmpty()) {
            int u = q.poll();
            order[idx++] = u;
            for (int v : graph[u]) {
                if (--inDegree[v] == 0) {
                    q.offer(v);
                }
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`
    },
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    complexityAnalysis: 'Processes all V courses and E prerequisites in linear O(V + E) time. Graph adjacency list, queue, and topological order array consume O(V + E) space.',
    commonPitfalls: [
      'Edge orientation mistake: `[a, b]` means `b` is prerequisite for `a`, so directed edge is `b -> a`.',
      'Forgetting that if a cycle exists, the queue will empty before all courses are processed; must verify `order.length === numCourses`.'
    ],
    runnable: {
      functionName: 'findOrder',
      starterCode: `function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order.length === numCourses ? order : [];
}`,
      testCases: [
        { input: [2, [[1, 0]]], expected: [0, 1] },
        { input: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: [0, 1, 2, 3] }
      ]
    }
  },
  {
    id: 684,
    title: 'Redundant Connection',
    slug: 'redundant-connection',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: 'Disjoint Set Union (Cycle Detection)',
    leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',
    companies: ['Google', 'Amazon', 'Meta'],
    description: `In this problem, a tree is an undirected graph that is connected and has no cycles.
You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed.
Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
    examples: [
      {
        input: 'edges = [[1,2],[1,3],[2,3]]',
        output: '[2,3]',
        explanation: 'Removing edge [2,3] results in a valid connected tree.'
      },
      {
        input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]',
        output: '[1,4]'
      }
    ],
    constraints: [
      'n == edges.length',
      '3 <= n <= 1000',
      'edges[i].length == 2',
      '1 <= u_i < v_i <= edges.length',
      'u_i != v_i',
      'There are no repeated edges.',
      'The given graph is connected.'
    ],
    intuition: `A tree with N nodes has exactly N - 1 edges and no cycles. Adding one edge creates exactly 1 cycle.
We need to find the edge that creates this cycle.
Disjoint Set Union (Union-Find) is tailor-made for dynamic cycle detection:
Initialize each node in its own connected component.
Iterate through the edge list:
For edge \`(u, v)\`:
- Find root of \`u\` and root of \`v\`.
- If \`find(u) == find(v)\`, \`u\` and \`v\` are ALREADY in the same connected component! Adding this edge creates a cycle! Since we iterate in order, this is our redundant edge.
- If roots differ, union the two sets.`,
    algorithmSteps: [
      'Initialize `parent = list(range(n + 1))` and `rank = [1] * (n + 1)`.',
      'Define `find(x)` with path compression.',
      'Define `union(x, y)` with union by rank: returns false if `find(x) == find(y)`.',
      'For each edge `[u, v]` in `edges`:',
      '  If not `union(u, v)`: return `[u, v]`.',
      'Return empty array.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        parent = list(range(n + 1))
        rank = [1] * (n + 1)
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])  # Path compression
            return parent[x]
            
        def union(x, y):
            root_x, root_y = find(x), find(y)
            if root_x == root_y:
                return False  # Cycle detected!
            if rank[root_x] < rank[root_y]:
                parent[root_x] = root_y
            elif rank[root_x] > rank[root_y]:
                parent[root_y] = root_x
            else:
                parent[root_y] = root_x
                rank[root_x] += 1
            return True
            
        for u, v in edges:
            if not union(u, v):
                return [u, v]
                
        return []`,
      javascript: `function findRedundantConnection(edges) {
    const n = edges.length;
    const parent = Array.from({ length: n + 1 }, (_, i) => i);
    const rank = new Array(n + 1).fill(1);
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    function union(x, y) {
        const rx = find(x);
        const ry = find(y);
        if (rx === ry) return false;
        
        if (rank[rx] < rank[ry]) {
            parent[rx] = ry;
        } else if (rank[rx] > rank[ry]) {
            parent[ry] = rx;
        } else {
            parent[ry] = rx;
            rank[rx]++;
        }
        return true;
    }
    
    for (const [u, v] of edges) {
        if (!union(u, v)) return [u, v];
    }
    return [];
}`,
      cpp: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
    vector<int> parent, rank;
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return false;
        if (rank[rx] < rank[ry]) parent[rx] = ry;
        else if (rank[rx] > rank[ry]) parent[ry] = rx;
        else {
            parent[ry] = rx;
            rank[rx]++;
        }
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n + 1);
        iota(parent.begin(), parent.end(), 0);
        rank.assign(n + 1, 1);
        
        for (const auto& e : edges) {
            if (!unite(e[0], e[1])) return e;
        }
        return {};
    }
};`,
      java: `class Solution {
    private int[] parent;
    private int[] rank;
    
    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    private boolean union(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return false;
        if (rank[rx] < rank[ry]) parent[rx] = ry;
        else if (rank[rx] > rank[ry]) parent[ry] = rx;
        else {
            parent[ry] = rx;
            rank[rx]++;
        }
        return true;
    }
    
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        parent = new int[n + 1];
        rank = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;
        
        for (int[] e : edges) {
            if (!union(e[0], e[1])) return e;
        }
        return new int[0];
    }
}`
    },
    timeComplexity: 'O(N * α(N))',
    spaceComplexity: 'O(N)',
    complexityAnalysis: 'With path compression and union by rank, each union operation takes near-constant O(α(N)) amortized time, where α is the inverse Ackermann function (α <= 4 for all practical N). Total time is essentially O(N). Space is O(N) for parent and rank arrays.',
    commonPitfalls: [
      'Forgetting path compression in `find(x)` (can degrade Union-Find tree to a linked list taking O(N) per find).',
      'Nodes are 1-indexed, requiring arrays of size N + 1.'
    ],
    runnable: {
      functionName: 'findRedundantConnection',
      starterCode: `function findRedundantConnection(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (const [u, v] of edges) {
    const rx = find(u), ry = find(v);
    if (rx === ry) return [u, v];
    parent[rx] = ry;
  }
  return [];
}`,
      testCases: [
        { input: [[[1, 2], [1, 3], [2, 3]]], expected: [2, 3] },
        { input: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], expected: [1, 4] }
      ]
    }
  },
  {
    id: 417,
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: 'Multi-Source Reverse Reachability DFS',
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    companies: ['Google', 'Amazon', 'Meta'],
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's top and left edges, and the Atlantic Ocean touches the island's bottom and right edges.
The island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the height above sea level of the cell at coordinate \`(r, c)\`.
Rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
Return a 2D list of grid coordinates \`result\` where \`result[i] = [r_i, c_i]\` denotes that rain water can flow from cell \`(r_i, c_i)\` to both the Pacific and Atlantic oceans.`,
    examples: [
      {
        input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
        output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]'
      },
      {
        input: 'heights = [[1]]',
        output: '[[0,0]]'
      }
    ],
    constraints: [
      'm == heights.length',
      'n == heights[r].length',
      '1 <= m, n <= 200',
      '0 <= heights[r][c] <= 10^5'
    ],
    intuition: `If we simulate water flowing downward from every cell, it takes O((M * N)²) time due to repeated traversals.
Invert the thinking! Work backwards from the oceans:
Water flows uphill!
- Start a DFS/BFS from all Pacific border cells (top row and left column) moving into cells with \`height >= current_height\`. Mark all reached cells in \`pacific_reachable\`.
- Start a DFS/BFS from all Atlantic border cells (bottom row and right column) moving uphill. Mark all reached cells in \`atlantic_reachable\`.
Any cell present in BOTH sets can flow to both oceans!
Time improves to optimal O(M * N)!`,
    algorithmSteps: [
      'Initialize `pacific = set()` and `atlantic = set()`.',
      'Run DFS from top/bottom borders (rows 0 and m - 1) and left/right borders (cols 0 and n - 1).',
      'In DFS, move to neighboring cell (nr, nc) only if `heights[nr][nc] >= heights[r][c]` and not visited.',
      'Return all `[r, c]` where `(r, c)` is in both `pacific` and `atlantic`.'
    ],
    solutions: {
      python: `from typing import List

class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        rows, cols = len(heights), len(heights[0])
        pac = set()
        atl = set()
        
        def dfs(r, c, visited, prev_height):
            if (r, c) in visited or r < 0 or r >= rows or c < 0 or c >= cols or heights[r][c] < prev_height:
                return
            visited.add((r, c))
            dfs(r + 1, c, visited, heights[r][c])
            dfs(r - 1, c, visited, heights[r][c])
            dfs(r, c + 1, visited, heights[r][c])
            dfs(r, c - 1, visited, heights[r][c])
            
        # Top and Bottom rows
        for c in range(cols):
            dfs(0, c, pac, heights[0][c])
            dfs(rows - 1, c, atl, heights[rows - 1][c])
            
        # Left and Right columns
        for r in range(rows):
            dfs(r, 0, pac, heights[r][0])
            dfs(r, cols - 1, atl, heights[r][cols - 1])
            
        return [list(coord) for coord in (pac & atl)]`,
      javascript: `function pacificAtlantic(heights) {
    const rows = heights.length, cols = heights[0].length;
    const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    function dfs(r, c, visited) {
        visited[r][c] = true;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                if (heights[nr][nc] >= heights[r][c]) {
                    dfs(nr, nc, visited);
                }
            }
        }
    }
    
    for (let c = 0; c < cols; c++) {
        dfs(0, c, pac);
        dfs(rows - 1, c, atl);
    }
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pac);
        dfs(r, cols - 1, atl);
    }
    
    const res = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pac[r][c] && atl[r][c]) res.push([r, c]);
        }
    }
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
    int rows, cols;
    vector<pair<int, int>> dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    void dfs(int r, int c, vector<vector<bool>>& visited, const vector<vector<int>>& h) {
        visited[r][c] = true;
        for (auto& d : dirs) {
            int nr = r + d.first, nc = c + d.second;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                if (h[nr][nc] >= h[r][c]) {
                    dfs(nr, nc, visited, h);
                }
            }
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        rows = heights.size(); cols = heights[0].size();
        vector<vector<bool>> pac(rows, vector<bool>(cols, false));
        vector<vector<bool>> atl(rows, vector<bool>(cols, false));
        
        for (int c = 0; c < cols; ++c) {
            dfs(0, c, pac, heights);
            dfs(rows - 1, c, atl, heights);
        }
        for (int r = 0; r < rows; ++r) {
            dfs(r, 0, pac, heights);
            dfs(r, cols - 1, atl, heights);
        }
        
        vector<vector<int>> res;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (pac[r][c] && atl[r][c]) res.push_back({r, c});
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    private int rows, cols;
    private int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    
    private void dfs(int r, int c, boolean[][] visited, int[][] heights) {
        visited[r][c] = true;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                if (heights[nr][nc] >= heights[r][c]) {
                    dfs(nr, nc, visited, heights);
                }
            }
        }
    }
    
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        rows = heights.length; cols = heights[0].length;
        boolean[][] pac = new boolean[rows][cols];
        boolean[][] atl = new boolean[rows][cols];
        
        for (int c = 0; c < cols; c++) {
            dfs(0, c, pac, heights);
            dfs(rows - 1, c, atl, heights);
        }
        for (int r = 0; r < rows; r++) {
            dfs(r, 0, pac, heights);
            dfs(r, cols - 1, atl, heights);
        }
        
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }
}`
    },
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    complexityAnalysis: 'Each cell is visited at most twice during the Pacific and Atlantic traversals, resulting in O(M * N) time. The visited 2D boolean matrices and call stack consume O(M * N) space.',
    commonPitfalls: [
      'Flowing water from each cell downward: leads to exponential or O((M * N)²) timeouts.',
      'Off-by-one errors with border starts.'
    ],
    runnable: {
      functionName: 'pacificAtlantic',
      starterCode: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
  function dfs(r, c, vis) {
    vis[r][c] = true;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !vis[nr][nc] && heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, vis);
      }
    }
  }
  for (let c = 0; c < cols; c++) { dfs(0, c, pac); dfs(rows - 1, c, atl); }
  for (let r = 0; r < rows; r++) { dfs(r, 0, pac); dfs(r, cols - 1, atl); }
  const res = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }
  return res;
}`,
      testCases: [
        {
          input: [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]],
          expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
        }
      ]
    }
  },
  {
    id: 785,
    title: 'Is Graph Bipartite?',
    slug: 'is-graph-bipartite',
    difficulty: 'Medium',
    topic: 'graphs',
    topicName: 'Graphs, BFS, DFS & Connectivity',
    pattern: '2-Coloring BFS / Odd-Cycle Detection',
    leetcodeUrl: 'https://leetcode.com/problems/is-graph-bipartite/',
    companies: ['Meta', 'Amazon', 'Microsoft'],
    description: `There is an undirected graph with \`n\` nodes, where each node is numbered between \`0\` and \`n - 1\`. You are given a 2D array \`graph\`, where \`graph[u]\` is an array of nodes that node \`u\` is adjacent to.
A graph is bipartite if the nodes can be partitioned into two independent sets \`A\` and \`B\` such that every edge in the graph connects a node in set \`A\` and a node in set \`B\`.
Return \`true\` if and only if it is bipartite.`,
    examples: [
      {
        input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]',
        output: 'false',
        explanation: 'There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other (triangle 0-1-2 forms an odd cycle).'
      },
      {
        input: 'graph = [[1,3],[0,2],[1,3],[0,2]]',
        output: 'true',
        explanation: 'We can partition the nodes into two sets: {0, 2} and {1, 3}.'
      }
    ],
    constraints: [
      'graph.length == n',
      '1 <= n <= 100',
      '0 <= graph[u].length < n',
      '0 <= graph[u][i] <= n - 1',
      'graph[u] does not contain u.',
      'All values in graph[u] are unique.',
      'The graph may not be connected, meaning there may be multiple components.'
    ],
    intuition: `A graph is bipartite if and only if it contains NO odd-length cycles!
This can be modeled as 2-Coloring:
Attempt to color every node with either Color 1 or Color -1:
1. For every uncolored node (handling disconnected components), assign Color 1 and start BFS or DFS.
2. For each neighbor:
   - If uncolored: color it with the opposite color (\`-color\`).
   - If already colored with the SAME color as the current node: a conflict occurred! Return \`false\`.
If all nodes can be colored without conflict, return \`true\`.`,
    algorithmSteps: [
      'Initialize `color` array of size `n` with 0 (uncolored).',
      'Loop `i` from 0 to n - 1:',
      '  If `color[i] != 0`: continue (already colored).',
      '  Set `color[i] = 1`, enqueue `i`.',
      '  While queue is not empty:',
      '    `node = queue.popleft()`',
      '    For each `neighbor` in `graph[node]`:',
      '      If `color[neighbor] == color[node]`: return false.',
      '      If `color[neighbor] == 0`:',
      '        `color[neighbor] = -color[node]`',
      '        queue.append(neighbor)',
      'Return true.'
    ],
    solutions: {
      python: `from collections import deque
from typing import List

class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        color = [0] * n  # 0: uncolored, 1: red, -1: blue
        
        for i in range(n):
            if color[i] != 0:
                continue
                
            color[i] = 1
            queue = deque([i])
            
            while queue:
                node = queue.popleft()
                for neighbor in graph[node]:
                    if color[neighbor] == color[node]:
                        return False
                    if color[neighbor] == 0:
                        color[neighbor] = -color[node]
                        queue.append(neighbor)
                        
        return True`,
      javascript: `function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (color[i] !== 0) continue;
        
        color[i] = 1;
        const queue = [i];
        
        while (queue.length > 0) {
            const node = queue.shift();
            for (const neighbor of graph[node]) {
                if (color[neighbor] === color[node]) return false;
                if (color[neighbor] === 0) {
                    color[neighbor] = -color[node];
                    queue.push(neighbor);
                }
            }
        }
    }
    return true;
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0);
        
        for (int i = 0; i < n; ++i) {
            if (color[i] != 0) continue;
            
            color[i] = 1;
            queue<int> q;
            q.push(i);
            
            while (!q.empty()) {
                int u = q.front();
                q.pop();
                for (int v : graph[u]) {
                    if (color[v] == color[u]) return false;
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.push(v);
                    }
                }
            }
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            
            color[i] = 1;
            Queue<Integer> q = new LinkedList<>();
            q.offer(i);
            
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : graph[u]) {
                    if (color[v] == color[u]) return false;
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.offer(v);
                    }
                }
            }
        }
        return true;
    }
}`
    },
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    complexityAnalysis: 'Every node and edge is examined once. Total time is O(V + E). The color array and BFS queue require O(V) space.',
    commonPitfalls: [
      'Assuming the graph is connected: must loop through all vertices 0 to n - 1 to handle disconnected subgraphs.',
      'Not checking opposite color correctly.'
    ],
    runnable: {
      functionName: 'isBipartite',
      starterCode: `function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (color[i] !== 0) continue;
    color[i] = 1;
    const queue = [i];
    while (queue.length > 0) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (color[neighbor] === color[node]) return false;
        if (color[neighbor] === 0) {
          color[neighbor] = -color[node];
          queue.push(neighbor);
        }
      }
    }
  }
  return true;
}`,
      testCases: [
        { input: [[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]], expected: false },
        { input: [[[1, 3], [0, 2], [1, 3], [0, 2]]], expected: true }
      ]
    }
  }
];
