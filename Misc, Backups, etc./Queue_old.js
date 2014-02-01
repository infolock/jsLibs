var Queue = {

  firstNode:{}, 
  lastNode:{}, 
  backupNode:{},

  enqueue: function(queueItem) {
    if(!this.firstNode) {
      backupNode = new Node(queueItem); 
      firstNode = backupNode;
    } else {
      back.next = new Node(item);
      back = back.next; }
    }
  },

  dequeue: function(node) {
    if(front != null) {
    Object item = front.data; front = front.next; return item;
  }
  return null; }
}