/* 1732. Find the highest Altitude

There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.
You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.
 */
var largestAltitude = function (gain) {
  let max = 0;
  let alt = 0;
  for (let i = 0; i < gain.length; i++) {
    alt += gain[i];
    max = Math.max(max, alt);
  }
  return max;
};

/*1752. Check if array is sorted and rotated

Given an array nums, return true if the array was originally sorted in non-decreasing order, 
then rotated some number of positions (including zero). Otherwise, return false.
There may be duplicates in the original array.
*/
let check = function (nums) {
  if (nums.length <= 2) return true;
  let decreasing_count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] < nums[i]) {
      decreasing_count++;
      if (decreasing_count === 2) return false;
    }
  }
  if (decreasing_count === 1 && nums[nums.length - 1] > nums[0]) return false;
  return true;
};

//1769. Minimum number of Operations to Move All Balls to Each box

/*logic: 

at any i-th square, 
min.ops to bring all balls to ith = min.ops to bring balls on the left of i-1th to i-1th + no.of balls on the left of ith
							+ no.of.ops to bring balls on the right of i+1th to i+1th + no.of balls on the right of ith

							which is nothing but equal to

							min.ops to bring all balls to i-1th - no.of balls on the right of ith + no.of balls on the left of ith - ball on ith

							no.ops to bring all balls to i-1th  = no. of ops to bring balls on the left of i-1th to i-1th + no.of ops to bring balls on right of ith to ith+ no.of balls on the right of i-1th

							= no. of ops to bring balls on the left of i-1th to i-1th + no.of ops to bring balls on the right of i+1th to i+1th + 2 times of no.of balls on the right of ith + ball on ith


dp[i] = dp[i-1] + balls on left of i - balls on right of i  - arr[i];
*/
//This is fucking cool. I figured it out all on my own
//Time to code
// I will need a dp array, I will also need a 2d array containing balls on either side of i

var minOperations = function (boxes) {
  let dp = new Array(boxes.length);

  //Initializing 2D array to store balls on left/right information for each index. 0th index for left, 1st index for right
  let ballsOnSides = new Array(boxes.length);
  for (let i = 0; i < boxes.length; i++) {
    ballsOnSides[i] = [0, 0];
  }

  dp[0] = 0; //Initializing dp[0]; actual value will be calculated in the loop below

  //Loop to calculate balls on side info as well as dp[0]
  let left = 0;
  let right = 0;
  for (let i = 0; i < boxes.length; i++) {
    ballsOnSides[i][0] = left; //	storing left info from start to end
    ballsOnSides[boxes.length - 1 - i][1] = right; //	storing right info from end to start
    left += parseInt(boxes[i]);
    right += parseInt(boxes[boxes.length - 1 - i]);
    if (parseInt(boxes[i])) dp[0] += i;
  }

  //The final DP equation
  for (let i = 1; i < boxes.length; i++) {
    dp[i] =
      dp[i - 1] + ballsOnSides[i][0] - ballsOnSides[i][1] - parseInt(boxes[i]);
  }

  return dp;
};

console.log(minOperations("001011"));

// 1770. Maximum Score from Performing Multiplication Operations
//Unfinished
var maximumScore = function (nums, multipliers) {};

dp[i] = Math.max(multiplier[i] * nums[left], multiplier[i] * nums[right]);

//By Recursion
var maximumScore = function (nums, multipliers) {
  const length = multipliers.length;
  const maxValue = maxScore(nums, 0);
  function maxScore(arr, i) {
    if (i === length - 1)
      return Math.max(
        multipliers[i] * arr[0],
        multipliers[i] * arr[arr.length - 1]
      );
    else {
      return Math.max(
        multipliers[i] * arr[0] + maxScore(arr.slice(1), i + 1),
        multipliers[i] * arr[arr.length - 1] +
          maxScore(arr.slice(0, arr.length - 1), i + 1)
      );
    }
  }
  return maxValue;
};

console.log(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6]));

// Recursion with memoization
var maximumScore = function (nums, multipliers) {
  const length = multipliers.length;
  let memo = {};
  const maxScore = function (arr, i) {
    if (i === length - 1) {
      memo[[i, 0]] = multipliers[i] * arr[0];
      memo[[i, 1]] = multipliers[i] * arr[arr.length - 1];
      return Math.max(memo[[i, 0]], memo[[i, 1]]);
    } else {
      memo[[i, 0]] = multipliers[i] * arr[0] + maxScore(arr.slice(1), i + 1);
      memo[[i, 1]] =
        multipliers[i] * arr[arr.length - 1] +
        maxScore(arr.slice(0, arr.length - 1), i + 1);
      return Math.max(memo[[i, 0]], memo[[i, 1]]);
    }
  };
  const maxValue = maxScore(nums, 0);
  return maxValue;
};
console.log(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6]));

// Better memoization
var maximumScore = function (nums, multipliers) {
  const length = multipliers.length;
  let memo = {};
  const maxScore = function (arr, i) {
    if (i === length - 1) {
      memo[[i, 0]] = multipliers[i] * arr[0];
      memo[[i, 1]] = multipliers[i] * arr[arr.length - 1];
      return Math.max(memo[[i, 0]], memo[[i, 1]]);
    } else {
      memo[[i, 0]] = multipliers[i] * arr[0] + maxScore(arr.slice(1), i + 1);
      memo[[i, 1]] =
        multipliers[i] * arr[arr.length - 1] +
        maxScore(arr.slice(0, arr.length - 1), i + 1);
      return Math.max(memo[[i, 0]], memo[[i, 1]]);
    }
  };
  const maxValue = maxScore(nums, 0);
  return maxValue;
};
console.log(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6]));

var maximumScore = function (nums, multipliers) {
  const length = multipliers.length;
  let memo = new Array(length + 1);
  for (let i = 0; i <= length; i++) {
    memo[i] = new Array(nums.length);
  }
  //n_ind : index of nums array, m_ind : index of multipliers array
  const maxScore = function (arr, i, start, end) {
    if (i === length - 1) {
      return Math.max(
        multipliers[i] * arr[0],
        multipliers[i] * arr[arr.length - 1]
      );
    } else {
      memo[start + 1][end] = maxScore(arr.slice(1), i + 1, start + 1, end);
      memo[start][end - 1] = maxScore(
        arr.slice(0, arr.length - 1),
        i + 1,
        start,
        end - 1
      );
      return Math.max(
        multipliers[i] * arr[0] + memo[start + 1][end],
        multipliers[i] * arr[arr.length - 1] + memo[start][end - 1]
      );
    }
  };
  return maxScore(nums, 0, 0, length - 1);
};
console.log(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6]));
