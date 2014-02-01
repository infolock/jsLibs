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

// ------ Begin enqueue -------
var enqueue = function(url, callback) {
  var $this = this,

  // The callback to execute when we're ready...
  onExecuteCallback = function() {

    request(url, function() {
      callback.apply($this, arguments);
  
      // as async of a continue as we can get for now...
      setTimeout(function() {
        RequestQueue.status = 0;
        RequestQueue.pop();
      }, 20);
    });
  };

  requestItem = new RequestQueueItem(onExecuteCallback);
  RequestQueue.push(requestItem).pop();
};

// Process Request Queue Manager...
(function() {

  var $outterScope = this,
  IDLE = 0, PROCESSING = 1, REQUEST_IN_PROGRESS = 2,

  isFunction = function(obj) { return toString.call(obj) == '[object Function]'; },
  resetRequestQueue = function() {
      RequestQueue.status = IDLE;
      kickstarted = false;
  };

  $outterScope.RequestInProgress = false;

  // The Actual Request Queue Item object...
  function RequestQueueItem(onExecuteCallback) { this.callback = onExecuteCallback; }

  RequestQueueItem.prototype = {
    execute: function() {
      if(isFunction(this.callback)) this.callback();
    }
  };

  $outterScope.RequestQueueItem = RequestQueueItem;

  // A Process Queue for handling Queued Requests.
  var RequestQueue = function(obj) {
    if(obj instanceof RequestQueue) return obj;
    if(!(this instanceof RequestQueue)) return new RequestQueue;
    this.RQ = obj;  // in case we need it...
  };

  $outterScope.RequestQueue = RequestQueue;
  RequestQueue.queue = [];
  RequestQueue.status = status;

  RequestQueue.isIdle = function() { return RequestQueue.status == IDLE; };
  RequestQueue.size = function() { return RequestQueue.queue.length; };
  RequestQueue.isEmpty = function() { return RequestQueue.size() < 1; };

  RequestQueue.push = function(requestItem) {
    if(!requestItem || !requestItem instanceof RequestQueueItem) return;

    RequestQueue.queue.push(requestItem);
    return this;
  };

  RequestQueue.pop = function() {
    if(RequestQueue.status == PROCESSING) return;

    RequestQueue.status = PROCESSING;

    if(RequestQueue.size() < 1) {
      resetRequestQueue();
      RequestQueue.status = IDLE;
      return;
    }

    var n = RequestQueue.size()-1, 
    requestItem = null;

    do {
      requestItem = RequestQueue.queue.shift();
      if(requestItem && requestItem instanceof RequestQueueItem) {
        requestItem.execute();
        break;
      }
    } while(n--);
  };
}).call(this);

var numRequests = 0,
request = function(url, callback) { 
  var staticSecondMultiplier = 1000,
  randomTimeoutMultipler = Math.random() * (10 - 1) + 1,
  mockRequestLag = Math.floor(randomTimeoutMultipler * staticSecondMultiplier);

  numRequests++;

  setTimeout(function() {
    callback( { a: 1, b: 2, requestNum: numRequests});
  }, mockRequestLag);
};

// Uncomment to Test ...
var reqCallback, reqCount = 1, i,
runTest = function(numTimes) {
  for(i = 0; i < numTimes*10; i++, ++reqCount) {
    console.log("issueing enqueue() " + reqCount + " of " + reqCount/10*10);
    enqueue("http://www.example.com", function(data) {
      console.log("Recieved Callback for request with data:");
      console.log(data);
    });
  }
};

runTest(1);