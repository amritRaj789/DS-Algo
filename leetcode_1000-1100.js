/* 1038. Binary Search Tree to Greater Sum Tree

Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

 */
var bstToGst = function (root) {
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

/* 1046. Last Stone Weight

You are given an array of integers stones where stones[i] is the weight of the ith stone.
We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.
Return the smallest possible weight of the left stone. If there are no stones left, return 0.
 */

var lastStoneWeight = function (stones) {
  let n = stones.length;
  if (n == 1) return stones[0];
  if (n == 0) return 0;
  stones.sort((a, b) => a - b);
  if (stones[n - 1] == stones[n - 2]) {
    return lastStoneWeight(stones.slice(0, n - 2));
  } else {
    let diff = stones[n - 1] - stones[n - 2];
    return lastStoneWeight([...stones.slice(0, n - 2), diff]);
  }
};

/* 1047. Remove all Duplicates in String

You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.
We repeatedly make duplicate removals on s until we no longer can.
Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.
 */

var removeDuplicates = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (stack.length > 1) {
      if (stack[stack.length - 1] == stack[stack.length - 2]) {
        stack.pop();
        stack.pop();
      }
    }
  }
  let result = "";
  stack.forEach((char) => (result += char));
  return result;
};

/*1079. Letter Tile Possibilities

You have n  tiles, where each tile has one letter tiles[i] printed on it.
Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.
*/
let numTilePossibilities = function (tiles) {
  let count = 0;
  let charFreq = {};
  for (let char of tiles) {
    if (!(char in charFreq)) charFreq[char] = 0;
    charFreq[char]++;
  }
  function recursive(level) {
    if (level === tiles.length) return;
    let used = {};
    for (let char of tiles) {
      used[char] = false;
    }
    for (let key in charFreq) {
      if (charFreq[key] > 0) {
        if (used[key] === false) {
          used[key] = true;
          charFreq[key]--;
          recursive(level + 1);
          count++;
          charFreq[key]++;
        }
      }
    }
  }
  recursive(0);
  return count;
};
// not very fast, but this works

/* 1081.

Given a string s, return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.
 */

var smallestSubsequence = function (s) {
  let stack = [];
  let hash = {};
  for (let i = 0; i < s.length; i++) hash[s[i]] = i;
  for (let i = 0; i < s.length; i++) {
    if (stack.indexOf(s[i]) > -1) continue;
    while (
      stack.length &&
      stack[stack.length - 1] > s[i] &&
      hash[stack[stack.length - 1]] > i
    )
      stack.pop();
    stack.push(s[i]);
  }
  return stack.join("");
};

/*1092. Shortest Common Supersequence
Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences.  
If multiple answers exist, you may return any of them.
*/
let shortestCommonSupersequence = function (str1, str2) {
  let dp = Array(str1.length + 1)
    .fill(null)
    .map(() => Array(str2.length + 1).fill(""));
  for (let i = 1; i <= str1.length; i++) {
    dp[i][0] = dp[i - 1][0] + str1[i - 1];
  }
  for (let j = 1; j <= str2.length + 1; j++) {
    dp[0][j] = dp[0][j - 1] + str2[j - 1];
  }
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1])
        dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
      else {
        if (dp[i - 1][j].length <= dp[i][j - 1].length)
          dp[i][j] = dp[i - 1][j] + str1[i - 1];
        else dp[i][j] = dp[i][j - 1] + str2[j - 1];
      }
    }
  }
  return dp[str1.length][str2.length];
};
