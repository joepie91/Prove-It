'use strict';

var util = require('../util.js');

module.exports = {
    /**
     * Validate a value is a String type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    String: function () {
        return util.is.String;
    },

    /**
     * Validate a value is a Number type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Number: function () {
        return util.is.Number;
    },

    /**
     * Validate a value is a Boolean type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Boolean: function () {
        return util.is.Boolean;
    },

    /**
     * Validate a value is a Date type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Date: function () {
        return util.is.Date;
    },

    /**
     * Validate a value is a RegExp type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    RegExp: function () {
        return util.is.RegExp;
    },

    /**
     * Validate a value is a Function type.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Function: function () {
        return util.is.Function;
    },

    /**
     * Validate a value is an Object type and that it's properties pass given tests.
     *
     * @returns {{validator: validator, msg: string}}
     */
    Object: function (/**Tests to be applied to each property*/) {
        var tests = {};
        var arg;

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
     * @returns {{validator: validator, msg: string}}
     */
    Array: function (/**Tests to be applied to each array element*/) {
        var tests = [];

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