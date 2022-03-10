/* 2119. A number after a double reversal

Reversing an integer means to reverse all its digits.
For example, reversing 2021 gives 1202. Reversing 12300 gives 321 as the leading zeros are not retained.
Given an integer num, reverse num to get reversed1, then reverse reversed1 to get reversed2. Return true if reversed2 equals num. Otherwise return false. */
var isSameAfterReversals = function (num) {
  let num1 = num;
  let reversed1 = 0;
  while (num1) {
    reversed1 = reversed1 * 10 + (num1 % 10);
    num1 = Math.floor(num1 / 10);
  }
  let reversed2 = 0;
  while (reversed1) {
    reversed2 = reversed2 * 10 + (reversed1 % 10);
    reversed1 = Math.floor(reversed1 / 10);
  }
  return reversed2 == num;
};

// shortcut trick
let isSameAfterReversals = function (num) {
  if (num == 0) return true;
  return !(num % 10 == 0);
};

/* 2124. Check if all A's appears before all B's

Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false. */

var checkString = function (s) {
  let sAppeared = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "b") sAppeared = true;
    if (s[i] == "a" && sAppeared == true) return false;
  }
  return true;
};

/* 2134. Minimum Swaps to Group All 1's Together II

A swap is defined as taking two distinct positions in an array and swapping the values in them.
A circular array is defined as an array where we consider the first element and the last element to be adjacent.
Given a binary circular array nums, return the minimum number of swaps required to group all 1's present in the array together at any location.
 */

var minSwaps = function (nums) {
  let numOf1 = 0;
  for (let num of nums) {
    if (num) numOf1++;
  }
  if (numOf1 <= 1) return 0;
  let left = 0;
  let maxInWindow = 0;
  for (let i = 0; i < numOf1; i++) {
    if (nums[i]) maxInWindow++;
  }
  let inWindow = maxInWindow;
  for (let right = numOf1; right < nums.length; right++) {
    if (nums[right]) inWindow++;
    if (nums[left++]) inWindow--;
    maxInWindow = Math.max(maxInWindow, inWindow);
  }
  for (let right = 0; right < numOf1; right++) {
    if (nums[right]) inWindow++;
    if (nums[left++]) inWindow--;
    maxInWindow = Math.max(maxInWindow, inWindow);
  }
  return numOf1 - maxInWindow;
};

/* 2150. Find All Lonely Numbers in the Array

You are given an integer array nums. A number x is lonely when it appears only once, and no adjacent numbers (i.e. x + 1 and x - 1) appear in the array.
Return all lonely numbers in nums. You may return the answer in any order. */

// O(NlogN) time, O(N) space
var findLonely = function (nums) {
  if (nums.length == 1) return [nums[0]];
  nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i - 1] < nums[i] - 1 && nums[i + 1] > nums[i] + 1)
      result.push(nums[i]);
  }
  if (nums[1] > nums[0] + 1) result.push(nums[0]);
  if (nums[nums.length - 1] > nums[nums.length - 2] + 1)
    result.push(nums[nums.length - 1]);
  return result;
};

// O(N) time, O(N) space
let findLonely = function (nums) {
  let hash = {};
  let result = [];
  for (let num of nums) {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  }
  for (let key in hash) {
    let num = Number(key);
    if (hash[num] == 1 && !(num - 1 in hash) && !(num + 1 in hash))
      result.push(num);
  }
  return result;
};

/* 2171. Removing Minimum Number of Magic Beans
You are given an array of positive integers beans, where each integer represents the number of magic beans found in a particular magic bag.
Remove any number of beans (possibly none) from each bag such that the number of beans in each remaining non-empty bag (still containing at least one bean) is equal. Once a bean has been removed from a bag, you are not allowed to return it to any of the bags.
Return the minimum number of magic beans that you have to remove.
 */

var minimumRemoval = function (beans) {
  let n = beans.length;
  beans.sort((a, b) => a - b);
  let diffSum = 0;
  for (let i = 0; i < n; i++) {
    diffSum += beans[i] - beans[0];
  }
  let result = diffSum;
  let newDiffSum = 0;
  for (let i = 0; i < n - 1; i++) {
    newDiffSum += beans[i];
    diffSum -= (n - i - 1) * (beans[i + 1] - beans[i]);
    result = Math.min(result, newDiffSum + diffSum);
  }
  return result;
};

/* 2177. Find Three Consecutive Integers that Sum to a Given Number

Given an integer num, return three consecutive integers (as a sorted array) that sum to num. If num cannot be expressed as the sum of three consecutive integers, return an empty array.
 */
var sumOfThree = function (num) {
  if (num % 3) return [];
  let mid = num / 3;
  return [mid - 1, mid, mid + 1];
};

/* 2178. Maximum Split of Positive Even Integers

You are given an integer finalSum. Split it into a sum of a maximum number of unique positive even integers.
For example, given finalSum = 12, the following splits are valid (unique positive even integers summing up to finalSum): (2 + 10), (2 + 4 + 6), and (4 + 8). Among them, (2 + 4 + 6) contains the maximum number of integers. Note that finalSum cannot be split into (2 + 2 + 4 + 4) as all the numbers should be unique.
Return a list of integers that represent a valid split containing a maximum number of integers. If no valid split exists for finalSum, return an empty list. You may return the integers in any order.
 */

let maximumEvenSplit = function (finalSum) {
  if (finalSum % 2) return [];
  let result = [];
  let sum = 0;
  for (let i = 2; i <= finalSum; i += 2) {
    if (sum + i == finalSum) {
      result.push(i);
      return result;
    } else if (sum + i > finalSum) {
      let prev = result.pop();
      result.push(finalSum - sum + prev);
      return result;
    }
    result.push(i);
    sum += i;
  }
};

/* 2180. Count Integers with Even Digit Sum
Given a positive integer num, return the number of positive integers less than or equal to num whose digit sums are even.
 */

var countEven = function (num) {
  if (num <= 1) return 0;
  let count = 0;
  function findDigitSum(n) {
    let sum = 0;
    while (n) {
      sum += n % 10;
      n = ~~(n / 10);
    }
    if (sum % 2 == 0) return true;
    return false;
  }
  for (let i = num; i >= 2; i--) {
    if (findDigitSum(i)) count++;
  }
  return count;
};

/* 2181. Merge Nodes in Between Zeroes

You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.
For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.
Return the head of the modified linked list.
 */

let mergeNodes = function (head) {
  let p1 = head;
  let copyp1 = head;
  let sum = 0;
  head = head.next;
  while (head) {
    if (head.val == 0) {
      p1 = p1.next;
      p1.val = sum;
      sum = 0;
    }
    sum += head.val;
    head = head.next;
  }
  p1.next = null;
  return copyp1.next;
};

/* 2182. Construct String with Repeat Limit

You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.
Return the lexicographically largest repeatLimitedString possible.
 */
var repeatLimitedString = function (s, repeatLimit) {
  let hash = {};
  for (let char of s) {
    if (!(char in hash)) hash[char] = 0;
    hash[char]++;
  }
  let result = "";
  loop1: for (let i = 122; i >= 97; i--) {
    let char = String.fromCharCode(i);
    if (char in hash) {
      if (hash[char] > repeatLimit) {
        result += char.repeat(repeatLimit);
        hash[char] -= repeatLimit;
        let j;
        for (j = i - 1; j >= 97; j--) {
          let char2 = String.fromCharCode(j);
          if (char2 in hash) {
            result += char2;
            hash[char2]--;
            if (hash[char2] == 0) delete hash[char2];
            i = 123;
            continue loop1;
          }
        }
        return result;
      } else {
        result += char.repeat(hash[char]);
        delete hash[char];
        i = 123;
      }
    }
  }
  return result;
};

/* 2185. Counting Words With a Given Prefix

You are given an array of strings words and a string pref.
Return the number of strings in words that contain pref as a prefix.
A prefix of a string s is any leading contiguous substring of s.
 */

var prefixCount = function (words, pref) {
  let len = pref.length;
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].slice(0, len) == pref) count++;
  }
  return count;
};

/* 2186. Minimum Number of Steps to Make Two Strings Anagram II

You are given two strings s and t. In one step, you can append any character to either s or t.
Return the minimum number of steps to make s and t anagrams of each other.
An anagram of a string is a string that contains the same characters with a different (or the same) ordering.
 */

let minSteps = function (s, t) {
  let result = 0;
  let arr = Array(26).fill(0);
  let a = "a".charCodeAt(0);
  for (let char of s) {
    arr[char.charCodeAt(0) - a]++;
  }
  for (let char of t) {
    arr[char.charCodeAt(0) - a]--;
  }
  for (let num of arr) {
    result += Math.abs(num);
  }
  return result;
};

/* 2187. Minimum Time to Complete Trips

You are given an array time where time[i] denotes the time taken by the ith bus to complete one trip.
Each bus can make multiple trips successively; that is, the next trip can start immediately after completing the current trip. Also, each bus operates independently; that is, the trips of one bus do not influence the trips of any other bus.
You are also given an integer totalTrips, which denotes the number of trips all buses should make in total. Return the minimum time required for all buses to complete at least totalTrips trips.
 */

let minimumTime = function (time, totalTrips) {
  let low = 1;
  let high = Number.MAX_SAFE_INTEGER;
  let result = 0;
  while (low <= high) {
    let mid = Math.floor((high + low) / 2);
    if (check(mid)) {
      result = mid;
      high = mid - 1;
    } else low = mid + 1;
  }

  function check(t) {
    let trips = 0;
    for (let i = 0; i < time.length; i++) {
      trips += Math.floor(t / time[i]);
    }
    return trips >= totalTrips;
  }
  return result;
};

/* 2191. Sort the Jumbled numbers

You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit i should be mapped to digit j in this system.
The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.
You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.
 */
var sortJumbled = function (mapping, nums) {
  function process(num) {
    if (num == 0) return mapping[0];
    let result = 0;
    let pow10 = 1;
    while (num) {
      result = pow10 * mapping[num % 10] + result;
      num = ~~(num / 10);
      pow10 *= 10;
    }
    return result;
  }
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    arr.push([process(nums[i]), nums[i]]);
  }
  arr.sort((a, b) => {
    return a[0] - b[0];
  });
  return arr.map((val) => val[1]);
};
