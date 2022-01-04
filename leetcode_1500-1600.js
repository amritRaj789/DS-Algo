/* 1561. Maximum Number of Coins you Can get

There are 3n piles of coins of varying size, you and your friends will take piles of coins as follows:
In each step, you will choose any 3 piles of coins (not necessarily consecutive).
Of your choice, Alice will pick the pile with the maximum number of coins.
You will pick the next pile with the maximum number of coins.
Your friend Bob will pick the last pile.
Repeat until there are no more piles of coins.
 */

var maxCoins = function (piles) {
  piles.sort((a, b) => b - a);
  let max = 0;
  let count = piles.length / 3;
  for (let i = 1; i < piles.length && count > 0; i += 2) {
    max += piles[i];
    count--;
  }
  return max;
};

/* 1566. Detect Pattern of Length M Repeated K or More times

Given an array of positive integers arr, find a pattern of length m that is repeated k or more times.
A pattern is a subarray (consecutive sub-sequence) that consists of one or more values, repeated multiple times consecutively without overlapping. A pattern is defined by its length and the number of repetitions.
Return true if there exists a pattern of length m that is repeated k or more times, otherwise return false. */

var containsPattern = function (arr, m, k) {
  if (arr.length < m * k) return false;
  let str = arr.join("");
  for (let i = 0; i <= str.length - m; i++) {
    let pattern = str.slice(i, i + m);
    let count = 1;
    let j = i + m;
    while (j < str.length && j + m <= str.length) {
      if (str.slice(j, j + m) != pattern) break;
      count++;
      j += m;
      if (count == k) return true;
    }
  }
  return false;
};
