'use strict';

var should = require('should');
var prove = require('../lib/index.js');

describe('Chain Validator', function () {

    it('should not accept null or undefined for all tests', function () {
        var validators = prove();

        for (var name in validators) {
            if (validators.hasOwnProperty(name) && !/test|optional|required|selected|path|isRequired/.test(name)) {
                prove()[name]().test(undefined).should.not.equal(true);
                prove()[name]().test(null).should.not.equal(true);
                prove()[name]().required().test(undefined).should.not.equal(true);
                prove()[name]().required().test(null).should.not.equal(true);
            }
        }
    });

    it('should accept null or undefined if optional or required(false) is chained', function () {
        prove().optional().test(undefined).should.equal(true);
        prove().optional(true).test(null).should.equal(true);
        prove().required(false).test(undefined).should.equal(true);
        prove().required(false).test(null).should.equal(true);
    });

    it('should allow for string instance as error message', function () {
        prove('Test').error(new String('{PATH} has failed')).test('hi').should
            .have.property('errors').eql(['Test has failed']);
    });

    it('should not add a non string error', function () {
        prove('Test').error(1).test('hi').should.equal(true);
    });

    it('should be able to concat two instances', function () {
        var instance1 = prove('Value1').error('{PATH} instance1');
        var instance2 = prove('Value2').error('{PATH} instance2');
        var merged = prove.concat(instance1, instance2);

        merged.test('').should
            .have.property('errors').eql([
                'Value1 instance1',
                'Value1 instance2'
            ]);

        instance1.test('').should
            .have.property('errors').eql(['Value1 instance1']);
        instance2.test('').should
            .have.property('errors').eql(['Value2 instance2']);
    });

    it('should if the first concated instance has no path it will grab it from the next instance', function () {
        var instance1 = prove().error('{PATH} instance1');
        var instance2 = prove('Value2').error('{PATH} instance2');
        var merged = prove.concat(instance1, instance2);

        merged.test('').should
            .have.property('errors').eql([
                'Value2 instance1',
                'Value2 instance2'
            ]);

        instance1.test('').should
            .have.property('errors').eql([' instance1']);
        instance2.test('').should
            .have.property('errors').eql(['Value2 instance2']);
    });
    // It should evaluate all chained validators
});