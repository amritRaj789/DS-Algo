/*26. Reshape the matrix
In MATLAB, there is a very useful function called 'reshape', which can reshape a matrix into a new one with different size but keep its original data.
You're given a matrix represented by a two-dimensional array, and two positive integers r and c representing the row number and column number of the wanted reshaped matrix, respectively.
The reshaped matrix need to be filled with all the elements of the original matrix in the same row-traversing order as they were.
If the 'reshape' operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.
Example 1:
Input: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
Output: 
[[1,2,3,4]]
Explanation:
The row-traversing of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.
*/
//Works in browser, arr.flat() not supported by leetcode as of 18.05.2020
let matrixReshape = function (nums, r, c){
	let a = nums.flat();
	let len = a.length;
	let total = r*c;
	if(len % total === 0){
		let b = [];
		let i = 0;
		while(i < nums.length){
			b.push(a.slice(i, i+c));
			i += c;
		}
		return b;
	}
	else
		return nums;
};



/*27. Shortest Unsorted Continuous SubArray

Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.
You need to find the shortest such subarray and output its length.
Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.*/

//Other's implementation
let findUnsortedSubarray = function(nums) {
    let l = 0, r = nums.length-1, nd = -1, st = 0;
    let min  = Infinity, max = -Infinity;
    while(r>=0){
        nums[l] >= max ? max = nums[l] : nd = l;
        nums[r] <=min ? min = nums[r] : st = r;
        l++;
        r--;
    }
    return nd-st+1;
};

/*28. Can Place Flowers

Suppose you have a long flowerbed in which some of the plots are planted and some are not. However, flowers cannot be planted in adjacent plots - they would compete for water and both would die.
Given a flowerbed (represented as an array containing 0 and 1, where 0 means empty and 1 means not empty), and a number n, return if n new flowers can be planted in it without violating the no-adjacent-flowers rule.
Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: True
Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: False
*/

//The best I could do after numerous attempts at optimization
let canPlaceFlowers = function(flowerbed, n){
	let len = flowerbed.length;
	let count = 0;
	let i = 0;
	if(n === 0)
		return true;

	if(len < (2*n-1))//Array too small to accomodate
		return false;

	while(i < len){
		if(flowerbed[i])
			i = i+2;
		else{
			if(flowerbed[i+1] !== 1){
				count++;
				i = i+2;
			}
			else{
				i = i+3;
			}
		}
	}
	return count >= n
};

//Some weird as fuck solution I pulled up from leetcode. This supposedly beats 100% of the solution
var canPlaceFlowers = function(flowerbed, n) {
    if(n === 0) return true;
    if(!flowerbed) return false;
    if(flowerbed.length === 1){
        if(flowerbed[0] === 0) return true;
        else return false;
    }
    let sum = 0, cnt = 0, hasFlower = false;
    for(let i = 0, len = flowerbed.length; i < len; i++){
        if(flowerbed[i] === 0){
            cnt++;
        }else{
            sum += flowersPlantableInConsecutivePlots(cnt);
            cnt = 0;
            hasFlower = true;
        }
    }
    if(!hasFlower){
        if(flowerbed.length % 2 === 0) return n <= flowerbed.length / 2;
        else return n <= Math.ceil(flowerbed.length / 2);
    }
    let leadingPlots = 0, trailingPlots = 0;
    for(let i = 0, len = flowerbed.length; i < len; i++){
        if(flowerbed[i] === 0){
            leadingPlots++;
        }else{
            break;
        }
    }
    for(let i = flowerbed.length - 1, len = flowerbed.length; i > 0; i--){
        if(flowerbed[i] === 0){
            trailingPlots++;
        }else{
            break;
        }
    }
    if(leadingPlots && leadingPlots % 2 === 0) sum++;
    if(trailingPlots){
        if(trailingPlots % 2 === 0){
            sum += trailingPlots / 2;
        }else{
            sum += Math.floor(trailingPlots / 2);
        }
    }
    return n <= sum;
};

function flowersPlantableInConsecutivePlots(n){
    if(n < 3) return 0;
    if(n % 2 === 0){
        return Math.floor((n - 1) / 2);
    }else{
        return Math.floor(n / 2);
    }
}

// 29. Maximum Distance in Array
    // Locked- Premium


/*30. Maximum Product of Three Numbers

Given an integer array, find three numbers whose product is maximum and output the maximum product.
Example 1:
Input: [1,2,3]
Output: 6

Example 2:
Input: [1,2,3,4]
Output: 24
*/



/*31. Maximum Average Subarray I

Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.
Example 1:
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
Note:
1 <= k <= n <= 30,000.
Elements of the given array will be in the range [-10,000, 10,000]*/

let findMaxAverage = function(nums, k){
    let sum = 0;
    for(let i = 0; i < k; i++){
        sum += nums[0+n];
    }
    let temp = sum;
    for(let i = 1; i <= nums.length-k; i++){
        sum = (sum + nums[i-1+k] - nums[i-1]);
        temp = Math.max(temp, sum);
    }
    return temp/k;
};


/*32. Image smoother

Given a 2D integer matrix M representing the gray scale of an image, you need to design a smoother to make the gray scale of each cell becomes the average gray scale (rounding down) of all the 8 surrounding cells and itself. If a cell has less than 8 surrounding cells, then use as many as you can.
Example 1:
Input:
[[1,1,1],
 [1,0,1],
 [1,1,1]]
Output:
[[0, 0, 0],
 [0, 0, 0],
 [0, 0, 0]]
Explanation:
For the point (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the point (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0*/

//No idea what the fuck all this is about

/*33. Check Possibility for a non-decreasing array

Check if by changing at most one element of the input array we can get a non-decreasing array. 
Return true/false accordingly.*/


let checkPossibility = function(nums){
    if(nums.length <= 2)
        return true
    
    let count = 0;

    if(nums[0] > nums[1])
        count++;
    if(nums[nums.length-1] < nums[nums.length-2])
        count++
    if(count > 1)
        return false

    for(let i = 1; i < nums.length-2; i++){
        if(nums[i+1] < nums[i]){
            if(nums[i+2] >= nums[i])
                count++;
            else if(nums[i+1] >= nums[i-1])
                count++;
            else
                return false
            if(count > 1)
                return false
        }
    }
    return true
};


/*34. Longest Continuous Increasing Sub sequence

Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).
Example 1:
Input: [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5], its length is 3. 
Even though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. */

//My implementation. Don't know why it shows to be slow by leetcode
let findLengthOfLCIS = function(nums) {
    if(nums.length <= 1)
        return nums.length;
    let len = 1;
    let max_len = 1;
    for(let i = 1; i < nums.length; i++){
        if(nums[i] > nums[i-1]){
            len++;
        }
        else{
            if(len > max_len)
                max_len = len;
            len = 1;
        }
    }
    if(len > max_len)
        return len
    return max_len;
};


/*35. Degree of an Array

Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.
Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.
Example 1:
Input: [1, 2, 2, 3, 1]
Output: 2
Explanation: 
The input array has a degree of 2 because both elements 1 and 2 appear twice.
Of the subarrays that have the same degree:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
The shortest length is 2. So return 2.
Example 2:
Input: [1,2,2,3,1,4,2]
Output: 6
*/



/*37. Find Pivot Index

Given an array of integers nums, write a method that returns the "pivot" index of this array.
We define the pivot index as the index where the sum of all the numbers to the left of the index is equal to the sum of all the numbers to the right of the index.
If no such index exists, we should return -1. If there are multiple pivot indexes, you should return the left-most pivot index.
Example 1:
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The sum of the numbers to the left of index 3 (nums[3] = 6) is equal to the sum of numbers to the right of index 3.
Also, 3 is the first index where this occurs.
*/

//My solution
let pivotIndex = function(nums){
    let sum_left = 0;
    let total_sum = 0;
    for(let i = 0; i < nums.length; i++){
        total_sum += nums[i];
    }
    for(let i = 0; i < nums.length; i++){
        if(2*sum_left === (total_sum-nums[i])){
            return i;
        }
        sum_left += nums[i];
    }
    return -1
}

38. 

