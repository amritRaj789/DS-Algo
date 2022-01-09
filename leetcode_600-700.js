/* 617. Merge Two Binary Trees

You are given two binary trees root1 and root2.
Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.
Return the merged tree. */

let mergeTrees = function (root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;
  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
};

/* 637. Average of Levels in Binary Tree

Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 
 */
var averageOfLevels = function (root) {
  let queue = [root];
  let result = [];
  while (queue.length) {
    let count = queue.length;
    let sum = 0;
    for (let i = 1; i <= count; i++) {
      node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(sum / count);
  }
  return result;
};

//646. Maximum Length of Pair Chain

/*You are given n pairs of numbers. In every pair, the first number is always smaller than the second number.
Now, we define a pair (c, d) can follow another pair (a, b) if and only if b < c. Chain of pairs can be formed in this fashion.
Given a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. You can select pairs in any order.
*/

// dynamic programming sol O(N^2)
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  let maxLength = 1;
  let dp = Array(pairs.length);
  dp[0] = 1;
  for (let i = 1; i < pairs.length; i++) {
    let max = 1;
    for (let j = 0; j < i; j++) {
      if (pairs[j][1] < pairs[i][0]) {
        max = Math.max(max, dp[j] + 1);
      }
    }
    dp[i] = max;
    maxLength = Math.max(maxLength, max);
  }
  return maxLength;
};

// Greedy Solution , O(NlogN)
let findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[1] - b[1]);
  let maxLength = 0;
  let maxTillNow = -Infinity;
  for (let pair of pairs) {
    if (maxTillNow < pair[0]) {
      maxLength++;
      maxTillNow = pair[1];
    }
  }
  return maxLength;
};

/* 653. Two Sum IV - Input in a BST

Given the root of a Binary Search Tree and a target number k, return true if there exist two elements in the BST such that their sum is equal to the given target.
 */

// Using 2 pointers This is pretty fast
var findTarget = function (root, k) {
  if (!root.left && !root.right) return false;
  let array = [];
  function inorder(node) {
    if (node.left) inorder(node.left);
    array.push(node.val);
    if (node.right) inorder(node.right);
  }
  inorder(root);
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    sum = array[left] + array[right];
    if (sum > k) right--;
    else if (sum < k) left++;
    else return true;
  }
  return false;
};

// Using Hash map/ Hash set
let findTarget = function (root, k) {
  if (!root.left && !root.right) return false;
  let hash = {};
  let found = false;
  function inorder(node) {
    if (found) return;
    if (node.left) inorder(node.left);
    if (k - node.val in hash) {
      found = true;
      return;
    } else hash[node.val] = true;
    if (node.right) inorder(node.right);
  }
  inorder(root);
  return found;
};

/* 657. Robot Return to Origin

There is a robot starting at the position (0, 0), the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at (0, 0) after it completes its moves.
 */
var judgeCircle = function (moves) {
  let vertical = 0;
  let horizontal = 0;
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] == "U") vertical++;
    else if (moves[i] == "D") vertical--;
    else if (moves[i] == "L") horizontal++;
    else horizontal--;
  }
  return vertical == 0 && horizontal == 0;
};

/* 671. Second Minimum Node in a Binary tree

Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. More formally, the property root.val = min(root.left.val, root.right.val) always holds.
Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.
If no such second minimum value exists, output -1 instead. */

let findSecondMinimumValue = function (root) {
  let secondMin = +Infinity;
  let min = root.val;
  function dfs(node) {
    if (node.val < secondMin && node.val !== min) secondMin = node.val;
    if (node.left && node.left.val < secondMin) dfs(node.left);
    if (node.right && node.right.val < secondMin) dfs(node.right);
  }
  dfs(root);
  return secondMin === Infinity ? -1 : secondMin;
};

/* 682. Baseball Game

You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.
 */
var calPoints = function (ops) {
  let stack = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] == "+") {
      num1 = stack[stack.length - 1];
      num2 = stack[stack.length - 2];
      stack.push(num1 + num2);
    } else if (ops[i] == "D") stack.push(2 * stack[stack.length - 1]);
    else if (ops[i] == "C") stack.pop();
    else stack.push(Number(ops[i]));
  }
  return stack.reduce((a, b) => a + b);
};

/* 690. Employee Importance

You have a data structure of employee information, including the employee's unique ID, importance value, and direct subordinates' IDs.
Given an integer id that represents an employee's ID, return the total importance value of this employee and all their direct and indirect subordinates.
 */

var GetImportance = function (employees, id) {
  let hash = {};
  let queue;
  let total = 0;
  for (let i = 0; i < employees.length; i++) {
    hash[employees[i].id] = i;
    if (employees[i].id == id) queue = [id];
  }

  while (queue.length) {
    temp = queue.shift();
    index = hash[temp];
    total += employees[index].importance;
    if (employees[index].subordinates.length !== 0)
      queue.push(...employees[index].subordinates);
  }
  return total;
};

/* 693. Binary Number with Alternating Bits

Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.
 */

var hasAlternatingBits = function (n) {
  let prev = n & 1;
  n = n >> 1;
  while (n > 0) {
    if ((n & 1) == prev) return false;
    prev = n & 1;
    n = n >> 1;
  }
  return true;
};

/* 695. Max Area of Island

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
The area of an island is the number of cells with a value 1 in the island.
Return the maximum area of an island in grid. If there is no island, return 0.
 */

var maxAreaOfIsland = function (grid) {
  let max = 0;
  let row = grid.length;
  let col = grid[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] == 1) max = Math.max(max, bfs(i, j));
    }
  }
  function bfs(sr, sc) {
    let queue = [[sr, sc]];
    let area = 1;
    grid[sr][sc] = 0;
    while (queue.length) {
      let [r, c] = queue.shift();
      // top
      if (r != 0 && grid[r - 1][c] != 0) {
        area++;
        grid[r - 1][c] = 0;
        queue.push([r - 1, c]);
      }
      // bottom
      if (r != row - 1 && grid[r + 1][c] != 0) {
        area++;
        grid[r + 1][c] = 0;
        queue.push([r + 1, c]);
      }
      // left
      if (c != 0 && grid[r][c - 1] != 0) {
        area++;
        grid[r][c - 1] = 0;
        queue.push([r, c - 1]);
      }
      // right
      if (c != col - 1 && grid[r][c + 1] != 0) {
        area++;
        grid[r][c + 1] = 0;
        queue.push([r, c + 1]);
      }
    }
    return area;
  }
  return max;
};

/* 700. Search in a BST

You are given the root of a binary search tree (BST) and an integer val.
Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
 */

let searchBST = function (root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  else if (root.val < val) return searchBST(root.right, val);
  else return searchBST(root.left, val);
};
