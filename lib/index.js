'use strict';

var type = require('./type.js');

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
var Prove = function () {
    if (!(this instanceof Prove)) {
        return new Prove();
    }
    
    Object.defineProperties(this, {
        selected: {
            writable: true,
            value: []
        },
        isRequired: {
            writable: true,
            value: true
        },
        _annotations: {
            writable: true,
            value: {}
        },
        _errors: {
            writable: true,
            value: null
        }
    });
};

/**
 * Runs tests on current selected validators on prove instance.
 *
 * @param val the value to test against the current validation chain.
 * @returns {*}
 */
Prove.prototype.test = function (val) {
    var errors = this._errors = {};
    var error;
    var test;
    
    if (null == val) {
        if (this.isRequired) {
            this._append({
                type: 'required',
                value: undefined
            });
        }
    } else {
        for (var i = 0; i < this.selected.length; i += 1) {
            test = this.selected[i];

            try {
                if (true !== test.call(this, val)) {
                    throw 0;
                }
            } catch (err) {
                error = {
                    type: test.config.type,
                    value: val
                };
                
                if (null != test.config.args) {
                    error.args = test.config.args;
                }
                
                this._append(error);
            }
        }
    }
    
    return type.is.Empty(errors) || new ValidationError(
        (1 === Object.keys(errors).length &&  null != errors['']) ?
        errors[''] : errors
    );
};

/**
 * Appends error messages at an optional path, or the current path.
 * 
 * @param newErrors an array of error objects to append at a path.
 * @param path the path to append the errors.
 */
Prove.prototype._append = function (newErrors, path) {
    path = null == path ? '' : path;
    var errors = this._errors[path] = this._errors[path] || [];
    
    if (!type.is.Array(newErrors)) {
        newErrors = [newErrors];
    }
    
    for (var i = 0; i < newErrors.length; i += 1) {
        for (var key in this._annotations) {
            /* istanbul ignore else */
            if (this._annotations.hasOwnProperty(key)) {
                newErrors[i][key] = this._annotations[key];
            }
        }
        
        errors.push(newErrors[i]);
    }
    
    return this;
};

/**
 * Merges the results of another prove test to the current instance.
 * 
 * @param testResults prove test results to add to instance errors.
 * @param path the path to append the errors.
 */
Prove.prototype._merge = function (result, path) {
    path = null == path ? '' : path;
    var errors = result.errors;

    if (true === result) {
        return this;
    }
    
    /* istanbul ignore else */
    if (type.is.Array(errors)) {
        this._append(errors, path);
    } else if (type.is.Object(errors)) {
        if ('' !== path) {
            path += '.';
        }

        for (var prop in errors) {
            /* istanbul ignore else */
            if (errors.hasOwnProperty(prop)) {
                this._append(errors[prop], path + prop);
            }
        }
    }
    
    return this;
};

/**
 * Addes 'Annotations' to the current instance.
 * 
 * @param annotations the annotations to add.
 */
Prove.prototype.annotate = function (annotations) {
    for (var key in annotations) {
        /* istanbul ignore else */
        if (annotations.hasOwnProperty(key)) {
            this._annotations[key] = annotations[key];
        }
    }
    
    return this;
};

/**
 * Configures current prove to be required/optional.
 * 
 * @param bool if true or null then optional, otherwise required.
 */
Prove.prototype.optional = function (bool) {
    this.isRequired = !Boolean(null == bool || bool);
    
    return this;
};

/**
 * Configures current prove to be required/optional.
 * 
 * @param bool if true or null then required, otherwise optional.
 */
Prove.prototype.required = function (bool) {
    this.isRequired = Boolean(null == bool || bool);
    
    return this;
};

/**
 * Utility to merge two or more prove instances and return a new one.
 *
 * @returns {prove}
 */
Prove.concat = function (/** ...tests */) {
    var merged;
    var selected = [];
    
    var instance;
    
    for (var i = 0; i < arguments.length; i += 1) {
        instance = arguments[i];
        selected = selected.concat(instance.selected);
    }
    
    merged = new Prove();
    merged.selected = merged.selected.concat(selected);

    return merged;
};

/**
 * Utility to make a regular validator add is invocation to the current validation chain.
 *
 * @param validator the validator to chain.
 * @returns {Function} a chained validator.
 */
var chainValidator = function (type, validator) {
    return function () {
        var chained = validator.apply(null, arguments);
        chained.config = {
            type: type
        };
        
        if (0 !== arguments.length) {
            chained.config.args = Array.prototype.slice.call(arguments);
        }
        
        this.selected.push(chained);

        return this;
    };
};

/**
 * Function that accepts more validators to merge onto the prove prototype.
 *
 * @param newValidators the object containing the validators to add.
 */
Prove.extend = function (newValidators) {
    for (var name in newValidators) {
        /* istanbul ignore else */
        if (newValidators.hasOwnProperty(name)) {
            Prove.prototype[name] = chainValidator(name, newValidators[name]);
        }
    }
};

// Require default validators.
Prove.extend(require('./default/types.js'));
Prove.extend(require('./default/common.js'));
Prove.extend(require('./default/regex.js'));

module.exports = Prove['default'] = Prove;