/**
 * @author Jonathon Hibbard
 * Trees - not the green ones...
 */

var validArray = function(arr) { return toString.call(arr) == '[object Array]'; };

function Node(value, leftChild, rightChild) {
  this._value = value;
  this._leftChild = leftChild;
  this._rightChild = rightChild;

  this.printValueWithExtras("Created Node with value: " + value);
}

Node.prototype = {
  setLeftChild: function(childValue) {
    var $node = this;
    if(!$node._leftChild) {

      $node.printValueWithExtras("Creating Left Child with value: " + childValue);

      var childNode = new Node(childValue, null, null);

      $node._leftChild = childNode;
      $node.printValue();
    }
  },

  setRightChild: function(childValue) {
    var $node = this;
    if(!$node._rightChild) {

      $node.printValueWithExtras("Creating Right Child with value: " + childValue);

      var childNode = new Node(childValue, null, null);
      $node._rightChild = childNode;
      $node.printValue();
    }
  },

  leftChild: function() {
    var $node = this;
    return $node._leftChild;
  },

  rightChild: function() {
    var $node = this;
    return $node._rightChild;
  },

  printValueWithExtras: function(extras) {
    var $node = this;
    console.log(extras);
    $node.printValue();
  },

  printValue: function() {
    var $node = this;
    console.log($node._value);
  }
};


function Tree() {
  this.rootNode = null;
  this.tailNode = null;
  this.depth = 0;
  this.openSlots = 0;
  this.totalNodes = 0;
}

Tree.prototype = {

  updateDepth: function() {
    var $tree = this;
    if($tree.openSlots > 0) return $tree.depth;
    $tree.depth++;
    $tree.openSlots = $tree.depth * 2;
  },

  closeNextSlot: function() {
    var $tree = this;
    $tree.openSlots--;
    $tree.totalNodes++;
    $tree.updateDepth;
  },

  setTailNode: function(tailNode) {
    var $tree = this;
    $tree.tailNode = tailNode;
    $tree.closeNextSlot();

    return $tree.tailNode;
  },

  assignLeftChildToNode: function(nodeSubject, childValue) {
    var $tree = this;
    nodeSubject.setLeftChild(childValue);
    return $tree.setTailNode(nodeSubject._leftChild);
  },

  assignRightChildToNode: function(nodeSubject, childValue) {
    nodeSubject.setRightChild(childValue);
    return this.setTailNode(nodeSubject._rightChild);
  },

  setRootNode: function(nodeValue) {
    var $tree = this;
    $tree.rootNode = new Node(nodeValue, null, null);
    $tree.rootNode.printValueWithExtras("Added Root Node to the Tree, using value: " + nodeValue);
    return $tree.rootNode;
  },

  insertNode: function(nodeValue) {
    var $tree = this, nodeSubject = $tree.root, currentValue = nodeSubject._value, n = $tree.totalNodes;

    if(!nodeValue) return;
    if(!$tree.rootNode) return $tree.setRootNode(nodeValue);


    do {

      console.log("Tree:: checking if nodeValue("+nodeValue+") < currentValue("+currentValue+")");
      if(nodeValue < currentValue) {
        console.log("Tree:: nodeValue("+nodeValue+") < currentValue("+currentValue+") was evaluated TRUE!");

        console.log("Tree:: Checking if the current nodeSubject has a left child...");
        if(nodeSubject._leftChild == null) {
          console.log("Tree:: A Left child was not found!  Creating...");
          return $tree.assignLeftChildToNode(nodeSubject, nodeValue);
        }

        console.log("Tree:: A Left child was found!  Reassinging and moving on...");
        nodeSubject = nodeSubject._leftChild;
        currentValue = nodeSubject._value;

      } else if(nodeValue > currentValue) {

        console.log("Tree:: Achecking if nodeValue("+nodeValue+") > currentValue("+currentValue+") evaluated TRUE!");

        console.log("Tree:: Checking if the current nodeSubject has a Right child...");
        if(nodeSubject._rightChild == null) {
          console.log("Tree:: A Right child was not found!  Creating...");
          return $tree.assignRightChildToNode(nodeSubject, nodeValue);
        }

        console.log("Tree:: A Left child was found!  Reassinging and moving on...");
        nodeSubject = nodeSubject._rightChild;
        currentValue = nodeSubject._value;

      } else {
        console.log("Tree:: Uhhh...what?  We made it to the break... lame.");
        break;
      }

    } while(n--);

    console.log("Tree:: Uhhh...what?  We made it to end of this method... lame.");
  }
};

var TreeBuilder = {

  buildFromArray: function(nodes) {

    console.log("TreeBuilder.buildFromArray():: starting to build the requested new tree...");

    if(!toString.call(nodes) == '[object Array]' || nodes.length < 1) return;

    var rootNode, tree, childNode;

    tree = new Tree();
    console.log("TreeBuilder.buildFromArray()::  Tree created!");

    do {
      nodeValue = nodes.shift();
      console.log("Got a node value from the nodes array!  Value = ", nodeValue);

      rootNode = tree.insertNode(nodeValue);
      rootNode.printValueWithExtras("TreeBuilder.buildFromArray():: recieved a node back after insert!  Node = :");
      console.log(rootNode);

      console.log("Looping to find the next new node to create...");

    } while(rootNode);

    return tree;
  }
};


var nodes = [1, 2, 4, 7, 5, 3, 6, 8, 9];
var tree = TreeBuilder.buildFromArray(nodes);
var nodes = [1,2,3];

var RootNode = new Node(100, new Node(50), new Node(150));
var LeftChildNode = RootNode.leftChild();
LeftChildNode.setLeftChild(25);
LeftChildNode.setRightChild(75);

var RightChildNode = RootNode.rightChild();
RightChildNode.setLeftChild(125);
RightChildNode.setRightChild(75);
RightChildNode.rightChild().setLeftChild(110);


var preorderTree = function(root) {
  if(root == null) return;
  root.printValue();
  preorderTree(root.leftChild());
  preorderTree(root.rightChild());
};

preorderTree(RootNode);