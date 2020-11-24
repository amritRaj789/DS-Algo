let maxProfit = function (prices) {
	let min = prices[0];
	let max = prices[0];
	for(let i = 0; i < prices.length; i++){
		if(prices[i] < min){
			min = prices[i];
		}
	}
}


let a = 34;
let b = 3532;
let c = b + a;
console.log(a, b, c);
a++;
console.log(a);
console.log(c);