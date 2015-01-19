'use strict';
var type = require('../type.js');

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
                    this._merge(test.test(val));
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
                    this._merge(test.test(val));
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
            return type.is.Number(val) && max >= (val.toString().split('.')[1] || '').length;
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
    lt: function (max) {
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
    lte: function (max) {
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
    gt: function (min) {
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
    gte: function (min) {
        return function (val) {
            return val >= min;
        };
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