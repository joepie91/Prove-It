'use strict';

var prove = require('../lib/index.js');
var should = require('should');

var log = function (doc) {
    console.log(JSON.stringify(doc, null, 4));

    return {
        errors: {}
    };
};

describe('Array Validator', function () {

    it('should validate a simple array', function () {
        var doc = ['555555', 1];

        prove().array(
            prove().string()
        ).test(doc).errors.should.eql({
            1: [{
                type: 'string',
                value: 1
            }]
        });
    });
    
    it('should validate an array within an object', function () {
        var doc = {
            phones: ['555555', 1]
        };

        var test = {
            phones: prove().array(
                prove().string()
            )
        };

        prove().object(test).test(doc).errors.should.eql({
            'phones.1': [{
                type: 'string',
                value: 1
            }]
        });
    });

    it('should validate an array of objects', function () {
        var doc = {
            phones: [
                {
                    number: '5555555',
                    label: 'home'
                },
                {
                    number: 1
                }
            ]
        };

        var test = {
            phones: prove().array(
                prove().object({
                    number: prove().string(),
                    label: prove().string()
                })
            )
        };

        prove().object(test).test(doc).errors.should.eql({
            'phones.1.number': [{
                type: 'string',
                value: 1
            }],
            'phones.1.label': [{
                type: 'required',
                value: undefined
            }]
        });
    });

    it('should compose validations within array', function () {
        var doc = ['555555', [1], ''];

        prove().array(
            prove().string(),
            prove().length(1, 6)
        ).test(doc).errors.should.eql({
                1: [{
                    type: 'string',
                    value: [1]
                }],
                2: [{
                    type: 'length',
                    args: [1, 6],
                    value: ''
                }]
            });
    });

    it('should error with a non-validator function', function () {
        var instance = prove();
        instance.array.bind(instance, function () {}).should.throw();
    });
    
    it('should error with arguments when negated', function () {
        var instance = prove();
        instance.not.array.bind(instance.not, prove().string()).should.throw();
    });
});