function CycleException(message, line) {
  this.name = 'CycleException';
  this.message = 'FATAL ERROR: INFINITE LOOP CYCLE DETECTED!  Reason: ' + message;
  if(+line && +line > 0) {
    this.lineNumber = line;
  }
}

CycleException.prototype = new Error;