/*1219. Path with Maximum Gold
In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.
Return the maximum amount of gold you can collect under the conditions:
Every time you are located in a cell you will collect all the gold in that cell.
From your position, you can walk one step to the left, right, up, or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold
*/
let getMaximumGold = function (grid) {
  let visited = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(false));
  let maximumGold = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== 0) {
        visited[i][j] = true;
        backtrack(i, j, grid[i][j]);
        visited[i][j] = false;
      }
    }
  }

  function backtrack(row, col, sum) {
    maximumGold = Math.max(maximumGold, sum);
    let directions = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    for (let direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      if (
        newRow < grid.length &&
        newRow >= 0 &&
        newCol < grid[0].length &&
        newCol >= 0
      ) {
        if (!visited[newRow][newCol] && grid[newRow][newCol] !== 0) {
          visited[newRow][newCol] = true;
          backtrack(newRow, newCol, sum + grid[newRow][newCol]);
          visited[newRow][newCol] = false;
        }
      }
    }
  }

  return maximumGold;
};

/* 1221. Split a String in balanced strings
Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
Given a balanced string s, split it into some number of substrings such that:
Each substring is balanced.
Return the maximum number of balanced strings you can obtain.
*/

var balancedStringSplit = function(s) {
    if(s.length%2) return 0;
    let count = 0;
    let LCount = 0;
    let RCount = 0;
    let found = -1;
    for(let i = 0; i < s.length; i++){
        if(s[i] == 'L') LCount++;
        else RCount++;
        if(LCount == RCount){
            count++;
            LCount = RCount = 0;
            found = i;
        }
    }
    return (found != s.length-1 ? 0 : count)
};


/* 1233. Remove Sub-folders from the filesystem

Given a list of folders, remove all sub-folders in those folders and return in any order the folders after removing.
If a folder[i] is located within another folder[j], it is called a sub-folder of it.
The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, /leetcode and /leetcode/problems are valid paths while an empty string and / are not.
 */
var removeSubfolders = function (folder) {
  folder.sort();
  let result = [folder[0]];
  let current = folder[0];
  for (let i = 1; i < folder.length; i++) {
    if (folder[i].startsWith(current + "/")) continue;
    result.push(folder[i]);
    current = folder[i];
  }
  return result;
};

/* 1249. Minimum remove to make valid parentheses

Given a string s of '(' , ')' and lowercase English characters.
Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string
 */

var minRemoveToMakeValid = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") stack.push(["(", i]);
    else if (s[i] == ")") {
      if (stack.length && stack[stack.length - 1][0] == "(") stack.pop();
      else stack.push([")", i]);
    }
  }
  let indices = stack.map((element) => element[1]);
  let p1 = 0;
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (i !== indices[p1]) result += s[i];
    else p1++;
  }
  return result;
};

/* 1266. Minimum Time Visiting All points

On a 2D plane, there are n points with integer coordinates points[i] = [xi, yi]. Return the minimum time in seconds to visit all the points in the order given by points.
 */
var minTimeToVisitAllPoints = function (points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += Math.max(
      Math.abs(points[i][0] - points[i - 1][0]),
      Math.abs(points[i][1] - points[i - 1][1])
    );
  }
  return result;
};

/* 1275. Find Winner of a Tic Tac Toe Game

Tic-tac-toe is played by two players A and B on a 3 x 3 grid. The rules of Tic-Tac-Toe are:
Find the winner
 */
var tictactoe = function (moves) {
  if (moves.length <= 4) return "Pending";
  let grid = Array(3)
    .fill(0)
    .map(() => Array(3).fill(false));
  for (let i = moves.length - 1; i >= 0; i -= 2) {
    let [row, col] = moves[i];
    grid[row][col] = true;
  }
  function check(r, c) {
    // check row
    if (grid[r][0] && grid[r][1] && grid[r][2]) return true;
    // check column
    if (grid[0][c] && grid[1][c] && grid[2][c]) return true;
    // check diagonal
    if (grid[0][0] && grid[1][1] && grid[2][2]) return true;
    if (grid[0][2] && grid[1][1] && grid[2][0]) return true;
    return false;
  }
  let [row, col] = moves[moves.length - 1];
  if (!check(row, col)) {
    if (moves.length == 9) return "Draw";
    return "Pending";
  }
  return moves.length % 2 ? "A" : "B";
};

/*1288 Remove Covered Intervals

Given a list of intervals, remove all intervals that are covered by another interval in the list.
Interval [a,b) is covered by interval [c,d) if and only if c <= a and b <= d.
After doing so, return the number of remaining intervals.*/

var removeCoveredIntervals = function (intervals) {
  if (intervals.length <= 1) return intervals.length;
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let end = intervals[0][1];
  let count = intervals.length;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][1] <= end) {
      count--;
    } else {
      end = intervals[i][1];
    }
  }
  return count;
};

/* 1291. Sequential Digits

An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.
 */
var sequentialDigits = function (low, high) {
  let result = [];
  let base = "123456789";
  for (let i = 2; i <= 9; i++) {
    for (let j = 0; j <= 9 - i; j++) {
      let num = Number(base.slice(j, j + i));
      if (num >= low && num <= high) result.push(num);
      if (num > high) break;
    }
  }
  return result;
};

/* 1297. Maximum Number of Occurences of a Substring

Given a string s, return the maximum number of ocurrences of any substring under the following rules:
The number of unique characters in the substring must be less than or equal to maxLetters.
The substring size must be between minSize and maxSize inclusive.
 */

// I just made a beautiful observation. We only need to check for substrings with min size
let maxFreq = function (s, maxLetters, minSize, maxSize) {
  let hash = {};
  let result = {};
  let max = 0;
  let left = 0;
  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in hash)) hash[s[i]] = 0;
    hash[s[i]]++;
    if (i >= minSize - 1) {
      let substr = s.slice(i - minSize + 1, i + 1);
      if (Object.keys(hash).length <= maxLetters) {
        if (!(substr in result)) result[substr] = 0;
        result[substr]++;
        max = Math.max(max, result[substr]);
      }
      hash[s[left]]--;
      if (hash[s[left]] == 0) delete hash[s[left]];
      left++;
    }
  }
  return max;
};
