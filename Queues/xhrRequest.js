/**
 * @author Jonathon Hibbard
 * Google Interview
 */
// XHRRequest = function (url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET","data",true);

//   // register the event handler
//   xhr.addEventListener('load',function(){
//     if(xhr.status === 200){
//         alert("We got data: " + xhr.response);
//     }
//   },false) 

//   // perform the work
//   xhr.send();
// };

(function() {
  var $rootScope = this, n = 0,

  request = function(url) {
    var deferred = new Promise();
    var staticSecondMultiplier = 1000,
    randomTimeoutMultipler = Math.random() * (5 - 1) + 1,
    mockRequestLag = Math.floor(randomTimeoutMultipler * staticSecondMultiplier);

    setTimeout(function() {
      n++;
      deferred.resolve(['Finished with Request (' + n + ')!  URL = ' + url]);
    }, mockRequestLag);
    return deferred;
  },
  Promise = function(){
    this._done = [];
    this._fail = [];
  };

  Promise.prototype = {
    execute: function(list, args){
      var i = list.length;
      args = Array.prototype.slice.call(args);
      while(i--) list[i].apply(null, args);
    },
    resolve: function(){ this.execute(this._done, arguments); },
    reject: function(){ this.execute(this._fail, arguments); },
    done: function(callback){ this._done.push(callback); },
    fail: function(callback){ this._fail.push(callback); }
  };

  $rootScope.Promise = Promise;
  $rootScope.request = request;

}).call(this);

var i, responses = [];
for(i = 0; i < 20; i++) {
  // responses.push(request("http://www.google.com/" + i));
  request("http://www.google.com/" + i).done(function(data) {
      console.log('data = ' + data);
  });
}

// for(i = 0; i < 20; i++) {
//   responses[i].done(function(data) {
//       console.log('data = ' + data);
//   });
// }




// Promise v2:
//constructor
function PromiseBuilder(){
    this.pending = [];
    this.ready = false;
    this.result;
}

PromiseBuilder.prototype.then = function (callback) {
    if(toString.call(callback) === '[object Function]') {
        if(!ready) {
            this.pending.push(callback);
        } else {
            callback.call(this,result);
        }
    }
    return this;
};

PromiseBuilder.prototype.resolve = function () {
    var instance = this, resolveArgs = arguments;
    if(!ready) {
        ready = true;
        this.pending.forEach(function (value, index, ar) {
            value.apply(instance,resolveArgs);
        });
        this.pending = undefined;
    }
};

PromiseBuilder.prototype.isReady = function () {
    return this.ready;
};

//our masking function
function promise() {
    return new PromiseBuilder();   
};

var ajax = {
    get : function(url,params){
        var XHR = new XMLHttpRequest(), p = promise(), parameters = params || ''; //parameters is either itself or blank if none
        XHR.open("get", url, true);
        XHR.setRequestHeader("content-type", "text/html");
        XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status === 200) {
                promise.keep(XHR.responseText);
            }
        };
        XHR.send(parameters);

        return promise;
    }
}