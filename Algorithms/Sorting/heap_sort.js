/*!
 * Heapsort is an in-place sorting algorithm with worst case and average complexity of O(n logn).
 * 
 * The basic idea is to turn the array into a binary heap structure, which has the property that it allows efficient retrieval and removal of the maximal element. 
 * We repeatedly "remove" the maximal element from the heap, thus building the sorted list from back to front.
 * 
 * Heapsort requires random access, so can only be used on an array-like data structure.
 */
function heap_sort(arr) {
  var n = arr.length - 1,
  _results = [],
  _ref = [],
  k;
  sort_heap(arr);
  do {
    k = arr[0];
    arr[0] = arr[n];
    arr[n] = k;
    sift_down(arr, 0, n);
    _results.push(n);
  } while(n--);
  return _results;
}

function sort_heap(arr) {
  var n = arr.length, i = Math.floor(n / 2 - 1), _results = [];
  do {
    sift_down(arr, i, n);
    _results.push(i);
  } while(i--)
  return _results;
}

function sift_down(heap, i, max) {
  var c1, c2, i_big, _ref=[];
  while (i < max) {
    i_big = i;
    c1 = 2*i+1;
    c2 = c1 + 1;
    if(c1 < max && heap[c1] > heap[i_big]) i_big = c1;
    if (c2 < max && heap[c2] > heap[i_big]) i_big = c2;
    if(i_big === i) return;
    _ref = [heap[i_big], heap[i]];
    heap[i] = _ref[0];
    heap[i_big] = _ref[1];
    i = i_big;
  }
}

var unsorted = [];
function getRandomIntInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
for(i = 0; i < 10; i++) {
  unsorted.push(getRandomIntInRange(-1000,1000));
}
console.log(unsorted);
heap_sort(unsorted);
console.log(unsorted);