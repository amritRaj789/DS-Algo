let wordBreak = function (s, wordDict) {
	if(wordDict === []){
		return false;
	}
	let start = 0;
	let end = false;
	for ( let i = 0; i < s.length; i++){
		if(wordDict.includes(s.substring(start, i+1))){
			start = i+1;
			end = i;
		}
	}
	if(end === s.length-1){
		return true;
	}
	return false;
}
let isValid = function (s) {
	
	let stack = [];
	for(let i = 0; i <= s.length-1; i++){
		if( s[i] === '(' || s[i] === '{' || s[i] === '['){
			stack.push(s[i]);
		}
		else{
			if(stack.pop() !== s[i])
				return false
		}
	}
	return true;
}

let isValid = function (s) {
	let open = 0;
	let close = 0;
	for(let i = 0; i < s.length; i++){
		if( s[i] === '(' || s[i] === '{' || s[i] === '['){
			open = i;
		}
		else{
			close = i;
			if(!check(s[open], s[close]))
				return false
			else{
				open--;
			}
		}
	}
	return true;

	function check(left, right){
		if(left === '(' && right === ')')
			return true
		else if(left === '{' && right === '}')
			return true;
		else if(left === '[' && right === ']')
			return true;
		else
			return false;
	}
}

console.log(isValid("(((((())))))"));
console.log(isValid("()()()()"));
console.log(isValid("(((((((()"));
console.log(isValid("((()(())))"));
console.log(isValid("{"));