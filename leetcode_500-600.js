function checkInclusion (s1, s2){
	let hash = {};
	let matched = 0;
	for(let i = 0; i < s1.length; i++){
		if(!hash[s1[i]])
			hash[s1[i]] = 0;
		hash[s1[i]]++;
	}
	let windowStart = 0;
	for( i = 0; i < s1.length; i++){
		if(s2[i] in hash){
			hash[s2[i]]--;
			if(hash[s2[i]] === 0)
				matched++;
		}
	}
	for(let windowEnd = s1.length; windowEnd < s2.length; windowEnd++){
		if(matched === Object.keys(hash).length)
			return true;
		if(s2[windowEnd] in hash){
			hash[s2[windowEnd]]--;
			if(hash[s2[windowEnd]] === 0)
				matched++;
		}
		if(s2[windowStart] in hash){
			hash[s2[windowStart]]++;
			if(hash[s2[windowStart]] === 1)
				matched--;
		}
		windowStart++;
	}
	if(matched === Object.keys(hash).length)
			return true;
	else return false
}


function findAnagrams (s, p){
	let hash = {};
	let result = [];
	let matched = 0;
	for(let i = 0; i < p.length; i++){
		if(!hash[p[i]])
			hash[p[i]] = 0;
		hash[p[i]]++;
	}
	let left = 0;
	for(i = 0; i < p.length; i++){
		if(s[i] in hash){
			hash[s[i]]--;
			if(hash[s[i]] === 0)
				matched++;
		}
	}
	if(matched === Object.keys(hash).length)
			result.push(left);
	for(let right = p.length; right < s.length; right++){
		if(s[right] in hash){
			hash[s[right]]--;
			if(hash[s[right]] === 0)
				matched++;
		}
		if(s[left] in hash){
			hash[s[left]]++;
			if(hash[s[left]] === 1)
				matched--; 
		}
		left++;
		if(matched === Object.keys(hash).length)
			result.push(left);
	}
	return result
}




