var isArray = function(obj) { return toString.call(obj) == '[object Array]'; },
arraysIdentical = function(array1, array2) {
  if(!isArray(array1) || !isArray(array2)) return false;
  return !(array1<array2 || array2<array1);
};

var sizeOfArray = function(obj) {
  if(!toString.call(obj) == '[object Array]') {
    throw Warning("sizeOfArray expects an Array - " + toString.call(obj) + " received.");
    return undefined;
  }
  return obj.length;
};