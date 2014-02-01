/**
 * @author Jonathon Hibbard
 * Messing around/wasting time.
 */

// "   haha  ".trim();
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

var SpecialChars = {
  // return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
  lines: /\r\n|\r|\n/g, 
  spaces: /^\s+|\s+$/g, 
  html_tags: /<\/?[^>]+>/g,
  puncuation: /[,'\"\.\|\\\/\-_]/
};

var makeExcerpt = function(str, options) {
  var defaults = {
    length: 40,
    start: 0,
    strip_tags: true,
    force_whole_words: false,
    // force_whole_words must be true before this will be applied
    extend_excerpt_to_whole_word: false,
    // These characters will not be used to calculate the except string length
    exclude_chars_from_count: [''],
    more: "...",
  };
  if(!toString.call(str) == '[object String]') return str;
  if(excert_len < 10) return str.slice(0, excerpt_len);
};





 /*!
  * Generates an excerpt from the content, if needed.
  *
  * The excerpt word amount will be 55 words and if the amount is greater than
  * that, then the string ' [&hellip;]' will be appended to the excerpt. If the string
  * is less than 55 words, then the content will be returned as is.
  *
  * The 55 word limit can be modified by plugins/themes using the excerpt_length filter
  * The ' [&hellip;]' string can be modified by plugins/themes using the excerpt_more filter
  *
  * @since 1.5.0
  *
  * @param string $text Optional. The excerpt. If set to empty, an excerpt is generated.
  * @return string The excerpt.
  */
 function wp_trim_excerpt($text = '') {
         $raw_excerpt = $text;
         if ( '' == $text ) {
                 $text = get_the_content('');
 
                 $text = strip_shortcodes( $text );
 
                 $text = apply_filters('the_content', $text);
                 $text = str_replace(']]>', ']]&gt;', $text);
                 $excerpt_length = apply_filters('excerpt_length', 55);
                 $excerpt_more = apply_filters('excerpt_more', ' ' . '[&hellip;]');
                 $text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
         }
         return apply_filters('wp_trim_excerpt', $text, $raw_excerpt);
 }
 

// wp_trim_words MAY NOT BE NEEDED!!!!!
 /*!
  * Trims text to a certain number of words.
  *
  * This function is localized. For languages that count 'words' by the individual
  * character (such as East Asian languages), the $num_words argument will apply
  * to the number of individual characters.
  *
  * @since 3.3.0
  *
  * @param string $text Text to trim.
  * @param int $num_words Number of words. Default 55.
  * @param string $more Optional. What to append if $text needs to be trimmed. Default '&hellip;'.
  * @return string Trimmed text.
  */
 function wp_trim_words( $text, $num_words = 55, $more = null ) {
         if ( null === $more )
                 $more = __( '&hellip;' );
         $original_text = $text;
         $text = wp_strip_all_tags( $text );
         /* translators: If your word count is based on single characters (East Asian characters),
            enter 'characters'. Otherwise, enter 'words'. Do not translate into your own language. */
         if ( 'characters' == _x( 'words', 'word count: words or characters?' ) && preg_match( '/^utf\-?8$/i', get_option( 'blog_charset' ) ) ) {
                 $text = trim( preg_replace( "/[\n\r\t ]+/", ' ', $text ), ' ' );
                 preg_match_all( '/./u', $text, $words_array );
                 $words_array = array_slice( $words_array[0], 0, $num_words + 1 );
                 $sep = '';
         } else {
                 $words_array = preg_split( "/[\n\r\t ]+/", $text, $num_words + 1, PREG_SPLIT_NO_EMPTY );
                 $sep = ' ';
         }
         if ( count( $words_array ) > $num_words ) {
                 array_pop( $words_array );
                 $text = implode( $sep, $words_array );
                 $text = $text . $more;
         } else {
                 $text = implode( $sep, $words_array );
         }
         return apply_filters( 'wp_trim_words', $text, $num_words, $more, $original_text );
 }




 /*!
  * Safely extracts not more than the first $count characters from html string.
  *
  * UTF-8, tags and entities safe prefix extraction. Entities inside will *NOT*
  * be counted as one character. For example &amp; will be counted as 4, &lt; as
  * 3, etc.
  *
  * @since 2.5.0
  *
  * @param string $str String to get the excerpt from.
  * @param integer $count Maximum number of characters to take.
  * @param string $more Optional. What to append if $str needs to be trimmed. Defaults to empty string.
  * @return string The excerpt.
  */
 function wp_html_excerpt( $str, $count, $more = null ) {
         if ( null === $more )
                 $more = '';
         $str = wp_strip_all_tags( $str, true );
         $excerpt = mb_substr( $str, 0, $count );
         // remove part of an entity at the end
         $excerpt = preg_replace( '/&[^;\s]{0,6}$/', '', $excerpt );
         if ( $str != $excerpt )
                 $excerpt = trim( $excerpt ) . $more;
         return $excerpt;
 }




 /*!
  * Call the functions added to a filter hook.
  *
  * The callback functions attached to filter hook $tag are invoked by calling
  * this function. This function can be used to create a new filter hook by
  * simply calling this function with the name of the new hook specified using
  * the $tag parameter.
  *
  * The function allows for additional arguments to be added and passed to hooks.
  * <code>
  * function example_hook($string, $arg1, $arg2)
  * {
  *              //Do stuff
  *              return $string;
  * }
  * $value = apply_filters('example_filter', 'filter me', 'arg1', 'arg2');
  * </code>
  *
  * @package WordPress
  * @subpackage Plugin
  * @since 0.71
  * @global array $wp_filter Stores all of the filters
  * @global array $merged_filters Merges the filter hooks using this function.
  * @global array $wp_current_filter stores the list of current filters with the current one last
  *
  * @param string $tag The name of the filter hook.
  * @param mixed $value The value on which the filters hooked to <tt>$tag</tt> are applied on.
  * @param mixed $var,... Additional variables passed to the functions hooked to <tt>$tag</tt>.
  * @return mixed The filtered value after all hooked functions are applied to it.
  */
 function apply_filters($tag, $value) {
         global $wp_filter, $merged_filters, $wp_current_filter;
 
         $args = array();
 
         // Do 'all' actions first
         if ( isset($wp_filter['all']) ) {
                 $wp_current_filter[] = $tag;
                 $args = func_get_args();
                 _wp_call_all_hook($args);
         }
 
         if ( !isset($wp_filter[$tag]) ) {
                 if ( isset($wp_filter['all']) )
                         array_pop($wp_current_filter);
                 return $value;
         }
 
         if ( !isset($wp_filter['all']) )
                 $wp_current_filter[] = $tag;
 
         // Sort
         if ( !isset( $merged_filters[ $tag ] ) ) {
                 ksort($wp_filter[$tag]);
                 $merged_filters[ $tag ] = true;
         }
 
         reset( $wp_filter[ $tag ] );
 
         if ( empty($args) )
                 $args = func_get_args();
 
         do {
                 foreach( (array) current($wp_filter[$tag]) as $the_ )
                         if ( !is_null($the_['function']) ){
                                 $args[1] = $value;
                                 $value = call_user_func_array($the_['function'], array_slice($args, 1, (int) $the_['accepted_args']));
                         }
 
         } while ( next($wp_filter[$tag]) !== false );
 
         array_pop( $wp_current_filter );
 
         return $value;
 }
 

 /*!
  * Breaks a string into chunks by splitting at whitespace characters.
  * The length of each returned chunk is as close to the specified length goal as possible,
  * with the caveat that each chunk includes its trailing delimiter.
  * Chunks longer than the goal are guaranteed to not have any inner whitespace.
  *
  * Joining the returned chunks with empty delimiters reconstructs the input string losslessly.
  *
  * Input string must have no null characters (or eventual transformations on output chunks must not care about null characters)
  *
  * <code>
  * _split_str_by_whitespace( "1234 67890 1234 67890a cd 1234   890 123456789 1234567890a    45678   1 3 5 7 90 ", 10 ) ==
  * array (
  *   0 => '1234 67890 ',  // 11 characters: Perfect split
  *   1 => '1234 ',        //  5 characters: '1234 67890a' was too long
  *   2 => '67890a cd ',   // 10 characters: '67890a cd 1234' was too long
  *   3 => '1234   890 ',  // 11 characters: Perfect split
  *   4 => '123456789 ',   // 10 characters: '123456789 1234567890a' was too long
  *   5 => '1234567890a ', // 12 characters: Too long, but no inner whitespace on which to split
  *   6 => '   45678   ',  // 11 characters: Perfect split
  *   7 => '1 3 5 7 9',    //  9 characters: End of $string
  * );
  * </code>
  *
  * @since 3.4.0
  * @access private
  *
  * @param string $string The string to split.
  * @param int $goal The desired chunk length.
  * @return array Numeric array of chunks.
  */
 function _split_str_by_whitespace( $string, $goal ) {
         $chunks = array();
 
         $string_nullspace = strtr( $string, "\r\n\t\v\f ", "\000\000\000\000\000\000" );
 
         while ( $goal < strlen( $string_nullspace ) ) {
                 $pos = strrpos( substr( $string_nullspace, 0, $goal + 1 ), "\000" );
 
                 if ( false === $pos ) {
                         $pos = strpos( $string_nullspace, "\000", $goal + 1 );
                         if ( false === $pos ) {
                                 break;
                         }
                 }
 
                 $chunks[] = substr( $string, 0, $pos + 1 );
                 $string = substr( $string, $pos + 1 );
                 $string_nullspace = substr( $string_nullspace, $pos + 1 );
         }
 
         if ( $string ) {
                 $chunks[] = $string;
         }
 
         return $chunks;
 }
 

 /*!
  * Normalize EOL characters and strip duplicate whitespace.
  *
  * @since 2.7.0
  *
  * @param string $str The string to normalize.
  * @return string The normalized string.
  */
 function normalize_whitespace( $str ) {
         $str  = trim( $str );
         $str  = str_replace( "\r", "\n", $str );
         $str  = preg_replace( array( '/\n+/', '/[ \t]+/' ), array( "\n", ' ' ), $str );
         return $str;
 }
 


 /*!
  * Properly strip all HTML tags including script and style
  *
  * @since 2.9.0
  *
  * @param string $string String containing HTML tags
  * @param bool $remove_breaks optional Whether to remove left over line breaks and white space chars
  * @return string The processed string.
  */
 function wp_strip_all_tags($string, $remove_breaks = false) {
         $string = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', $string );
         $string = strip_tags($string);
 
         if ( $remove_breaks )
                 $string = preg_replace('/[\r\n\t ]+/', ' ', $string);
 
         return trim( $string );
 }
 















































































 /*!
  * WordPress implementation of PHP sprintf() with filters.
  *
  * @since 2.5.0
  * @link http://www.php.net/sprintf
  *
  * @param string $pattern The string which formatted args are inserted.
  * @param mixed $args,... Arguments to be formatted into the $pattern string.
  * @return string The formatted string.
  */
 function wp_sprintf( $pattern ) {
         $args = func_get_args();
         $len = strlen($pattern);
         $start = 0;
         $result = '';
         $arg_index = 0;
         while ( $len > $start ) {
                 // Last character: append and break
                 if ( strlen($pattern) - 1 == $start ) {
                         $result .= substr($pattern, -1);
                         break;
                 }
 
                 // Literal %: append and continue
                 if ( substr($pattern, $start, 2) == '%%' ) {
                         $start += 2;
                         $result .= '%';
                         continue;
                 }
 
                 // Get fragment before next %
                 $end = strpos($pattern, '%', $start + 1);
                 if ( false === $end )
                         $end = $len;
                 $fragment = substr($pattern, $start, $end - $start);
 
                 // Fragment has a specifier
                 if ( $pattern[$start] == '%' ) {
                         // Find numbered arguments or take the next one in order
                         if ( preg_match('/^%(\d+)\$/', $fragment, $matches) ) {
                                 $arg = isset($args[$matches[1]]) ? $args[$matches[1]] : '';
                                 $fragment = str_replace("%{$matches[1]}$", '%', $fragment);
                         } else {
                                 ++$arg_index;
                                 $arg = isset($args[$arg_index]) ? $args[$arg_index] : '';
                         }
 
                         // Apply filters OR sprintf
                         $_fragment = apply_filters( 'wp_sprintf', $fragment, $arg );
                         if ( $_fragment != $fragment )
                                 $fragment = $_fragment;
                         else
                                 $fragment = sprintf($fragment, strval($arg) );
                 }
 
                 // Append to result and move to next fragment
                 $result .= $fragment;
                 $start = $end;
         }
         return $result;
 }
 

















 // OTHER STUFF

/*!
 * Don't auto-p wrap shortcodes that stand alone
 *
 * Ensures that shortcodes are not wrapped in <<p>>...<</p>>.
 *
 * @since 2.9.0
 *
 * @param string $pee The content.
 * @return string The filtered content.
 */
function shortcode_unautop( $pee ) {
        global $shortcode_tags;

        if ( empty( $shortcode_tags ) || !is_array( $shortcode_tags ) ) {
                return $pee;
        }

        $tagregexp = join( '|', array_map( 'preg_quote', array_keys( $shortcode_tags ) ) );

        $pattern =
                  '/'
                . '<p>'                              // Opening paragraph
                . '\\s*+'                            // Optional leading whitespace
                . '('                                // 1: The shortcode
                .     '\\['                          // Opening bracket
                .     "($tagregexp)"                 // 2: Shortcode name
                .     '(?![\\w-])'                   // Not followed by word character or hyphen
                                                     // Unroll the loop: Inside the opening shortcode tag
                .     '[^\\]\\/]*'                   // Not a closing bracket or forward slash
                .     '(?:'
                .         '\\/(?!\\])'               // A forward slash not followed by a closing bracket
                .         '[^\\]\\/]*'               // Not a closing bracket or forward slash
                .     ')*?'
                .     '(?:'
                .         '\\/\\]'                   // Self closing tag and closing bracket
                .     '|'
                .         '\\]'                      // Closing bracket
                .         '(?:'                      // Unroll the loop: Optionally, anything between the opening and closing shortcode tags
                .             '[^\\[]*+'             // Not an opening bracket
                .             '(?:'
                .                 '\\[(?!\\/\\2\\])' // An opening bracket not followed by the closing shortcode tag
                .                 '[^\\[]*+'         // Not an opening bracket
                .             ')*+'
                .             '\\[\\/\\2\\]'         // Closing shortcode tag
                .         ')?'
                .     ')'
                . ')'
                . '\\s*+'                            // optional trailing whitespace
                . '<\\/p>'                           // closing paragraph
                . '/s';

        return preg_replace( $pattern, '$1', $pee );
}




/*!
 * Checks to see if a string is utf8 encoded.
 *
 * NOTE: This function checks for 5-Byte sequences, UTF8
 *       has Bytes Sequences with a maximum length of 4.
 *
 * @author bmorel at ssi dot fr (modified)
 * @since 1.2.1
 *
 * @param string $str The string to be checked
 * @return bool True if $str fits a UTF-8 model, false otherwise.
 */
function seems_utf8($str) {
        $length = strlen($str);
        for ($i=0; $i < $length; $i++) {
                $c = ord($str[$i]);
                if ($c < 0x80) $n = 0; # 0bbbbbbb
                elseif (($c & 0xE0) == 0xC0) $n=1; # 110bbbbb
                elseif (($c & 0xF0) == 0xE0) $n=2; # 1110bbbb
                elseif (($c & 0xF8) == 0xF0) $n=3; # 11110bbb
                elseif (($c & 0xFC) == 0xF8) $n=4; # 111110bb
                elseif (($c & 0xFE) == 0xFC) $n=5; # 1111110b
                else return false; # Does not match any model
                for ($j=0; $j<$n; $j++) { # n bytes matching 10bbbbbb follow ?
                        if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80))
                                return false;
                }
        }
        return true;
}


/*!
 * Converts a number of special characters into their HTML entities.
 *
 * Specifically deals with: &, <, >, ", and '.
 *
 * $quote_style can be set to ENT_COMPAT to encode " to
 * &quot;, or ENT_QUOTES to do both. Default is ENT_NOQUOTES where no quotes are encoded.
 *
 * @since 1.2.2
 * @access private
 *
 * @param string $string The text which is to be encoded.
 * @param mixed $quote_style Optional. Converts double quotes if set to ENT_COMPAT, both single and double if set to ENT_QUOTES or none if set to ENT_NOQUOTES. Also compatible with old values; converting single quotes if set to 'single', double if set to 'double' or both if otherwise set. Default is ENT_NOQUOTES.
 * @param string $charset Optional. The character encoding of the string. Default is false.
 * @param boolean $double_encode Optional. Whether to encode existing html entities. Default is false.
 * @return string The encoded text with HTML entities.
 */
function _wp_specialchars( $string, $quote_style = ENT_NOQUOTES, $charset = false, $double_encode = false ) {
        $string = (string) $string;

        if ( 0 === strlen( $string ) )
                return '';

        // Don't bother if there are no specialchars - saves some processing
        if ( ! preg_match( '/[&<>"\']/', $string ) )
                return $string;

        // Account for the previous behavior of the function when the $quote_style is not an accepted value
        if ( empty( $quote_style ) )
                $quote_style = ENT_NOQUOTES;
        elseif ( ! in_array( $quote_style, array( 0, 2, 3, 'single', 'double' ), true ) )
                $quote_style = ENT_QUOTES;

        // Store the site charset as a static to avoid multiple calls to wp_load_alloptions()
        if ( ! $charset ) {
                static $_charset;
                if ( ! isset( $_charset ) ) {
                        $alloptions = wp_load_alloptions();
                        $_charset = isset( $alloptions['blog_charset'] ) ? $alloptions['blog_charset'] : '';
                }
                $charset = $_charset;
        }

        if ( in_array( $charset, array( 'utf8', 'utf-8', 'UTF8' ) ) )
                $charset = 'UTF-8';

        $_quote_style = $quote_style;

        if ( $quote_style === 'double' ) {
                $quote_style = ENT_COMPAT;
                $_quote_style = ENT_COMPAT;
        } elseif ( $quote_style === 'single' ) {
                $quote_style = ENT_NOQUOTES;
        }

        // Handle double encoding ourselves
        if ( $double_encode ) {
                $string = @htmlspecialchars( $string, $quote_style, $charset );
        } else {
                // Decode &amp; into &
                $string = wp_specialchars_decode( $string, $_quote_style );

                // Guarantee every &entity; is valid or re-encode the &
                $string = wp_kses_normalize_entities( $string );

                // Now re-encode everything except &entity;
                $string = preg_split( '/(&#?x?[0-9a-z]+;)/i', $string, -1, PREG_SPLIT_DELIM_CAPTURE );

                for ( $i = 0; $i < count( $string ); $i += 2 )
                        $string[$i] = @htmlspecialchars( $string[$i], $quote_style, $charset );

                $string = implode( '', $string );
        }

        // Backwards compatibility
        if ( 'single' === $_quote_style )
                $string = str_replace( "'", '&#039;', $string );

        return $string;
}


/*!
 * Converts a number of HTML entities into their special characters.
 *
 * Specifically deals with: &, <, >, ", and '.
 *
 * $quote_style can be set to ENT_COMPAT to decode " entities,
 * or ENT_QUOTES to do both " and '. Default is ENT_NOQUOTES where no quotes are decoded.
 *
 * @since 2.8.0
 *
 * @param string $string The text which is to be decoded.
 * @param mixed $quote_style Optional. Converts double quotes if set to ENT_COMPAT, both single and double if set to ENT_QUOTES or none if set to ENT_NOQUOTES. Also compatible with old _wp_specialchars() values; converting single quotes if set to 'single', double if set to 'double' or both if otherwise set. Default is ENT_NOQUOTES.
 * @return string The decoded text without HTML entities.
 */
function wp_specialchars_decode( $string, $quote_style = ENT_NOQUOTES ) {
        $string = (string) $string;

        if ( 0 === strlen( $string ) ) {
                return '';
        }

        // Don't bother if there are no entities - saves a lot of processing
        if ( strpos( $string, '&' ) === false ) {
                return $string;
        }

        // Match the previous behavior of _wp_specialchars() when the $quote_style is not an accepted value
        if ( empty( $quote_style ) ) {
                $quote_style = ENT_NOQUOTES;
        } elseif ( !in_array( $quote_style, array( 0, 2, 3, 'single', 'double' ), true ) ) {
                $quote_style = ENT_QUOTES;
        }

        // More complete than get_html_translation_table( HTML_SPECIALCHARS )
        $single = array( '&#039;'  => '\'', '&#x27;' => '\'' );
        $single_preg = array( '/&#0*39;/'  => '&#039;', '/&#x0*27;/i' => '&#x27;' );
        $double = array( '&quot;' => '"', '&#034;'  => '"', '&#x22;' => '"' );
        $double_preg = array( '/&#0*34;/'  => '&#034;', '/&#x0*22;/i' => '&#x22;' );
        $others = array( '&lt;'   => '<', '&#060;'  => '<', '&gt;'   => '>', '&#062;'  => '>', '&amp;'  => '&', '&#038;'  => '&', '&#x26;' => '&' );
        $others_preg = array( '/&#0*60;/'  => '&#060;', '/&#0*62;/'  => '&#062;', '/&#0*38;/'  => '&#038;', '/&#x0*26;/i' => '&#x26;' );

        if ( $quote_style === ENT_QUOTES ) {
                $translation = array_merge( $single, $double, $others );
                $translation_preg = array_merge( $single_preg, $double_preg, $others_preg );
        } elseif ( $quote_style === ENT_COMPAT || $quote_style === 'double' ) {
                $translation = array_merge( $double, $others );
                $translation_preg = array_merge( $double_preg, $others_preg );
        } elseif ( $quote_style === 'single' ) {
                $translation = array_merge( $single, $others );
                $translation_preg = array_merge( $single_preg, $others_preg );
        } elseif ( $quote_style === ENT_NOQUOTES ) {
                $translation = $others;
                $translation_preg = $others_preg;
        }

        // Remove zero padding on numeric entities
        $string = preg_replace( array_keys( $translation_preg ), array_values( $translation_preg ), $string );

        // Replace characters according to translation table
        return strtr( $string, $translation );
}



/*!
 * Checks for invalid UTF8 in a string.
 *
 * @since 2.8.0
 *
 * @param string $string The text which is to be checked.
 * @param boolean $strip Optional. Whether to attempt to strip out invalid UTF8. Default is false.
 * @return string The checked text.
 */
function wp_check_invalid_utf8( $string, $strip = false ) {
        $string = (string) $string;

        if ( 0 === strlen( $string ) ) {
                return '';
        }

        // Store the site charset as a static to avoid multiple calls to get_option()
        static $is_utf8;
        if ( !isset( $is_utf8 ) ) {
                $is_utf8 = in_array( get_option( 'blog_charset' ), array( 'utf8', 'utf-8', 'UTF8', 'UTF-8' ) );
        }
        if ( !$is_utf8 ) {
                return $string;
        }

        // Check for support for utf8 in the installed PCRE library once and store the result in a static
        static $utf8_pcre;
        if ( !isset( $utf8_pcre ) ) {
                $utf8_pcre = @preg_match( '/^./u', 'a' );
        }
        // We can't demand utf8 in the PCRE installation, so just return the string in those cases
        if ( !$utf8_pcre ) {
                return $string;
        }

        // preg_match fails when it encounters invalid UTF8 in $string
        if ( 1 === @preg_match( '/^./us', $string ) ) {
                return $string;
        }

        // Attempt to strip the bad chars if requested (not recommended)
        if ( $strip && function_exists( 'iconv' ) ) {
                return iconv( 'utf-8', 'utf-8', $string );
        }

        return '';
}



/*!
 * Encode the Unicode values to be used in the URI.
 *
 * @since 1.5.0
 *
 * @param string $utf8_string
 * @param int $length Max length of the string
 * @return string String with Unicode encoded for URI.
 */
function utf8_uri_encode( $utf8_string, $length = 0 ) {
        $unicode = '';
        $values = array();
        $num_octets = 1;
        $unicode_length = 0;

        $string_length = strlen( $utf8_string );
        for ($i = 0; $i < $string_length; $i++ ) {

                $value = ord( $utf8_string[ $i ] );

                if ( $value < 128 ) {
                        if ( $length && ( $unicode_length >= $length ) )
                                break;
                        $unicode .= chr($value);
                        $unicode_length++;
                } else {
                        if ( count( $values ) == 0 ) $num_octets = ( $value < 224 ) ? 2 : 3;

                        $values[] = $value;

                        if ( $length && ( $unicode_length + ($num_octets * 3) ) > $length )
                                break;
                        if ( count( $values ) == $num_octets ) {
                                if ($num_octets == 3) {
                                        $unicode .= '%' . dechex($values[0]) . '%' . dechex($values[1]) . '%' . dechex($values[2]);
                                        $unicode_length += 9;
                                } else {
                                        $unicode .= '%' . dechex($values[0]) . '%' . dechex($values[1]);
                                        $unicode_length += 6;
                                }

                                $values = array();
                                $num_octets = 1;
                        }
                }
        }

        return $unicode;
}



/*!
 * Converts all accent characters to ASCII characters.
 *
 * If there are no accent characters, then the string given is just returned.
 *
 * @since 1.2.1
 *
 * @param string $string Text that might have accent characters
 * @return string Filtered string with replaced "nice" characters.
 */
function remove_accents($string) {
        if ( !preg_match('/[\x80-\xff]/', $string) )
                return $string;

        if (seems_utf8($string)) {
                $chars = array(
                // Decompositions for Latin-1 Supplement
                chr(194).chr(170) => 'a', chr(194).chr(186) => 'o',
                chr(195).chr(128) => 'A', chr(195).chr(129) => 'A',
                chr(195).chr(130) => 'A', chr(195).chr(131) => 'A',
                chr(195).chr(132) => 'A', chr(195).chr(133) => 'A',
                chr(195).chr(134) => 'AE',chr(195).chr(135) => 'C',
                chr(195).chr(136) => 'E', chr(195).chr(137) => 'E',
                chr(195).chr(138) => 'E', chr(195).chr(139) => 'E',
                chr(195).chr(140) => 'I', chr(195).chr(141) => 'I',
                chr(195).chr(142) => 'I', chr(195).chr(143) => 'I',
                chr(195).chr(144) => 'D', chr(195).chr(145) => 'N',
                chr(195).chr(146) => 'O', chr(195).chr(147) => 'O',
                chr(195).chr(148) => 'O', chr(195).chr(149) => 'O',
                chr(195).chr(150) => 'O', chr(195).chr(153) => 'U',
                chr(195).chr(154) => 'U', chr(195).chr(155) => 'U',
                chr(195).chr(156) => 'U', chr(195).chr(157) => 'Y',
                chr(195).chr(158) => 'TH',chr(195).chr(159) => 's',
                chr(195).chr(160) => 'a', chr(195).chr(161) => 'a',
                chr(195).chr(162) => 'a', chr(195).chr(163) => 'a',
                chr(195).chr(164) => 'a', chr(195).chr(165) => 'a',
                chr(195).chr(166) => 'ae',chr(195).chr(167) => 'c',
                chr(195).chr(168) => 'e', chr(195).chr(169) => 'e',
                chr(195).chr(170) => 'e', chr(195).chr(171) => 'e',
                chr(195).chr(172) => 'i', chr(195).chr(173) => 'i',
                chr(195).chr(174) => 'i', chr(195).chr(175) => 'i',
                chr(195).chr(176) => 'd', chr(195).chr(177) => 'n',
                chr(195).chr(178) => 'o', chr(195).chr(179) => 'o',
                chr(195).chr(180) => 'o', chr(195).chr(181) => 'o',
                chr(195).chr(182) => 'o', chr(195).chr(184) => 'o',
                chr(195).chr(185) => 'u', chr(195).chr(186) => 'u',
                chr(195).chr(187) => 'u', chr(195).chr(188) => 'u',
                chr(195).chr(189) => 'y', chr(195).chr(190) => 'th',
                chr(195).chr(191) => 'y', chr(195).chr(152) => 'O',
                // Decompositions for Latin Extended-A
                chr(196).chr(128) => 'A', chr(196).chr(129) => 'a',
                chr(196).chr(130) => 'A', chr(196).chr(131) => 'a',
                chr(196).chr(132) => 'A', chr(196).chr(133) => 'a',
                chr(196).chr(134) => 'C', chr(196).chr(135) => 'c',
                chr(196).chr(136) => 'C', chr(196).chr(137) => 'c',
                chr(196).chr(138) => 'C', chr(196).chr(139) => 'c',
                chr(196).chr(140) => 'C', chr(196).chr(141) => 'c',
                chr(196).chr(142) => 'D', chr(196).chr(143) => 'd',
                chr(196).chr(144) => 'D', chr(196).chr(145) => 'd',
                chr(196).chr(146) => 'E', chr(196).chr(147) => 'e',
                chr(196).chr(148) => 'E', chr(196).chr(149) => 'e',
                chr(196).chr(150) => 'E', chr(196).chr(151) => 'e',
                chr(196).chr(152) => 'E', chr(196).chr(153) => 'e',
                chr(196).chr(154) => 'E', chr(196).chr(155) => 'e',
                chr(196).chr(156) => 'G', chr(196).chr(157) => 'g',
                chr(196).chr(158) => 'G', chr(196).chr(159) => 'g',
                chr(196).chr(160) => 'G', chr(196).chr(161) => 'g',
                chr(196).chr(162) => 'G', chr(196).chr(163) => 'g',
                chr(196).chr(164) => 'H', chr(196).chr(165) => 'h',
                chr(196).chr(166) => 'H', chr(196).chr(167) => 'h',
                chr(196).chr(168) => 'I', chr(196).chr(169) => 'i',
                chr(196).chr(170) => 'I', chr(196).chr(171) => 'i',
                chr(196).chr(172) => 'I', chr(196).chr(173) => 'i',
                chr(196).chr(174) => 'I', chr(196).chr(175) => 'i',
                chr(196).chr(176) => 'I', chr(196).chr(177) => 'i',
                chr(196).chr(178) => 'IJ',chr(196).chr(179) => 'ij',
                chr(196).chr(180) => 'J', chr(196).chr(181) => 'j',
                chr(196).chr(182) => 'K', chr(196).chr(183) => 'k',
                chr(196).chr(184) => 'k', chr(196).chr(185) => 'L',
                chr(196).chr(186) => 'l', chr(196).chr(187) => 'L',
                chr(196).chr(188) => 'l', chr(196).chr(189) => 'L',
                chr(196).chr(190) => 'l', chr(196).chr(191) => 'L',
                chr(197).chr(128) => 'l', chr(197).chr(129) => 'L',
                chr(197).chr(130) => 'l', chr(197).chr(131) => 'N',
                chr(197).chr(132) => 'n', chr(197).chr(133) => 'N',
                chr(197).chr(134) => 'n', chr(197).chr(135) => 'N',
                chr(197).chr(136) => 'n', chr(197).chr(137) => 'N',
                chr(197).chr(138) => 'n', chr(197).chr(139) => 'N',
                chr(197).chr(140) => 'O', chr(197).chr(141) => 'o',
                chr(197).chr(142) => 'O', chr(197).chr(143) => 'o',
                chr(197).chr(144) => 'O', chr(197).chr(145) => 'o',
                chr(197).chr(146) => 'OE',chr(197).chr(147) => 'oe',
                chr(197).chr(148) => 'R',chr(197).chr(149) => 'r',
                chr(197).chr(150) => 'R',chr(197).chr(151) => 'r',
                chr(197).chr(152) => 'R',chr(197).chr(153) => 'r',
                chr(197).chr(154) => 'S',chr(197).chr(155) => 's',
                chr(197).chr(156) => 'S',chr(197).chr(157) => 's',
                chr(197).chr(158) => 'S',chr(197).chr(159) => 's',
                chr(197).chr(160) => 'S', chr(197).chr(161) => 's',
                chr(197).chr(162) => 'T', chr(197).chr(163) => 't',
                chr(197).chr(164) => 'T', chr(197).chr(165) => 't',
                chr(197).chr(166) => 'T', chr(197).chr(167) => 't',
                chr(197).chr(168) => 'U', chr(197).chr(169) => 'u',
                chr(197).chr(170) => 'U', chr(197).chr(171) => 'u',
                chr(197).chr(172) => 'U', chr(197).chr(173) => 'u',
                chr(197).chr(174) => 'U', chr(197).chr(175) => 'u',
                chr(197).chr(176) => 'U', chr(197).chr(177) => 'u',
                chr(197).chr(178) => 'U', chr(197).chr(179) => 'u',
                chr(197).chr(180) => 'W', chr(197).chr(181) => 'w',
                chr(197).chr(182) => 'Y', chr(197).chr(183) => 'y',
                chr(197).chr(184) => 'Y', chr(197).chr(185) => 'Z',
                chr(197).chr(186) => 'z', chr(197).chr(187) => 'Z',
                chr(197).chr(188) => 'z', chr(197).chr(189) => 'Z',
                chr(197).chr(190) => 'z', chr(197).chr(191) => 's',
                // Decompositions for Latin Extended-B
                chr(200).chr(152) => 'S', chr(200).chr(153) => 's',
                chr(200).chr(154) => 'T', chr(200).chr(155) => 't',
                // Euro Sign
                chr(226).chr(130).chr(172) => 'E',
                // GBP (Pound) Sign
                chr(194).chr(163) => '',
                // Vowels with diacritic (Vietnamese)
                // unmarked
                chr(198).chr(160) => 'O', chr(198).chr(161) => 'o',
                chr(198).chr(175) => 'U', chr(198).chr(176) => 'u',
                // grave accent
                chr(225).chr(186).chr(166) => 'A', chr(225).chr(186).chr(167) => 'a',
                chr(225).chr(186).chr(176) => 'A', chr(225).chr(186).chr(177) => 'a',
                chr(225).chr(187).chr(128) => 'E', chr(225).chr(187).chr(129) => 'e',
                chr(225).chr(187).chr(146) => 'O', chr(225).chr(187).chr(147) => 'o',
                chr(225).chr(187).chr(156) => 'O', chr(225).chr(187).chr(157) => 'o',
                chr(225).chr(187).chr(170) => 'U', chr(225).chr(187).chr(171) => 'u',
                chr(225).chr(187).chr(178) => 'Y', chr(225).chr(187).chr(179) => 'y',
                // hook
                chr(225).chr(186).chr(162) => 'A', chr(225).chr(186).chr(163) => 'a',
                chr(225).chr(186).chr(168) => 'A', chr(225).chr(186).chr(169) => 'a',
                chr(225).chr(186).chr(178) => 'A', chr(225).chr(186).chr(179) => 'a',
                chr(225).chr(186).chr(186) => 'E', chr(225).chr(186).chr(187) => 'e',
                chr(225).chr(187).chr(130) => 'E', chr(225).chr(187).chr(131) => 'e',
                chr(225).chr(187).chr(136) => 'I', chr(225).chr(187).chr(137) => 'i',
                chr(225).chr(187).chr(142) => 'O', chr(225).chr(187).chr(143) => 'o',
                chr(225).chr(187).chr(148) => 'O', chr(225).chr(187).chr(149) => 'o',
                chr(225).chr(187).chr(158) => 'O', chr(225).chr(187).chr(159) => 'o',
                chr(225).chr(187).chr(166) => 'U', chr(225).chr(187).chr(167) => 'u',
                chr(225).chr(187).chr(172) => 'U', chr(225).chr(187).chr(173) => 'u',
                chr(225).chr(187).chr(182) => 'Y', chr(225).chr(187).chr(183) => 'y',
                // tilde
                chr(225).chr(186).chr(170) => 'A', chr(225).chr(186).chr(171) => 'a',
                chr(225).chr(186).chr(180) => 'A', chr(225).chr(186).chr(181) => 'a',
                chr(225).chr(186).chr(188) => 'E', chr(225).chr(186).chr(189) => 'e',
                chr(225).chr(187).chr(132) => 'E', chr(225).chr(187).chr(133) => 'e',
                chr(225).chr(187).chr(150) => 'O', chr(225).chr(187).chr(151) => 'o',
                chr(225).chr(187).chr(160) => 'O', chr(225).chr(187).chr(161) => 'o',
                chr(225).chr(187).chr(174) => 'U', chr(225).chr(187).chr(175) => 'u',
                chr(225).chr(187).chr(184) => 'Y', chr(225).chr(187).chr(185) => 'y',
                // acute accent
                chr(225).chr(186).chr(164) => 'A', chr(225).chr(186).chr(165) => 'a',
                chr(225).chr(186).chr(174) => 'A', chr(225).chr(186).chr(175) => 'a',
                chr(225).chr(186).chr(190) => 'E', chr(225).chr(186).chr(191) => 'e',
                chr(225).chr(187).chr(144) => 'O', chr(225).chr(187).chr(145) => 'o',
                chr(225).chr(187).chr(154) => 'O', chr(225).chr(187).chr(155) => 'o',
                chr(225).chr(187).chr(168) => 'U', chr(225).chr(187).chr(169) => 'u',
                // dot below
                chr(225).chr(186).chr(160) => 'A', chr(225).chr(186).chr(161) => 'a',
                chr(225).chr(186).chr(172) => 'A', chr(225).chr(186).chr(173) => 'a',
                chr(225).chr(186).chr(182) => 'A', chr(225).chr(186).chr(183) => 'a',
                chr(225).chr(186).chr(184) => 'E', chr(225).chr(186).chr(185) => 'e',
                chr(225).chr(187).chr(134) => 'E', chr(225).chr(187).chr(135) => 'e',
                chr(225).chr(187).chr(138) => 'I', chr(225).chr(187).chr(139) => 'i',
                chr(225).chr(187).chr(140) => 'O', chr(225).chr(187).chr(141) => 'o',
                chr(225).chr(187).chr(152) => 'O', chr(225).chr(187).chr(153) => 'o',
                chr(225).chr(187).chr(162) => 'O', chr(225).chr(187).chr(163) => 'o',
                chr(225).chr(187).chr(164) => 'U', chr(225).chr(187).chr(165) => 'u',
                chr(225).chr(187).chr(176) => 'U', chr(225).chr(187).chr(177) => 'u',
                chr(225).chr(187).chr(180) => 'Y', chr(225).chr(187).chr(181) => 'y',
                // Vowels with diacritic (Chinese, Hanyu Pinyin)
                chr(201).chr(145) => 'a',
                // macron
                chr(199).chr(149) => 'U', chr(199).chr(150) => 'u',
                // acute accent
                chr(199).chr(151) => 'U', chr(199).chr(152) => 'u',
                // caron
                chr(199).chr(141) => 'A', chr(199).chr(142) => 'a',
                chr(199).chr(143) => 'I', chr(199).chr(144) => 'i',
                chr(199).chr(145) => 'O', chr(199).chr(146) => 'o',
                chr(199).chr(147) => 'U', chr(199).chr(148) => 'u',
                chr(199).chr(153) => 'U', chr(199).chr(154) => 'u',
                // grave accent
                chr(199).chr(155) => 'U', chr(199).chr(156) => 'u',
                );

                // Used for locale-specific rules
                $locale = get_locale();

                if ( 'de_DE' == $locale ) {
                        $chars[ chr(195).chr(132) ] = 'Ae';
                        $chars[ chr(195).chr(164) ] = 'ae';
                        $chars[ chr(195).chr(150) ] = 'Oe';
                        $chars[ chr(195).chr(182) ] = 'oe';
                        $chars[ chr(195).chr(156) ] = 'Ue';
                        $chars[ chr(195).chr(188) ] = 'ue';
                        $chars[ chr(195).chr(159) ] = 'ss';
                }

                $string = strtr($string, $chars);
        } else {
                // Assume ISO-8859-1 if not UTF-8
                $chars['in'] = chr(128).chr(131).chr(138).chr(142).chr(154).chr(158)
                        .chr(159).chr(162).chr(165).chr(181).chr(192).chr(193).chr(194)
                        .chr(195).chr(196).chr(197).chr(199).chr(200).chr(201).chr(202)
                        .chr(203).chr(204).chr(205).chr(206).chr(207).chr(209).chr(210)
                        .chr(211).chr(212).chr(213).chr(214).chr(216).chr(217).chr(218)
                        .chr(219).chr(220).chr(221).chr(224).chr(225).chr(226).chr(227)
                        .chr(228).chr(229).chr(231).chr(232).chr(233).chr(234).chr(235)
                        .chr(236).chr(237).chr(238).chr(239).chr(241).chr(242).chr(243)
                        .chr(244).chr(245).chr(246).chr(248).chr(249).chr(250).chr(251)
                        .chr(252).chr(253).chr(255);

                $chars['out'] = "EfSZszYcYuAAAAAACEEEEIIIINOOOOOOUUUUYaaaaaaceeeeiiiinoooooouuuuyy";

                $string = strtr($string, $chars['in'], $chars['out']);
                $double_chars['in'] = array(chr(140), chr(156), chr(198), chr(208), chr(222), chr(223), chr(230), chr(240), chr(254));
                $double_chars['out'] = array('OE', 'oe', 'AE', 'DH', 'TH', 'ss', 'ae', 'dh', 'th');
                $string = str_replace($double_chars['in'], $double_chars['out'], $string);
        }

        return $string;
}



/*!
 * Sanitizes a username, stripping out unsafe characters.
 *
 * Removes tags, octets, entities, and if strict is enabled, will only keep
 * alphanumeric, _, space, ., -, @. After sanitizing, it passes the username,
 * raw username (the username in the parameter), and the value of $strict as
 * parameters for the 'sanitize_user' filter.
 *
 * @since 2.0.0
 * @uses apply_filters() Calls 'sanitize_user' hook on username, raw username,
 *              and $strict parameter.
 *
 * @param string $username The username to be sanitized.
 * @param bool $strict If set limits $username to specific characters. Default false.
 * @return string The sanitized username, after passing through filters.
 */
function sanitize_user( $username, $strict = false ) {
        $raw_username = $username;
        $username = wp_strip_all_tags( $username );
        $username = remove_accents( $username );
        // Kill octets
        $username = preg_replace( '|%([a-fA-F0-9][a-fA-F0-9])|', '', $username );
        $username = preg_replace( '/&.+?;/', '', $username ); // Kill entities

        // If strict, reduce to ASCII for max portability.
        if ( $strict )
                $username = preg_replace( '|[^a-z0-9 _.\-@]|i', '', $username );

        $username = trim( $username );
        // Consolidate contiguous whitespace
        $username = preg_replace( '|\s+|', ' ', $username );

        return apply_filters( 'sanitize_user', $username, $raw_username, $strict );
}



/*!
 * Sanitizes a string key.
 *
 * Keys are used as internal identifiers. Lowercase alphanumeric characters, dashes and underscores are allowed.
 *
 * @since 3.0.0
 *
 * @param string $key String key
 * @return string Sanitized key
 */
function sanitize_key( $key ) {
        $raw_key = $key;
        $key = strtolower( $key );
        $key = preg_replace( '/[^a-z0-9_\-]/', '', $key );
        return apply_filters( 'sanitize_key', $key, $raw_key );
}



/*!
 * Sanitizes a title, or returns a fallback title.
 *
 * Specifically, HTML and PHP tags are stripped. Further actions can be added
 * via the plugin API. If $title is empty and $fallback_title is set, the latter
 * will be used.
 *
 * @since 1.0.0
 *
 * @param string $title The string to be sanitized.
 * @param string $fallback_title Optional. A title to use if $title is empty.
 * @param string $context Optional. The operation for which the string is sanitized
 * @return string The sanitized string.
 */
function sanitize_title( $title, $fallback_title = '', $context = 'save' ) {
        $raw_title = $title;

        if ( 'save' == $context )
                $title = remove_accents($title);

        $title = apply_filters('sanitize_title', $title, $raw_title, $context);

        if ( '' === $title || false === $title )
                $title = $fallback_title;

        return $title;
}

/*!
 * Sanitizes a title, replacing whitespace and a few other characters with dashes.
 *
 * Limits the output to alphanumeric characters, underscore (_) and dash (-).
 * Whitespace becomes a dash.
 *
 * @since 1.2.0
 *
 * @param string $title The title to be sanitized.
 * @param string $raw_title Optional. Not used.
 * @param string $context Optional. The operation for which the string is sanitized.
 * @return string The sanitized title.
 */
function sanitize_title_with_dashes( $title, $raw_title = '', $context = 'display' ) {
        $title = strip_tags($title);
        // Preserve escaped octets.
        $title = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $title);
        // Remove percent signs that are not part of an octet.
        $title = str_replace('%', '', $title);
        // Restore octets.
         $title = preg_replace('|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $title);
 
         if (seems_utf8($title)) {
                 if (function_exists('mb_strtolower')) {
                         $title = mb_strtolower($title, 'UTF-8');
                 }
                 $title = utf8_uri_encode($title, 200);
         }
 
         $title = strtolower($title);
         $title = preg_replace('/&.+?;/', '', $title); // kill entities
         $title = str_replace('.', '-', $title);
 
         if ( 'save' == $context ) {
                 // Convert nbsp, ndash and mdash to hyphens
                 $title = str_replace( array( '%c2%a0', '%e2%80%93', '%e2%80%94' ), '-', $title );
 
                 // Strip these characters entirely
                 $title = str_replace( array(
                         // iexcl and iquest
                         '%c2%a1', '%c2%bf',
                         // angle quotes
                         '%c2%ab', '%c2%bb', '%e2%80%b9', '%e2%80%ba',
                         // curly quotes
                         '%e2%80%98', '%e2%80%99', '%e2%80%9c', '%e2%80%9d',
                         '%e2%80%9a', '%e2%80%9b', '%e2%80%9e', '%e2%80%9f',
                         // copy, reg, deg, hellip and trade
                         '%c2%a9', '%c2%ae', '%c2%b0', '%e2%80%a6', '%e2%84%a2',
                         // acute accents
                         '%c2%b4', '%cb%8a', '%cc%81', '%cd%81',
                         // grave accent, macron, caron
                         '%cc%80', '%cc%84', '%cc%8c',
                 ), '', $title );
 
                 // Convert times to x
                 $title = str_replace( '%c3%97', 'x', $title );
         }
 
         $title = preg_replace('/[^%a-z0-9 _-]/', '', $title);
         $title = preg_replace('/\s+/', '-', $title);
         $title = preg_replace('|-+|', '-', $title);
         $title = trim($title, '-');
 
         return $title;
 }
 

 /*!
  * Converts a number of characters from a string.
  *
  * Metadata tags <<title>> and <<category>> are removed, <<br>> and <<hr>> are
  * converted into correct XHTML and Unicode characters are converted to the
  * valid range.
  *
  * @since 0.71
  *
  * @param string $content String of characters to be converted.
  * @param string $deprecated Not used.
  * @return string Converted string.
  */
 function convert_chars($content, $deprecated = '') {
         if ( !empty( $deprecated ) )
                 _deprecated_argument( __FUNCTION__, '0.71' );
 
         // Translation of invalid Unicode references range to valid range
         $wp_htmltranswinuni = array(
         '&#128;' => '&#8364;', // the Euro sign
         '&#129;' => '',
         '&#130;' => '&#8218;', // these are Windows CP1252 specific characters
         '&#131;' => '&#402;',  // they would look weird on non-Windows browsers
         '&#132;' => '&#8222;',
         '&#133;' => '&#8230;',
         '&#134;' => '&#8224;',
         '&#135;' => '&#8225;',
         '&#136;' => '&#710;',
         '&#137;' => '&#8240;',
         '&#138;' => '&#352;',
         '&#139;' => '&#8249;',
         '&#140;' => '&#338;',
         '&#141;' => '',
         '&#142;' => '&#381;',
         '&#143;' => '',
         '&#144;' => '',
         '&#145;' => '&#8216;',
         '&#146;' => '&#8217;',
         '&#147;' => '&#8220;',
         '&#148;' => '&#8221;',
         '&#149;' => '&#8226;',
         '&#150;' => '&#8211;',
         '&#151;' => '&#8212;',
         '&#152;' => '&#732;',
         '&#153;' => '&#8482;',
         '&#154;' => '&#353;',
         '&#155;' => '&#8250;',
         '&#156;' => '&#339;',
         '&#157;' => '',
         '&#158;' => '&#382;',
         '&#159;' => '&#376;'
         );
 
         // Remove metadata tags
         $content = preg_replace('/<title>(.+?)<\/title>/','',$content);
         $content = preg_replace('/<category>(.+?)<\/category>/','',$content);
 
         // Converts lone & characters into &#38; (a.k.a. &amp;)
         $content = preg_replace('/&([^#])(?![a-z1-4]{1,8};)/i', '&#038;$1', $content);
 
         // Fix Word pasting
         $content = strtr($content, $wp_htmltranswinuni);
 
         // Just a little XHTML help
         $content = str_replace('<br>', '<br />', $content);
         $content = str_replace('<hr>', '<hr />', $content);
 
         return $content;
 }
 

 /*!
  * Balances tags if forced to, or if the 'use_balanceTags' option is set to true.
  *
  * @since 0.71
  *
  * @param string $text Text to be balanced
  * @param bool $force If true, forces balancing, ignoring the value of the option. Default false.
  * @return string Balanced text
  */
 function balanceTags( $text, $force = false ) {
         if ( $force || get_option('use_balanceTags') == 1 )
                 return force_balance_tags( $text );
         else
                 return $text;
 }
 
 /*!
  * Balances tags of string using a modified stack.
  *
  * @since 2.0.4
  *
  * @author Leonard Lin <leonard@acm.org>
  * @license GPL
  * @copyright November 4, 2001
  * @version 1.1
  * @todo Make better - change loop condition to $text in 1.2
  * @internal Modified by Scott Reilly (coffee2code) 02 Aug 2004
  *              1.1  Fixed handling of append/stack pop order of end text
  *                       Added Cleaning Hooks
  *              1.0  First Version
  *
  * @param string $text Text to be balanced.
  * @return string Balanced text.
  */
 function force_balance_tags( $text ) {
         $tagstack = array();
         $stacksize = 0;
         $tagqueue = '';
         $newtext = '';
         // Known single-entity/self-closing tags
         $single_tags = array( 'area', 'base', 'basefont', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'source' );
         // Tags that can be immediately nested within themselves
         $nestable_tags = array( 'blockquote', 'div', 'object', 'q', 'span' );
 
         // WP bug fix for comments - in case you REALLY meant to type '< !--'
         $text = str_replace('< !--', '<    !--', $text);
         // WP bug fix for LOVE <3 (and other situations with '<' before a number)
         $text = preg_replace('#<([0-9]{1})#', '&lt;$1', $text);
 
         while ( preg_match("/<(\/?[\w:]*)\s*([^>]*)>/", $text, $regex) ) {
                 $newtext .= $tagqueue;
 
                 $i = strpos($text, $regex[0]);
                 $l = strlen($regex[0]);
 
                 // clear the shifter
                 $tagqueue = '';
                 // Pop or Push
                 if ( isset($regex[1][0]) && '/' == $regex[1][0] ) { // End Tag
                         $tag = strtolower(substr($regex[1],1));
                         // if too many closing tags
                         if( $stacksize <= 0 ) {
                                 $tag = '';
                                 // or close to be safe $tag = '/' . $tag;
                         }
                         // if stacktop value = tag close value then pop
                         else if ( $tagstack[$stacksize - 1] == $tag ) { // found closing tag
                                 $tag = '</' . $tag . '>'; // Close Tag
                                 // Pop
                                 array_pop( $tagstack );
                                 $stacksize--;
                         } else { // closing tag not at top, search for it
                                 for ( $j = $stacksize-1; $j >= 0; $j-- ) {
                                         if ( $tagstack[$j] == $tag ) {
                                         // add tag to tagqueue
                                                 for ( $k = $stacksize-1; $k >= $j; $k--) {
                                                         $tagqueue .= '</' . array_pop( $tagstack ) . '>';
                                                         $stacksize--;
                                                 }
                                                 break;
                                         }
                                 }
                                 $tag = '';
                         }
                 } else { // Begin Tag
                         $tag = strtolower($regex[1]);
 
                         // Tag Cleaning
 
                         // If it's an empty tag "< >", do nothing
                         if ( '' == $tag ) {
                                 // do nothing
                         }
                         // ElseIf it presents itself as a self-closing tag...
                         elseif ( substr( $regex[2], -1 ) == '/' ) {
                                 // ...but it isn't a known single-entity self-closing tag, then don't let it be treated as such and
                                 // immediately close it with a closing tag (the tag will encapsulate no text as a result)
                                 if ( ! in_array( $tag, $single_tags ) )
                                         $regex[2] = trim( substr( $regex[2], 0, -1 ) ) . "></$tag";
                         }
                         // ElseIf it's a known single-entity tag but it doesn't close itself, do so
                         elseif ( in_array($tag, $single_tags) ) {
                                 $regex[2] .= '/';
                         }
                         // Else it's not a single-entity tag
                         else {
                                 // If the top of the stack is the same as the tag we want to push, close previous tag
                                 if ( $stacksize > 0 && !in_array($tag, $nestable_tags) && $tagstack[$stacksize - 1] == $tag ) {
                                         $tagqueue = '</' . array_pop( $tagstack ) . '>';
                                         $stacksize--;
                                 }
                                 $stacksize = array_push( $tagstack, $tag );
                         }
 
                         // Attributes
                         $attributes = $regex[2];
                         if( ! empty( $attributes ) && $attributes[0] != '>' )
                                 $attributes = ' ' . $attributes;
 
                         $tag = '<' . $tag . $attributes . '>';
                         //If already queuing a close tag, then put this tag on, too
                         if ( !empty($tagqueue) ) {
                                 $tagqueue .= $tag;
                                 $tag = '';
                         }
                 }
                 $newtext .= substr($text, 0, $i) . $tag;
                 $text = substr($text, $i + $l);
         }
 
         // Clear Tag Queue
         $newtext .= $tagqueue;
 
         // Add Remaining text
         $newtext .= $text;
 
         // Empty Stack
         while( $x = array_pop($tagstack) )
                 $newtext .= '</' . $x . '>'; // Add remaining tags to close
 
         // WP fix for the bug with HTML comments
         $newtext = str_replace("< !--","<!--",$newtext);
         $newtext = str_replace("<    !--","< !--",$newtext);
 
         return $newtext;
 }


 /*!
  * Add leading zeros when necessary.
  *
  * If you set the threshold to '4' and the number is '10', then you will get
  * back '0010'. If you set the threshold to '4' and the number is '5000', then you
  * will get back '5000'.
  *
  * Uses sprintf to append the amount of zeros based on the $threshold parameter
  * and the size of the number. If the number is large enough, then no zeros will
  * be appended.
  *
  * @since 0.71
  *
  * @param mixed $number Number to append zeros to if not greater than threshold.
  * @param int $threshold Digit places number needs to be to not have zeros added.
  * @return string Adds leading zeros to number if needed.
  */
 function zeroise($number, $threshold) {
         return sprintf('%0'.$threshold.'s', $number);
 }


 /*!
  * Adds backslashes before letters and before a number at the start of a string.
  *
  * @since 0.71
  *
  * @param string $string Value to which backslashes will be added.
  * @return string String with backslashes inserted.
  */
 function backslashit($string) {
         if ( isset( $string[0] ) && $string[0] >= '0' && $string[0] <= '9' )
                 $string = '\\\\' . $string;
         return addcslashes( $string, 'A..Za..z' );
 }
 

 /*!
  * Converts email addresses characters to HTML entities to block spam bots.
  *
  * @since 0.71
  *
  * @param string $emailaddy Email address.
  * @param int $mailto Optional. Range from 0 to 1. Used for encoding.
  * @return string Converted email address.
  */
 function antispambot($emailaddy, $mailto=0) {
         $emailNOSPAMaddy = '';
         srand ((float) microtime() * 1000000);
         for ($i = 0; $i < strlen($emailaddy); $i = $i + 1) {
                 $j = floor(rand(0, 1+$mailto));
                 if ($j==0) {
                         $emailNOSPAMaddy .= '&#'.ord(substr($emailaddy,$i,1)).';';
                 } elseif ($j==1) {
                         $emailNOSPAMaddy .= substr($emailaddy,$i,1);
                 } elseif ($j==2) {
                         $emailNOSPAMaddy .= '%'.zeroise(dechex(ord(substr($emailaddy, $i, 1))), 2);
                 }
         }
         $emailNOSPAMaddy = str_replace('@','&#64;',$emailNOSPAMaddy);
         return $emailNOSPAMaddy;
 }
 


 /*!
  * Convert plaintext URI to HTML links.
  *
  * Converts URI, www and ftp, and email addresses. Finishes by fixing links
  * within links.
  *
  * @since 0.71
  *
  * @param string $text Content to convert URIs.
  * @return string Content with converted URIs.
  */
 function make_clickable( $text ) {
         $r = '';
         $textarr = preg_split( '/(<[^<>]+>)/', $text, -1, PREG_SPLIT_DELIM_CAPTURE ); // split out HTML tags
         foreach ( $textarr as $piece ) {
                 if ( empty( $piece ) || ( $piece[0] == '<' && ! preg_match('|^<\s*[\w]{1,20}+://|', $piece) ) ) {
                         $r .= $piece;
                         continue;
                 }
 
                 // Long strings might contain expensive edge cases ...
                 if ( 10000 < strlen( $piece ) ) {
                         // ... break it up
                         foreach ( _split_str_by_whitespace( $piece, 2100 ) as $chunk ) { // 2100: Extra room for scheme and leading and trailing paretheses
                                 if ( 2101 < strlen( $chunk ) ) {
                                         $r .= $chunk; // Too big, no whitespace: bail.
                                 } else {
                                         $r .= make_clickable( $chunk );
                                 }
                         }
                 } else {
                         $ret = " $piece "; // Pad with whitespace to simplify the regexes
 
                         $url_clickable = '~
                                 ([\\s(<.,;:!?])                                        # 1: Leading whitespace, or punctuation
                                 (                                                      # 2: URL
                                         [\\w]{1,20}+://                                # Scheme and hier-part prefix
                                         (?=\S{1,2000}\s)                               # Limit to URLs less than about 2000 characters long
                                         [\\w\\x80-\\xff#%\\~/@\\[\\]*(+=&$-]*+         # Non-punctuation URL character
                                         (?:                                            # Unroll the Loop: Only allow puctuation URL character if followed by a non-punctuation URL character
                                                 [\'.,;:!?)]                            # Punctuation URL character
                                                 [\\w\\x80-\\xff#%\\~/@\\[\\]*(+=&$-]++ # Non-punctuation URL character
                                         )*
                                 )
                                 (\)?)                                                  # 3: Trailing closing parenthesis (for parethesis balancing post processing)
                         ~xS'; // The regex is a non-anchored pattern and does not have a single fixed starting character.
                               // Tell PCRE to spend more time optimizing since, when used on a page load, it will probably be used several times.
 
                         $ret = preg_replace_callback( $url_clickable, '_make_url_clickable_cb', $ret );
 
                         $ret = preg_replace_callback( '#([\s>])((www|ftp)\.[\w\\x80-\\xff\#$%&~/.\-;:=,?@\[\]+]+)#is', '_make_web_ftp_clickable_cb', $ret );
                         $ret = preg_replace_callback( '#([\s>])([.0-9a-z_+-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,})#i', '_make_email_clickable_cb', $ret );
 
                         $ret = substr( $ret, 1, -1 ); // Remove our whitespace padding.
                         $r .= $ret;
                 }
         }
 
         // Cleanup of accidental links within links
         $r = preg_replace( '#(<a( [^>]+?>|>))<a [^>]+?>([^>]+?)</a></a>#i', "$1$3</a>", $r );
         return $r;
 }
 

