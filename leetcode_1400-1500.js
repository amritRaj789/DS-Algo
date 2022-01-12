var maxScore = function (cardPoints, k) {
  let totalSum = 0;
  let sum = 0;
  let length = cardPoints.length;
  for (let i = 0; i < length; i++) {
    totalSum += cardPoints[i];
    if (i < length - k) {
      sum += cardPoints[i];
    }
  }
  let minSumWindow = sum;
  for (i = length - k; i < length; i++) {
    sum += cardPoints[i];
    sum -= cardPoints[i - length + k];
    minSumWindow = Math.min(minSumWindow, sum);
  }
  return totalSum - minSumWindow;
};
// this is the greedy approach which has O(@N) time

let maxScore = function (cardPoints, k) {
  let dpStart = Array(k + 1).fill(0);
  let dpEnd = Array(k + 1).fill(0);
  for (let i = 0; i < k; i++) {
    dpStart[i + 1] = dpStart[i] + cardPoints[i];
  }
  let max = dpStart[k];
  for (let i = 1; i <= k; i++) {
    dpEnd[i] = dpEnd[i - 1] + cardPoints[cardPoints.length - i];
    max = Math.max(max, dpEnd[i] + dpStart[k - i]);
  }
  return max;
};
//this is dynamic programming with O(2K) time

/* 1408. String Matching in an Array

Given an array of string words. Return all strings in words which is substring of another word in any order. 
String words[i] is substring of words[j], if can be obtained removing some characters to left and/or right side of words[j].
 */
var stringMatching = function (words) {
  let result = [];
  words.sort((a, b) => a.length - b.length);
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (words[j].includes(words[i])) {
        result.push(words[i]);
        break;
      }
    }
  }
  return result;
};

/* 1417. Reformat the String

You are given an alphanumeric string s. (Alphanumeric string is a string consisting of lowercase English letters and digits).
You have to find a permutation of the string where no letter is followed by another letter and no digit is followed by another digit. That is, no two adjacent characters have the same type.
Return the reformatted string or return an empty string if it is impossible to reformat the string.
 */
var reformat = function (s) {
  let digits = [];
  let number = [];
  let result = "";
  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);
    if (code >= 48 && code <= 57) number.push(i);
    else digits.push(i);
  }
  if (digits.length != number.length) {
    if (Math.abs(digits.length - number.length) !== 1) return "";
    if (digits.length > number.length) {
      for (let i = 0; i < number.length; i++) {
        result += s[digits[i]];
        result += s[number[i]];
      }
      result += s[digits[digits.length - 1]];
    } else {
      for (let i = 0; i < digits.length; i++) {
        result += s[number[i]];
        result += s[digits[i]];
      }
      result += s[number[number.length - 1]];
    }
    return result;
  }
  for (let i = 0; i < digits.length; i++) {
    result += s[digits[i]];
    result += s[number[i]];
  }
  return result;
};

/* 1461. Check If a string contains all binary codes of size k

Given a binary string s and an integer k.
Return true if every binary code of length k is a substring of s. Otherwise, return false.
 */

let hasAllCodes = function (s, k) {
  if (s.length < k + 2 ** k - 1) return false;
  let uniqueStrings = {};
  let count = 0;
  for (let i = 0; i <= s.length - k; i++) {
    let string = s.substr(i, k);
    if (!(string in uniqueStrings)) {
      uniqueStrings[string] = 0;
      count++;
    }
    if (2 ** k - count > s.length - k - i) return false;
  }
  return true;
};
