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

var request;
function enqueue (url, callback) {

    var onExecute = function() {
      request(url, function(data) {
          callback.apply(this, [data]);
          RequestQueue.start();
      });
    }, 
    requestItem = new RequestQueueItem(onExecute);
    RequestQueue.push(requestItem).run();
 }

 (function() {
    var $rootScope = this, _queue = [], _lastRequestItem = null, STOPPED = -1, READY = 0, PROCESSING = 1, _status = READY,

    RequestQueueItem = function(onExecute) {
      this._id = +(new Date());
      this._onExecute = onExecute;
    },

    RequestQueue = function(obj) {
      if(obj instanceof RequestQueue) { return obj; }
      if(!(this instanceof RequestQueue)) { return new RequestQueue(obj); }
      this.wrapper = obj;
    };

    RequestQueueItem.prototype = { 
      getId: function() { return this._id; },
      execute: function() { 
        if(this._onExecute && toString.call(this._onExecute) == '[object Function]') { this._onExecute(); }
        return this;
      }
    };

    $rootScope.RequestQueueItem = RequestQueueItem;
    $rootScope.RequestQueue = RequestQueue;

    RequestQueue.size = function() { return _queue.length; };
    RequestQueue.isEmpty = function() { return RequestQueue.size() == 0; };
    RequestQueue.issetLastRequestItem = function() { return _lastRequestItem != null && RequestQueue.isValidRequestItem(_lastRequestItem); };
    RequestQueue.isValidRequestItem = function(requestItem) { return requestItem != null && requestItem instanceof RequestQueueItem; };
    RequestQueue.isReady = function() { return _status == READY; };
    RequestQueue.setStatus = function(status) {
        status = +status || READY;
        if(isNaN(status) || status < -1 || status > 1) { status = READY; }
        _status = status;

        return this;
    };
    RequestQueue.start = function(){ return RequestQueue.setStatus(READY).run(); };
    RequestQueue.stop = function(){ return RequestQueue.setStatus(STOPPED); };
    RequestQueue.resume = function(){ return RequestQueue.rewind().setStatus(READY).start(); };
    RequestQueue.rewind = function() { if(!RequestQueue.isEmpty() && RequestQueue.issetLastRequestItem()) { RequestQueue.unshift(_lastRequestItem); } return this; };
    RequestQueue.shift = function() { return _queue.shift(); };
    RequestQueue.unshift = function(requestItem) { requestItem = requestItem || {}; if(RequestQueue.isValidRequestItem(requestItem)) { _queue.unshift(requestItem); }};
    RequestQueue.run = function() {
        if(!RequestQueue.isReady() || RequestQueue.isEmpty()) { return; }
        var requestItem = RequestQueue.shift();
        if(RequestQueue.isValidRequestItem(requestItem)) {
          _status = PROCESSING;
          _lastRequestItem = requestItem;
          requestItem.execute();
        }
        return this;
    };
    RequestQueue.push = function(requestItem) {
        requestItem = requestItem || {};
        if(RequestQueue.isValidRequestItem(requestItem)) { _queue.push(requestItem); }
        return this;
    };

    RequestQueue.next = RequestQueue.shift;
    RequestQueue.add = RequestQueue.push;

 }).call(this);

request = function(url, callback) {
  setTimeout(function() {
    callback.apply(this, [url] );
  }, 2000);
};

enqueue("http://www.google1.com", function(data) { console.log(data); });
enqueue("http://www.google2.com", function(data) { console.log(data); });