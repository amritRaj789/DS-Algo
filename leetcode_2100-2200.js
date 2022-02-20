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

/* 2180. Count Integers with Even Digit Sum
Given a positive integer num, return the number of positive integers less than or equal to num whose digit sums are even.
 */

var countEven = function (num) {
  if (num <= 1) return 0;
  let count = 0;
  function findDigitSum(n) {
    let sum = 0;
    while (n) {
      sum += n % 10;
      n = ~~(n / 10);
    }
    if (sum % 2 == 0) return true;
    return false;
  }
  for (let i = num; i >= 2; i--) {
    if (findDigitSum(i)) count++;
  }
  return count;
};

/* 2181. Merge Nodes in Between Zeroes

You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.
For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.
Return the head of the modified linked list.
 */

let mergeNodes = function (head) {
  let p1 = head;
  let copyp1 = head;
  let sum = 0;
  head = head.next;
  while (head) {
    if (head.val == 0) {
      p1 = p1.next;
      p1.val = sum;
      sum = 0;
    }
    sum += head.val;
    head = head.next;
  }
  p1.next = null;
  return copyp1.next;
};

/* 2182. Construct String with Repeat Limit

You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.
Return the lexicographically largest repeatLimitedString possible.
 */
var repeatLimitedString = function (s, repeatLimit) {
  let hash = {};
  for (let char of s) {
    if (!(char in hash)) hash[char] = 0;
    hash[char]++;
  }
  let result = "";
  loop1: for (let i = 122; i >= 97; i--) {
    let char = String.fromCharCode(i);
    if (char in hash) {
      if (hash[char] > repeatLimit) {
        result += char.repeat(repeatLimit);
        hash[char] -= repeatLimit;
        let j;
        for (j = i - 1; j >= 97; j--) {
          let char2 = String.fromCharCode(j);
          if (char2 in hash) {
            result += char2;
            hash[char2]--;
            if (hash[char2] == 0) delete hash[char2];
            i = 123;
            continue loop1;
          }
        }
        return result;
      } else {
        result += char.repeat(hash[char]);
        delete hash[char];
        i = 123;
      }
    }
  }
  return result;
};
