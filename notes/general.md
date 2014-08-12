The context for a function being called is set by the way the function is called, not the function itself.

```javascript
var someObject = {
    returnMyThis: function() {
        return this;
    }
};

someObject.returnMyThis() === someObject //=> true
```


A function's free variables are resolved by looking them up in their enclosing functions' environments. 

JavaScript is **lexically scoped**, as a result a name always refers to its lexical environment. The lexical environment is the code surrounding what is executed.

A function's context cannot by determined by examining the source code of a JavaScript Program.

- When you call a function with `call`, you set the context by passing it in as the first parameter. So when you do a.b(), what's really happening is a.b.call(a). In a browser, when you run c(), it is synonymous to c.call(window).

- Should write all function decorators so that they are "context agnostic". Decorators are functions that take in functions as an argument and return a function

**Objects, Mutation, and State**
- State can be encapsulated/hidden with closures
- Encapsulations can be aggregated with composition
- Encapsulation resists extension
- The automagic binding this facilitates sharing of functions
- Functions can be named and declared with a name


Everything in JavaScript behaves like an object, everything in JavaScript behaves like an instance of a function, and therefore evertyhing in JavaScript behaves as if it inherits some methods from its constructor's prototype and/or has some elements of its own.

When you do something that treats a value like an object, JavaScript checks to see whether the value actually is an object. If the value is actually a primitve, JavaScript temporarily makes an object that is a copy of the primitive and has methods. For `"some string".length`, the string does not actually have the method `length` but instead a copy of it is placed in a `String Instance`. This instance has methods while the primitive `string` type does not.

Example: 
```javascript
new String("Spence Olham") === "Spence Olham" //=> false
```

A string instance is an object with its own identity

