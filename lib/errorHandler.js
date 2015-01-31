'use strict';

var util = require('./util.js');

/**
 * Returns an error handler that can have prove-it errors added or merged.
 */
module.exports = function () {
    var errors = {};
    var handler = {
        /**
         * Appends error messages at an optional path, or the current error.
         * 
         * @param newErrors an array of error objects to append at a path.
         * @param path the path to append the errors.
         */
        append: function (newErrors, path) {
            path = null == path ? '' : path;
            var error = errors[path] = errors[path] || [];
            
            if (!util.is.Array(newErrors)) {
                newErrors = [newErrors];
            }
            
            for (var i = 0; i < newErrors.length; i += 1) {
                error.push(newErrors[i]);
            }
        },
        /**
         * Merges the results of another prove test onto the current error object.
         * 
         * @param testResults prove test results to add to instance errors.
         * @param path the path to append the errors.
         */
        merge: function (result, path) {
            path = null == path ? '' : path;
            var error = result.errors;
        
            if (true === result) {
                return;
            }
            
            /* istanbul ignore else */
            if (util.is.Array(error)) {
                handler.append(error, path);
            } else if (util.is.Object(error)) {
                if ('' !== path) {
                    path += '.';
                }
        
                for (var prop in error) {
                    /* istanbul ignore else */
                    if (error.hasOwnProperty(prop)) {
                        handler.append(error[prop], path + prop);
                    }
                }
            }
        },
        errors: errors
    };
    
    return handler;
};