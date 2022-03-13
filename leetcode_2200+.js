/* 2201. Count Artifacts That Can be Extracted

There is an n x n 0-indexed grid with some artifacts buried in it. You are given the integer n and a 0-indexed 2D integer array artifacts describing the positions of the rectangular artifacts where artifacts[i] = [r1i, c1i, r2i, c2i] denotes that the ith artifact is buried in the subgrid where:
 */
var digArtifacts = function (n, artifacts, dig) {
  let count = 0;
  let grid = Array(n)
    .fill(0)
    .map(() => Array(n).fill(false));
  for (let i = 0; i < dig.length; i++) {
    let [row, col] = dig[i];
    grid[row][col] = true;
  }
  for (let i = 0; i < artifacts.length; i++) {
    // same row
    if (artifacts[i][0] == artifacts[i][2]) {
      let col = artifacts[i][1];
      let found = true;
      while (col <= artifacts[i][3]) {
        if (grid[artifacts[i][0]][col] == false) {
          found = false;
          break;
        }
        col++;
      }
      if (found) count++;
    }
    // same col
    else if (artifacts[i][1] == artifacts[i][3]) {
      let row = artifacts[i][0];
      let found = true;
      while (row <= artifacts[i][2]) {
        if (grid[row][artifacts[i][1]] == false) {
          found = false;
          break;
        }
        row++;
      }
      if (found) count++;
    }
    // diagonal
    else {
      if (grid[artifacts[i][0]][artifacts[i][1]] == false) continue;
      if (grid[artifacts[i][0]][artifacts[i][1] + 1] == false) continue;
      if (grid[artifacts[i][2]][artifacts[i][3]] == false) continue;
      if (grid[artifacts[i][2]][artifacts[i][3] - 1] == false) continue;
      count++;
    }
  }
  return count;
};

/* 2202. Maximize the topmost element after K moves

You are given a 0-indexed integer array nums representing the contents of a pile, where nums[0] is the topmost element of the pile.
In one move, you can perform either of the following:
If the pile is not empty, remove the topmost element of the pile.
If there are one or more removed elements, add any one of them back onto the pile. This element becomes the new topmost element.
You are also given an integer k, which denotes the total number of moves to be made.
Return the maximum value of the topmost element of the pile possible after exactly k moves. In case it is not possible to obtain a non-empty pile after k moves, return -1. */

var maximumTop = function (nums, k) {
  if (nums.length == 1) {
    if (k % 2 == 0) return nums[0];
    else return -1;
  }
  let largest = -Infinity;
  let largestIndex = -1;
  let secondLargest = -Infinity;
  for (let i = 0; i <= k && i < nums.length; i++) {
    if (nums[i] > largest) {
      secondLargest = largest;
      largest = nums[i];
      largestIndex = i;
    } else if (nums[i] > secondLargest) secondLargest = nums[i];
  }
  if (k - largestIndex == 1) return secondLargest;
  else return largest;
};
