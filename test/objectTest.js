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
            'name.first': [{
                type: 'String',
                value: 1
            }],
            'name.last': [{
                type: 'String',
                value: 2
            }]
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
                    value: prove().String(),
                    caps: prove().String()
                }),
                last: prove().String()
            })
        };

        prove().Object(test).test(doc).errors.should.eql({
            'name.first.value': [{
                type: 'String',
                value: 1
            }],
            'name.first.caps': [{
                type: 'String',
                value: 2
            }],
            'name.last': [{
                type: 'String',
                value: 3
            }],
            phone: [{
                type: 'extraField',
                value: '555555'
            }]
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
                    last: prove().String()
                },
                {
                    first: prove().String()
                }
            )
        };

        prove().Object(test).test(doc).errors.should.eql({
            'name.first': [{
                type: 'String',
                value: 1
            }],
            'name.last': [{
                type: 'String',
                value: 2
            }]
        });
    });

    it('should error with a non-validator function', function () {
        var instance = prove();
        instance.Object.bind(instance, {
            first: function () {},
            last: prove().String()
        }).should.throw();
    });
});