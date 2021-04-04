/*101. Symmetric Tree
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
*/
//iterative
let isSymmetric = function (root){
	let queue = [root.left, root.right];
	while(queue.length !== 0){
		temp1 = queue.shift();
		temp2 = queue.shift();
		if(temp1 === null && temp2 === null)
			continue;
		if(temp1 === null || temp2 === null)
			return false;
		if(temp1.val !== temp2.val)
			return false;
		queue.push(temp1.left)
		queue.push(temp2.right)
		queue.push(temp1.right)
		queue.push(temp2.left)
	}
	return true;
}
//recursive
let isSymmetric = function(root){
	function helper(node1, node2){
		if(node1 === null && node2 === null)
			return true
		if(node1 === null || node2 === null)
			return false;
		if(node1.val !== node2.val)
			return false;
		return (helper(node1.left, node2.right) && helper(node1.right, node2.left))
	}
	return helper(root.left, root.right);
}

/*102. Binary Tree Level Order Traversal
Given the root of a binary tree, return the level order traversal of its nodes' values. 
(i.e., from left to right, level by level).
*/
var levelOrder = function(root) {
    if(root === null)
        return []
    let queue = [root];
    let result = [];
    let count;
    let arr = [];
    while(queue.length !== 0){
        count = queue.length;
        while(count > 0){
            temp = queue.shift();
            arr.push(temp.val);
            if(temp.left)
                queue.push(temp.left);
            if(temp.right)
                queue.push(temp.right);
            count--;
        }
        result.push([...arr]);
        arr = [];
    }
    return result;
};
// Recursive
let levelOrder = function (root){
	if(root == null)
		return [];
	const result = [];
	function recBFS (node, level){
		if(result[level] === undefined)
            result.push([]);
		    result[level].push(node.val);
		if(node.left)
			recBFS(node.left, level+1);
		if(node.right)
			recBFS(node.right, level+1);
	}
	recBFS(root, 0);
	return result;
}

// 103. Binary Tree ZigZag Level order traversal

var zigzagLevelOrder = function(root) {
	if(!root)
		return []
	let queue = [root];
	let even = true;
	let result = [];
	while(queue.length !== 0){
		count = queue.length;
		arr = []
		while(count > 0){
			temp = queue.shift();
			arr.push(temp.val);
			if(temp.left)
				queue.push(temp.left);
			if(temp.right)
				queue.push(temp.right);
			count--;
		}
		if(even){
			result.push(arr)
			even = false;
		}
		else{
			reverseArr = [];
			for(let i = arr.length-1; i >= 0; i--){
				reverseArr.push(arr[i]);
			}
			result.push(reverseArr);
			even = true;
		}
	}
	return result;
};

// Recursive
let zigzagLevelOrder = function(root){
	if(root === null)
		return [];
	const result = [];
	function recursive(node, level){
		if(result[level] === undefined)
			result.push([]);
		if(level % 2 === 0)
			result[level].push(node.val);
		else
			result[level].unshift(node.val);
		if(node.left)
			recursive(node.left, level+1);
		if(node.right)
			recursive(node.right, level+1);
	}
	recursive(root, 0)
	return result;
}


/*107. Binary Tree Level Order Traversal II
Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. 
(i.e., from left to right, level by level from leaf to root).
*/
//recursive
var levelOrderBottom = function(root) {
  if(root == null)
  	return [];
  const height = getHeight(root);
  const result = new Array(height);
  function recursive (node, l){
    if(result[height-l] == undefined)
        result[height-l] = [];
  	result[height-l].push(node.val);
  	if(node.left)
  		recursive(node.left, l+1);
  	if(node.right)
  		recursive(node.right, l+1);
  }
  recursive(root, 1);
  return result;
};

function getHeight (root){
	let maxHeight = 0;
	function rec(node, height){
		if(node === null){
			maxHeight = Math.max(maxHeight, height);
			return;
		}
		rec(node.left, height+1);
		rec(node.right, height+1);
	}
	rec(root, 0);
	return maxHeight;
}

// iterative
let levelOrderBottom = function (root){
	if(root == null)
		return [];
	let queue = [root];
	while(queue.length !== 0){
		count = queue.length;
		arr = [];
		while(count > 0){
			temp = queue.shift();
			arr.push([temp.val])
			if(temp.left)
				queue.push(temp.left)
			if(temp.right)
				queue.push(temp.right)
			count--;
		}
		result.push(arr);
	}
	return reversed = [];
	for(let i = result.length-1; i > 0; i++){
		reversed.push(result[i])
	}
	return reversed;
}


/*111. Minimum Depth of Binary Tree
Given a binary tree, find its minimum depth.
The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
*///recursive
var minDepth = function(root) {
	if(root === null)
		return 0;
	function recursive(node, height){
		if(node == null)
			return +Infinity
		if(node.left == null && node.right == null)
			return height+1;
		else
			return Math.min(recursive(node.left, height+1), recursive(node.right, height+1))
	}
	return recursive(root, 0);
};
// Iterative
var minDepth = function(root) {
	let queue = [root];
	let level = 1;
	while(queue.length !== 0){
		count = queue.length;
		while(count > 0){
			temp = queue.shift();
			if(temp.left == null && temp.right == null)
				return level
			if(temp.left)
				queue.push(temp.left);
			if(temp.right)
				queue.push(temp.right);
			count--;
		}
		level++;
	}
}
/*141. Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.
*/
var hasCycle = function (head){
	let slow = head;
	let fast = head;
	while(fast !== null && fast.next !== null){
		fast = fast.next.next;
		slow = slow.next;
		if(fast === slow){
			return true;
		}
	}
	return false
}

/*150 Evaluate Reverse Polish Notation
*/
var evalRPN = function(tokens) {
    let stack = [];
	let math = {
		'+' : (x,y) => x+y,
		'-' : (x,y) => x-y,
		'*' : (x,y) => x*y,
		'/' : (x,y) => {
				if(x < 0 || y < 0)
					return Math.ceil(x/y)
				else
					return Math.floor(x/y)
			},
	}
	for(let i = 0; i < tokens.length; i++){
		if(!isNaN(tokens[i])){
			stack.push(parseInt(tokens[i]));
		}
		else{
			let t1 = stack.pop();
			let t2 = stack.pop();
			stack.push(math[tokens[i]](t2, t1));
		}
	}
	
	return stack.pop();
};

/*155. Min Stack
	Design a stack that supports push, pop, top and retreiving the minimum element in constant time
*/

var MinStack = function() {
  this.elements = [];
};

MinStack.prototype.push = function(x) {
  this.elements.push({
    value: x,
    min: this.elements.length === 0 ? x : Math.min(x, this.getMin()),
  });
};
MinStack.prototype.pop = function() {
  this.elements.pop();
};
MinStack.prototype.top = function() {
  return this.elements[this.elements.length - 1].value;
};
MinStack.prototype.getMin = function() {
  return this.elements[this.elements.length - 1].min;
};


// 160. Intersection of Two Linked Lists
//Write a program to find the node at which the intersection of 2 singly linked lists begins.
// I can do it in brute force, for every node in one LL, check if it is also pointed by another node from the other LL
//So I checked and we cannot have object key's as objects. Therefore there is no other way but to use hash collision resolution

function getIntersectionNode (headA, headB){
	if(headA === null || headB === null)
		return null;
	let hash = {};
	while(headA){
		if(!(headA.val in hash))
			hash[headA.val] = [];
		hash[headA.val].push(headA);
		headA = headA.next;
	}
	while(headB){
		if(headB.val in hash){
			for(value of hash[headB.val]){
				if(value == headB)
					return headB
			}
		}
		headB = headB.next;
	}
	return null;
}

// 2 pointers approach (really neat solution)

function getIntersectionNode(head, headB){
	if(headA === null || headB === null)
		return null;
	let currA = headA;
	let lastA;
	let lastB;
	let currB = headB;
	while(currA){
		if(currA.next === null){
			lastA = currA;
			// currA.next = headB;
			// currA = headB;
			break;
		}
		currA = currA.next;
	}
	while(currB){
		if(currB.next === null){
			lastB = currB;
			// currB = headA;
			break;
		}
		currB = currB.next;
	}
	if(lastA !== lastB)
		return null;
	currA = headA;
	currB = headB;
	while(true){
		if(currA === currB)
			return currA;
		if(currA.next !== null)
			currA = currA.next;
		else
			currA = headB;
		if(currB.next !== null)
			currB = currB.next
		else
			currB = headA;
	}
	return null;
}

// 2 pointers shorter code
function getIntersectionNode (headA, headB){
	let pA = headA;
	let pB = headB;
	while(pA !== pB){
		pA = (pA===null) ? headB : pA.next;
		pB = (pB===null) ? headA : pB.next;
	}
	return pA;
}
// Wow I am so amazed, the above code does exactly the same thing as the one above it. But this is so so so much shorter

