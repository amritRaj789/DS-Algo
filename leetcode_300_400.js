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

/* 338. Counting Bits

Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 */
let countBits = function (n) {
  let result = [];
  for (let i = 0; i <= n; i++) {
    let num = i;
    let count = 0;
    while (num > 0) {
      num = num & (num - 1);
      count++;
    }
    result.push(count);
  }
  return result;
};
/* 342. Power of Four

Given an integer n, return true if it is a power of four. Otherwise, return false.
An integer n is a power of four, if there exists an integer x such that n == 4x */

var isPowerOfFour = function (n) {
  if (n <= 0) return false;
  while (n >= 4) {
    if (n % 4) return false;
    n = Math.floor(n / 4);
  }
  if (n === 1) return true;
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

/* 345. Reverse Vowels of a String

Given a string s, reverse only all the vowels in the string and return it.
The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both cases.
 */
var reverseVowels = function (s) {
  if (s.length <= 1) return s;
  let result = "";
  let left = 0;
  let right = s.length - 1;
  let hash = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
    A: true,
    E: true,
    I: true,
    O: true,
    U: true,
  };
  let hash2 = {};
  while (left < right) {
    while (!(s[left] in hash) && left < s.length) left++;
    while (!(s[right] in hash) && right >= 0) right--;
    if (left < right) {
      hash2[left] = s[right];
      hash2[right] = s[left];
      left++;
      right--;
    }
  }
  if (!Object.keys(hash2).length) return s;
  for (let i = 0; i < s.length; i++) result += i in hash2 ? hash2[i] : s[i];
  return result;
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

/* 350. Intersection of 2 arrays II

Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
 */
var intersect = function (nums1, nums2) {
  let hash = {};
  nums1.forEach((num) => {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  });
  let result = [];
  nums2.forEach((num) => {
    if (num in hash) {
      result.push(num);
      hash[num]--;
      if (hash[num] === 0) delete hash[num];
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

/* 367. Valid Perfect Squares

Given a positive integer num, write a function which returns True if num is a perfect square else False.
Follow up: Do not use any built-in library function such as sqrt.
 */
// using Math.sqrt()
var isPerfectSquare = function (num) {
  let answer = Math.sqrt(num);
  if (
    answer >= Math.floor(answer) - 0.00001 &&
    answer <= Math.floor(answer) + 0.00001
  )
    return true;
  return false;
};

// Binary Search when using inbuit function Math.sqrt() is not allowed
var isPerfectSquare = function (num) {
  if (num < 2) return true;
  let left = 0,
    right = num,
    guessSquared;
  while (left <= right) {
    const mid = Math.floor((right + left) / 2);
    guessSquared = mid * mid;
    if (guessSquared == num) {
      return true;
    }
    if (guessSquared > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return false;
};

/* 374. Guess Number Higher or Lower

We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
You call a pre-defined API int guess(int num), which returns 3 possible results:
-1: The number I picked is lower than your guess (i.e. pick < num).
1: The number I picked is higher than your guess (i.e. pick > num).
0: The number I picked is equal to your guess (i.e. pick == num).
Return the number that I picked. */

// binary search
var guessNumber = function (n) {
  let left = 1;
  let right = n;
  let mid;
  while (left <= right) {
    mid = ~~((left + right) / 2);
    if (guess(mid) == 0) return mid;
    else if (guess(mid) == -1) right = mid - 1;
    else left = mid + 1;
  }
};

// ternary search
let guessNumber = function (n) {
  let left = 1;
  let right = n;
  let mid1;
  let mid2;
  while (left <= right) {
    mid1 = left + ~~((right - left) / 3);
    mid2 = right - ~~((right - left) / 3);
    res1 = guess(mid1);
    res2 = guess(mid2);
    if (res1 == 0) return mid1;
    if (res2 == 0) return mid2;
    else if (res1 < 0) right = mid1 - 1;
    else if (res2 > 0) left = mid2 + 1;
    else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  return -1;
};

/*375. Guess Number Higher or Lower II
We are playing the Guessing Game. The game will work as follows:
I pick a number between 1 and n.
You guess a number.
If you guess the right number, you win the game.
If you guess the wrong number, then I will tell you whether the number I picked is higher or lower, and you will continue guessing.
Every time you guess a wrong number x, you will pay x dollars. If you run out of money, you lose the game.
Given a particular n, return the minimum amount of money you need to guarantee a win regardless of what number I pick.
*/

let getMoneyAmount = function (n) {
  if (n <= 3) return n - 1;
  let dp = Array(n + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= n - 1; i++) {
    dp[i][i + 1] = i;
  }
  for (let i = 2; i <= n - 1; i++) {
    dp[i - 1][i + 1] = i;
  }
  // for length of 4 and onwards
  for (let len = 4; len <= n; len++) {
    for (let i = 1; i <= n - len + 1; i++) {
      let min = +Infinity;
      for (let j = i + 1; j < i + len - 1; j++) {
        min = Math.min(min, j + Math.max(dp[i][j - 1], dp[j + 1][i + len - 1]));
      }
      dp[i][i + len - 1] = min;
    }
  }
  return dp[1][n];
};

/* 383. Ransom Note

Given two stings ransomNote and magazine, return true if ransomNote can be constructed from magazine and false otherwise.
Each letter in magazine can only be used once in ransomNote. */

var canConstruct = function (ransomNote, magazine) {
  let hash1 = {};
  for (let char of magazine) {
    if (!(char in hash1)) hash1[char] = 0;
    hash1[char]++;
  }
  for (let char of ransomNote) {
    if (!(char in hash1) || hash1[char] === 0) return false;
    hash1[char]--;
  }
  return true;
};

/* 387. First Unique Character in a String

Given a string s, return the first non-repeating character in it and return its index. If it does not exist, return -1.
 */
var firstUniqChar = function (s) {
  let hash = {};
  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in hash)) hash[s[i]] = [0, i];
    hash[s[i]][0]++;
  }
  for (let key in hash) {
    if (hash[key][0] === 1) return hash[key][1];
  }
  return -1;
};

/* 389. Find the Difference

You are given two strings s and t.
String t is generated by random shuffling string s and then add one more letter at a random position.
Return the letter that was added to t.
 */

var findTheDifference = function (s, t) {
  let hash = {};
  for (let char of s) {
    if (!(char in hash)) hash[char] = 0;
    hash[char]++;
  }
  for (let char of t) {
    if (!(char in hash) || hash[char] === 0) return char;
    hash[char]--;
  }
};
