'use strict';

var arrayClass = '[object Array]';
var toString = Object.prototype.toString;
var isEmpty = function (obj) {
    for (var prop in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
};

module.exports = function (errors) {
    errors = errors || {};
    var merge = function (path, message, value) {
        var error = errors[path] = errors[path] || { message: [] };

        if (message && 'object' === typeof message && 'number' === typeof message.length &&
            toString.call(message) === arrayClass || false) {
            error.message = error.message.concat(message);
        } else if ('string' === typeof message || message instanceof String) {
            error.message.push(message.replace(/\{VALUE\}/g, value).replace(/\{PATH\}/g, path));
        }
        error.value = value;
    };

    return {
        append: function (options) {
            var path = null == options.path ? '' : options.path;
            var message = options.msg;
            var value = options.val;
            var error;

            if (true !== message) {
                if (null != message.errors) {
                    for (var prop in message.errors) {
                        /* istanbul ignore else */
                        if (message.errors.hasOwnProperty(prop)) {
                            error = message.errors[prop];

                            if ('' === path) {
                                merge(prop, error.message, error.value);
                            } else {
                                merge([path, prop].join('.'), error.message, error.value);
                            }
                        }
                    }
                } else {
                    merge(path, message, value);
                }
            }
        },
        finish: function () {
            return isEmpty(errors) ? false : errors;
        }
    };
};