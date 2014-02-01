var Stack = {
  topNode:{},
  queueItemId:{},

  // Methods
  pop: function() {
    if(topNode != null) {

      this.queueItemId = this.topNode._id;
      this.topNode = this.topNode.next;

      return this.queueItemId;
    }
    return null;
  },

  push: function(queueItemId) {
    var queueItemNode = new Node(queueItemId);
    queueItemNode.next = this.topNode;

    this.topNode = this.queueItemNode;
  }
}