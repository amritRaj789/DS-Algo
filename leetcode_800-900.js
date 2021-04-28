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


/*877. Stone Game

Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, 
and each pile has a positive integer number of stones piles[i].
The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.
Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of 
stones from either the beginning or the end of the row.  This continues until there are no more piles left, 
at which point the person with the most stones wins.
Assuming Alex and Lee play optimally, return True if and only if Alex wins the game.
*/


// dynamic programming approach
let stoneGame = function (piles){
	let dp = Array(piles.length).fill(null).map(() => Array(piles.length).fill([0, 0]));
	for(let i = 0; i < piles.length; i++){
		dp[i][i] = [piles[i], 0];
	}
	for(let i = 2; i <= piles.length; i++){
		for(let j = 0; j <= piles.length-i; j++){
			let val1 = piles[j] + dp[j+1][j+i-1][1];
			let val2 = piles[j+i-1] + dp[j][j+i-2][1];
			dp[j][j+i-1] = val1 > val2 ? [val1, dp[j+1][j+i-1][0]] : [val2, dp[j][j+i-2][0]];
		}
	}
	return dp[0][piles.length-1][0] > dp[0][piles.length-1][1];
}

//maths solution . try to see here that no matter what the first player (Alex) always wins
let stoneGame = function(piles){
	return true;
}