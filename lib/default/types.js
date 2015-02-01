'use strict';

var util = require('../util.js');

module.exports = {
    /**
     * Validate a value is a String type.
     *
     * @returns {Function}
     */
    string: function () {
        return util.is.String;
    },

    /**
     * Validate a value is a Number type.
     *
     * @returns {Function}
     */
    number: function () {
        return util.is.Number;
    },

    /**
     * Validate a value is a Boolean type.
     *
     * @returns {Function}
     */
    boolean: function () {
        return util.is.Boolean;
    },

    /**
     * Validate a value is a Date type.
     *
     * @returns {Function}
     */
    date: function () {
        return util.is.Date;
    },

    /**
     * Validate a value is a RegExp type.
     *
     * @returns {Function}
     */
    regExp: function () {
        return util.is.RegExp;
    },
    
    /**
     * Validate a value is a Error type.
     *
     * @returns {Function}
     */
    error: function () {
        return util.is.Error;
    },

    /**
     * Validate a value is a Function type.
     *
     * @returns {Function}
     */
    function: function () {
        return util.is.Function;
    },
    
    /**
     * Validate a value is a Function type.
     *
     * @returns {Function}
     */
    'arguments': function () {
        return util.is.Arguments;
    },

    /**
     * Validate a value is an Object type and that it's properties pass given tests.
     *
     * @returns {Function}
     */
    object: function (/**Tests to be applied to each property*/) {
        var tests = {};
        var arg;
        
        // If this is a "not." test then we do not run the field validators.
        if (this.isNegated && 0 !== arguments.length) {
            throw new Error('Prove-It: not.Object can not accept arguments.');
        }

        for (var i = 0; i < arguments.length; i += 1) {
            arg = arguments[i];

            for (var key in arg) {
                /* istanbul ignore else */
                if (arg.hasOwnProperty(key)) {
                    if (null != arg[key] && null != arg[key].test) {
                        tests[key] = tests[key] || [];
                        tests[key].push(arg[key]);
                    } else {
                        throw new Error('Prove-It: Non test provided at ' + key);
                    }
                }
            }
        }

        return function (val) {
            var isObject = util.is.Object(val);
            var test;
            var key;
            var cur;
            
            if (isObject && !util.is.Empty(tests)) {
                for (key in tests) {
                    /* istanbul ignore else */
                    if (tests.hasOwnProperty(key)) {
                        cur = val[key];

                        for (var i = 0; i < tests[key].length; i += 1) {
                            test = tests[key][i];
                            this.merge(test.test(cur), key);
                        }
                    }
                }

                for (key in val) {
                    /* istanbul ignore else */
                    if (val.hasOwnProperty(key)) {
                        cur = val[key];

                        if (null == tests[key]) {
                            this.append({
                                type: 'extraField',
                                value: cur
                            }, key);
                        }
                    }
                }
            }

            return isObject;
        };
    },

    /**
     * Validate a value is a Array type and that it's children pass given tests.
     *
     * @returns {Function}
     */
    array: function (/**Tests to be applied to each array element*/) {
        var tests = [];

        // If this is a "not." test then we do not run the element validators.
        if (this.isNegated && 0 !== arguments.length) {
            throw new Error('Prove-It: not.Array can not accept arguments.');
        }
        
        for (var i = 0; i < arguments.length; i += 1) {
            if (null != arguments[i].test) {
                tests.push(arguments[i]);
            } else {
                throw new Error('Prove-It: Non test provided to array validator');
            }
        }

        return function (val) {
            var isArray = util.is.Array(val);
            var test;
            var cur;

            if (isArray && !util.is.Empty(tests)) {
                for (var i = 0; i < val.length; i += 1) {
                    cur = val[i];

                    for (var j = 0; j < tests.length; j += 1) {
                        test = tests[j];
                        this.merge(test.test(cur), i);
                    }
                }
            }

            return isArray;
        };
    }
};