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
