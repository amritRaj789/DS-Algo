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

//832. Flipping an Image

/* Given an n x n binary matrix image, flip the image horizontally, then invert it, and return the resulting image.
To flip an image horizontally means that each row of the image is reversed.
 */
let flipAndInvertImage = function (image) {
  let row = image.length;
  let col = image[0].length;
  let result = Array(row)
    .fill(0)
    .map(() => Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = col - 1; j >= 0; j--) {
      result[i][col - 1 - j] = !image[i][j];
    }
  }
  return result;
};

//836. Rectangle Overlap

/* An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) is the coordinate of its bottom-left corner, and (x2, y2) is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.
Two rectangles overlap if the area of their intersection is positive. To be clear, two rectangles that only touch at the corner or edges do not overlap.
Given two axis-aligned rectangles rec1 and rec2, return true if they overlap, otherwise return false.
 */
let isRectangleOverlap = function (rec1, rec2) {
  // take reference rectangle as R1
  // Case 1: Rec2 is to the left of R1
  if (rec2[2] <= rec1[0]) return false;
  // Case 2: Rec2 is to the right of R1
  else if (rec2[0] >= rec1[2]) return false;
  // Case 3 : Rec2 is to the top of R1
  else if (rec2[1] >= rec1[3]) return false;
  // Case 4 : Rec2 is to the bottom of R1
  else if (rec2[3] <= rec1[1]) return false;
  return true;
};

// Same code, shorter version
let isRectangleOverlap = function (rec1, rec2) {
  if (
    rec2[2] <= rec1[0] ||
    rec2[0] >= rec1[2] ||
    rec2[1] >= rec1[3] ||
    rec2[3] <= rec1[1]
  )
    return false;
  return true;
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

//844. Backspace String Compare

/* Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
Note that after backspacing an empty text, the text will continue empty.
 */

var backspaceCompare = function (s, t) {
  let stack1 = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "#") {
      if (stack1.length) stack1.pop();
    } else stack1.push(s[i]);
  }
  let stack2 = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] == "#") {
      if (stack2.length) stack2.pop();
    } else stack2.push(t[i]);
  }
  if (stack1.length !== stack2.length) return false;
  for (let i = 0; i < stack1.length; i++) {
    if (stack1[i] !== stack2[i]) return false;
  }
  return true;
};

//852. Peak Index in a Mountain Array

/* Let's call an array arr a mountain if the following properties hold:
arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... arr[i-1] < arr[i]
arr[i] > arr[i+1] > ... > arr[arr.length - 1]
Find the index of the peak element of the mountain. It is guaranteed there is a peak
 */
// O(n) solution
var peakIndexInMountainArray = function (arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) return i;
  }
};

// O(log(n))
let peakIndexInMountainArray = function (arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left < right) {
    mid = ~~((left + right) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
};

//859. Buddy Strings

//Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.

var buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false;
  let hash = {};
  let count = 0;
  let index1 = -1;
  let index2 = -1;
  let hasRepeat = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      count++;
      if (count > 2) return false;
      if (index1 == -1) index1 = i;
      else index2 = i;
    }
    if (!(s[i] in hash)) hash[s[i]] = 0;
    else hasRepeat = true;
  }
  if (count == 0) {
    if (hasRepeat) return true;
    return false;
  }
  if (count == 1) return false;
  if (s[index1] == goal[index2] && s[index2] == goal[index1]) return true;
  return false;
};

//860 Lemonade Change

/* At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you, and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
Note that you don't have any change in hand at first.
Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with correct change, or false otherwise.
 */

let lemonadeChange = function (bills) {
  let count5 = 0;
  let count10 = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i] == 5) count5++;
    else if (bills[i] == 10) {
      if (count5 > 0) count5--;
      else return false;
      count10++;
    } else {
      if (count10 > 0 && count5 > 0) {
        count10--;
        count5--;
      } else if (count5 > 2) {
        count5 -= 3;
      } else return false;
    }
  }
  return true;
};

//867. Transpose a Matrix

/* Given a 2D integer array matrix, return the transpose of matrix.
The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.
 */
var transpose = function (matrix) {
  let newMatrix = Array(matrix[0].length)
    .fill(0)
    .map(() => Array(matrix.length));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      newMatrix[j][i] = matrix[i][j];
    }
  }
  return newMatrix;
};

//872. Leaf-Similar Trees

/* Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.
Two binary trees are considered leaf-similar if their leaf value sequence is the same.
Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.
 */
// DFS
var leafSimilar = function (root1, root2) {
  let stack1 = [];
  let stack2 = [];
  function traverse(node, stack) {
    if (node.left == null && node.right == null) {
      stack.push(node.val);
    }
    if (node.left != null) traverse(node.left, stack);
    if (node.right != null) traverse(node.right, stack);
  }
  traverse(root1, stack1);
  traverse(root2, stack2);
  if (stack1.length !== stack2.length) return false;
  for (let i = 0; i < stack1.length; i++) {
    if (stack1[i] !== stack2[i]) return false;
  }
  return true;
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

//883. Projection Area of 3D shapes

/* You are given an n x n grid where we place some 1 x 1 x 1 cubes that are axis-aligned with the x, y, and z axes.
Each value v = grid[i][j] represents a tower of v cubes placed on top of the cell (i, j).
We view the projection of these cubes onto the xy, yz, and zx planes.
Return the total area of all three projections.
 */
var projectionArea = function (grid) {
  let n = grid.length;
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  for (let i = 0; i < n; i++) {
    let max1 = 0;
    let max2 = 0;
    for (let j = 0; j < n; j++) {
      p1 += grid[i][j] === 0 ? 0 : 1;
      max1 = Math.max(max1, grid[i][j]);
      max2 = Math.max(max2, grid[j][i]);
    }
    p2 += max1;
    p3 += max2;
  }
  return p1 + p2 + p3;
};

//884. Uncommon Words From Two sentences

/* A sentence is a string of single-space separated words where each word consists only of lowercase letters.
A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.
Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order. */

var uncommonFromSentences = function (s1, s2) {
  let result = [];
  let hash = {};
  let word = "";
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== " ") word += s1[i];
    else {
      if (!(word in hash)) hash[word] = 0;
      hash[word]++;
      word = "";
    }
  }
  if (!(word in hash)) hash[word] = 0;
  hash[word]++;
  word = "";
  for (let i = 0; i < s2.length; i++) {
    if (s2[i] !== " ") word += s2[i];
    else {
      if (!(word in hash)) hash[word] = 0;
      hash[word]++;
      word = "";
    }
  }
  if (!(word in hash)) hash[word] = 0;
  hash[word]++;

  for (let key in hash) {
    if (hash[key] == 1) result.push(key);
  }
  return result;
};

// using built-in JS methods to make life a lil easier, but reduces efficiency
let uncommonFromSentences = function (s1, s2) {
  let hash = {};
  let array = [...s1.split(" "), ...s2.split(" ")];
  for (let word of array) {
    if (!(word in hash)) hash[word] = 0;
    hash[word]++;
  }
  return Object.keys(hash).filter((key) => hash[key] === 1);
};

//888. Fair Candy Swap

/* Alice and Bob have a different total number of candies. You are given two integer arrays aliceSizes and bobSizes where aliceSizes[i] is the number of candies of the ith box of candy that Alice has and bobSizes[j] is the number of candies of the jth box of candy that Bob has.
Return an integer array answer where answer[0] is the number of candies in the box that Alice must exchange, and answer[1] is the number of candies in the box that Bob must exchange. If there are multiple answers, you may return any one of them. It is guaranteed that at least one answer exists.
 */
let fairCandySwap = function (aliceSizes, bobSizes) {
  let set = new Set(aliceSizes);
  let aliceTotal = aliceSizes.reduce((a, b) => a + b);
  let bobTotal = bobSizes.reduce((a, b) => a + b);
  for (let val of bobSizes) {
    if (set.has(val - (bobTotal - aliceTotal) / 2))
      return [val - (bobTotal - aliceTotal) / 2, val];
  }
};

//892. Surface Area of 3D Shapes

/* You are given an n x n grid where you have placed some 1 x 1 x 1 cubes. Each value v = grid[i][j] represents a tower of v cubes placed on top of cell (i, j).
After placing these cubes, you have decided to glue any directly adjacent cubes to each other, forming several irregular 3D shapes.
Return the total surface area of the resulting shapes.
 */
var surfaceArea = function (grid) {
  let surfaceArea = 0;
  let n = grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 0) continue;
      surfaceArea += grid[i][j] * 4 + 2;
      if (j > 0) {
        surfaceArea -= 2 * Math.min(grid[i][j], grid[i][j - 1]);
      }
      if (i > 0) {
        surfaceArea -= 2 * Math.min(grid[i][j], grid[i - 1][j]);
      }
    }
  }
  return surfaceArea;
};
