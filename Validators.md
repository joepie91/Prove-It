#Validators Table of Contents
* [Run](#run)
* [Requirements](#requirements)
* [Types](#types)
* [Negate](#negate)
* [Generic Formats](#generic)
* [Specific Formats](#specific)
* [Contents](#contents)
* [Comparision and Numeric](#comparison)
* [Utilities](#utilities)
* [Chaining](#chaining)

---

##<a name="run"></a>Run
+ **test(value)** : Runs all tests on the current instance against the provided `value`.

##<a name="requirements"></a>Requirements
+ **optional(isOptional)** : By default a non-null input is required, this will change that.

    ```JavaScript
    prove().optional().test(null); // True
    ```

+ **required(isRequired)** : By default a non-null input is required, with no arguments this will do nothing.

    ```JavaScript
    prove().required(false).test(null); // True
    ```

##<a name="types"></a>Types
+ **string()** : Input should be a String type.

    ```JavaScript
    prove().string().test('Hello'); // True
    ```

+ **number()** : Input should be a Number type.

    ```JavaScript
    prove().number().test(1); // True
    ```

+ **boolean()** : Input should be a Boolean type.

    ```JavaScript
    prove().boolean().test(true); // True
    ```

+ **date()** : Input should be a Date type.

    ```JavaScript
    prove().date().test(new Date()); // True
    ```

+ **array(...Tests)** : Input should be an array type and each item should adhere to the provided `Tests`.

    ```JavaScript
    prove().array(
        prove().number()
    ).test([1]); // True
    ```

+ **object(...Schemas)** : Input should be an object type and adhere to the provided `Schemas`.

    ```JavaScript
    prove().object({
        name: prove().string()
    }).test({
        name: 'Hello'
    }); // True
    ```

+ **function()** : Input should be a Function type.

    ```JavaScript
    prove().function().test(function () {}); // True
    ```

+ **error()** : Input should be a Error type.

    ```JavaScript
    prove().error().test(new Error()); // True
    ```

+ **regExp()** : Input should be a RegExp type.

    ```JavaScript
    prove().regExp().test(/^[a-zA-Z]+$/); // True
    ```

+ **arguments()** : Input should be a Arguments type.

    ```JavaScript
    (function () {
        prove().arguments().test(arguments); // True
    }())
    ```

##<a name="negate"></a>Negate
+ **not&#91;validator&#93;(value)** : Reverses the results of a validator.
    + This works for all validators except for `optional`, `required`, `annotate`, `eval` and `try`.

    ```JavaScript
    prove().not.String().test(1); // True
    ```

##<a name="generic"></a>Generic Formats
+ **integer()** : Input should be an integer.

    *Supported types:* `Number`
    ```JavaScript
    prove().integer().test(1); // True
    ```

+ **alpha()** : Input should only consist of a-z and A-Z.

    *Supported types:* `String`
    ```JavaScript
    prove().alpha().test('hello'); // True
    ```

+ **numeric()** : Input should only consist of 0-9 (leading '-' will still pass).

    *Supported types:* `String`
    ```JavaScript
    prove().numeric().test('-123'); // True
    ```

+ **alphaNumeric()** : Input should only consist of a-z, A-Z and 0-9.

    *Supported types:* `String`
    ```JavaScript
    prove().alphaNumeric().test('Hello1'); // True
    ```

+ **lowerCase()** : Input should be all lower case.

    *Supported types:* `String`
    ```JavaScript
    prove().lowerCase().test('hello world'); // True
    ```

+ **upperCase()** : Input should be all upper case.

    *Supported types:* `String`
    ```JavaScript
    prove().upperCase().test('HELLO WORLD'); // True
    ```

+ **hex()** : Input should be a hexadecimal string.

    *Supported types:* `String`
    ```JavaScript
    prove().hex().test('deadBEEF'); // True
    ```

+ **ascii()** : Input should only consist of ascii characters.

    *Supported types:* `String`
    ```JavaScript
    prove().ascii().test('Hello World'); // True
    ```

##<a name="specific"></a>Specific Formats
+ **json()** : Input should be able to be parsed as JSON.

    *Supported types:* `Any`
    ```JavaScript
    prove().json().test('{"name": "hello"}'); // True
    ```

+ **html()** : Input should have some html tags.

    *Supported types:* `String`
    ```JavaScript
    prove().html().test('</br>'); // True
    ```

+ **phoneNumber()** : Input should be a phone number.

    *Supported types:* `String`
    ```JavaScript
    prove().phoneNumber().test('1-888-555-5555'); // True
    ```

+ **creditCard(...ValidCards)** : Input should be 'Visa', 'MasterCard', 'AmericanExpress', 'DinersClub' 'Discover' or 'JCB' credit cards. If there are no `ValidCards` provided then any type of card will pass, otherwise only the `ValidCards` will pass.

    *Supported types:* `String`
    ```JavaScript
    // Note: vendor names are case insensitive.
    prove().creditCard('Visa').test('4716-2210-5188-5662'); // True
    ```

+ **ip(version)** : Will test against IPV `version` if it is '4' or '6' otherwise it will try both.

    *Supported types:* `String`
    ```JavaScript
    prove().ip(4).test('192.168.0.1'); // True
    ```

+ **hexColor()** : Input should be a hexadecimal color.

    *Supported types:* `String`
    ```JavaScript
    prove().hexColor().test('#ff0034'); // True
    ```

+ **mongoId()** : Input should be a mongoId.

    *Supported types:* `String`, `Object`
    ```JavaScript
    prove().mongoId().test('54cd23bf3f8297fa82f9795b'); // True
    ```

##<a name="contents"></a>Contents
+ **empty()** : Input should be an empty value.

    *Supported types:* `String`, `Array`, `Object`
    ```JavaScript
    prove().empty().test([]); // True
    ```

+ **length(min=0, max)** : Input should have a length between the `min` and `max` (inclusive).

    *Supported types:* `String`, `Array`, `Function`
    ```JavaScript
    prove().length(5, 15).test('Hello World'); // True
    ```

+ **unique()** : Input should contain only unique values.

    *Supported types:* `String`, `Array`, `Object`
    ```JavaScript
    prove().unique().test([1, 2, 3]); // True
    ```

+ **contains(...MustContain)** : Input should contain all `MustContain` values.

    *Supported types:* `String`, `Array`
    ```JavaScript
    prove().contains('Hello', ' ', 'World').test('Hello World'); // True
    ```

+ **matches(regExp)** : Input should pass a test with the provided `regExp`.

    *Supported types:* `String`
    ```JavaScript
    prove().matches(/.*/).test('Hello World'); // True
    ```

+ **startsWith(find)** : Input should start with the value `find`.

    *Supported types:* `String`, `Array`
    ```JavaScript
    prove().startsWith('hello').test('Hello World'); // True
    ```

+ **endsWith(find)** : Input should end with the value `find`.

    *Supported types:* `String`, `Array`
    ```JavaScript
    prove().endsWith('World').test('Hello World'); // True
    ```

+ **sorted(compare)** : Input should be sorted with an optional `compare` function.

    *Supported types:* `String`, `Array`
    ```JavaScript
    prove().sorted(function (a, b) { return b - a; }).test([3, 2, 1]); // True
    ```

##<a name="comparison"></a>Comparision and Numeric
+ **equals(...Allowed)** : Input should strictly equal one of the provided `Allowed` values.

    *Supported types:* `Any`
    ```JavaScript
    prove().equals(1).test(1); // True
    ```

+ **min(max)** : Input should be less than or equal to the `max`.

    *Supported types:* `String`, `Number`, `Date`
    ```JavaScript
    prove().min(1).test(1); // True
    ```

+ **max(min)** : Input should be greater than or equal to the `min`.

    *Supported types:* `String`, `Number`, `Date`
    ```JavaScript
    prove().max(1).test(1); // True
    ```

+ **less(max)** : Input should be less than the `max`.

    *Supported types:* `String`, `Number`, `Date`
    ```JavaScript
    prove().less(2).test(1); // True
    ```

+ **more(min)** : Input should be greater than the `min`.

    *Supported types:* `String`, `Number`, `Date`
    ```JavaScript
    prove().more(1).test(2); // True
    ```

+ **precision(max)** : Input should be a Number type and have a precision less than or equal to `max`.

    *Supported types:* `Number`
    ```JavaScript
    prove().precision(1).test(1.1); // True
    ```

+ **divisibleBy(divisor)** : Input should be divisible by `divisor`.

    *Supported types:* `Number`
    ```JavaScript
    prove().divisibleBy(5).test(10); // True
    ```

##<a name="utilities"></a>Utilities
+ **annotate(annotations)** : Adds an annotation object to the current error.

    ```JavaScript
    prove().String().annotate({ label: 'My Label' }).test(1);
    
    /**
    * Returns
    * {
    *    "name": "ValidationError",
    *    "message": "Validation Failed",
    *    "errors": [
    *       {
    *           type: 'String', // The name of the failed validator.
    *           value: 1, // The value that failed the validator.
    *           label: 'My Label' // A custom annotation added to the error.
    *       }
    *    ]
    * }
    */
    
    ```
+ **eval(...Functions)** : Will pass the input to all provided `Functions`, the function can then return another test that will act as if it was on the same prove-it chain (Path is carried on but can be overwritten).

    ```JavaScript
    prove().eval(function (input) {
        // ... Do Stuff with input/modify test.
        return prove().Number(); // Return a test.
    }).test(1); // True
    ```

+ **try(...Tests)** : Input will be passed through provided `Tests`. If any tests pass, the validation will pass, otherwise all failed tests will be added as errors.

    ```JavaScript
    prove().try(
        prove().Number(),
        prove().String()
    ).test(1); // True
    ```

##<a name="chaining"></a>Chaining
Every validator will return the Prove instance, so validators can be chained.
To help chained validators read more clearly, you can use the following helpers anywhere in your chain:
.an, .of, .a, .and, .be, .have, .with, .is, .which. Use them for better readability; they do nothing at all.
For example:

```JavaScript
prove().it.is.a.String().and.it.has.a.length(10).and.contains('hi')
```


---

Please add an issue or create a PR to request more default validators.
