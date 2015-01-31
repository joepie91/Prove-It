'use strict';
var util = require('../util.js');

module.exports = {
    /**
     * Runs a function(s) that will be given the value to test and must return a prove instance to run.
     *
     * @returns {Function}
     */
    eval: function (/** Functions that return tests */) {
        var tests = arguments;

        return function (val) {
            var test;
            
            for (var i = 0; i < tests.length; i += 1) {
                test = tests[i](val);

                if (null != test && null != test.test) {
                    this.merge(test.test(val));
                }
            }

            return true;
        };
    },

    /**
     * Validates that a value passes on of the given prove tests.
     *
     * @returns {Function}
     */
    'try': function (/** Prove instances */) {
        var tests = arguments;

        return function (val) {
            var i;
            var test;

            for (i = 0; i < tests.length; i += 1) {
                test = tests[i];

                if (null != test && null != test.test && true === test.test(val)) {
                    return true;
                }
            }

            for (i = 0; i < tests.length; i += 1) {
                test = tests[i];

                if (null != test && null != test.test) {
                    this.merge(test.test(val));
                }
            }

            return true;
        };
    },
    
    /**
     * Validate that a value equals at least one of the given values.
     *
     * @returns {Function}
     */
    equals: function (/** Allowed values */) {
        var allowed = arguments;

        return function (val) {
            for (var i = 0; i < allowed.length; i += 1) {
                if (allowed[i] === val) {
                    return true;
                }
            }

            return false;
        };
    },

    /**
     * Validate that a value is an integer.
     *
     * @returns {Function}
     */
    integer: function () {
        return function (val) {
            return 0 === val % 1;
        };
    },

    /**
     * Validate that a value is an integer (should also check for number type).
     *
     * @param max the maximum precision.
     *
     * @returns {Function}
     */
    precision: function (max) {
        return function (val) {
            return util.is.Number(val) && max >= (val.toString().split('.')[1] || '').length;
        };
    },

    /**
     * Validate that a value is divisible by another.
     *
     * @param divisor the value to divide the input by.
     *
     * @returns {Function}
     */
    divisibleBy: function (divisor) {
        return function (val) {
            return 0 === val % divisor;
        };
    },

    /**
     * Validate a value is less than a max.
     *
     * @param max the maximum value the validator will approve (exclusive)
     *
     * @returns {Function}
     */
    lessThan: function (max) {
        return function (val) {
            return val < max;
        };
    },

    /**
     * Validate a value is less than or equal too a max.
     *
     * @param max the maximum value the validator will approve (inclusive)
     *
     * @returns {Function}
     */
    lessThanOrEquals: function (max) {
        return function (val) {
            return val <= max;
        };
    },

    /**
     * Validate a value is greater than a min.
     *
     * @param min the minimum value the validator will approve (exclusive)
     *
     * @returns {Function}
     */
    greaterThan: function (min) {
        return function (val) {
            return val > min;
        };
    },

    /**
     * Validate a value is greater than or equal too a min.
     *
     * @param min the minimum value the validator will approve (inclusive)
     *
     * @returns {Function}
     */
    greaterThanOrEquals: function (min) {
        return function (val) {
            return val >= min;
        };
    },
    
    /**
     * Validate that a value is empty. (No empty objects, null or undefined).
     *
     * @returns {Function}
     */
    empty: function () {
        return util.is.Empty;
    },

    /**
     * Validate that the length of a value is between @min and (optional) @max.
     *
     * @param min the minimum length.
     * @param max the maximum length.
     *
     * @returns {Function}
     */
    length: function (min, max) {
        min = min || 0;

        return function (val) {
            return min <= val.length && (null == max || max >= val.length);
        };
    },
    
    /**
     * Validate that an input contains unique values.
     *
     * @returns {Function}
     */
    unique: function () {
        return function (val) {
            var values = [];
            
            for (var i in val) {
                /* istanbul ignore else */
                if (val.hasOwnProperty(i)) {
                    if (-1 === values.indexOf(val[i])) {
                        values.push(val[i]);
                    } else {
                        return false;
                    }
                }
            }
            
            return true;
        };
    },

    /**
     * Validate that a string|array starts with specific value.
     *
     * @param find the the input the value should start with.
     *
     * @returns {Function}
     */
    startsWith: function (find) {
        return function (val) {
            return 0 === val.indexOf(find);
        };
    },

    /**
     * Validate that a string|array ends with specific value.
     *
     * @param find the the input the value should end with.
     *
     * @returns {Function}
     */
    endsWith: function (find) {
        return function (val) {
            var end = (null != find && null != find.length) ? val.length - find.length : val.length - 1;

            if (0 > end) {
                end = 0;
            }

            return end === val.indexOf(find);
        };
    },
    
    /**
     * Validate that a value is sorted.
     *
     * @param compare a function to compare the values.
     *
     * @returns {Function}
     */
    sorted: function (compare) {
        compare = compare || function (a, b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }

            return 0;
        };
        
        return function (val) {
            for (var i = 1; i < val.length; i += 1) {
                if (0 < compare(val[i - 1], val[i])) {
                    return false;
                }
            }
            
            return true;
        };
    },

    /**
     * Validate that a string|array contains with specific value.
     *
     * @returns {Function}
     */
    contains: function (/** Values String|Array must contain */) {
        var mustContain = arguments;

        return function (val) {
            if (0 === mustContain.length) {
                return false;
            }

            for (var i = 0; i < mustContain.length; i += 1) {
                if (0 > val.indexOf(mustContain[i])) {
                    return false;
                }
            }

            return true;
        };
    },

    /**
     * Validate that a string matches a regular expression.
     *
     * @param regExp the regex to test a string against.
     *
     * @returns {Function}
     */
    matches: function (regExp) {
        return RegExp.prototype.test.bind(regExp);
    },

    /**
     * Validate that a string is lowercase.
     *
     * @returns {Function}
     */
    lowerCase: function () {
        return function (val) {
            return val.toLowerCase() === val;
        };
    },

    /**
     * Validate that a string is upperCase.
     *
     * @returns {Function}
     */
    upperCase: function () {
        return function (val) {
            return val.toUpperCase() === val;
        };
    },
    
    /**
     * Validate that a value can be parsed into JSON.
     * 
     * @returns {Function}
     */
    JSON: function () {
        return function (val) {
            try {
                JSON.parse(val);
                return true;
            } catch (err) {
                return false;
            }
        };
    }
};