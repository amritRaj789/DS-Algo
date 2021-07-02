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
