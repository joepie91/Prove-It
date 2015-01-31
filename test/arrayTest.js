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

        prove().Array(
            prove().String()
        ).test(doc).errors.should.eql({
            1: [{
                type: 'String',
                value: 1
            }]
        });
    });
    
    it('should validate an array within an object', function () {
        var doc = {
            phones: ['555555', 1]
        };

        var test = {
            phones: prove().Array(
                prove().String()
            )
        };

        prove().Object(test).test(doc).errors.should.eql({
            'phones.1': [{
                type: 'String',
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
            phones: prove().Array(
                prove().Object({
                    number: prove().String(),
                    label: prove().String()
                })
            )
        };

        prove().Object(test).test(doc).errors.should.eql({
            'phones.1.number': [{
                type: 'String',
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

        prove().Array(
            prove().String(),
            prove().length(1, 6)
        ).test(doc).errors.should.eql({
                1: [{
                    type: 'String',
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
        instance.Array.bind(instance, function () {}).should.throw();
    });
    
    it('should error with arguments when negated', function () {
        var instance = prove();
        instance.not.Array.bind(instance.not, prove().String()).should.throw();
    });
});