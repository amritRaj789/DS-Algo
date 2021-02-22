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

