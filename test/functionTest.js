'use strict';

var prove = require('../lib/index.js');
var should = require('should');

var log = function (doc) {
    console.log(JSON.stringify(doc, null, 2));

    return {
        errors: {}
    };
};

describe('Function Validator', function () {
    it('should validate a simple array with a function', function () {
        var doc = ['555555', 1];

        var test = prove().eval(function (/**Val*/) {
            return prove().Array(prove('Phone Number').String());
        });

        test.test(doc).errors.should.eql({
            1: {
                message: [
                    'Phone Number should be a string'
                ],
                value: 1
            }
        });
    });

    it('should carry path from previous instance', function () {
        var doc = 1;

        var test = prove('Test Path').eval(function (/**Val*/) {
            return prove().String();
        });

        test.test(doc).should
            .have.property('errors').eql([
                'Test Path should be a string'
            ]);
    });

    it('should override path from previous instance', function () {
        var doc = 1;

        var test = prove('Test Path').eval(function (/**Val*/) {
            return prove('New Test Path').String();
        });

        test.test(doc).should
            .have.property('errors').eql([
                'New Test Path should be a string'
            ]);
    });

    it('should return true without returning a test', function () {
        var doc = 1;

        var test = prove('Test Path').eval(function (/**Val*/) {
            return prove().eval(function () {});
        });

        test.test(doc).should.equal(true);
    });
});