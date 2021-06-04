/*306. Additive Number

Additive number is a string whose digits can form additive sequence.
A valid additive sequence should contain at least three numbers. 
Except for the first two numbers, each subsequent number in the sequence 
must be the sum of the preceding two.
*/
let isAdditiveNumber = function (num) {
  if (num.length < 3) return false;
  let found = false;
  function backtrack(index, count, n1, n2) {
    if (found) return;
    if (index === num.length) {
      if (count < 3) return;
      found = true;
      return;
    }
    if (num[index] !== "0") {
      for (let i = 1; i <= num.length - index; i++) {
        let temp = Number(num.substr(index, i));
        if (count < 2) backtrack(index + i, count + 1, n2, temp);
        else if (n1 + n2 === temp) backtrack(index + i, count + 1, n2, temp);
      }
    } else {
      if (count < 2) backtrack(index + 1, count + 1, n2, 0);
      else if (n1 + n2 === 0) backtrack(index + 1, count + 1, n2, 0);
    }
  }
  backtrack(0, 0, 0, 0);
  return found;
};
// this absolutely works but the runtime is slow. like very slow. how do we optimize it?

//334. Increasing Triplet Subsequence

/*Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. 
If no such indices exists, return false.*/

// yay I did it, I came up with O(N) t and O(1) s solution
let increasingTriplet = function (nums) {
  if (nums.length < 3) return false;
  let minTillNow = nums[0];
  let secMinTillNow = +Infinity;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > minTillNow) {
      if (nums[i] > secMinTillNow) return true;
      secMinTillNow = Math.min(secMinTillNow, nums[i]);
    } else minTillNow = nums[i];
  }
  return false;
};

/* 344. Reverse String

Write a function that reverses a string. The input string is given as an array of characters screen. */

let reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};

/* 349. Intersection of 2 arrays
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order. */

let intersection = function (nums1, nums2) {
  let set1 = new Set();
  let result = [];
  nums1.forEach((num) => set1.add(num));
  nums2.forEach((num) => {
    if (set1.has(num)) {
      result.push(num);
      set1.delete(num);
    }
  });
  return result;
};
//357. Count Numbers With Unique Digits
//Given an integer n, return the count of all numbers with unique digits, x, where 0 <= x < 10n.

var countNumbersWithUniqueDigits = function (n) {
  if (n <= 1) return 10 ** n;
  let dp = 10;
  for (let i = 2; i <= n; i++) {
    let p = 9;
    for (let j = 9; j >= 11 - i; j--) {
      p *= j;
    }
    dp = p + dp;
  }
  return dp;
};
