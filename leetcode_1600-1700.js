/* 1679. Max Number of K-Sum Pairs

You are given an integer array nums and an integer k.
In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.
Return the maximum number of operations you can perform on the array. */

var maxOperations = function (nums, k) {
  let count = 0;
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    sum = nums[left] + nums[right];
    if (sum == k) {
      count++;
      left++;
      right--;
    } else if (sum < k) left++;
    else right--;
  }
  return count;
};
