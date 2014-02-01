/**
 * @author Jonathon Hibbard
 * Playing with sorts
 *
 * Insertion Sorts
 * Sorts from 1 - n
 * Example:   [8,2,4,9,3,6]
 *
 * The worst case for insertion sorting is if it is already "reverse" sorted.
 *
 * Running Time:  
 *    * Depends on the input itself.  (eg: if its already sorted, then insertion sort it has nothing to do);
 *    * Depends on the input size ( 6 elements vs 6x10^9 elements)
 *   	|- To handle large sets like in the example of 6x10^9, we parameterize things in the input size 
 *		   so we're going to talk about Time as a function of the size of things that we are sorting - so that we can look at what the behavior is of that
 *	  * We want upper bounds on the running time.  we want to know that the time is no more than a certain amount (this gives a guaruntee to the user)
 *		|- Important because it represents a guaruntee to the user.
 *
 * Kinds of Analysis:
 *--------------------
 *	1) Worst-case Analysis (usually)
 *	   + Equation:   T(n) = Maximum time on any input of size, n     * The maximum it could cost us on the size of n
 *	   |- By looking at the worst-case because that is the way we're going to be able to make a guaruntee.
 *	   * Without T(n), its a relation rather than a function.  By putting a mximum, it relates it to a function.
 *
 *
 *	 2) Average-case Analysis (sometimes)
 *		* T(n) = THe "expected" time over all inputs of size, n
 *		  |- "Expected" as in "expected inputs". Its the time of every input times the probability that it will be that input.  (its like taking a weighted average)
 *			  |- How do I know what the probability of every input is (or even the probability of when a particular input occurs in)?  
 *				 |- You can't!  You have to make an assumption of the "statistical distribution" of inputs - otherwise, the expected time doesn't mean anything.  You have to have some assumptions.
 *					|- The most common assumption is that all inputs are equally likely.  That's considered the "Uniform Distribution"
 *
 *
 *	 3) Best-case Analysis  (bogus)
 *		|- Why?  Because there is no guaruntee that this case will ever occur.  You could even "cheat" with a *slow* algorithm that works *fast* on "some" inputs - but not all of them.
 *			  I mean... we're giving an "analysis" here (a guess) rather than fact, so that's why best-case is stupid - because this may never happen.
 *
 *======================================================================================================================================================================================
 *
 * What is insertion sort's worse-case time?   
 *==========================================
 *  Depends on the computer (if it is beefy or slow)
 *	- relative speed on the same type of machine
 *	- absolute speed (is one algorithm better no matter what machine it is on)
 * 
 * So, how do we solve it?  That's where we come to the Big Idea...
 *
 *======================================================================
 * The BIG IDEA! to algorithms 				<<<<<<<<< IMPORTANT!@#!@#!@#
 *======================================================================
 *	Asymptotic Analysis
 *	====================
 *  1) Ignore machine-dependent constants
 *  2) Instead of the running time, look a/* a[0] to a[n-1] is the array to sort
 * .... blah blah ...blah.
 *
 */
int i,j;
int iMin;
 
/* advance the position through the entire array */
/*   (could do j < n-1 because single element is also min element) */
for (j = 0; j < n-1; j++) {
    /* find the min element in the unsorted a[j .. n-1] */
 
    /* assume the min is the first element */
    iMin = j;
    /* test against elements after j to find the smallest */
    for ( i = j+1; i < n; i++) {
        /* if this element is less, then it is the new minimum */  
        if (a[i] < a[iMin]) {
            /* found new minimum; remember its index */
            iMin = i;
        }
    }
 
    /* iMin is the index of the minimum element. Swap it with the current position */
    if ( iMin != j ) {
        swap(a[j], a[iMin]);
    }
}ady in reverse-sort order.
//


/*! 
//    Pseudocode  

// The values in A[i] are checked in-order, starting at the second one
 for i ← 1 to i ← length(A)
   {
     // at the start of the iteration, A[0..i-1] are in sorted order
     // this iteration will insert A[i] into that sorted order
 
     // save A[i], the value that will be inserted into the array on this iteration
     valueToInsert ← A[i]
     // now mark position i as the hole; A[i]=A[holePos] is now empty
     holePos ← i
     // keep moving the hole down until the valueToInsert is larger than 
     // what's just below the hole or the hole has reached the beginning of the array
     while holePos > 0 and valueToInsert < A[holePos - 1]
       { //value to insert doesn't belong where the hole currently is, so shift 
         A[holePos] ← A[holePos - 1] //shift the larger value up
         holePos ← holePos - 1       //move the hole position down
       }
     // hole is in the right position, so put valueToInsert into the hole
     A[holePos] ← valueToInsert
     // A[0..i] are now in sorted order
   } */

var InsertionSort = function(a, n) {
  var key;

  for() {
    do {

    } while();

  }
}

var myArray = [20,13,7,2,12,11,9,1];
var mergeSort = function(theArray) {
  var arrLen = theArray.length, 
  	  center = Math.ceil(arrLen/2), 
  	   List1 = theArray.slice(0,center), 
  	   List2 = theArray.slice(center);

  console.log(List1);
  console.log(List2);
}

var insertionSort = function(theArray) {
	var x = count(theArray), i;
	for(i = 0; i < x; i++) {
		
	}
}