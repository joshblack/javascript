this
===

1. `this` in functions

The most common way of using this, because functions represent all callable constructs in JavaScript. These include:
    - Real functions (`this` is the global object in sloppy mode, `undefined` in strict mode)
    - Constructors (`this` refers to the newly created instance)
    - Methods (`this` refers to the receiver of the method call)



*Functions become constructors if you invoke them via the new operator. That operator creates a new object and passes it to the constructor via `this`*

```javascript
var savedThis;
function Constructor() {
    savedThis = this;
}
var inst = new Constr();
console.log(savedThis === inst);
```


In methods, `this` refers to the receiver, the object on which the method has been invoked.