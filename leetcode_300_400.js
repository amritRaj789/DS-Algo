316. Remove Duplicate Letters
var removeDuplicateLetters = function(s) {
	const hash = {};
    for(let char of s){
    	if(!(char in hash))
    		hash[char] = 0;
    	hash[char]++;
    }
    console.log("the hash map looks like this: ", hash);
    return Object.keys(hash);
};

console.log(removeDuplicateLetters("bcabc"));
// Incomplete

334. Increasing Triplet Subsequence

/*Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. 
If no such indices exists, return false.*/

// yay I did it, I came up with O(N) t and O(1) s solution
let increasingTriplet = function (nums){
	if(nums.length < 3)
		return false;
	let minTillNow = nums[0];
	let secMinTillNow = +Infinity;
	for(let i = 1; i < nums.length; i++){
		if(nums[i] > minTillNow){
			if(nums[i] > secMinTillNow)
				return true;
			secMinTillNow = Math.min(secMinTillNow, nums[i])
		}
		else
			minTillNow = nums[i];
	}
	return false;	
}


//357. Count Numbers With Unique Digits
//Given an integer n, return the count of all numbers with unique digits, x, where 0 <= x < 10n.

var countNumbersWithUniqueDigits = function(n) {
	if(n <= 1)
		return 10**n;
    let dp = Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 10;
    for(let i = 2; i <= n; i++){
    	let p = 9;
    	for(let j = 9; j >= 11-i; j--){
    		p *= j;
    	}
    	dp[i] = p + dp[i-1];
    }
    return dp[n];
};