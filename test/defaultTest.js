'use strict';

var should = require('should');
var prove = require('../lib/index.js');
var common = require('../lib/commonValues.js');

var log = function (doc) {
    console.log(JSON.stringify(doc, null, 4));

    return {
        errors: {}
    };
};


var test = function (options) {
    if (!options.check) {
        throw new Error('No validator specified for test');
    }

    if (options.valid) {
        options.valid.forEach(function (value) {
            var instance = prove(JSON.stringify(value, null, 2));
            var validator = instance[options.check].apply(instance, options.args || []);
            var message = validator.test(value);

            if (true !== message) {
                throw new Error(JSON.stringify(message.errors || message, null, 2));
            }
        });
    }

    if (options.invalid) {
        options.invalid.forEach(function (value) {
            var instance = prove();
            var validator = instance[options.check].apply(instance, options.args || []);
            var message = validator.test(value);

            if (true === message) {
                throw new Error(
                    '[ ' + options.check + ' ]' +
                    ' should have failed with: ' +
                    JSON.stringify(value)
                );
            }
        });
    }
};

describe('Default Validators', function () {
    it('"String" should confirm value is a string', function () {
        test({
            check: 'String',
            valid: [
                new String(''),
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.booleanString0,
                common.booleanString1,
                common.typeEmailAddress,
                common.typeMongoIdString
            ],
            invalid: [
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.booleanTrue,
                common.booleanFalse,
                common.booleanInt0,
                common.booleanInt1,
                common.valueNull
            ]
        });
    });

    it('"Number" should confirm value is a number', function () {
        test({
            check: 'Number',
            valid: [
                new Number(1),
                common.booleanInt0,
                common.booleanInt1,
                common.floatNumber,
                common.integerNumber
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"Boolean" should confirm value is a boolean', function () {
        test({
            check: 'Boolean',
            valid: [
                new Boolean(true),
                common.booleanFalse,
                common.booleanTrue
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"Date" should confirm value is a date', function () {
        test({
            check: 'Date',
            valid: [
                new Date()
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.booleanFalse,
                common.booleanTrue,
                common.objectIntegers,
                common.arrayIndexedIntegers,
                common.valueNull
            ]
        });
    });

    it('"RegExp" should confirm value is a RegExp', function () {
        test({
            check: 'RegExp',
            valid: [
                /./,
                new RegExp('.')
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"Function" should confirm value is a Function', function () {
        test({
            check: 'Function',
            valid: [
                function () {},
                new Function()
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"Object" should confirm value is a Object', function () {
        test({
            check: 'Object',
            valid: [
                common.objectIntegers,
                common.objectStrings
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"Array" should confirm value is a Array', function () {
        test({
            check: 'Array',
            valid: [
                common.arrayEmpty,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings
            ],
            invalid: [
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.objectIntegers,
                common.objectStrings,
                common.valueNull
            ]
        });
    });

    it('"error" should always add an error message', function () {
        test({
            check: 'error',
            valid: [],
            invalid: [
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.booleanTrue,
                common.booleanFalse,
                common.booleanInt0,
                common.booleanInt1,
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.booleanString0,
                common.booleanString1,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });
    });

    it('"try" should try multiple validators', function () {
        // Both trys fail. (error).
        prove().try(
            prove('Value').error('{PATH}1 should error'),
            prove('Value').error('{PATH}2 should error')
        ).test('').should
            .have.property('errors').eql(['Value1 should error', 'Value2 should error']);

        // One try passes (success).
        prove().try(
            prove('Value').String(),
            prove('Value').Number()
        ).test('').should.equal(true);

        // Ignore non-tests
        prove().try(
            null,
            {},
            function () {},
            prove('Value').String()
        ).test(1).should
            .have.property('errors').eql(['Value should be a string']);
    });

    it('"equals" should that a value equals another', function () {
        test({
            check: 'equals',
            args: [1],
            valid: [
                1
            ],
            invalid: [
                common.integerNumber,
                common.floatNumber,
                common.numericExponentNumber,
                common.booleanTrue,
                common.booleanFalse,
                common.booleanInt0,
                common.asciiString,
                common.asciiStringWithApostrophe,
                common.slavicString,
                common.russianString,
                common.kanjiString,
                common.hiraganaString,
                common.aftricanString,
                common.arabicString,
                common.newLineNString,
                common.newLineNRString,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                common.valueEmptyString,
                common.numericStringNumber,
                common.booleanString0,
                common.booleanString1,
                common.typeEmailAddress,
                common.typeMongoIdString,
                common.valueNull
            ]
        });

        // Multiple equals
        prove('It').equals('hello', 'world').test('hi').should
            .have.property('errors').eql(['It should equal hello or world']);
        // One equals
        prove('It').equals('hello').test('hi').should
            .have.property('errors').eql(['It should equal hello']);
        // Null equals
        prove('It').equals().test('hi').should
            .have.property('errors').eql(['It should equal nothing']);
    });

    it('"integer" should confirm a value has no decimal places', function () {
        test({
            check: 'integer',
            valid: [0, -1, -2],
            invalid: [1.2, 2.34, 3.456]
        });
    });

    it('"precision" should confirm a value has a maximum number of decimal places', function () {
        test({
            check: 'precision',
            args: [1],
            valid: [0, -1, 2, 1.2],
            invalid: [2.34, 3.456]
        });
    });

    it('"divisibleBy" should confirm a value is divisible by another', function () {
        test({
            check: 'divisibleBy',
            args: [5],
            valid: [0, 5, 10, 15, 20],
            invalid: [1, 2, 3, 4, 6]
        });
    });

    it('"lt" should confirm value is an less than a provided number', function () {
        test({
            check: 'lt',
            args: [1],
            valid: [0, -1, -2],
            invalid: [1, 2, 3]
        });
    });

    it('"lte" should confirm value is an less or equal to a provided number', function () {
        test({
            check: 'lte',
            args: [1],
            valid: [1, 0, -1],
            invalid: [2, 3, 4]
        });
    });

    it('"gt" should confirm value is an greater than a provided number', function () {
        test({
            check: 'gt',
            args: [1],
            valid: [2, 3, 4],
            invalid: [-1, 0, 1]
        });
    });

    it('"gte" should confirm value is an greater or equal to a provided number', function () {
        test({
            check: 'gte',
            args: [1],
            valid: [1, 2, 3],
            invalid: [-2, -1, 0]
        });
    });

    it('"length" should confirm values length is within a range', function () {
        test({
            check: 'length',
            args: [1, 5],
            valid: [
                'a',
                'ab',
                'abc',
                'abcd',
                'abcde',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings
            ],
            invalid: [
                'abcdef',
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });

        // With no arguments it should be gte 0 length.
        test({
            check: 'length',
            args: [],
            valid: [
                'a',
                'ab',
                'abc',
                'abcd',
                'abcde',
                common.arrayEmpty,
                common.valueEmptyString,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings
            ],
            invalid: [
                {}
            ]
        });
    });

    it('"startsWith" should confirm values starts with a given value', function () {
        test({
            check: 'startsWith',
            args: ['hello'],
            valid: [
                'hello',
                'hello world'
            ],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });
    });

    it('"endsWith" should confirm values ends with a given value', function () {
        test({
            check: 'endsWith',
            args: ['world'],
            valid: [
                'world',
                'hello world'
            ],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                'hello',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });
        test({
            check: 'endsWith',
            args: [],
            valid: [
                [undefined]
            ],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                'hello',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });
    });

    it('"contains" should confirm values contains a given value', function () {
        test({
            check: 'contains',
            args: ['world'],
            valid: [
                'world',
                'hello world',
                'a world of wonders'
            ],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                'hello',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });

        // Multiple contains
        prove('It').contains('hello', 'world').test('hi').should
            .have.property('errors').eql(['It should contain hello and world']);
        // One contain
        prove('It').contains('hello').test('hi').should
            .have.property('errors').eql(['It should contain hello']);
        // No contains
        prove('It').contains().test('hi').should
            .have.property('errors').eql(['It should contain nothing']);
    });

    it('"matches" should confirm values matches a given RegExp', function () {
        test({
            check: 'matches',
            args: [new RegExp('^world')],
            valid: [
                'world',
                'world hello'
            ],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                'hello',
                'hello world',
                'a world of wonders',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });
    });

    it('"lowerCase" should confirm a value is lowercase', function () {
        test({
            check: 'lowerCase',
            valid: [
                'world',
                'world hello'
            ],
            invalid: [
                'ABC',
                'ABCd',
                'abcD',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty
            ]
        });
    });

    it('"upperCase" should confirm a value is uppercase', function () {
        test({
            check: 'upperCase',
            valid: [
                'ABC',
                'ABCD',
                'A'
            ],
            invalid: [
                'worlD',
                'world hello',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty
            ]
        });
    });
    
    it('"JSON" should confirm a value is parseable JSON', function () {
        test({
            check: 'JSON',
            valid: [
                '{ "key": "value" }'
            ],
            invalid: [
                '{ key: "value" }',
                { "key": "value" },
                { key: 'value' },
                '{ \'key\': \'value\' }'
            ]
        })
    });
    
    it('"alpha" should confirm a value is only letters', function () {
        test({
            check: 'alpha',
            valid: [
                'ABC',
                'ABCD',
                'A'
            ],
            invalid: [
                'world1',
                'world/',
                common.aftricanString,
                common.arabicString,
                common.hiraganaString,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty
            ]
        });
    });
    
    it('"numeric" should confirm a value is only numbers', function () {
        test({
            check: 'numeric',
            valid: [
                '1',
                '12',
                '-12'
            ],
            invalid: [
                'world1',
                'world/',
                common.aftricanString,
                common.arabicString,
                common.hiraganaString,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty
            ]
        });
    });
    
    it('"alphaNumeric" should confirm a value is only letters and numbers', function () {
        test({
            check: 'alphaNumeric',
            valid: [
                '1',
                '12',
                'ABC',
                'ABCD',
                'A',
                'world1'
            ],
            invalid: [
                'world/',
                common.aftricanString,
                common.arabicString,
                common.hiraganaString,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty
            ]
        });
    });
        
    it('"hex" should confirm a value is a hexadecimal string', function () {
        test({
            check: 'hex',
            valid: [
                'deadBEEF',
                'ff0044'
            ],
            invalid: [
                'abcdefg',
                '',
                '..'
            ]
        });
    });
    
    it('"hexColor" should confirm a value is a hex-color string', function () {
        test({
            check: 'hexColor',
            valid: [  
                '#ff0034',
                '#CCCCCC',
                'fff',
                '#f00'
            ],
            invalid: [  
                '#ff',
                'fff0',
                '#ff12FG'
            ]
        });
    });
    
    it('"ascii" should confirm a value is an ascii string', function () {
        test({
            check: 'ascii',
            valid: [  
                'foobar',
                '0987654321',
                'test@example.com',
                '1234abcDEF'
            ],
            invalid: [  
                'ｆｏｏbar',
                'ｘｙｚ０９８',
                '１２３456',
                'ｶﾀｶﾅ'
            ]
        });
    });
    
    it('"ip" should confirm a value is ipv4 or ipv6', function () {
        test({  
            check:'ip',
            valid:[  
                '127.0.0.1',
                '0.0.0.0',
                '255.255.255.255',
                '1.2.3.4',
                '::1',
                '2001:db8:0000:1:1:1:1:1'
            ],
            invalid:[  
                'abc',
                '256.0.0.0',
                '0.0.0.256',
                '26.0.0.256'
            ]
        });
        
        test({  
            check:'ip',
            args:[4],
            valid:[  
                '127.0.0.1',
                '0.0.0.0',
                '255.255.255.255',
                '1.2.3.4'
            ],
            invalid:[  
                '::1',
                '2001:db8:0000:1:1:1:1:1'
            ]
        });
        
        test({  
            check:'ip',
            args:[6],
            valid:[  
                '::1',
                '2001:db8:0000:1:1:1:1:1'
            ],
            invalid:[  
                '127.0.0.1',
                '0.0.0.0',
                '255.255.255.255',
                '1.2.3.4'
            ]
        });
    });
    
    it('"phoneNumber" should confirm a value is a phone numbers', function () {
        test({
            check: 'phoneNumber',
            valid: [
                '5459634',
                '-3459634',
                '266 1234',
                '266-1234',
                '636 48018',
                '(089) / 636-48018',
                '403 266 1234',
                '(403) 266-1234',
                '1 403 266 1234',
                '+1-403-266-1234',
                '49 89 636 48018',
                '+49-89-636-48018',
                '191 403 266 1234',
                '+191-403-266-1234'
            ],
            invalid: [
                '*555-555-5555',
                '55S-555-5555',
                '+191-403-266-1234-867-5309'
            ]
        });
    });
    
    it('"creditCard" should confirm a value is a credit card', function () {
        test({
            check: 'creditCard',
            valid: [  
                '375556917985515',
                '36050234196908',
                '4716461583322103',
                '4716-2210-5188-5662',
                '4929 7226 5379 7141',
                '5398228707871527'
            ],
            invalid: [
                'foo',
                'foo',
                '539822870787128'
            ]
        });
        
        // Only allow visa card
        test({
            check: 'creditCard',
            args: ['Visa'],
            valid: [  
                '4716461583322103',
                '4716-2210-5188-5662',
                '4929 7226 5379 7141'
            ],
            invalid: [
                'foo',
                'foo',
                '375556917985515',
                '36050234196908',
                '5398228707871527',
                '539822870787128'
            ]
        });
    });
});