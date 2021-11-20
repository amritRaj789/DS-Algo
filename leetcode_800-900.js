//812. Largest Triangle Area

/* Given an array of points on the X-Y plane points where points[i] = [xi, yi], return the area of the largest triangle that can be formed by any three different points. Answers within 10-5 of the actual answer will be accepted.
 */

// Brute force solution only but still effing Google, GManSachs asked it
var largestTriangleArea = function (points) {
  let max = -1;
  for (let i = 0; i < points.length - 2; i++) {
    let [x1, y1] = points[i];
    for (let j = i + 1; j < points.length - 1; j++) {
      let [x2, y2] = points[j];
      for (let k = j + 1; k < points.length; k++) {
        let [x3, y3] = points[k];
        let area =
          Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) * 0.5;
        max = Math.max(max, area);
      }
    }
  }
  return max;
};

//819. Most Common Word

/* Given a string paragraph and a string array of the banned words banned, return the most frequent word that is not banned. It is guaranteed there is at least one word that is not banned, and that the answer is unique.
The words in paragraph are case-insensitive and the answer should be returned in lowercase.
 */
var mostCommonWord = function (paragraph, banned) {
  paragraph = paragraph.toLowerCase();
  let hash = {};
  let bannedHash = {};
  banned.forEach((str) => (bannedHash[str] = 1));
  let max = 0;
  let maxWord = "";
  let char = "";
  for (let i = 0; i < paragraph.length; i++) {
    if (paragraph.charCodeAt(i) >= 97 && paragraph.charCodeAt(i) <= 122)
      char += paragraph[i];
    else if (char !== "") {
      if (!(char in bannedHash)) {
        if (!(char in hash)) hash[char] = 0;
        hash[char]++;
        if (hash[char] > max) {
          max = hash[char];
          maxWord = char;
        }
      }
      char = "";
    }
  }
  if (char !== "") {
    if (!(char in bannedHash)) {
      if (!(char in hash)) hash[char] = 0;
      hash[char]++;
      if (hash[char] > max) {
        max = hash[char];
        maxWord = char;
      }
    }
  }
  return maxWord;
};

// O(N+M), O(N+M)

//821. Shortest Distance to a character
/* Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the distance from index i to the closest occurrence of character c in s.
The distance between two indices i and j is abs(i - j), where abs is the absolute value function.
 */
let shortestToChar = function (s, c) {
  let array = Array(s.length).fill(0);
  let right = +Infinity;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] == c) {
      right = i;
    }
    array[i] = right - i;
  }
  let left = -Infinity;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == c) {
      left = i;
    }
    array[i] = Math.min(array[i], i - left);
  }
  return array;
};

//824. Goat Latin

/* You are given a string sentence that consist of words separated by spaces. Each word consists of lowercase and uppercase letters only.
We would like to convert the sentence to "Goat Latin" (a made-up language similar
 */
var toGoatLatin = function (sentence) {
  let word = "";
  let result = "";
  let vowel = { a: 1, e: 1, i: 1, o: 1, u: 1, A: 1, E: 1, I: 1, O: 1, U: 1 };
  let startWithVowel = Boolean(sentence[0] in vowel);
  let wordCount = 0;
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] !== " ") {
      word += sentence[i];
    } else {
      if (!startWithVowel) word = word.slice(1) + word[0];
      word += "ma";
      word += "a".repeat(++wordCount);
      result += word + " ";
      startWithVowel = Boolean(sentence[i + 1] in vowel);
      word = "";
    }
  }
  if (!startWithVowel) word = word.slice(1) + word[0];
  word += "ma";
  word += "a".repeat(++wordCount);
  result += word;
  return result;
};

//830. Positions of Large Groups

/* In a string s of lowercase letters, these letters form consecutive groups of the same character.
For example, a string like s = "abbxxxxzyy" has the groups "a", "bb", "xxxx", "z", and "yy".
A group is identified by an interval [start, end], where start and end denote the start and end indices (inclusive) of the group. In the above example, "xxxx" has the interval [3,6].
A group is considered large if it has 3 or more characters.
Return the intervals of every large group sorted in increasing order by start index.
 */

var largeGroupPositions = function (s) {
  let result = [];
  let start = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] !== s[i + 1]) {
      if (i - start >= 2) {
        result.push([start, i]);
      }
      start = i + 1;
    }
  }
  if (s.length - start >= 3) result.push([start, s.length - 1]);
  return result;
};

/*842. Split Array into Fibonacci Sequence

Given a string S of digits, such as S = "123456579", we can split it into a Fibonacci-like sequence [123, 456, 579].
Return any Fibonacci-like sequence split from S, or return [] if it cannot be done
*/
var splitIntoFibonacci = function (S) {
  if (S.length < 3) return [];
  let result = [];
  function backtrack(index, f1, f2, arr) {
    if (result.length > 0) return;
    if (index === S.length) {
      if (arr.length < 3) return;
      result.push(...arr);
      return;
    }
    if (S[index] !== "0") {
      for (let i = 1; i <= S.length - index; i++) {
        let temp = Number(S.substr(index, i));
        if (temp > 2 ** 31 - 1) break;
        if (arr.length < 2) backtrack(index + i, f2, temp, [...arr, temp]);
        else if (f1 + f2 == temp)
          backtrack(index + i, f2, temp, [...arr, temp]);
      }
    } else {
      if (arr.length < 2) backtrack(index + 1, f2, 0, [...arr, 0]);
      else if (f1 + f2 === 0) backtrack(index + 1, f2, 0, [...arr, 0]);
    }
  }
  backtrack(0, 0, 0, []);
  return result;
};

// 876. Middle of the Linked List
// Given a non-empty, singly linked list with head node, return a middle node of linked list.
// If there are two middle nodes, return the second middle node.

function middleNode(head) {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

/*877. Stone Game

Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, 
and each pile has a positive integer number of stones piles[i].
The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.
Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of 
stones from either the beginning or the end of the row.  This continues until there are no more piles left, 
at which point the person with the most stones wins.
Assuming Alex and Lee play optimally, return True if and only if Alex wins the game.
*/

// dynamic programming approach
let stoneGame = function (piles) {
  let dp = Array(piles.length)
    .fill(null)
    .map(() => Array(piles.length).fill([0, 0]));
  for (let i = 0; i < piles.length; i++) {
    dp[i][i] = [piles[i], 0];
  }
  for (let i = 2; i <= piles.length; i++) {
    for (let j = 0; j <= piles.length - i; j++) {
      let val1 = piles[j] + dp[j + 1][j + i - 1][1];
      let val2 = piles[j + i - 1] + dp[j][j + i - 2][1];
      dp[j][j + i - 1] =
        val1 > val2
          ? [val1, dp[j + 1][j + i - 1][0]]
          : [val2, dp[j][j + i - 2][0]];
    }
  }
  return dp[0][piles.length - 1][0] > dp[0][piles.length - 1][1];
};

//maths solution . try to see here that no matter what the first player (Alex) always wins
let stoneGame = function (piles) {
  return true;
};
