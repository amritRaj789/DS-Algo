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

/* 718. Maximum Length of Repeated Subarray

Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.
 */
// Brute force with hash map
var findLength = function (nums1, nums2) {
  let max = 0;
  let hash = {};
  for (let i = 0; i < nums2.length; i++) {
    if (!(nums2[i] in hash)) hash[nums2[i]] = [];
    hash[nums2[i]].push(i);
  }
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] in hash) {
      for (let k = 0; k < hash[nums1[i]].length; k++) {
        let len = 0;
        let start1 = i;
        let start2 = hash[nums1[i]][k];
        while (start1 < nums1.length && start2 < nums2.length) {
          if (nums1[start1++] == nums2[start2++]) len++;
          else break;
        }
        max = Math.max(max, len);
      }
    }
  }
  return max;
};
// DP Solution
let findLength = function (nums1, nums2) {
  let dp = Array(nums1.length + 1)
    .fill(0)
    .map(() => Array(nums2.length + 1).fill(0));
  let max = 0;
  for (let i = nums1.length - 1; i >= 0; i--) {
    for (let j = nums2.length - 1; j >= 0; j--) {
      if (nums1[i] == nums2[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
        max = Math.max(max, dp[i][j]);
      }
    }
  }
  return max;
};

/* 733. Flood Fill

An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].
To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.
Return the modified image after performing the flood fill.
 */
var floodFill = function (image, sr, sc, newColor) {
  let m = image.length;
  let n = image[0].length;
  if (image[sr][sc] == newColor) return image;
  let color = image[sr][sc];
  let queue = [[sr, sc]];
  image[sr][sc] = newColor;
  while (queue.length) {
    let [r, c] = queue.shift();
    // top
    if (r != 0 && image[r - 1][c] == color) {
      image[r - 1][c] = newColor;
      queue.push([r - 1, c]);
    }
    // bottom
    if (r != m - 1 && image[r + 1][c] == color) {
      image[r + 1][c] = newColor;
      queue.push([r + 1, c]);
    }
    // left
    if (c != 0 && image[r][c - 1] == color) {
      image[r][c - 1] = newColor;
      queue.push([r, c - 1]);
    }
    // right
    if (c != n - 1 && image[r][c + 1] == color) {
      image[r][c + 1] = newColor;
      queue.push([r, c + 1]);
    }
  }
  return image;
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

/* 764. Largest Plus Sign

You are given an integer n. You have an n x n binary grid grid with all values initially 1's except for some indices given in the array mines. The ith element of the array mines is defined as mines[i] = [xi, yi] where grid[xi][yi] == 0.
Return the order of the largest axis-aligned plus sign of 1's contained in grid. If there is none, return 0
 */

var orderOfLargestPlusSign = function (n, mines) {
  let grid = Array(n + 2)
    .fill(0)
    .map(() => Array(n + 2).fill(0)); // value, left, right, up, down
  for (let i = 0; i < n + 2; i++) {
    for (let j = 0; j < n + 2; j++) {
      grid[i][j] = [1, 0, 0, 0, 0];
    }
  }
  for (let i = 0; i < n + 2; i++) {
    grid[i][0][0] = 0;
    grid[0][i][0] = 0;
    grid[i][n + 1][0] = 0;
    grid[n + 1][i][0] = 0;
  }
  for (let i = 0; i < mines.length; i++) {
    let [m, n] = mines[i];
    grid[m + 1][n + 1][0] = 0;
  }
  let max = 0;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (grid[i][j][0] == 1) grid[i][j][1] = grid[i][j - 1][1] + 1;
      if (grid[i][n + 1 - j][0] == 1)
        grid[i][n + 1 - j][2] = grid[i][n + 2 - j][2] + 1;
      if (grid[j][i][0] == 1) grid[j][i][3] = grid[j - 1][i][3] + 1;
      if (grid[n + 1 - j][i][0] == 1)
        grid[n + 1 - j][i][4] = grid[n + 2 - j][i][4] + 1;
    }
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      max = Math.max(
        max,
        Math.min(grid[i][j][1], grid[i][j][2], grid[i][j][3], grid[i][j][4])
      );
    }
  }
  return max;
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
