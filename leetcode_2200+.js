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
