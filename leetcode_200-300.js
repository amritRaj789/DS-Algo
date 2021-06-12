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
