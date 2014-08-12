# Arrows

```javascript
var square = function(n) {
    return n * n;
}

var square = n => n * n;
```

Say we had the following:

```javascript
var josh = {
    name: "Josh",
    friends: [],
    displayFriends: function() {
        this.friends.forEach(function(friend) {
            console.log(this.name + " is friends with " + friend);    
        })
    }
};

josh.friends.push("Justin");
josh.friends.push("Claudia");
josh.displayFriends(); //=> undefined is friends with Justin / Claudia
```

We can resolve this by doing the following:

```javascript
var josh = {
    name: "Josh",
    friends: ["Justin", "Claudia"],
    displayFriends: function() {
        this.friends.forEach(friend => { // Makes the function use the enclosing scope
            console.log(this.name + " is friends with " + friend);
        });
    }
};
```

# String Templating
```javascript
var person = {
    name: "Josh",
    friends: ["Justin", "Claudia"]
};

console.log('${person.name} is friends with the following people'
        -${person.friends[0]}
        -${person.friends[1]}
        // etc
');'

// The above string templating injects the properties and also maintains tabs and new line characters
```

# Destructuring Assignments

```javascript
