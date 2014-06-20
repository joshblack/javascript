Combinatorics
===

## Partial Application

```javascript
var __slice = Array.prototype.slice;

function callFirst(fn, larg) {
    return function () {
        var args = __slice.call(arguments, 0);

        return fn.apply(this, [larg].concat(args));
    }
}

function callLast(fn, rarg) {
    return function () {
        var args = __slice.call(arguments, 0);

        return fn.apply(this, args.concat([rarg]));
    }
}

function greet (me, you) {
    return "Hello, " + you + ", my name is " + me;
}

var heliosSaysHello = callFirst(greet, 'Helios');

heliosSaysHello('Eartha');
    //=> "Hello, Eartha, my name is Helios"

var sayHelloToCeline = callLast(greet, 'Celine');

sayHelloToCeline('Eartha')
    //=> "Hello, Celine, my name is Eartha"
```

**Unary** represents a function decorator that modifies the number of arguments a function takes by taking in any function and turning it into a function that takes exactly one argument.

One of the most basic combinators is the *K Combinator* or the *kestrel*.

```javascript
function K(x) {
    return function (y) {
        return x;
    }
}
```
