'use strict';

var types = require('./types.js');
var listString = function (list, or) {
    list = [].slice.call(list);

    if (0 === list.length) {
        return 'nothing';
    } else if (1 === list.length) {
        return list[0];
    } else {
        return list.slice(0, list.length - 1) + (null == or ? ' and ' : ' or ') + list.slice(list.length - 1);
    }
};

module.exports = {
    /**
     * A validator that always fails and returns the given error string.
     *
     * #param msg the message for the error.
     */
    error: function (msg) {
        return {
            validator: function () {
                return false;
            },
            msg: msg || ''
        };
    },

    /**
     * Runs a function(s) that will be given the value to test and must return a prove instance to run.
     *
     * @returns {{validator: Function, msg: string}}
     */
    eval: function (/** Functions that return tests */) {
        var tests = arguments;

        return {
            validator: function (val) {
                var test;
                var result;

                for (var i = 0; i < tests.length; i += 1) {
                    test = tests[i](val);

                    if (null != test && null != test.test) {
                        test._config.path = (null == test._config.path || '' === test._config.path) ?
                            this.path :
                            test._config.path;

                        result = test.test(val);

                        if (true !== result) {
                            this.append({
                                msg: result,
                                val: val
                            });
                        }
                    }
                }

                return true;
            },
            msg: '{PATH} could not run a test'
        };
    },

    /**
     * Validates that a value passes on of the given prove tests.
     *
     * @returns {{validator: Function, msg: string}}
     */
    'try': function (/** Prove instances */) {
        var tests = arguments;

        return {
            validator: function (val) {
                var i;
                var test;
                var result;

                for (i = 0; i < tests.length; i += 1) {
                    test = tests[i];

                    if (null != test && null != test.test && true === test.test(val)) {
                        return true;
                    }
                }

                for (i = 0; i < tests.length; i += 1) {
                    test = tests[i];

                    if (null != test && null != test.test) {
                        this.append({
                            msg: test.test(val),
                            val: val
                        });
                    }
                }

                return true;
            },
            msg: '{PATH} could not run a test'
        };
    },
    
    /**
     * Validate that a value equals at least one of the given values.
     *
     * @returns {{validator: validator, msg: string}}
     */
    equals: function (/** Allowed values */) {
        var allowed = arguments;

        return {
            validator: function (val) {
                for (var i = 0; i < allowed.length; i += 1) {
                    if (allowed[i] === val) {
                        return true;
                    }
                }

                return false;
            },
            msg: '{PATH} should equal ' + listString(allowed, true)
        };
    },

    /**
     * Validate that a value is an integer.
     *
     * @returns {{validator: Function, msg: string}}
     */
    integer: function () {
        return {
            validator: function (val) {
                return 0 === val % 1;
            },
            msg: '{PATH} should be an integer'
        };
    },

    /**
     * Validate that a value is an integer (should also check for number type).
     *
     * @param max the maximum precision.
     *
     * @returns {{validator: Function, msg: string}}
     */
    precision: function (max) {
        return {
            validator: function (val) {
                return 'number' === typeof val && max >= (val.toString().split('.')[1] || '').length;
            },
            msg: '{PATH} should have ' + max + ' decimal places'
        };
    },

    /**
     * Validate that a value is divisible by another.
     *
     * @param divisor the value to divide the input by.
     *
     * @returns {{validator: Function, msg: string}}
     */
    divisibleBy: function (divisor) {
        return {
            validator: function (val) {
                return 0 === val % divisor;
            },
            msg: '{PATH} should be divisible by ' + divisor
        };
    },

    /**
     * Validate a value is less than a max.
     *
     * @param max the maximum value the validator will approve (exclusive)
     *
     * @returns {{validator: validator, msg: string}}
     */
    lt: function (max) {
        return {
            validator: function (val) {
                return val < max;
            },
            msg: '{PATH} should be less than ' + max
        };
    },

    /**
     * Validate a value is less than or equal too a max.
     *
     * @param max the maximum value the validator will approve (inclusive)
     *
     * @returns {{validator: validator, msg: string}}
     */
    lte: function (max) {
        return {
            validator: function (val) {
                return val <= max;
            },
            msg: '{PATH} should be less than or equal to ' + max
        };
    },

    /**
     * Validate a value is greater than a min.
     *
     * @param min the minimum value the validator will approve (exclusive)
     *
     * @returns {{validator: validator, msg: string}}
     */
    gt: function (min) {
        return {
            validator: function (val) {
                return val > min;
            },
            msg: '{PATH} should be greater than ' + min
        };
    },

    /**
     * Validate a value is greater than or equal too a min.
     *
     * @param min the minimum value the validator will approve (inclusive)
     *
     * @returns {{validator: validator, msg: string}}
     */
    gte: function (min) {
        return {
            validator: function (val) {
                return val >= min;
            },
            msg: '{PATH} should be greater than or equal to ' + min
        };
    },

    /**
     * Validate that the length of a value is between @min and (optional) @max.
     *
     * @param min the minimum length.
     * @param max the maximum length.
     *
     * @returns {{validator: Function, msg: string}}
     */
    length: function (min, max) {
        min = min || 0;

        return {
            validator: function (val) {
                return min <= val.length && (null == max || max >= val.length);
            },
            msg: (null == max) ?
            '{PATH} should have a length of at least ' + min :
            '{PATH} should have a length within ' + min + ' and ' + max
        };
    },

    /**
     * Validate that a string|array starts with specific value.
     *
     * @param find the the input the value should start with.
     *
     * @returns {{validator: Function, msg: string}}
     */
    startsWith: function (find) {
        return {
            validator: function (val) {
                return 0 === val.indexOf(find);
            },
            msg: '{PATH} should start with ' + find
        };
    },

    /**
     * Validate that a string|array ends with specific value.
     *
     * @param find the the input the value should end with.
     *
     * @returns {{validator: Function, msg: string}}
     */
    endsWith: function (find) {
        return {
            validator: function (val) {
                var end = (null != find && null != find.length) ? val.length - find.length : val.length - 1;

                if (0 > end) {
                    end = 0;
                }

                return end === val.indexOf(find);
            },
            msg: '{PATH} should end with ' + find
        };
    },

    /**
     * Validate that a string|array contains with specific value.
     *
     * @returns {{validator: Function, msg: string}}
     */
    contains: function (/** Values String|Array must contain */) {
        var mustContain = arguments;

        return {
            validator: function (val) {
                if (0 === mustContain.length && null != val) {
                    return false;
                }

                for (var i = 0; i < mustContain.length; i += 1) {
                    if (0 > val.indexOf(mustContain[i])) {
                        return false;
                    }
                }

                return true;
            },
            msg: '{PATH} should contain ' + listString(mustContain)
        };
    },

    /**
     * Validate that a string matches a regular expression.
     *
     * @param regExp the regex to test a string against.
     *
     * @returns {{validator: Function, msg: string}}
     */
    matches: function (regExp) {
        return {
            validator: RegExp.prototype.test.bind(regExp),
            msg: '{PATH} should match ' + regExp
        };
    },

    /**
     * Validate that a string is lowercase.
     *
     * @returns {{validator: Function, msg: string}}
     */
    lowerCase: function () {
        return {
            validator: function (val) {
                return val.toLowerCase() === val;
            },
            msg: '{PATH} should be lower case'
        };
    },

    /**
     * Validate that a string is upperCase.
     *
     * @returns {{validator: Function, msg: string}}
     */
    upperCase: function () {
        return {
            validator: function (val) {
                return val.toUpperCase() === val;
            },
            msg: '{PATH} should be upper case'
        };
    },
    
    /**
     * Validate that a value can be parsed into JSON.
     * 
     * @returns {{validator: Function, msg: string}}
     */
    JSON: function () {
        return {
            validator: function (val) {
                try {
                    JSON.parse(val);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            msg: '{PATH} should be JSON'
        };
    }
};