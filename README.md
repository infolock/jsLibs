This repo is to house some simple JS resources that can help with understanding the language, OOP and whatever else.

I'll list everything out here one day... there is also a lot of redundant code/backups and blah blah blah that i've kept.  one day, this house'll be clean.


# Overview

Algorithms
----------------
#### ALGORITHMS_AND_HELPERS.js
Just me messing around with Binary Tree Searches.  This file will probably be deleted or moved into the Trees subfolder soon.

#### {insertion, bead, bingo, heap, merge, pancake, quick, selection}_sort.js 
These made up all investigation work and examples that were used to understand the different sorting algorithms and big o.  These are represented as a single Library below - JHSortLib.js


Graphs
----------------
#### algorithms.js
Example of Dijkstra's Algorithm for finding the shortest path in a graph (collection of nodes and edges).


Linked Lists
----------------
#### Javascript_GOTCHAS.js
Misplaced file that covers some basic things to remember, patterns to use and example of memoize.

#### LinkedListClass.js
Example working with a Singly Linked List

#### LinkedListNew.js
Example working with a Circular Linked List


Queues
----------------
#### index.html
Example of synchronous (non-async) HTTP requests registered via a process queue.

#### queue.js
Proof of concept for building a process queue manager to execute synchronous HTTP requests.

#### queue.js
First attempt at building a process queue to handle registering/firing off synchronous requests.

#### queue_WORKING.js
I guess this is the "working" (lolz) version of the above queue.js

#### queues_With_extra_requirements_WORKING.js
Heh.. another "working" version of the same queue attempt(s) above, except this time with the added requirement: "If an item in the queue in progress times out, then stop the queue and wait for retry.  In that event, continue executing the queue from the point of failure (the item that failed)"

#### xhrRequest.js
Just some code I was working on for building my own xhrRequest handler (similar to jQuery's $.ajax) but for dealing with a process queue (above)

Toolkits
----------------
#### Arrays_Helper.js
Started to build an array helper but then just gave up on it for underscorejs.

#### Custom Exceptions.js
Example of building a custom exception


#### bits_bitwise_and_bitwise.js
Example of using/defining Bitwise Options (Flags & Masks).  This is similar to NS_ENUM/NS_OPTIONS in Objective C (enums to everyone else).

#### fibonacci
Disecting Douglas Crockford's explanation of memoize by use of fibonacci

#### hash_key_generators.js
Playing around with building a hash key generator (to be used with hash maps as key lookups).

#### ints_and_bools.js
Example of forced typecasting to an integer to test for equality.  Also includes an example showing how to force typecast to a BOOL.

#### objectClone.js
Trying to build a pure-js Object Cloner (didn't want to use jQuery's clone() - but ended up not needing it anyways so this was stopped mid-build)

#### onDomReady.js
John Resig's implementation of "...an onDomReady-function, for situations when frameworks are no-no.  It's loosely based on jQuery's implementation of $.ready"

#### processParagraph.js
... just ignore and never run this script.  heh.  was reading up about processing a paragraph of text that did all kinds of different find/replace on text, strings, markdown, etc...  It (appears) to be broken and in a state where it will create an infinite cycle loop ..  don't run it unless curiosity gets the best of you and you just want to hose your browser/machine.

Trees
----------------
#### BINARY_TREE_SEARCH.js
Example of a binary tree search.

#### Preorder_Binary_Tree_Traversal.js
All kinds of stuff in here:
* Sorting an unordered list
* Pre-ordering a Binary Tree
* Tree Builder
* Node Builder
* Search
* etc.

#### Preorder_Traversal.js
More simplistic example of the above Preorder_Binary_Tree_Traversal.js...

#### heapTree.js
Working with a heap to understand how it works ( stopped during build out.  This is where objectClone.js came from in the Toolkits section above).

#### prototype_binarySearch.js
Not sure that this is an actual working example.  However, it is a product of my research into understanding binary trees and searching them.


Deferred.js
----------------
https://github.com/lifeinafolder/Promises/blob/master/src/Promises.js


JHSortLib.js
----------------
A semi-large collection of examples showing a few sorting algorithms written in Javascript, including:
* Heap Sort
* Selection Sort
* Merge Sort
* Insertion Sort
* Bingo Sort
* Pancake Sort
* Quick Sort ( 4 different versions )

#### Requirements
* underscorejs - http://underscorejs.org
* jQuery - http://www.jquery.com


Node.js
----------------
Working with nodes and searching through a x-dimensional with single/multiple roots/branches.  Not really sure this is working.  Grabbed some underscore code for convenience to help in the process and investigation.


# Resources/Links/etc.
* http://www.underscorejs.org
* http://www.topcoder.com
* http://www.geeksforgeeks.org/
* http://www.anylogic.com/anylogic/help/index.jsp?topic=/com.xj.anylogic.help/html/code/Arrays_Colle ctions.html
* http://leetcode.com/
* http://rosettacode.org
* http://c2.com/
* http://jsperf.com/yet-another-quicksort-right/3
* http://bigocheatsheet.com/
* http://www.2ality.com/2012/11/var-statement-rules.html
* http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
* google.com - Search for Binary Tree, Linked List, Graph Heap, Heap Sort, Algorithms, etc.
