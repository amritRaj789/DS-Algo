/*967. Numbers with Same consecutive differences

Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.
Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.
You may return the answer in any order.
*/
var numsSameConsecDiff = function(n, k) {
    let result = [];
    function backtrack(number, level){
    	if(level === n){
    		result.push(number)
    		return
    	}
    	let lastDigit = number%10;
    	if(k === 0)
    		backtrack(number*10+lastDigit, level+1);
    	else{
	     	if(lastDigit+k <= 9)
	    		backtrack(number*10+lastDigit+k, level+1);
	    	if(lastDigit-k >= 0)
	    		backtrack(number*10+lastDigit-k, level+1);
    	}
    }
    for(let i = 1; i <= 9; i++){
    	backtrack(i, 1);
    }
    return result;
};


/*
978. Longest Turbulent SubArray

Given an integer array arr, return the length of a maximum size turbulent subarray of arr.
A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.*/

var maxTurbulenceSize = function(arr) {
	if(arr.length == 2 && arr[0] !== arr[1])
		return 2;
    let maxLength = 1;
	let left;
	left = (arr[0] == arr[1]) ? 1 : 0;
	for(let right = 1; right < arr.length-1; right++){
		if(arr[right] == arr[right+1])
			left = right+1;
		else if(arr[right] > arr[right+1]){
			if(!((arr[right-1] < arr[right]) || (arr[right-1] == arr[right])))
				left = right;
		}
		else{
			if(!((arr[right-1] > arr[right]) || (arr[right-1] == arr[right])))
				left = right;
		}
		maxLength = Math.max(maxLength, right-left+2);
	}
	return maxLength;
};
console.log(maxTurbulenceSize([9,4,2,10,7,8,8,1,9]));//5


// 980. Unique Paths III

// backtracking, dfs
/*On a 2-dimensional grid, there are 4 types of squares:
1 represents the starting square.  There is exactly one starting square.
2 represents the ending square.  There is exactly one ending square.
0 represents empty squares we can walk over.
-1 represents obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.
*/
let uniquePathsIII = function (grid){
	let result = 0;
	let count = 0;
	const m = grid.length;
	const n = grid[0].length;
	let newBoard = new Array(m+2);
	for(let i = 0; i < m+2; i++){
		newBoard[i] = new Array(n+2).fill(-1);
	}
	let start;
	for(let i = 1; i < m+1; i++){
		for(let j = 1; j < n+1; j++){
			newBoard[i][j] = grid[i-1][j-1];
			if(newBoard[i][j] === 1)
				start = [i, j];
			if(newBoard[i][j] === 0)
				count++;
		}
	}
	function traverse(i, j, board, count){
		if(board[i][j] === 2){
			if(count >= 0)
				return
			result++;
			return;
		}
		let original = board[i][j];
		board[i][j] = -1;
		if(board[i+1][j] !== -1)
			traverse(i+1, j, board, count-1);
		if(board[i][j+1] !== -1)
			traverse(i, j+1, board, count-1);
		if(board[i-1][j] !== -1)
			traverse(i-1, j, board, count-1);
		if(board[i][j-1] !== -1)
			traverse(i, j-1, board, count-1);
		board[i][j] = original;
	}
	traverse(start[0], start[1], newBoard, count);
	return result;
}


// 1004. Longest consecutive ones II
function longestOnes (A, K){
	let array = [0,0];
	let maxLength = 0;
	let left = 0;
	for(let right = 0; right < A.length; right++){
		array[A[right]]++;
		while(array[0] > K){
			if(A[left] == 0){
				array[0]--;
			}
			left++;
		}
		maxLength = Math.max(maxLength, right - left + 1);
	}
	return maxLength;
}
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2));

/*
986. Interval List Intersections

You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
Return the intersection of these two interval lists.
*/
// My solution
var intervalIntersection = function(firstList, secondList) {
    let result = [];
    let i = 0;
    let j = 0;
    while(i < firstList.length && j < secondList.length){
        if(firstList[i][1]  < secondList[j][0]){	//A[i] is less than B[j] no intersection
            i++;
        }
        else if(secondList[j][1] < firstList[i][0]){	//B[j] is less than A[i] no intersection
            j++;
        }
        else{
            let start = Math.max(firstList[i][0], secondList[j][0]);
            let end = Math.min(firstList[i][1], secondList[j][1]);
            result.push([start, end]);
            if(firstList[i][1] > secondList[j][1])
                j++;
            else if(firstList[i][1] < secondList[j][1])
                i++;
            else{
                i++;
                j++;
            }
                
        }
    }
    return result;
};

// Shorter version of the exact same thing
var intervalIntersection = function(firstList, secondList) {
    let result = [];
    let i = 0;
    let j = 0;
    while(i < firstList.length && j < secondList.length){
        let start = Math.max(firstList[i][0], secondList[j][0]);
        let end = Math.min(firstList[i][1], secondList[j][1]);
        if(start <= end)
        	result.push([start, end]);
        if(firstList[i][1] < secondList[j][1])
        	i++;
        else
        	j++;
    }
    return result;
};




// 1052. Grumpy bookstore owner
function maxSatisfied (customers, grumpy, X){
	let sumTotal = 0;
	for(let i = 0; i < customers.length; i++){
		sumTotal += grumpy[i] ? 0 : customers[i];
	}
	let maxSum = 0;
	for(let i = 0; i < X; i++){
		if(grumpy[i]){
			sumTotal += customers[i];
		}
	}
	maxSum = Math.max(maxSum, sumTotal);
	for(i = X; i < customers.length; i++){
		if(grumpy[i]){
			sumTotal += customers[i];
		}
		if(grumpy[i-X]){
			sumTotal -= customers[i-X];
		}
		maxSum = Math.max(maxSum, sumTotal);
	}
	return maxSum;
}
console.log(maxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3));


	function maxOfTheArray(arr, k){
		if(k == 1){
			if(arr[0] >= arr[arr.length-1])
			return arr[0];
			else return arr[arr.length-1];
		}
		else{
			return Math.max((arr[0] + maxOfTheArray(arr.slice(1), k-1)), (arr[arr.length-1] + maxOfTheArray(arr.slice(0, arr.length-1), k-1)));
		}
	}
console.log(maxOfTheArray([1,2,3,4,5,6,1], 3));



// 1432.  Maximum points you can obtain from cards
// Pure Recursion
function maxScore(cardPoints, k){
	if(k == 1){
		if(cardPoints[0] >= cardPoints[cardPoints.length-1])
		return cardPoints[0];
		else return cardPoints[cardPoints.length-1];
	}
	else{
		return Math.max((cardPoints[0] + maxScore(cardPoints.slice(1), k-1)), (cardPoints[cardPoints.length-1] + maxScore(cardPoints.slice(0, cardPoints.length-1), k-1)));
	}
}

// Using a sliding window
function maxScore (cardPoints, k){
	let totalSum = 0;
	let sum = 0;
	let length = cardPoints.length;
	for(let i = 0; i < length; i++){
		totalSum += cardPoints[i];
		if(i < length-k){
			sum += cardPoints[i];
		}
	}
	let minSumWindow = sum;
	for(i = length-k; i < length; i++){
		sum += cardPoints[i];
		sum -= cardPoints[i-length+k];
		minSumWindow = Math.min(minSumWindow, sum);
	}
	return totalSum - minSumWindow
}
console.log(maxScore([1,2,3,4,5,6,1], 3));