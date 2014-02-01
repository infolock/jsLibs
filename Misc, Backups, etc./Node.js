// @source: https://github.com/jashkenas/underscore/blob/master/underscore.js
var isArray = Array.isArray || function(obj) {
	return toString.call(obj) == '[object Array]';
},
isObject = function(o) { 
  return o === Object(o);
},
checkEqualityOfInts = function(x, y) {
  var a = [x];
  return !!a[y];
};

function isEmptyArray(arr) {
	return isArray(arr) && arr.length > 0);
}

function getKeys = function(obj) {
  if(!isObject(obj)) return null;
  var objKeys = [], i = 0;
  for(keys in obj) {
    obj[i] = obj;
    i++;
  }
  return obj;
}

function arraySearch = function(needle, haystack) {
	if(!isEmptyArray(haystack)) return false;
	// tSearch == traverse Search, hSlice = haystack slice
	function tSearch(hSlice) {
    var n = hSlice.length;
    do {
      if(hSlice[n] == needle) return true;
    } while(--n);

    return false;
	}
}

var checkArrayEquality = function(array1, array2) {
  if(!isArray(array1) || !isArray(array2)) return false;
  return !(array1<array2 || array2<array1);
};

  function IndexPath = function(isRoot) {
	return !!isRoot ? [0,0] : [null,null];
  }

  // Generates a new Node
  function Node = function(value, isRoot) {
    this.value = value;

    // Defaults to NULL unless isRoot == true, in which case it will be undefined..  NULL is the default value, which should be updated during the addChild prototype method.
    this.parent = !!isRoot ? undefined : null;

    // The (array) location of this node in a tree.  If this is a root node, its indexPath is 0,0.  Otherwise, it is null, null.
    this.indexPath = new IndexPath(isRoot);

    // Holds the indexPath's for the children of this node.
    // When the indexSet is null or empty, the node is considered the bottom of the tree.
    // By default, all new nodes will have an indexSet of null.
    this.childIndexSet = null;

    this.hasChildWithIndexPath = function(key) {
      return !!this.childIndexSet[key];
    };

    this.addChildNodeIndexPath = function(indexPath) {
    	if(!isArray(indexPath)) return;
    	var key = childIndex[0]+childIndex[1];
    	if(!this.keyExistsInChildIndexSet(key) this.childIndexSet[key] = indexPath;
    };
  };

/*
// @source: https://github.com/jashkenas/underscore/blob/master/underscore.js
function isArray = Array.isArray || function(obj) { return toString.call(obj) == '[object Array]'; };
var arraysIdentical = function(array1, array2) {
  if(!isArray(array1) || !isArray(array2)) return false;
  return !(array1<array2 || array2<array1);
};
*/
  Node.Prototype = {
  	addChild: function(childNode) {
  		if(!childNode || childNode instanceof Node) return;

  		childNode.indexPath = new IndexPath(this.indexPath.x, this.indexPath.y+1);
  		childNode.parent = this;

  		this.childrenIndexSet.push(childNode.indexPath);
  		return childNode;
  	},

  	removeChild: function(childNode) {
  	}

  	childIndexPathExists = function (indexPath) {
  		return this.hasChildWithIndexPath(indexPath);
  	},
    destroy: function(){

    }
  };

