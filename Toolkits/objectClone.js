/*!
 * Clone an object..
 */

  function cloneObj(obj) {
    var r, i, l, name, s, i, srcKeys, totalKeys, srcKeyName,
    empty = {},
    // source: underscoreJS
    isArray = Array.isArray || function(obj) {
      return toString.call(obj) == '[object Array]';
    }
    if(obj !== Object(obj)) return obj;
    if(toString.call(obj) == '[object Date]') return new Date(obj.getTime());
    if(toString.call(obj) == '[object RegExp]') return new RegExp(obj);

    if(isArray(obj)){
      r = [];
      i = obj.length;

      do {
        if(i in obj && l++) r.push(clone(obj[i]));
      } while(--i);

    } else r = obj.constructor ? new obj.constructor() : {};

    if(Object.keys) {
      srcKeys = Object.keys(obj);
      totalKeys = srcKeys.length-1;
      do {
        srcKeyName = srcKeys[totalKeys];
        s = obj[srcKeyName];
        if(!(srcKeyName in obj) || (obj[srcKeyName] !== s && (!(srcKeyName in empty) || empty[srcKeyName] !== s))) obj[srcKeyName] = clone ? clone(s) : s;
      } while(totalKeys--);
    } else {
      for(name in obj){
        s = obj[name];
        if(!(name in obj) || (obj[name] !== s && (!(name in empty) || empty[name] !== s))) obj[name] = clone ? clone(s) : s;
      }
    }
    return obj;
  }
