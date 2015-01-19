'use strict';

var typeClass = {
    string: '[object String]',
    number: '[object Number]',
    boolean: '[object Boolean]',
    date: '[object Date]',
    regexp: '[object RegExp]',
    'function': '[object Function]',
    object: '[object Object]',
    array: '[object Array]',
    'arguments': '[object Arguments]'
};
var isType = function (type) {
    return function (val) {
        return null != val && (
            ('object' !== typeof val && type === typeof val) ||
            ('object' === typeof val || 'function' === typeof val) &&
            Object.prototype.toString.call(val) === typeClass[type]
        );
    };
};

module.exports = {
    is: {
        Empty: function (obj) {
            for (var prop in obj) {
                /* istanbul ignore else */
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
        
            return true;
        },
        String: isType('string'),
        Number: isType('number'),
        Boolean: isType('boolean'),
        RegExp: isType('regexp'),
        Date: isType('date'),
        Function: isType('function'),
        Object: isType('object'),
        Array: isType('array')
    }
};