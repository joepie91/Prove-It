![Prove It](https://raw.githubusercontent.com/DylanPiercey/Prove-It/master/prove-logo.png)

Create composable, re-usable validators with in-depth error messages.

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/DylanPiercey/Prove-It?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build](https://travis-ci.org/DylanPiercey/Prove-It.svg?branch=master)](https://travis-ci.org/DylanPiercey/Prove-It)
[![Code Climate](https://codeclimate.com/github/DylanPiercey/Prove-It/badges/gpa.svg)](https://codeclimate.com/github/DylanPiercey/Prove-It)
[![Test Coverage](https://codeclimate.com/github/DylanPiercey/Prove-It/badges/coverage.svg)](https://codeclimate.com/github/DylanPiercey/Prove-It)
[![npm](https://img.shields.io/npm/dm/prove-it.svg)](https://www.npmjs.com/package/prove-it)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/dylanpiercey.svg)](https://saucelabs.com/u/dylanpiercey)

### [See the list of default validators](https://github.com/DylanPiercey/Prove-It/blob/master/Validators.md)

# Why
Prove-It was created to validate forms, database models and requests.
It allows for quick simple validations as well as complex infinitely nested validation for collections.

* Chainable validators that read clearly.
* Composable validators that make sense.
* Schema validation for complex objects, arrays and collections.
* Designed for optimum performance. [Benchmark here](http://jsperf.com/prove-it-vs-joi).
* An error message structure that is terse and friendly for developers.

# Installation

#### Npm
```Console
npm install prove-it
```

#### Bower
```Console
bower install prove-it

```

#### [Download](https://raw.githubusercontent.com/DylanPiercey/Prove-It/master/bin/prove-it.js)
```HTML
<script type="text/javascript" src="prove-it.js"></script>
<script>
    window.prove; // Global prove if no module system in place.
</script>
```

# Example

```JavaScript
var prove = require('prove-it');

var schema = prove().object({
    username: prove().string().alphaNumeric().length(5, 30),
    password: prove().string().optional().match(/[a-zA-Z0-9]{2,30}/),
    phoneNumbers: prove().array( // Prove an entire array.
        prove().string().phoneNumber()
    )
});

var doc = {
    username: 'prove',
    password: 'it',
    phoneNumbers: [
        '123',
        '555-555-5555'
    ]
};

var result = schema.test(doc); // Returns True if passed, otherwise error object.
```

The above schema defines the following constraints:

* username
    * A required string.
    * Must contain only alpha numeric characters.
    * Between 5 and 30 characters long.
* password
    * An optional string.
    * Must satisfy custom regex.
* contacts
    * Must be an array.
    * Each element must be a string and a phone number.

# API
### For a list of validators click [here!](https://github.com/DylanPiercey/Prove-It/blob/master/Validators.md)
* **prove()** : Returns a chainable validator.
* **prove.concat(...Tests)** : Merges all provided validator chains, and returns a new one.
* **prove.extend(validators)** : Adds all of the given validators to the prove validator chain (example below).

    ```JavaScript
    prove.extend({
        myValidator: function (/** Validator chaining options */) {
            // Pre validate setup
            return function (val) {
                // return true for success, false for fail.
            };
        }
    });
    
    prove().myValidator(/** options */).test(null);
    ```

# Error Structure

```JavaScript
{
    "name": "ValidationError",
    "message": "Validation Failed",
    
    // All errors will appear here.
    "errors": {
        
        // The key is the full path of the error. In this case, the first phone number.
        'phoneNumbers.0':
        
        // Array of errors for this path.
        [
            {
                // The name of the failed validator.
                type: 'phoneNumber',
                
                // The value that was at the path (that failed).
                value: '123'
            }
        ]
    }
}
```

---

### Contributions

* Use .jshintrc file as the coding standards.
* Use grunt to run tests.

Please feel free to recommend more default validators and/or submit a PR!
