/**
 * @author Jonathon Hibbard
 * Studying for upcoming Interview w/ Google
 */
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//            CLOSURES and the MODULE PATTERN
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Looks for HTML entities in a string and replace them with their equivalents
String.method('deentityify', function () {
   // The entity table. It maps entity names to characters.
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  // Closure, which is actually the 'deentityify' method defined above...
  return function () {
     // When deentityify is called, we are just calling the String.replace() method, looking for substrings that start with '&' and end with ';'.
     // If the characters in between are in the entity table, then replace the entity with the character from the table.
    return this.replace(/&([^&;]+);/g, function (a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());
document.writeln( '&lt;&quot;&gt;'.deentityify()); // <">

// Notes about the above regarding how it is defined using the >>> MODULE PATTERN <<<< :

// The module pattern takes advantage of function scope and closure to create relationships that are binding and private.
// In this example, only the deentityify method has access to the entity data structure.
//
// The general pattern of a module is a function that:
//   |- defines private variables and functions
//   |- creates privileged functions which, through closure, will have access to the private variables and functions
//   |- returns the privileged functions or stores them in an accessible place.
// This pattern can eliminate the use of global variables
// It promotes information hiding and other good design practices. It is very effective in encapsulating applications and other singletons

// Another Example of the >>>> Module Pattern <<<<<
var serial_maker = function () {
  // Everything will have access to the value of the prefix and seq variables - AT ALL TIMES.
  // In other words, if one of the methods defined in the "return" object manipulate one of value of one of these variables, 
  // that value will be available to ALL OTHER METHODS AS WELL!!! :D
  var prefix = '',
  seq = 0;


  return {
    set_prefix: function (p) {
        prefix = String(p);
    },

    set_seq: function (s) {
      seq = s;
    },

    gensym: function () {
      var result = prefix + seq; seq += 1;
      return result;
    }
  };
};
var seqer = serial_maker();
seqer.set_prefix = ('Q');
// seqer.set_seq = (1000);
var unique = seqer.gensym();  // unique is "Q1000"



//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//            Memoization <<< THIS IS AN AWESOKWERMEMRSDFJKH pattern~!K@#!@#
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var memoryBanker = function() {
  var memoryBank = [];
  var addToBank = function(some_value) {
    var result = memoryBank[some_value];
    if(!result) {
      result = some_value;  // or do whatever we want with some_value...
      memoryBank.push(result);
    }
    return result;
  };
  return addToBank;
}();

// We cannot call addToBank because it is protected.
// We don't need to anyways, as addToBank is actually what is returned for free to us!!
memoryBanker('hahahaha');  // returns 'hahahaha'