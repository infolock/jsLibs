/**
 * @author Jonathon Hibbard
 * Messing with sort
 */

var merge = function(left,right,arr){ var a=0; while(left.length&&right.length)arr[a++]=right[0]<left[0]?right.shift():left.shift(); while(left.length)arr[a++]=left.shift(); while(right.length)arr[a++]=right.shift(); },
mSort = function(arr,tmp,l){ if(l==1)return; var m=Math.floor(l/2), tmp_l=tmp.slice(0,m), tmp_r=tmp.slice(m); mSort(tmp_l,arr.slice(0,m),m); mSort(tmp_r,arr.slice(m),l-m); merge(tmp_l,tmp_r,arr); },
merge_sort = function(arr){ return mSort(arr,arr.slice(),arr.length); };

var sortCharsInArray = function(arr) {
  var result = [], arrayItem, n=arr.length-1;
  do { result.push(arr.shift().toLowerCase()); } while(n--);
  console.log(result);
  return merge_sort(result);
}

var arr = ["yeah", "this is", "a", "wonderful", "blue", "world", "But", "its", "poisoned", "with", "hate", "and", "apathy" ];
sortCharsInArray(arr)
console.log(arr);