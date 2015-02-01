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
    it('should not accept null or undefined for all tests', function () {
        var validators = prove();

        for (var name in validators) {
            if (validators.hasOwnProperty(name) &&
                !/test|optional|required/.test(name) &&
                'function' === typeof validators[name]) {
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

    it('should be able to concat two instances', function () {
        var instance1 = prove().string();
        var instance2 = prove().length(5);
        var merged = prove.concat(instance1, instance2);

        merged.test(1).should
            .have.property('errors').eql([
                {
                    type: 'string',
                    value: 1
                },
                {
                    type: 'length',
                    args: [5],
                    value: 1
                }
            ]);
    });
    
    it('"not" should negate a validator', function () {
        prove().not.string().test(1).should.equal(true);
        prove().not.string().test('test').should
            .have.property('errors')
            .with.property('0').eql({
                type: 'not.string',
                value: 'test'
            });
        
        // // Should have ignored invalid validators.
        should.not.exist(prove().not.try);
        should.not.exist(prove().not.eval);
    });
    
    it('"string" should confirm value is a string', function () {
        test({
            check: 'string',
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

    it('"number" should confirm value is a number', function () {
        test({
            check: 'number',
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

    it('"boolean" should confirm value is a boolean', function () {
        test({
            check: 'boolean',
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

    it('"date" should confirm value is a date', function () {
        test({
            check: 'date',
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

    it('"regExp" should confirm value is a RegExp', function () {
        test({
            check: 'regExp',
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
    
    it('"error" should confirm value is an Error', function () {
        test({
            check: 'error',
            valid: [
                new Error()
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

    it('"function" should confirm value is a Function', function () {
        test({
            check: 'function',
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

    it('"arguments" should confirm value is an arguments object', function () {
        test({
            check: 'arguments',
            valid: [
                arguments
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
                common.arrayEmpty,
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings
            ]
        });
    });

    it('"object" should confirm value is a Object', function () {
        test({
            check: 'object',
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

    it('"array" should confirm value is a Array', function () {
        test({
            check: 'array',
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

    it('"annotate" should add an annotation to the current instance', function () {
        prove().string().annotate({
            label: 'Test'
        }).test(1)
            .should.have.property('errors')
            .with.property('0').eql({
                type: 'string',
                label: 'Test',
                value: 1
            });
    });

    it('"eval" should run a function that returns a validator', function () {
        var doc = ['555555', 1];

        prove().eval(function (/**Val*/) {
            return prove().array(prove().string());
        }).test(doc).errors.should.eql({
            1: [{
                type: 'string',
                value: 1
            }]
        });
        
        prove().eval(function (/**Val*/) {
            return prove().eval(function () {});
        }).test(doc).should.equal(true);
    });

    it('"try" should try multiple validators', function () {
        // Both trys fail. (error).
        prove().try(
            prove().number()
        ).test('').should
            .have.property('errors')
            .with.property('0').eql({
                type: 'number',
                value: ''
            });

        // One try passes (success).
        prove().try(
            prove().string(),
            prove().number()
        ).test('').should.equal(true);

        // Ignore non-tests
        prove().try(
            null,
            {},
            function () {},
            prove().string()
        ).test(1).should
            .have.property('errors')
            .with.property('0').eql({
                type: 'string',
                value: 1
            });
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

    it('"lessThan" should confirm value is an less than a provided number', function () {
        test({
            check: 'lessThan',
            args: [1],
            valid: [0, -1, -2],
            invalid: [1, 2, 3]
        });
    });

    it('"lessThanOrEquals" should confirm value is an less or equal to a provided number', function () {
        test({
            check: 'lessThanOrEquals',
            args: [1],
            valid: [1, 0, -1],
            invalid: [2, 3, 4]
        });
    });

    it('"moreThan" should confirm value is an greater than a provided number', function () {
        test({
            check: 'moreThan',
            args: [1],
            valid: [2, 3, 4],
            invalid: [-1, 0, 1]
        });
    });

    it('"moreThanOrEquals" should confirm value is an greater or equal to a provided number', function () {
        test({
            check: 'moreThanOrEquals',
            args: [1],
            valid: [1, 2, 3],
            invalid: [-2, -1, 0]
        });
    });

    it('"empty" should confirm that a value is empty', function () {
        test({
            check: 'empty',
            valid: [
                '',
                [],
                {},
                1
            ],
            invalid: [
                '1',
                [1],
                { a: '1' }
            ]
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
    
    it('"unique" should confirm that the input contains unique values', function () {
        test({
            check: 'unique',
            valid: [
                'a',
                'ab',
                'abc',
                'abcd',
                'abcde',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.objectIntegers,
                common.objectStrings
            ],
            invalid: [
                '11',
                [1, 1],
                { x: 1, y: 1 }
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

    it('"sorted" should confirm a value is sorted with a sort function', function () {
        test({
            check: 'sorted',
            valid: [
                '123',
                'abc',
                [1, 2, 3],
                ['a', 'b', 'c']
            ],
            invalid: [
                'acb',
                [1, 3, 2],
                [1, 3, 3, 2]
            ]
        });
        
        // custom test function
        test({
            check: 'sorted',
            args: [function (a, b) { return b - a; }],
            valid: [
                [3, 2, 1]
            ],
            invalid: [
                [1, 2, 3],
                [1, 3, 3, 2]
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
        
        // Empty args should be always false.
        test({
            check: 'contains',
            args: [],
            valid: [],
            invalid: [
                'abc',
                'abcd',
                'abcde',
                'abcdef',
                'hello',
                'world',
                'hello world',
                'a world of wonders',
                common.arrayIndexedIntegers,
                common.arrayIndexedStrings,
                common.arrayEmpty,
                common.valueEmptyString
            ]
        });
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
    
    it('"json" should confirm a value is parseable JSON', function () {
        test({
            check: 'json',
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
    
    it('"html" should confirm a value has html tags', function () {
        test({
            check: 'html',
            valid: [  
                '<foobar>',
                '</br>',
                '<img src=\'hi>\'/>',
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
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
                common.valueEmptyString,
                common.numericStringNumber,
                common.typeEmailAddress,
                common.typeMongoIdString,
            ]
        });
    });
    
    it('"mongoId" should confirm a value is a mongoId', function () {
        test({
            check: 'mongoId',
            valid: [
                common.typeMongoIdString,
                '54cd23bf3f8297fa82f9795b'
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
                common.valueEmptyString,
                common.numericStringNumber,
                common.typeEmailAddress,
                common.presentationalHtml,
                common.scriptHtml,
                common.otherHtml,
                'deadBEEF',
                'ff0044',
                'abcdefg',
                '',
                '..'
            ]
        });
    });
    
    it('"email" should confirm a value is an email', function () {
        test({
            check: 'email',
            valid: [
                'foo@bar.com',
                'x@x.x',
                'foo@bar.com.au',
                'foo+bar@bar.com',
                'hans.m端ller@test.com',
                'hans@m端ller.com',
                'test|123@m端ller.com',
                'test+ext@gmail.com',
                'some.name.midd.leNa.me.+extension@GoogleMail.com'
            ],
            invalid: [
                'invalidemail@',
                'invalid.com',
                '@invalid.com',
                'foo@bar.com.',
                'foo@bar.co.uk.'
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