/* 1305. All Elements in Two Binary Search Trees

Given two binary search trees root1 and root2, return a list containing all the integers from both trees sorted in ascending order.
 */
var getAllElements = function (root1, root2) {
  let arr1 = [];
  let arr2 = [];
  function inOrder(node) {
    if (node.left) inOrder(node.left);
    arr1.push(node.val);
    if (node.right) inOrder(node.right);
  }
  if (root1) inOrder(root1);
  function inOrder2(node) {
    if (node.left) inOrder2(node.left);
    arr2.push(node.val);
    if (node.right) inOrder2(node.right);
  }
  if (root2) inOrder2(root2);
  let result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);
  return result;
};

/* 1351. Count Negative Numbers in a Sorted Matrix

Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid. */

var countNegatives = function (grid) {
  let total = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] < 0) {
        total += grid[0].length - j;
        break;
      }
    }
  }
  return total;
};

/* 1338. Reduce Array Size to the Half

You are given an integer array arr. You can choose a set of integers and remove all the occurrences of these integers in the array.
Return the minimum size of the set so that at least half of the integers of the array are removed. */

var minSetSize = function (arr) {
  let hash = {};
  let required = arr.length / 2;
  for (let num of arr) {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  }
  let stack = [];
  for (let key in hash) {
    stack.push(hash[key]);
  }
  stack.sort((a, b) => b - a);
  let count = 1;
  let total = 0;
  for (let i = 0; i < stack.length; i++) {
    total += stack[i];
    if (total >= required) return count;
    count++;
  }
};

/* 1373. Maximum Sum BST in Binary Tree
Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).
Assume a BST is defined as follows:
The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 */
var maxSumBST = function (root) {
  let result = -Infinity;
  function dfs(node) {
    if (!node) return [+Infinity, -Infinity, 0, true];
    let [leftMin, leftMax, leftSum, leftIsBST] = dfs(node.left);
    let [rightMin, rightMax, rightSum, rightIsSBST] = dfs(node.right);
    if (leftIsBST && rightIsSBST && leftMax < node.val && rightMin > node.val) {
      result = Math.max(result, leftSum + rightSum + node.val);
      return [
        leftMin == +Infinity ? node.val : leftMin,
        rightMax == -Infinity ? node.val : rightMax,
        leftSum + node.val + rightSum,
        true,
      ];
    } else return [leftMin, rightMax, leftSum + node.val + rightSum, false];
  }
  dfs(root);
  return result <= 0 ? 0 : result;
};

/* 1376. Time Needed to Inform All Employees

A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.
Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.
The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.
The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).
Return the number of minutes needed to inform all the employees about the urgent news.
 */

var numOfMinutes = function (n, headID, manager, informTime) {
  let tree = Array(n).map(() => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) {
      tree[manager[i]].push(i);
    }
  }
  function dfs(node) {
    if (tree[node].length == 0) return informTime[node];
    let maxTime = 0;
    for (let i = 0; i < tree[node].length; i++) {
      maxTime = Math.max(maxTime, traverse([tree[node][i]]));
    }
    return informTime[node] + maxTime;
  }
  return dfs(headID);
};

/* 1382. Balance a Binary Search Tree

Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.
A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1. */

var balanceBST = function (root) {
  let array = [];
  function inOrder(node) {
    if (node.left) inOrder(node.left);
    array.push(node.val);
    if (node.right) inOrder(node.right);
  }
  inOrder(root);
  function recursive(arr) {
    if (arr.length == 0) return null;
    let mid = ~~(arr.length / 2);
    let newRoot = new TreeNode(arr[mid]);
    newRoot.left = recursive(arr.slice(0, mid));
    newRoot.right = recursive(arr.slice(mid + 1));
    return newRoot;
  }
  return recursive(array);
};
