'use strict';
var util = require('./util.js');

module.exports = function (errors) {
    errors = errors || {};
    var merge = function (path, messages, value) {
        var error = errors[path] = errors[path] || { message: [] };
        error.message = error.message.concat(messages);
        if (null != value) {
            error.value = value;
        }
    };

    return {
        append: function (options) {
            var path = null == options.path ? '' : options.path;
            var message = options.msg;
            var value = options.val;
            var error;

            if (true !== message) {
                if (util.is.String(message)) {
                    message = {
                        errors: [message.replace(/\{VALUE\}/g, value).replace(/\{PATH\}/g, path)]
                    };
                }
                
                if (util.is.Array(message.errors)) {
                    merge(path, message.errors, value);
                } else if (util.is.Object(message.errors)) {
                    path = '' === path ? '' : path + '.';
                    for (var prop in message.errors) {
                        /* istanbul ignore else */
                        if (message.errors.hasOwnProperty(prop)) {
                            error = message.errors[prop];
                            merge(path + prop, error.message, error.value);
                        }
                    }
                }
            }
        },
        finish: function () {
            return util.isEmpty(errors) ? false : errors;
        }
    };
};