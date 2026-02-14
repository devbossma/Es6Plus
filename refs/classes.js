export class Cart {

    // Private field (ES2022 syntax)
    #MyPrivateField;


    /*
    ** Class constructor
    ** is a special method used for creating and initializing an object instance of that class. 
    ** It automatically runs when the new keyword is used to create a new object from the class. 
    */
    constructor(items = []) {
        this.items = items
        this.#MyPrivateField = "This is a private fieald"
    }


    /*
    ** Accessors or Getters and Setters:
    ** get and set methods are special methods (accessor properties) used to control access to class properties, 
    ** allowing logic, validation, or computed values to run when a property is accessed or modified.
    */

    get privateField() {
        console.log(this.#MyPrivateField)
    }

    set privateField(field) {
        this.#MyPrivateField = field
    }

    get getTotal() {
        let total = this.#calculateTotal()
        console.log(total)
    }




    /*
    ** Static methods 
    ** 
    ** Static methods are associated with the class constructor, 
    ** not the class's prototype. 
    ** This means they are shared by all instances, 
    ** but cannot be accessed through an instance.
    
    */
    static clearCart(cartId) { console.log("Cart been cleared: ") }

    /*
    ** Private methods
    ** Scope: Private methods are only accessible inside the class that defines them. 
    ** They cannot be accessed from outside the class, 
    ** even by instances of the class or by subclasses through inheritance.
    */
    #calculateTotal() { return 50.34 }

    /*
    **  Protected methods
    **  This is purely a naming convention and is not enforced by the JavaScript runtime.
    **  The method is still publicly accessible from anywhere, 
    **  but the underscore is a strong signal to other programmers to respect the intended access level.
    */
    _protectedMethod() {
        console.log('This is a protected method (convention).');
    }

    /*Normal Instence Methods */
    addToCart(item = {}) { console.log("Item Added: ") }
    removeFromCart(id) { console.log(`Item ${id} Removed from cart`) }


}