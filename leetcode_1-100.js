/*1. Two Sum
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].*/

var twoSum = function (nums, target) {
  const comp = {};
  for (let i = 0; i < nums.length; i++) {
    if (comp[nums[i]] >= 0) {
      return [comp[nums[i]], i];
    }
    comp[target - nums[i]] = i;
  }
};

/*2. Add two numbers
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/
var addTwoNumbers = function (l1, l2) {
  let result = new ListNode();
  let resultHead = result;
  let carryOver = 0;
  while (l1 !== null || l2 !== null) {
    val1 = l1 === null ? 0 : l1.val;
    val2 = l2 === null ? 0 : l2.val;
    sum = val1 + val2 + carryOver;
    carryOver = Math.floor(sum / 10);
    result.next = new ListNode(sum % 10);
    l1 = l1 === null ? null : l1.next;
    l2 = l2 === null ? null : l2.next;
    result = result.next;
  }
  if (carryOver) result.next = new ListNode(1);
  return resultHead.next;
};

// 3. Longest substring without repeating characters.
//  Given a string s, find the length of the longest substring without repeating characters.

function no_repeat(str) {
  let windowEnd;
  let windowStart = 0;
  let hashMap = {};
  let maxLength = 0;
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    if (hashMap[str[windowEnd]] >= windowStart) {
      windowStart = hashMap[str[windowEnd]] + 1;
    }
    hashMap[str[windowEnd]] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}
console.log(no_repeat("abcabcbb"));

/*6. ZigZag Conversion
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows 
like this: (you may want to display this pattern in a fixed font for better legibility)
*/
var convert = function (s, numRows) {
  let table = Array(numRows).fill(0);
  for (let i = 1; i <= numRows; i++) {
    table[i - 1] = "";
  }
  let i = 0;
  while (i < s.length) {
    let row1 = 1;
    while (row1 <= numRows && i < s.length) {
      table[row1 - 1] += s[i];
      i++;
      row1++;
    }
    let row2 = numRows - 1;
    while (row2 > 1 && i < s.length) {
      table[row2 - 1] += s[i];
      i++;
      row2--;
    }
  }
  let answer = "";
  for (let i = 0; i < numRows; i++) {
    answer += table[i];
  }
  return answer;
};

/*9. Palindrome Number
Given an integer x, return true if x is palindrome integer.
An integer is a palindrome when it reads the same backward as forward. 
For example, 121 is palindrome while 123 is not.
*/
var isPalindrome = function (x) {
  if (x < 0) return false;
  let original = x;
  let reversed = 0;
  while (x > 0) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return original === reversed;
};

// 11. Container with Most Water
/*Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). 
n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.
*/
function maxWater(height) {
  let left = 0;
  let right = height.length - 1;
  let maxVolWater = 0;
  let currentWater = 0;
  while (left < right) {
    currentWater = (right - left) * Math.min(height[left], height[right]);
    maxVolWater = Math.max(maxVolWater, currentWater);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxVolWater;
}

/* 13 Roman to Integer

Given a roman numeral, convert it to an integer.
 */
let romanToInt = function (s) {
  let hash = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]] < hash[s[i + 1]]) sum -= hash[s[i]];
    else sum += hash[s[i]];
  }
  return sum;
};
/*15. 3Sum
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.
*/
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    twoSum(nums, i + 1, -nums[i], result);
  }
  return result;
};
function twoSum(arr, left, target, result) {
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] + arr[right] < target) left++;
    else if (arr[left] + arr[right] > target) right--;
    else {
      result.push([-target, arr[left], arr[right]]);
      left++;
      right--;
      while (left < right && arr[left] === arr[left - 1]) left++;
      while (left < right && arr[right] === arr[right + 1]) right--;
    }
  }
}

/* 
16. 3Sum Closest
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution 
*/
let threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let closest = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    let sum;
    while (left < right) {
      sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;
      if (sum > target) right--;
      else if (sum < target) left++;
      else return target;
    }
  }
  return closest;
};

/* 
For an interview, we recommend focusing on the Two Pointers approach above. It's easier to get it right and adapt for other variations of 3Sum. Interviewers love asking follow-up problems like 3Sum Smaller!

If an interviewer asks you whether you can achieve \mathcal{O}(1)O(1) memory complexity, you can use the selection sort instead of a built-in sort in the Two Pointers approach. It will make it a bit slower, though the overall time complexity will be still \mathcal{O}(n^2)O(n 
2
 ). */

/*17. Letter Combinations of a Phone Number
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. 
Return the answer in any order.
A mapping of digit to letters (just like on the telephone buttons) is given below. 
Note that 1 does not map to any letters.
*/
const letterCombinations = (digits) => {
  if (digits === "") return [];
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const result = [];
  const backtrack = (str, level) => {
    if (level === digits.length) {
      result.push(str);
      return;
    }
    for (const c of map[digits[level]]) {
      backtrack(str + c, level + 1);
    }
  };
  backtrack("", 0);
  return result;
};
/*18. 4Sum
Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
Notice that the solution set must not contain duplicate quadruplets.
*/
const fourSum = function (nums, target) {
  let quadruplets = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j >= i + 2 && nums[j] === nums[j - 1]) continue;
      let left = j + 1;
      let right = nums.length - 1;
      while (left < right) {
        sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum < target) left++;
        else if (sum > target) right--;
        else {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          right--;
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        }
      }
    }
  }
  return quadruplets;
};

/*19. Remove Nth Node from End of List
Given the head of a linked list, remove the nth node from the end of the list and return its head
*/
var removeNthFromEnd = function (head, n) {
  let slow = head;
  let fast = head;
  while (n > 0) {
    fast = fast.next;
    n--;
  }
  if (fast === null) {
    return head.next;
  }
  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  let temp = slow.next.next;
  slow.next = temp;
  return head;
};
//10 -> 5 -> 6 -> 7 -> 12 -> 30, n = 6

// 20. Valid Parentheses
/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
*/
function isValid(s) {
  if (s == "") return true;
  let stack = [];
  let hash = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(" || s[i] == "{" || s[i] == "[") stack.push(s[i]);
    else {
      let temp = stack.pop();
      if (hash[temp] !== s[i]) return false;
    }
  }
  if (stack.length !== 0) return false;
  return true;
}

// 21. Merge 2 Sorted LinkedLists

let mergeTwoLists = function (l1, l2) {
  let head = new ListNode();
  let current = head;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = new ListNode(l1.val);
      current = current.next;
      l1 = l1.next;
    } else if (l1.val == l2.val) {
      current.next = new ListNode(l1.val);
      current = current.next;
      current.next = new ListNode(l2.val);
      current = current.next;
      l1 = l1.next;
      l2 = l2.next;
    } else {
      current.next = new ListNode(l2.val);
      current = current.next;
      l2 = l2.next;
    }
  }
  if (l1 === null && l2 === null) return head.next;
  else if (l1 === null) {
    while (l2 !== null) {
      current.next = new ListNode(l2.val);
      current = current.next;
      l2 = l2.next;
    }
    return head.next;
  } else {
    while (l1 !== null) {
      current.next = new ListNode(l1.val);
      current = current.next;
      l1 = l1.next;
    }
    return head.next;
  }
};

/*22. Generate Parantheses
Given n pairs of parentheses, 
write a function to generate all combinations of well-formed parentheses.
*/
let generateParenthesis = function (n) {
  if (n === 1) return ["()"];
  let result = [];
  function backtrack(open, close, str) {
    if (open === n && close === n) {
      result.push(str);
      return;
    }
    if (close > open || open > n || close > n) return;
    backtrack(open + 1, close, str + "(");
    backtrack(open, close + 1, str + ")");
  }
  backtrack(0, 0, "");
  return result;
};

/*24. Swap Nodes in Pairs
Given a linked list, swap every two adjacent nodes and return its head
*/
var swapPairs = function (head) {
  let currNode = head;
  while (currNode !== null && currNode.next !== null) {
    let tempVal = currNode.val;
    currNode.val = currNode.next.val;
    currNode.next.val = tempVal;
    currNode = currNode.next.next;
  }
  return head;
};

/* 25. Reverse Nodes in k-group

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
You may not alter the values in the list's nodes, only nodes themselves may be changed.
 */
let reverseKGroup = function (head, k) {
  if (k == 1 || head == null) return head;
  let current = head;
  let i = 0;
  let copyLink1;
  while (current) {
    let count = k;
    let prev = null;
    let copyStart = current;
    while (count > 0 && current) {
      let temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;
      count--;
    }
    if (count > 0) {
      curr = prev;
      prev = null;
      while (curr) {
        let temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
      }
      copyLink1.next = prev;
      return head;
    }
    if (i == 0) {
      head = prev;
      i++;
    } else copyLink1.next = prev;
    copyLink1 = copyStart;
  }
  return head;
};

/* 28. Implement strStr()

Implement strStr().
Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
 */

let strStr = function (haystack, needle) {
  if (needle == "") return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.slice(i, i + needle.length) == needle) return i;
  }
  return -1;
};
// The above has a TC of O(MxN) it can be improved to O(N) by using KMP algorithm

/*33. Search in Rotated Array

Given the array nums after the rotation and an integer target, 
return the index of target if it is in nums, or -1 if it is not in nums.
*/
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (target === nums[mid]) return mid;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
};

/*34. Find first and last position of element in Sorted Array
 */
let searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];
  function findMid(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) return mid;
      else if (target > nums[mid]) left = mid + 1;
      else right = mid - 1;
    }
    return false;
  }
  let index = findMid(nums, target);
  if (index === false) return [-1, -1];
  else {
    let start = index;
    while (nums[start] === target && start >= 0) {
      start--;
    }
    let end = index;
    while (nums[end] === target && end < nums.length) {
      end++;
    }
    return [start + 1, end - 1];
  }
};

//36. Valid Sudoku
/* Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 */
var isValidSudoku = function (board) {
  let hash = {
    row: {},
    col: {},
    grid: {},
  };
  for (let i = 0; i < 9; i++) {
    hash["row"][i + 1] = new Object();
    hash["col"][i + 1] = new Object();
    hash["grid"][i + 1] = new Object();
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let char = board[i][j];
      if (char === ".") continue;
      let grid = Math.floor(i / 3) * 3 + (Math.floor(j / 3) + 1);
      if (!(char in hash["row"][i + 1])) hash["row"][i + 1][char] = true;
      else return false;
      if (!(char in hash["col"][j + 1])) hash["col"][j + 1][char] = true;
      else return false;
      if (!(char in hash["grid"][grid])) hash["grid"][grid][char] = true;
      else return false;
    }
  }
  return true;
};

// 37. Solve Sudoku

function isValid(num, board, row, col) {
  //check col
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  //check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }
  //check grid
  let rowStart = Math.floor(row / 3) * 3;
  let colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}
const possibleNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let solveSudoku = function (board) {
  const emptypoints = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") emptypoints.push({ row: i, col: j });
    }
  }
  function backTrack(emptypointsIndex) {
    if (emptypointsIndex >= emptypoints.length) return true;
    let { row, col } = emptypoints[emptypointsIndex];
    for (let num of possibleNumbers) {
      if (isValid(num, board, row, col)) {
        board[row][col] = num;
        if (backTrack(emptypointsIndex + 1)) return true;
        board[row][col] = ".";
      }
    }
    return false;
  }
  backTrack(0);
  return board;
};

// Simpler Backtracking given below

let solveSudoku = function (board) {
  function check(s, r, c) {
    // check row and col
    for (let i = 0; i < 9; i++) {
      if (board[r][i] == s || board[i][c] == s) return false;
    }
    // check grid
    let rowStart = 3 * Math.floor(r / 3);
    let colStart = 3 * Math.floor(c / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[rowStart + i][colStart + j] == s) return false;
      }
    }
    return true;
  }
  function backTrack(row, col) {
    if (row == 8 && col == 9) return true;
    if (col == 9) {
      row = row + 1;
      col = 0;
    }
    if (board[row][col] !== ".") return backTrack(row, col + 1);
    for (let i = 1; i <= 9; i++) {
      if (check(String(i), row, col)) {
        board[row][col] = String(i);
        if (!backTrack(row, col + 1)) board[row][col] = ".";
        else return true;
      }
    }
    return false;
  }
  backTrack(0, 0);
};

//39. Combination Sum

/*Given an array of distinct integers candidates and a target integer target, 
return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
The same number may be chosen from candidates an unlimited number of times. 
Two combinations are unique if the frequency of at least one of the chosen numbers is different.
It is guaranteed that the number of unique combinations that sum up to target 
is less than 150 combinations for the given input.
*/
var combinationSum = function (candidates, target) {
  let result = [];
  function recursive(sum, arr, i) {
    if (sum === target) {
      result.push([...arr]);
      return;
    }
    if (i === candidates.length) return;
    if (candidates[i] + sum > target) recursive(sum, [...arr], i + 1);
    else {
      recursive(sum + candidates[i], [...arr, candidates[i]], i);
      recursive(sum, [...arr], i + 1);
    }
  }
  recursive(0, [], 0);
  return result;
};

// interesting thing to note is, although this question can be solved using Dynamic programming
// it doesn't result in more efficiency. So I am beginning to understand how DP differs from backtracking
// and when to use which one

/*40. Combination Sum II
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates 
where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.
*/
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  let result = [];
  function recursive(sum, arr, i) {
    if (sum === target) {
      result.push([...arr]);
      return;
    }
    if (i === candidates.length) return;
    if (candidates[i] + sum > target) recursive(sum, [...arr], i + 1);
    else {
      recursive(sum + candidates[i], [...arr, candidates[i]], i + 1);
      let nextUniqueIndex = i;
      while (nextUniqueIndex < candidates.length) {
        if (candidates[i] !== candidates[nextUniqueIndex]) break;
        nextUniqueIndex++;
      }
      recursive(sum, [...arr], nextUniqueIndex);
    }
  }
  recursive(0, [], 0);
  return result;
};

/*
 42. Trapping Rain Water
Given a non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can be trap after raining.
 */
var trap = function (height) {
  let left = 0;
  let leftMax = 0;
  let right = height.length - 1;
  let rightMax = 0;
  let ans = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else ans += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else ans += rightMax - height[right];
      right--;
    }
  }
  return ans;
};
// This is so magical using 2 pointers we can solve it in O(N) and without any extra space

/* 45. Jump Game II

Given an array of non-negative integers nums, you are initially positioned at the first index of the array.
Each element in the array represents your maximum jump length at that position.
Your goal is to reach the last index in the minimum number of jumps.
You can assume that you can always reach the last index. */

var jump = function (nums) {
  let dp = Array(nums.length).fill(+Infinity);
  dp[nums.length - 1] = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] >= nums.length - 1 - i) {
      dp[i] = 1;
      continue;
    } else if (nums[i] == 0) continue;
    for (let j = i + 1; j <= i + nums[i]; j++) {
      if (dp[j] == 1) {
        dp[i] = 2;
        break;
      }
      dp[i] = Math.min(dp[i], 1 + dp[j]);
    }
  }
  return dp[0];
};

// Much more efficient, O(N)
var jump = function (nums) {
  if (nums.length == 1) return 0;
  let jumps = 0;
  let newMax = 0;
  let oldMax = 0;
  for (let i = 0; i < nums.length; i++) {
    newMax = Math.max(newMax, i + nums[i]);
    if (newMax >= nums.length - 1) return jumps + 1;
    if (oldMax == i) {
      jumps++;
      oldMax = newMax;
    }
  }
};

/*46. Permutations
Given an array nums of distinct integers, return all the possible permutations.
You can return the answer in any order
*/
let permute = function (nums) {
  let result = [];
  function recursive(arr, level) {
    if (level === nums.length) {
      result.push(arr);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== false) {
        let temp = nums[i];
        nums[i] = false;
        recursive([...arr, temp], level + 1);
        nums[i] = temp;
      }
    }
  }
  recursive([], 0);
  return result;
};

/*47. Permutations II
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
*/
let permuteUnique = function (nums) {
  if (nums.length === 1) return [nums];
  let copiedNums = [...nums];
  let result = [];
  function backtrack(level, arr) {
    if (level === nums.length) {
      result.push([...arr]);
      return;
    }
    let used = {};
    copiedNums.forEach((num) => {
      used[num] = false;
    });
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== false) {
        if (used[nums[i]] == false) {
          used[nums[i]] = true;
          let temp = nums[i];
          nums[i] = false;
          backtrack(level + 1, [...arr, temp]);
          nums[i] = temp;
        }
      }
    }
  }
  backtrack(0, []);
  return result;
};

/* 48. Rotate Image

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 */

var rotate = function (matrix) {
  let n = matrix.length;
  let depth = Math.floor(n / 2);
  for (let i = 0; i < depth; i++) {
    let temp;
    let opp = n - i - 1;
    for (let j = 0; j < n - 2 * i - 1; j++) {
      temp = matrix[i][i + j];
      matrix[i][i + j] = matrix[opp - j][i];
      matrix[opp - j][i] = matrix[opp][opp - j];
      matrix[opp][opp - j] = matrix[i + j][opp];
      matrix[i + j][opp] = temp;
    }
  }
};

/* 49. Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 */
var groupAnagrams = function (strs) {
  let hash = {};
  for (let i = 0; i < strs.length; i++) {
    let sortedWord = strs[i].split("").sort().join("");
    if (sortedWord in hash) hash[sortedWord].push(strs[i]);
    else hash[sortedWord] = [strs[i]];
  }
  return Object.entries(hash).map((entry) => entry[1]);
};

/*51. N-Queens
Return all distinct solutions to the n queens problem
*/
let solveNQueens = function (n) {
  let board = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));
  let result = [];
  function recursive(board, row) {
    for (let i = 0; i < n; i++) {
      if (isValid(board, row, i, n)) {
        board[row][i] = 1;
        if (row === n - 1) {
          let newBoard = Array(n);
          for (let j = 0; j < n; j++) {
            newBoard[j] = "";
            for (let k = 0; k < n; k++) {
              if (board[j][k] === 1) newBoard[j] += "Q";
              else newBoard[j] += ".";
            }
          }
          result.push(newBoard);
        } else recursive(board, row + 1);
      }
      board[row][i] = 0;
    }
  }
  recursive(board, 0);
  return result;
};

function isValid(board, row, col, n) {
  // check column
  for (let i = 0; i < n; i++) {
    if (board[i][col] === 1) return false;
  }
  //check row
  for (let i = 0; i < n; i++) {
    if (board[row][i] === 1) return false;
  }
  // check top-left diagonal
  let i = row - 1;
  let j = col - 1;
  while (i >= 0 && j >= 0) {
    if (board[i][j] === 1) return false;
    i--;
    j--;
  }
  //check top-right diagonal
  i = row - 1;
  j = col + 1;
  while (i >= 0 && j < n) {
    if (board[i][j] === 1) return false;
    i--;
    j++;
  }
  //check bottom left diagonal
  i = row + 1;
  j = col - 1;
  while (i < n && j >= 0) {
    if (board[i][j] === 1) return false;
    i++;
    j--;
  }
  //check bottom right diagonal
  i = row + 1;
  j = col + 1;
  while (i < n && j < n) {
    if (board[i][j] === 1) return false;
    i++;
    j++;
  }
  return true;
}

//52. N-Queens II
// Count the number of ways to place n queens in a nxn chessboard
let totalNQueens = function (n) {
  let board = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));
  let count = 0;
  function recursive(board, row) {
    for (let i = 0; i < n; i++) {
      if (isValid(board, row, i, n)) {
        board[row][i] = 1;
        if (row === n - 1) count++;
        else recursive(board, row + 1);
      }
      board[row][i] = 0;
    }
  }
  recursive(board, 0);
  return count;
};

function isValid(board, row, col, n) {
  // check column
  for (let i = 0; i < n; i++) {
    if (board[i][col] === 1) return false;
  }
  //check row
  for (let i = 0; i < n; i++) {
    if (board[row][i] === 1) return false;
  }
  // check top-left diagonal
  let i = row - 1;
  let j = col - 1;
  while (i >= 0 && j >= 0) {
    if (board[i][j] === 1) return false;
    i--;
    j--;
  }
  //check top-right diagonal
  i = row - 1;
  j = col + 1;
  while (i >= 0 && j < n) {
    if (board[i][j] === 1) return false;
    i--;
    j++;
  }
  //check bottom left diagonal
  i = row + 1;
  j = col - 1;
  while (i < n && j >= 0) {
    if (board[i][j] === 1) return false;
    i++;
    j--;
  }
  //check bottom right diagonal
  i = row + 1;
  j = col + 1;
  while (i < n && j < n) {
    if (board[i][j] === 1) return false;
    i++;
    j++;
  }
  return true;
}

/* 55. Jump Game

You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.
 */

var canJump = function (nums) {
  let newMax = nums[0];
  for (let i = 0; i < nums.length; i++) {
    newMax = Math.max(newMax, i + nums[i]);
    if (newMax >= nums.length - 1) return true;
    else if (newMax <= i) return false;
  }
};

/* 56. Merge Intervals
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, 
and return an array of the non-overlapping intervals that cover all the intervals in the input.
*/

var merge = function (intervals) {
  if (intervals.length < 2) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [];
  let start = intervals[0][0];
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= end) {
      end = Math.max(intervals[i][1], end);
    } else {
      merged.push([start, end]);
      start = intervals[i][0];
      end = intervals[i][1];
    }
  }
  merged.push([start, end]);
  return merged;
};

/*57. Insert Intervals
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
You may assume that the intervals were initially sorted according to their start times

*/
var insert = function (intervals, newInterval) {
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    i++;
  }
  const start = i;
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }
  intervals.splice(start, i - start, newInterval);

  return intervals;
};
// In place and O(N);

/* 59. Generate Matrix

Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.
 */

var generateMatrix = function (n) {
  // change direction when either you run into an already filled cell or cell is out of bounds
  let array = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  let dir = {
    ltr: [0, 1],
    ttb: [1, 0],
    rtl: [0, -1],
    btt: [-1, 0],
  };
  let currDir = "ltr";
  let row = 0;
  let col = 0;
  array[0][0] = 1;
  for (let i = 2; i <= n * n; i++) {
    row += dir[currDir][0];
    col += dir[currDir][1];
    if (row == n || row < 0 || col < 0 || col == n || array[row][col] !== 0) {
      row -= dir[currDir][0];
      col -= dir[currDir][1];
      if (currDir == "ltr") currDir = "ttb";
      else if (currDir == "ttb") currDir = "rtl";
      else if (currDir == "rtl") currDir = "btt";
      else currDir = "ltr";
      row += dir[currDir][0];
      col += dir[currDir][1];
    }
    array[row][col] = i;
  }
  return array;
};

/*60. Permutation Sequence

The set [1, 2, 3, ..., n] contains a total of n! unique permutations.
By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.
*/

let getPermutation = function (n, k) {
  let num = n;
  if (n === 1) return "1";
  let nums = [true];
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    nums[i] = true;
    fact *= i;
  }
  let result = "";
  while (n >= 1) {
    fact /= n;
    n = n - 1;
    let digit = Math.ceil(k / fact);
    for (let i = 1; i <= num; i++) {
      if (!nums[i]) continue;
      else {
        digit--;
        if (digit === 0) {
          result = result.slice(0) + i;
          nums[i] = false;
          break;
        }
      }
    }
    k = k % fact === 0 ? fact : k % fact;
  }
  return result;
};
// very fucking proud of beating 98% time and 95% space for this hard problem

/*61. Rotate List

Given the head of a linked list, rotate the list to the right by k places
*/
var rotateRight = function (head, k) {
  if (head == null || head.next == null) return head;
  let node = head;
  let length = 1;
  while (node.next !== null) {
    length++;
    node = node.next;
  }
  let n = k % length;
  if (n === 0) return head;
  let curr = head;
  let count = length - n;
  while (count > 1) {
    curr = curr.next;
    count--;
  }
  let tempNode = curr.next;
  node.next = head;
  curr.next = null;
  return tempNode;
};

/* 67. Add Binary

Given two binary strings a and b, return their sum as a binary string
 */
let addBinary = function (a, b) {
  if (a.length < b.length) {
    a = "0".repeat(b.length - a.length) + a;
  } else b = "0".repeat(a.length - b.length) + b;
  let result = "";
  let carry = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    let sum = Number(a[i]) + Number(b[i]) + carry;
    result = (sum >= 2 ? String(sum - 2) : String(sum)) + result;
    carry = sum >= 2 ? 1 : 0;
  }
  if (carry > 0) result = String(carry) + result;
  return result;
};

/*71. Simplify Path

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.
In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.
*/ var simplifyPath = function (path) {
  let stack = [];
  let splitted = path.split("/");
  for (let str of splitted) {
    if (str === "" || str === ".") continue;
    else if (str === "..") {
      stack.pop();
    } else {
      stack.push(str);
    }
  }
  const result = "/" + stack.join("/");
  return result;
};

/* 73. Set Matrix Zeroes
Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's, and return the matrix.
You must do it in place.
 */

// O(MxN) with extra space
var setZeroes = function (matrix) {
  let rows = {};
  let cols = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        if (!(i in rows)) rows[i] = true;
        if (!(j in cols)) cols[j] = true;
      }
    }
  }
  for (let key in rows) {
    for (let i = 0; i < matrix[0].length; i++) matrix[key][i] = 0;
  }
  for (let key in cols) {
    for (let i = 0; i < matrix.length; i++) matrix[i][key] = 0;
  }
};

// O(MxN) with O(1) space
// this takes more time as we have to traverse the matrix twice
let setZeroes = function (matrix) {
  let isCol = false;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] == 0) isCol = true;
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }
  for (let i = 1; i < matrix[0].length; i++) {
    if (matrix[0][i] == 0) {
      for (let j = 0; j < matrix.length; j++) matrix[j][i] = 0;
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] == 0) {
      for (let j = 0; j < matrix[0].length; j++) matrix[i][j] = 0;
    }
  }
  if (matrix[0][0] == 0) {
    for (let i = 0; i < matrix[0].length; i++) matrix[0][i] = 0;
  }
  if (isCol) {
    for (let i = 0; i < matrix.length; i++) matrix[i][0] = 0;
  }
};

/* 74. Search a 2D matrix

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
 */
var searchMatrix = function (matrix, target) {
  let rowNo = -1;
  let cols = matrix[0].length;
  for (let i = 0; i < matrix.length; i++) {
    if (target <= matrix[i][cols - 1]) {
      rowNo = i;
      break;
    }
  }
  if (rowNo == -1) return false;
  for (let i = 0; i < cols; i++) {
    if (matrix[rowNo][i] == target) return true;
  }
  return false;
};

/* 75. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function. */

var sortColors = function (nums) {
  let left = 0;
  while (left < nums.length - 1 && nums[left] === 0) left++;
  if (left === nums.length - 1) return;
  let right = nums.length - 1;
  while (right > 0 && nums[right] === 2) right--;
  if (right == 0) return;
  for (let i = left; i <= right; i++) {
    if (nums[i] == 2) {
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
      i--;
    } else if (nums[i] == 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
    }
  }
};

/*76. Minimum window substring

Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string "".
Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in s.
*/

function minWindow(s, t) {
  let windowStart = 0;
  let hashMap = {};
  let matched = 0;
  let minLength = +Infinity;
  let stringStart = 0;
  for (let i = 0; i < t.length; i++) {
    if (!hashMap[t[i]]) {
      hashMap[t[i]] = 0;
    }
    hashMap[t[i]]++;
  }
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    if (s[windowEnd] in hashMap) {
      hashMap[s[windowEnd]]--;
      if (hashMap[s[windowEnd]] === 0) matched++;
    }

    while (matched === Object.keys(hashMap).length) {
      if (s[windowStart] in hashMap) {
        hashMap[s[windowStart]]++;
        if (hashMap[s[windowStart]] === 1) {
          if (windowEnd - windowStart + 1 < minLength) {
            minLength = windowEnd - windowStart + 1;
            stringStart = windowStart;
          }
          matched--;
        }
      }
      windowStart++;
    }
  }
  return minLength === Infinity ? "" : s.slice(stringStart, minLength);
}

// console.log(minWindow("ADOBECODEBANC", "ABC"));

// 77. Combinations
/*Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].
You may return the answer in any order
*/
let combine = function (n, k) {
  let result = [];
  function recursive(i, count, arr) {
    if (count === k) {
      result.push(arr);
      return;
    }
    if (i === n + 1) return;
    recursive(i + 1, count + 1, [...arr, i]);
    recursive(i + 1, count, [...arr]);
  }
  recursive(1, 0, []);
  return result;
};
// this works, but it is not too fast

/*78. Subsets
Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.
*/

const subsets = function (nums) {
  let result = [[]];
  for (let i = 0; i < nums.length; i++) {
    let length = result.length;
    for (let j = 0; j < length; j++) {
      result.push([...result[j], nums[i]]);
    }
  }
  return result;
};

/*79. Word Search
Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally 
or vertically neighboring. The same letter cell may not be used more than once.
*/

var exist = function (board, word) {
  let found = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === word[0]) {
        if (word.length === 1) return true;
        backtrack(i, j, 0);
        if (found) return true;
      }
    }
  }
  return false;
  function backtrack(row, col, level) {
    if (level === word.length) {
      found = true;
      return;
    }
    if (board[row][col] === false || board[row][col] !== word[level]) return;
    let temp = board[row][col];
    board[row][col] = false;
    if (row < board.length - 1) backtrack(row + 1, col, level + 1);
    if (row > 0) backtrack(row - 1, col, level + 1);
    if (col > 0) backtrack(row, col - 1, level + 1);
    if (col < board[0].length - 1) backtrack(row, col + 1, level + 1);
    board[row][col] = temp;
  }
};

// oh yes, backtracking rocks

//80. Remove Duplicates from Sorted Array II

/* Given a sorted array nums, remove the duplicates in-place such that duplicates appeared at most twice and return the new length.
Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.
 */

let removeDuplicates = function (nums) {
  if (nums.length <= 2) return nums.length;
  let left = nums[0] == nums[1] ? 2 : 1;
  let right = left;
  while (right < nums.length) {
    if (nums[right] !== nums[right - 1]) {
      if (right < nums.length - 1 && nums[right] === nums[right + 1]) {
        nums[left++] = nums[right++];
        left++;
        nums[left++] = nums[right++];
      } else nums[left++] = nums[right++];
    } else right++;
  }
  return left;
};

/* 82. Remove Duplicates from Sorted List II

Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well. */

var deleteDuplicates = function (head) {
  if (head === null || head.next === null) return head;
  let left = new ListNode(101);
  let middle = head;
  let right = head.next;
  let prev = left;
  let copyHead = prev;
  while (middle) {
    if (
      left.val !== middle.val &&
      (right === null || middle.val !== right.val)
    ) {
      prev.next = middle;
      prev = middle;
    }
    left = middle;
    middle = right;
    right = right === null ? null : right.next;
  }
  prev.next = null;
  return copyHead.next;
};

// 83. Remove Duplicates from sorted List

function deleteDuplicates(head) {
  if (head == null) return null;
  let prevNode = head;
  let node = head.next;
  while (node) {
    if (node.val == prevNode.val) {
      prevNode.next = node.next;
      node = node.next;
    } else {
      prevNode = node;
      node = node.next;
    }
  }
  return head;
}

/* 84. Largest Rectangle in Histogram

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
 */

// DP solution, still too slow for very large inputs
var largestRectangleArea = function (heights) {
  let dp = Array(heights.length).fill(0);
  dp[0] = [...Array(heights[0] + 1).keys()];
  let maxArea = heights[0];
  for (let i = 1; i < heights.length; i++) {
    //dp[i] = Array(heights[i].length+1).fill(0);
    dp[i] = [...Array(heights[i] + 1).keys()];
    for (let j = 1; j < dp[i - 1].length && j < dp[i].length; j++) {
      dp[i][j] += dp[i - 1][j];
      maxArea = Math.max(maxArea, dp[i][j]);
    }
    maxArea = Math.max(maxArea, heights[i]);
  }
  return maxArea;
};

// Incomplete. Will add the montonic stack solution later.

/* 85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
 */

var maximalRectangle = function (matrix) {
  if (matrix.length == 0 || matrix[0].length == 0) return 0;
  let m = matrix.length;
  let n = matrix[0].length;
  let newMatrix = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    let temp = 0;
    for (let j = n - 1; j >= 0; j--) {
      if (matrix[i][j] == "1") {
        newMatrix[i][j] = ++temp;
      } else temp = 0;
    }
  }
  let maxArea = 0;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      let k = i;
      let min = newMatrix[i][j];
      while (k < m && newMatrix[k][j] > 0) {
        min = Math.min(min, newMatrix[k][j]);
        maxArea = Math.max(maxArea, (k - i + 1) * min);
        k++;
      }
    }
  }
  return maxArea;
};

//86. Partition List

/* Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
You should preserve the original relative order of the nodes in each of the two partitions.

 */ let partition = function (head, x) {
  let tempNode = new ListNode();
  let copy = tempNode;
  tempNode.next = head;
  let current = head;
  let parent = tempNode;
  while (current !== null) {
    if (current.val >= x) {
      parent = current;
      current = current.next;
    } else {
      if (tempNode.next == current) {
        parent = current;
        current = current.next;
        tempNode = tempNode.next;
      } else {
        let tempTempNode = tempNode.next;
        tempNode.next = current;
        parent.next = current.next;
        current.next = tempTempNode;
        tempNode = current;
        current = parent.next;
      }
    }
  }
  return copy.next;
};
/*90. Subsets II
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.
*/

let subsetsWithDup = function (nums) {
  if (nums.length === 1) return [[], [nums[0]]];
  nums.sort((a, b) => a - b);
  let result = [];
  function backTrack(index, arr) {
    if (index === nums.length) {
      result.push([...arr]);
      return;
    }
    let nextUniqueIndex = index;
    while (
      nums[nextUniqueIndex] === nums[index] &&
      nextUniqueIndex < nums.length
    ) {
      nextUniqueIndex++;
    }
    backTrack(index + 1, [...arr, nums[index]]);
    backTrack(nextUniqueIndex, [...arr]);
  }
  backTrack(0, []);
  return result;
};

/* 92. Reverse Linked List II

Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 */
var reverseBetween = function (head, left, right) {
  if (left == right || head === null || head.next === null) return head;
  let parent = new ListNode(501);
  let copyParent = parent;
  parent.next = head;
  let current = head;
  while (left > 1) {
    parent = current;
    current = current.next;
    left--;
    right--;
  }
  let copyStart = parent.next;
  let prev = null;
  while (right > 0) {
    let temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
    right--;
  }
  parent.next = prev;
  copyStart.next = current;
  return copyParent.next;
};

/* 93. Restore IP Addresses

Given a string s containing only digits, return all possible valid IP addresses that can be obtained from s. You can return them in any order.
A valid IP address consists of exactly four integers, each integer is between 0 and 255, separated by single dots and cannot have leading zeros. For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses and "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses. 

 */
var restoreIpAddresses = function (s) {
  if (s.length == 4) return [s[0] + "." + s[1] + "." + s[2] + "." + s[3]];
  let result = [];
  function backtrack(string, count, ipString) {
    if (count == 4 && string.length > 0) return;
    else if (count < 4 && string.length == 0) return;
    else if (count == 4 && string.length == 0)
      result.push(ipString.slice(0, ipString.length - 1));
    if (string.length == 0) return;

    // take one character
    backtrack(string.slice(1), count + 1, ipString + string.substr(0, 1) + ".");

    // take two character
    if (string.length < 2) return;
    if (Number(string.substr(0, 2)) < 10) return;
    else {
      backtrack(
        string.slice(2),
        count + 1,
        ipString + string.substr(0, 2) + "."
      );
    }

    if (string.length < 3) return;
    // take three characters
    if (Number(string.substr(0, 3)) > 255 || Number(string.substr(0, 3)) < 100)
      return;
    else
      backtrack(
        string.slice(3),
        count + 1,
        ipString + string.substr(0, 3) + "."
      );
  }
  backtrack(s, 0, "");
  return result;
};
//94. Binary Tree inorder Traversal
//Given the root of a binary tree, return the inorder traversal of its nodes' values.

// recursive
var inorderTraversal = function (root) {
  let result = [];
  function inOrder(node) {
    if (node === null) return;
    inOrder(node.left);
    result.push(node.val);
    inOrder(node.right);
  }
  inOrder(root);
  return result;
};

// iterative
let inorderTraversal = function (root) {
  let result = [];
  let stack = [];
  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      result.push(root.val);
      root = root.right;
    }
  }
  return result;
};

//Hello from my new Laptop

/*96. Unique Binary Search Trees
Given an integer n, return the number of structurally unique BST's (binary search trees) 
which has exactly n nodes of unique values from 1 to n.*/

//red red red red red red red red red red red red

var numTrees = function (n) {
  let G = new Array(n + 1).fill(0);
  G[0] = 1;
  G[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      G[i] += G[j - 1] * G[i - j];
    }
  }
  return G[n];
};
// We just have to arrange different no. of nodes on each side of the root node
// The value of the nodes doesn't matter. Suppose we select 4 as root node, then 1 to 3 goes to left and 5 to n goes to right

/* 100. Same Tree

Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 */

var isSameTree = function (p, q) {
  if (p === null || q === null) {
    if (p === q) return true;
    return false;
  }
  let queue1 = [p];
  let queue2 = [q];
  while (queue1.length > 0) {
    let node1 = queue1.shift();
    let node2 = queue2.shift();
    if (node1.val !== node2.val) return false;
    if (node1.left === null || node2.left === null) {
      if (node1.left !== node2.left) return false;
    } else {
      queue1.push(node1.left);
      queue2.push(node2.left);
    }
    if (node1.right === null || node2.right === null) {
      if (node1.right !== node2.right) return false;
    } else {
      queue1.push(node1.right);
      queue2.push(node2.right);
    }
  }
  return true;
};
