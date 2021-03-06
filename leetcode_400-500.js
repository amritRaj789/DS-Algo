/*401. Binary Watch

A binary watch has 4 LEDs on the top which represent the hours (0-11), 
and the 6 LEDs on the bottom represent the minutes (0-59). 
Each LED represents a zero or one, with the least significant bit on the right.
*/
let readBinaryWatch = function (turnedOn) {
  if (turnedOn > 8) return [];
  let result = [];
  let minute = [1, 2, 4, 8, 16, 32];
  let hoursPossible = [
    ["0:"],
    ["1:", "2:", "4:", "8:"],
    ["3:", "5:", "6:", "9:", "10:"],
    ["7:", "11:"],
  ];
  let minutesPossible = Array(6).fill([]);
  for (let i = 0; i < 6; i++) {
    minutesPossible[i] = [];
  }
  minutesPossible[0] = ["00"];
  function makeMinutes(count, index, total) {
    if (index === minute.length) return;
    let minutes = total + minute[index];
    if (minutes < 60) {
      if (minutes >= 10) minutesPossible[count + 1].push(String(minutes));
      else minutesPossible[count + 1].push("0" + minutes);
      makeMinutes(count + 1, index + 1, minutes);
    }
    makeMinutes(count, index + 1, total);
  }
  makeMinutes(0, 0, 0);
  for (let i = 0; i <= turnedOn && i < 3; i++) {
    for (let j = 0; j < hoursPossible[i].length; j++) {
      if (turnedOn - i > 5) break;
      for (let k = 0; k < minutesPossible[turnedOn - i].length; k++) {
        result.push(hoursPossible[i][j] + minutesPossible[turnedOn - i][k]);
      }
    }
  }
  return result;
};

/* 404. Sum of left leaves

Given the root of a binary tree, return the sum of all left leaves
 */

var sumOfLeftLeaves = function (root) {
  let sum = 0;
  function dfs(node) {
    if (node.left !== null) {
      if (node.left.left === null && node.left.right === null)
        sum += node.left.val;
      else dfs(node.left);
    }
    if (node.right !== null) dfs(node.right);
  }
  dfs(root);
  return sum;
};

let sumOfLeftLeaves = function (root) {
  let sum = 0;
  function dfs(node, string) {
    if (!node.left && !node.right && string === "left") sum += node.val;
    if (node.left) dfs(node.left, "left");
    if (node.right) dfs(node.right, "right");
  }
  dfs(root, "right");
  return sum;
};

/* 409. Longest Palindrome

Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
Letters are case sensitive, for example, "Aa" is not considered a palindrome here. */

var longestPalindrome = function (s) {
  let hash = {};
  for (let char of s) {
    if (!(char in hash)) hash[char] = 0;
    hash[char]++;
  }
  let pair = 0;
  for (let key in hash) {
    pair += Math.floor(hash[key] / 2);
  }
  return 2 * pair + (s.length > 2 * pair ? 1 : 0);
};

/* 412. Fizz Buzz

Given an integer n, return a string array answer (1-indexed) where:
answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i if non of the above conditions are true
 */

var fizzBuzz = function (n) {
  let array = Array(n)
    .fill(0)
    .map((element, i) => {
      if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0) return "FizzBuzz";
      if ((i + 1) % 3 === 0) return "Fizz";
      if ((i + 1) % 5 === 0) return "Buzz";
      return String(i + 1);
    });
  return array;
};

let fizzBuzz = function (n) {
  let array = Array(n).fill("");
  for (let i = 0; i < n; i++) {
    if ((i + 1) % 3 === 0) array[i] += "Fizz";
    if ((i + 1) % 5 === 0) array[i] += "Buzz";
    if (!array[i]) array[i] = String(i + 1);
  }
  return array;
};

/* 415. Add Strings

Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.
You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

 */
var addStrings = function (num1, num2) {
  let result = "";
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  while (i >= 0 || j >= 0) {
    n1 = i >= 0 ? Number(num1[i]) : 0;
    n2 = j >= 0 ? Number(num2[j]) : 0;
    sum = n1 + n2 + carry;
    if (sum > 9) {
      sum = sum - 10;
      carry = 1;
    } else carry = 0;
    result = String(sum) + result;

    i--;
    j--;
  }
  if (carry) result = String(carry) + result;
  return result;
};

/* 434. Number of Segments in a String

You are given a string s, return the number of segments in the string. 
A segment is defined to be a contiguous sequence of non-space characters.
 */

let countSegments = function (s) {
  if (s === "") return 0;
  let segments = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === " " && s[i - 1] !== " ") segments++;
  }
  if (s[s.length - 1] !== " ") segments++;
  return segments;
};

/*435. 
Non-overlapping intervals
Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
*/ var eraseOverlapIntervals = function (intervals) {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  let end = intervals[0][1];
  let count = 0;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      if (end >= intervals[i][1]) {
        count++;
        end = intervals[i][1];
      } else {
        count++;
      }
    } else {
      end = intervals[i][1];
    }
  }
  return count;
};

// I copied this solution from an user. Still got a little understanding to do
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let n = intervals.length;
  let res = 0;
  let i = n - 1;
  while (i > 0) {
    let j = i - 1;
    while (j >= 0 && intervals[j][1] > intervals[i][0]) {
      res++;
      j--;
    }
    i = j;
  }
  return res;
};

/*
436. Find Right Interval

You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.
The right interval for an interval i is an interval j such that startj >= endi and startj is minimized.
Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.
*/

var findRightInterval = function (intervals) {
  let hash = {};
  for (let i = 0; i < intervals.length; i++) {
    hash[intervals[i][0]] = i;
  }
  let result = new Array(intervals.length).fill(-1);
  let startSorted = intervals
    .map((interval) => interval)
    .sort((a, b) => a[0] - b[0]); //sorting the start values in ascending order
  let endSorted = intervals
    .map((interval) => interval)
    .sort((a, b) => a[1] - b[1]); //sorting the end values in ascending order
  let i = 0; // startSorted index
  let j = 0; // endSorted index
  for (j = 0; j < intervals.length; j++) {
    while (i < intervals.length) {
      if (startSorted[i][0] >= endSorted[j][1]) {
        result[hash[endSorted[j][0]]] = hash[startSorted[i][0]];
        break;
      }
      i++;
    }
    if (i === intervals.length) break;
  }
  return result;
};
//O(2N

// Alternate method, if we don't want to store the indices in a hash but store it in the 2 sorted arrays
var findRightInterval = function (intervals) {
  let result = new Array(intervals.length).fill(-1);
  let startSorted = intervals
    .map((interval, i) => [...interval, i])
    .sort((a, b) => a[0] - b[0]); //sorting the start values in ascending order
  let endSorted = intervals
    .map((interval, i) => [...interval, i])
    .sort((a, b) => a[1] - b[1]); //sorting the end values in ascending order
  let i = 0;
  for (let j = 0; j < intervals.length; j++) {
    while (i < intervals.length) {
      if (startSorted[i][0] >= endSorted[j][1]) {
        result[endSorted[j][2]] = startSorted[i][2];
        break;
      }
      i++;
    }
    if (i === intervals.length) break;
  }
  return result;
};

/* 441. Arranging Coins

You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.
Given the integer n, return the number of complete rows of the staircase you will build.
 */

var arrangeCoins = function (n) {
  if (n === 1) return 1;
  let prev = 0;
  let curr = 0;
  for (let i = 1; i <= n; i++) {
    curr = (i * (i + 1)) / 2;
    if (curr > n) return prev;
    prev = i;
  }
};

/* 455. Assign Cookies

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.
Each chid i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.
 */
var findContentChildren = function (g, s) {
  let satisfied = 0;
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let greed = 0;
  let size = 0;
  while (greed < g.length && size < s.length) {
    if (g[greed] <= s[size]) {
      satisfied++;
      greed++;
      size++;
    } else size++;
  }
  return satisfied;
};

//457. Circular Array Loop

/* 
You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i:
If nums[i] is positive, move nums[i] steps forward, and
If nums[i] is negative, move nums[i] steps backward.
Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.
A cycle in the array consists of a sequence of indices seq of length k where:
Following the movement rules above results in the repeating index sequence seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ..
Every nums[seq[j]] is either all positive or all negative.
k > 1
Return true if there is a cycle in nums, or false otherwise. */

function circularArrayLoop(arr) {
  for (i = 0; i < arr.length; i++) {
    isForward = arr[i] >= 0; // if we are moving forward or not
    let slow = i,
      fast = i;
    while (true) {
      slow = find_next_index(arr, isForward, slow);
      fast = find_next_index(arr, isForward, fast);
      if (fast !== -1) {
        fast = find_next_index(arr, isForward, fast);
      }
      if (slow === -1 || fast === -1 || slow === fast) {
        break;
      }
    }
    if (slow !== -1 && slow === fast) {
      return true;
    }
  }
  return false;
}

function find_next_index(array, dir, pointer) {
  if (dir == true) {
    if (array[pointer] < 0) return -1;
    newIndex = (pointer + array[pointer]) % array.length;
    if (newIndex !== pointer) return newIndex;
    return -1;
  }
  if (dir == false) {
    if (array[pointer] > 0) return -1;
    newIndex = (pointer + array[pointer]) % array.length;
    if (newIndex < 0) newIndex += array.length;
    if (newIndex !== pointer) return newIndex;
    return -1;
  }
}
