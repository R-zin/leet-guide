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
  }
];
