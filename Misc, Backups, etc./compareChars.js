/**
* @author Jonathon Hibbard
* Messing with sort
*/

var merge = function(left, right, arr) {
    var a = 0;

    while(left.length && right.length) {
        arr[a++] = right[0] < left[0] ? right.shift() : left.shift();
    }

    while(left.length) {
        arr[a++] = left.shift();
    }

    while(right.length) {
        arr[a++] = right.shift();
    }

    return arr;
};

var mSort = function(arr, tmp, l) {
    if(l == 1) {
        return arr;
    }

    var m = Math.floor((l / 2));
    var tmp_l = tmp.slice(0, m);
    var tmp_r = tmp.slice(m);

    mSort(tmp_l, arr.slice(0, m), m);
    mSort(tmp_r, arr.slice(m), (l - m));

    return merge(tmp_l, tmp_r, arr);
};

var merge_sort = function(arr) {
    return mSort(arr, arr.slice(), arr.length);
};

var sortCharsInArray = function(arr) {
    var result = [];
    var arrayItem
    var n = arr.length - 1;

    if(n === -1) {
        return arr;
    }

    do {
        result.push(arr.shift().toLowerCase());
    } while(n--);

    return merge_sort(result);
};

var arr = ["yeah", "this is", "a", "wonderful", "blue", "world", "But", "its", "poisoned", "with", "hate", "and", "apathy" ];

var sortedArr = sortCharsInArray(arr)

console.log(JSON.stringify(sortedArr, null, 4));
