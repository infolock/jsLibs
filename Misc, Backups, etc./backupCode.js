/**
 * @author Jonathon Hibbard
 * Google Interview Questions
 */

// var string = 'abcdfiehaajzxzvbgqpiqowerty12348971234asdf;asdzxcvjzxcvn;asdf',
// chars = string.split('');

function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] != node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n], score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
      parent = this.content[parentN];
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= this.scoreFunction(parent))
        break;

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};



var heap = new BinaryHeap(function(x){return x;});
var data = [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5];
var x = data.length;
var i;
for(i=0;i<x;i++) {
        heap.push(data[i]);
}

heap.remove(2);
while (heap.size() > 0)
  console.log(heap.pop());


// /* 
// Stuff from google:
//  */

//  // THIS IS A SHA1 HASH 
// /* [start] feature=shindig.sha1 */
// shindig.sha1 = (function() {
//     var d = "0123456789ABCDEF";
//     var h = [];
//     var e = [];
//     var l = [];
//     var o = [];
//     o[0] = 128;
//     for (var g = 1; 
//     g < 64; 
//     ++g) {
//         o[g] = 0
//     }
//     var n;
//     var b;
//     function j() {
//         h[0] = 1732584193;
//         h[1] = 4023233417;
//         h[2] = 2562383102;
//         h[3] = 271733878;
//         h[4] = 3285377520;
//         n = 0;
//         b = 0
//     }
//     function m(i, p) {
//         return ((i << p) | (i >>> (32 - p))) & 4294967295
//     }
//     function a(p) {
//         var q = l;
//         for (var s = 0; 
//         s < 64; 
//         s += 4) {
//             var B = (p[s] << 24) | (p[s + 1] << 16) | (p[s + 2] << 8) | (p[s + 3]);
//             q[s / 4] = B
//         }
//         for (var s = 16; 
//         s < 80; 
//         s++) {
//             q[s] = m(q[s - 3] ^ q[s - 8] ^ q[s - 14] ^ q[s - 16], 1)
//         }
//         var A = h[0];
//         var z = h[1];
//         var y = h[2];
//         var x = h[3];
//         var v = h[4];
//         var u, r;
//         for (var s = 0; 
//         s < 80; 
//         s++) {
//             if (s < 40) {
//                 if (s < 20) {
//                     u = x ^ (z & (y ^ x));
//                     r = 1518500249
//                 } else {
//                     u = z ^ y ^ x;
//                     r = 1859775393
//                 }
//             } else {
//                 if (s < 60) {
//                     u = (z & y) | (x & (z | y));
//                     r = 2400959708
//                 } else {
//                     u = z ^ y ^ x;
//                     r = 3395469782
//                 }
//             }
//             var C = (m(A, 5) + u + v + r + q[s]) & 4294967295;
//             v = x;
//             x = y;
//             y = m(z, 30);
//             z = A;
//             A = C
//         }
//         h[0] = (h[0] + A) & 4294967295;
//         h[1] = (h[1] + z) & 4294967295;
//         h[2] = (h[2] + y) & 4294967295;
//         h[3] = (h[3] + x) & 4294967295;
//         h[4] = (h[4] + v) & 4294967295
//     }
//     function f(q, s) {
//         if (typeof (q) === "string") {
//             q = unescape(encodeURIComponent(q));
//             var p = [];
//             for (var t = 0, r = q.length; 
//             t < r; 
//             ++t) {
//                 p.push(q.charCodeAt(t))
//             }
//             q = p
//         }
//         if (!s) {
//             s = q.length
//         }
//         var u = 0;
//         if (n == 0) {
//             while (u + 64 < s) {
//                 a(q.slice(u, u + 64));
//                 u += 64;
//                 b += 64
//             }
//         }
//         while (u < s) {
//             e[n++] = q[u++];
//             b++;
//             if (n == 64) {
//                 n = 0;
//                 a(e);
//                 while (u + 64 < s) {
//                     a(q.slice(u, u + 64));
//                     u += 64;
//                     b += 64
//                 }
//             }
//         }
//     }
//     function k() {
//         var s = [];
//         var r = b * 8;
//         if (n < 56) {
//             f(o, 56 - n)
//         } else {
//             f(o, 64 - (n - 56))
//         }
//         for (var q = 63; 
//         q >= 56; 
//         q--) {
//             e[q] = r & 255;
//             r >>>= 8
//         }
//         a(e);
//         var t = 0;
//         for (var q = 0; 
//         q < 5; 
//         q++) {
//             for (var p = 24; 
//             p >= 0; 
//             p -= 8) {
//                 s[t++] = (h[q] >> p) & 255
//             }
//         }
//         return s
//     }
//     function c() {
//         var p = k();
//         var r = "";
//         for (var q = 0; 
//         q < p.length; 
//         q++) {
//             r += d.charAt(Math.floor(p[q] / 16)) + d.charAt(p[q] % 16)
//         }
//         return r
//     }
//     j();
//     return {reset: j,update: f,digest: k,digestString: c}
// });
// ;

// /* [end] feature=shindig.sha1 */

// /* [start] feature=shindig.random */
// shindig.random = (function() {
//     var a = window.crypto;
//     if (a && typeof a.getRandomValues == "function") {
//         return function() {
//             var k = new window.Uint32Array(1);
//             a.getRandomValues(k);
//             return Number("0." + k[0])
//         }
//     }
//     var d = gapi.config.get("random/maxObserveMousemove");
//     if (d == null) {
//         d = -1
//     }
//     var j = 0;
//     var f = Math.random();
//     var e = "0123456789ABCDEF";
//     var c = 1;
//     var g = ((screen.width * screen.width) + screen.height) * 1000000;
//     var b = function(l) {
//         l = l || window.event;
//         var k = (l.screenX + l.clientX) << 16;
//         k += (l.screenY + l.clientY);
//         k *= new Date().getTime() % 1000000;
//         c = (c * k) % g;
//         if (d > 0 && ++j == d) {
//             gadgets.util.removeBrowserEvent(window, "mousemove", b, false)
//         }
//     };
//     if (d != 0) {
//         gadgets.util.attachBrowserEvent(window, "mousemove", b, false)
//     }
//     function i(k) {
//         var l = shindig.sha1();
//         l.update(k);
//         return l.digestString()
//     }
//     var h = i(document.cookie + "|" + document.location + "|" + (new Date()).getTime() + "|" + f);
//     return function() {
//         var k = c;
//         k += parseInt(h.substr(0, 20), 16);
//         h = i(h);
//         return k / (g + Math.pow(16, 20))
//     }
// })();
// ;
