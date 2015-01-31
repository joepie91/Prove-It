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
        return function (val) {
            return /^[a-zA-z]+$/.test(val);
        };
    },
    numeric: function () {
        return function (val) {
            return /^-?[0-9]+$/.test(val);
        };
    },
    alphaNumeric: function () {
        return function (val) {
            return /^[a-zA-Z0-9]+$/.test(val);
        };
    },
    hex: function () {
        return function (val) {
            return /^[0-9a-fA-F]+$/.test(val);
        };
    },
    hexColor: function () {
        return function (val) {
            return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);
        };
    },
    ascii: function () {
        return function (val) {
            return /^[\x00-\x7F]+$/.test(val);
        };
    },
    html: function () {
        return function (val) {
            return /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/.test(val);
        };
    },
    mongoId: function () {
        return function (val) {
            return /^[0-9a-fA-F]{24}$/.test(val);
        };
    },
    ip: function (version) {
        version = Number(version);
        
        return function (val) {
            if (4 === version) {
                return ip.v4.test(val);
            } else if (6 === version) {
                return ip.v6.test(val);
            } else {
                return ip.v4.test(val) || ip.v6.test(val);
            }
        };
    },
    phoneNumber: function () {
        return function (val) {
            var numDigits = val.replace(/[^0-9]/g, '').length;
            return val.replace(/[^0-9\-\.\(\) \+\/]/, '') === val &&
                14 > numDigits && 7 <= numDigits;
        };
    },
    creditCard: function (/** validCards... */) {
        var validCards = (0 === arguments.length) ? Object.keys(creditCards) : arguments;
        
        return function (val) {
            val = val.replace(/-| /g, '');
            
            for (var i = 0; i < validCards.length; i += 1) {
                if (creditCards[validCards[i].toLowerCase()].test(val)) {
                    return true;
                }
            }
            
            return false;
        };
    }
};