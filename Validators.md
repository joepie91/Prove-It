#List of Validators

####The following methods are available on an instance of `prove`.

##Run

+ **test(value)** : Runs all tests on the current instance against the provided `value`.

##Chaining
Every validator will return the Prove instance, so validators can be chained.
To help chained validators read more clearly, you can use the following helpers anywhere in your chain:
.an, .of, .a, .and, .be, .have, .with, .is, .which. Use them for better readability; they do nothing at all.
For example:

```JavaScript
prove().it.is.a.String().and.it.has.a.length(10).and.contains('hi')
```

##Negate

+ **not&#91;validator&#93;(value)** : Reverses the results of a validator.
    + This works for all validators except for `optional`, `required`, `eval`, `try`.
    + The `not.Object` and `not.Array` validators do not accept arguments. 
```JavaScript
prove().not.String().test(1); // True
```

##Types

+ **String()** : Input should be a String type.
```JavaScript
prove().String().test('Hello'); // True
```
+ **Number()** : Input should be a Number type.
```JavaScript
prove().Number().test(1); // True
```
+ **Boolean()** : Input should be a Boolean type.
```JavaScript
prove().Boolean().test(True); // True
```
+ **Date()** : Input should be a Date type.
```JavaScript
prove().Date().test(new Date()); // True
```
+ **RegExp()** : Input should be a RegExp type.
```JavaScript
prove().RegExp().test(/^[a-zA-Z]+$/); // True
```
+ **Error()** : Input should be a Error type.
```JavaScript
prove().Error().test(new Error()); // True
```
+ **Function()** : Input should be a Function type.
```JavaScript
prove().Function().test(function () {}); // True
```
+ **Arguments()** : Input should be a Arguments type.
```JavaScript
(function () {
    prove().Arguments().test(arguments); // True
}())
```
+ **Object(...Schemas)** : Input should be an object type and adhere to the provided `Schemas`.
```JavaScript
prove().Object({
    name: prove().String()
}).test({
    name: 'Hello'
}); // True
```
+ **Array(...Tests)** : Input should be an array type and each item should adhere to the provided `Tests`.
```JavaScript
prove().Array(
    prove().Number()
).test([1]); // True
```
##Common
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

+ **optional(isOptional)** : By default a non-null input is required, this will change that.
```JavaScript
prove().optional().test(null); // True
```
+ **required(isRequired)** : By default a non-null input is required, with no arguments this will do nothing.
```JavaScript
prove().required(false).test(null); // True
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
+ **equals(...Allowed)** : Input should strictly equal one of the provided `Allowed` values.
```JavaScript
prove().equals(1).test(1); // True
```
+ **integer()** : Input should be an integer.
```JavaScript
prove().integer().test(1); // True
```
+ **precision(max)** : Input should be a Number type and have a precision less than or equal to `max`.
```JavaScript
prove().precision(1).test(1.1); // True
```
+ **divisibleBy(divisor)** : Input should be divisible by `divisor`.
```JavaScript
prove().divisibleBy(5).test(10); // True
```
+ **lessThan(max)** : Input should be less than the `max`.
```JavaScript
prove().lessThan(2).test(1); // True
```
+ **lessThanOrEquals(max)** : Input should be less than or equal to the `max`.
```JavaScript
prove().lessThanOrEquals(1).test(1); // True
```
+ **greaterThan(min)** : Input should be greater than the `min`.
```JavaScript
prove().greaterThan(1).test(2); // True
```
+ **greaterThanOrEquals(min)** : Input should be greater than or equal to the `min`.
```JavaScript
prove().greaterThanOrEquals(1).test(1); // True
```
+ **empty()** : Input should be an empty value.
```JavaScript
prove().empty().test([]); // True
```
+ **length(min=0, max)** : Input should have a length between the `min` and `max` (inclusive).
```JavaScript
prove().length(5, 15).test('Hello World'); // True
```
+ **unique()** : Input should contain only unique values.
```JavaScript
prove().unique().test([1, 2, 3]); // True
```
+ **startsWith(find)** : Input should start with the value `find`.
```JavaScript
prove().startsWith('hello').test('Hello World'); // True
```
+ **endsWith(find)** : Input should end with the value `find`.
```JavaScript
prove().endsWith('World').test('Hello World'); // True
```
+ **sorted(compare)** : Input should be sorted with an optional `compare` function.
```JavaScript
prove().sorted(function (a, b) { return b - a; }).test([3, 2, 1]); // True
```
+ **contains(...MustContain)** : Input should contain all `MustContain` values.
```JavaScript
prove().contains('Hello', ' ', 'World').test('Hello World'); // True
```
+ **matches(regExp)** : Input should pass a test with the provided `regExp`.
```JavaScript
prove().matches(/.*/).test('Hello World'); // True
```
+ **lowerCase()** : Input should be all lower case.
```JavaScript
prove().lowerCase().test('hello world'); // True
```
+ **upperCase()** : Input should be all upper case.
```JavaScript
prove().upperCase().test('HELLO WORLD'); // True
```
+ **JSON()** : Input should be able to be parsed as JSON.
```JavaScript
prove().JSON().test('{"name": "hello"}'); // True
```
##RegEx's (Strings only)

+ **alpha()** : Input should only consist of a-z and A-Z.
```JavaScript
prove().alpha().test('hello'); // True
```
+ **numeric()** : Input should only consist of 0-9 (leading '-' will still pass).
```JavaScript
prove().numeric().test('-123'); // True
```
+ **alphaNumeric()** : Input should only consist of a-z, A-Z and 0-9.
```JavaScript
prove().alphaNumeric().test('Hello1'); // True
```
+ **hex()** : Input should be a hexadecimal string.
```JavaScript
prove().hex().test('deadBEEF'); // True
```
+ **hexColor()** : Input should be a hexadecimal color.
```JavaScript
prove().hexColor().test('#ff0034'); // True
```
+ **ascii()** : Input should only consist of ascii characters.
```JavaScript
prove().ascii().test('Hello World'); // True
```
+ **html()** : Input should have some html tags.
```JavaScript
prove().html().test('</br>'); // True
```
+ **mongoId()** : Input should be a mongoId.
```JavaScript
prove().mongoId().test('54cd23bf3f8297fa82f9795b'); // True
```
+ **ip(version)** : Will test against IPV `version` if it is '4' or '6' otherwise it will try both.
```JavaScript
prove().ip(4).test('192.168.0.1'); // True
```
+ **phoneNumber()** : Input should be a phone number.
```JavaScript
prove().phoneNumber().test('1-888-555-5555'); // True
```
+ **creditCard(...ValidCards)** : Input should be 'Visa', 'MasterCard', 'AmericanExpress', 'DinersClub' 'Discover' or 'JCB' credit cards. If there are no `ValidCards` provided then any type of card will pass, otherwise only the `ValidCards` will pass.
```JavaScript
// Note: vendor names are case insensitive.
prove().creditCard('Visa').test('4716-2210-5188-5662'); // True
```
---

`Note: Where possible validators should work with multiple types, such as #length, which works on arrays and strings.`

---

Please add an issue or create a PR to request more default validators.
