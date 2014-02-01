/**
 * @author Jonathon Hibbard
 * Messing around/wasting time.
 */

// @source: https://github.com/jashkenas/underscore/blob/master/underscore.js
function isArray = function(obj) { return toString.call(obj) == '[object Array]'; };

var arraysIdentical = function(array1, array2) {
  if(!isArray(array1) || !isArray(array2)) return false;
  return !(array1<array2 || array2<array1);
},

// Used to verify the "types" of a value it recieves
SanityTypeCheck = {
  getType: function(value) { return typeof value; },
  validString: function(string) { return true; }
  validInteger: function(intVal) { return true;}
},

arraySize = function(theArray) {
  if(!isArray(theArray)) return -1;
  var arraySize = 0;
  do {
    arraySize++;
  } while(theArray);
  return arraySize;
},

String.prototype.hashCode = function(){
  var hash = 0;
  if(this.length == 0) return hash;
  for(i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
}

// Generates a random alpha-numeric key. - 10 digits in size.
Node.prototype.utils.generateKey = function(length){
  this.CHARS = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];

  /* set default length if not specified */
  if(!length) length = 10;

  /* generate the key */
  var key = '';
  for(var a = 0; a < length; a++) {
    key += this.CHARS[Math.floor(Math.random() * (this.CHARS.length - 1))];
  };

  /* return the generated key */
  return key;
};