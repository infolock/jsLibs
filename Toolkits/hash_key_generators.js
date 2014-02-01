
// Extends the String prototype
String.prototype.hashCode = function() {
  var hash = 0;
  if(this.length == 0) return hash;
  for(i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
};



// Extends the Node prototype - This is for DOM-type elements so DO NOT USE IT EXACTLY AS IS!!!!
// The point is to be an example ONLY!...
//
// The Node object represents a single node in the document tree.  See: 
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