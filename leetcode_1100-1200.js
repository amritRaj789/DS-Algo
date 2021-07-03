1143. Longest Common Subsequence
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

let longestCommonSubsequence = function(text1, text2){
    let dp = Array(text1.length+1).fill(null).map(() => Array(text2.length+1).fill(0));
    for(let i  = 1; i <= text1.length; i++){
        for(let j = 1; j <= text2.length; j++){
            if(text2[j-1] === text1[i-1])
                dp[i][j] = 1 + dp[i-1][j-1];
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[text1.length][text2.length];
}

/* 1189. Maximum Number of Balloons

Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.
You can use each character in text at most once. Return the maximum number of instances that can be formed.
 */
 
let maxNumberOfBalloons = function (text) {
  let hash = {
    b: 0,
    a: 0,
    l: 0,
    o: 0,
    n: 0,
  };
  for (let char of text) {
    if (char in hash) hash[char]++;
  }
  hash["b"] *= 2;
  hash["a"] *= 2;
  hash["n"] *= 2;
  let min = +Infinity;
  for (let key in hash) {
    min = Math.min(hash[key], min);
  }
  if (min === Infinity) return 0;
  if (min % 2) return (min - 1) / 2;
  return min / 2;
};
