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
