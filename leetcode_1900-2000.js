/* 1914. Cyclically Rotating a Grid

You are given an m x n integer matrix grid​​​, where m and n are both even integers, and an integer k.
A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the counter-clockwise direction. An example rotation is shown below: */

var rotateGrid = function (grid, k) {
  let rows = grid.length;
  let cols = grid[0].length;
  let layers = rows >= cols ? cols / 2 : rows / 2;
  let arr = Array(layers).fill(0);
  let rotated = Array(layers).fill(0);
  for (let i = 0; i < layers; i++) {
    arr[i] = [];
    // traverse the top row
    for (let j = i; j < cols - i; j++) {
      arr[i].push(grid[i][j]);
    }
    // traverse the right side col
    for (let j = i + 1; j < rows - i; j++) {
      arr[i].push(grid[j][cols - 1 - i]);
    }
    // traverse the bottom row
    for (let j = cols - 2 - i; j >= i; j--) {
      arr[i].push(grid[rows - 1 - i][j]);
    }
    // traverse the left side col
    for (let j = rows - 2 - i; j >= i + 1; j--) {
      arr[i].push(grid[j][i]);
    }
  }

  // rotate the array
  for (let i = 0; i < layers; i++) {
    rotated[i] = [];
    let len = arr[i].length;
    for (let j = 0; j < len; j++) {
      rotated[i].push(arr[i][(j + k) % len]);
    }
  }

  // transform the array
  for (let i = 0; i < layers; i++) {
    let z = 0;
    // traverse the top row
    for (let j = i; j < cols - i; j++) {
      grid[i][j] = rotated[i][z++];
    }
    // traverse the right side col
    for (let j = i + 1; j < rows - i; j++) {
      grid[j][cols - 1 - i] = rotated[i][z++];
    }
    // traverse the bottom row
    for (let j = cols - 2 - i; j >= i; j--) {
      grid[rows - 1 - i][j] = rotated[i][z++];
    }
    // traverse the left side col
    for (let j = rows - 2 - i; j >= i + 1; j--) {
      grid[j][i] = rotated[i][z++];
    }
  }

  return grid;
};

/* 1968. Array with Elements Not Equal to Average of Neighbors

You are given a 0-indexed array nums of distinct integers. You want to rearrange the elements in the array such that every element in the rearranged array is not equal to the average of its neighbors.
More formally, the rearranged array should have the property such that for every i in the range 1 <= i < nums.length - 1, (nums[i-1] + nums[i+1]) / 2 is not equal to nums[i].
Return any rearrangement of nums that meets the requirements.
 */

let rearrangeArray = function (nums) {
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    result.push(nums[left++]);
    result.push(nums[right--]);
  }
  if (left == right) result.push(nums[left]);
  return result;
};

/* 1975. Maximum Matrix Sum

You are given an n x n integer matrix. You can do the following operation any number of times:
Choose any two adjacent elements of matrix and multiply each of them by -1.
Two elements are considered adjacent if and only if they share a border.
Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.
 */

var maxMatrixSum = function (matrix) {
  let leastPos = +Infinity;
  let maxNeg = -Infinity;
  let countNeg = 0;
  let sumNeg = 0;
  let sumPos = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] >= 0) {
        sumPos += matrix[i][j];
        leastPos = Math.min(leastPos, matrix[i][j]);
      } else {
        maxNeg = Math.max(maxNeg, matrix[i][j]);
        countNeg++;
        sumNeg += matrix[i][j];
      }
    }
  }
  if (countNeg % 2 == 0) return sumPos + Math.abs(sumNeg);
  else {
    if (leastPos != +Infinity && Math.abs(maxNeg) > leastPos)
      return Math.abs(sumNeg) + sumPos - 2 * leastPos;
    return Math.abs(sumNeg) + sumPos + 2 * maxNeg;
  }
};

/* 1991. Find the Middle Index in Array

Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all the possible ones).
A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1].
If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0.
Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.
 */

var findMiddleIndex = function (nums) {
  let total = nums.reduce((a, b) => a + b);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (total - leftSum - nums[i] == leftSum) return i;
    leftSum += nums[i];
  }
  return -1;
};
