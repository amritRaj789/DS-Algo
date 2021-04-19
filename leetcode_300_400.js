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