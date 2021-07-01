function checkInclusion(s1, s2) {
  let hash = {};
  let matched = 0;
  for (let i = 0; i < s1.length; i++) {
    if (!hash[s1[i]]) hash[s1[i]] = 0;
    hash[s1[i]]++;
  }
  let windowStart = 0;
  for (i = 0; i < s1.length; i++) {
    if (s2[i] in hash) {
      hash[s2[i]]--;
      if (hash[s2[i]] === 0) matched++;
    }
  }
  for (let windowEnd = s1.length; windowEnd < s2.length; windowEnd++) {
    if (matched === Object.keys(hash).length) return true;
    if (s2[windowEnd] in hash) {
      hash[s2[windowEnd]]--;
      if (hash[s2[windowEnd]] === 0) matched++;
    }
    if (s2[windowStart] in hash) {
      hash[s2[windowStart]]++;
      if (hash[s2[windowStart]] === 1) matched--;
    }
    windowStart++;
  }
  if (matched === Object.keys(hash).length) return true;
  else return false;
}

function findAnagrams(s, p) {
  let hash = {};
  let result = [];
  let matched = 0;
  for (let i = 0; i < p.length; i++) {
    if (!hash[p[i]]) hash[p[i]] = 0;
    hash[p[i]]++;
  }
  let left = 0;
  for (i = 0; i < p.length; i++) {
    if (s[i] in hash) {
      hash[s[i]]--;
      if (hash[s[i]] === 0) matched++;
    }
  }
  if (matched === Object.keys(hash).length) result.push(left);
  for (let right = p.length; right < s.length; right++) {
    if (s[right] in hash) {
      hash[s[right]]--;
      if (hash[s[right]] === 0) matched++;
    }
    if (s[left] in hash) {
      hash[s[left]]++;
      if (hash[s[left]] === 1) matched--;
    }
    left++;
    if (matched === Object.keys(hash).length) result.push(left);
  }
  return result;
}

/* 501. Find Mode in a Binary Search Tree

Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.
If the tree has more than one mode, return them in any order.
Left subtree has nodes less than or equal to parent node
Right subtree has nodes greater than or equal to parent node
 */

// O(N) space and O(N) time
var findMode = function (root) {
  let hash = {};
  let result = [];
  function dfs(node) {
    if (!(node.val in hash)) hash[node.val] = 0;
    hash[node.val]++;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  }
  dfs(root);
  let max = 0;
  for (let key in hash) {
    max = Math.max(max, hash[key]);
  }
  for (let key in hash) {
    if (hash[key] === max) result.push(key);
  }
  return result;
};

// O(1) space and O(N) time
let findMode = function (root) {
  let result = [];
  let previousValue = -Infinity;
  let currentCount = 0;
  let maxCount = 0;
  function inorder(node) {
    if (node.left) inorder(node.left);
    if (node.val === previousValue) currentCount++;
    else {
      currentCount = 1;
      previousValue = node.val;
    }
    if (currentCount === maxCount) result.push(node.val);
    else if (currentCount > maxCount) {
      maxCount = currentCount;
      result = [node.val];
    }
    if (node.right) inorder(node.right);
  }
  inorder(root);
  return result;
};

/*504. 01 Matrix

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
*/
let updateMatrix = function (mat) {
  let dp = Array(mat.length)
    .fill(null)
    .map(() => Array(mat[0].length).fill(Infinity));
  let queue = [];
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        dp[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  while (queue.length > 0) {
    let [row, col] = queue.shift();
    if (row > 0 && dp[row - 1][col] > 1 + dp[row][col]) {
      dp[row - 1][col] = 1 + dp[row][col];
      queue.push([row - 1, col]);
    }
    if (row < mat.length - 1 && dp[row + 1][col] > 1 + dp[row][col]) {
      dp[row + 1][col] = 1 + dp[row][col];
      queue.push([row + 1, col]);
    }
    if (col > 0 && dp[row][col - 1] > 1 + dp[row][col]) {
      dp[row][col - 1] = 1 + dp[row][col];
      queue.push([row, col - 1]);
    }
    if (col < mat[0].length - 1 && dp[row][col + 1] > 1 + dp[row][col]) {
      dp[row][col + 1] = 1 + dp[row][col];
      queue.push([row, col + 1]);
    }
  }
  return dp;
};
// BFS approach

// 526. Beautiful Arrangement
/*Suppose you have n integers labeled 1 through n. A permutation of those n integers perm (1-indexed) is considered a beautiful arrangement if for every i (1 <= i <= n), either of the following is true:
perm[i] is divisible by i.
i is divisible by perm[i].
Given an integer n, return the number of the beautiful arrangements that you can construct.
*/
let countArrangement = function (n) {
  let count = 0;
  let visited = Array(n + 1).fill(true);
  function recursive(level) {
    if (level === n + 1) {
      count++;
      return;
    }
    for (let i = 1; i <= n; i++) {
      if (visited[i] === true && (i % level === 0 || level % i === 0)) {
        visited[i] = false;
        recursive(level + 1);
        visited[i] = true;
      }
    }
  }
  recursive(1);
  return count;
};

/* 530. Minimum Absolute Difference in BST

Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.
 */
var getMinimumDifference = function (root) {
  let min = +Infinity;
  let previous = -Infinity;
  function inorder(node) {
    if (node.left) inorder(node.left);
    let currentDiff = node.val - previous;
    min = Math.min(currentDiff, min);
    previous = node.val;
    if (node.right) inorder(node.right);
  }
  inorder(root);
  return min;
};

/* 538. Convert BST to Greater Tree

Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

 */
let convertBST = function (root) {
  if (!root) return null;
  let sum = 0;
  function postOrder(node) {
    if (node.right) postOrder(node.right);
    sum += node.val;
    node.val = sum;
    if (node.left) postOrder(node.left);
  }
  postOrder(root);
  return root;
};

/* 543. Diameter of a Binary Tree

Given the root of a binary tree, return the length of the diameter of the tree.
The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
The length of a path between two nodes is represented by the number of edges between them.
 */
var diameterOfBinaryTree = function (root) {
  let diameter = 0;
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    diameter = Math.max(left + right + 1, diameter);
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return diameter - 1;
};
