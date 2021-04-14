----------------------------x----------------------------x----------------------------x----------------------------x----------------------------x
/*120. Triangle
Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
For example, given the following triangle
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
Note:
Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle
*/

//Dynamic Programming bottom up
let count = 0;
let minimumTotal = function (triangle) {
	let rows = triangle.length;
	// there are i elements for any i-th row (i starts from 1)
	let dp = new Array(rows+1).fill(0);
	for(let i = 1 ; i <= rows; i++){
		dp[i] = new Array(i+2).fill(+Infinity);
	}
	dp[1][1] = triangle[0][0];

	for( let i = 2; i <= rows; i++){
		for(let j = 1; j <= i; j++){
			count++;
			dp[i][j] = triangle[i-1][j-1] + Math.min(dp[i-1][j-1], dp[i-1][j]);
		}
	}

	let min = dp[rows][0];
	for(let i = 0; i <= rows; i++){
		count++;
		if(min > dp[rows][i]){
			min = dp[rows][i];
		}
	}
	return min;
}

console.log(minimumTotal([
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]));
console.log("the function ran for this many times: ", count);

// Really elegant solution from community
let count = 0;
let minimumTotal = function (triangle) {
	for (let i = triangle.length-2; i >= 0 ; i--){
		for(let j = 0; j <= i+1; j++) {
			count++;
			triangle[i][j] += Math.min(triangle[i+1][j], triangle[i+1][j+1]);
		}
	}
	return triangle[0][0];
}
console.log(minimumTotal([
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]));
console.log("the function ran for this many times: ", count);



// yet another community solution (RECURSION)
let count = 0;
var minimumTotal = function(triangle) {
  var hash = {};
  return getMin(0, 0);

  function getMin(h, idx) {
  	count++;
    if (h === triangle.length) return 0;
    if (!hash[h + ':' + idx]) {
      hash[h + ':' + idx] = triangle[h][idx] + Math.min(getMin(h + 1, idx), getMin(h + 1, idx + 1))
    }
    return hash[h + ':' + idx];
  }
};
console.log(minimumTotal([
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]));
console.log("the function ran for this many times: ", count);




// 203 Remove Linked List elements

function removeElements (head, val){
	while(head && head.val === val){
		head = head.next;
	}
	if(head === null)
		return null;
	let prevNode = head;
	let node = head.next;
	while(node){
		if(node.val === val){
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

// 206. Reverse A  linked List
//Iterative approach
function reverseList (head){
	let prevNode = null;
	let node = head;
	while(node){
		let temp = node.next;
		node.next = prevNode;
		prevNode = node;
		node = temp;
	}
	head = prevNode;
	return head;
}

//Recursive approach
function reverseList(head){
	if(head==null)
		return null;
	let currNode = head;
	function reverse(node){
		if(node.next == null){
			head = node;
			return
		}
		else{
			reverse(node.next);
			node.next.next = node;
		}
	}
	reverse(currNode);
	currNode.next = null;
	return head;
}

// 213. House Rober II
/*You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. 
That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, 
and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can 
rob tonight without alerting the police.
*/
let rob = function(nums){
	if(nums.length === 1)
		return nums[0];
	if(nums.length <= 3)
		return Math.max(...nums);
	let arr1 = [...nums];
	arr1.pop();
	let arr2 = [...nums];
	arr2.shift();
	let dp1 = new Array(arr1.length);
	dp1[0] = arr1[0];
	dp1[1] = Math.max(arr1[0], arr1[1]);
	let dp2 = new Array(arr2.length);
	dp2[0] = arr2[0];
	dp2[1] = Math.max(arr2[0], arr2[1]);
	for(let i = 2; i < dp1.length; i++){
		dp1[i] = Math.max(arr1[i]+dp1[i-2], dp1[i-1]);
		dp2[i] = Math.max(arr2[i]+dp2[i-2], dp2[i-1]);
	}
	return Math.max(dp1[dp1.length-1], dp2[dp2.length-1]);
}

// 221. Maxinmal Square
/*Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's 
and return its area.
*/
// bottom up DP solution
let maximalSquare = function (matrix){
	let dp = Array(matrix.length).fill(null).map(() => Array(matrix[0].length).fill(0));
	let maxLength = 0;
	for(let i = 0; i < matrix[0].length; i++){
		if(matrix[0][i] === "1"){
            maxLength = 1;
            dp[0][i] = 1;
        }
	}
	for(let i = 0; i < matrix.length; i++){
		if(matrix[i][0] === "1"){
            maxLength = 1;
            dp[i][0] = 1;
        }
	}
	for(let i = 1; i < matrix.length; i++){
		for(let j = 1; j < matrix[0].length; j++){
			if(matrix[i][j] === "1"){
				dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
				if(dp[i][j] > maxLength)
					maxLength = dp[i][j];
			}
		}
	}
	return maxLength**2;
}

 


// 234. Palindrome Linked List
// Given a singly linked list, determine if it is a palindrome

function isPalindrome (head){
	if(head === null || head.next === null)
		return true;

	//find middle of the linked list
	let fast = head;
	let slow = head;
	while(fast !== null && fast.next !== null){
		fast = fast.next.next;
		slow = slow.next;
	}
	headSecondHalf = reverse(slow); // reverse the second half
	copyHeadSecondHalf = headSecondHalf; // stores the head of the reversed list so that we can reverse it back later

	//Compare the first half with the reversed second half
	while(head !== null && headSecondHalf !== null){
		if(head.val !== headSecondHalf.val)
			break;
		head = head.next;
		headSecondHalf = headSecondHalf.next;
	}
	reverse(copyHeadSecondHalf);
	if(head === null || headSecondHalf === null)
		return true;
	return false;

	//helper function to reverse a linked list and return the new head
	function reverse(head){
		let prev = null;
		let node = head;
		while(node){
			let temp = node.next;
			node.next = prevNode;
			prevNode = node;
			node = temp;
		}
		head = prevNode;
		return head;
	}
}

// 237. Delete Node in a Linked List
// you are not given the head of the linked list instead you are given the node to be deleted directly

function deleteNode (node){
	node.val = node.next.val;
	node.next = node.next.next;
}

// 876. Middle of the Linked List
// Given a non-empty, singly linked list with head node, return a middle node of linked list.
// If there are two middle nodes, return the second middle node.

function middleNode(head){
	let fast = head;
	let slow = head;
	while(fast !== null && fast.next !== null){
		fast = fast.next.next;
		slow = slow.next;
	}
	return slow;
}

function getDecimalValue (head){
	let node = head;
	let arr = [];
	while(node){
		arr.push(node.val);
		node = node.next;
	}
	let sum = 0;
	let power = 0;
	for(let i = arr.length-1; i >= 0; i--){
		sum += arr[i] ? Math.pow(2, power) : 0;
		power++;
	}
	return sum;
}