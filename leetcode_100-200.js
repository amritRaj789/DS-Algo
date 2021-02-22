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


