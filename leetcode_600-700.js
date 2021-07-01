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
