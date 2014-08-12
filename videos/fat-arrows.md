# Fat Arrow Functions

So, in ES6 we are given some syntactical sugar known as the fat arrow function.

Traditionally, as developers we have 5 ways of defining `this` in JavaScript. Those include:

1. Method invocation by an object
2. Method invocation without a referring object (global)
3. Constructor
4. Call
5. Apply

what about bind?

...and now we have a sixth way of defining `this` in JavaScript. The Fat arrow function allows us to gain the scope of the environment it is defined in.

We use this syntax by doing the following:

```javascript
var square = (x) => { 
    return x * x 
};

square(2); //=> 4

// can be rewritten as
var square = x => x * x;
```


```javascript
var listener = node.addEventListener("click", function(event) {
    let _target = event.target;
    this.handleClick(_target);
}.bind(this));

var listener = node.addEventListener("click", (event) => {
    let _target = event.target;
    this.handleClick(_target);
});
```