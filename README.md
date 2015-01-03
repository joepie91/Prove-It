![Prove It](https://raw.githubusercontent.com/DylanPiercey/Prove-It/master/prove-logo.jpg)
```
Create composable, re-usable validators with in-depth, client-friendly error messages.
```
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/DylanPiercey/Prove-It?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build](https://travis-ci.org/DylanPiercey/Prove-It.svg?branch=master)](https://travis-ci.org/DylanPiercey/Prove-It)
[![Code Climate](https://codeclimate.com/github/DylanPiercey/Prove-It/badges/gpa.svg)](https://codeclimate.com/github/DylanPiercey/Prove-It)
[![Test Coverage](https://codeclimate.com/github/DylanPiercey/Prove-It/badges/coverage.svg)](https://codeclimate.com/github/DylanPiercey/Prove-It)
[![npm](https://img.shields.io/npm/dm/prove-it.svg)](https://www.npmjs.com/package/prove-it)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/dylanpiercey.svg)](https://saucelabs.com/u/dylanpiercey)

###[See the list of default validators](https://github.com/DylanPiercey/Prove-It/blob/master/Validators.md)


#Installation

###Server-side

```Console
npm install prove-it
```

```JavaScript
var prove = require('prove-it');
```

###Client-side

[Download](https://raw.githubusercontent.com/DylanPiercey/Prove-It/master/bin/prove-it.min.js)

```HTML
<script type="text/javascript" src="prove-it.min.js"></script>
```

```JavaScript
window.prove; // Global prove.
```

Or install with bower

```Console
bower install prove-it

```

```JavaScript
define(['prove-it'], function (prove) {...});
```

#Goals

* Chainable validations that could be composed and extended easily.
* Validate all of the fields of an object (even deep ones).
* Validate entire arrays and collections.
* An error message structure that is both friendly and usable; for clients and developers.

#API

+ **prove(label)** : Returns a chainable validator, with an optional label for error messages.
+ **prove.concat(...Tests)** : Merges all provided validator chains, and returns a new one.
+ **prove.extend(validators)** : Adds all of the given validators to the prove validator chain (example below).
```JavaScript
prove.extend({
    myValidator: function (/** Validator chaining options */) {
        // Pre validate setup
        return {
            validator: function (val) {
                // return true for success, false for fail.
            },
            msg: '{PATH} should have failed my validator with {VALUE}' // {PATH} and {VALUE} will be interpolated.
        };
    }
});
```

####Invoking prove returns a chainable validator. For a list of validators click [here!](https://github.com/DylanPiercey/Prove-It/blob/master/Validators.md)

#Example

```JavaScript
var doc = {
    name: {
        first: 'hello',
        last: 'world'
    },
    dates: {
        start: new Date(),
        end: new Date()
    },
    phones: [
        {
            number: '5555555'
        },
        {
            number: 1,
            label: 'home',
            invalidField: 'hacks'
        }
    ]
};

var contactValidation = prove().Object({
    name: prove().Object({ // Prove nested objects.
        first: prove('First Name').String().length(4),
        last: prove('Last Name').String().length(6)
    }),
    dates: prove('Date').eval(function (date) {
        return prove().Object({
            start: prove('Start date').Date().lt(date.end),
            end: prove('End date').Date().gt(date.start)
        });
    }),
    phones: prove('Phones').Array( // Prove an entire array.
        prove().Object({
            number: prove('Phone Number').String().phoneNumber(),
            label: prove('Phone Label').String()
        })
    )
});

var result = contactValidation.test(doc); // Returns True if passed, otherwise error object.

if (!result.errors) {
    // Success!
} else {
    console.log(passed);
    // Would output all of the errors!
/**
{
    "message": "Validation failed",
    "name": "ValidationError",
    "errors": {
        "name.last": {
            "message": [
                "Last Name should have a length of at least 6"
            ],
            "value": "world"
        },
        "dates.start": {
            "message": [
                "Start date should be less than Sun Dec 28 2014 21:14:15 GMT-0700 (Mountain Standard Time)"
            ],
            "value": "2014-12-29T04:14:15.458Z"
        },
        "dates.end": {
            "message": [
                "End date should be greater than Sun Dec 28 2014 21:14:15 GMT-0700 (Mountain Standard Time)"
            ],
            "value": "2014-12-29T04:14:15.458Z"
        },
        "phones.0.label": {
            "message": [
                "Phone Label is a required field"
            ]
        },
        "phones.1.number": {
            "message": [
                "Phone Number should be a string",
                "Phone Number should be a phone number"
            ],
            "value": 1
        },
        "phones.1.invalidField": {
            "message": [
                "invalidField is not an allowed field"
            ],
            "value": "hacks"
        }
    }
}
*/
```

---

###Contributions

* Use .jshintrc file as the coding standards.
* Use grunt to run tests.

Please feel free to recommend more default validators and/or submit a PR!
