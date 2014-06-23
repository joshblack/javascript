## apply and call

In JavaScript, functions are applied with `()`. However, they also have *methods* for applying them to arguments.

## slice

Arrays have a `slice` method. This method creates a new array from the range you provide to it. So, if you wanted to copy an array you could call `.slice(0)` or if you wanted a subset of an array containing 5 elements you could call `.slice(1, 4)`. 

You can apply `slice` to array-like objects by calling

```javascript
Array.prototype.slice.call(arguments, 0);
[].slice.call(arguments, 0);
```

For simplicity, and also as a small speed improvement, `slice` is usually bound to a local variable:

```javascript 
var __slice = Array.prototype.slice;

function butFirst() {
    return __slice.call(arguments, 1);
}
```

## concat

Arrays have another useful method, `.concat`. This method returns an array created by concatenating the receiver with its arguments.

## function lengths

Functions have a `.length` property that counts the number of arguments declared.