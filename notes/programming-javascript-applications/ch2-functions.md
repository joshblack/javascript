## Method Literals
Function expressions assigned to object literals are called *method literals*. Methods are functions attached to objects. The advantage of this pattern (using method literals) is that it makes it very easy to group related functions using object literals. For example, say you have a group of functions that control the state of a lightbulb:

```javascript
var lightBulb = {
    toggle: function() {},
    getState: function() {},
    off: function() {},
    on: function() {},
    blink: function() {}
};
```

**You gain a lot when you group related functions together.** Your code becomes more organized and readable. **Code in context is easier to understand and maintain.**

## Function declaration
```javascript
function foo() {
    return arguments.length;
}
```
Function declaration tends to encourage large piles of loosely related functions to grow in your module, with no real hints about what goes where, whether its public or private, or how the functions work together.

## Function expressions
```javascript
var bar = function() {
    return arguments.length;
}
```
Can assign functions to variables and can count on function expressions to follow your application logic reliably. The disadvantage is that function expressions create *anonymous* functions unless you explicitly provide a name. Imagine debugging an application and you look at its call stack, you might see something like this:

```javascript
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
(Anonymouse Function)
```

And essentially you're out of luck at this point.

### Named Function Expressions
It's possible to get the benefits of code organizaiton and conditional function definition without littering your stack traces with anonymous functions. 

Named function expressions are like anonymous function expressions in every way except that they have a name that you can use from inside the function. This name also appears in the function call stack. These are not the same as function declarations because the name you assign the function is only available from within itself. Outside of the function you must access the function through the variable it's assigned to or the parameter it's passed in on.

## Lambdas
A *lambda* is a function that is used as data. As such, they can be used the same way any other expression can: as a parameter for another function, the return value of a function, or anywhere you might use a literal value.

Lambdas are commonly used to:

- Perform operations on the other arguments passed in.
- Attach event handlers for DOM interactions.
- Pass in a *callback function* to be executed when the current function is complete.
- Wrap existing functions with additional functionality. A function that adds functionality to another function is called a *function decorator*.
- Take a function that requires multiple parameters, and return a function that requires fewer parameters (Partial Application)
- Return a function from another function (Currying)

The important point is that lambdas are treated like data that can be passed around as inputs and outputs between other functions, regardless of whether or not they are named.

It's important to note that the words "closure" and "lambda" are not synonyms. Not all lambdas are closures and not all closures are lambdas. A **closure** is created when a function references data that is contained outside the function scope. A **lambda** is a function that is used as a value.

Higher order functions are functions that consume or return functions as data. Lambdas get passed to and/or returned from higher order functions, and a function might be both a lambda and a higher order function, but not all highe rorder functions are lambdas.

Basically, **if a function is used as an argument or return value, it's a lambda**.

## Immediately Invoked Function Expressions

Immediate Invoked Function Expressions (or IIFE, pronounced "*iffy*") are functions that are invoked as soon as they are defined. This technique is often used to create a new scope to encapsulate modules.

Before IIFE, a common technique was to assign names to the object prototype:

```javascript
var Lightbulb = function() {
    this.isOn = false;
},
lightbul = new Lightbulb();

Lightbulb.prototype.toggle = function() {
    this.isOn = !this.isOn;
    return this.isOn;
};

Lightbulb.prototype.getState = function getState() {
    // ...
};

Lightbulb.prototype.off = function off() {
    // ...
};

Lightbulb.prototype.on = function on() {
    // ...
};

Lightbulb.prototype.blink = function blink() {
    // ...
};
```

This approach leads to the repetition of `Lightbulb.prototype` for every property definition. IIFE's allow you to encapsulate scope, so that you can assign to regular variables instead of just the prototype. This provides you with more flexibility as well as the ability to hide state inside the function closure.

Example:

```javascript
(function() {
    var isOn = false,
    toggle = function() {
        isOn = !isOn;
        return isOn;
    },
    getState = function getState() {
        // ...
    },
    off = function off() {
        // ...
    },
    on = function on() {
        // ...
    },
    blink = function blink() {
        // ...
    },

    lightbulb = {
        toggle: toggle,
        getState: getState,
        off: off,
        on: on,
        blink: blink
    };
})());
```

## Method Context

Functions are invoked by appending parentheses to the end of the function reference. 

We have:

```javascript
object.methodName() // dot notation
object['methodName']() // square bracket notation`
```

When you invoke a method with dot notation, you have access to the object's property using `this`. 

**`this` refers to the object that the method is called on.**

The `.call()` method is shared by all functions allows you to call any method or function on any object. In other words, it sets `this` inside the method to refer to the object of your choosing. 

```javascript
someMethod.call(context, argument1, argument2);
```

In this case, *context* is the object you want `this` to refer to. If you need to pass an array of arguments, use apply:

```javascript
someMethod.apply(context, [argument1, argument2, ...]);
```

### Function.prototype.bind( ) -> Needs more information

The two methods `.call()` and `.apply()` are useful but they have one serious drawback: They permanently bind the context to the target method. You have to remember to use them every time you invoke the method, and you have to have access to the context object in scope. That's not always easy, particularly in event handlers

The `.bind()` method is used to permanently set the value of `this` inside the target functino to the passed in context object. 

Here's a common use case for bind. An event handler:

```javascript
var lightbulb = {
    toggle: function toggle() {
        this.isOn = !this.isOn;
        return this.isOn;
    },
    isOn: false
},
    toggle = lightbulb.toggle,
    lightswitch = document.getElementById('lightswitch');

lightswitch = document.getElementById('lightswitch');
lightswitch.addEventListener('click', lightbulb.toggle, false);
```

This code will fail, because the context inside an event listener is not the object that method was assigned to at design time. Instead, it's a reference to the element that was clicked. Even after you click the switch element, `lightbulb.isOn` will be `false`. You can fix this mess with `.bind()`. You only need to alter the toggle assignment:

```javascript
toggle = lightbulb.toggle.bind(lightbulb);
```

Now, when the user clicks the lightswitch, the lightbulb will turn on or off as expected.

## Function Scope

Unlike most C-family languages that use *block scope*, the JavaScript `var` uses *function scope*. Block scope will be available using the `let` keyword in ES6. 

> Note: Block scope can be a good cod esmell that indicates that it may be time to break a functino into smaller pieces in order to encourage readability, organization, and code reuse. It's a good idea to keep functinos small.

### Hoisting

*Hoisting* is the word most commonly used to describe the illusion that all variable declarations are "hoisted" to the top of the containing function. This is not exactly how it happens although the effect is the same.

JavaScript builds its execution environment in two passes. The declaration pass sets up the run time environment, where it scans for all variable and function declarations and creates the identifiers. The second pass is the execution pass. After the first pass, all declared functions are available, but variables are still undefined.

Consider the following code:

```javascript
var x = 1;

(function () {
    console.log(x);
    var x = 2;
});
```

In the first pass, the function declarations occur, and x is `undefined` in both the inner and outer scope. When it gets to the `console.log()` statement in the execution pass, the inner scoped x has been declared, but it is still `undefined` because it hasn't hit the initialization in the next statement yet. In effect, this is how JavaScript interprets the code:

```javascript
var x = 1;

(function () {
    var x; // Declaration is hoisted and x is undefined.
    console.log(x);
    x = 2; // Initialization is still down here.
})
```

> If you declare all of your variables at the top of your function, and define your functions before you try to use them, you'll never need to worry about any of this. This practice can substantially reduce scope related bugs.

## Closures

In a nutshell, a *closure* stores function state even after the function has been returned. If you want to create a closure, simply define a function inside another functino and expose it. To expose a function, return it, or pass it to another function and expose it. To expose a function, return it, or pass it to another function. The inner functino will have access to the variables declare din the outer function. This technique is commonly used to give objects data privacy.

In JavaScript, any exposed method defined within the closure scope is a *privileged method*.

For example:

```javascript
var o = function o() {
    var date = 1,
        get;

    get = function get() {
        return data;
    };

    return {
        get: get
    };
};
```

In the above example, o is an object factory that defines the private variable data, and a privileged method, `.get()` that has access to it. The factory exposes `.get()` in the object literal that it returns.

In addition to the data privacy benefits, closures are an essential ingredient in languages that support first class functions because they give you access to outer scope variables from inside your lambdas.

Closures are commonly used to feed data to event handlers or callbacks, which might get triggered long after the containing function has finished.


## Method Design

Several techniques exist in JavaScript to design method APIs. JavaScript supports named parameter lists, function polymorphism, method chaining, and lambda expressions. You should be familiar with all of these techniques so that you can choose the right tool for the job.

Some principles to keep in mind when you design your methods. 
- Keep It Simple, Stupid (KISS)
- Do One Thing, and Do It Well (DOT)
- Don't Repeat Yourself (DRY)

### Named Parameters

The number of variables you psas into a function is called its *arity*. Generally, function arity should be kept small but sometimes you need a wide range of parameters (like to initialize the configuration of amodule, or create a new object instance). The trouble with a large arity is that each parameter must be passed into the function in the right order, even if several parameters are not needed. It can be difficult to remember what order is required, and it doesn't make sense to require a parameter that isn't really required for the function to do its job properly.

Example:

```javascript
var userProto = {
    name: '',
    email: '',
    alias: '',
    showInSearch: true,
    colorScheme: 'light'
};

function createUser(name, email, alias, showInSearch, colorScheme) {
    return {
        name: name || userProto.name,
        email: email || userProto.email,
        alias: alias || userProto.alias,
        showInSearch: showInSearch,
        colorScheme: colorScheme || userProto.colorScheme
    };
}
```

In this case, the `createUser()` function takes five optional parameters. The `userProto` object is a prototype (not to be confused with the `prototype` property). The trouble with this implementation becomes obvious when you look at the usage in isolation:

```javascript
var newUser = createUser('Tonya', '', '', '', 'dark');
```

What jumps out immediately is that it's impossible to know what the second, third, or fourth parameter is without looking at the `createUser()` implementation. It's also impossible to set the last parameter without passing in values for *all parameters*. What's more, if you want to add more parameters later, or change the order of the parameters, it's going to be difficult if the function is used frequently.

A better alternative:

```javascript
var newUser = createUser({
    name: 'Mike',
    showInSearch: false
});
```

You can implement this easily using the extend method that comes with most popular libraries. Here's how it's done with jQuery:

```javascript
function createUser(options) {
    return $.extend({}, userProto, options);
}
```

`$.extend()` takes objects as its parameters. The first is the object to be extended. In this case, we want to return a new object so that we don't alter the userProto or options objects. The other objects (as many as you like) hold the properties and methods you wish to extend the first object with. This is a simple, elegant way to reuse code.

### Function Polymorphism

*Polymorphic Functions* behave differently based on the parameters you pass into them. In JavaScript, those parameters are stored in the array-like `arguments` object, but it's missing useful array methods.

`Array.prototype.slice()` is an easy way to shallow copy some or all of an array (or an array-like object).

You can borrow the `.slice()` method from the Array prototype using a technique called *method delegation*. You delegate the `.slice()` call to the `Array.prototype` object. The method call looks like this:

```javascript
var args = Array.prototype.slice.call(arguments, 0);
```

Slice starts at index 0 and returns everything from that index on as a new array. That syntax is a little long winded, though. It's easier and faster to write:

```javascript
var args = [].slice.call(arguments, 0);
```

In the square bracket notation creates a new empty array to delegate the slice call to. This might sound slow, but creating an empty array is actually a fast operation.

Because `arguments` is not a real array, it doesn't have the `.sort()` method. By doing the above we create an array that we can perform array methods are.

Polymorphic functions frequently need to examine the first argument in order to decide hwo to respond. Now that `args` is a real array, you use the `.shift()` method to get the first argument.

```javascript
var first = args.shift();
```

Now, you can branch conditionally depending on what type the first parameter is. Imagine if a string was passed as the first parameter:

```javascript
function morph(options) {
    var args = [].slice.call(arguments, 0),
        animals = 'turtles'; // set as default

    if (typeof options === 'string') {
        animals = options;
        args.shift();
    }

    return('The pet store has ' + args + ' ' + animals + '.');
}
```

### Method Dispatch

*Method dispatch* is the mechanism that determines what to do when an object receives a message. JavaScript does this by checking to see if the method exists on the object. If it doesn't, the JavaScript engine checks the prototype object. If the method isn't there, it checks the prototype's prototype, and so on. When it finds a matching method, it calls the method and passes the parameters in. This is also known as *behavior delegation* in delegation-based prototypal languages like JavaScript.

*Dynamic dispatch* enables polymorphism by selecting the appropriate method to run based on the parameters that get passed into the method at run time. Some languages have special syntax to support dynamic dispatch. In JavaScript, you can check the parameters from within the called method, and call another method in response:

```javascript
var methods = {
    init: function (args) {
        return 'initializing...';
    },
    hello: function (args) {
        return 'Hello, ' + args;
    },
    goodbye: function (args) {
        return 'Goodbye, cruel ' + args;
    }
},
    greet = function greet(options) {
        var args = [].slice.call(arguments, 0),
            initialized = false,
            action = 'init'; // init will run by default

        if (typeof options === 'string' && typeof methods[options] === 'function') {
            action = options;
            args.shift();
        }

        return methods[action](args);
    };
}
```

This manual style of dynamic dispatch is a common technique in jQuery plugins in order to enable developers to add many methods to a plugin without adding them all to the jQuery prototype. Using this technique, you claim a single name on the jQuery prototype, and add as many methods as you like to it. Users then select the method they want to invoke using: `$(seleciton).yourPlugin('methodName', params);`

### Generic and Collection Polymorphism

*Generic programming* is a style that attempts to express algorithms and data structures in a way that is type-agnostic. The idea is that most algorithms can be employed across a variety of different types. Generic programming typically starts with on or more type-specific implementations, which then get lifted (abstracted) to create a more generic version that will work with a new set of types.

Generics do not require conditional logic branching to implement an algorithm differently based on the type of data passed in. Rather, the data types passed in must support the required features that the algorithm needs in order to work. Those features are called *requirements*, which in turn get collected into sets called *concepts*.

Generics employ *parametric polymorphism*, which uses a single branch of logic applied to generic type parameters. In contrast, *ad-hoc polymorphism* relies on conditional branching to handle the treatment of different parameter types (either built-in to the language with features like dynamic displatch, or introduced at program design time).

Generic programming is particularly relavant to functional programming because functional programming works best when a simple function vocabulary can express a wide range of functionality, regardless of type.

In JavaScript, any collection (array or object) can contain any type (or mix of types), and most programmers rely on duck typing to accomplish similar goals. (If it walks like a duck and quacks like a duck, treat it like a duck. In other words, if an object has the features you need, assume it's the right kind of object and use it.)

JavaScript supports two types of collections: Objects, and arrays. The principle difference between an object and an array is that one is keyed with names, and the other sequentially with numbers. Objects don't guarantee any particular order. Arrays do. Other than that, both behave pretty much the same.

### Method Chaining and Fluent API

*Method Chaining* is using the output of one method call as the context of the next method call. jQuery is famous for this.

One of the primary benefits of method chaining is that it can be used to support fluent APIs. In short, a *fluent API* is one that reads like natural language. That doesn't mean that it has to look like English, but fluent APIs often use real verbs as method calls (like hide and show).

## Functional Programming

Functional programming is a style of programming that uses *higher order functions* (as opposed to objects and data) to facilitate code organization and reuse. A higher order function treats functions as data, either taking a function as an argument, or returning a function as a result. Higher order functions are very powerful code reuse tools which are commonly used in JavaScript for a variety of purposes.

For example, higher order functions can be used to *abstract algorithms from datatypes*. This reduces the amount of code you need in order to support various datatypes in your reusable algorithms. Without this, you might create a special function to operate on a collection of one type, and a similar, but slightly different function to operate on another. 

Higher order functions are very commonly used to *abstract list iteration boilerplate from algorithm implementation*.

### Stateless Functions (aka Pure Functions)

*Pure* functions ar estateless. This means that they do not use or modify variables, objects, or arrays that were defined outside the function. Given the same inputs, stateless functions will always return the same output. 

Example:

```javascript
var rotate = function rotate(arr) {
    arr.push(arr.shift());
    return arr;
}

var original = [1, 2, 3];
rotate(original); // => [2, 3, 1]
original // => [2, 3, 1]

// original was mutated
```

Pure functions will not mutate any external data

```javascript
var safeRotate = function safeRotate(arr) {
    var newArray = arr.slice(0); // create a copy of the array
    newArray.push(newArray.shift());
    return newArray;
}
```

Because you don't have to worry about clobbering shared data, stateless functions can often be run in parallel, meaning that it's much easier to scale computation horizontally across a large number of worker nodes. In other words, stateless functions are great for high-concurrency applications.  They can be chained together for stream processing and can also be abstracted and shared as context-agnostic modules.

### Partial Application and Currying

*Partial Application* wraps a function that takes multiple arguments and returns a function that takes fewer arguments. It also uses closures to fix one or more arguments so that you only need to supply the arguments that are unknown. 

```javascript
var multiply = function multiply(x, y) {
        return x * y;
    },

    partial = function partial(fn) {
        // Drop the function from the arguments list and
        // fix arguments in the closure.
        var args = [].slice.call(arguments, 1)

        // Return a new function with fixed arguments
        return function() {
            // Combine fixed arguments with new arguments and call
            // fn with them
            var combinedArgs = args.concat([].slice.call(arguments));

            return fn.apply(this, combinedArgs);
        };
    },

    double = partial(mutiply, 2);
```

If you wanted to use `.bind()` for partial application, you can do the following:

```javascript
var boundDouble = multiply.bind(null, 2);
```

Partial application is often confused with currying. Currying is the process of transforming a function which takes multiple arguments into a chain of functions which take no more than one argument each. For example, an add function, `add(1, 2, 3)` would become `add(1)(2)(3)` in curried form. In the second example the first call returns a function that returns another function and so on. However, since JavaScript supports multiple arguments, it's not common to see true currying in JavaScript applications.

## Asynchronous Operaitons

*Asynchronous Operations* are operations that happen outside the linear flow of program execution. These are broken up into two phases: call and response. Due to its nature, it's impossible to know at what point in the program flow you'll be in when you receive an asynchronous response. In order to manage this uncertainty we have the following

### Callbacks

*Callbacks* are functions that you pass as arguments to be invoked when the callee has finished its job. These are commonly passed into event handlers, Ajax requests, or even timers. Callbacks are great when you're only waiting for one operation at a time, or when you only have one job to do when the response comes back. However, the situation may arise when you need to manage multiple asynchronous dependencies or you might have several unrelated tasks waiting on the same data. In this situation, promises become very useful.

### Promises and Deferred

*Promises* are objects that allow you to add callback functions to success or fialure queues. Instead of calling a callback function in response to the completion of an async operation, you return a promise which allows you to register any number of callbacks.

What makes this unique is that the promise provides you access to the state of the operation. Depending on whether it's waiting, finished you can add callbacks to a promise at any time which will trigger after the operation is complete and the promise is resolved. If the promise is already resolved then the callback will be invoked immediately.

The difference between a Promise and a callback is that a promise is an object that gets returned from the callee, instead of a function that gets passed into and invoked by the callee.

A *deferred* is an object that controls the promise, along with a few extra methods. 