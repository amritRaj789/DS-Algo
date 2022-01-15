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
