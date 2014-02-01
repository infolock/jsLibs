// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call 
// to isSubstring (i.e., “waterbottle” is a rotation of “erbottlewat”).


function strSubstringOfStr(str1,st2) {
  if(str1.length != str2.length) return false;
  str1 = str1+""+str1;
  return (str1.indexOf(str2) >= 0);
}

console.log(strSubstringOfStr("waterbottle", "terbottlewa"));