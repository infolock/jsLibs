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
 
 // New Requirements - If an item in the queue in progress times out, then stop the queue and wait for retry.  In that event, continue executing the queue
 // from the point of failure (the item that failed)

// ------ Begin enqueue -------

// This just restarts the queue when there was a failure. This is called from the user when they want to retry a queue that has failed processing at a point.
var resumeRequestQueue = function() {
  if(RequestQueue && RequestQueue.status == 3) {
    RequestQueue.resume();
  }
},

enqueue = function(url, callback, onErrorCallback) {

  var $this = this,

  // The callback to execute when we're ready...
  onExecuteCallback = function() {

    if(RequestQueue && RequestQueue.status == 3) return;
    RequestQueue.pause();

    request({
      url: url, 
      timeout: 200
    }).done(function(data) {
      callback(data);
      // callback.apply($this, arguments);

      RequestQueue.resume();

    }).error(function(status_code) {

      RequestQueue.stop();
      RequestQueue.unshift(RequestQueue.lastRequestItem);

      // Append to the arguments list and pass that back to the user.)
      arguments.push(resumeRequestQueue);
      onErrorCallback.apply($this, arguments);

    });
  },


  requestItem = new RequestQueueItem(onExecuteCallback);
  RequestQueue.push(requestItem).start();
};

// Process Request Queue Manager...
(function() {

  var $outterScope = this,
  READY = 0, PROCESSING = 1, REQUEST_IN_PROGRESS = 2, PAUSED = 3,

  isFunction = function(obj) { return toString.call(obj) == '[object Function]'; },
  resetRequestQueue = function() {
      RequestQueue.status = READY;
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
  RequestQueue.lastRequestItem = null;

  RequestQueue.isReady  = function() { return RequestQueue.status == READY; };
  RequestQueue.size    = function() { return RequestQueue.queue.length; };
  RequestQueue.isEmpty = function() { return RequestQueue.size() < 1; };

  RequestQueue.push = function(requestItem) {
    if(!requestItem || !requestItem instanceof RequestQueueItem) return;

    RequestQueue.queue.push(requestItem);
    return this;
  };

  RequestQueue.pause = function() {
    this.status = PAUSED;
  };

  RequestQueue.resume = function() {
    RequestQueue.status = READY;
    RequestQueue.pop();
  };

  RequestQueue.unshift = function(requestItem) {
    // During the interview, ask if the user can execute the same request multiple times or not.
    RquestQueue.queue.unshift(requestItem);
  };

  RequestQueue.next = function() {
    RequestQueue.start();
  }

  RequestQueue.start = function() {
    if(this.status == READY) {
      RequestQueue.status = 0;
      RequestQueue.pop();
    }
  };

  RequestQueue.pop = function() {
    if(RequestQueue.status == PROCESSING || RequestQueue.status == PAUSED) return;

    RequestQueue.status = PROCESSING;
    if(RequestQueue.size() < 1) {
      resetRequestQueue();
      RequestQueue.status = READY;
      return;
    }

    var n = RequestQueue.size()-1, 
    requestItem = null;

    do {

      lastRequestItem = requestItem;
      requestItem = RequestQueue.queue.shift();

      if(requestItem && requestItem instanceof RequestQueueItem) {
        requestItem.execute();
        break;
      }
    } while(n--);
  };
}).call(this);

var numRequests = 0,
request = function(requestObj) { 

  console.log("\n\n>>>>>>>> Received Request to process url:" + requestObj.url);

  var staticSecondMultiplier = 1000,
  randomTimeoutMultipler = Math.random() * (10 - 1) + 1,
  mockRequestLag = Math.floor(randomTimeoutMultipler * staticSecondMultiplier);

  var data = {
    name: "bogus", 
    date: new Date(),
    url: requestObj.url,
    response_time: mockRequestLag
  };

  var errorObj = {
    status_code: 500,
    message: "Internal Server Error",
  }


    //
    // Only missing piece here is to actually fire the error off in the event of the timeout value expiring....
    //

  var mockXHR = (function(requestObj, responseObj) {

    var $scope = this;
    $scope.done = function(callback) {
      console.log("|||||  Processing URL: " + requestObj.url);
      setTimeout(function() {
        console.log("<<<<< RETURNING RESPONSE DATA from URL (" + requestObj.url + ")!");
        callback(responseObj);
      }, mockRequestLag);
      return this;
    };
    $scope.error = function(status_code, url) {};

    return $scope;
  })(requestObj, data);

  return mockXHR;
};

// Uncomment to Test ...
var reqCallback, reqCount = 1, i,
runTest = function(numTimes) {
  for(i = 0; i < numTimes*10; i++, ++reqCount) {
    console.log("issueing enqueue() " + reqCount + " of " + reqCount/10*10);
    enqueue("http://www.example.com"+i, function(data) {
      console.log("-=-=-=-= Recieved Callback for request with data! -=-=-=-= Data:");
      console.log(data);
    });
  }
};

runTest(1);




// Good notes:
/*
A consequence of this error is that a method cannot employ an inner function to help it do its work 
because the inner function does not share the method’s access to the object as its this is bound to the wrong value. 

For- tunately, there is an easy workaround. If the method defines a variable and assigns it the value of this, 

the inner function will have access to this through that variable. By convention, the name of that variable is that:
     // Augment myObject with a double method.
myObject.double = function () {
var that = this; // Workaround.
var helper = function () {
that.value = add(that.value, that.value);
};
helper(); // Invoke helper as a function. };
     // Invoke double as a method.
myObject.double( ); document.writeln(myObject.getValue()); // 6

*/