/* 2063. Vowels of All SubStrings.

Given a string word, return the sum of the number of vowels ('a', 'e', 'i', 'o', and 'u') in every substring of word.
A substring is a contiguous (non-empty) sequence of characters within a string. */

var countVowels = function (word) {
  let total = 0;
  let currSum = 0;
  let dp = "aeiou".indexOf(word[0]) !== -1 ? 1 : 0;
  currSum += dp;
  for (let i = 1; i < word.length; i++) {
    dp = dp + ("aeiou".indexOf(word[i]) !== -1 ? 1 : 0);
    currSum += dp;
  }
  total += currSum;
  for (let i = 1; i < word.length; i++) {
    currSum = ("aeiou".indexOf(word[i - 1]) !== -1 ? 1 : 0)
      ? currSum - (word.length - i + 1)
      : currSum;
    total += currSum;
  }
  return total;
};

/* 2095. Delete the Middle Node of a Linked List

You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.
 */

var deleteMiddle = function (head) {
  if (head.next == null) return head.next;
  let parent = null;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    parent = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  parent.next = slow.next;
  return head;
};
