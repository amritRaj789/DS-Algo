/*784. Letter Case Permutation
Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.
Return a list of all possible strings we could create. You can return the output in any order.
*/

// BFS iterative
let letterCasePermutation = function (string){
    let str = string.toLowerCase();
	let result = [str.slice(0)];
	for(let i = 0; i < str.length; i++){
		if(str.charCodeAt(i) < 97 || str.charCodeAt(i) > 122)
			continue
		let length = result.length;
			for(let j = 0; j < length; j++)
				result.push(result[j].slice(0, i) + result[j][i].toUpperCase() + result[j].slice(i+1))
	}
	return result;
}


// DFS recursive
let letterCasePermutation = function(S) {
    let s = S.toLowerCase();
    let result = [];
    function recursive(index, string){
        if(index === s.length){
            result.push(string.slice(0));
            return
        }
        recursive(index+1, string.slice(0));
        if(s.charCodeAt(index) >= 97 && s.charCodeAt(index) <= 122)
            recursive(index+1, string.slice(0, index) + string[index].toUpperCase() + string.slice(index+1));
    }
    recursive(0, s);
    return result;
};
