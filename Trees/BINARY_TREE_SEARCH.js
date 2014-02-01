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