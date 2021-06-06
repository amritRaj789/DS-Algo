/*1824. Mnimum Sideway Jumps
There is a 3 lane road of length n that consists of n + 1 points labeled from 0 to n. A frog starts at point 0 in the second lane and wants to jump to point n. However, there could be obstacles along the way.
You are given an array obstacles of length n + 1 where each obstacles[i] (ranging from 0 to 3) describes an obstacle on the lane obstacles[i] at point i. If obstacles[i] == 0, there are no obstacles at point i. There will be at most one obstacle in the 3 lanes at each point.
For example, if obstacles[2] == 1, then there is an obstacle on lane 1 at point 2.
The frog can only travel from point i to point i + 1 on the same lane if there is not an obstacle on the lane at point i + 1. To avoid obstacles, the frog can also perform a side jump to jump to another lane (even if they are not adjacent) at the same point if there is no obstacle on the new lane.
For example, the frog can jump from lane 3 at point 3 to lane 1 at point 3.
Return the minimum number of side jumps the frog needs to reach any lane at point n starting from lane 2 at point 0.
Note: There will be no obstacles on points 0 and n*/

// recursive solution
let minSideJumps = function (obstacle) {
  function recursive(i, lane) {
    if (i === obstacle.length - 1) return 0;
    if (obstacle[i] === lane) return +Infinity;
    if (obstacle[i + 1] === lane) {
      if (lane === 1) {
        let value1 = recursive(i, 2);
        let value2 = recursive(i, 3);
        return Math.min(value1, value2) + 1;
      } else if (lane === 2) {
        let value1 = recursive(i, 1);
        let value2 = recursive(i, 3);
        return Math.min(value1, value2) + 1;
      } else {
        let value1 = recursive(i, 1);
        let value2 = recursive(i, 2);
        return Math.min(value1, value2) + 1;
      }
    } else return recursive(i + 1, lane);
  }
  return recursive(0, 2);
};

// bottom up DP
let minSideJumps = function (obstacle) {
  let dp = new Array(obstacle.length);
  for (let i = 0; i < obstacle.length; i++) {
    dp[i] = new Array(4).fill(0);
    dp[i][obstacle[i]] = Infinity;
  }
  // Initial State
  dp[0][1] = 1;
  dp[0][2] = 0;
  dp[0][3] = 1;
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < 4; j++) {
      value1 =
        j === 1
          ? dp[i - 1][1]
          : obstacle[i] === 1
          ? dp[i - 1][1] + 2
          : dp[i - 1][1] + 1;
      value2 =
        j === 2
          ? dp[i - 1][2]
          : obstacle[i] === 2
          ? dp[i - 1][2] + 2
          : dp[i - 1][2] + 1;
      value3 =
        j === 3
          ? dp[i - 1][3]
          : obstacle[i] === 3
          ? dp[i - 1][3] + 2
          : dp[i - 1][3] + 1;
      dp[i][j] += Math.min(value3, value2, value1);
    }
  }
  return Math.min(...dp[dp.length - 1]);
};

// I feel so good after solving this.

// 1828. Queries on Number of Points inside a Circle

/* You are given an array points where points[i] = [xi, yi] is the coordinates of the ith point on a 2D plane. Multiple points can have the same coordinates.
You are also given an array queries where queries[j] = [xj, yj, rj] describes a circle centered at (xj, yj) with a radius of rj.
For each query queries[j], compute the number of points inside the jth circle. Points on the border of the circle are considered inside.
Return an array answer, where answer[j] is the answer to the jth query. */

var countPoints = function (points, queries) {
  let result = [];
  for (let i = 0; i < queries.length; i++) {
    let count = 0;
    for (let j = 0; j < points.length; j++) {
      count +=
        (points[j][0] - queries[i][0]) ** 2 +
          (points[j][1] - queries[i][1]) ** 2 <=
        queries[i][2] ** 2
          ? 1
          : 0;
    }
    result.push(count);
  }
  return result;
};

/* 
1861. Rotating the Box

You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:
	A stone '#'
	A stationary obstacle '*'
	Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.
 */
var rotateTheBox = function (box) {
  let row = box.length;
  let col = box[0].length;
  let rotatedBox = new Array(col).fill(null).map(() => Array(row).fill(0));
  for (let m = 0; m < col; m++) {
    for (let n = row - 1; n >= 0; n--) {
      rotatedBox[m][row - 1 - n] = box[n][m];
    }
  }
  for (let m = 0; m < row; m++) {
    let bottom = col - 1;
    let top = col - 1;
    while (top >= 0) {
      if (rotatedBox[top][m] == "#") {
        if (bottom !== top) {
          rotatedBox[bottom][m] = "#";
          rotatedBox[top][m] = ".";
        }
        bottom--;
      } else if (rotatedBox[top][m] == "*") bottom = top - 1;
      top--;
    }
  }
  return rotatedBox;
};
// I think it can still be made more efficient
