When we discussed closures, we said that environments bind values (like `[2014, 6, 22]`) to names (like `x` and `y`) and that when we use these names as expressions the name evaluates as the value.

So when we write something like `y = x`, the name `x` is looked up in the current environment and its value is a specific array that was created when the expression [2014, 6, 22] was first evaluated. We then bind *that exact same value* to the name `y` in a new environment, and thus `x` and `y` are both bound to the exact same value, which is identical to itself. 

## Arguments and Arrays

JavaScript provides two different kinds of containers for values. One type is an array. Arrays store references of whatever you put into them. We can demonstrate them by doing the following:

```javascript
var unique = function unique() {
    return function() {}
},
    x = unique(),
    a = [ x ];

unique() === unique() //=> false, every time we create a function it is unique
a[0] === x //=> true
```

## References and Objects

In JavaScript, an object is a map from names to values, a lot like an environment.

Two objects created this way have differing identities, just like ararys:

```javascript
{ year: 2012, month: 6, day: 14 } === { year: 2012, month: 6, day: 14 } //=> false
```

Objects can use [] to access the values by name, using a string:

```javascript
{ year: 2012, month: 6, day: 14 }['day'] //=> 14
```

The values contained within an object work just like values contained within an array. The names that we are mapping these values don't have to be alphanumeric. If they are, you can access them by using the dot notation. Otherwise, bracket notation will be required.

## Reassignment and Mutation

When reassigning values to variables, the key is to understand that we are rebinding a different value to the same name in the same environment.

Like evaluating variable labels, when a binding is rebound, JavaScript searches for the binding in the current environment and then each ancestor in turn until it finds one. It then rebinds the name in that environment. 

### mutation and aliases

Arrays and objects can both mutate, or rather their identities stay the same but their structure changes. 

```javascript
var arr = [1, 2, 3];
arr[0] = 0; // can set a new value
arr[3] = 4; // can add a new value

var obj = {
    firstName: "Josh",
    lastName: "Black"
};

obj.firstName = "Foo";  // set a new value
obj.middleName = "Bar"; // add a new value
```

I think it's also important to note that when you create aliases for a certain array or object, any mutation or change on one of the references affects the value that it is referring to (obviously) and as a resort any alias will also report this change.

## When Rebinding Meets Recursion

It's important to note that functions declared recursively are not pure functions. Recursive functions are (for the most part) defined as closures because when they call themselves they look themselves up by name in their enclosing environment. As a result, recursive functions depend upon a specific value (themselves) being bound in their enclosing environment. 

```javascript
var even = function(num) {
    return (num === 0) || !(even(num - 1));
}
```

Obviously, if we used function declarations then we can't reassign the `even` value described above.

However, if you create a named function expression you can bind the name of the function within its body while leaving it out of the environment of the function expression.

```javascript
var even = function even(num) {
    return (num === 0) || !(even(num - 1));
}
```

In this case, the function doesn't refer to a name bound in its enclosing environment, it refers to a name bound in its own body. Now it is a pure function.

> When you want to make a recursive function, the safest practice is to use a named function expression


## limits

While named function expressions prove useful, they do have their limitations. Namely, they are useful for simple recursion but cannot do mutual recursion.

# From Let to Modules

We can create a new environment any time we want by creating an IIFE. With this construct (an IIFE), you can build **modules**. 

> Modules are any collection of functions that have some private and some public-facing elements


# Summary

**Rebinding**
- JavaScript permits reassignment/rebinding of variables
- Arrays and Objects are mutable
- References permit aliasing of reference types
