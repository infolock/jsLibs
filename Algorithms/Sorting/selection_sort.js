/**
 * @author Jonathon Hibbard
 * Playing with sorts
 */

 function selection_sort(arr) {
    var n = arr.length, j, k, temp, i;

    for(i = 0; i < n; i++) {
        k = i;
        for(j = i+1; j < n; j++) {
            if(arr[j] < arr[k]) {
                k = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }

    return arr;
}
var unsorted = [];
function getRandomIntInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
for(i = 0; i < 1000; i++) {
  unsorted.push(getRandomIntInRange(-1000,1000));
}
console.log(unsorted);
console.log(selection_sort(unsorted));


/*!
 * >>>> Insertion sort or Selection sort are both typically faster for small arrays (i.e. fewer than 10–20 elements). 
 * >>>> A useful optimization in practice for the recursive algorithms is to switch to insertion sort or selection sort for "small enough" sublists.
 * 
 * @about
 * Selection sort is a sorting algorithm, specifically an in-place comparison sort. 
 * It has O(n2) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort.
 * 
 * Selection sort is noted for its simplicity, and it has performance advantages over more complicated algorithms in certain situations, 
 * particularly where auxiliary memory is limited.
 * 
 *
 * Selection sort is not difficult to analyze compared to other sorting algorithms since none of the loops depend on the data in the array. 
 * Selecting the lowest element requires scanning all n elements (this takes n − 1 comparisons) and then swapping it into the first position. 
 * Finding the next lowest element requires scanning the remaining n − 1 elements and so on, for (n − 1) + (n − 2) + ... + 2 + 1 = n(n − 1) / 2 ∈ Θ(n2) 
 * comparisons (see arithmetic progression). 
 * 
 * Each of these scans requires one swap for n − 1 elements (the final element is already in place).
 * 
 */
