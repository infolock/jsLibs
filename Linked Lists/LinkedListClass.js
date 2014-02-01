**
 * @author Jonathon Hibbard
 * Learning about Linked Lists
 */
 

function Node(id) {
  this._id = id;
  this._next = null;
};

var NodeBuilder = function() {

  var createNodesFromArray = function(nodes) {
      var headNode = new Node(nodes.shift()),
      prevNode = headNode,
      n = nodes.length - 1,
      nextNode;

      do {
        nextNode = new Node(nodes.shift());
        prevNode._next = nextNode;
        prevNode = nextNode;
      } while(n--);
      return headNode;
  };

};

function SinglyLinkedList(nodes) {

  this._head = null;
  this._tail = null;
  this._length = 0;

  if(nodes) {

  }
};

SinglyLinkedList.prototype = {

  appendToTail: function(id) {
    this.getTail()._next = new Node(id);
  },

  next: function() {
    return this._next;
  },

  hasNextWithId: function(id) {
    var nextNode = this._next;
    return nextNode && nextNode._id == id;
  },

  getTail: function() {
    var tailNode;
    for(tailNode = this; tailNode._next != null; tailNode = tailNode._next);
    return tailNode;
  }
};

// SLL = Singly Linked List
var SLLUtils = {
,

  deleteNode = function(head, target_id) {
    if(!head) return;

    var currNode = head, prevNode;

    while(currNode) {
      if(currNode._id == target_id) break;
      prevNode = currNode;
      currNode = currNode.next();
    }

    if(!currNode) return head;

    if(head._id == currNode._id) {
      head = head.next();
    }
  },

  getHierarchyForHead: function(head) {
    var tab = "\t",
    i = 0,
    node = head,
    nodeToString = function(node) {
      var nextNode = (node._next != null ? node.toString() : 'null');
      return tab + "_id: " + node._id + ", _next: " + nextNode;
    };

    console.log("\n========== NODE HIERARCHY ==========");
    do {
      console.log("{");
      console.log(tab + nodeToString(node));
      console.log("}");
      node = head.next();
      head = node;
    } while(node);
  }
};

var rootNode = SLLUtils.createUsingArray([1,2,4,6,12,22]);

SLLUtils.getHierarchyForHead(rootNode);
deleteNode(rootNode, 1);
SLLUtils.getHierarchyForHead(rootNode);


// rootNode._next = deleteNode(rootNode._next, 1);
SLLUtils.getHierarchyForHead(rootNode);
