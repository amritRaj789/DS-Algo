/*967. Numbers with Same consecutive differences

Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.
Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.
You may return the answer in any order.
*/
var numsSameConsecDiff = function (n, k) {
  let result = [];
  function backtrack(number, level) {
    if (level === n) {
      result.push(number);
      return;
    }
    let lastDigit = number % 10;
    if (k === 0) backtrack(number * 10 + lastDigit, level + 1);
    else {
      if (lastDigit + k <= 9) backtrack(number * 10 + lastDigit + k, level + 1);
      if (lastDigit - k >= 0) backtrack(number * 10 + lastDigit - k, level + 1);
    }
  }
  for (let i = 1; i <= 9; i++) {
    backtrack(i, 1);
  }
  return result;
};

/*970. Powerful integers
Given three integers x, y, and bound, return a list of all the powerful integers that have a value less than or equal to bound.
An integer is powerful if it can be represented as xi + yj for some integers i >= 0 and j >= 0.
You may return the answer in any order. In your answer, each value should occur at most once.
*/

let powerfulIntegers = function (x, y, bound){
  let xMax = x == 1 ? 0 : Math.floor(Math.log(bound)/Math.log(x));
  let yMax = y == 1 ? 0 : Math.floor(Math.log(bound)/Math.log(y));
  let result = new Set();
  for(let i = 0 ; i <= xMax; i++){
    for(let j = 0; j <= yMax; j++){
      sum = x**i + y**j;
      if(sum <= bound) result.add(sum);
      else break;
    }
  }
  return Array.from(result);
}


// Trick here would be to check 2^20 is just greater than 10^6.
// So we can have the bounds of power of x and y as 20
let powerfulIntegers = function (x, y, bound){
  let result = new Set();
  for(let i = 0; i < 20; i++){
    for(let j = 0; j < 20; j++){
      let sum = x**i + y**j;
      if(sum <= bound) result.add(sum);
      else break;
    }
  }
  return Array.from(result);
}


/* 971. Flip Binary Tree to Match Preorder Traversal

Flip the smallest number of nodes so that the pre-order traversal of the tree matches voyage.
 */
let flipMatchVoyage = function (root, voyage) {
  let i = 0;
  let result = [];
  function dfs(node) {
    if (!node || result[0] === -1) return;
    if (node.val !== voyage[i++]) result = [-1];
    else if (node.left && node.left.val !== voyage[i]) {
      result.push(node.val);
      dfs(node.right);
      dfs(node.left);
    } else {
      dfs(node.left);
      dfs(node.right);
    }
  }
  dfs(root);
  return result;
};

/*973. K Closest Points to Origin
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
*/

var kClosest = function(points, k) {
    let result = [];
    for(let point of points){
      let [x, y] = point;
      let distance = x**2 + y**2;
      result.push([distance, point]);
    }
    result.sort((a, b) => a[0] - b[0]);
    let finalResult = [];
    for(let i = 1; i <= k; i++){
      finalResult.push(result[i-1][1]);
    }
    return finalResult;
};
 
/*
978. Longest Turbulent SubArray

Given an integer array arr, return the length of a maximum size turbulent subarray of arr.
A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.*/

var maxTurbulenceSize = function (arr) {
  if (arr.length == 2 && arr[0] !== arr[1]) return 2;
  let maxLength = 1;
  let left;
  left = arr[0] == arr[1] ? 1 : 0;
  for (let right = 1; right < arr.length - 1; right++) {
    if (arr[right] == arr[right + 1]) left = right + 1;
    else if (arr[right] > arr[right + 1]) {
      if (!(arr[right - 1] < arr[right] || arr[right - 1] == arr[right]))
        left = right;
    } else {
      if (!(arr[right - 1] > arr[right] || arr[right - 1] == arr[right]))
        left = right;
    }
    maxLength = Math.max(maxLength, right - left + 2);
  }
  return maxLength;
};
console.log(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])); //5

// 980. Unique Paths III

// backtracking, dfs
/*On a 2-dimensional grid, there are 4 types of squares:
1 represents the starting square.  There is exactly one starting square.
2 represents the ending square.  There is exactly one ending square.
0 represents empty squares we can walk over.
-1 represents obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.
*/
let uniquePathsIII = function (grid) {
  let result = 0;
  let count = 0;
  const m = grid.length;
  const n = grid[0].length;
  let newBoard = new Array(m + 2);
  for (let i = 0; i < m + 2; i++) {
    newBoard[i] = new Array(n + 2).fill(-1);
  }
  let start;
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      newBoard[i][j] = grid[i - 1][j - 1];
      if (newBoard[i][j] === 1) start = [i, j];
      if (newBoard[i][j] === 0) count++;
    }
  }
  function traverse(i, j, board, count) {
    if (board[i][j] === 2) {
      if (count >= 0) return;
      result++;
      return;
    }
    let original = board[i][j];
    board[i][j] = -1;
    if (board[i + 1][j] !== -1) traverse(i + 1, j, board, count - 1);
    if (board[i][j + 1] !== -1) traverse(i, j + 1, board, count - 1);
    if (board[i - 1][j] !== -1) traverse(i - 1, j, board, count - 1);
    if (board[i][j - 1] !== -1) traverse(i, j - 1, board, count - 1);
    board[i][j] = original;
  }
  traverse(start[0], start[1], newBoard, count);
  return result;
};

/* 994. Rotting Oranges

You are given an m x n grid where each cell can have one of three values:
0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
 */
var orangesRotting = function (grid) {
  let queue = [];
  let rotten = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col]);
        grid[row][col] = 0;
      } else if (grid[row][col] === 1) rotten++;
    }
  }
  if (rotten === 0) return 0;
  let result = -1;
  while (queue.length) {
    let count = queue.length;
    while (count) {
      let [row, col] = queue.shift();
      if (row > 0 && grid[row - 1][col] === 1) {
        queue.push([row - 1, col]);
        grid[row - 1][col] = 0;
        rotten--;
      }
      if (row < grid.length - 1 && grid[row + 1][col] === 1) {
        queue.push([row + 1, col]);
        grid[row + 1][col] = 0;
        rotten--;
      }
      if (col > 0 && grid[row][col - 1] === 1) {
        queue.push([row, col - 1]);
        grid[row][col - 1] = 0;
        rotten--;
      }
      if (col < grid[0].length - 1 && grid[row][col + 1] === 1) {
        queue.push([row, col + 1]);
        grid[row][col + 1] = 0;
        rotten--;
      }
      count--;
    }
    result++;
  }
  return rotten > 0 ? -1 : result;
};

/*996. Number of Squareful Arrays

Given an array A of non-negative integers, the array is squareful if for every pair of adjacent elements, 
their sum is a perfect square.
Return the number of permutations of A that are squareful.  Two permutations A1 and A2 differ if and only 
if there is some index i such that A1[i] != A2[i].
*/
var numSquarefulPerms = function (A) {
  let count = 0;
  A.sort((a, b) => a - b);
  function backtrack(lastNum, level) {
    if (level === A.length) {
      count++;
      return;
    }
    let hash = {};
    A.forEach((num) => {
      hash[num] = false;
    });
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== false) {
        if (hash[A[i]] === false) {
          hash[A[i]] = true;
          if (level === 0 || Math.sqrt(A[i] + lastNum) % 1 === 0) {
            let temp = A[i];
            A[i] = false;
            backtrack(temp, level + 1);
            A[i] = temp;
          }
        }
      }
    }
  }
  backtrack(0, 0);
  return count;
};
// this isn't the most efficient one and there are better ways to do it
// I will learn those ways later

// 1004. Longest consecutive ones II
function longestOnes(A, K) {
  let array = [0, 0];
  let maxLength = 0;
  let left = 0;
  for (let right = 0; right < A.length; right++) {
    array[A[right]]++;
    while (array[0] > K) {
      if (A[left] == 0) {
        array[0]--;
      }
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2));

/*
986. Interval List Intersections

You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
Return the intersection of these two interval lists.
*/
// My solution
var intervalIntersection = function (firstList, secondList) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < firstList.length && j < secondList.length) {
    if (firstList[i][1] < secondList[j][0]) {
      //A[i] is less than B[j] no intersection
      i++;
    } else if (secondList[j][1] < firstList[i][0]) {
      //B[j] is less than A[i] no intersection
      j++;
    } else {
      let start = Math.max(firstList[i][0], secondList[j][0]);
      let end = Math.min(firstList[i][1], secondList[j][1]);
      result.push([start, end]);
      if (firstList[i][1] > secondList[j][1]) j++;
      else if (firstList[i][1] < secondList[j][1]) i++;
      else {
        i++;
        j++;
      }
    }
  }
  return result;
};

// Shorter version of the exact same thing
var intervalIntersection = function (firstList, secondList) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < firstList.length && j < secondList.length) {
    let start = Math.max(firstList[i][0], secondList[j][0]);
    let end = Math.min(firstList[i][1], secondList[j][1]);
    if (start <= end) result.push([start, end]);
    if (firstList[i][1] < secondList[j][1]) i++;
    else j++;
  }
  return result;
};

// 1052. Grumpy bookstore owner
function maxSatisfied(customers, grumpy, X) {
  let sumTotal = 0;
  for (let i = 0; i < customers.length; i++) {
    sumTotal += grumpy[i] ? 0 : customers[i];
  }
  let maxSum = 0;
  for (let i = 0; i < X; i++) {
    if (grumpy[i]) {
      sumTotal += customers[i];
    }
  }
  maxSum = Math.max(maxSum, sumTotal);
  for (i = X; i < customers.length; i++) {
    if (grumpy[i]) {
      sumTotal += customers[i];
    }
    if (grumpy[i - X]) {
      sumTotal -= customers[i - X];
    }
    maxSum = Math.max(maxSum, sumTotal);
  }
  return maxSum;
}
console.log(
  maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3)
);

function maxOfTheArray(arr, k) {
  if (k == 1) {
    if (arr[0] >= arr[arr.length - 1]) return arr[0];
    else return arr[arr.length - 1];
  } else {
    return Math.max(
      arr[0] + maxOfTheArray(arr.slice(1), k - 1),
      arr[arr.length - 1] + maxOfTheArray(arr.slice(0, arr.length - 1), k - 1)
    );
  }
}
console.log(maxOfTheArray([1, 2, 3, 4, 5, 6, 1], 3));

// 1432.  Maximum points you can obtain from cards
// Pure Recursion
function maxScore(cardPoints, k) {
  if (k == 1) {
    if (cardPoints[0] >= cardPoints[cardPoints.length - 1])
      return cardPoints[0];
    else return cardPoints[cardPoints.length - 1];
  } else {
    return Math.max(
      cardPoints[0] + maxScore(cardPoints.slice(1), k - 1),
      cardPoints[cardPoints.length - 1] +
        maxScore(cardPoints.slice(0, cardPoints.length - 1), k - 1)
    );
  }
}

// Using a sliding window
function maxScore(cardPoints, k) {
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
}
console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3));
