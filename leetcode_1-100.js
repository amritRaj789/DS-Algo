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

/*2. Add two numbers
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/
var addTwoNumbers = function(l1, l2) {
	let result = new ListNode();
	let resultHead = result;
	let carryOver = 0;
	while(l1 !== null || l2 !== null){
		val1 = (l1 === null) ? 0 : l1.val;
		val2 = (l2 === null) ? 0 : l2.val;
		sum = val1 + val2 + carryOver;
		carryOver = Math.floor(sum/10);
		result.next = new ListNode(sum%10);
		l1 = l1===null ? null : l1.next;
		l2 = l2===null ? null : l2.next;
		result = result.next;
	}
    if(carryOver)
        result.next = new ListNode(1);
	return resultHead.next
};


// 3. Longest substring without repeating characters.
//  Given a string s, find the length of the longest substring without repeating characters.

function no_repeat(str){
	let windowEnd;
	let windowStart = 0;
	let hashMap = {};
	let maxLength = 0;
	for(windowEnd = 0; windowEnd < str.length; windowEnd++){
		if(hashMap[str[windowEnd]] >= windowStart){
			windowStart = hashMap[str[windowEnd]] + 1;
		}
		hashMap[str[windowEnd]] = windowEnd;
		maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
	}
	return maxLength;
}
console.log(no_repeat("abcabcbb"));

/*6. ZigZag Conversion
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows 
like this: (you may want to display this pattern in a fixed font for better legibility)
*/
var convert = function(s, numRows) {
    let table = Array(numRows).fill(0);
    for(let i = 1; i <= numRows; i++){
        table[i-1] = "";
    }
    let i = 0;
    while(i < s.length){
        let row1 = 1;
        while(row1 <= numRows && i < s.length){
            table[row1-1] += s[i];
            i++;
            row1++;
        }
        let row2 = numRows-1;
        while(row2 > 1 && i < s.length){
            table[row2-1] += s[i];
            i++;
            row2--;
        }
    }
    let answer = "";
    for(let i = 0; i < numRows; i++){
        answer += table[i];
    }
    return answer;
};

/*9. Palindrome Number
Given an integer x, return true if x is palindrome integer.
An integer is a palindrome when it reads the same backward as forward. 
For example, 121 is palindrome while 123 is not.
*/
var isPalindrome = function(x) {
    if(x < 0)
        return false;
    let original = x;
    let reversed = 0;
    while(x > 0){
        reversed = reversed*10 + (x%10);
        x = Math.floor(x/10);
    }
    return original === reversed
};
 

// 11. Container with Most Water
/*Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). 
n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.
*/
function maxWater (height){
	let left = 0;
	let right = height.length-1;
	let maxVolWater = 0;
	let currentWater = 0;
	while(left < right){
		currentWater = (right - left)*(Math.min(height[left], height[right]));
		maxVolWater = Math.max(maxVolWater, currentWater);
		if(height[left] < height[right])
			left++;
		else
			right--;
	}
	return maxVolWater;
}


/*15. 3Sum
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.
*/
var threeSum = function (nums){
	nums.sort((a, b) => a-b);
	let result = [];
	for(let i = 0; i < nums.length-2; i++){
		if(i > 0 && nums[i] === nums[i-1])
			continue;
		twoSum(nums, i+1, -nums[i], result);
	}
	return result;
}
function twoSum (arr, left, target, result){
	let right = arr.length-1;
	while(left < right){
		if(arr[left] + arr[right] < target)
			left++;
		else if(arr[left] + arr[right] > target)
			right--;
		else{
			result.push([-target, arr[left], arr[right]]);
			left++;
			right--;
			while(left < right && arr[left] === arr[left-1])
				left++
			while(left < right && arr[right] === arr[right+1])
				right--;
		}
	}
}

/*17. Letter Combinations of a Phone Number
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. 
Return the answer in any order.
A mapping of digit to letters (just like on the telephone buttons) is given below. 
Note that 1 does not map to any letters.
*/
const letterCombinations = (digits) => {
  if (digits === "") return [];
  let map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  const result = [];
  const backtrack = (str, level) => {
    if (level === digits.length) {
      result.push(str);
      return;
    }
    for (const c of map[digits[level]]) {
      backtrack(str+c, level+1);
    }
  };
  backtrack('',0);
  return result;
};
/*18. 4Sum
Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
Notice that the solution set must not contain duplicate quadruplets.
*/
const fourSum = function(nums, target) {
  let quadruplets = [];
  nums.sort((a, b) => a-b);
  for(let i = 0; i < nums.length-3; i++){
  	if(i >= 1 && nums[i] === nums[i-1])
  		continue;
  	for(let j = i+1; j < nums.length-2; j++){
  		if(j >= i+2 && nums[j] === nums[j-1])
  			continue;
  		let left = j+1; 
  		let right = nums.length-1;
  		while(left < right){
  			sum = nums[i] + nums[j] + nums[left] + nums[right];
  			if(sum < target)
  				left++;
  			else if(sum > target)
  				right--;
  			else{
  				quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
  				left++;
  				right--;
                while(left < right && nums[left] === nums[left-1])
				    left++
			    while(left < right && nums[right] === nums[right+1])
				    right--;
  			}
  		}
  	}
  }
  return quadruplets;
};

/*19. Remove Nth Node from End of List
Given the head of a linked list, remove the nth node from the end of the list and return its head
*/
var removeNthFromEnd = function (head, n){
	let slow = head;
	let fast = head;
	while(n > 0){
		fast = fast.next;
		n--;
	}
	if(fast === null){
		return head.next;
	}
	while(fast.next !== null){
		slow = slow.next;
		fast = fast.next;
	}
	let temp = slow.next.next;
	slow.next = temp;
	return head;
}
10 -> 5 -> 6 -> 7 -> 12 -> 30, n = 6


// 20. Valid Parentheses
/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
*/
function isValid(s){
	if(s == "")
		return true;
	let stack = [];
	let hash = {
		'(' : ')',
		'{' : '}',
		'[' : ']'
	}

	for(let i = 0; i < s.length; i++){
		if(s[i] == '(' || s[i] == '{' || s[i] == '[')
			stack.push(s[i]);
		else{
			let temp = stack.pop();
			if(hash[temp] !== s[i])
				return false
		}
	}
	if(stack.length !== 0)
		return false;
	return true;
}

// 21. Merge 2 Sorted LinkedLists

let mergeTwoLists = function (l1, l2){
	let head = new ListNode();
	let current = head;
	while(l1 !== null && l2 !== null){
		if(l1.val < l2.val){
			current.next = new ListNode(l1.val);
			current = current.next;
			l1 = l1.next;
		}
		else if(l1.val == l2.val){
			current.next = new ListNode(l1.val);
			current = current.next;
			current.next = new ListNode(l2.val);
			current = current.next;
			l1 = l1.next;
			l2 = l2.next;
		}
		else {
			current.next = new ListNode(l2.val);
			current = current.next;
			l2 = l2.next;
		}
	}
	if(l1 === null && l2 === null)
		return head.next;
	else if(l1 === null){
		while(l2 !== null){
			current.next = new ListNode(l2.val);
			current = current.next;
			l2 = l2.next;
		}
		return head.next;
	}
	else{
		while(l1 !== null){
			current.next = new ListNode(l1.val);
			current = current.next;
			l1 = l1.next;
		}
		return head.next;
	}

}

/*22. Generate Parantheses
Given n pairs of parentheses, 
write a function to generate all combinations of well-formed parentheses.
*/
let generateParenthesis = function(n){
  if(n === 1)
    return ["()"];
  let result = [];
  function backtrack(open, close, str){
    if(open === n && close === n){
      result.push(str);
      return
    }
    if(close > open || open > n || close > n)
      return
    backtrack(open+1, close, str+"(");
    backtrack(open, close+1, str+")");
  }
  backtrack(0,0,"");
  return result;
}

/*24. Swap Nodes in Pairs
Given a linked list, swap every two adjacent nodes and return its head
*/
var swapPairs = function (head){
	let currNode = head;
	while(currNode !== null && currNode.next !== null){
		let tempVal = currNode.val;
		currNode.val = currNode.next.val;
		currNode.next.val = tempVal;
		currNode = currNode.next.next;
	}
	return head;
}


/*34. Find first and last position of element in Sorted Array
*/
let searchRange = function (nums, target){
    if(nums.length === 0)
        return [-1, -1]
	function findMid(nums, target){
		let left = 0;
		let right = nums.length-1;
		while(left <= right){
			let mid = Math.floor((left + right)/2);
			if(nums[mid] === target)
				return mid;
			else if(target > nums[mid])
				left = mid+1;
			else
				right = mid-1;
		}
		return false
	}
	let index = findMid(nums, target);
	if(index === false)
		return [-1, -1];
	else{
		let start = index;
		while(nums[start] === target && start >= 0){
			start--;
		}
		let end = index;
		while(nums[end] === target && end < nums.length){
			end++;
		}
		return [start+1, end-1];
	}
}

// 37. Solve Sudoku

function isValid (num, board, row, col){
    //check col
    for(let i = 0; i < 9; i++){
        if(board[i][col] === num)
            return false;
    }
    //check row
    for(let i = 0; i < 9; i++){
        if(board[row][i] === num)
            return false;
    }
    //check grid
    let rowStart = Math.floor(row/3)*3;
    let colStart = Math.floor(col/3)*3;
    for(let i = rowStart; i < rowStart+3; i++){
        for(let j = colStart; j < colStart+3; j++){
            if(board[i][j] === num)
                return false;
        }
    }
    return true;
}
const possibleNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let solveSudoku = function (board){
    const emptypoints = [];
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === ".")
                emptypoints.push({row: i, col: j});
        }
    }
    function backTrack (emptypointsIndex){
        if(emptypointsIndex >= emptypoints.length)
            return true;
        let {row, col} = emptypoints[emptypointsIndex];
        for(let num of possibleNumbers){
            if(isValid(num, board, row, col)){
                board[row][col] = num;
                if(backTrack(emptypointsIndex+1))
                    return true
                board[row][col] = "."
            }
        }
        return false
    }
    backTrack(0);
    return board;
}

//39. Combination Sum

/*Given an array of distinct integers candidates and a target integer target, 
return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
The same number may be chosen from candidates an unlimited number of times. 
Two combinations are unique if the frequency of at least one of the chosen numbers is different.
It is guaranteed that the number of unique combinations that sum up to target 
is less than 150 combinations for the given input.
*/
var combinationSum = function(candidates, target) {
  let result = [];
    function recursive(sum, arr, i){
      if(sum === target){
        result.push([...arr]);
        return
      }
      if(i === candidates.length)
        return 
      if(candidates[i]+sum > target)
        recursive(sum, [...arr], i+1);
      else{
        recursive(sum+candidates[i], [...arr, candidates[i]], i)
        recursive(sum, [...arr], i+1);
      }
    }
  recursive(0, [], 0);
  return result;
};


// interesting thing to note is, although this question can be solved using Dynamic programming
// it doesn't result in more efficiency. So I am beginning to understand how DP differs from backtracking
// and when to use which one

/*40. Combination Sum II
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates 
where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.
*/
var combinationSum2 = function(candidates, target) {
  candidates.sort((a, b) => a-b);
  let result = [];
    function recursive(sum, arr, i){
      if(sum === target){
        result.push([...arr]);
        return
      }
      if(i === candidates.length)
        return 
      if(candidates[i]+sum > target)
        recursive(sum, [...arr], i+1);
      else{
        recursive(sum+candidates[i], [...arr, candidates[i]], i+1);
        let nextUniqueIndex = i;
        while(nextUniqueIndex < candidates.length){
          if(candidates[i] !== candidates[nextUniqueIndex])
            break;
          nextUniqueIndex++;
        }
        recursive(sum, [...arr], nextUniqueIndex);
      }
    }
  recursive(0, [], 0);
  return result;
};




/*51. N-Queens
Return all distinct solutions to the n queens problem
*/
let solveNQueens = function (n){
	let board = Array(n).fill(null).map(() => Array(n).fill(0));
	let result = [];
	function recursive(board, row){
		for(let i = 0; i < n; i++){
			if(isValid(board, row, i, n)){
				board[row][i] = 1;
				if(row === n-1){
					let newBoard = Array(n)
					for(let j = 0; j < n; j++){
						newBoard[j] = "";
						for(let k = 0; k < n; k++){
							if(board[j][k] === 1)
								newBoard[j] += 'Q'
							else
								newBoard[j] += '.'
						}
					}
					result.push(newBoard);
				}
				else
					recursive(board, row+1);
			}
			board[row][i] = 0;
		}
	}
	recursive(board, 0);
	return result;
}

function isValid(board, row, col, n){
	// check column
	for(let i = 0; i < n; i++){
		if(board[i][col] === 1)
			return false;
	}
	//check row
	for(let i = 0; i < n; i++){
		if(board[row][i] === 1)
			return false;
	}
	// check top-left diagonal
	let i = row-1;
	let j = col-1;
	while(i >= 0 && j >= 0){
		if(board[i][j] === 1)
			return false;
		i--;
		j--;
	}
	//check top-right diagonal
	i = row-1;
	j = col+1;
	while(i >= 0 && j < n){
		if(board[i][j] === 1)
			return false;
		i--;
		j++;
	}
	//check bottom left diagonal
	i = row+1;
	j = col-1;
	while(i < n && j >= 0){
		if(board[i][j] === 1)
			return false;
		i++;
		j--;
	}
	//check bottom right diagonal
	i = row+1;
	j = col+1;
	while(i < n && j < n){
		if(board[i][j] === 1)
			return false;
		i++;
		j++;
	}
	return true;
}

//52. N-Queens II
// Count the number of ways to place n queens in a nxn chessboard
let totalNQueens = function (n){
	let board = Array(n).fill(null).map(() => Array(n).fill(0));
	let count = 0;
	function recursive(board, row){
		for(let i = 0; i < n; i++){
			if(isValid(board, row, i, n)){
				board[row][i] = 1;
				if(row === n-1)
					count++;
				else
					recursive(board, row+1);
			}
			board[row][i] = 0;
		}
	}
	recursive(board, 0);
	return count;
}

function isValid(board, row, col, n){
	// check column
	for(let i = 0; i < n; i++){
		if(board[i][col] === 1)
			return false;
	}
	//check row
	for(let i = 0; i < n; i++){
		if(board[row][i] === 1)
			return false;
	}
	// check top-left diagonal
	let i = row-1;
	let j = col-1;
	while(i >= 0 && j >= 0){
		if(board[i][j] === 1)
			return false;
		i--;
		j--;
	}
	//check top-right diagonal
	i = row-1;
	j = col+1;
	while(i >= 0 && j < n){
		if(board[i][j] === 1)
			return false;
		i--;
		j++;
	}
	//check bottom left diagonal
	i = row+1;
	j = col-1;
	while(i < n && j >= 0){
		if(board[i][j] === 1)
			return false;
		i++;
		j--;
	}
	//check bottom right diagonal
	i = row+1;
	j = col+1;
	while(i < n && j < n){
		if(board[i][j] === 1)
			return false;
		i++;
		j++;
	}
	return true;
}

/* 56. Merge Intervals
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, 
and return an array of the non-overlapping intervals that cover all the intervals in the input.
*/

var merge = function(intervals) {
    if(intervals.length < 2)
        return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    let merged =  [];
    let start = intervals[0][0];
    let end = intervals[0][1];
    
    for(let i = 1; i < intervals.length; i++){
        if(intervals[i][0] <= end){
            end = Math.max(intervals[i][1], end)
        }
        else{
            merged.push([start, end]);
            start = intervals[i][0];
            end = intervals[i][1];
        }
    }
    merged.push([start, end]);
    return merged;
};

/*57. Insert Intervals
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
You may assume that the intervals were initially sorted according to their start times

*/
var insert = function(intervals, newInterval) {
    let i = 0;
    while(i < intervals.length && intervals[i][1] < newInterval[0]){
        i++;
    }
	const start = i;    
    while(i < intervals.length && intervals[i][0] <= newInterval[1]){
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        i++;
    }
    intervals.splice(start, i-start, newInterval);
    
    return intervals;
};
// In place and O(N);

/*61. Rotate List

Given the head of a linked list, rotate the list to the right by k places
*/
var rotateRight = function (head, k){
	if(head==null || head.next == null)
		return head;
	let node = head;
	let length = 1;
	while(node.next !== null){
		length++;
		node = node.next;
	}
	let n = k%length;
	if(n===0)
		return head;
	let curr = head;
	let count = length-n;
	while(count > 1){
		curr = curr.next;
		count--;
	}
	let tempNode = curr.next;
	node.next = head;
	curr.next = null;
	return tempNode;
}

/*71. Simplify Path

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.
In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.
*/var simplifyPath = function(path) {
	let stack = [];
	let splitted = path.split("/");
	for(let str of splitted){
		if(str === "" || str === ".")
			continue;
		else if(str === ".."){
			stack.pop();
		}
		else {
			stack.push(str);
		}
	}
	const result = "/" + stack.join("/");
	return result;
}


/*76. Minimum window substring

Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string "".
Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in s.
*/

function minWindow (s, t){
	let windowStart = 0;
	let hashMap = {};
	let matched = 0;
	let minLength = +Infinity;
	let stringStart = 0;
	for(let i = 0; i < t.length; i++){
		if(!hashMap[t[i]]){
			hashMap[t[i]] = 0
		}
		hashMap[t[i]]++;
	}
	for (let windowEnd = 0; windowEnd < s.length; windowEnd++){
		if(s[windowEnd] in hashMap){
			hashMap[s[windowEnd]]--;
			if(hashMap[s[windowEnd]] === 0)
				matched++;
		}
		
		while(matched === Object.keys(hashMap).length){
			if(s[windowStart] in hashMap){
				hashMap[s[windowStart]]++;
				if(hashMap[s[windowStart]] === 1){
					if(windowEnd - windowStart + 1 < minLength){
						minLength = windowEnd - windowStart + 1;
						stringStart = windowStart;
					}
					matched--;
				}
			}
			windowStart++;
		}
	}
	return (minLength === Infinity ? "" : s.slice(stringStart, minLength));
}

// console.log(minWindow("ADOBECODEBANC", "ABC"));



// 83. Remove Duplicates from sorted List

function deleteDuplicates (head){
	if(head == null)
		return null;
	let prevNode = head;
	let node = head.next;
	while(node){
		if(node.val == prevNode.val){
			prevNode.next = node.next;
			node = node.next;
		}
		else{
			prevNode = node;
			node = node.next;
		}
	}
	return head;
}

//Hello from my new Laptop

/*96. Unique Binary Search Trees
Given an integer n, return the number of structurally unique BST's (binary search trees) 
which has exactly n nodes of unique values from 1 to n.*/

#red red red red red red red red red red red red

var numTrees = function(n) {
    let G = new Array(n+1).fill(0);
    G[0] = 1;
    G[1] = 1;
    for (let i=2;i<=n;i++) {
        for (let j=1;j<=i;j++) {
            G[i]+=G[j-1] * G[i - j];
        }
    }
    return G[n];
};
// We just have to arrange different no. of nodes on each side of the root node
// The value of the nodes doesn't matter. Suppose we select 4 as root node, then 1 to 3 goes to left and 5 to n goes to right