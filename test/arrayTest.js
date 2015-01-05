'use strict';

var prove = require('../lib/index.js');
var should = require('should');

describe('Array Validator', function () {

    it('should validate a simple array', function () {
        var doc = ['555555', 1];

        prove('Phones').Array(
            prove('Phone Number').String()
        ).test(doc).errors.should.eql({
            1: {
                message: [
                    'Phone Number should be a string'
                ],
                value: 1
            }
        });
    });

    it('should validate an array within an object', function () {
        var doc = {
            phones: ['555555', 1]
        };

        var test = {
            phones: prove('Phones').Array(
                prove('Phone Number').String()
            )
        };

        prove().Object(test).test(doc).errors.should.eql({
            'phones.1': {
                message: [
                    'Phone Number should be a string'
                ],
                value: 1
            }
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
            phones: prove('Phones').Array(
                prove().Object({
                    number: prove('Phone Number').String(),
                    label: prove('Phone Label').String()
                })
            )
        };

        prove().Object(test).test(doc).errors.should.eql({
            'phones.1.number': {
                message: [
                    'Phone Number should be a string'
                ],
                value: 1
            },
            'phones.1.label': {
                message: [
                    'Phone Label is a required field'
                ]
            }
        });
    });

    it('should compose validations within array', function () {
        var doc = ['555555', [1], ''];

        prove('Phones').Array(
            prove('Phone Number').String(),
            prove('Phone Number').length(1, 6)
        ).test(doc).errors.should.eql({
                1: {
                    message: [
                        'Phone Number should be a string'
                    ],
                    value: [1]
                },
                2: {
                    message: [
                        'Phone Number should have a length within 1 and 6'
                    ],
                    value: ''
                }
            });
    });

    it('should error with a non-validator function', function () {
        var instance = prove();
        instance.Array.bind(instance, function () {}).should.throw();
    });
});