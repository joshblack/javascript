Questions
===

## Question 1
> Design a FIFO Queue Object using a JavaScript array for storage. Discuss the pros and cons of your approach. This Queue Object should have the following methods:

```javascript
var q = new Queue(); // Constructor (optional)
q.items;             // returns a listing of all elements in the queue (optional)
q.enqueue(data);     // adds data to the end of the queue (required)
q.dequeue();         // removes the first element from the queue (required)
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

> What's a better way to implement the resulting array?

## Question #3
> What is the benefit of including `'is strict';` into your code?

## Question #4
From **MDN**: "The `typeof` operator returns a string indicating the type of the unevaluated operand".

> What would you expect of the following?

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

## Question #5
> Write a function that explicity returns the type of whatever you pass into it. Think of the `typeof` operator but instead this function returns the actual type of what you pass into it. E.g. `fn([])` would return `[Object Array]` instead of `typeof []` returning `object`

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



