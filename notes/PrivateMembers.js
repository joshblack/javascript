// test.js

/* Public members */

// The members of an object are all public members. Any function can access, modify, or delete those members.
// There are two main ways of putting members in a new object:

// Constructor Pattern
// Usually used to initialize public instance variables.
// The constructor's this variable is used to add members to the object.

function Container(param) {
    this.member = param;
}

var myContainer = new Container('abc');
    = Object.create(Container('abc'));
myContainer.member; // contains 'abc'

// Prototype Pattern
// Usually used to add public methods. When a member is sought and it isn't found in the object itself,
// then it is taken from the object's constructor's prototype member.
// (The prototype mechanism is used for inheritance), conserves memory.

// To add a method to all objects made by a constructor, add a function to the constructor's prototype
Container.prototype.stamp = function (string) {
    return this.member + string;
}

myContainer.stamp('def'); // produces 'abcdef'


/* Private */
// Private members are made by the constructor.
function Container(param) {
    this.member = param;
    var secret = 3,  // private
        that = this; // private
}

// Example of a constructor making three private instance variables
function Container(param) {
    function dec() {
        if (secret > 0) {
            secret -= 1;    // private
            return true;
        } else {
            return false;
        }
    }

    this.member = param;
    var secret = 3;        // private
    var that = this;       // private, used as a workaround for this being set incorrectly for inner functions
}
// Here, the private method dec examines the secret instance variable.

// Remember, private methods cannot be called by public methods. To make private methods useful, you need a
// privileged method


/* Privileged */
// A privileged method is able to access the private variables and methods, and is itself accessible to the public
// methods and the outside. It is possible to delete or replace a privileged method, but it is not possible to
// alter it, or to force it to give up its secrets.

// Privileged methods are assigned with this within the constructor
function Container(param) {
    function dec() {
        if (secret > 0) {
            secret -= 1;
            return true;
        } else {
            return false;
        }
    }

    this.member = param;
    var secret = 3,
        that = this;

    this.service = function () {
        return dec() ? that.member : null;
    };
}

myContainer.service(); // return 'abc'
myContainer.service(); // return 'abc'
myContainer.service(); // return 'abc'
myContainer.service(); // return null

// Here, service is a privileged method. service calls the private dec method which accesses the private secret
// variable. service is available to other objects and methods, but it doesn not allow direct access to the private
// members.

// The pattern of public, private, and privileged members is possible because JavaScript has closures.
// This means that an inner function always has access to the variables nad parameters of its outer function,
// even after the outer function has returned.

/* Note: private and privileged members can only be made when an object is constructed. Public members can be
   added anytime. */


// Patterns

// Public
function Constructor(params) {
    this.membername = value;
}
Constructor.prototype.membername = value;

// Private
function Constructor(params) {
    var that = this;
    var membername = value;

    function membername(params) {
        //
    };
}

// Privileged
function Constructor(params) {
    this.membername = function(params) {
        //
    };
}