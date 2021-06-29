/* 202. Happy Number

Write an algorithm to determine if a number n is happy. Sum of square of digits becomes 1 or loops endlessly in a cycle
 */

var isHappy = function (n) {
  function square(num) {
    let sum = 0;
    while (num) {
      sum += (num % 10) ** 2;
      num = Math.floor(num / 10);
    }
    return sum;
  }
  let fast = n;
  let slow = n;
  while (fast !== 1) {
    fast = square(square(fast));
    slow = square(slow);
    if (slow === fast && slow !== 1) return false;
  }
  return true;
};

// 203 Remove Linked List elements

function removeElements(head, val) {
  while (head && head.val === val) {
    head = head.next;
  }
  if (head === null) return null;
  let prevNode = head;
  let node = head.next;
  while (node) {
    if (node.val === val) {
      prevNode.next = node.next;
      node = node.next;
    } else {
      prevNode = node;
      node = node.next;
    }
  }
  return head;
}

/* 204. Count Primes

Count the number of prime numbers less than a non-negative number, n.
 */
let countPrimes = function (n) {
  let hash = new Array(n).fill(1);
  let count = 0;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (hash[i]) {
      count++;
      for (let j = i * i; j < n; j += i) hash[j] = 0;
    }
  }
  for (let i = Math.floor(Math.sqrt(n) + 1); i < n; i++) {
    if (hash[i]) count++;
  }
  return count;
};

/* 
205. Isomorphic String

Given two strings s and t, determine if they are isomorphic.
Two strings s and t are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself. */

var isIsomorphic = function (s, t) {
  let hash = {};
  let used = {};
  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in hash)) {
      if (t[i] in used) return false;
      hash[s[i]] = t[i];
      used[t[i]] = true;
    } else {
      if (hash[s[i]] !== t[i]) return false;
    }
  }
  return true;
};

// 206. Reverse A  linked List
//Iterative approach
function reverseList(head) {
  let prevNode = null;
  let node = head;
  while (node) {
    let temp = node.next;
    node.next = prevNode;
    prevNode = node;
    node = temp;
  }
  head = prevNode;
  return head;
}

//Recursive approach
function reverseList(head) {
  if (head == null) return null;
  let currNode = head;
  function reverse(node) {
    if (node.next == null) {
      head = node;
      return;
    } else {
      reverse(node.next);
      node.next.next = node;
    }
  }
  reverse(currNode);
  currNode.next = null;
  return head;
}

/* 209. Minimum Size SubArray Sum

Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead. */

var minSubArrayLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;
  let right;
  for (right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left++];
    }
  }
  return minLength == Infinity ? 0 : minLength;
};

// 213. House Rober II
/*You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. 
That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, 
and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can 
rob tonight without alerting the police.
*/
let rob = function (nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length <= 3) return Math.max(...nums);
  let arr1 = [...nums];
  arr1.pop();
  let arr2 = [...nums];
  arr2.shift();
  let dp1 = new Array(arr1.length);
  dp1[0] = arr1[0];
  dp1[1] = Math.max(arr1[0], arr1[1]);
  let dp2 = new Array(arr2.length);
  dp2[0] = arr2[0];
  dp2[1] = Math.max(arr2[0], arr2[1]);
  for (let i = 2; i < dp1.length; i++) {
    dp1[i] = Math.max(arr1[i] + dp1[i - 2], dp1[i - 1]);
    dp2[i] = Math.max(arr2[i] + dp2[i - 2], dp2[i - 1]);
  }
  return Math.max(dp1[dp1.length - 1], dp2[dp2.length - 1]);
};

/*216. Combination Sum III
Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
Only numbers 1 through 9 are used.
Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.
*/
let combinationSum3 = function (k, n) {
  let max = n >= 9 ? 9 : n;
  let result = [];
  function recursive(sum, count, start, arr) {
    if (sum === 0 && count === 0) {
      result.push([...arr]);
      return;
    }
    if (count === 0 || start > sum) return;
    for (let i = start; i <= max; i++) {
      if (i <= sum) recursive(sum - i, count - 1, i + 1, [...arr, i]);
      else break;
    }
  }
  recursive(n, k, 1, []);
  return result;
};
// 100 % faster. Lets Go!!!

// 221. Maxinmal Square
/*Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's 
and return its area.
*/
// bottom up DP solution
let maximalSquare = function (matrix) {
  let dp = Array(matrix.length)
    .fill(null)
    .map(() => Array(matrix[0].length).fill(0));
  let maxLength = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === "1") {
      maxLength = 1;
      dp[0][i] = 1;
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === "1") {
      maxLength = 1;
      dp[i][0] = 1;
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        if (dp[i][j] > maxLength) maxLength = dp[i][j];
      }
    }
  }
  return maxLength ** 2;
};

/* 226. Invert Binary Tree

Given the root of a Binary Tree, invert the tree, and return its root
 */
var invertTree = function (root) {
  if (!root) return null;
  let temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
};

/* 228. Summary Ranges
You are given a sorted unique integer array nums.

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.
Each range [a,b] in the list should be output as:
"a->b" if a != b
"a" if a == b
 */
var summaryRanges = function (nums) {
  if (!nums.length) return [];
  let result = [];
  let start = 0;
  let end;
  for (end = 1; end < nums.length; end++) {
    if (nums[end] == nums[end - 1] + 1) continue;
    else {
      if (start === end - 1) result.push(String(nums[start]));
      else result.push(String(nums[start]) + "->" + nums[end - 1]);
      start = end;
    }
  }
  if (start == end - 1) result.push(String(nums[start]));
  else result.push(String(nums[start]) + "->" + nums[end - 1]);
  return result;
};

/* 230. Kth smallest Element in a BST

Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree. */

var kthSmallest = function (root, k) {
  let array = [];
  function dfs(node) {
    if (array.length === k) return;
    if (node.left) dfs(node.left);
    array.push(node.val);
    if (node.right) dfs(node.right);
  }
  dfs(root);
  return array[k - 1];
};

// iterative sol
let kthSmallest = function (root, k) {
  let stack = [];
  let current = root;
  let result = [];
  while (true) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      result.push(current.val);
      if (result.length === k) return result[k - 1];
      current = current.right;
    }
  }
};

/* 231. Power of Two

Given an integer n, return true if it is a power of two. Otherwise, return false.
An integer n is a power of two, if there exists an integer x such that n == 2x.
 */

var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  return !(n & (n - 1));
};

// 234. Palindrome Linked List
// Given a singly linked list, determine if it is a palindrome

function isPalindrome(head) {
  if (head === null || head.next === null) return true;

  //find middle of the linked list
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  headSecondHalf = reverse(slow); // reverse the second half
  copyHeadSecondHalf = headSecondHalf; // stores the head of the reversed list so that we can reverse it back later

  //Compare the first half with the reversed second half
  while (head !== null && headSecondHalf !== null) {
    if (head.val !== headSecondHalf.val) break;
    head = head.next;
    headSecondHalf = headSecondHalf.next;
  }
  reverse(copyHeadSecondHalf);
  if (head === null || headSecondHalf === null) return true;
  return false;

  //helper function to reverse a linked list and return the new head
  function reverse(head) {
    let prev = null;
    let node = head;
    while (node) {
      let temp = node.next;
      node.next = prevNode;
      prevNode = node;
      node = temp;
    }
    head = prevNode;
    return head;
  }
}

/* 235. Lowest Common Ancestor of a Binary Search Tree

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
 */

let lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (root.val > p.val && root.val > q.val) root = root.left;
    else if (root.val < p.val && root.val < q.val) root = root.right;
    else return root;
  }
};

// 237. Delete Node in a Linked List
// you are not given the head of the linked list instead you are given the node to be deleted directly

function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}

/* 242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 */ var isAnagram = function (s, t) {
  let hash = {};
  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in hash)) hash[s[i]] = 0;
    hash[s[i]]++;
  }
  for (let i = 0; i < t.length; i++) {
    if (!(t[i] in hash)) return false;
    hash[t[i]]--;
    if (hash[t[i]] < 0) return false;
    if (hash[t[i]] === 0) delete hash[t[i]];
  }
  if (Object.keys(hash).length) return false;
  return true;
};

/* 257. Binary Tree Paths

Given the root of a binary tree, return all root-to-leaf paths in any order
 */
var binaryTreePaths = function (root) {
  let result = [];
  let node = root;
  function dfs(node, string) {
    if (!node.left && !node.right) {
      result.push(string.slice(0));
      return;
    }
    if (node.left) dfs(node.left, string.slice(0) + "->" + node.left.val);
    if (node.right) dfs(node.right, string.slice(0) + "->" + node.right.val);
  }
  dfs(root, String(root.val));
  return result;
};

/* 258. Add digits

Given an integer num, repeatedly add all its digits until the result has only one digit, and return it
 */

// Recursive
var addDigits = function (num) {
  if (num <= 9) return num;
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return addDigits(sum);
};

// Iterative
var addDigits = function (num) {
  let sum = 0;
  while (num) {
    sum += num % 10;
    num = Math.floor(num / 10);
    if (num === 0 && sum > 9) {
      num = sum;
      sum = 0;
    }
  }
  return sum;
};

// Mathematics
let addDigits = function (num) {
  if (!num) return 0;
  if (!(num % 9)) return 9;
  return num % 9;
};

// 264. Ugly Number II
/*Given an integer n, return the nth ugly number.
Ugly number is a positive number whose prime factors only include 2, 3, and/or 5.
*/
let nthUglyNumber = function (n) {
  if (n <= 6) return n;
  let i2 = 0;
  let i3 = 0;
  let i5 = 0;
  let dp = [1];
  for (let i = 2; i <= n; i++) {
    c1 = 2 * dp[i2];
    c2 = 3 * dp[i3];
    c3 = 5 * dp[i5];
    next = Math.min(c1, c2, c3);
    dp.push(next);
    if (next === c1) i2++;
    if (next === c2) i3++;
    if (next === c3) i5++;
  }
  return dp[n - 1];
};

/* 278. First Bad Version

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

 */

// try to cut through the fluff its just Binary Search

var solution = function (isBadVersion) {
  return function (n) {
    if (isBadVersion(1)) return 1;
    let left = 1;
    let right = n;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (isBadVersion(mid)) {
        if (!isBadVersion(mid - 1)) return mid;
        right = mid - 1;
      } else {
        if (isBadVersion(mid + 1)) return mid + 1;
        left = mid + 1;
      }
    }
  };
};

/*279. Perfect Squares
Given an integer n, return the least number of Perfect sqaure numbers that sum to n
*/

let numSquares = function (n) {
  let dp = [0];
  for (let i = 1; i <= n; i++) {
    dp[i] = +Infinity;
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i - j * j] + 1, dp[i]);
    }
  }
  return dp[n];
};

/* 287. Find the Duplicate Number

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and uses only constant extra space. */

var findDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let j = nums[i] - 1;
    if (nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i--;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return nums[i];
  }
};

/* 290. Word Pattern

Given a pattern and a string s, find if s follows the same pattern
Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s
 */

let wordPattern = function (pattern, s) {
  let hash1 = {};
  let hash2 = {};
  let words = s.split(" ");
  if (words.length !== pattern.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] in hash1) {
      if (hash1[pattern[i]] !== words[i]) return false;
    } else {
      if (words[i] in hash2) return false;
      else {
        hash1[pattern[i]] = words[i];
        hash2[words[i]] = true;
      }
    }
  }
  return true;
};

/* 292. Nim Game

You are playing the following Nim Game with your friend:
Initially, there is a heap of stones on the table.
You and your friend will alternate taking turns, and you go first.
On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
The one who removes the last stone is the winner.
Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false. */

var canWinNim = function (n) {
  return !(n % 4 === 0);
};

/*300. Longest Increasing Subsequence
Given an integer array nums, return the length of the longest strictly increasing
subsequence.
A subsequence is a sequence that can be derived from an array by deleting some or no
elements without changing the order of the reamaining elements. For example, 
[3, 6, 2, 7] is a subsequence of the array [0, 3, 1, 6, 2, 7].*/

// Dynamic Programming
var lengthOfLIS = function (nums) {
  let dp = Array(nums.length);
  dp[0] = 1;
  let maxVal = 1;
  for (let i = 1; i < nums.length; i++) {
    let max = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) max = Math.max(max, dp[j] + 1);
    }
    dp[i] = max;
    maxVal = Math.max(maxVal, max);
  }
  return maxVal;
};
// TC O(N^2), SC O(N)
// there is even a better DP sol using Binary search
