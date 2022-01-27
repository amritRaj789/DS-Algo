/* 2119. A number after a double reversal

Reversing an integer means to reverse all its digits.
For example, reversing 2021 gives 1202. Reversing 12300 gives 321 as the leading zeros are not retained.
Given an integer num, reverse num to get reversed1, then reverse reversed1 to get reversed2. Return true if reversed2 equals num. Otherwise return false. */
var isSameAfterReversals = function (num) {
  let num1 = num;
  let reversed1 = 0;
  while (num1) {
    reversed1 = reversed1 * 10 + (num1 % 10);
    num1 = Math.floor(num1 / 10);
  }
  let reversed2 = 0;
  while (reversed1) {
    reversed2 = reversed2 * 10 + (reversed1 % 10);
    reversed1 = Math.floor(reversed1 / 10);
  }
  return reversed2 == num;
};

// shortcut trick
let isSameAfterReversals = function (num) {
  if (num == 0) return true;
  return !(num % 10 == 0);
};

/* 2124. Check if all A's appears before all B's

Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false. */

var checkString = function (s) {
  let sAppeared = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "b") sAppeared = true;
    if (s[i] == "a" && sAppeared == true) return false;
  }
  return true;
};

/* 2134. Minimum Swaps to Group All 1's Together II

A swap is defined as taking two distinct positions in an array and swapping the values in them.
A circular array is defined as an array where we consider the first element and the last element to be adjacent.
Given a binary circular array nums, return the minimum number of swaps required to group all 1's present in the array together at any location.
 */

var minSwaps = function (nums) {
  let numOf1 = 0;
  for (let num of nums) {
    if (num) numOf1++;
  }
  if (numOf1 <= 1) return 0;
  let left = 0;
  let maxInWindow = 0;
  for (let i = 0; i < numOf1; i++) {
    if (nums[i]) maxInWindow++;
  }
  let inWindow = maxInWindow;
  for (let right = numOf1; right < nums.length; right++) {
    if (nums[right]) inWindow++;
    if (nums[left++]) inWindow--;
    maxInWindow = Math.max(maxInWindow, inWindow);
  }
  for (let right = 0; right < numOf1; right++) {
    if (nums[right]) inWindow++;
    if (nums[left++]) inWindow--;
    maxInWindow = Math.max(maxInWindow, inWindow);
  }
  return numOf1 - maxInWindow;
};

/* 2150. Find All Lonely Numbers in the Array

You are given an integer array nums. A number x is lonely when it appears only once, and no adjacent numbers (i.e. x + 1 and x - 1) appear in the array.
Return all lonely numbers in nums. You may return the answer in any order. */

// O(NlogN) time, O(N) space
var findLonely = function (nums) {
  if (nums.length == 1) return [nums[0]];
  nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i - 1] < nums[i] - 1 && nums[i + 1] > nums[i] + 1)
      result.push(nums[i]);
  }
  if (nums[1] > nums[0] + 1) result.push(nums[0]);
  if (nums[nums.length - 1] > nums[nums.length - 2] + 1)
    result.push(nums[nums.length - 1]);
  return result;
};

// O(N) time, O(N) space
let findLonely = function (nums) {
  let hash = {};
  let result = [];
  for (let num of nums) {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  }
  for (let key in hash) {
    let num = Number(key);
    if (hash[num] == 1 && !(num - 1 in hash) && !(num + 1 in hash))
      result.push(num);
  }
  return result;
};
