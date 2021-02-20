EASY

/*1. Two Sum
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].*/

var twoSum = function(nums, target) {
    const comp = {};
    for(let i = 0; i < nums.length; i++){
        if(comp[nums[i]] >= 0){
            return [comp[nums[i]] , i];
        }
        comp[target - nums[i]] = i;
    }
};

/*2.Remove Duplicates from a Sorted array
Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.*/

 let removeDuplicates = function(nums){
 	let i = 0;
 	for(let j = 1; j < nums.length; j++){
 		if(nums[j] !== nums[i]){
 			i++;
 			nums[i] = nums[j];
 		}
 	}
 	return i+1;
};

/*3. Given an array nums and a value val, remove all instances of that value in-place and return the new length.
Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
The order of elements can be changed. It doesn't matter what you leave beyond the new length.*/
//
const removeElement = function(nums, val){
	let j = 0;
	for(let i = 0; i < nums.length; i++){
		if(nums[i] !== val){
			nums[j] = nums[i];
			j++;
		}
	}
	return j;
};
//
const removeElement = function(nums, val){
	let i = 0;
	let n = nums.length;
	while(i < n){
		if(nums[i] === value){
			nums[i] = nums[n-1];
			n--;
		}
		else{
			i++;
		}
	}
};
//
const removeElement = function(nums, val){
	while(nums.indexOf(val, 0) >= 0){
		nums.splice((nums.indexOf(val, 0)), 1);
	}
	return nums.length;
};

/*4. Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You may assume no duplicates in the array.*/

const searchInsert = function(nums, target){
	let count = false;
	for( let i = 0; i < nums.length; i ++){
		if(nums[i] >= target){
			count = true;
			return i;
		}
	}

	if(count === false)
		return nums.length;
};
const searchInsert = function (nums,target){
	if(nums[0] > target)
		return 0;
	else if(nums[nums.length-1] < target)
		return nums.length;
	else{
		let index = nums.length/2;
		while(c1 < c2){
			index = 
			if(nums[c2] < target){

			}
	}
	}
}

/*5. Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.*/

let maxSubArray = function(nums){

	let maxSum = 0;
	let max_ending_here = 0;
	let max = nums[0];

	for(let i = 0; i < nums.length; i++){
		max_ending_here += nums[i];
		if(max_ending_here < 0){
			max_ending_here = 0;
		}

		if(max_ending_here > maxSum){
			maxSum = max_ending_here;
		}
		if(nums[i] > max)
			max = nums[i];
	}
	if(max < 0)
		return max;
	else
		return maxSum;
};
//This was solved using Kadane's algorithm and comes under Dynamic programming

/*6. Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
You may assume the integer does not contain any leading zero, except the number 0 itself.
Example
Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.*/

let plusOne = function(digits){
	let length = digits.length;
	if(digits[length-1] !== 9){
		digits[length-1]++;
		return digits;
	}
	else if(length === 1 && digits[0] === 9){
		digits[0] = 0;
		digits.unshift(1);
		return digits;
	}
	else{
		let index = 0;
		for(i = length-1; i >= 0; i--){
			if(digits[i] !== 9){
				index = i;
				break;
			}
			digits[i] = 0;
		}
		if(digits[index] === 0)
			digits.unshift(1);
		else
			digits[index]++;
	}
	return digits;
};


var plusOne = function(digits) {
    let len = digits.length;
    let last = len - 1;
    for(let i = 0; i < len; i += 1) {
        if (digits[last - i] < 9) {
            digits[last - i] += 1 ;
            
            return digits;
        }
        
        digits[last - i] = 0;
    }
        
    digits.unshift(1);
    
    return digits;
};

/*7. Merge sorted Arrays
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
Note:
The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
Output: [1,2,2,3,5,6]*/

let merge = function(nums1, m, nums2, n){
	let i = 0;
	let j = 0;
	nums1.splice(m,n);
	if(m === 0){
		for(let c = 0; c < n; c++){
			nums1.pop();
		}
		nums1.push(...nums2);
	}
	else{
		while(i < m && j < n){
			// if(nums1[i] < nums2[j]){
			// 	i++;
			// }
			// else{
			// 	nums1.splice(i,0,nums2[j]);
			// 	i++;
			// 	j++;
			// 	m++;
			// }
			if(nums1[i] >= nums2[j]){
				nums1.splice(i,0,nums2[j]);
				j++;
				m++;
			}
			i++;			
			
		}
		if(j < n || j === 0){
			let temp = nums2.slice(j,n);
			nums1.push(...temp);
		}
	}
};

/*8. Pascal's Triangle
	Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.
	Input: 5
	Output:
	[
	     [1],
	    [1,1],
	   [1,2,1],
	  [1,3,3,1],
	 [1,4,6,4,1]
	]*/

let generate = function(numRows) {
	if(numRows > 2){
	    let pt = [[1], [1,1]];
	    let prevArray = [1, 1]; 
	    for(let i=3; i <= numRows; i++){
	        let currArray = [];
	        currArray[0] = 1;
	        currArray[i-1] = 1; 
	        for(j = 1; j < i-1; j++){
	            currArray[j] = prevArray[j-1] + prevArray[j];
	        }
	        pt.push(currArray);
	        prevArray = currArray;
	    }
	    return pt;
	}
	else if(numRows === 2)
		return [[1], [1,1]];
	}
	else if(numRows === 1){
		return [[1]];
	}
	else {
		return [];
	}
};

/*9. Pascal's triangle 2.0
	Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.
	Note that the row index starts from 0.
	Input: 3
	Output: [1,3,3,1]
*/

//My implementation
let getRow = function (rowIndex){
	let numRows = rowIndex+1;
	if(numRows > 2){
		    // let pt = [[1], [1,1]];
	    let prevArray = [1, 1];
	    let currArray = [];
	    for(let i=3; i <= numRows; i++){
	        currArray = [];
	        currArray[0] = 1;
	        currArray[i-1] = 1; 
	        for(j = 1; j < i-1; j++){
	            currArray[j] = prevArray[j-1] + prevArray[j];
	        }
	        // pt.push(currArray);
	        prevArray = currArray;
	    }
	    return currArray;
	}
	else if(numRows === 2){
		return [1,1];
	}
	else {
		return [1];
	}
};


//Somebody else's
var getRow = function(rowIndex) {
    if (rowIndex < 0) {
        return [];
    }
    
    if (rowIndex === 0) {
        return [1];
    }
    
    if (rowIndex === 1) {
        return [1, 1];
    }
    
    let prevRow = getRow(rowIndex - 1);
    
    let row = [];
    for (let i=0; i<rowIndex+1; i++) {
        let num;
        if (i === 0 || i === rowIndex) {
            num = 1;
        } else {
            num = prevRow[i-1] + prevRow[i];
        }
        row.push(num);
    }
    
    return row;
};

/*10. Best time to buy and sell stock
	Say you have an array for which the ith element is the price of a given stock on day i.
	If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
	Note that you cannot sell a stock before you buy one.

	Input: [7,1,5,3,6,4]
	Output: 5
	Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
	Not 7-1 = 6, as selling price needs to be larger than buying price.
*/

let maxProfit = function(prices){
	let buy = prices[0];
	let sell =  prices[1];
	let profit = sell - buy;
	let highestProfit = 0;
	for(let i = 0; i < prices.length-1; i++){

		if(prices[i] < buy)
			buy = prices[i];

		if(prices[i+1] >= buy){
			sell = prices[i+1];
			profit = sell-buy;
			if(profit > highestProfit)
				highestProfit = profit;
		}
	}
	
	if(highestProfit > 0)
		return highestProfit;
	else
		return 0;
};


/*11. Best Time to Buy and Sell Stock II 

Say you have an array prices for which the ith element is the price of a given stock on day i.
Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
Example 1:
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Example 2:
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
*/
let maxProfit = function(prices){
	let buy = prices[0];
	let profit = 0;
	let sell = prices[0];
	let len = prices.length;
	for(let i = 1; i < len-1; i++){
		if(prices[i-1] >= prices[i] && prices[i] < prices[i+1]){
			buy = prices[i];
		}
		else if (prices[i-1] < prices[i] && prices[i] >= prices[i+1]){
			sell = prices[i];
            profit += sell-buy;
            buy = prices[i+1];
		}
	}
	if(len > 2 && prices[len-2] < prices[len-1]){
		profit += (prices[len-1] - buy);
	}
	if(profit > 0){
		return profit;
	}
	else
		return 0;
};
//Solved using Peak-Valley algorithm

/*12. Two Sum II - Input array is sorted

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.
Note:
Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.
Example:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.
*/

let twoSum = function(nums, target){
	let len = nums.length;
	let i = 0;
	let j = len-1;
	let sum = nums[i] + nums[j];
	while(sum !== target){
		sum < target ? i++ : j++;
		sum = nums[i] + nums[j];
	}
	return [i+1; j+1];
};

/*13. Majority number

Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
You may assume that the array is non-empty and the majority element always exist in the array.
Example 1:
Input: [3,2,3]
Output: 3*/

let majorityElement = function(nums){
	let stored_element = nums[0];
	let counter = 0;
	let len = nums.length;
	for(let i = 0; i < len; i++){
		if(counter === 0){
			counter = 1;
			stored_element = nums[i];
		}
		else{
			(nums[i] === sequence_element) ? counter++ : counter-- ;
			}
	}
	return stored_element;
}
//Solved using Boyer-Moore's majority voting algorithm

/*14. Rotate Array
Given an array, rotate the array to the right by k steps, where k is non-negative.
Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

Follow up:
Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?*/

let rotate = function(nums, k){
	if(k > 0){
		let len = nums.length;
		let temp = nums.splice(len-k, k);
		nums.unshift(...temp);
		return nums;
	}
	else
		return nums;
};

/*15. Contains Duplicate
Given an array of integers, find if the array contains any duplicates.
Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
Example 1:
Input: [1,2,3,1]
Output: true*/

let containsDuplicate = function(nums){
	let hash = {};
	for(let i= 0; i < nums.length; i++){
		if(hash[nums[i]] !== undefined)
			return true;
		else
			hash[nums[i]] = 1;
	}
	return false;	
};
// 
var containsDuplicate = function(nums) {
    return (new Set(nums).size !== nums.length);    
};


/*16. Contains Duplicate II

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.
Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true
*/

let containsNearbyDuplicate = function(nums, k){
	let len = nums.length;
	let hash = {};
	for(let i = 0; i < len; i++){
		if(hash[nums[i]] === undefined){
			hash[nums[i]] = i;
		}
		else{
			if(i-hash[nums[i]] <= k){
				return true;
			}
			else
				hash[nums[i]] = i;
		}
	}
	return false;
};


/*17. UNLOCK PREMIUM
*/

/*18. Missing number
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
Example 1:
Input: [3,0,1]
Output: 2
Example 2:
Input: [9,6,4,2,3,5,7,0,1]
Output: 8*/

let missingNumber = function(nums){
	let sum = 0;
	let n = nums.length;
	nums.forEach((number)=>{
		sum += number;
	});
	console.log(sum);
	return (n*n + n)/2 - sum;
};


/*19. Move Zeroes
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Example:
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
Note:
You must do this in-place without making a copy of the array.
Minimize the total number of operations.*/

//My implementation
let moveZeroes = function(nums){
	let counter = 0;
	let len = nums.length;
	let i = 0;
	for(i = 0; i < len; i++){
		if(nums[i] === 0){
			counter++;
			nums.splice(i, 1);
			len--;
			i--;
		}
	}
	while(counter > 0){
		nums.push(0);
		counter--;
	}
};

//2 pointers method

let moveZeroes = function(nums){
  let n = nums.length;
  let lhs = 0;
  let rhs = 1;
    while(lhs < n && rhs < n) {
        if(nums[lhs] != 0) {
            lhs++;
            rhs++;
            continue;
        }
        else if(nums[rhs] != 0) {
            nums[lhs] = nums[rhs]; 
            nums[rhs] = 0; 
            lhs++; 
            rhs++;
        }
        else {
            rhs++;
        }
    }
};

/*20. Third Maximum Number
Given a non-empty array of integers, return the third maximum number in this array. If it does not exist, return the maximum number. The time complexity must be in O(n).
Example 1:
Input: [3, 2, 1]
Output: 1
Explanation: The third maximum is 1.*/
let thirdMax = function(nums){
	let len = nums.length;
	let max1 = -Infinity;
	let max2 = -Infinity;
	let max3 = -Infinity;
	for(let i = 0; i < len; i++){
		if(nums[i] > max1){
			max1 = nums[i];
		}
	}
	for(let i = 0; i < len; i++){
		if(nums[i] > max2 && nums[i] < max1){
			max2 = nums[i];
		}
	}
	for(let i = 0; i < len; i++){
		if(nums[i] > max3 && nums[i] < max2){
			max3 = nums[i];
		}
	}
	if(max3 === -Infinity)
		return max1;
		
	else
		return max3;
};


/*21. Find All numbers disappeared in an Array
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
Find all the elements of [1, n] inclusive that do not appear in this array.
Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
Example:
Input:
[4,3,2,7,8,2,3,1]
Output:
[5,6]*/

let findDisappearedNumbers = function(nums) {
	let len = nums.length;
	let temp = [];
    let array = new Array(len+1);
    for(let i = 0; i < len; i++){
    	array[nums[i]] = 1;
    }
    for(i=1; i <= len; i++){
    	if(array[i] === undefined){
    		temp.push(i);
    	}
    }
    return temp;

};


/*22. Max Consecutive Ones
Given a binary find the maximum number of consecutive 1s in this array.
Example
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
The maximum number of consecutive 1s is 3.
Note:
The input array will only contain 0 and 1.
The length of input array is a positive integer and will not exceed 10,000*/

let findMaxConsecutiveOnes = function(nums) {
    let count = 0;
    let max_count = 0;
    for(let i = 0; i < nums.length; i++){
    	if(nums[i] === 1){
    		count++;
    	}
    	else{
    		if(count > max_count){
    			max_count = count;
    		}
    		count = 0;
    	}
    }
    if(count > max_count){
    	max_count = count;
    }
    return max_count;
};

// 23. n-th Fibonacci sequence number

let fib = function(n){
	if(n === 1)
		return 1;
	else if (n === 0)
		return 0;
	return fib(n-1) + fib(n-2);
};
let fib = function(n){
	if(n === 0)
		return 0;
	if(n === 1)
		return 1;
	let f0 = 0;
	let f1 = 1;
	f2 = f1 + f0;
	for(let i = 1; i < n; i++){
		f2 = f1 + f0;
		f0 = f1;
		f1 = f2;
	}
	return f2;
};

/*24. K-diff pairs in an Array
Given an array of integers and an integer k, you need to find the number of unique k-diff pairs in the array. Here a k-diff pair is defined as an integer pair (i, j), where i and j are both numbers in the array and their absolute difference is k.
Example 1:
Input: [3, 1, 4, 1, 5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.*/

//My implementation
let findPairs = function(nums, k){
	if(k===0){
		let hash = {};
		let counter = 0;
		for(let i = 0; i < nums.length; i++){
			if(hash[nums[i]] === undefined){
				hash[nums[i]] = 1;
			}
			else{
				hash[nums[i]]++;
			}
		}
		for(let i in hash){
			if(hash[i] >= 2)
				counter++;
		}
		return counter;
	}
	else if(k<0)
		return 0;
	else{
		let counter = 0;
		let uniqueSet = new Set(nums);
		let arr = [...uniqueSet];
		arr.sort((a,b)=>a-b);
		let len = arr.length;
		let left = 0;
		let right = 0;
		while(right < len){
			
			if((arr[right]-arr[left]) < k){
				right++;
			}
			else if((arr[right]-arr[left]) > k){
				left++;
			}
			else{
				counter++;
				right++;
				left++;
			}
		}
		return counter;
	}
	
}


//Others' implementation
var findPairs = function(nums, k) {
    let pairCount = 0;
    let uniques = new Set(nums);
    
    // Something can't have a negative difference - diff is an absolute value 
    if (k < 0) return 0;
    
    // If k is zero, we are basically finding which elements in nums are duplicates
    if (k === 0) return findDuplicates(nums).length;
    
    // Otherwise we find any values with a diff of k
    // Note: you can find this by adding or subtracting by k, no need to do both
    uniques.forEach(val => {
        if (uniques.has(val+k)) {
            pairCount++;
        }
    })
    return pairCount;
};

var findDuplicates = (nums) => {
	let result = [];
	nums.forEach((num, index) => {
		if (nums.indexOf(num, index + 1) > -1) {
            if (result.indexOf(num) === -1) {
                result.push(num);
            }
        }
    })
    return result;
};

/*25. Array Partition I

Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.
Example 1:
Input: [1,4,3,2]
Output: 4
Explanation: n is 2, and the maximum sum of pairs is 4 = min(1, 2) + min(3, 4).
*/
let arrayPairSum = function(nums){
	nums.sort((a,b)=>(a-b));
	let sum = 0;
	for(let i = 0; i <= nums.length-2; i = i+2)
		sum += nums[i];
	return sum;
};




