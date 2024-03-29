/*101. Symmetric Tree
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
*/
//iterative
let isSymmetric = function (root) {
  let queue = [root.left, root.right];
  while (queue.length !== 0) {
    temp1 = queue.shift();
    temp2 = queue.shift();
    if (temp1 === null && temp2 === null) continue;
    if (temp1 === null || temp2 === null) return false;
    if (temp1.val !== temp2.val) return false;
    queue.push(temp1.left);
    queue.push(temp2.right);
    queue.push(temp1.right);
    queue.push(temp2.left);
  }
  return true;
};
//recursive
let isSymmetric = function (root) {
  function helper(node1, node2) {
    if (node1 === null && node2 === null) return true;
    if (node1 === null || node2 === null) return false;
    if (node1.val !== node2.val) return false;
    return helper(node1.left, node2.right) && helper(node1.right, node2.left);
  }
  return helper(root.left, root.right);
};

/*102. Binary Tree Level Order Traversal
Given the root of a binary tree, return the level order traversal of its nodes' values. 
(i.e., from left to right, level by level).
*/
var levelOrder = function (root) {
  if (root === null) return [];
  let queue = [root];
  let result = [];
  let count;
  let arr = [];
  while (queue.length !== 0) {
    count = queue.length;
    while (count > 0) {
      temp = queue.shift();
      arr.push(temp.val);
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
    result.push([...arr]);
    arr = [];
  }
  return result;
};
// Recursive
let levelOrder = function (root) {
  if (root == null) return [];
  const result = [];
  function recBFS(node, level) {
    if (result[level] === undefined) result.push([]);
    result[level].push(node.val);
    if (node.left) recBFS(node.left, level + 1);
    if (node.right) recBFS(node.right, level + 1);
  }
  recBFS(root, 0);
  return result;
};

// 103. Binary Tree ZigZag Level order traversal

var zigzagLevelOrder = function (root) {
  if (!root) return [];
  let queue = [root];
  let even = true;
  let result = [];
  while (queue.length !== 0) {
    count = queue.length;
    arr = [];
    while (count > 0) {
      temp = queue.shift();
      arr.push(temp.val);
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
    if (even) {
      result.push(arr);
      even = false;
    } else {
      reverseArr = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        reverseArr.push(arr[i]);
      }
      result.push(reverseArr);
      even = true;
    }
  }
  return result;
};

// Recursive
let zigzagLevelOrder = function (root) {
  if (root === null) return [];
  const result = [];
  function recursive(node, level) {
    if (result[level] === undefined) result.push([]);
    if (level % 2 === 0) result[level].push(node.val);
    else result[level].unshift(node.val);
    if (node.left) recursive(node.left, level + 1);
    if (node.right) recursive(node.right, level + 1);
  }
  recursive(root, 0);
  return result;
};

/* 104. Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 */
var maxDepth = function (root) {
  if (!root) return 0;
  let result = 0;
  function dfs(node, length) {
    if (node.left === null && node.right === null) {
      result = Math.max(result, length);
      return;
    }
    if (node.left) dfs(node.left, length + 1);
    if (node.right) dfs(node.right, length + 1);
  }
  dfs(root, 0);
  return result + 1;
};

/* 105. Construct Binary Tree from Preorder and Inorder Traversal

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 */

var buildTree = function (preorder, inorder) {
  function dfs(preArray, inArray) {
    let root;
    if (preArray.length) root = new TreeNode(preArray[0]);
    else return null;
    let i;
    for (i = 0; i < inArray.length; i++) {
      if (inArray[i] === preArray[0]) break;
    }
    root.left = dfs(preArray.slice(1, i + 1), inArray.slice(0, i));
    root.right = dfs(preArray.slice(i + 1), inArray.slice(i + 1));
    return root;
  }
  return dfs(preorder, inorder);
};

/* 106. Construct Binary Tree from PostOrder and Inorder Traversal

Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

 */

var buildTree = function (inorder, postorder) {
  function dfs(inArray, postArray) {
    let root;
    if (postArray.length) root = new TreeNode(postArray[postArray.length - 1]);
    else return null;
    let i;
    for (i = 0; i < inArray.length; i++) {
      if (inArray[i] === postArray[postArray.length - 1]) break;
    }
    root.left = dfs(inArray.slice(0, i), postArray.slice(0, i));
    root.right = dfs(
      inArray.slice(i + 1),
      postArray.slice(i, postArray.length - 1)
    );
    return root;
  }
  return dfs(inorder, postorder);
};

/*107. Binary Tree Level Order Traversal II
Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. 
(i.e., from left to right, level by level from leaf to root).
*/
//recursive
var levelOrderBottom = function (root) {
  if (root == null) return [];
  const height = getHeight(root);
  const result = new Array(height);
  function recursive(node, l) {
    if (result[height - l] == undefined) result[height - l] = [];
    result[height - l].push(node.val);
    if (node.left) recursive(node.left, l + 1);
    if (node.right) recursive(node.right, l + 1);
  }
  recursive(root, 1);
  return result;
};

function getHeight(root) {
  let maxHeight = 0;
  function rec(node, height) {
    if (node === null) {
      maxHeight = Math.max(maxHeight, height);
      return;
    }
    rec(node.left, height + 1);
    rec(node.right, height + 1);
  }
  rec(root, 0);
  return maxHeight;
}

// iterative
let levelOrderBottom = function (root) {
  if (root == null) return [];
  let queue = [root];
  while (queue.length !== 0) {
    count = queue.length;
    arr = [];
    while (count > 0) {
      temp = queue.shift();
      arr.push([temp.val]);
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
    result.push(arr);
  }
  return (reversed = []);
  for (let i = result.length - 1; i > 0; i++) {
    reversed.push(result[i]);
  }
  return reversed;
};

/* 108. Convert sorted Array to Binary Search Tree

Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
 */

let sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  return root;
};

/* 109. Convert Sorted List to Binary Search Tree

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
 */
var sortedListToBST = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  function convert(array) {
    if (array.length === 0) return null;
    let mid = Math.floor(array.length / 2);
    let root = new TreeNode(array[mid]);
    root.left = convert(array.slice(0, mid));
    root.right = convert(array.slice(mid + 1));
    return root;
  }
  return convert(arr);
};

/* 110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.
 */
var isBalanced = function (root) {
  if (root === null) return true;
  let balanced = true;
  function dfs(node) {
    if (!balanced) return;
    if (node.left === null && node.right === null) return 0;
    let leftTreeHeight = 0;
    let rightTreeHeight = 0;
    if (node.left) leftTreeHeight = dfs(node.left) + 1;
    if (node.right) rightTreeHeight = dfs(node.right) + 1;
    if (Math.abs(leftTreeHeight - rightTreeHeight) > 1) balanced = false;
    return Math.max(leftTreeHeight, rightTreeHeight);
  }
  dfs(root);
  return balanced;
};

/*111. Minimum Depth of Binary Tree
Given a binary tree, find its minimum depth.
The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
*/ //recursive
var minDepth = function (root) {
  if (root === null) return 0;
  function recursive(node, height) {
    if (node == null) return +Infinity;
    if (node.left == null && node.right == null) return height + 1;
    else
      return Math.min(
        recursive(node.left, height + 1),
        recursive(node.right, height + 1)
      );
  }
  return recursive(root, 0);
};
// Iterative
var minDepth = function (root) {
  let queue = [root];
  let level = 1;
  while (queue.length !== 0) {
    count = queue.length;
    while (count > 0) {
      temp = queue.shift();
      if (temp.left == null && temp.right == null) return level;
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
    level++;
  }
};

/* 112. Path Sum

Given the root of a binary Tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum. A leaf is a node with no children

 */
let hasPathSum = function (root, targetSum) {
  function dfs(node, sum) {
    if (!node) return false;
    if (!node.left && !node.right) return sum + node.val === targetSum;
    return dfs(node.left, sum + node.val) || dfs(node.right, sum + node.val);
  }
  return dfs(root, 0);
};

/* 113. Path Sum II

Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.
A leaf is a node with no children.
 */

var pathSum = function (root, targetSum) {
  if (!root) return [];
  let result = [];
  function dfs(node, sum, array) {
    if (!node.left && !node.right) {
      if (sum + node.val === targetSum) result.push([...array, node.val]);
      return;
    }
    if (node.left) dfs(node.left, sum + node.val, [...array, node.val]);
    if (node.right) dfs(node.right, sum + node.val, [...array, node.val]);
  }
  dfs(root, 0, []);
  return result;
};

/* 114. Flatten Binary Tree to Linked list

Given the root of a binary tree, flatten the tree into a "linked list":
The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.
 */

// My method, a little inefficient
var flatten = function (root) {
  if (!root) return null;
  function dfs(node) {
    if (!node.left && !node.right) return node;
    if (node.left) {
      let temp = node.right;
      node.right = node.left;
      node.left = null;
      dfs(node.right).right = temp;
    }
    return dfs(node.right);
  }
  dfs(root);
};

// efficient recursive solution,
// note this can also be solved in a non-recursive way using O(1) extra space
let flatten = function (root) {
  let head = null;
  function convert(node) {
    if (node.right) convert(node.right);
    if (node.left) convert(node.left);
    node.left = null;
    node.right = head;
    head = node;
  }
  if (root) convert(root);
};

/* 115. Distinct Subsequences
Given two strings s and t, return the number of distinct subsequences of s which equals t.
A string's subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the remaining characters' relative positions. (i.e., "ACE" is a subsequence of "ABCDE" while "AEC" is not).
 */
var numDistinct = function (s, t) {
  let indices = {};
  for (let i = 0; i < t.length; i++) {
    if (!(t[i] in indices)) indices[t[i]] = [];
    indices[t[i]].push(i);
  }
  let dp = Array(t.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] in indices) {
      for (let j = indices[s[i]].length - 1; j >= 0; j--) {
        dp[indices[s[i]][j] + 1] += dp[indices[s[i]][j]];
      }
    }
  }
  return dp[t.length];
};

/*116. Populating Next Right Pointers in Each Node
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children.
Populate each next pointer to point to its next right node. If there is no next right node, 
the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.
*/
//iterative
var connect = function (root) {
  let queue = [root];
  while (queue.length !== 0) {
    count = queue.length;
    while (count > 0) {
      temp = queue.shift();
      if (count > 1) temp.next = queue[0];
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
  }
  return root;
};

/* 117. Populating Next right pointers in each Node II

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.
 */

var connect = function (root) {
  if (!root) return null;
  let queue = [root];
  while (queue.length) {
    let count = queue.length;
    while (count) {
      let node = queue.shift();
      if (count > 1) node.next = queue[0];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      count--;
    }
  }
  return root;
};

/*120. Triangle
Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
For example, given the following triangle
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
Note:
Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle
*/

//Dynamic Programming bottom up
let count = 0;
let minimumTotal = function (triangle) {
  let rows = triangle.length;
  // there are i elements for any i-th row (i starts from 1)
  let dp = new Array(rows + 1).fill(0);
  for (let i = 1; i <= rows; i++) {
    dp[i] = new Array(i + 2).fill(+Infinity);
  }
  dp[1][1] = triangle[0][0];

  for (let i = 2; i <= rows; i++) {
    for (let j = 1; j <= i; j++) {
      count++;
      dp[i][j] =
        triangle[i - 1][j - 1] + Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
    }
  }

  let min = dp[rows][0];
  for (let i = 0; i <= rows; i++) {
    count++;
    if (min > dp[rows][i]) {
      min = dp[rows][i];
    }
  }
  return min;
};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log("the function ran for this many times: ", count);

// Really elegant solution from community
let count = 0;
let minimumTotal = function (triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i + 1; j++) {
      count++;
      triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
    }
  }
  return triangle[0][0];
};
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log("the function ran for this many times: ", count);

// yet another community solution (RECURSION)
let count = 0;
var minimumTotal = function (triangle) {
  var hash = {};
  return getMin(0, 0);

  function getMin(h, idx) {
    count++;
    if (h === triangle.length) return 0;
    if (!hash[h + ":" + idx]) {
      hash[h + ":" + idx] =
        triangle[h][idx] + Math.min(getMin(h + 1, idx), getMin(h + 1, idx + 1));
    }
    return hash[h + ":" + idx];
  }
};
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log("the function ran for this many times: ", count);

/* 123. Best time to buy and sell stocks III
You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete at most two transactions.
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
 */

let maxProfit = function (prices) {
  let forward = Array(prices.length).fill(0);
  let min = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > min) {
      maxProfit = Math.max(maxProfit, prices[i] - min);
      forward[i] = maxProfit;
    } else {
      forward[i] = maxProfit;
      min = prices[i];
    }
  }
  let backward = Array(prices.length).fill(0);
  let max = prices[prices.length - 1];
  maxProfit = 0;
  for (let i = prices.length - 2; i >= 0; i--) {
    if (prices[i] < max) {
      maxProfit = Math.max(maxProfit, max - prices[i]);
      backward[i] = maxProfit;
    } else {
      backward[i] = maxProfit;
      max = prices[i];
    }
  }
  let result = 0;
  for (let i = 1; i < prices.length - 1; i++) {
    result = Math.max(
      result,
      forward[i] + backward[i + 1],
      forward[i - 1] + backward[i]
    );
  }
  result = Math.max(forward[prices.length - 1], result);
  return result;
};

/* 124. Binary Tree Maximum Path Sum

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
The path sum of a path is the sum of the node's values in the path.
Given the root of a binary tree, return the maximum path sum of any path.
 */
var maxPathSum = function (root) {
  let max = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    let leftSum = Math.max(dfs(node.left), 0);
    let rightSum = Math.max(dfs(node.right), 0);
    max = Math.max(max, node.val + leftSum + rightSum);
    return Math.max(node.val + leftSum, node.val + rightSum);
  }
  dfs(root);
  return max;
};

/* 128. Longest Consecutive Sequence

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.
 */

// O(NLogN)
var longestConsecutive = function (nums) {
  if (nums.length == 0) return 0;
  nums.sort((a, b) => a - b);
  let max = 0;
  let curr = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) continue;
    if (nums[i] == 1 + nums[i - 1]) curr++;
    else {
      max = Math.max(max, curr);
      curr = 1;
    }
  }
  max = Math.max(max, curr);
  return max;
};

// O(N)
let longestConsecutive = function (nums) {
  let max = 0;
  let hash = {};
  for (let num of nums) {
    hash[num] = 1;
  }
  for (let i = 0; i < nums.length; i++) {
    if (!(nums[i] - 1 in hash)) {
      let curr = nums[i];
      let streak = 1;
      while (curr + 1 in hash) {
        curr++;
        streak++;
      }
      max = Math.max(max, streak);
    }
  }
  return max;
};

/* 129. Sum Root to Leaf Numbers

You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number.
For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123. Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.
A leaf node is a node with no children.
 */
var sumNumbers = function (root) {
  let total = 0;
  function dfs(node, sum) {
    if (!node.left && !node.right) {
      sum = sum * 10 + node.val;
      total += sum;
      return;
    }
    if (node.left) dfs(node.left, sum * 10 + node.val);
    if (node.right) dfs(node.right, sum * 10 + node.val);
  }
  dfs(root, 0);
  return total;
};

/*131. Palindrome Partitioning
Given a string s, partition s such that every substring of the partition is a palindrome. 
Return all possible palindrome partitioning of s.
A palindrome string is a string that reads the same backward as forward.
*/

// simple recursive
let partition = function (s) {
  let result = [];
  function recursive(start, arr) {
    if (start === s.length) {
      result.push([...arr]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      let temp = s.slice(start, end);
      if (isPalindrome(temp)) recursive(end, [...arr, temp]);
    }
  }
  function isPalindrome(string) {
    let left = 0;
    let right = string.length - 1;
    while (left <= right) {
      if (string[left] !== string[right]) return false;
      left++;
      right--;
    }
    return true;
  }
  recursive(0, []);
  return result;
};

// using dynamic programming to store info about a substring if it is palindromic or not
let partition = function (s) {
  let result = [];
  let dp = new Array(s.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = [];
  }
  function recursive(start, arr) {
    if (start === s.length) {
      result.push([...arr]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      if (dp[start][end] !== undefined) {
        if (dp[start][end]) recursive(end, [...arr, s.slice(start, end)]);
      } else {
        dp[start][end] = isPalindrome(s.slice(start, end));
        if (dp[start][end]) recursive(end, [...arr, s.slice(start, end)]);
      }
    }
  }
  function isPalindrome(string) {
    let left = 0;
    let right = string.length - 1;
    while (left <= right) {
      if (string[left] !== string[right]) return false;
      left++;
      right--;
    }
    return true;
  }
  recursive(0, []);
  return result;
};

/* 133. Clone Graph

Given a reference of a node in a connected undirected graph.
Return a deep copy (clone) of the graph.
Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 */

var cloneGraph = function (node) {
  if (!node) return null;
  let copyNode = new Node(1);
  let hash = { 1: copyNode };
  let queue = [[node, copyNode]];
  while (queue.length) {
    let val = queue.shift();
    let tempNode = val[0];
    let tempCopyNode = val[1];
    for (let i = 0; i < tempNode.neighbors.length; i++) {
      let neighbor = tempNode.neighbors[i];
      if (!(neighbor.val in hash)) {
        hash[neighbor.val] = new Node(neighbor.val);
        queue.push([neighbor, hash[neighbor.val]]);
      }
      tempCopyNode.neighbors.push(hash[neighbor.val]);
    }
  }
  return copyNode;
};

//134. Gas Station

/* There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].
You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.
Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique
 */
let canCompleteCircuit = function (gas, cost) {
  let totalDelta = 0;
  let gasTotal = 0;
  let costTotal = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    gasTotal += gas[i];
    costTotal += cost[i];
    totalDelta += gas[i] - cost[i];
    if (gasTotal < costTotal) {
      gasTotal = 0;
      costTotal = 0;
      start = i + 1;
    }
  }
  if (totalDelta < 0) return -1;
  return start;
};

/* 136. Single Number

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

 */
var singleNumber = function (nums) {
  let x1 = nums[0];
  for (let i = 1; i < nums.length; i++) x1 = x1 ^ nums[i];
  return x1;
};
// Bitwise XOR rocks

/* 138. Copy List with Random pointer

A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. */

// using simple Object has hashmap can be cumbersome because JS doesnt allow object as keys of another object
var copyRandomList = function (head) {
  if (head === null) return null;
  let head1 = head;
  let head2 = new Node(head1.val);
  let copyHead2 = head2;
  let hash = {};
  hash[String(head1.val) + 0] = head2;
  let i = 1;
  while (head1.next) {
    head1 = head1.next;
    head2.next = new Node(head1.val);
    head2 = head2.next;
    hash[String(head1.val) + i] = head2;
    i++;
  }
  head2.next = null;
  head2 = copyHead2;
  while (head) {
    let random = head.random;
    if (random === null) head2.random = null;
    else {
      let node = random;
      let count = 0;
      while (node) {
        node = node.next;
        count++;
      }
      head2.random = hash[String(random.val) + (i - count)];
    }
    head = head.next;
    head2 = head2.next;
  }
  return copyHead2;
};

// However with introduction of Maps in ES6, we can have a really simple solution
let copyRandomList = function (head) {
  if (!head) return null;
  const cloned = new Map();
  let node = head;
  while (node) {
    cloned.set(node, new Node(node.val));
    node = node.next;
  }
  node = head;
  while (node) {
    cloned.get(node).next = cloned.get(node.next) || null;
    cloned.get(node).random = cloned.get(node.random) || null;
    node = node.next;
  }
  return cloned.get(head);
};

/*139. Word Break
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a 
space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.
*/

let wordBreak = function (s, wordDict) {
  let memo = [];
  function backtrack(start) {
    if (start === s.length) return true;
    if (memo[start] !== undefined) return memo[start];
    let value = false;
    for (let word of wordDict) {
      if (s[start] === word[0]) {
        if (s.substr(start, word.length) === word)
          value = value || backtrack(start + word.length);
      }
    }
    memo[start] = value;
    return memo[start];
  }
  return backtrack(0);
};
// I am so happy I solved it, 6 months ago I had attempted this. Now seeing the difference
// in my approach, I feel good.

/*140. Word Break II
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. 
Return all such possible sentences in any order.
Note that the same word in the dictionary may be reused multiple times in the segmentation.
*/

let wordBreak = function (s, wordDict) {
  let result = [];
  function recursive(start, str) {
    if (start === s.length) {
      result.push(str.slice(0, str.length - 1));
      return;
    }
    for (let word of wordDict) {
      if (s[start] === word[0]) {
        if (s.substr(start, word.length) === word)
          recursive(start + word.length, str.slice(0) + word + " ");
      }
    }
  }
  recursive(0, "");
  return result;
};
// feel so good man! Hard problem, dusted

/*141. Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.
*/
var hasCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};

/* 142. Linked List Cycle II

Given a linked list, return the node where the cycle begins. If there is no cycle, return null.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Notice that you should not modify the linked list. */

let detectCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      let length = 0;
      while (true) {
        fast = fast.next.next;
        slow = slow.next;
        length++;
        if (fast == slow) break;
      }
      let p1 = head;
      let p2 = head;
      while (length > 0) {
        p1 = p1.next;
        length--;
      }
      while (p1 !== p2) {
        p1 = p1.next;
        p2 = p2.next;
      }
      return p1;
    }
  }
  return null;
};

/* 143. Reorder List

You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 */

let reorderList = function (head) {
  let stack = [];
  let start = head;
  while (start) {
    stack.push(start);
    start = start.next;
  }
  let left = 1;
  let right = stack.length - 1;
  while (left <= right) {
    head.next = stack[right--];
    head = head.next;
    if (left < right) {
      head.next = stack[left++];
      head = head.next;
    }
  }
  head.next = null;
};

/* 144. Binary Tree Preorder Traversal

Given the root of a binary Tree, return the preorder traversal of its nodes' values
 */
let preorderTraversal = function (root) {
  let result = [];
  function dfs(node) {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result;
};

/* 145. Binary Tree Postorder Traversal

Given the root of a binary Tree, return the postorder traversal of its nodes' values
 */
var postorderTraversal = function (root) {
  let result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    result.push(node.val);
  }
  dfs(root);
  return result;
};

/* 147. Insertion Sort List

Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.
 */
var insertionSortList = function (head) {
  let curr = head.next;
  let parent = head;
  while (curr) {
    let temp = curr.next;
    let node = head;
    let prev = null;
    while (curr.val > node.val && node !== curr) {
      prev = node;
      node = node.next;
    }
    if (node !== curr) {
      if (!prev) {
        curr.next = node;
        head = curr;
      } else {
        prev.next = curr;
        curr.next = node;
      }
      parent.next = temp;
    } else parent = curr;
    curr = temp;
  }
  return head;
};

/*150 Evaluate Reverse Polish Notation
 */
var evalRPN = function (tokens) {
  let stack = [];
  let math = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => {
      if (x < 0 || y < 0) return Math.ceil(x / y);
      else return Math.floor(x / y);
    },
  };
  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(tokens[i])) {
      stack.push(parseInt(tokens[i]));
    } else {
      let t1 = stack.pop();
      let t2 = stack.pop();
      stack.push(math[tokens[i]](t2, t1));
    }
  }

  return stack.pop();
};

/*152. Maximum Product SubArray
Given an integer array nums, find a contiguous non-empty subarray within the 
array that has the largest product, and return the product.
It is guaranteed that the answer will fit in a 32-bit integer.
A subarray is a contiguous subsequence of the array.
*/

let maxProduct = function (nums) {
  let prevMax = nums[0];
  let prevMin = nums[0];
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curMax = Math.max(nums[i] * prevMax, nums[i], nums[i] * prevMin);
    curMin = Math.min(nums[i] * prevMin, nums[i], nums[i] * prevMax);
    prevMax = curMax;
    prevMin = curMin;
    result = Math.max(curMax, result);
  }
  return result;
};
// what an incredible solution

/*155. Min Stack
	Design a stack that supports push, pop, top and retreiving the minimum element in constant time
*/

var MinStack = function () {
  this.elements = [];
};

MinStack.prototype.push = function (x) {
  this.elements.push({
    value: x,
    min: this.elements.length === 0 ? x : Math.min(x, this.getMin()),
  });
};
MinStack.prototype.pop = function () {
  this.elements.pop();
};
MinStack.prototype.top = function () {
  return this.elements[this.elements.length - 1].value;
};
MinStack.prototype.getMin = function () {
  return this.elements[this.elements.length - 1].min;
};

// 160. Intersection of Two Linked Lists
//Write a program to find the node at which the intersection of 2 singly linked lists begins.
// I can do it in brute force, for every node in one LL, check if it is also pointed by another node from the other LL
//So I checked and we cannot have object key's as objects. Therefore there is no other way but to use hash collision resolution

function getIntersectionNode(headA, headB) {
  if (headA === null || headB === null) return null;
  let hash = {};
  while (headA) {
    if (!(headA.val in hash)) hash[headA.val] = [];
    hash[headA.val].push(headA);
    headA = headA.next;
  }
  while (headB) {
    if (headB.val in hash) {
      for (value of hash[headB.val]) {
        if (value == headB) return headB;
      }
    }
    headB = headB.next;
  }
  return null;
}

// 2 pointers approach (really neat solution)

function getIntersectionNode(head, headB) {
  if (headA === null || headB === null) return null;
  let currA = headA;
  let lastA;
  let lastB;
  let currB = headB;
  while (currA) {
    if (currA.next === null) {
      lastA = currA;
      // currA.next = headB;
      // currA = headB;
      break;
    }
    currA = currA.next;
  }
  while (currB) {
    if (currB.next === null) {
      lastB = currB;
      // currB = headA;
      break;
    }
    currB = currB.next;
  }
  if (lastA !== lastB) return null;
  currA = headA;
  currB = headB;
  while (true) {
    if (currA === currB) return currA;
    if (currA.next !== null) currA = currA.next;
    else currA = headB;
    if (currB.next !== null) currB = currB.next;
    else currB = headA;
  }
  return null;
}

// 2 pointers shorter code
function getIntersectionNode(headA, headB) {
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}
// Wow I am so amazed, the above code does exactly the same thing as the one above it. But this is so so so much shorter

/* 162. Find Peak Element

A peak element is an element that is strictly greater than its neighbors.
Given an integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
You may imagine that nums[-1] = nums[n] = -∞.
You must write an algorithm that runs in O(log n) time.
 */

var findPeakElement = function (nums) {
  if (nums.length == 1) return 0;
  if (nums[0] > nums[1]) return 0;
  if (nums[nums.length - 1] > nums[nums.length - 2]) return nums.length - 1;
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) return i;
  }
};

/* 168. Excel Sheet Column Title

Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
 */
var convertToTitle = function (columnNumber) {
  let result = "";
  let remainder;
  while (columnNumber >= 1) {
    let remainder = columnNumber % 26;
    result =
      (remainder === 0 ? "Z" : String.fromCharCode(remainder + 64)) + result;
    columnNumber = Math.ceil(columnNumber / 26 - 1);
  }
  return result;
};

/* 171. Excel Sheet Column Number

Given a string columnTitle that represents the column title as appear in an Excel sheet, return its corresponding column number.
 */
var titleToNumber = function (columnTitle) {
  let sum = 0;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    sum +=
      Math.pow(26, columnTitle.length - 1 - i) *
      (columnTitle.charCodeAt(i) - 64);
  }
  return sum;
};

/* 172. Factorial Trailing Zeroes

Given an integer n, return the number of trailing zeroes in n!.
Follow up: Could you write a solution that works in logarithmic time complexity?
 */

let trailingZeroes = function (n) {
  let num = 5;
  let pow5 = 0;
  while (num <= n) {
    pow5 += Math.floor(n / num);
    num = num * 5;
  }
  return pow5;
};

//190. Reverse Bits

// Given a postive unsigned integer, reverse the bits of its binary representation and return the new Integer value

var reverseBits = function (n) {
  let result = "";
  let num = 32;
  while (num) {
    result += String(n & 1);
    n = n >> 1;
    num--;
  }
  return parseInt(result, 2);
};

/* 191. Number of 1 Bits

Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
 */

// Brian Kernighan's algorithm
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n = n & (n - 1);
    count++;
  }
  return count;
};

/* 199. Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
 */
var rightSideView = function (root) {
  if (!root) return [];
  let result = [];
  let queue = [root];
  while (queue.length) {
    let count = queue.length;
    while (count) {
      let node = queue.shift();
      if (count === 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      count--;
    }
  }
  return result;
};

//200. Number of Islands
/*Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all 
four edges of the grid are all surrounded by water.*/

let numIslands = function (grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        recursive(i, j);
        count++;
      }
    }
  }
  function recursive(row, col) {
    if (grid[row][col] === "1") grid[row][col] = "0";
    else return;
    if (row < grid.length - 1) recursive(row + 1, col);
    if (col < grid[0].length - 1) recursive(row, col + 1);
    if (row > 0) recursive(row - 1, col);
    if (col > 0) recursive(row, col - 1);
  }
  return count;
};
// this is much faster
