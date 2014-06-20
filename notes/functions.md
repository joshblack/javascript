Functions
===

Every time a function is invoked ("invoked" means "applied to zero or more arguments"), a new *environment* is created. An environment is a (possibly empty) dictionary that maps variables to values by name.

Say we have the following:
```javascript
(function (x) {
    return x;
})(2);
```

What happens is this:

1. JavaScript parses this whole thing as an expression made up of several sub-expressions
2. It then starts evaluating the expression, including evaluating sub-expressions
3. One sub-expression, `function (x) { return x; }` evaluates to a function
4. Another, `2`, evaluates to the number 2
5. JavaScript now evaluates applying the function to the argument `2`
6. An environment is created
7. The value `2` is bound to the name `x` in this environment
8. The expression `x` (right side of the function) is evaluated within the environment that was just created
9. The value of a variable when evaluated in an environment is the value bound to the variable's name in that environment which is `2`
10. We get our result


## Closures and Scopes

*free variable* is one that is not bound within the function.

Example: `function (y) { return x; }`, `x` is a free variable

Variables used in a function can either be *bound* or *free*. Therefore, functions containing no free variables are called *pure* functions while functions containing one more free variables are called *closures*.

A pure function can contain a closure, example:

```javascript
function (x) {
    return function (y) {
        return x;
    }
}
```

Closures work by evaluating free variables in the context of their parents environment. Say we have the following:

```javascript
function(x) {
    return (function (y) {
        return x;
    });
}(1);
```

The environment for `function (x)` is `{x: 1, ...}` while if we evaluated `function (y)` with `(2)` then its environment would be `{y: 2, '..': { x: 1, ...}}`.

**Whenever a function is applied to arguments, its environment always has a reference to its parent environment.**

Some combinatorial logic trivia:
```javascript
function (x) { return x; } // called the I Combinator or Identity Function
function (x) { return (function (y) { return x; }) } // is called the K Combinator or Kestrel
```

The idea of *currying* allows us to transforms functions like the following:
```javascript
function (x, y, z) {
    return x + y + z;
}
```

Into a function that takes multiple arguments in such a way that it can be called as a chain of functions, each with a single argument.

```javascript
function (x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}
```

We can call this second function with `(1)(2)(3)` instead of `(1, 2, 3)`. Calling a curried function with only some of its arguments is called *partial application*.

Also, in the above example variables are redefined. When a variable has the same name as an ancestor environment's binding, it is said to *shadow* the ancestor.

## Naming Functions

When using the `var` keyword, we have to remember that `var fn = function () { ... }` doesn't name the function 'fn' for the same reason that `var answer = 42` doesn't name the number 42. When assigning a function to a variable, it is simply assigning an anonymous function to a name in an environment. The function itself remains anonymous.

A *named function expression* is accomplished doing the following:

```javascript
var bindingName = function actualName() {
    // ...
}
```

Here, `bindingName` is the name in the environment but `actualName` is the function's actual name.

Cool trick: `bindingName.name //=> 'actualName'`

A *function declaration` is done as follows:

```javascript
function someName() {

}
```

This behaves a little like `var someName = function someName() { ... }` except that function declarations are *hoisted*. So what does that mean? Consider the following:

```javascript
(function () {
    return someName;

    var someName = function someName () {
        // ...
    }
})() //=> undefined
```

This acts as if we are doing the following:

```javascript
(function () {
    var someName;

    return someName;

    someName = function someName () {
        // ...
    }
})()
```

So `someName` is declared but not initialized. If we leave out the var we have a function declaration which will work perfectly.

```javascript
(function () {
    return someName;

    function someName () {
        // ...
    }
})

// will behave just like...
(function () {
    var someName = function someName() {
    // ...
    }

    return someName;
})
```

## Combinators and Function Decorators

> A Function that either takes functions as arguments or returns a function (or both) is referred to as a "higher-order" function

> A combinator is a higher-order pure function that take only functions as arguments and return a function.

*Compose combinator*
```javascript
function compose (a, b) {
    return function (c) {
        return a(b(c));
    }
}
```

> Combinators are useful when you want to emphasize what you're doing and how it fits together, and more explicit code is useful when you want to emphasize what you're working with

A *function decorator* is a higher-order function that takes one function as an argument, returns another function, and the returned function is a variation of the argument function

**composition**
A basic building block is *composition*, so when we have

```javascript
function cookAndEat(food) {
    return eat(cook(food));
}
```

We are chaining two or more functions together, or rather we are *composing* them. You can compose them with explicit JavaScript code or you can generalize composition with the B combinator or *compose* that we defined earlier.

One benefit of compose is that it allows you to chain things together.

**partial application**

When a function takes multiple arguments, we "apply" the function to the arguments by evaluating it with all of the arguments, producing a value. If we only supply part of the arguments then we can't get a final value and instead get a function that represents a part of the application.

## Additional argument names

When a function is applied to arguments, JavaScript binds the values of arguments to the function's arguments names in an environment created for the function's execution. JavaScript also binds some additional names in the argument list.

We have the following:

1. `this` - bound to the function's context
2. `arguments` - contains a list of arguments passed to the function

Note: `arguments` may look like an array but it isn't. It's more of object that happens to bind some values to properties with names that look like integers starting with zero.

`arguments` always contains all of the arguments passed to a function, regardless of how many are declares.

The most common use of the `arguments` binding is to build functions that can take a variable number of arguments.