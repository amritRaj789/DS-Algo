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
