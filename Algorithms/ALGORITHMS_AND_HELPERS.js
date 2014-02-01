/**
 * @author Jonathon Hibbard
 * Trees - not the green ones...
 */

var bTreeSearch = function(n, h) {
  var mn = 0, mx = h.length - 1, r, z;
  do {
    r = ((mn+mx) >> 1);
    z = h[r];
    if(z == n) return r;
    if(z < n) mn = r; else mx = r;
  } while(true);
  return -1;
}

// PAST AND FUTURE CHECKS
var staggerSearch = function(arr) {
  var exists
};
var i = 0,n=50;
do {
  console.log(1^i++;);  // this will do something like 1,0,3,2,5,4,7,6...  Good for doing a every-other check and still go through the entire set.
} while(n--);



// ABSOLUTE VALUE

var abs=function(i){ var a=(i>>31);(i^a)-a;};




// RANDOMIZED INDEX ORDER OF ARRAY
var sinIdx = function(arr) { return Math.sin(arr.length); };




// COMPARE STRING EQUALITY
var compareChars = function(c1, c2){ var cb1 = c1.charCodeAt(0), cbd = cb1^c2.charCodeAt(0), cm; if(!cbd) return 0; if(cbd&0x20) return (cb1 & 0x20)?-1:1; cm=0x80; while(!(cm&cbd))cm>>=1; if(cb1&cm)return 1; return NaN; }


// COMPARE CHARACTER EQUALITY
var charcmp = function(cb1,cb2) {
  var cbd = cb1^cb2, cm;
  if(!cbd) return 1; 
  if(cbd&0x20) return (cb1 & 0x20)?-1:1;
  cm=0x80; while(!(cm&cbd))cm>>=1; 
  if(cb1&cm)return 1;
};


// STRING COMPARE
var strcmp = function(c1, c2){
  var n1 = c1.length, n2 = c2.length,i=0,r;
  if(n1^n2) return 0;
  do {
    r = charcmp(c1.charCodeAt(i),c2.charCodeAt(i));
    if(!r) return r;
    i++;
  } while(n1--);
  return 1;
};


// CHAR CODE MAP
var charMap = function(s) {
  var r = [], arr=s.split(""), i=0,n=arr.length, a;
  do { if(arr.length==0) break; a=arr.shift(); r.push(a.charCodeAt(0)||0); i++; } while(n--); return r;
};


var strTotalCmp = function(str1,str2) {
  var n1=str1.length-1,
  rchrCode = function(c) { return +c.charCodeAt(0) || 0; };
  if(n1^(str2.length-1)) return 0;
  do { if(str1.charCodeAt(n1)!=str2.charCodeAt(n1)) return 0; } while(n1--);
  return 1;
};

// I DO NOT THINK THIS PIECE OF SHIT WORKS!@#
function strcmp(a, b) {   
    return (a<b?-1:(a>b?1:0));  
}
