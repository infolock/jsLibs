/**
 * @author Jonathon Hibbard
 * Learning about bitwise
 *
 * Operator  Usage Description
 *
 * Bitwise AND a & b Returns a one in each bit position for which the corresponding bits of both operands are ones.
 *
 * Bitwise OR  a | b Returns a one in each bit position for which the corresponding bits of either or both operands are ones.
 *
 * Bitwise XOR a ^ b Returns a one in each bit position for which the corresponding bits of either but not both operands are ones.
 *
 * Bitwise NOT ~ a Inverts the bits of its operand.
 *
 * Left shift  a << b  Shifts a in binary representation b (< 32) bits to the left, shifting in zeros from the right.
 *
 * Sign-propagating right shift  a >> b  Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off.
 *
 * Zero-fill right shift a >>> b Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off, 
 * and shifting in zeros from the left.
 */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Bitwise Options (Flags & Masks) Example

// Primitive Bitmask for each flag.  These are the OPTIONS
var FLAG_A = 1; // 0001
var FLAG_B = 2; // 0010
var FLAG_C = 4; // 0100
var FLAG_D = 8; // 1000


// This is what we would be LOOKING for...  So, this is all of the valid OPTIONS for this bitmask.
// They are all optional though, which is kind of cool.  SO, the value for mask here is 
// 1 + 2 + 8 == 11 (FLAG_A = 1, etc.);  So, the user can pass in FLAG_A, B and/or D.  
// If any of these are set, we will need to check with &....
var mask = FLAG_A | FLAG_B | FLAG_D; // 0001 | 0010 | 1000 => 1011

// This is a SPECIFIC check for a SINGLE bit (in this case, 4).
// In order for this to be true, flags would need to have been defined like so (both of these will allow the next if statement to ring true):
// var flags = FLAG_C;  // or   var flags = FLAG_B | FLAG_C
var flags = FLAG_C;
if (flags & FLAG_C) {


// Now, lets create a whole new mask, which allows us to check for other mixes of the same bitmasks...
// This still uses the above, flags = FLAG_C definition ....
// Example:
var mask = FLAG_B | FLAG_C; 
if(flags & mask) {  // this will ring true...
}

// Flags can be set by ORing them with a bitmask, where each bit with the value one will set the corresponding flag, 
// if that flag isn't already set. For example, the bitmask 1100 can be used to set flags C and D:
var mask = FLAG_C | FLAG_D; // 0100 | 1000 => 1100
flags |= mask;   // 0101 | 1100 => 1101


// Flags can be cleared by ANDing them with a bitmask, where each bit with the value zero will clear the corresponding flag, 
// if it isn't already cleared. This bitmask can be created by NOTing primitive bitmasks. For example, the bitmask 1010 can 
// be used to clear flags A and C:
var mask = ~(FLAG_A | FLAG_C); // ~0101 => 1010
flags &= mask;   // 1101 & 1010 => 1000



// Flags can be toggled by XORing them with a bitmask, where each bit with the value one will 
// toggle the corresponding flag. For example, the bitmask 0110 can be used to toggle flags B and C:
var mask = FLAG_B | FLAG_C;
flags = flags ^ mask;   // 1100 ^ 0110 => 1010


// Finally, the flags can all be flipped with the NOT operator:
flags = ~flags;    // ~1010 => 0101


// Think about it this way.  You can either use these things as OPTIONS for a method and you can just check for what is set
// to determine what action to take - OR, you could use it to track the "state" of shit in your methods... this allows you 
// to dynamically alter BOOL checks like "hey, i'm about to process this value - is it still part of xyz group?".
// Of course this only makes sense when you want to compare MULTIPLE groups together - otherwise, just use a bool and be
// done with it...


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



var NO_OPTIONS = 0, 
   UNIQUE_WITH_SPACES = 1, 
UNIQUE_WITHOUT_SPACES = 2, 
  IGNORE_WP_IN_SEARCH = 4, 
 INCLUDE_WP_IN_SEARCH = 8;
