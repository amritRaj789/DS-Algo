//1143. Longest Common Subsequence
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

let longestCommonSubsequence = function (text1, text2) {
  let dp = Array(text1.length + 1)
    .fill(null)
    .map(() => Array(text2.length + 1).fill(0));
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text2[j - 1] === text1[i - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[text1.length][text2.length];
};

/* 1161. Maximum Level Sum of a Binary Tree

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level x such that the sum of all the values of nodes at level x is maximal.
 */
var maxLevelSum = function (root) {
  let maxSum = -Infinity;
  let result = 1;
  let level = 1;
  let queue = [root];
  while (queue.length) {
    let count = queue.length;
    let sum = 0;
    while (count) {
      temp = queue.shift();
      sum += temp.val;
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      count--;
    }
    if (sum > maxSum) {
      result = level;
      maxSum = sum;
    }
    level++;
  }
  return result;
};

/* 1184. Distance Between Bus Stops

A bus has n stops numbered from 0 to n - 1 that form a circle. We know the distance between all pairs of neighboring stops where distance[i] is the distance between the stops number i and (i + 1) % n.
The bus goes along both directions i.e. clockwise and counterclockwise.
Return the shortest distance between the given start and destination stops.
 */
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

/* 1189. Maximum Number of Balloons

Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.
You can use each character in text at most once. Return the maximum number of instances that can be formed.
 */

let maxNumberOfBalloons = function (text) {
  let hash = {
    b: 0,
    a: 0,
    l: 0,
    o: 0,
    n: 0,
  };
  for (let char of text) {
    if (char in hash) hash[char]++;
  }
  hash["b"] *= 2;
  hash["a"] *= 2;
  hash["n"] *= 2;
  let min = +Infinity;
  for (let key in hash) {
    min = Math.min(hash[key], min);
  }
  if (min === Infinity) return 0;
  if (min % 2) return (min - 1) / 2;
  return min / 2;
};

/* 1190. Reverse Substrings between each pair of Parantheses

You are given a string s that consists of lower case English letters and brackets. 
Reverse the strings in each pair of matching parentheses, starting from the innermost one.
Your result should not contain any brackets.
 */

var reverseParentheses = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ")") stack.push(s[i]);
    else {
      let stack2 = [];
      while (stack.length) {
        let char = stack.pop();
        if (char === "(") break;
        stack2.push(char);
      }
      stack2.reverse();
      while (stack2.length) stack.push(stack2.pop());
    }
  }
  return stack.join("");
};
