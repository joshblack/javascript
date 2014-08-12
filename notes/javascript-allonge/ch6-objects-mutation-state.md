> encapsulation: A language construct that facilitates the bundling of data with the methods (or other functions) operating on that data.

It's important to realize that Hiding information (or "state") is the design principle that allows us to limit the coupling between components of software.

Imagine an implementation of a stack. There will be certain ways for you to push, pop, and see if the stack is empty. Say the method that you decide to use for keeping track of the head of the queue incorporates an index. Now a developer using your stack also incorporates the index in their code. If you ever decide to change your implementation of a stack their code will also break. Instead, why not just add a `.size()` method or other methods for developers to interface with when building things incorporating your programs.

#### methods

A function is a method of an object if it belongs to that object and interacts with that object in some way. In JavaScript, every method is a function but not every function is a method.

#### hiding state

Can use the module design pattern to hide pieces of implementation that you don't want developers to have access to and so you create an API for developers to use to interface with whatever you design. Or, you can leverage Closures to simulate a class with private variables/methods.

For example:
```javascript
var StackMaker = function() {
    var array = [],
        index = -1;

    return {
        push: function(value) {
            array[index += 1] = value;
        },
        pop: function() {
            var value = array[index];
            if (index >= 0) {
                index -= 1;
            }
            return value;
        },
        isEmpty: function() {
            return index < 0;
        }
    }
};

stack = StackMaker();
```

In the above example, we've succesfully built a stack with its internal data elements hidden. 

## Composition and Extension


