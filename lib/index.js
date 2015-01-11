'use strict';

var createErrorHandler = require('./errorHandler.js');

var ValidationError = function (errors) {
    this.name = 'ValidationError';
    this.message = 'Validation Failed';
    this.errors = errors;
};
ValidationError.prototype = Error.prototype;

/**
 * Starts a prove instance, accepts 'PATH' for error messages and object validations.
 *
 * @param path the label to display in error messages.
 *
 * @returns {prove}
 */
var prove = function Prove (path) {
    return Object.create(prove.prototype, {
        path: {
            value: path || '',
            writable: true
        },
        selected: {
            value: [],
            writable: true
        },
        isRequired: {
            value: true,
            writable: true
        }
    });
};

/**
 * Configures current prove to be required/optional.
 * 
 * @param bool if true or null then optional, otherwise required.
 */
prove.prototype.optional = function (bool) {
    this.isRequired = !Boolean(null == bool || bool);
    
    return this;
};

/**
 * Configures current prove to be required/optional.
 * 
 * @param bool if true or null then required, otherwise optional.
 */
prove.prototype.required = function (bool) {
    this.isRequired = Boolean(null == bool || bool);
    
    return this;
};

/**
 * Runs tests on current selected validators on prove instance.
 *
 * @param val the value to test against the current validation chain.
 * @returns {*}
 */
prove.prototype.test = function (val) {
    var errors = createErrorHandler();
    var test;
    var result;
    errors.path = this.path;
    
    if (null == val) {
        if (this.isRequired) {
            errors.append({
                path: this.path,
                msg: '{PATH} is a required field',
                val: undefined
            });
        }
    } else {
        for (var i = 0; i < this.selected.length; i += 1) {
            test = this.selected[i];

            try {
                if (true !== test.validator.call(errors, val)) {
                    throw 0;
                }
            } catch (err) {
                errors.append({
                    path: this.path,
                    msg: test.msg,
                    val: val
                });
            }
        }
    }

    result = errors.finish();

    if (false === result) {
        return true;
    } else {
        return new ValidationError(
            (1 === Object.keys(result).length && (null != result[this.path] || null != result[''])) ?
            (result[this.path] || result['']).message : result
        );
    }
};

/**
 * Utility to merge two or more prove instances and return a new one.
 *
 * @returns {prove}
 */
prove.concat = function (/** ...tests */) {
    var merged;
    var selected = [];
    var path;
    
    var config;
    
    for (var i = 0; i < arguments.length; i += 1) {
        config = arguments[i];
        if (null == path && '' !== config.path) {
            path = config.path;
        }
        
        selected = selected.concat(config.selected);
    }
    
    merged = prove(path);
    merged.selected = merged.selected.concat(selected);

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
        this.selected.push(validator.apply(null, arguments));

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