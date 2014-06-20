Decorators
===

Source: http://addyosmani.com/blog/decorator-pattern/

> A Decorator pattern is a structural pattern that promotes code reuse and is a flexible alternative to subclassing.

This is useful for:
- Modifying existing systems where you may wish to add additional features to objects without the need to change the underlying code that uses them


Traditionally, the decorator is defined as a design pattern that allows behaviour to be added to an existing object dynamically. The idea is that the decoration itself isn't essential to the base functionality of an object otherwise it would be baked into the 'superclass' object itself.

## Subclassing

> Subclassing is a term that refers to inheriting properties for a new object from a base or 'superclass' object.


var subclassExample = subclassExample || {};
subclassExample = {
    Person: function( firstName , lastName ){
        this.firstName = firstName;
        this.lastName =  lastName;
        this.gender = 'male'
    } 
}

//a new instance of Person can then easily be created as follows:
var clark = new subclassExample.Person( "Clark" , "Kent" );
        
//Define a subclass constructor for for 'Superhero':
subclassExample.Superhero = function( firstName, lastName , powers ){
    /*
        Invoke the superclass constructor on the new object
        then use .call() to invoke the constructor as a method of
        the object to be initialized.
    */
    subclassExample.Person.call(this, firstName, lastName);
    //Finally, store their powers, a new array of traits not found in a normal 'Person'
    this.powers = powers;
}
subclassExample.Superhero.prototype = new subclassExample.Person;
var superman = new subclassExample.Superhero( "Clark" ,"Kent" , ['flight','heat-vision'] );
console.log(superman); /* includes superhero props as well as gender*/