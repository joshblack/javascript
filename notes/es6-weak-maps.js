// Weak Maps
let map = new WeakMap(),
    element = document.querySelectorAll('.element');

// Add some data
map.set(element, "Original");

// Check for the existence of a key in a weak map
map.has(element); //=> true

// Retrieve some data
map.get(element);

// Remove the reference
element.parentNode.removeChild(element);
// OR
map.delete(element);

map.has(element); //=> false
map.get(element); //=> undefined