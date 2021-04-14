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
