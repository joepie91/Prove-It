#List of Validators

####The following methods are available on an instance of `prove`.

##Run

+ **test(value)** : Runs all tests on the current instance against the provided `value`.

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
+ **Function()** : Input should be a Function type.
```JavaScript
prove().Function().test(function () {}); // True
```
+ **Object(...Schemas)** : Input should be an object type and adhere to the provided `Schemas`.
```JavaScript
/**
* Note:
* If a key starts with '/' and ends with '/'
* it will be treated as a RegExp String and can match multiple properties.
* 
* Eg.
* { '/name|title/': prove()... } // Matches name or title (RegExp).
*/
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

+ **optional()** : By default a non-null input is required, this will change that.
```JavaScript
prove().optional().test(null); // True
```
+ **error(msg)** : Any input will error and the `msg` argument will be the error.
```JavaScript
prove().error('{PATH} will never be true!').test(1); // Prove-It Error
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
+ **lt(max)** : Input should be less than the `max`.
```JavaScript
prove().lt(2).test(1); // True
```
+ **lte(max)** : Input should be less than or equal to the `max`.
```JavaScript
prove().lt(1).test(1); // True
```
+ **gt(min)** : Input should be greater than the `min`.
```JavaScript
prove().gt(1).test(2); // True
```
+ **gte(min)** : Input should be greater than or equal to the `min`.
```JavaScript
prove().gte(1).test(1); // True
```
+ **length(min=0, max)** : Input should have a length between the `min` and `max` (inclusive).
```JavaScript
prove().length(5, 15).test('Hello World'); // True
```
+ **startsWith(find)** : Input should start with the value `find`.
```JavaScript
prove().startsWith('hello').test('Hello World'); // True
```
+ **endsWith(find)** : Input should end with the value `find`.
```JavaScript
prove().endsWith('World').test('Hello World'); // True
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
+ **ip(version)** : Will test against IPV `version` if it is '4' or '6' otherwise it will try both.
```JavaScript
prove().ip(4).test('192.168.0.1'); // True
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