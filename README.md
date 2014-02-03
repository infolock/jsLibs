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



Trees
----------------



Deferred.js
----------------



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
underscorejs - http://underscorejs.org
jQuery - http://www.jquery.com



Node.js
----------------


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
