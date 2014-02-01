// The question here is where was this defined?
// Is it based on a specific framework?  If so, which one?
// What is its return value?  Does it return an XHR promise object?
var request = function(url, callback) {
  callback({ url: url, time: new Date() });
};


var enqueue = function(url, callback) {

};