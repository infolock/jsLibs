/**
 * @author Jonathon Hibbard
 * Trees - not the green ones...
 */

var i, val, search_term, randomKey,
n = 500, 
haystack = [],
compFn = function(row1, row2) {
    var k1 = row1, k2 = row2;
    return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
};

function randomInt() { 
  return Math.floor(Math.random()*103451);
}

function getRandomIntInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var i=50;i^=1;i^=1-i; var i=50;i^=2;i^=2-i  << this is interesting too...
var i = 0,n=50;
do {
  console.log(1^i++;);  // this will do something like 1,0,3,2,5,4,7,6...  Good for doing a every-other check and still go through the entire set.
} while(n--);


var zeroHit = false, num,failsafe=0;
do {
  if(failsafe > 100) break;
  num = Math.floor(Math.random()*50);
  console.log(failsafe + " " + num);
  if(num === 0) zeroHit=true;
  failsafe++;
} while(!zeroHit);


function myBinaryTreeSearch(needle, arr) {
  var min = 0, max = arr.length - 1, root;
  do {
    root = ((min+max) >> 1);  // gets the exact number in between min and max.
    if(arr[root] == needle) return root;
    if(arr[root] < needle) min = root; else max = root;
  } while(arr[root]);
  return -1;
}

do {
  val = randomInt();
  haystack.push(val);
} while(n--);

haystack.sort(compFn);
randomKey = getRandomIntInRange(0, 500);
search_term = haystack[randomKey];
myBinaryTreeSearch(search_term, haystack);

// others


Array.prototype.binarySearch = function(find, comparator) {
  var low = 0, high = this.length - 1,
      i, comparison;
  while (low <= high) {
    i = Math.floor((low + high) / 2);
    comparison = comparator(this[i], find);
    if (comparison < 0) { low = i + 1; continue; };
    if (comparison > 0) { high = i - 1; continue; };
    return i;
  }
  return -1;
};
function myBinaryTreeSearch(needle, arr) {
  var i = 0, n = arr.length - 1, root = Math.floor( ( i + n ) / 2 ), currentVal = arr[i];
  while(currentVal) {
    if(currentVal == needle) return root;
    if(currentVal < needle) root--;
    if(currentVal > needle) root++;
  }
  return -1;
}

function binary_search_iterative(arr, ele) { 
  var beginning = 0, end = arr.length, target;
  while(true) {
    // faster to do ((beginning + end) >> 1)
    target = ((beginning + end) >> 1);
    if ((target === end || target === beginning) && arr[target] !== ele) return -1;

    if (arr[target] > ele) { 
      end = target;
    } else if (arr[target] < ele) {
      beginning = target;
    } else {
      return target;
    }
  }
}