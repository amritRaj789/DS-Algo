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

/* 500. Keyboard Row

Given an array of strings words, return the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below.
 */

var findWords = function (words) {
  let hash = {};
  let row1 = "qwertyuiop";
  for (let char of row1) hash[char] = 1;
  let row2 = "asdfghjkl";
  for (let char of row2) hash[char] = 2;
  let row3 = "zxcvbnm";
  for (let char of row3) hash[char] = 3;
  let result = [];
  for (let i = 0; i < words.length; i++) {
    let temp = words[i].toLowerCase();
    let belongs = hash[temp[0]];
    let j;
    for (j = 1; j < words[i].length; j++) {
      if (hash[temp[j]] !== belongs) break;
    }
    if (j == words[i].length) result.push(words[i]);
  }
  return result;
};

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

/* 507. Perfect Number

A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer x is an integer that can divide x evenly.
Given an integer n, return true if n is a perfect number, otherwise return false.
 */
var checkPerfectNumber = function (num) {
  if (num <= 5) return false;
  let sum = 0;
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i == 0) {
      sum += i + num / i;
    }
  }
  sum += 1;
  return sum == num;
};

/* 513. Find Bottom Left Tree Value

Given the root of a binary tree, return the leftmost value in the last row of the tree.
 */
var findBottomLeftValue = function (root) {
  let leftMost;
  let queue = [root];
  while (queue.length) {
    leftMost = queue[0].val;
    count = queue.length;
    while (count) {
      node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      count--;
    }
  }
  return leftMost;
};

/* 516. Longest Palindromic Subsequence

Given a string s, find the longest palindromic subsequence's length in s.
A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.
 */

// This is my way of doing it
var longestPalindromeSubseq = function (s) {
  let n = s.length;
  let dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (s[j] == s[i + j]) dp[j][i + j] = 2 + dp[j + 1][i + j - 1];
      else dp[j][i + j] = Math.max(dp[j][i + j - 1], dp[j + 1][i + j]);
    }
  }
  return dp[0][n - 1];
};

// The logic is same as above, just the sequence of filling of DP table is different
var longestPalindromeSubseq = function (s) {
  let n = s.length;
  let dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let start = n - 1; start >= 0; start--) {
    for (let end = 0; end < n; end++) {
      if (start > end) {
        dp[start][end] = 0;
      } else if (start === end) {
        dp[start][end] = 1;
      } else if (s[start] === s[end]) {
        dp[start][end] = 2 + dp[start + 1][end - 1];
      } else {
        dp[start][end] = Math.max(dp[start + 1][end], dp[start][end - 1]);
      }
    }
  }
  return dp[0][n - 1];
};

/* 520. Detect Capital

We define the usage of capitals in a word to be right when one of the following cases holds:
All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital, like "Google".
Given a string word, return true if the usage of capitals in it is right.
 */

var detectCapitalUse = function (word) {
  if (word.toUpperCase() == word) return true;
  if (word.slice(1).toLowerCase() == word.slice(1)) return true;
  return false;
};

/* 521. Longest Uncommon Subsequence I

Given two strings a and b, return the length of the longest uncommon subsequence between a and b. If the longest uncommon subsequence does not exist, return -1.
An uncommon subsequence between two strings is a string that is a subsequence of one but not the other.
A subsequence of a string s is a string that can be obtained after deleting any number of characters from s
 */
var findLUSlength = function (a, b) {
  if (a == b) return -1;
  else return Math.max(a.length, b.length);
};

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

/* 539. Minimum Time Difference

Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 */
var findMinDifference = function (timePoints) {
  let mins = [];
  let minDiff = +Infinity;
  for (let i = 0; i < timePoints.length; i++) {
    let time = Number(timePoints[i].slice(0, 2)) * 60;
    time += Number(timePoints[i].slice(3));
    mins.push(time);
  }
  mins.sort((a, b) => a - b);
  for (let i = 0; i < mins.length - 1; i++) {
    minDiff = Math.min(minDiff, mins[i + 1] - mins[i]);
  }
  minDiff = Math.min(minDiff, 24 * 60 - (mins[mins.length - 1] - mins[0]));
  return minDiff;
};

/* 541. Reverse String III

Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.
If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and left the other as original
 */
var reverseStr = function (s, k) {
  if (k == 1) return s;
  let result = "";
  let i = 0;
  let end = s.length;
  while (i < end) {
    if (end - i >= 2 * k) {
      word = "";
      for (let j = i; j < i + k; j++) {
        word = s[j] + word;
      }
      for (let j = i + k; j < i + 2 * k; j++) {
        word += s[j];
      }
      result += word;
      i = i + 2 * k;
    } else if (end - i < k) {
      word = "";
      for (let j = i; j < end; j++) {
        word = s[j] + word;
      }
      result += word;
      i = end;
    } else {
      word = "";
      for (let j = i; j < i + k; j++) {
        word = s[j] + word;
      }
      for (let j = i + k; j < end; j++) {
        word += s[j];
      }
      result += word;
      i = end;
    }
  }
  return result;
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

/* 557. Reverse Words in a String III

Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.
 */
var reverseWords = function (s) {
  let word = "";
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== " ") {
      word = s[i] + word;
    } else {
      result += word + " ";
      word = "";
    }
  }
  if (word.length > 0) result += word;
  return result;
};

/* 559. Maximum Depth of N-ary Tree

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples). */

var maxDepth = function (root) {
  if (!root) return 0;
  function dfs(node) {
    let max = 0;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        max = Math.max(dfs(node.children[i]), max);
      }
    }
    return max + 1;
  }
  return dfs(root);
};

/* 560. SubArray Sum equals K

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
 */
var subarraySum = function (nums, k) {
  let hash = {};
  let count = 0;
  let sum = 0;
  hash[0] = 1;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum - k in hash) count += hash[sum - k];
    if (!(sum in hash)) hash[sum] = 0;
    hash[sum]++;
  }
  return count;
};

/* 563. Binary Tree Tilt

Given the root of a binary tree, return the sum of every tree node's tilt.
The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if there the node does not have a right child.
 */

var findTilt = function (root) {
  if (!root) return 0;
  let sum = 0;
  function dfs(node) {
    let left = node.left ? dfs(node.left) : 0;
    let right = node.right ? dfs(node.right) : 0;
    sum += Math.abs(left - right);
    return left + right + node.val;
  }
  dfs(root);
  return sum;
};

/* 566. Reshape the Matrix

In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a new one with a different size r x c keeping its original data.
You are given an m x n matrix mat and two integers r and c representing the number of rows and the number of columns of the wanted reshaped matrix.
 */
var matrixReshape = function (mat, r, c) {
  let rows = mat.length;
  let cols = mat[0].length;
  if (rows * cols !== r * c) return mat;
  let newMat = Array(r)
    .fill(0)
    .map(() => Array(c).fill(0));
  let matr = 0;
  let matc = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      newMat[i][j] = mat[matr][matc++];
      if (matc == cols) {
        matc = 0;
        matr++;
      }
    }
  }
  return newMat;
};

/* 572. Subtree of Another Tree

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.
A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.
 */

let isSubtree = function (root, subRoot) {
  function isSame(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2 || root1.val !== root2.val) return false;
    return isSame(root1.left, root2.left) && isSame(root1.right, root2.right);
  }
  function dfs(node) {
    if (!node) return false;
    if (node.val === subRoot.val && isSame(node, subRoot)) return true;
    return dfs(node.left) || dfs(node.right);
  }
  return dfs(root);
};

/* 575. Distribute Candies

Alice has n candies, where the ith candy is of type candyType[i]. Alice noticed that she started to gain weight, so she visited a doctor.
The doctor advised Alice to only eat n / 2 of the candies she has (n is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor's advice.
Given the integer array candyType of length n, return the maximum number of different types of candies she can eat if she only eats n / 2 of them.
 */

var distributeCandies = function (candyType) {
  let max = candyType.length / 2;
  let count = 1;
  candyType.sort((a, b) => a - b);
  for (let i = 1; i < candyType.length; i++) {
    if (candyType[i] !== candyType[i - 1]) count++;
    if (count > max) return max;
  }
  return count;
};

var distributeCandies = function (candyType) {
  let max = candyType.length / 2;
  let count = 0;
  let visited = {};
  for (let i = 0; i < candyType.length; i++) {
    if (!(candyType[i] in visited)) {
      visited[candyType[i]] = true;
      count++;
      if (count == max) return max;
    }
  }
  return count;
};

/* 589. N-ary Tree Preorder traversal

Given the root of an n-ary tree, return the preorder traversal of its nodes' values.
Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)
 */

var preorder = function (root) {
  if (!root) return [];
  let result = [];
  function preOrder(node) {
    result.push(node.val);
    for (let i = 0; i < node.children.length; i++) {
      preOrder(node.children[i]);
    }
  }
  preOrder(root);
  return result;
};

/* 590. N-ary Tree PostOrder Traversal

Given the root of an n-ary tree, return the postorder traversal of its nodes' values.
Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples) */

var postorder = function (root) {
  if (!root) return [];
  let result = [];
  function dfs(node) {
    for (let i = 0; i < node.children.length; i++) dfs(node.children[i]);
    result.push(node.val);
  }
  dfs(root);
  return result;
};

/* 594. Longest Harmonius Subsequence

We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.
 */

let findLHS = function (nums) {
  let hash = {};
  for (let num of nums) {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  }
  let max = 0;
  for (let key in hash) {
    let next = Number(key) + 1;
    if (next in hash) {
      max = Math.max(max, hash[key] + hash[next]);
    }
  }
  return max;
};

/* 598. Range Addition II

You are given an m x n matrix M initialized with all 0's and an array of operations ops, where ops[i] = [ai, bi] means M[x][y] should be incremented by one for all 0 <= x < ai and 0 <= y < bi.
Count and return the number of maximum integers in the matrix after performing all the operations.
 */

var maxCount = function (m, n, ops) {
  if (ops.length == 0) return m * n;
  let minRow = ops[0][0];
  let minCol = ops[0][1];
  for (let i = 1; i < ops.length; i++) {
    minRow = Math.min(minRow, ops[i][0]);
    minCol = Math.min(minCol, ops[i][1]);
  }
  return minRow * minCol;
};

/* 599. Minimum Index Sum of Two Lists

Suppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings.
You need to help them find out their common interest with the least list index sum. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer. */

var findRestaurant = function (list1, list2) {
  let hash = {};
  let leastSum = +Infinity;
  let result = [];
  for (let i = 0; i < list1.length; i++) {
    hash[list1[i]] = i;
  }
  for (let i = 0; i < list2.length; i++) {
    if (list2[i] in hash) {
      if (i + hash[list2[i]] < leastSum) {
        result = [list2[i]];
        leastSum = i + hash[list2[i]];
      } else if (i + hash[list2[i]] == leastSum) {
        result.push(list2[i]);
      }
    }
  }
  return result;
};
