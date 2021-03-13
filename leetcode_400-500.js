/*435. 
Non-overlapping intervals
Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
*/var eraseOverlapIntervals = function(intervals) {
    if(intervals.length <= 1)
        return 0;
    intervals.sort((a, b) => a[0] - b[0]);
    let end = intervals[0][1];
    let count = 0;
    for(let i = 1; i < intervals.length; i++){
        if(intervals[i][0] < end){
            if(end >= intervals[i][1]){
                count++;
                end = intervals[i][1];
            }
            else{
                count++;
            }
        }
        else{
            end = intervals[i][1];
        }
    }   
    return count;
}

// I copied this solution from an user. Still got a little understanding to do
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b) => a[0]-b[0])
    let n = intervals.length
    let res = 0
    let i = n-1
    while(i>0){
        let j = i-1
        while(j>=0 && intervals[j][1] > intervals[i][0]){
            res++
            j--
        }
        i = j
    }
    return res
};



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
    		if(startSorted[i][0] >= endSorted[j][1]){
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
//O(2N

// Alternate method, if we don't want to store the indices in a hash but store it in the 2 sorted arrays
var findRightInterval = function(intervals) {
    let result = new Array(intervals.length).fill(-1);
    let startSorted = intervals.map((interval, i) => [...interval, i]).sort((a, b) => a[0] - b[0]);  //sorting the start values in ascending order
    let endSorted = intervals.map((interval, i) => [...interval, i]).sort((a, b) => a[1] - b[1]);    //sorting the end values in ascending order
    let i = 0;
    for(let j = 0; j < intervals.length; j++){
        while(i < intervals.length){
            if(startSorted[i][0] >= endSorted[j][1]){
                result[endSorted[j][2]] = startSorted[i][2];
                break;
            }
            i++;
        }
        if(i === intervals.length)
            break;
    }
    return result;
};