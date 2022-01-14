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
