/*!
 * @author Jonathon Hibbard
 * @copyright 2013
 *
 * HEAP (Nearly Complete Binary Tree) Tree is completely filled except at the lowest level, which is filled from LEFT to RIGHT.
 * Example HEAP Tree
 *
 * @example
 *               _______(20)_______
 *              /                  \
 *         _(14)_                  _(12)_
 *        /      \                /      \
 *     (8)       (6)           (9)       (2)
 *    /   \     /
 *  (5)   (4)  (1)
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 ==============================================================================================================================*/


//
// This HEAP TREE solution is using the sample data provided above for test/sample data...
//

(function() 

  // var james = "hardy har har har james";
  // var x = james.length-1;
  // james = james.charAt(x) ^ james.charAt(0);
  // james = james.charAt(x) ^ james.charAt(x);

  var buildHashMap = function(obj) {

  }

  //
  // This Hash tree uses the sample data provided in the example below...
  //
  function clone(obj) {
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


//        BEGIN TREE


  function Edge(direction) {
   /*
    * Direction can be one of the following:  -1 : undefined (DEFAULT),  0 : left,   1 : right
    * If an no direction or an invalid direction is passed in, it will be set to the default direction, -1
    */
    if(dire)
    this.direction = direction;
  };

 // Prototype Pattern
  var NodePrototype = {
    // Number of edges for this node
    degree: 0,
    value: null,
    index: 0,
    parentIndex:0,
    childNodes: [null,null]
  };

 
  function Graph(nodes) {

    function createNode(nodeValue, nodeIndex) {
      var Node = clone(DefaultNode);

      Node.value = nodeValue;
      Node.index = nodeIndex;
      return Node;
    }

    this.nodes = nodes;
    this.totalNodes = 0;


    this.populateCollection = function() {
      var totalNodes = nodes.length,
      nodeIndex = 0,
      Node;

      do {
        node = createNode(nodes.shift(), nodeIndex);
        this.nodeCollection.push(Node);
        nodeIndex++;
      } while(--totalNodes);

      var Node = createNode()
      $this->addNodeToCollections($nodeObj);
    }(nodeIndex);
  }


  Graph.prototype = {
  }

  var HeapTreeCache = {
    // cacheNode = function(func, hasher) {
    //   var memo = {};
    //   hasher || (hasher = _.identity);
    //   return function() {
    //     var key = hasher.apply(this, arguments);
    //     return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    //   };
    // };
  }
 
  function HeapTree(nodeIndexSet) {
    this.nodeIndexSet = nodeIndexSet;
  }
 
  HeapTree.prototype = {
    createNode: function(nodeProperties) {
      var 
    },
    createNodeValue: function(value) {
    }
  };
 
  // Nodes Data
  var nodes = [20,14,12,8,6,9,2,5,4,1];
 
  // Node Information
  var totalNodes = nodes.length;
 
  // Node Lookups
  function parentNodeForChildAtIndexPath(indexPath) {
    return Math.floor(indexPath/2);
  }
 
  function leftChildNodeForParentAtIndexPath(indexPath) {
    return 2*indexPath;
  }
 
  function rightChildNodeForParentAtIndexPath(indexPath) {
    var leftNodeIndexPath = leftChildNodeForParentAtIndexPath(indexPath);
    return leftNodeIndexPath+1;
  }
 
 
})();

  function Graph(nodes) {}
  Graph.prototype = {
    var totalNodes = nodes.length,
    nodeIndex = 0;

    this.createNode = function(nodeValue, indexPath) {
      var Node = { index: 0, value: 0 };
      Node.value = nodeValue;
      Node.index = indexPath;
      return Node;
    }

    this.nodeCollection = [];
    this.nodeHashMap = {};

    this.populateCollection = function() {
    };

    init: function() {
      this.populateCollection();
      console.log(this.nodeCollection);
    }
  };

var graph = new Graph([20,14,12,8,6,9,2,5,4,1]);

graph.init();










