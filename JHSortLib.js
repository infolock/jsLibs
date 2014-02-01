(function() {
    'use strict';
    var $scope = this,

    // Following _'s lead...
    JHSortLib = function( obj ) {
        if( obj instanceof JHSortLib ) {
            return obj;
        }

        if( !( this instanceof JHSortLib ) ) {
            return new JHSortLib( obj );
        }

        this.sortLib = obj;
    };

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = JHSortLib;
        }
        exports.JHSortLib = JHSortLib;
    } else {
        $scope.JHSortLib = JHSortLib;
    }

    JHSortLib.heapSort = {
        _siftDown: function( heap, i, max ) {
            var c1 = 0, 
            c2 = 0, 
            i_big = 0, 
            ref = [];

            while( i < max ) {
                i_big = i;
                c1 = 2 * i + 1;
                c2 = c1 + 1;

                if( c1 < max && heap[c1] > heap[i_big] ) {
                    i_big = c1;
                }
                if( c2 < max && heap[c2] > heap[i_big] ) {
                    i_big = c2;
                }
          
                if( i_big === i ) {
                    return;
                }

                ref = [heap[i_big], heap[i]];

                heap[i] = ref[0];
                heap[i_big] = ref[1];

                i = i_big;
            }
        },

        _sort: function( arr ) {
            var that = this,
            n = 0,
            i = 0,
            results = [];

            if( !_.isArray( arr ) || _.isEmpty( arr ) ) {
                return arr;
            }

            n = arr.length;
            i = Math.floor( ( n / 2 ) - 1 );

            do {
                that._siftDown( arr, i, n );

                results.push( i );
            } while( i-- );

            return results;
        },

        applyTo: function( arr ) {
            var that = this,
            results = [],
            n = 0,
            k = 0;

            arr = arr || [];
            if( !_.isArray( arr ) ) {
                return arr;
            }

            n = arr.length - 1;

            that._sort( arr );

            do {
                k = arr[0];
                arr[0] = arr[n];
                arr[n] = k;

                that._siftDown( arr, 0, n );

                results.push( n );

            } while( n-- );

            return results;
        }
    };

    JHSortLib.selectionSort = function( arr ) {
        var temp = null,
        n = 0,
        j = 0, 
        k = 0, 
        i = 0;

        for( i = 0; i < n; i++ ) {
            k = i;

            for( j = i + 1; j < n; j++ ) {
                if( arr[j] < arr[k] ) {
                    k = j;
                }
            }

            temp = arr[i];
            arr[i] = arr[k];
            arr[k] = temp;
        }

        return arr;
    };

    JHSortLib.mergeSort = {
        _merge: function( left, right, arr ) {
            var a = 0;

            while( left.length && right.length ) {
                arr[a++] = right[0] < left[0] ? right.shift(): left.shift();
            }

            while( left.length ) {
                arr[a++] = left.shift();
            }

            while( right.length) {
                arr[a++] = right.shift();
            }
        },

        _sort: function( arr, tmp, l ){
            var m = null,
            tmp_l = null,
            tmp_r = null;

            if( l === 1 ) {
                return;
            }

            m = Math.floor( l/2 );
            tmp_l = tmp.slice( 0, m );
            tmp_r = tmp.slice( m );

            this._sort( tmp_l, arr.slice( 0, m ), m );
            this._sort( tmp_r, arr.slice( m ), l-m );

            this._merge( tmp_l, tmp_r, arr );
        },

        applyTo: function( arr ){
            this._sort( arr, arr.slice(), arr.length );
        }
    };

    JHSortLib.insertionSort = function( arr ) {
        var n = arr.length, i, j, subj;

        for( i = 0; i < n; i++ ) {
            subj = arr[i];
            j = i;
        
            for( j = i; j > 0 && subj < arr[j-1]; j-- ) {
                arr[j] = arr[j - 1];
            }

            arr[j] = subj;
        }

        return arr;
    };

    JHSortLib.bingoSort = function( a ) {
        var i = 0,
        n = 0,
        j = 0,
        iMin = 0,
        oTemp = 0;

        for( i, iMin, j = 0, n = a.length, oTemp; j < n - 1; j++ ) {
            iMin = j;

            for( i = j + 1; i < n; i++ ) {
                if( a[i] < a[iMin] ) {
                    iMin = i;
                }
            }

            if( iMin !== j ) {
                oTemp = a[iMin];
                a[iMin] = a[j];
                a[j] = oTemp;
            }
        }
    };

    JHSortLib.pancakeSort = function( arr ) {
        var n = arr.length, i, max_idx, max,j,new_slice;

        for( i = n-1; i > 0; i-- ) {
            max_idx = 0;
            max = arr[0];

            for( j = 1; j <= i; j++ ) {
                if( arr[j] > max ) {
                    max = arr[j];
                    max_idx = j;
                }
            }

            if( max_idx === i ) {
                continue;
            }

            if( max_idx > 0 ) {
                new_slice = arr.slice( 0, max_idx+1 ).reverse();
                for( j = 0; j <= max_idx; j++ ) {
                    arr[j] = new_slice[j];
                }
            }

            new_slice = arr.slice( 0, i+1 ).reverse();
            for( j = 0; j <= i; j++ ) {
                arr[j] = new_slice[j];
            }
        }
        return arr;
    };

    JHSortLib.quickSort = {
        array: null,
        _swap: function( i, j ) { 
            var that = this,
            t = that.array[i] || []; 

            that.array[i] = that.array[j] || []; 
            that.array[j] = t;
        },

        _divide: function( v, start, end ) {
            var that = this,
            first_big = start,
            j = start;

            while( j <= end ) {
                if( that.array[j] < v ) {
                    that._swap( first_big, j );
                    first_big += 1;
                }

                j += 1;
            }

            return first_big;
        },

        _partition: function( start, end ) {
            var that = this,
            v = that.array[end],
            first_big = that.divide( v, start, end - 1 );

            that._swap( first_big, end );

            return first_big;
        },

        _sort: function( start, end ) {
            var that = this,
            m = 0;

            if( start >= end ) {
                return;
            }

            m = that.partition( start, end );
            that._sort( start, m - 1 );

            return that._sort( m + 1, end );
        },

        applyTo: function( a ) {
            var that = this;

            that.array = a || [];
            return that._sort( 0, a.length - 1 );
        }
    };

    JHSortLib.quickSort_v2 = $.extend( {}, JHSortLib.quickSort, {
        _sort: function( left, right ) {
            var that = this,
            pivot = 0,
            left_new = null,
            right_new = null;

            that.array = that.array || [];

            if( left < right ) {
                pivot = that.array[( left + right ) >> 1];
                left_new = left;
                right_new = right;

                do {
                    while( that.array[left_new] < pivot ) {
                        left_new++;
                    }

                    while( pivot < that.array[right_new] ) {
                        right_new--;
                    }

                    if( left_new  <= right_new ) {
                        that._swap( left_new++, right_new-- );
                    }
                } while( left_new  <= right_new );

                that._sort( left, right_new );
                that._sort( left_new, right );
            }
        },

        applyTo: function( array ) {
            var that = this;

            that.array = array;
            that._sort( 0, that.array.length - 1 );

            return that.array;
        }
    });

    // Via http://jsperf.com/yet-another-quicksort-right/3
    JHSortLib.quickSort_v3 = {
        _swap: function( array, indexA, indexB ) {
            var temp = array[indexA];

            array[indexA] = array[indexB];
            array[indexB] = temp;
        },

        _partition: function( array, pivot, left, right ) {
            var that = this,
            storeIndex = left, pivotValue = array[pivot],
            v = 0,
            temp = null;

            that._swap( array, pivot, right );

            for( v = left; v < right; v++ ) {
                if( array[v] < pivotValue ) {
                    temp = array[v];
                    array[v] = array[storeIndex];
                    array[storeIndex] = temp;
                    storeIndex++;
                }
            }

            temp = array[right];
            array[right] = array[storeIndex];
            array[storeIndex] = temp;

            return storeIndex;
        },

        _sort: function( array, left, right ) {
            var that = this,
            pivot = 0,
            newPivot = 0;

            if( ( right - left ) === 2 ) {
                if( array[left] > array[right] ) {
                    pivot = array[right];
                    array[right] = array[left];
                    array[left] = pivot;
                }

                return;
            }

            if( left < right ) {
                pivot = left + ( ( right - left ) >> 1 );
                newPivot = that.partition( array, pivot, left, right );

                that._sort( array, left, newPivot - 1 );
                that._sort( array, newPivot + 1, right );
            }
        },

        applyTo: function( array ) {
            this._sort( array, 0, array.length - 1 );
        }
    };

    Array.prototype.quickSort_v4 = function() {
        var pivot = 0;

        if( this.length <= 1 ) {
            return this;
        }

         pivot = this[Math.round( this.length / 2 )];

        return this.filter( function( x ) {
            return x <  pivot;
        }).quickSort_v3().concat( this.filter( function( x ) {
            return x === pivot;
        })).concat( this.filter( function( x ) {
            return x >  pivot;
        }).quickSort_v3());
    };

    if ( typeof define === 'function' && define.amd ) {
        define( 'JHSortLib', [], function() {
            return JHSortLib;
        });
    }
}.call( this ));
