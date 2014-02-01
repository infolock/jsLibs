/**
 * @author Jonathon Hibbard
 * Map reduce stuff
 */

var jArray = {
  map: function(applyFunc, array) {
    var result = [], arrayItem, n = array.length;
    do {
      arrayItem = array.shift();
      result.push(applyFunc(arrayItem));
    } while(n--);
    return result;
  },
  charMap: function(s) {
    var r = [], arr=s.split(""), i=0,n=arr.length, a;
    do { if(arr.length==0) break; a=arr.shift(); r.push(a.charCodeAt(0)||0); i++; } while(n--); return r;
  },

  reduce: function(combine, base, array) {
    var arrayItem, n = array.length;
    do {
      arrayItem = array.shift();
      base = combine(base, arrayItem);
    } while(n--);
    return base;
  }
};
