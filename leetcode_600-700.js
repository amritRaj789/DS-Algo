646. Maximum Length of Pair Chain

/*You are given n pairs of numbers. In every pair, the first number is always smaller than the second number.
Now, we define a pair (c, d) can follow another pair (a, b) if and only if b < c. Chain of pairs can be formed in this fashion.
Given a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. You can select pairs in any order.
*/

// dynamic programming sol O(N^2)
var findLongestChain = function(pairs) {
	pairs.sort((a, b) => a[0] - b[0]);
    let maxLength = 1;
    let dp = Array(pairs.length);
    dp[0] = 1
    for(let i = 1; i < pairs.length; i++){
    	let max = 1;
    	for(let j = 0; j < i; j++){
    		if(pairs[j][1] < pairs[i][0]){
    			max = Math.max(max, dp[j]+1)
    		}
    	}
    	dp[i] = max;
    	maxLength = Math.max(maxLength, max);
    }
    return maxLength;
};


// Greedy Solution , O(NlogN)
let findLongestChain = function (pairs){
	pairs.sort((a, b) => a[1] - b[1]);
	let maxLength = 0;
	let maxTillNow = -Infinity;
	for(let pair of pairs){
		if(maxTillNow < pair[0]){
			maxLength++;
			maxTillNow = pair[1];
		}
	}
	return maxLength;
}