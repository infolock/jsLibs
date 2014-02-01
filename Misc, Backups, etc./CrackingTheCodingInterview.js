/**
 * @author Jonathon Hibbard
 * Prep work for Google Interview
 */

function reverseStr(str) {
  return str.split("").reverse().join("");
}

// Handles all known UTF-8 ASCII Chars.
function uniqueCodeCharsInStr(str) {
  var charset = {}, n = str.length-1, c;
  do {
    c=str[n].charCodeAt(0);
    if(charset[c]) return 0;
    charset[c] = 1;
  } while(--n);

  return 1;
}

// All lower case
function isUniqueChars(str) {
  str = str || "";
  if(!toString.call(str) == '[object String]') return -1;

  var i, x = str.length-1, currentChar, charCount = 0;
  for(i = 0; i < x; i++) {
    currentChar = str.charAt(i) - 'a';
    if((charCount & (1 << currentChar)) > 0) return 0;
    charCount |= (1 << currentChar);
  }
  return 1;
}



// Depth-frist :  Ascending Order ( some id x comes *befor* id y ).  Descending is the opposite.



// Track location of a node in a tree
var IndexPath = {
  paths = [],
  indexPathWithIndexes: function(indexes) {
    
  }
};

var indexes = [];
function addParentNode(parentNode) {
  indexPath = 0;
}



// ------ EXAMPLES --------

var NO_OP = 0, UNIQUE_CHARS_ONLY = 1, REPLACE_RANDOM_KEY_WITH_SPACE = 2,

possibleChars = function() {
  return [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126];
},

isValidString = function(str) { return toString.call(str) == '[object String]'; },

optExists = function(options, option) {
  return (options & option) === option;
},

// Src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
randomIntInRange = function(max,min) { return Math.floor(Math.random() * (max - min + 1)) + min; },

randomCharCodeFromSet = function(charset, options) {
  var n = charset.length-1, key = randomIntInRange(0,n), keyChar = charset[key];

  if(optExists(options, UNIQUE_CHARS_ONLY)) {
    charset.splice(key, 1);
  }

  return keyChar;
},

replaceRandomKeyWithSpace = function(maxLen, randomString) {
  if(maxLen%8 || maxLen <= 8) {
    return;
  }

  var key,
  numSpaces = Math.floor(maxLen / 8);

  do {
    key = randomIntInRange(8, numSpaces);
    if(!key) break;
    randomString[key] = " ";
  } while(--numSpaces);
},

getRandomString = function(maxLen, options) {
  maxLen = +maxLen || 20;
  options = options || NO_OP; // when enabled, spaces are as random as the chars that go with them.

  var charset = possibleChars(), randomKey, randomChar, randomString = [];

  do {
    randomKey = randomCharCodeFromSet(charset, options);
    if(!randomKey) break;
    randomChar = String.fromCharCode(randomKey);
    randomString.push(randomChar);
  } while(--maxLen);

  if(optExists(options, REPLACE_RANDOM_KEY_WITH_SPACE)) {
    replaceRandomKeyWithSpace(maxLen, randomString);
  }
  return randomString.join("");
},

// NSP == No Spaces | WSP = With Spaces

randomString_NSP = getRandomString(100),
randomUniqueString_NSP = getRandomString(100, UNIQUE_CHARS_ONLY);

function uniqueCharsInStr(str) {
  var charset = {}, n = str.length-1, c;
  do {
    c=str[n];
    if(charset[c]) return 0;
    charset[c]=1;
  } while(n--);
  return 1;
}


console.log(uniqueCodeCharsInStr(randomString_NSP));
console.log(uniqueCodeCharsInStr(randomUniqueString_NSP));



