Challenges
===

## Question 1
> Design a FIFO Queue Object using a JavaScript array for storage. Discuss the pros and cons of your approach. This Queue Object should have the following methods:

```javascript
var q = new Queue(); // Constructor (optional)
q.items;             // returns a listing of all elements in the queue (optional)
q.enqueue(data);     // adds data to the end of the queue (required)
q.dequeue();         // removes the first element from the queue (required)
```

**Solution #1**

```javascript
function Queue() {
    this.items = [];
}

Queue.prototype = {
    enqueue: function(data) {
        return this.items.push(data);
    },
    dequeue: function() {
        return this.items.shift();
    }
};
```

**Solution #2**

```javascript
var q = [];

Array.prototype.enqueue = function(data) {
    return this.push(data);
}

Array.prototype.dequeue = function() {
    return this.shift();
}
```

## Question 2:
> Given the following code, what is the value of `pop1` and `pop2`? What is the final structure of `arr`?

```javascript
var arr = [];

arr[100] = 'a';
arr[500] = 'b';
arr[250] = 'c';

var pop1 = arr.pop();
var pop2 = arr.pop();
```

**Solution**
```javascript
pop1 // returns 'b'
pop2 // returns undefined
// arr is a sparse array with values 'a' and 'c' stored at arr[100] and arr[250]
// and undefined from arr[0] -> arr[99], arr[101] -> arr[249], arr[251] -> arr[499]
```

> What's a better way to implement sparse arrays?

1. Make an array of objects with the special id you need as a property
```javascript
var arr = [{
    id: 100,
    value: 'a'
}, {
    // ...
}];
```

## Question #3
> What is the benefit of including `'is strict';` into your code?

## Question #4
> Understanding JavaScript types and reliable type checking

**Objects versus Primitives**

JavaScript Types
- Number
- String
- Boolean
- Object
- Null
- Undefined

Primitives - Number, String, and Boolean. Their values are unable to be changed because they are merely *values*, they have no properties.

These primitives are wrapped by  their Object counterparts when called and will dive between the Number/String/Boolean to an Object when needed (coercion). Underneath, it will construct an object, use it, then return the result.

Null and undefined are also primitives and distinguish between *no* value and an *unknown* value

Object also has a set of types that belong to it. These include:
- Function
- Array
- Date
- RegExp

> Using the `typeof` operator

From **MDN**: "The `typeof` operator returns a string indicating the type of the unevaluated operand".

What would you expect of the following?

```javascript
typeof [];
typeof {};
typeof '';
typeof new Date()
typeof 1;
typeof function () {};
typeof /test/i;
typeof true;
typeof null;
typeof undefined;
```

**Solution**

```javascript
typeof []; // object
typeof {}; // object
typeof ''; // string
typeof new Date() // object
typeof 1; // number
typeof function () {}; // function
typeof /test/i; // object
typeof true; // boolean
typeof null; // object
typeof undefined; // undefined
```

## Question #5
> Write a function that explicity returns the type of whatever you pass into it. Think of the `typeof` operator but make something that actually works.

**Solution**
`Object.prototype.toString.call();`
And then pass in anything you want

## Question #6
> What gets returned from this function given the following arguments:

```javascript
(function (x) {
    return function (x, y) {
        return function (w,z) {
            return function (w) {
                return x + y + z;
            }
        }
    }
})(1)(2, 3)(4, 5)(6)
```

## Question #7
> Bind the value `3.14159265` to the name `pi` **without** using the var keyword and use it to create a function that calculates the circumference of a circle given a diameter (i.e. `return pi * diameter`). *Note: no use of the global scope!*

```javascript
(function (pi) {
    return function (diameter) {
        return diameter * pi;
    }
})(3.14159265)
// Returns a function that calculates circumferences
```

OR:

```javascript
(function (diameter, pi) {
    return diameter * pi;
})(diameter, 3.14159265)
// Actually preferred, since we created only one environment
```

## Question #8

When initializing variables the following code block occurs:
```javascript
var someArr = [],
    someOtherArr = [];

someArr === someOtherArr; // evaluates to false even though the arrays are indeed equivalent
```

This situation occurs because every time we evaluate an express such as an Array we get a new array with a new identity. Because of this fact, what do you expect of the following?

```javascript
var x = [2012, 6, 14],
    y = x;

x === y; // evaluates to true
```

Why is this happening?

When creating new environments, the JavaScript compiler binds values to names and so that when we use these names as expressions the name evaluates as a value.

When we write `y = x` the name `x` is looked up in the current environment and its value is a specific array that was created when the expression [2012, 6, 14] was first evaluated. That same exact value is then binded to the name `y` in the new environment and thus x and y are both bound to the same exact value, which is identical to itself.

```javascript
var x = [2012, 6, 14];

(function (y) {
    return x === y;
})(x)
// evalutes to true
```

## Question #9
> Return a function that's the composition of two functions, or rather `compose (f, g)(x) -> f(g(x))`


```javascript
var compose = function(f1, f2) {
    return function (x) {
        return f1(f2(x));
    }
}
``` 

## Question #10
> Write two functions, **minimumSum** and **maximumSum**, that take in 2 parameters:

1. **values** - an array of integers with an arbitrary length. This array can hold positive or negative numbers.
2. **n** - how many integers should be summed. Will always be 0 or greater.

Example:

```javascript
var values = [5, 4, 1, 3, 2];
minimumSum(values, 2); //=> 1 + 2 = 3
maximumSum(values, 3); //=> 3 + 4 + 5 = 12
```

```javascript
function minimumSum(values, n) {
    return add(values.sort(sort), n);
}

function maximumSum(values, n) {
    return add(values.sort(sort).reverse(), n);
}

function add(values, n) {
    return values.slice(0, n).reduce(function(prev, curr) {
        return prev + curr;
    }, 0);
}

function sort(a, b) {
    return a - b;
}

```

## Question #11
> Write a function that sorts its parameters. *Hint: You may use the default `.sort()` Array method*

```javascript
function sort() {
    return [].slice.call(arguments, 0).sort();
}
```

## Question #12
> What is the result of `original` and `updated` after the following code executes:

```javascript
var original = [1, 2, 3],
    updated = original;

original.push(4);
updated.push(5);
```

Solution:

The original and updated names both act as references to the same array which gets modified on each `.push()` call.

```javascript
original; //=> [1, 2, 3, 4, 5]
updated; //=> [1, 2, 3, 4, 5]
```

## Question #13
> Consider the following:

```javascript
''    ? 'truthy' : 'falsy' //=> falsy
0     ? 'truthy' : 'falsy' //=> falsy
false ? 'truthy' : 'falsy' //=> falsy
```

What would the following result in?

```javascript
new String('')      ? 'truthy' : 'falsy' //=> truthy
new Number(0)       ? 'truthy' : 'falsy' //=> truthy
new Boolean(false)  ? 'truthy' : 'falsy' //=> truthy
```

## Question #14
> Write an extension to `Array` that performs the following: `Array.range(0, 3); //=> [0, 1, 2]`. 

This function takes in two values, `start` and `count`. It returns a `count` amount of numbers from start. Bonus points if you don't use a for loop, while loop, etc.


Solution:
```javascript
Array.range = function(start, count) {
    return Array.call(null, Array(count)).map(function(val, index) {
        return start + index;
    });
};
```

## Question #15
> Implement a function named `pluck` which takes an array of objects and a property name and returns an array containing the named property values of each object

```javascript
// Example
pluck([{ a: 1 }, { a: 2 }], 'a') //=> [1, 2]
```

*Any missing properties can be left as null or undefined*

Bonus points if you don't use a for loop, while loop, etc.

Solution:
```javascript
function pluck(objs, name) {
  return objs.map(function(obj) { 
    return obj[name] 
  });
}
```