# Design Patterns

## Types of Design Patterns

## Constructor Design Pattern

> In classical object-oriented programming languages, a constructor is a special method used to initialize a newly created object once memory has been allocated for it. 

In the case of JavaScript, we are mostly interested in *object* constructors. Object constructors are used to create specific types of objects.

We can create an object by doing any of the following:

```javascript

var newObject = {};

var newObject = Object.create(Object.prototype);

var newObject = new Object();

```

We can set keys and values of an object by doing any of the following:

```javascript
// Dot Syntax
newObject.someKey = "";

// Square Syntax
newObject["someKey"] = "";

// Define Property
Object.defineProperty = function(obj, key, value) {
    var config = {
        value: value,
        writeable: true,
        enumerable: true,
        configurable: true
    };
}
```

### Basic Constructors

```javascript
function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
```