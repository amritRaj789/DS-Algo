/* 713. Subarray product less than K

Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k. */

var numSubarrayProductLessThanK = function (nums, k) {
  if (k == 0) return 0;
  let result = 0;
  let left = 0;
  let product = 1;
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    while (product >= k && left <= right) {
      product /= nums[left++];
    }
    if (product < k) result += right - left + 1;
  }
  return result;
};

/* 739. Daily Temperatures
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

 */

let dailyTemperatures = function (temperatures) {
  let stack = [0];
  let result = Array(temperatures.length).fill(0);
  for (let i = 1; i < temperatures.length; i++) {
    while (
      stack.length !== 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      result[stack[stack.length - 1]] = i - stack[stack.length - 1];
      stack.pop();
    }
    stack.push(i);
  }
  return result;
};

/* 763. Partition Labels

A string s of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts. */

var partitionLabels = function (s) {
  let hash = {};
  for (let i = s.length - 1; i >= 0; i--) {
    if (!(s[i] in hash)) hash[s[i]] = i;
  }
  let result = [];
  let left = 0;
  while (left < s.length) {
    let right = hash[s[left]];
    let i = left + 1;
    while (i < right) right = Math.max(right, hash[s[i++]]);
    result.push(right - left + 1);
    left = right + 1;
  }
  return result;
};

/*784. Letter Case Permutation
Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.
Return a list of all possible strings we could create. You can return the output in any order.
*/

// BFS iterative
let letterCasePermutation = function (string) {
  let str = string.toLowerCase();
  let result = [str.slice(0)];
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) < 97 || str.charCodeAt(i) > 122) continue;
    let length = result.length;
    for (let j = 0; j < length; j++)
      result.push(
        result[j].slice(0, i) +
          result[j][i].toUpperCase() +
          result[j].slice(i + 1)
      );
  }
  return result;
};

// DFS recursive
let letterCasePermutation = function (S) {
  let s = S.toLowerCase();
  let result = [];
  function recursive(index, string) {
    if (index === s.length) {
      result.push(string.slice(0));
      return;
    }
    recursive(index + 1, string.slice(0));
    if (s.charCodeAt(index) >= 97 && s.charCodeAt(index) <= 122)
      recursive(
        index + 1,
        string.slice(0, index) +
          string[index].toUpperCase() +
          string.slice(index + 1)
      );
  }
  recursive(0, s);
  return result;
};

/*797. All Paths From Source to Target

Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths 
from node 0 to node n - 1, and return them in any order.
The graph is given as follows: graph[i] is a list of all nodes you can visit from node i 
(i.e., there is a directed edge from node i to node graph[i][j]).
*/
var allPathsSourceTarget = function (graph) {
  let result = [];
  function recursive(index, arr) {
    if (index === graph.length - 1) {
      result.push([...arr, index]);
      return;
    }
    for (let i = 0; i < graph[index].length; i++) {
      recursive(graph[index][i], [...arr, index]);
    }
  }
  recursive(0, []);
  return result;
};
