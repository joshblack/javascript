Promises
===

# Promises

> Promises are a software abstraction that makes working with asynchronous operations easier

Code will go from continuation-passing style:

```javascript
getTweetsFor("domenic", function (err, results) {
    // ...
});
```

to one where functions return a value, called a *promise*, which represents the eventual results of that operation.

```javascript
var promiseForTweets = getTweetsFor("domenic");
```

Promises can then be treated as **first-class objects**.

> Where did the need for Promises come from?

Everything in JavaScript is done in a single thread. As a result, when we write code that relies on things like jQuery's ajax method we have to write it in a continuation-passing style. This results in some problems.

1. Doing things in sequence is hard
2. Doing things in parallel is harder
3. Errors get lost easily

And all of this arises from the need for JavaScript developers to do things asynchronously.

Many frameworks have been established in order to address this issue, but one of the best solutions for this problem are an abstraction called **promises**.

What a promise does is simple, it un-inverts the chain of responsibility so that instead of calling a passed callback it returns a promise.

Promises are great for numerous reasons, namely:

1. Cleaner method signatures
2. Uniform return/error semantics
3. Easy composition
4. Easy sequential/parallel join
5. Always asynchronous
6. Exception-style error bubbling


## Promise guarantees

```javascript
promiseForResult.then(onFulfilled, onRejected);
```

- Only one of **onFulfilled** or **onRejected** will be called
- onFulfilled with be called a single fulfillment value
- onRejected will be called with a single rejection reason
- Handlers will always be called asynchronously