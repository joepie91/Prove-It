'use strict';

var ip = {
    /* jshint ignore:start */
    v4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    /* jshint ignore:end */
    v6: /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/
};
var creditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    americanexpress: /^3[47][0-9]{13}$/,
    dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
};

module.exports = {
    alpha: function () {
        return {
            validator: function (val) {
                return /^[a-zA-z]+$/.test(val);
            },
            msg: '{PATH} should only contain letters'
        };
    },
    numeric: function () {
        return {
            validator: function (val) {
                return /^-?[0-9]+$/.test(val);
            },
            msg: '{PATH} should only contain numbers'
        };
    },
    alphaNumeric: function () {
        return {
            validator: function (val) {
                return /^[a-zA-Z0-9]+$/.test(val);
            },
            msg: '{PATH} should only contain letters and numbers'
        };
    },
    hex: function () {
        return {
            validator: function (val) {
                return /^[0-9a-fA-F]+$/.test(val);
            },
            msg: '{PATH} should be a hexadecimal'
        };
    },
    hexColor: function () {
        return {
            validator: function (val) {
                return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);
            },
            msg: '{PATH} should be a hex-color'
        };
    },
    ascii: function () {
        return {
            validator: function (val) {
                return /^[\x00-\x7F]+$/.test(val);
            },
            msg: '{PATH} should only contain ascii characters'
        };
    },
    ip: function (version) {
        version = Number(version);
        
        return {
            validator: function (val) {
                if (4 === version) {
                    return ip.v4.test(val);
                } else if (6 === version) {
                    return ip.v6.test(val);
                } else {
                    return ip.v4.test(val) || ip.v6.test(val);
                }
            },
            msg: (4 === version || 6 === version) ?
                '{PATH} should be ipv' + version :
                '{PATH} should be ipv4 or ipv6'
        };
    },
    phoneNumber: function () {
        return {
            validator: function (val) {
                return val.replace(/[^0-9\-\.\(\) \+\/]/, '') === val &&
                    14 > val.replace(/[^0-9]/g, '').length;
            },
            msg: '{PATH} should be a phone number'
        };
    },
    creditCard: function (/** validCards... */) {
        var validCards = (0 === arguments.length) ? Object.keys(creditCards) : arguments;
        
        return {
            validator: function (val) {
                val = val.replace(/-| /g, '');
                
                for (var i = 0; i < validCards.length; i += 1) {
                    if (creditCards[validCards[i].toLowerCase()].test(val)) {
                        return true;
                    }
                }
                
                return false;
            },
            msg: '{PATH} should be a credit card'
        };
    }
};