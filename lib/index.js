'use strict';

var createErrorHandler = require('./errorHandler.js');

/**
 * Starts a prove instance, accepts 'PATH' for error messages and object validations.
 *
 * @param path the label to display in error messages.
 *
 * @returns {prove}
 */
var prove = function Prove (path) {
    return Object.create(prove.prototype, {
        _config: { value: {
            path: path || '',
            selected: [],
            optional: false
        } }
    });
};

/**
 * Runs tests on current selected validators on prove instance.
 *
 * @param val the value to test against the current validation chain.
 * @returns {*}
 */
prove.prototype.test = function (val) {
    var config = this._config;
    var path = config.path;
    var selected = config.selected;
    var errors = createErrorHandler();
    var test;
    var result;

    errors.path = path;

    if (null == val) {
        if (false === config.optional) {
            errors.append({
                path: path,
                msg: '{PATH} is a required field',
                val: null
            });
        }
    } else {
        for (var i = 0, len = selected.length; i < len; i += 1) {
            test = selected[i];

            try {
                if (true !== test.validator.call(errors, val)) {
                    throw 0;
                }
            } catch (err) {
                errors.append({
                    path: path,
                    msg: test.msg,
                    val: val
                });
            }
        }
    }

    result = errors.finish();

    if (false === result) {
        return true;
    } else if (1 === Object.keys(result).length && (null != result[path] || null != result[''])) {
        return (result[path] || result['']).message;
    } else {
        return {
            message: 'Validation failed',
            name: 'ValidationError',
            errors: result
        };
    }
};

/**
 * Make current instance optional (accepts null or undefined).
 *
 * @param bool if false value is still required, if undefined or true value is optional.
 * @returns {prove}
 */
prove.prototype.optional = function (bool) {
    var config = this._config;
    config.optional = null == bool || bool;

    return this;
};

/**
 * Utility to merge two or more prove instances and return a new one.
 *
 * @returns {prove}
 */
prove.concat = function (/** ...tests */) {
    var merged;
    var instances = arguments;
    var selected = [];
    var path;
    
    var config;
    
    for (var i = 0; i < arguments.length; i += 1) {
        config = arguments[i]._config;
        if (null == path && '' !== config.path) {
            path = config.path;
        }
        
        selected = selected.concat(config.selected);
    }
    
    merged = prove(path);
    merged._config.selected = selected;

    return merged;
};

/**
 * Utility to make a regular validator add is invocation to the current validation chain.
 *
 * @param validator the validator to chain.
 * @returns {Function} a chained validator.
 */
var chainValidator = function (validator) {
    return function () {
        this._config.selected.push(validator.apply(null, arguments));

        return this;
    };
};

/**
 * Function that accepts more validators to merge onto the prove prototype.
 *
 * @param newValidators the object containing the validators to add.
 */
prove.extend = function (newValidators) {
    for (var name in newValidators) {
        /* istanbul ignore else */
        if (newValidators.hasOwnProperty(name)) {
            prove.prototype[name] = chainValidator(newValidators[name]);
        }
    }
};

// Require default validators.
prove.extend(require('./default/types.js'));
prove.extend(require('./default/common.js'));
prove.extend(require('./default/regex.js'));

module.exports = prove['default'] = prove;