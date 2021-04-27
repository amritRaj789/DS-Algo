/*1079. Letter Tile Possibilities

You have n  tiles, where each tile has one letter tiles[i] printed on it.
Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.
*/
let numTilePossibilities = function (tiles){
    let count = 0;
    let charFreq = {};
    for(let char of tiles){
        if(!(char in charFreq))
            charFreq[char] = 0;
        charFreq[char]++;
    }
    function recursive(level){
        if(level === tiles.length)
            return;
        let used = {};
        for(let char of tiles){
            used[char] = false;
        }
        for(let key in charFreq){
            if(charFreq[key] > 0){
                if(used[key] === false){
                    used[key] = true;
                    charFreq[key]--;
                    recursive(level+1);
                    count++;
                    charFreq[key]++;
                }
            }
        }
    }
    recursive(0);
    return count;
}
// not very fast, but this works
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
