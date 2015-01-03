'use strict';

var util = require('../util.js');

module.exports = {
    /**
     * Validate a value is a String type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    String: function () {
        return {
            validator: util.is.String,
            msg: '{PATH} should be a string'
        };
    },

    /**
     * Validate a value is a Number type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Number: function () {
        return {
            validator: util.is.Number,
            msg: '{PATH} should be a number'
        };
    },

    /**
     * Validate a value is a Boolean type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Boolean: function () {
        return {
            validator: util.is.Boolean,
            msg: '{PATH} should be a boolean'
        };
    },

    /**
     * Validate a value is a Date type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Date: function () {
        return {
            validator: util.is.Date,
            msg: '{PATH} should be a date'
        };
    },

    /**
     * Validate a value is a RegExp type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    RegExp: function () {
        return {
            validator: util.is.RegExp,
            msg: '{PATH} should be a regexp'
        };
    },

    /**
     * Validate a value is a Function type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Function: function () {
        return {
            validator: util.is.Function,
            msg: '{PATH} should be a function'
        };
    },

    /**
     * Validate a value is an Object type and that it's properties pass given tests.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Object: function (/**Tests to be applied to each property*/) {
        var tests = {};
        var regTests = [];
        var regSearch = '';
        var arg;

        for (var i = 0; i < arguments.length; i += 1) {
            arg = arguments[i];

            for (var key in arg) {
                /* istanbul ignore else */
                if (arg.hasOwnProperty(key)) {
                    if (null != arg[key] && null != arg[key].test) {
                        if ('/' === key[0] && '/' === key[key.length - 1]) {
                            regTests.push(arg[key]);
                            regSearch += '(' + key.slice(1, key.length - 1) + ')?';
                        } else {
                            tests[key] = tests[key] || [];
                            tests[key].push(arg[key]);
                        }
                    } else {
                        throw new Error('Prove-It: Non test provided at ' + key);
                    }
                }
            }
        }

        regSearch = new RegExp(regSearch);

        return {
            validator: function (val) {
                var isObject = util.is.Object(val);
                var test;
                var key;
                var cur;

                if (isObject && (!util.isEmpty(tests) || 0 !== regTests.length)) {
                    for (key in tests) {
                        /* istanbul ignore else */
                        if (tests.hasOwnProperty(key)) {
                            cur = val[key];

                            for (var i = 0; i < tests[key].length; i += 1) {
                                test = tests[key][i];
                                this.append({
                                    path: key,
                                    msg: test.test(cur),
                                    val: cur
                                });
                            }
                        }
                    }

                    for (key in val) {
                        /* istanbul ignore else */
                        if (val.hasOwnProperty(key)) {
                            cur = val[key];
                            test = regTests[key.match(regSearch).lastIndexOf(key) - 1];

                            if (null != test) {
                                this.append({
                                    path: key,
                                    msg: test.test(cur),
                                    val: cur
                                });
                            } else if (null == tests[key]) {
                                this.append({
                                    path: key,
                                    msg: '{PATH} is not an allowed field',
                                    val: cur
                                });
                            }
                        }
                    }
                }

                return isObject;
            },
            msg: '{PATH} should be an object'
        };
    },

    /**
     * Validate a value is a Array type and that it's children pass given tests.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Array: function (/**Tests to be applied to each array element*/) {
        var tests = [];

        var arg;

        for (var i = 0; i < arguments.length; i += 1) {
            arg = arguments[i];

            if (null != arg.test) {
                tests.push(arg);
            } else {
                throw new Error('Prove-It: Non test provided to array validator');
            }
        }

        return {
            validator: function (val) {
                var isArray = util.is.Array(val);
                var test;
                var cur;

                if (isArray && !util.isEmpty(tests)) {
                    for (var i = 0; i < val.length; i += 1) {
                        cur = val[i];

                        for (var j = 0; j < tests.length; j += 1) {
                            test = tests[j];
                            this.append({
                                path: i,
                                msg: test.test(cur),
                                val: cur
                            });
                        }
                    }
                }

                return isArray;
            },
            msg: '{PATH} should be an array'
        };
    }
};