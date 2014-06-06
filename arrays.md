JavaScript Arrays
====

> Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations.

```javascript
    // We can create new arrays by doing any of the following:
    var arr1 = [], // empty array, array literal notation
        arr2 = new Array(), // array constructor
        arr3 = [element0, element1, ..., elementN], // array initialized with elements
        arr4 = new Array(element0, element1, ..., elementN),
        arr5 = new Array(arrayLength); // initialize an array with a certain length
```

**Neither the length of a JavaScript array or the type of objects that can be placed into an array is fixed.**

To access elements of an array you may assume that we can simply use dot notation like for other objects. Unfortunately, any JavaScript properties that begin with a digit cannot be referenced with dot notation and therefore must be accessed using bracket notation.

```javascript
    var arr = ['hello', 'there'];
    arr.0; // syntax error
    arr[0]; // returns 'hello'
```

Indexes of JavaScript arrays are coerced into Strings by an implicit `toString()` method.
