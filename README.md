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
* Chainable validators that read clearly.
* Composable validators that make sense.
* Schema validation for complex objects, arrays and collections.
* An error message structure that is both friendly for developers and extensible on the client side.

#Plugins
* [MongoDB (Monk)](https://github.com/DylanPiercey/Monk-Prove)
* [Koa](https://github.com/DylanPiercey/Koa-Prove)
* More to come!

#API

+ **prove()** : Returns a chainable validator.
+ **prove.concat(...Tests)** : Merges all provided validator chains, and returns a new one.
+ **prove.extend(validators)** : Adds all of the given validators to the prove validator chain (example below).
```JavaScript
prove.extend({
    myValidator: function (/** Validator chaining options */) {
        // Pre validate setup
        return function (val) {
            // return true for success, false for fail.
        };
    }
});

prove().myValidator(/** options */).test(null)
```

###For a list of validators click [here!](https://github.com/DylanPiercey/Prove-It/blob/master/Validators.md)

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
        first: prove().String().length(4),
        last: prove().String().length(6)
    }),
    dates: prove().eval(function (date) {
        return prove().Object({
            start: prove().Date().lt(date.end),
            end: prove().Date().gt(date.start)
        });
    }),
    phones: prove().Array( // Prove an entire array.
        prove().Object({
            number: prove().String().phoneNumber(),
            label: prove().String()
        })
    )
});

var result = contactValidation.test(doc); // Returns True if passed, otherwise error object.

if (result instanceof Error) {
    console.log(result);
    // Would output all of the errors!
/**
{
    "name": "ValidationError",
    "message": "Validation Failed",
    "errors": {
        "name.last": [
            {
                "type": "length",
                "value": "world",
                "args": [
                    6
                ]
            }
        ],
        "dates.start": [
            {
                "type": "lt",
                "value": "2015-01-19T03:16:55.873Z",
                "args": [
                    "2015-01-19T03:16:55.873Z"
                ]
            }
        ],
        "dates.end": [
            {
                "type": "gt",
                "value": "2015-01-19T03:16:55.873Z",
                "args": [
                    "2015-01-19T03:16:55.873Z"
                ]
            }
        ],
        "phones.0.label": [
            {
                "type": "required"
            }
        ],
        "phones.1.number": [
            {
                "type": "String",
                "value": 1
            },
            {
                "type": "phoneNumber",
                "value": 1
            }
        ],
        "phones.1.invalidField": [
            {
                "type": "extraField",
                "value": "hacks"
            }
        ]
    }
}
*/
} else {
    // Success!
}
```

---

###Contributions

* Use .jshintrc file as the coding standards.
* Use grunt to run tests.

Please feel free to recommend more default validators and/or submit a PR!
