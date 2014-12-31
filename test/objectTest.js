'use strict';

var prove = require('../lib/index.js');
var should = require('should');

var log = function (doc) {
    console.log(JSON.stringify(doc, null, 2));

    return {
        errors: {}
    };
};

describe('Object Validator', function () {
    it('should validate a simple object', function () {
        var doc = {
            name: {
                first: 1,
                last: 2
            }
        };

        var test = {
            name: prove().Object({
                first: prove('First Name').String(),
                last: prove('Last Name').String()
            })
        };

        prove('Test Doc').Object(test).test(doc).errors.should.eql({
            'name.first': {
                message: ['First Name should be a string'],
                value: 1
            },
            'name.last': {
                message: ['Last Name should be a string'],
                value: 2
            }
        });
    });

    it('should work on a deep object', function () {
        var doc = {
            name: {
                first: {
                    value: 1,
                    caps: 2
                },
                last: 3
            },
            phone: '555555'
        };

        var test = {
            name: prove().Object({
                first: prove().Object({
                    value: prove('First Name').String(),
                    caps: prove('First Name Caps').String()
                }),
                last: prove('Last Name').String()
            })
        };

        prove().Object(test).test(doc).errors.should.eql({
            'name.first.value': {
                message: [
                    'First Name should be a string'
                ],
                value: 1
            },
            'name.first.caps': {
                message: [
                    'First Name Caps should be a string'
                ],
                value: 2
            },
            'name.last': {
                message: [
                    'Last Name should be a string'
                ],
                value: 3
            },
            phone: {
                message: [
                    'phone is not an allowed field'
                ],
                value: '555555'
            }
        });
    });

    it('should compose object validations', function () {
        var doc = {
            name: {
                first: 1,
                last: 2
            }
        };

        var test = {
            name: prove().Object(
                {
                    last: prove('Last Name').String()
                },
                {
                    first: prove('First Name').String()
                }
            )
        };

        prove('Test Doc').Object(test).test(doc).errors.should.eql({
            'name.first': {
                message: ['First Name should be a string'],
                value: 1
            },
            'name.last': {
                message: ['Last Name should be a string'],
                value: 2
            }
        });
    });

    it('should run a regex on keys', function () {
        var doc = {
            name: {
                first: 1,
                last: 2
            },
            Name: {
                first: 1,
                last: 2
            }
        };

        var test = {
            '/name|Name/': prove().Object(
                {
                    last: prove('Last Name').String()
                },
                {
                    first: prove('First Name').String()
                }
            )
        };

        prove('Test Doc').Object(test).test(doc).errors.should.eql({
            'name.first': {
                message: ['First Name should be a string'],
                value: 1
            },
            'name.last': {
                message: ['Last Name should be a string'],
                value: 2
            },
            'Name.first': {
                message: ['First Name should be a string'],
                value: 1
            },
            'Name.last': {
                message: ['Last Name should be a string'],
                value: 2
            }
        });
    });

    it('should error with a non-validator function', function () {
        var instance = prove();
        instance.Object.bind(instance, {
            first: function () {},
            last: prove('Last Name').String()
        }).should.throw();
    });

    // It should compose the fields of multiple objects.

    // It should validate a required fields on an object.
});