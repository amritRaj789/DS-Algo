316. Remove Duplicate Letters
var removeDuplicateLetters = function(s) {
	const hash = {};
    for(let char of s){
    	if(!(char in hash))
    		hash[char] = 0;
    	hash[char]++;
    }
    console.log("the hash map looks like this: ", hash);
    return Object.keys(hash);
};

console.log(removeDuplicateLetters("bcabc"));
// Incomplete

