/*
436. Find Right Interval

You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.
The right interval for an interval i is an interval j such that startj >= endi and startj is minimized.
Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.
*/

var findRightInterval = function(intervals) {
    let hash = {};
    for(let i = 0; i < intervals.length; i++){
        hash[intervals[i][0]] = i;
    }
    let result = new Array(intervals.length).fill(-1);
    let startSorted = intervals.map(interval => interval).sort((a, b) => a[0] - b[0]);	//sorting the start values in ascending order
    let endSorted = intervals.map(interval => interval).sort((a, b) => a[1] - b[1]);	//sorting the end values in ascending order
    let i = 0;	// startSorted index
    let j = 0;	// endSorted index
    for(j = 0; j < intervals.length; j++){
    	while(i < intervals.length){
    		if(startSorted[i][0] <= endSorted[j][1]){
    			result[hash[endSorted[j][0]]] = hash[startSorted[i][0]];
    			break;
    		}
    		i++;
    	}
    	if(i === intervals.length)
    		break;
    }
    return result;
};
//O(2N)