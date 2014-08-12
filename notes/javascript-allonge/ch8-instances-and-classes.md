A function that returns a JavaScript object is commonly referred to as a *factory function*.

If we strip down a function to its bare essentials...

```javascript
var Ur = function() {}; //=> doesn't return a JS Object.

new Ur(); //=> {}
```

Whenever we use the `new` operator with a function we get a unique object back. So...

```javascript
var i = new Ur();
```

- `i` is an instance of `Ur`
- `Ur` is a *constructor* function

An instance is is an object created by using the `new` keyword on a constructor function, and that function is the instance's constructor.

# Prototypes

Every function is initialized with its own unique prototype.

Each instance shares the same elements as their constructor's prototype.

You can set elements of an instance and they will override the constructor's prototype (but will not change it).

However, changing the constructor's prototype changes the behavior of all of its instances.

Every instance acquires a `constructor` element that is initialized to their constructor.

## revisiting `this` idea of queues

When a function is invoked by the new operator, `this` is set to the new object being created.

## objects everywhere?

The three truths of JavaScript

1) Everything in JavaScript behaves like an object
2) Everything in JavaScript behaves like an instance of a function
3) Everything in JavaScript behaves as if it inherits some methods from its constructor’s prototype and/or has some elements of its own


Functions themselves are instances, and they have methods.

## imposters

Although JavaScript has "value types" such as `String`, `Number`, and `Boolean`, also called *primitives*, in order for these value types to be identical to each other they cannot be Objects. Therefore, they cannot have methods or constructors.

But...wait. If they don't have methods why can we do the following?

```javascript
"This is a string".split(' ');
    //=> ['This', 'is', 'a', 'string']
```

So we have a string, but it isn't an instance. It also doesn't have methods but it somehow impersonates an instance of the String constructor. How does any string impersonate an instance in JavaScript?

When you do something that treats a value like an Object, JavaScript checks to see whether the value actually is an Object. In the case of a primitive value, JavaScript temporarily makes an Object that is a copy of the primitive which has the methods that you are used to using. These copies are referred to Instances of each primitive (for example, a `String instance`) as opposed to primitives. These instances have methods while the primitives do not.

JavaScript builds these copies by using, yupp you guessed it, the `new` keyword.

```javascript
new String("This is a string"); //=> "This is a string"

new String("example string") === "example string" //=> false
```

A string instance is an object with its own identity.

Why is this problematic? If we use a string instance where we thought we had a string primitive, we could run into problems.

Instances are created using the `new` keyword and are considered truthy

# Binding Functions to Contexts

## binding methods

Let's try to take a method call and treat it like a function. Methods are functions in JavaScript, however the method calls involve both invoking a function *and* setting the context of the function call to be the receiver of the method call.

If we write something like:

```javascript
var unbound = someObject.someMethod;
```

We're binding the name `unbound` to the method's function, but we aren't doing anything with the identity of the receiver. Such methods are called **unbound** methods because they aren't associated with, or *bound* to the intended receiver.

What we want to try and emulate is a bound method, or rather a method that is associated with a specific receiver.

```javascript
var boundSetter = function(value) {
    return someObject.setSomeValue(value);
};

// This bound method takes one argument, just like the function it calls.
// It can be used anywhere

someDomfield.on('update', boundSetter);
```

Although this pattern is handy, it requires keeping track of every bound method.

We can always bind a method in place by using the `let` pattern.

```javascript
someObject.setSomeValue = (function() {
    var unboundMethod = someObject.setSomeValue;

    return function(value) {
        return unboundMethod.call(someObject, value);
    }
})();

// Now we know where to find it:
someDomField.on('update', someObject.setSomeValue);
```

# Partial Application, Binding, and Currying

The first parameter to `.bind` sets the context. If functions that you write do not use the context, you can use `.bind` to do left partial application.

*Currying* is the act of taking a function that takes more than one argument and converting it to an equivalent function taking one argument.

# Object Methods

- An *instance method* is a function defined in the constructor's prototype. Every instance therefore acquires this behavior unless it is explicity overriden. Instance methods usually have some interaction with the instance, such as references to `this` or to other methods that interact with the instance.
- A *constructor method* is a function belonging to the constructor itself.
- An *object method* is a function defined in the object itself.

> Object methods are defined within the object. So if you have several different "instances" of the same object, there will be an object method for each object. Object methods can be associated with any object, not just those created with the `new` keyword. Instance methods apply to instances, objects created with the `new` keyword. Instance methods are defined in a prototype and are shared by all instances.