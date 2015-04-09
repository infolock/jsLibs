var isSubstring = function( str1, str2 ) {
    if( str1.length != str2.length ) {
        return false;
    }

    str1 = str1 + "" + str1;

    return ( str1.indexOf( str2 ) >= 0 );
};

console.log( isSubstring( "waterbottle", "terbottlewa" ) );
