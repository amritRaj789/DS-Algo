/* 1545. Find Kth Bit in Nth Binary String

Given two positive integers n and k, the binary string Sn is formed as follows:
S1 = "0"
Si = Si - 1 + "1" + reverse(invert(Si - 1)) for i > 1
Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).
For example, the first four strings in the above sequence are:
S1 = "0"
S2 = "011"
S3 = "0111001"
S4 = "011100110110001"
Return the kth bit in Sn. It is guaranteed that k is valid for the given n.
 */

var findKthBit = function (n, k) {
  function reverse(s) {
    let result = "";
    for (let char of s) {
      result = char + result;
    }
    return result;
  }
  function invert(s) {
    let result = "";
    for (let char of s) {
      if (char == "0") result += "1";
      else result += "0";
    }
    return result;
  }
  let string = "0";
  for (let i = 2; i <= n; i++) {
    string = string.slice(0) + "1" + reverse(invert(string.slice(0)));
  }
  return string[k - 1];
};

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
