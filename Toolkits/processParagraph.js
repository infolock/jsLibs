/**
 * @author Jonathon Hibbard
 * This is suposed to walk through a paragraph and replace shit.
 * DO NOT RUN THIS MOTHER ******!  IT GOES INTO A CYCLE LOOP AND WILL HOSE YOUR MACHINE! LOL FIX IT OR DIE!
 */
(function() {
  var root = this;
    function CycleException(message, line) {
      this.name = 'CycleException';
      this.message = 'FATAL ERROR: INFINITE LOOP CYCLE DETECTED!  Reason: ' + message;
      if(+line && +line > 0) {
        this.lineNumber = line;
      }
    }
    CycleException.prototype = new Error;

  var processParagraph = function() {
    return new processParagraph();
  };

  root.processParagraph = processParagraph;

  processParagraph.fragments = function(paragraphText) {
    var fragmentArray = [],

    map = function(applyFunc, array) {
      var result = [], arrayItem, n = array.length;
      do {
        arrayItem = array.shift();
        result.push(applyFunc(arrayItem));
      } while(n--);
      return result;
    },

    reduce = function(combine, base, array) {
      var arrayItem, n = array.length;
      do {
        arrayItem = array.shift();
        base = combine(base, arrayItem);
      } while(n--);
      return base;
    },

    fragmentSig = function(fragmentType) { 
      return { type: fragmentType, content: [] }
    },

    addFragmentType = function(fragmentType) {
      fragmentArray.push(fragmentSig(fragmentType));
    },

    clog = function(output, description) {

      description = description || "";
      var outputType = toString.call(output);

      if(outputType == '[object Array]' || outputType == '[object Object]') {
        if(description.length < 1) description = "Object/Array Value:"
        console.log(description);
        console.log(output);
        return;
      }

      console.log(description + output);
    },

    indexOrEnd = function(character) {
      var index = paragraphText.indexOf(character);
      return index == -1 ? paragraphText.length : index;
    },
   
    takeNormal = function() {
      var end = reduce(Math.min, paragraphText.length, map(indexOrEnd, ["*", "{"]));
      var part = paragraphText.slice(0, end);
      paragraphText = paragraphText.slice(end);
      return part;
    },
   
    takeUpTo = function(character) {
      var end = paragraphText.indexOf(character, 1);
      if (end == -1)
        throw new Error("Missing closing '" + character + "'");
      var part = paragraphText.slice(1, end);
      paragraphText = paragraphText.slice(end + 1);
      return part;
    };

    var failsafe = 100;
    do {

      failsafe--;
      if(failsafe <= 0) {
        throw new CycleException('The failsafe was triggered due to an infinite cycle detection being triggered', 90);
      }

      if (paragraphText.charAt(0) == "*") {
        fragmentArray.push({type: "emphasised", content: takeUpTo("*")});
      } else if (paragraphText.charAt(0) == "{") {
        fragmentArray.push({type: "footnote", content: takeUpTo("}")});
      } else {
        fragmentArray.push({type: "normal", content: takeNormal()});
      }
    } while(paragraphText != "");
    return fragmentArray;
  };
}).call(this);


console.log("");
this.processParagraph.fragments("Tzu-li and Tzu-ssu were boasting about the size of their latest programs. 'Two-hundred thousand lines', said Tzu-li, 'not counting comments!'. 'Psah', said Tzu-ssu, 'mine is almost a *million* lines already.' Fu-Tzu said 'My best program has five hundred lines.' Hearing this, Tzu-li and Tzu-ssu were enlightened.  A beginning programmer writes his programs like an ant builds her hill, one piece at a time, without thought for the bigger structure. His programs will be like loose sand. They may stand for a while, but growing too big they fall apart{Referring to the danger of internal inconsistency and duplicated structure in unorganised code.}.");