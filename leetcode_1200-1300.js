/*1288 Remove Covered Intervals

Given a list of intervals, remove all intervals that are covered by another interval in the list.
Interval [a,b) is covered by interval [c,d) if and only if c <= a and b <= d.
After doing so, return the number of remaining intervals.*/

var removeCoveredIntervals = function(intervals) {
    if(intervals.length <= 1)
        return intervals.length;
    intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    let end = intervals[0][1];
    let count = intervals.length;
    for(let i = 1; i < intervals.length; i++){
        if(intervals[i][1] <= end){
            count--;
        }
        else{
            end = intervals[i][1];
        }
    }
    return count;
};