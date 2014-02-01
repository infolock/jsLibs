/*

The merge sort is a recursive sort of order n*log(n). It is notable for having a worst case and average complexity of O(n*log(n)), 
and a best case complexity of O(n) (for pre-sorted input). The basic idea is to split the collection into smaller groups by 
halving it until the groups only have one element or no elements (which are both entirely sorted groups). Then merge the groups back together 
so that their elements are in order. This is how the algorithm gets its "divide and conquer" description.
*/

function merge(left,right,arr){
  var a=0;
  while(left.length&&right.length)
    arr[a++]=right[0]<left[0]?right.shift():left.shift();
  while(left.length)arr[a++]=left.shift();
  while(right.length)arr[a++]=right.shift();
}

function mSort(arr,tmp,l){
  if(l==1)return;
  var   m=Math.floor(l/2),
    tmp_l=tmp.slice(0,m),
    tmp_r=tmp.slice(m);
  mSort(tmp_l,arr.slice(0,m),m);
  mSort(tmp_r,arr.slice(m),l-m);
  merge(tmp_l,tmp_r,arr);
}
function merge_sort(arr){
  mSort(arr,arr.slice(),arr.length);
}
