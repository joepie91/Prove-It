{
  "version": 3,
  "sources": [
    "node_modules/browserify/node_modules/browser-pack/_prelude.js",
    "lib/default/common.js",
    "lib/default/regex.js",
    "lib/default/types.js",
    "lib/errorHandler.js",
    "lib/index.js",
    "lib/util.js"
  ],
  "names": [],
  "mappings": "AAAA;ACAA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AC7VA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;ACrGA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;ACzLA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AC9DA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AC3OA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA",
  "file": "generated.js",
  "sourceRoot": "",
  "sourcesContent": [
    "(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})",
    "'use strict';\nvar util = require('../util.js');\n\nmodule.exports = {\n    /**\n     * Runs a function(s) that will be given the value to test and must return a prove instance to run.\n     *\n     * @returns {Function}\n     */\n    eval: function (/** Functions that return tests */) {\n        var tests = arguments;\n\n        return function (val) {\n            var test;\n            \n            for (var i = 0; i < tests.length; i += 1) {\n                test = tests[i](val);\n\n                if (null != test && null != test.test) {\n                    this.merge(test.test(val));\n                }\n            }\n\n            return true;\n        };\n    },\n\n    /**\n     * Validates that a value passes on of the given prove tests.\n     *\n     * @returns {Function}\n     */\n    'try': function (/** Prove instances */) {\n        var tests = arguments;\n\n        return function (val) {\n            var i;\n            var test;\n\n            for (i = 0; i < tests.length; i += 1) {\n                test = tests[i];\n\n                if (null != test && null != test.test && true === test.test(val)) {\n                    return true;\n                }\n            }\n\n            for (i = 0; i < tests.length; i += 1) {\n                test = tests[i];\n\n                if (null != test && null != test.test) {\n                    this.merge(test.test(val));\n                }\n            }\n\n            return true;\n        };\n    },\n    \n    /**\n     * Validate that a value equals at least one of the given values.\n     *\n     * @returns {Function}\n     */\n    equals: function (/** Allowed values */) {\n        var allowed = arguments;\n\n        return function (val) {\n            for (var i = 0; i < allowed.length; i += 1) {\n                if (allowed[i] === val) {\n                    return true;\n                }\n            }\n\n            return false;\n        };\n    },\n\n    /**\n     * Validate that a value is an integer.\n     *\n     * @returns {Function}\n     */\n    integer: function () {\n        return function (val) {\n            return 0 === val % 1;\n        };\n    },\n\n    /**\n     * Validate that a value is an integer (should also check for number type).\n     *\n     * @param max the maximum precision.\n     *\n     * @returns {Function}\n     */\n    precision: function (max) {\n        return function (val) {\n            return util.is.Number(val) && max >= (val.toString().split('.')[1] || '').length;\n        };\n    },\n\n    /**\n     * Validate that a value is divisible by another.\n     *\n     * @param divisor the value to divide the input by.\n     *\n     * @returns {Function}\n     */\n    divisibleBy: function (divisor) {\n        return function (val) {\n            return 0 === val % divisor;\n        };\n    },\n\n    /**\n     * Validate a value is less than or equal too a max.\n     *\n     * @param max the maximum value the validator will approve (inclusive)\n     *\n     * @returns {Function}\n     */\n    min: function (max) {\n        return function (val) {\n            return val <= max;\n        };\n    },\n    \n    /**\n     * Validate a value is greater than or equal too a min.\n     *\n     * @param min the minimum value the validator will approve (inclusive)\n     *\n     * @returns {Function}\n     */\n    max: function (min) {\n        return function (val) {\n            return val >= min;\n        };\n    },\n\n    /**\n     * Validate a value is less than a max.\n     *\n     * @param max the maximum value the validator will approve (exclusive)\n     *\n     * @returns {Function}\n     */\n    less: function (max) {\n        return function (val) {\n            return val < max;\n        };\n    },\n\n    /**\n     * Validate a value is greater than a min.\n     *\n     * @param min the minimum value the validator will approve (exclusive)\n     *\n     * @returns {Function}\n     */\n    more: function (min) {\n        return function (val) {\n            return val > min;\n        };\n    },\n    \n    /**\n     * Validate that a value is empty. (No empty objects, null or undefined).\n     *\n     * @returns {Function}\n     */\n    empty: function () {\n        return util.is.Empty;\n    },\n\n    /**\n     * Validate that the length of a value is between @min and (optional) @max.\n     *\n     * @param min the minimum length.\n     * @param max the maximum length.\n     *\n     * @returns {Function}\n     */\n    length: function (min, max) {\n        min = min || 0;\n\n        return function (val) {\n            return min <= val.length && (null == max || max >= val.length);\n        };\n    },\n    \n    /**\n     * Validate that an input contains unique values.\n     *\n     * @returns {Function}\n     */\n    unique: function () {\n        return function (val) {\n            var values = [];\n            \n            for (var i in val) {\n                /* istanbul ignore else */\n                if (val.hasOwnProperty(i)) {\n                    if (-1 === values.indexOf(val[i])) {\n                        values.push(val[i]);\n                    } else {\n                        return false;\n                    }\n                }\n            }\n            \n            return true;\n        };\n    },\n\n    /**\n     * Validate that a string|array starts with specific value.\n     *\n     * @param find the the input the value should start with.\n     *\n     * @returns {Function}\n     */\n    startsWith: function (find) {\n        return function (val) {\n            return 0 === val.indexOf(find);\n        };\n    },\n\n    /**\n     * Validate that a string|array ends with specific value.\n     *\n     * @param find the the input the value should end with.\n     *\n     * @returns {Function}\n     */\n    endsWith: function (find) {\n        return function (val) {\n            var end = (null != find && null != find.length) ? val.length - find.length : val.length - 1;\n\n            if (0 > end) {\n                end = 0;\n            }\n\n            return end === val.indexOf(find);\n        };\n    },\n    \n    /**\n     * Validate that a value is sorted.\n     *\n     * @param compare a function to compare the values.\n     *\n     * @returns {Function}\n     */\n    sorted: function (compare) {\n        compare = compare || function (a, b) {\n            if (a > b) {\n                return 1;\n            }\n            if (a < b) {\n                return -1;\n            }\n\n            return 0;\n        };\n        \n        return function (val) {\n            for (var i = 1; i < val.length; i += 1) {\n                if (0 < compare(val[i - 1], val[i])) {\n                    return false;\n                }\n            }\n            \n            return true;\n        };\n    },\n\n    /**\n     * Validate that a string|array contains with specific value.\n     *\n     * @returns {Function}\n     */\n    contains: function (/** Values String|Array must contain */) {\n        var mustContain = arguments;\n\n        return function (val) {\n            if (0 === mustContain.length) {\n                return false;\n            }\n\n            for (var i = 0; i < mustContain.length; i += 1) {\n                if (0 > val.indexOf(mustContain[i])) {\n                    return false;\n                }\n            }\n\n            return true;\n        };\n    },\n\n    /**\n     * Validate that a string matches a regular expression.\n     *\n     * @param regExp the regex to test a string against.\n     *\n     * @returns {Function}\n     */\n    matches: function (regExp) {\n        return RegExp.prototype.test.bind(regExp);\n    },\n\n    /**\n     * Validate that a string is lowercase.\n     *\n     * @returns {Function}\n     */\n    lowerCase: function () {\n        return function (val) {\n            return val.toLowerCase() === val;\n        };\n    },\n\n    /**\n     * Validate that a string is upperCase.\n     *\n     * @returns {Function}\n     */\n    upperCase: function () {\n        return function (val) {\n            return val.toUpperCase() === val;\n        };\n    },\n    \n    /**\n     * Validate that a value can be parsed into JSON.\n     * \n     * @returns {Function}\n     */\n    json: function () {\n        return function (val) {\n            try {\n                JSON.parse(val);\n                return true;\n            } catch (err) {\n                return false;\n            }\n        };\n    }\n};",
    "'use strict';\n\nvar ip = {\n    /* jshint ignore:start */\n    v4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,\n    /* jshint ignore:end */\n    v6: /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/\n};\n\nvar creditCards = {\n    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,\n    mastercard: /^5[1-5][0-9]{14}$/,\n    americanexpress: /^3[47][0-9]{13}$/,\n    dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,\n    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,\n    jcb: /^(?:2131|1800|35\\d{3})\\d{11}$/\n};\n\nmodule.exports = {\n    alpha: function () {\n        return function (val) {\n            return /^[a-zA-z]+$/.test(val);\n        };\n    },\n    numeric: function () {\n        return function (val) {\n            return /^-?[0-9]+$/.test(val);\n        };\n    },\n    alphaNumeric: function () {\n        return function (val) {\n            return /^[a-zA-Z0-9]+$/.test(val);\n        };\n    },\n    hex: function () {\n        return function (val) {\n            return /^[0-9a-fA-F]+$/.test(val);\n        };\n    },\n    hexColor: function () {\n        return function (val) {\n            return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);\n        };\n    },\n    ascii: function () {\n        return function (val) {\n            return /^[\\x00-\\x7F]+$/.test(val);\n        };\n    },\n    html: function () {\n        return function (val) {\n            return /<\\/?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)\\/?>/.test(val);\n        };\n    },\n    mongoId: function () {\n        return function (val) {\n            return /^[0-9a-fA-F]{24}$/.test(val);\n        };\n    },\n    email: function () {\n        return function (val) {\n            /* jshint ignore:start */\n            return /^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$/i.test(val);\n            /* jshint ignore:end */\n        };\n    },\n    ip: function (version) {\n        version = Number(version);\n        \n        return function (val) {\n            if (4 === version) {\n                return ip.v4.test(val);\n            } else if (6 === version) {\n                return ip.v6.test(val);\n            } else {\n                return ip.v4.test(val) || ip.v6.test(val);\n            }\n        };\n    },\n    phoneNumber: function () {\n        return function (val) {\n            var numDigits = val.replace(/[^0-9]/g, '').length;\n            return val.replace(/[^0-9\\-\\.\\(\\) \\+\\/]/, '') === val &&\n                14 > numDigits && 7 <= numDigits;\n        };\n    },\n    creditCard: function (/** validCards... */) {\n        var validCards = (0 === arguments.length) ? Object.keys(creditCards) : arguments;\n        \n        return function (val) {\n            val = val.replace(/-| /g, '');\n            \n            for (var i = 0; i < validCards.length; i += 1) {\n                if (creditCards[validCards[i].toLowerCase()].test(val)) {\n                    return true;\n                }\n            }\n            \n            return false;\n        };\n    }\n};",
    "'use strict';\n\nvar util = require('../util.js');\n\nmodule.exports = {\n    /**\n     * Validate a value is a String type.\n     *\n     * @returns {Function}\n     */\n    string: function () {\n        return util.is.String;\n    },\n\n    /**\n     * Validate a value is a Number type.\n     *\n     * @returns {Function}\n     */\n    number: function () {\n        return util.is.Number;\n    },\n\n    /**\n     * Validate a value is a Boolean type.\n     *\n     * @returns {Function}\n     */\n    boolean: function () {\n        return util.is.Boolean;\n    },\n\n    /**\n     * Validate a value is a Date type.\n     *\n     * @returns {Function}\n     */\n    date: function () {\n        return util.is.Date;\n    },\n\n    /**\n     * Validate a value is a RegExp type.\n     *\n     * @returns {Function}\n     */\n    regExp: function () {\n        return util.is.RegExp;\n    },\n    \n    /**\n     * Validate a value is a Error type.\n     *\n     * @returns {Function}\n     */\n    error: function () {\n        return util.is.Error;\n    },\n\n    /**\n     * Validate a value is a Function type.\n     *\n     * @returns {Function}\n     */\n    function: function () {\n        return util.is.Function;\n    },\n    \n    /**\n     * Validate a value is a Function type.\n     *\n     * @returns {Function}\n     */\n    'arguments': function () {\n        return util.is.Arguments;\n    },\n\n    /**\n     * Validate a value is an Object type and that it's properties pass given tests.\n     *\n     * @returns {Function}\n     */\n    object: function (/**Tests to be applied to each property*/) {\n        var tests = {};\n        var arg;\n        \n        // If this is a \"not.\" test then we do not run the field validators.\n        if (this.isNegated && 0 !== arguments.length) {\n            throw new Error('Prove-It: not.Object can not accept arguments.');\n        }\n\n        for (var i = 0; i < arguments.length; i += 1) {\n            arg = arguments[i];\n\n            for (var key in arg) {\n                /* istanbul ignore else */\n                if (arg.hasOwnProperty(key)) {\n                    if (null != arg[key] && null != arg[key].test) {\n                        tests[key] = tests[key] || [];\n                        tests[key].push(arg[key]);\n                    } else {\n                        throw new Error('Prove-It: Non test provided at ' + key);\n                    }\n                }\n            }\n        }\n\n        return function (val) {\n            var isObject = util.is.Object(val);\n            var test;\n            var key;\n            var cur;\n            \n            if (isObject && !util.is.Empty(tests)) {\n                for (key in tests) {\n                    /* istanbul ignore else */\n                    if (tests.hasOwnProperty(key)) {\n                        cur = val[key];\n\n                        for (var i = 0; i < tests[key].length; i += 1) {\n                            test = tests[key][i];\n                            this.merge(test.test(cur), key);\n                        }\n                    }\n                }\n\n                for (key in val) {\n                    /* istanbul ignore else */\n                    if (val.hasOwnProperty(key)) {\n                        cur = val[key];\n\n                        if (null == tests[key]) {\n                            this.append({\n                                type: 'extraField',\n                                value: cur\n                            }, key);\n                        }\n                    }\n                }\n            }\n\n            return isObject;\n        };\n    },\n\n    /**\n     * Validate a value is a Array type and that it's children pass given tests.\n     *\n     * @returns {Function}\n     */\n    array: function (/**Tests to be applied to each array element*/) {\n        var tests = [];\n\n        // If this is a \"not.\" test then we do not run the element validators.\n        if (this.isNegated && 0 !== arguments.length) {\n            throw new Error('Prove-It: not.Array can not accept arguments.');\n        }\n        \n        for (var i = 0; i < arguments.length; i += 1) {\n            if (null != arguments[i].test) {\n                tests.push(arguments[i]);\n            } else {\n                throw new Error('Prove-It: Non test provided to array validator');\n            }\n        }\n\n        return function (val) {\n            var isArray = util.is.Array(val);\n            var test;\n            var cur;\n\n            if (isArray && !util.is.Empty(tests)) {\n                for (var i = 0; i < val.length; i += 1) {\n                    cur = val[i];\n\n                    for (var j = 0; j < tests.length; j += 1) {\n                        test = tests[j];\n                        this.merge(test.test(cur), i);\n                    }\n                }\n            }\n\n            return isArray;\n        };\n    }\n};",
    "'use strict';\n\nvar util = require('./util.js');\n\n/**\n * Returns an error handler that can have prove-it errors added or merged.\n */\nmodule.exports = function () {\n    var errors = {};\n    var handler = {\n        /**\n         * Appends error messages at an optional path, or the current error.\n         * \n         * @param newErrors an array of error objects to append at a path.\n         * @param path the path to append the errors.\n         */\n        append: function (newErrors, path) {\n            path = null == path ? '' : path;\n            var error = errors[path] = errors[path] || [];\n            \n            if (!util.is.Array(newErrors)) {\n                newErrors = [newErrors];\n            }\n            \n            for (var i = 0; i < newErrors.length; i += 1) {\n                error.push(newErrors[i]);\n            }\n        },\n        /**\n         * Merges the results of another prove test onto the current error object.\n         * \n         * @param testResults prove test results to add to instance errors.\n         * @param path the path to append the errors.\n         */\n        merge: function (result, path) {\n            path = null == path ? '' : path;\n            var error = result.errors;\n        \n            if (true === result) {\n                return;\n            }\n            \n            /* istanbul ignore else */\n            if (util.is.Array(error)) {\n                handler.append(error, path);\n            } else if (util.is.Object(error)) {\n                if ('' !== path) {\n                    path += '.';\n                }\n        \n                for (var prop in error) {\n                    /* istanbul ignore else */\n                    if (error.hasOwnProperty(prop)) {\n                        handler.append(error[prop], path + prop);\n                    }\n                }\n            }\n        },\n        errors: errors\n    };\n    \n    return handler;\n};",
    "'use strict';\n\nvar util = require('./util.js');\nvar errorHandler  = require('./errorHandler.js');\n\n/**\n * Creates a prove-it validation error.\n * \n * @param errors the errors to attach to the error object.\n * @returns {Error}\n */\nvar ValidationError = function (errors) {\n    this.name = 'ValidationError';\n    this.message = 'Validation Failed';\n    this.errors = errors;\n};\nValidationError.prototype = Error.prototype;\n\n/**\n * Storage for negated validators.\n */\nvar not = {};\nnot.a =\nnot.and =\nnot.as =\nnot.be =\nnot.have =\nnot.with =\nnot.which =\nnot.is =\nnot.it =\nnot.of = not;\n\n/**\n * Starts a prove instance, accepts 'PATH' for error messages and object validations.\n *\n * @returns {prove}\n */\nvar Prove = function () {\n    if (!(this instanceof Prove)) {\n        return new Prove();\n    }\n    \n    this.isRequired = true;\n    this.selected = [];\n    this.annotations = {};\n    this.not = Object.create(not);\n    this.not._self = \n    this._self =\n    this.a =\n    this.and =\n    this.as =\n    this.be =\n    this.have =\n    this.with =\n    this.which =\n    this.is =\n    this.it =\n    this.of = this;\n};\n\n/**\n * Runs tests on current selected validators on prove instance.\n *\n * @param val the value to test against the current validation chain.\n * @returns {*}\n */\nProve.prototype.test = function (val) {\n    var annotations = this.annotations;\n    var handler = errorHandler();\n    var errors = handler.errors;\n    var test;\n    \n    if (null == val) {\n        if (this.isRequired) {\n            handler.append(util.merge(\n                { type: 'required', value: undefined },\n                annotations\n            ));\n        }\n    } else {\n        for (var i = 0; i < this.selected.length; i += 1) {\n            test = this.selected[i];\n\n            try {\n                if (true !== test.call(handler, val)) {\n                    throw 0;\n                }\n            } catch (err) {\n                handler.append(util.merge(\n                    { value: val },\n                    test.config,\n                    annotations\n                ));\n            }\n        }\n    }\n    \n    return util.is.Empty(errors) || new ValidationError(\n        (1 === Object.keys(errors).length &&  null != errors['']) ?\n        errors[''] : errors\n    );\n};\n\n/**\n * Addes 'Annotations' to the current instance.\n * \n * @param annotations the annotations to add.\n */\nProve.prototype.annotate = function (annotations) {\n    for (var key in annotations) {\n        /* istanbul ignore else */\n        if (annotations.hasOwnProperty(key)) {\n            this.annotations[key] = annotations[key];\n        }\n    }\n    \n    return this;\n};\n\n/**\n * Configures current prove to be required/optional.\n * \n * @param bool if true or null then optional, otherwise required.\n */\nProve.prototype.optional = function (bool) {\n    this.isRequired = !Boolean(null == bool || bool);\n    \n    return this;\n};\n\n/**\n * Configures current prove to be required/optional.\n * \n * @param bool if true or null then required, otherwise optional.\n */\nProve.prototype.required = function (bool) {\n    this.isRequired = Boolean(null == bool || bool);\n    \n    return this;\n};\n\n/**\n * Utility to merge two or more prove instances and return a new one.\n *\n * @returns {prove}\n */\nProve.concat = function (/** ...tests */) {\n    var merged;\n    var selected = [];\n    \n    var instance;\n    \n    for (var i = 0; i < arguments.length; i += 1) {\n        instance = arguments[i];\n        selected = selected.concat(instance.selected);\n    }\n    \n    merged = new Prove();\n    merged.selected = merged.selected.concat(selected);\n\n    return merged;\n};\n\n/**\n * Utility to make a regular validator add is invocation to the current validation chain.\n *\n * @param name the name of the validator to chain.\n * @param validator the validator to chain.\n * @returns {Function} a chained validator.\n */\nvar chainValidator = function (name, validator) {\n    if (0 === name.indexOf('not.')) {\n        return function () {\n            var self = this._self;\n            var config = { type: name };\n            \n            if (0 !== arguments.length) {\n                config.args = Array.prototype.slice.call(arguments);\n            }\n            \n            var fn = validator.apply(util.merge({ isNegated: true }, config), arguments);\n            var result = function (val) {\n                return !fn(val);\n            };\n            \n            result.config = config;\n            self.selected.push(result);\n            \n            return self;\n        };\n    } else {\n        return function () {\n            var self = this._self;\n            var config = { type: name };\n\n            if (0 !== arguments.length) {\n                config.args = Array.prototype.slice.call(arguments);\n            }\n            \n            var result = validator.apply(util.merge({ isNegated: false }, config), arguments);\n            result.config = config;\n            self.selected.push(result);\n            \n            return self;\n        };\n    }\n};\n\n/**\n * Function that accepts more validators to merge onto the prove prototype.\n *\n * @param newValidators the object containing the validators to add.\n */\nProve.extend = function (newValidators) {\n    for (var name in newValidators) {\n        /* istanbul ignore else */\n        if (newValidators.hasOwnProperty(name)) {\n            Prove.prototype[name] = chainValidator(name, newValidators[name]);\n\n            // Disable try and eval (don't work well with negation).\n            if (false === /try|eval/.test(name)) {\n                not[name] = chainValidator('not.' + name, newValidators[name]);\n            } else {\n                not[name] = null;\n            }\n        }\n    }\n};\n\n// Require default validators.\nProve.extend(require('./default/types.js'));\nProve.extend(require('./default/common.js'));\nProve.extend(require('./default/regex.js'));\n\nmodule.exports = Prove['default'] = Prove;",
    "'use strict';\n\nvar typeClass = {\n    string: '[object String]',\n    number: '[object Number]',\n    'boolean': '[object Boolean]',\n    date: '[object Date]',\n    regexp: '[object RegExp]',\n    error: '[object Error]',\n    'function': '[object Function]',\n    'arguments': '[object Arguments]',\n    object: '[object Object]',\n    array: '[object Array]'\n};\nvar isType = function (type) {\n    return function (val) {\n        return (type === typeof val && 'object' !== typeof val) ||\n            ('object' === typeof val || 'function' === typeof val) &&\n            Object.prototype.toString.call(val) === typeClass[type];\n    };\n};\n\nmodule.exports = {\n    merge: function () {\n        var result = {};\n        var arg;\n        var key;\n        var i;\n        \n        for (i = 0; i < arguments.length; i += 1) {\n            arg = arguments[i];\n            \n            for (key in arg) {\n                /* istanbul ignore else */\n                if (arg.hasOwnProperty(key)) {\n                    result[key] = arg[key];\n                }\n            }\n        }\n        \n        return result;\n    },\n    is: {\n        Empty: function (obj) {\n            for (var prop in obj) {\n                /* istanbul ignore else */\n                if (obj.hasOwnProperty(prop)) {\n                    return false;\n                }\n            }\n        \n            return true;\n        },\n        String: isType('string'),\n        Number: isType('number'),\n        Boolean: isType('boolean'),\n        Date: isType('date'),\n        RegExp: isType('regexp'),\n        Error: isType('error'),\n        Function: isType('function'),\n        Arguments: isType('arguments'),\n        Object: isType('object'),\n        Array: isType('array')\n    }\n};"
  ]
}