# Functional Array Methods in JavaScript

Hey everyone! I'm glad that you were all able to come out tonight to hear this talk. For those who don't know, the subject of this will be about Functional Array Methods in JavaScript. If you don't know what that means, *great*, you're in the right place! And if you think this is old news then I hope it's a worthwhile refresher. 

Before we actually talk about the array methods that exist in JavaScript, though, I feel it's necessary to recap and review what ***Functional*** and ***being Functional*** actually means.

[From Wikipedia:](http://en.wikipedia.org/wiki/Functional_programming)
> *Functional programming is a programming paradigm, a style of building the structure and elements of computer programs, that treats computation as the evaluation of mathematical functions and avoids state and mutable data.*

Functional Programming:
- Is a declarative programming paradigm (code done through expressions)
- Has the constraint that the output of a function depends only on its arguments (returns the same thing for a given set of inputs)

So basically all functional programming means to us right now is that it is a process of controlling state in our programs and applications that we develop. A key point to note is that these functions will be just like those you evaluated in highschool (think `f(g(x))`) where whatever inputs you give these functions the same output will always be guaranteed.

Fortunately, it's commonplace to have some methods that help us in writing programs in a "functional" style. And some of those are what we're going to be talking about today.

In JavaScript, Arrays have methods in their prototype chain that are super cool and *extremely* useful. These include:
- `Array.prototype.forEach`
- `Array.prototype.filter`
- `Array.prototype.reduce`
- `Array.prototype.map`

And I'll address each of these in order.

## `forEach`

So, the very first method that we'll look at to ease our understanding of both functional programming as a paradigm and also the usefulness of these methods in JavaScript is `forEach`. This method does exactly what its name implies: it goes through the array and performs an operation for each element.

A quick example:
```javascript
var arr = [1, 2, 3];

arr.forEach(function(element, index, array) {
   console.log("Element: " + element);
});

// Logs the following:
//=> 1
//=> 2
//=> 3
```

In this example, you see that we've defined an arbitrary array with three numbers and used the `forEach` method to iterate through each one and have it log out the element. Although not the most interesting method (to be fair it's a glorified for loop) it allows us to define some operation for each element in our array that doesn't have to be tied to the array.

## `filter`

Now the next Array method that I mentioned was `filter` and this one is pretty powerful despite its simplicity. This method "filters" a given array by some condition. You can think of filter in a number of ways and I'll provide a couple approaches to understanding them.

1. Simple Way
    - You provide a condition or a requirement that all elements in the array must have otherwise they aren't included in the returned array
2. Mathematical Way
    - Imagine you are given a set of Integers: `{ 1, 2, 3, 4, 5 }` and you want only a subset of those, namely those greater than 3. You can then think of `filter` as having a condition that an element must be greater than three and therefore `filter({ 1, 2, 3, 4, 5}, x > 3) // => { 4, 5 }`. Here we are giving a set to the filter function, giving it a condition and its output is exactly as we expect
    - Therefore, `filter` provides us with a set that is less than or equal to the original, in terms of elements the set contains.
3. Functional Way
    - `filter` is a function that takes a set/collection/array and returns a new set/collection/array of elements that pass a certain condition.

Now that those are out of the way, here's an example of how to use it:
```javascript
var arr = [1, 2, 3, 4, 5];

arr.filter(function(element, index, array) {
   return element > 3; 
}); //=> [4, 5];
```

Note: this creates a *new* array and does not modify the original array it is called on

Conceptually, we can look at this function then as a way to do a number of things including:
- Ensuring all elements in an array meet a certain condition, if an element doesn't meet a condition it is excluded from the resulting array
- Only getting the elements that we want to work with (e.g., filter by elements that are only visible if we were dealing with jQuery)

And in any of these cases, we are given an array of elements, and these elements can be anything, that pass a test that we provide to it in our callback function

## `reduce`

`reduce` is interesting in that it's similar to filter except that it takes things one step forwards. Where filter reduces the number of elements contained in the array that it was applied to, the number of elements removed from the array could be 0 or could be all of them. 

To illustrate this:
```javascript
var arr = [0, 1, 2, 3, 4];
arr.filter(function(value, index, array) {
    return value > 3
}); //=> [4];

arr.filter(function(value, index, array) {
    return value >= 0;
}); //=> original array
```

Therefore, the resulting length of an array passed to filter is variable. With reduce, we are guaranteed that the result will be reduced to a single value.

What do I mean by this? Let's do an example:

```javascript
// Say we're given a collection of numbers and we want to find the sum of them.
// We can easily do this using reduce
var arr = [1, 2, 3, 4, 5];

arr.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}); //=> 15!
```

            |  previous Value  |  currentValue  |  index  |  array  |  return value  |
------------|------------------|----------------|---------|---------|----------------|
first call  |  1               |       2        |    1    | [1, 2, 3, 4, 5] |      3 |
second call |  3               |       3        |    2    | [1, 2, 3, 4, 5] |      6 |
third call  |  6               |       4        |    3    | [1, 2, 3, 4, 5] |     10 |
fourth call |  10              |       5        |    4    | [1, 2, 3, 4, 5] |     15 |

## `map`

Our final function that we're going to go over is called `map()`. Map is different than filter or reduce which manipulate the overall array. Instead, map creates a new array and applies a transformation to each element it contains.

```javascript
// Let's continue with our array of five integers
var arr = [1, 2, 3, 4, 5];

// Let's double each number
arr.map(function(value, index, array) {
    return value * 2;
}); //=> [2, 4, 6, 8, 10]
```

Although this example is trivial, we can think of map abstractly as a way to transform a set of data into what we want the data to be. This could be things like:

- Applying a piece of functionality to an array of objects that we might have
    - Say you want to give each one a `toString()` method
- Changing an array of objects into another array containing a different type of object
- Manipulating integers so that they fit a certain range that you want
- Making sure a set of objects inherit functionality from a specific prototype

## Thoughts & Examples

Overall, these functions provide interesting use cases for dealing with real problems. One of the more intresting cases for using these was when I used the reduce function to manipulate a given user time input into an appropriate syntax.

Some background, we are dealing with a user inputting some time into an input field. This means they could enter things like `03:00 PM` which is our desired format, or things like `330p`, `3:00 AM`, etc. We are unsure about what they could input. To solve this, we could use reduce to read the input that they give us from left to right, applying a certain syntax rule to make sure we can interpret what time they are giving us.

```javascript
/**
 * Formats the given time according to our timepicker syntax rules
 * @param  {string} time    The time we want to format
 * @return {string}         The formatted string
 */
function formatTime(time) {
    // Split up the string into individual characters
    var letters = time.toUpperCase().split('');

    // Format the string from the beginning in order to ensure each syntax rule is enforced
    return letters.reduce(function(prev, curr) { 
        return applySyntaxRules(prev + curr, timeSyntaxRules);
    }, "");
};

/**
 * Apply a given set of syntax rules to a string
 * @param  {string} str     The string that's going to be formatted
 * @param  {object} rules   An object representing the syntax rules for a given string type
 * @return {string}         The formatted string
 */
function applySyntaxRules(str, rules) {
    // Apply the syntax rule if we have one for the given time length
    if (rules[str.length]) {
        str = rules[str.length](str);
    }

    return str;
};

/**
 * Declare time syntax rules at varying lengths of a given time string.
 * Format: HHMM [AM][PM]
 * 
 * @type {Object}
 */
var timeSyntaxRules = {

    1: function(time) {
        // Check to see if first digit is not 1, then preface it with zero 
        var pattern = /[2-9]/;

        if (time.match(pattern)) {
            return "0" + time;
        }

        return time;
    },

    3: function(time) {
        if (time[2] === ':') {
            return time.substring(0, 2);
        }

        return time
    },

    5: function(time) {
        if (time[4] === ' ') {
            return time.substring(0, 4);
        }

        return time;
    }
};
```

### Filter Example

An interesting use case for filter actually exists in jQuery. Say you have a list of events for a given day that you want to display, but you don't want to display events that have already passed.

Here's what we have:
> Current Time (03:00 PM)

Event Name          | Start Time
--------------------|-----------
Meeting             | 09:00 AM
Lunch               | 12:30 PM
Phone Conference    | 03:30 PM
Dinner Date         | 07:00 PM

Here's what we want:

Event Name          | Start Time
--------------------|-----------
Phone Conference    | 03:30 PM
Dinner Date         | 07:00 PM

```javascript
/**
 * Display the events for our page
 * 
 */
function displayEvents() {
    // Find our events that are being displayed in a table
    var $events = $('#events table tr'),
        // Grab the current date
        date = new Date();

    // Only display the events that have not happened yet
    var $visibleEvents = $events.filter(function() {
        // Determine the time for the event by changing the time string for the event
        // to a date
        var time = timeStringToDate($(this).children('td').eq(1).html());

        // See if the event hasn't happened yet
        return time > date;
    });

    return $visibleEvents.show();
};
```

## Conclusion

Anyways, hope you all enjoyed the examples. Hopefully they'll help you out when building your JavaScript applications! If you have any questions message me @joshuatblack or leave a comment. 