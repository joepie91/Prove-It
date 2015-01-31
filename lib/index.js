'use strict';

var util = require('./util.js');
var errorHandler  = require('./errorHandler.js');

/**
 * Creates a prove-it validation error.
 * 
 * @param errors the errors to attach to the error object.
 * @returns {Error}
 */
var ValidationError = function (errors) {
    this.name = 'ValidationError';
    this.message = 'Validation Failed';
    this.errors = errors;
};
ValidationError.prototype = Error.prototype;

/**
 * Storage for negated validators.
 */
var not = {};
not.a =
not.and =
not.as =
not.be =
not.have =
not.with =
not.which =
not.is =
not.it =
not.of = not;

/**
 * Starts a prove instance, accepts 'PATH' for error messages and object validations.
 *
 * @returns {prove}
 */
var Prove = function () {
    if (!(this instanceof Prove)) {
        return new Prove();
    }
    
    this.not = Object.create(not);
    this.not._self = 
    this._self =
    this.a =
    this.and =
    this.as =
    this.be =
    this.have =
    this.with =
    this.which =
    this.is =
    this.it =
    this.of = this;
    
    this.isRequired = true;
    this.selected = [];
    this.annotations = {};
};

/**
 * Runs tests on current selected validators on prove instance.
 *
 * @param val the value to test against the current validation chain.
 * @returns {*}
 */
Prove.prototype.test = function (val) {
    var annotations = this.annotations;
    var handler = errorHandler();
    var errors = handler.errors;
    var test;
    
    if (null == val) {
        if (this.isRequired) {
            handler.append(util.merge(
                { type: 'required', value: undefined },
                annotations
            ));
        }
    } else {
        for (var i = 0; i < this.selected.length; i += 1) {
            test = this.selected[i];

            try {
                if (true !== test.call(handler, val)) {
                    throw 0;
                }
            } catch (err) {
                handler.append(util.merge(
                    { value: val },
                    test.config,
                    annotations
                ));
            }
        }
    }
    
    return util.is.Empty(errors) || new ValidationError(
        (1 === Object.keys(errors).length &&  null != errors['']) ?
        errors[''] : errors
    );
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
            this.annotations[key] = annotations[key];
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
 * @param name the name of the validator to chain.
 * @param validator the validator to chain.
 * @returns {Function} a chained validator.
 */
var chainValidator = function (name, validator) {
    if (0 === name.indexOf('not.')) {
        return function () {
            var self = this._self;
            var config = { type: name };
            
            if (0 !== arguments.length) {
                config.args = Array.prototype.slice.call(arguments);
            }
            
            var fn = validator.apply(util.merge({ isNegated: true }, config), arguments);
            var result = function (val) {
                return !fn(val);
            };
            
            result.config = config;
            self.selected.push(result);
            
            return self;
        };
    } else {
        return function () {
            var self = this._self;
            var config = { type: name };

            if (0 !== arguments.length) {
                config.args = Array.prototype.slice.call(arguments);
            }
            
            var result = validator.apply(util.merge({ isNegated: false }, config), arguments);
            result.config = config;
            self.selected.push(result);
            
            return self;
        };
    }
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

            // Disable try and eval (don't work well with negation).
            if (false === /try|eval/.test(name)) {
                not[name] = chainValidator('not.' + name, newValidators[name]);
            } else {
                not[name] = null;
            }
        }
    }
};

// Require default validators.
Prove.extend(require('./default/types.js'));
Prove.extend(require('./default/common.js'));
Prove.extend(require('./default/regex.js'));

module.exports = Prove['default'] = Prove;