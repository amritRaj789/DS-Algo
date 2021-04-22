/*1092. Shortest Common Supersequence
Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences.  
If multiple answers exist, you may return any of them.
*/
let shortestCommonSupersequence = function (str1, str2){
    let dp = Array(str1.length+1).fill(null).map(() => Array(str2.length+1).fill(""));
    for(let i = 1; i <= str1.length; i++){
        dp[i][0] = dp[i-1][0]+str1[i-1];
    }
    for(let j = 1; j <= str2.length+1; j++){
        dp[0][j] = dp[0][j-1]+str2[j-1]
    }
    for(let i = 1; i <= str1.length; i++){
        for(let j = 1; j <= str2.length; j++){
            if(str1[i-1] === str2[j-1])
                dp[i][j] = dp[i-1][j-1] + str1[i-1];
            else{
                if(dp[i-1][j].length <= dp[i][j-1].length)
                    dp[i][j] = dp[i-1][j] + str1[i-1];
                else
                    dp[i][j] = dp[i][j-1] + str2[j-1];
            }
        }
    }
    return dp[str1.length][str2.length];
}
