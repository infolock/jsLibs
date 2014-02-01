/**
 * @author Jonathon Hibbard
 * Google Interview
 * ==========================================================================================================================
 *
 * Assume we have a function request(url, callback) that starts an asynchronous request and invokes callback on completion.  
 * Write a function enqueue(url, callback), which makes a request as soon as no other requests created by enqueue are active.
 *
 * ==========================================================================================================================
 */

// Count number of requests to ensure we are calling the correct order...
var numRequests = 0,

// Mock Request so we have something to work with...
request = function(url, callback, async) { 
  var data = asyncReq(url, callback);
  if(!!async) return data;

  setTimeout(function() {
    callback(data);
  }, data.mockLag);
},

asyncReq = function(url, callback) {
  var staticSecondMultiplier = 1000,
  randomTimeoutMultipler = Math.random() * (10 - 1) + 1,
  mockRequestLag = Math.floor(randomTimeoutMultipler * staticSecondMultiplier);

  numRequests++;
  return { requestedURL: url, a: 1, b: 2, requestNum: numRequests, mockLag: mockRequestLag };
};

// ------ Begin enqueue -------

var enqueue = function(url, callback, async) {
  var $this = this,

  // The callback to execute when we're ready...
  onExecuteCallback = function() {
    request(url, function() {

      // as async of a continue as we can get for now...
      callback.apply($this, arguments);
      RQ.done().process();
    }, async);
  };

  // The request item to add to the queue...
  requestItem = new RequestQueueItem(onExecuteCallback);

  // Add the received request to the qeue and kickstart the process...
  RequestQueue.add(requestItem).kickstart();
};

/*!
 * @author Jonathon Hibbard - Process Request Queue Manager...
 */
// Scoped...
(function() {

  // Reference to the scope of the caller
  var $outterScope = this,

  // Has the requestQueue process() already been kickstarted?
  kickstarted = false,

  // easy status checks...
  IDLE = 0, PROCESSING = 1, REQUEST_IN_PROGRESS = 2,
  status = IDLE,
  // Helper method to check for validity of a function...
  isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  },

  resetRequestQueue = function() {
      RequestQueue.status = IDLE;
      kickstarted = false;
  };


  $outterScope.RequestInProgress = false;

  /*!
   * @author Jonathon Hibbard - The Actual Request Queue Item object...
   */
  function RequestQueueItem(onExecuteCallback) {
    this.callback = onExecuteCallback;
  }

  RequestQueueItem.prototype = {
    execute: function() {
      if(isFunction(this.callback)) this.callback();
    }
  };

  // Make it available outside of here...
  $outterScope.RequestQueueItem = RequestQueueItem;

  // Quick Ref to RequestQueueItem...
  $outterScope.RQItem = RequestQueueItem;


  /*!
   * @author Jonathon Hibbard - A Process Queue for handling Queued Requests.
   */
  // The actual RequestQueue object.
  var RequestQueue = function(obj) {
    if(obj instanceof RequestQueue) return obj;
    if(!(this instanceof RequestQueue)) return new RequestQueue(obj);
    this.RQWrap = obj;  // in case we need it...
  };

  var RQ = RequestQueue;

  // Make it available outside of here...
  $outterScope.RequestQueue = RequestQueue;
  $outterScope.RQ = RequestQueue;

  // Houses the "queue" of requests to be processed..
  RQ.queue = [];

  // Ensure that the "process()" method has been called on RequestQueue.  If it has already been started, do nothing.
  RQ.kickstart = function() {
    if(!kickstarted) {
      kickstarted = true;
      RQ.process();
    }
  };

  // The “state” of the RequestQueue (@see resetStatus())
  RQ.status = status;

  RQ.isIdle = function() { 
    return RQ.status == IDLE;
  };

  // Convenience to the size of the queue
  RQ.size = function() { 
    return RQ.queue.length;
  };

  // Checks for an empty queue and updates status
  RQ.isEmpty = function() { 
    return RQ.size() < 1;
  };

  // Adds the received block to the queue.  Requires a callback block to be passed.
  RQ.add = function(requestItem) {
    if(requestItem && requestItem instanceof RequestQueueItem) {
      RQ.queue.push(requestItem);
    }
    // maintain chainability
    return this;
  };

  RQ.done = function() {
    RQ.status = IDLE;
    return this;
  };

  // Processes the queued requests (if any)
  RQ.process = function() {
    if(RQ.status == PROCESSING) return;

    RQ.status = PROCESSING;

    // If the queue is empty, then reset everything and stop...
    if(RQ.resetIfEmpty()) return;

    var n = RQ.size()-1, 
    requestItem = null;

    // Either process until we have a valid requestItem or until we've checked all values in the queue...
    do {
      requestItem = RQ.queue.shift();
      // If we have a valid requestItem, execute the callback and just break out of here...
      if(requestItem && requestItem instanceof RequestQueueItem) {
        setTimeout(function() { requestItem.execute(); }, 20);
        RQ.status = REQUEST_IN_PROGRESS;
        break;
      }
    } while(n--);
    return this;
  };

  // Resets the RQ's status and kickstarted status when its empty...
  RQ.resetIfEmpty = function() {
    if(RQ.size() < 1) {
      resetRequestQueue();
      RQ.status = IDLE;
      return true;
    }
    return false;
  };

}).call(this);

// Uncomment to Test ...
var reqCallback, reqCount = 1, i,
runTest = function(numTimes, async) {
  for(i = 0; i < numTimes*10; i++, ++reqCount) {
    console.log("issueing enqueue() " + reqCount + " of " + reqCount/10*10);
    enqueue("http://www.example" + reqCount + ".com", function(data) {
      console.log("Recieved Callback for request with data:");
      console.log(data);
    }, async);
  }
};

runTest(1);
