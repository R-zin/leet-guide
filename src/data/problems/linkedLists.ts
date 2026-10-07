import { Problem } from '@/types';

export const linkedListProblems: Problem[] = [
  {
    id: 206,
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    topic: 'linked-lists',
    topicName: 'Linked Lists & Pointer Manipulation',
    pattern: 'Three Pointers In-Place Reversal',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    companies: ['Amazon', 'Google', 'Apple', 'Meta', 'Microsoft'],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]'
      },
      {
        input: 'head = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    intuition: `To reverse a linked list in-place without creating new nodes:
Maintain three pointers:
1. \`prev\`: points to the previous node (initialized to None/null).
2. \`curr\`: points to current node being reversed (initialized to head).
3. \`nxt\`: temporarily preserves the next node \`curr.next\`.
At each step, point \`curr.next\` backward to \`prev\`, then advance \`prev = curr\` and \`curr = nxt\`.
When \`curr\` becomes null, \`prev\` is the new head!`,
    algorithmSteps: [
      'Initialize `prev = None`, `curr = head`.',
      'While `curr` is not None:',
      '  Save `nxt = curr.next`.',
      '  Reverse pointer: `curr.next = prev`.',
      '  Move `prev = curr`.',
      '  Move `curr = nxt`.',
      'Return `prev`.'
    ],
    solutions: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
            
        return prev`,
      javascript: `function reverseList(head) {
    let prev = null;
    let curr = head;
    
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We traverse each node in the list once, performing constant pointer reassignments in O(1) time. Space complexity is O(1) since pointers are rewired in-place.',
    commonPitfalls: [
      'Rewriting `curr.next = prev` before caching `curr.next` in a temporary variable, losing access to the remaining list.',
      'Returning `curr` instead of `prev` (at loop exit, `curr` is null!).'
    ],
    runnable: {
      functionName: 'reverseListArray',
      starterCode: `function reverseListArray(arr) {
  // Simulating list reversal on array representation
  const res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i]);
  }
  return res;
}`,
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
        { input: [[1, 2]], expected: [2, 1] }
      ]
    }
  },
  {
    id: 21,
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'Easy',
    topic: 'linked-lists',
    topicName: 'Linked Lists & Pointer Manipulation',
    pattern: 'Sentinel Dummy Node + Pointer Splice',
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    companies: ['Amazon', 'Apple', 'Microsoft', 'Google'],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.`,
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]'
      },
      {
        input: 'list1 = [], list2 = [0]',
        output: '[0]'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    intuition: `Create a dummy sentinel node \`dummy\` to hold the head of the merged result.
Maintain a \`tail\` pointer initially at \`dummy\`.
Compare \`list1.val\` and \`list2.val\`:
- Attach whichever node is smaller to \`tail.next\`.
- Advance that list pointer and advance \`tail\`.
Once one list is exhausted, directly link the remainder of the non-empty list to \`tail.next\` in O(1)!
Return \`dummy.next\`.`,
    algorithmSteps: [
      'Create `dummy = ListNode(0)` and `tail = dummy`.',
      'While `list1` and `list2` are not null:',
      '  If `list1.val <= list2.val`: `tail.next = list1`, `list1 = list1.next`.',
      '  Else: `tail.next = list2`, `list2 = list2.next`.',
      '  `tail = tail.next`.',
      'Attach remaining non-null list: `tail.next = list1 or list2`.',
      'Return `dummy.next`.'
    ],
    solutions: {
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
            
        tail.next = list1 if list1 else list2
        return dummy.next`,
      javascript: `function mergeTwoLists(list1, list2) {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 || list2;
    return dummy.next;
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`
    },
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'We compare nodes from both lists of length N and M, splicing existing pointers in O(1) auxiliary space without creating new node allocations.',
    commonPitfalls: [
      'Iterating through the remainder of the non-empty list node by node instead of attaching the entire remaining sublist in one step.',
      'Not using a dummy head, which leads to messy branch conditions when picking the first node.'
    ],
    runnable: {
      functionName: 'mergeSortedArrays',
      starterCode: `function mergeSortedArrays(arr1, arr2) {
  const res = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) res.push(arr1[i++]);
    else res.push(arr2[j++]);
  }
  while (i < arr1.length) res.push(arr1[i++]);
  while (j < arr2.length) res.push(arr2[j++]);
  return res;
}`,
      testCases: [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
        { input: [[], [0]], expected: [0] }
      ]
    }
  },
  {
    id: 141,
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    difficulty: 'Easy',
    topic: 'linked-lists',
    topicName: 'Linked Lists & Pointer Manipulation',
    pattern: "Floyd's Tortoise and Hare",
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple'],
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer.
Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
      },
      {
        input: 'head = [1,2], pos = 0',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.'
      },
      {
        input: 'head = [1], pos = -1',
        output: 'false',
        explanation: 'There is no cycle in the linked list.'
      }
    ],
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5',
      'pos is -1 or a valid index in the linked-list.'
    ],
    intuition: `Floyd's Cycle Finding Algorithm (Tortoise and Hare):
Use two pointers starting at \`head\`:
- \`slow\` moves 1 step per tick.
- \`fast\` moves 2 steps per tick.
If there is no cycle, \`fast\` (or \`fast.next\`) reaches null and terminates in O(N).
If there is a cycle, \`fast\` enters the cycle and reduces the distance between itself and \`slow\` by 1 step at every iteration. It is mathematically guaranteed to lap and meet \`slow\`!`,
    algorithmSteps: [
      'Initialize `slow = head` and `fast = head`.',
      'While `fast` is not null and `fast.next` is not null:',
      '  `slow = slow.next`',
      '  `fast = fast.next.next`',
      '  If `slow == fast`: return true.',
      'Return false.'
    ],
    solutions: {
      python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
                
        return False`,
      javascript: `function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
    },
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityAnalysis: 'If no cycle, fast reaches the end in N/2 steps. If cycle exists, fast catches slow within at most C steps (where C is the cycle length <= N). Overall time is O(N). Space is O(1) as only two pointer references are used.',
    commonPitfalls: [
      'Dereferencing `fast.next.next` without first validating that `fast.next` is non-null.',
      'Using a Hash Set to store visited nodes (which works in O(N) time but wastes O(N) extra memory).'
    ]
  },
  {
    id: 146,
    title: 'LRU Cache',
    slug: 'lru-cache',
    difficulty: 'Medium',
    topic: 'linked-lists',
    topicName: 'Linked Lists & Pointer Manipulation',
    pattern: 'Doubly Linked List + Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
- \`int get(int key)\` Return the value of the key if the key exists, otherwise return -1.
- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1);\nlRUCache.put(2, 2);\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // evicts key 2\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // evicts key 1\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    intuition: `To achieve O(1) get and put, combine two data structures:
1. Hash Map: maps \`key -> Node\` for O(1) node lookup.
2. Doubly Linked List with Sentinel Head & Tail: allows removing and inserting any node at the head or tail in O(1) without iterating!
Convention:
- Most Recently Used (MRU) node sits right next to the \`head\` sentinel.
- Least Recently Used (LRU) node sits right next to the \`tail\` sentinel.
When \`get(key)\` is called: look up node, remove it from its current position, insert at head, and return value.
When \`put(key, val)\` is called: update/create node, move to head. If size > capacity, evict node before \`tail\` and delete from map!`,
    algorithmSteps: [
      'Create helper methods `_remove(node)` and `_insert_head(node)`.',
      'get(key): if key not in cache, return -1. Else, remove node, insert at head, return node.val.',
      'put(key, value): if key in cache, remove existing node. Create new node, insert at head, add to cache.',
      'If len(cache) > capacity: evict LRU node `lru = tail.prev`, remove from list and delete `del cache[lru.key]`.'
    ],
    solutions: {
      python: `class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}  # key -> node
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: DLinkedNode):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, node: DLinkedNode):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = DLinkedNode(key, value)
        self.cache[key] = node
        self._add_to_head(node)
        
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      javascript: `class DNode {
    constructor(key = 0, val = 0) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.cap = capacity;
        this.cache = new Map();
        this.head = new DNode();
        this.tail = new DNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _addToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const node = this.cache.get(key);
        this._remove(node);
        this._addToHead(node);
        return node.val;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this._remove(this.cache.get(key));
        }
        const node = new DNode(key, value);
        this.cache.set(key, node);
        this._addToHead(node);
        
        if (this.cache.size > this.cap) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.cache.delete(lru.key);
        }
    }
}`,
      cpp: `#include <unordered_map>
using namespace std;

struct Node {
    int key, val;
    Node* prev;
    Node* next;
    Node(int k = 0, int v = 0) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int cap;
    unordered_map<int, Node*> cache;
    Node* head;
    Node* tail;

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void addToHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (!cache.count(key)) return -1;
        Node* node = cache[key];
        remove(node);
        addToHead(node);
        return node->val;
    }

    void put(int key, int value) {
        if (cache.count(key)) {
            remove(cache[key]);
            delete cache[key];
        }
        Node* node = new Node(key, value);
        cache[key] = node;
        addToHead(node);
        if (cache.size() > cap) {
            Node* lru = tail->prev;
            remove(lru);
            cache.erase(lru->key);
            delete lru;
        }
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
        Node() {}
    }

    private int cap;
    private Map<Integer, Node> cache = new HashMap<>();
    private Node head = new Node(), tail = new Node();

    public LRUCache(int capacity) {
        this.cap = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        remove(node);
        addToHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        Node node = new Node(key, value);
        cache.put(key, node);
        addToHead(node);
        if (cache.size() > cap) {
            Node lru = tail.prev;
            remove(lru);
            cache.remove(lru.key);
        }
    }
}`
    },
    timeComplexity: 'O(1) for both get and put',
    spaceComplexity: 'O(capacity)',
    complexityAnalysis: 'Hash map lookups and doubly-linked list node rewiring both operate in strict O(1) time. The cache stores at most `capacity` nodes and hash entries, taking O(capacity) auxiliary memory.',
    commonPitfalls: [
      'Forgetting to store `key` inside the `DLinkedNode` object: when evicting `tail.prev`, without `node.key` we cannot delete the entry from the hash map in O(1)!',
      'Memory leak in C++: forgetting to call `delete` on evicted and replaced nodes.'
    ]
  }
];
