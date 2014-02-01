/*
Pancake sorting is a variation of the sorting problem in which the only allowed operation is to reverse the elements of some 
prefix of the sequence. 

Unlike a traditional sorting algorithm, which attempts to sort with the fewest comparisons possible, the goal is to sort 
the sequence in as few reversals as possible. 

This operation can be visualized by thinking of a stack of pancakes in which one is allowed to 
take the top k pancakes and flip them. 

A variant of the problem is concerned with burnt pancakes, where each pancake has a burnt side and all pancakes must, 
in addition, end up with the burnt side on bottom.
*/

function pancake_sort(arr) {
  var n = arr.length, i, max_idx, max,j,new_slice;
  for (i = n-1; i > 0; i--) {
    max_idx = 0;
    max = arr[0];
    for(j = 1; j <= i; j++) {
        if(arr[j] > max) {
            max = arr[j];
            max_idx = j;
        }
    }
    if(max_idx == i) continue;
    if(max_idx > 0) {
    new_slice = arr.slice(0, max_idx+1).reverse();
    for(j = 0; j <= max_idx; j++) 
        arr[j] = new_slice[j];
    }
    // then flip the max element to its place
    new_slice = arr.slice(0, i+1).reverse();
    for(j = 0; j <= i; j++) 
        arr[j] = new_slice[j];
    }
    return arr;
}

var arr = [7,6,5,9,8,4,3,1,2,0]
console.log(pancake_sort(arr));