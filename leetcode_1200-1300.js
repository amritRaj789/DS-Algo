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
