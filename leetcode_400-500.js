/*401. Binary Watch

A binary watch has 4 LEDs on the top which represent the hours (0-11), 
and the 6 LEDs on the bottom represent the minutes (0-59). 
Each LED represents a zero or one, with the least significant bit on the right.
*/
let readBinaryWatch = function (turnedOn) {
  if (turnedOn > 8) return [];
  let result = [];
  let minute = [1, 2, 4, 8, 16, 32];
  let hoursPossible = [
    ["0:"],
    ["1:", "2:", "4:", "8:"],
    ["3:", "5:", "6:", "9:", "10:"],
    ["7:", "11:"],
  ];
  let minutesPossible = Array(6).fill([]);
  for (let i = 0; i < 6; i++) {
    minutesPossible[i] = [];
  }
  minutesPossible[0] = ["00"];
  function makeMinutes(count, index, total) {
    if (index === minute.length) return;
    let minutes = total + minute[index];
    if (minutes < 60) {
      if (minutes >= 10) minutesPossible[count + 1].push(String(minutes));
      else minutesPossible[count + 1].push("0" + minutes);
      makeMinutes(count + 1, index + 1, minutes);
    }
    makeMinutes(count, index + 1, total);
  }
  makeMinutes(0, 0, 0);
  for (let i = 0; i <= turnedOn && i < 3; i++) {
    for (let j = 0; j < hoursPossible[i].length; j++) {
      if (turnedOn - i > 5) break;
      for (let k = 0; k < minutesPossible[turnedOn - i].length; k++) {
        result.push(hoursPossible[i][j] + minutesPossible[turnedOn - i][k]);
      }
    }
  }
  return result;
};

/*435. 
Non-overlapping intervals
Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
*/ var eraseOverlapIntervals = function (intervals) {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  let end = intervals[0][1];
  let count = 0;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      if (end >= intervals[i][1]) {
        count++;
        end = intervals[i][1];
      } else {
        count++;
      }
    } else {
      end = intervals[i][1];
    }
  }
  return count;
};

// I copied this solution from an user. Still got a little understanding to do
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let n = intervals.length;
  let res = 0;
  let i = n - 1;
  while (i > 0) {
    let j = i - 1;
    while (j >= 0 && intervals[j][1] > intervals[i][0]) {
      res++;
      j--;
    }
    i = j;
  }
  return res;
};

/*
436. Find Right Interval

You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.
The right interval for an interval i is an interval j such that startj >= endi and startj is minimized.
Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.
*/

var findRightInterval = function (intervals) {
  let hash = {};
  for (let i = 0; i < intervals.length; i++) {
    hash[intervals[i][0]] = i;
  }
  let result = new Array(intervals.length).fill(-1);
  let startSorted = intervals
    .map((interval) => interval)
    .sort((a, b) => a[0] - b[0]); //sorting the start values in ascending order
  let endSorted = intervals
    .map((interval) => interval)
    .sort((a, b) => a[1] - b[1]); //sorting the end values in ascending order
  let i = 0; // startSorted index
  let j = 0; // endSorted index
  for (j = 0; j < intervals.length; j++) {
    while (i < intervals.length) {
      if (startSorted[i][0] >= endSorted[j][1]) {
        result[hash[endSorted[j][0]]] = hash[startSorted[i][0]];
        break;
      }
      i++;
    }
    if (i === intervals.length) break;
  }
  return result;
};
//O(2N

// Alternate method, if we don't want to store the indices in a hash but store it in the 2 sorted arrays
var findRightInterval = function (intervals) {
  let result = new Array(intervals.length).fill(-1);
  let startSorted = intervals
    .map((interval, i) => [...interval, i])
    .sort((a, b) => a[0] - b[0]); //sorting the start values in ascending order
  let endSorted = intervals
    .map((interval, i) => [...interval, i])
    .sort((a, b) => a[1] - b[1]); //sorting the end values in ascending order
  let i = 0;
  for (let j = 0; j < intervals.length; j++) {
    while (i < intervals.length) {
      if (startSorted[i][0] >= endSorted[j][1]) {
        result[endSorted[j][2]] = startSorted[i][2];
        break;
      }
      i++;
    }
    if (i === intervals.length) break;
  }
  return result;
};

//457. Circular Array Loop

/* 
You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i:
If nums[i] is positive, move nums[i] steps forward, and
If nums[i] is negative, move nums[i] steps backward.
Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.
A cycle in the array consists of a sequence of indices seq of length k where:
Following the movement rules above results in the repeating index sequence seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ..
Every nums[seq[j]] is either all positive or all negative.
k > 1
Return true if there is a cycle in nums, or false otherwise. */

function circularArrayLoop(arr) {
  for (i = 0; i < arr.length; i++) {
    isForward = arr[i] >= 0; // if we are moving forward or not
    let slow = i,
      fast = i;
    while (true) {
      slow = find_next_index(arr, isForward, slow);
      fast = find_next_index(arr, isForward, fast);
      if (fast !== -1) {
        fast = find_next_index(arr, isForward, fast);
      }
      if (slow === -1 || fast === -1 || slow === fast) {
        break;
      }
    }
    if (slow !== -1 && slow === fast) {
      return true;
    }
  }
  return false;
}

function find_next_index(array, dir, pointer) {
  if (dir == true) {
    if (array[pointer] < 0) return -1;
    newIndex = (pointer + array[pointer]) % array.length;
    if (newIndex !== pointer) return newIndex;
    return -1;
  }
  if (dir == false) {
    if (array[pointer] > 0) return -1;
    newIndex = (pointer + array[pointer]) % array.length;
    if (newIndex < 0) newIndex += array.length;
    if (newIndex !== pointer) return newIndex;
    return -1;
  }
}
