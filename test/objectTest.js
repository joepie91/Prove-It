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
            name: prove().object({
                first: prove('First Name').string(),
                last: prove('Last Name').string()
            })
        };

        prove('Test Doc').object(test).test(doc).errors.should.eql({
            'name.first': [{
                type: 'string',
                value: 1
            }],
            'name.last': [{
                type: 'string',
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
            name: prove().object({
                first: prove().object({
                    value: prove().string(),
                    caps: prove().string()
                }),
                last: prove().string()
            })
        };

        prove().object(test).test(doc).errors.should.eql({
            'name.first.value': [{
                type: 'string',
                value: 1
            }],
            'name.first.caps': [{
                type: 'string',
                value: 2
            }],
            'name.last': [{
                type: 'string',
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
            name: prove().object(
                {
                    last: prove().string()
                },
                {
                    first: prove().string()
                }
            )
        };

        prove().object(test).test(doc).errors.should.eql({
            'name.first': [{
                type: 'string',
                value: 1
            }],
            'name.last': [{
                type: 'string',
                value: 2
            }]
        });
    });

    it('should error with a non-validator function', function () {
        var instance = prove();
        instance.object.bind(instance, {
            first: function () {},
            last: prove().string()
        }).should.throw();
    });
    
    it('should error with arguments when negated', function () {
        var instance = prove();
        instance.not.object.bind(instance.not, { test: prove().string() }).should.throw();
    });
});