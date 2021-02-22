1769. Minimum number of Operations to Move All Balls to Each box


/*logic: 

at any i-th square, 
min.ops to bring all balls to ith = min.ops to bring balls on the left of i-1th to i-1th + no.of balls on the left of ith
							+ no.of.ops to bring balls on the right of i+1th to i+1th + no.of balls on the right of ith

							which is nothing but equal to

							min.ops to bring all balls to i-1th - no.of balls on the right of ith + no.of balls on the left of ith - ball on ith

							no.ops to bring all balls to i-1th  = no. of ops to bring balls on the left of i-1th to i-1th + no.of ops to bring balls on right of ith to ith+ no.of balls on the right of i-1th

							= no. of ops to bring balls on the left of i-1th to i-1th + no.of ops to bring balls on the right of i+1th to i+1th + 2 times of no.of balls on the right of ith + ball on ith


dp[i] = dp[i-1] + balls on left of i - balls on right of i  - arr[i];
*/
//This is fucking cool. I figured it out all on my own
//Time to code
// I will need a dp array, I will also need a 2d array containing balls on either side of i

var minOperations = function (boxes){
	let dp = new Array(boxes.length);
	

	//Initializing 2D array to store balls on left/right information for each index. 0th index for left, 1st index for right
	let ballsOnSides = new Array(boxes.length);
	for(let i = 0; i < boxes.length; i++){
		ballsOnSides[i] = [0,0];
	}

	dp[0] = 0; //Initializing dp[0]; actual value will be calculated in the loop below

	//Loop to calculate balls on side info as well as dp[0]
	let left = 0;
	let right = 0;
	for(let i = 0; i < boxes.length; i++){
		ballsOnSides[i][0] = left;   //	storing left info from start to end
		ballsOnSides[boxes.length-1-i][1] = right;  //	storing right info from end to start
		left += parseInt(boxes[i]);
		right += parseInt(boxes[boxes.length-1-i]);
		if(parseInt(boxes[i]))
			dp[0] += i;
	}


	//The final DP equation
	for(let i = 1; i < boxes.length; i++){
		dp[i] = dp[i-1] + ballsOnSides[i][0] - ballsOnSides[i][1] - parseInt(boxes[i]);
	}

	return dp;
}

console.log(minOperations("001011"))