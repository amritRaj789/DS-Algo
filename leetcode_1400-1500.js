var maxScore = function(cardPoints, k) {
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
};