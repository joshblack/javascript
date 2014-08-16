let items = new Set();

// Add some values to our set
items.add(5);
items.add("5");

// Add a duplicate item
items.add(5); // ignored

items.size; //=> 2

// Check to see if set has a value
items.has(5); // true

// Remove a value from a set
items.delete(5);

// Remove all items from set
items.clear();

items.has(5); // false


var friends = new Set(['Big Bird', 'Elmo', 'Oscar']);

friends.values().next().value; // Big Bird
friends.values().next().value; // Elmo

for (let friend of friends) {
 console.log(friend);
}