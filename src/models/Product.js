// Abstract class representing a generic product
class Product {
    // Private fields
    #id;
    #name;
    #price;
    #stock;

    constructor(id, name, price, stock = 0) {
        this.#id = id;
        this.#name = name;

        // Set private fields directly
        const numericPrice = Number(price);
        if (isNaN(numericPrice)) {
            throw new Error(`Invalid price for product ${name}: ${price}`);
        }
        this.#price = numericPrice;

        const numericStock = Number(stock);
        this.#stock = isNaN(numericStock) ? 0 : numericStock;

        // Debug log from parent
        console.log(`[Product constructor] ${name}: #price=${this.#price}, #stock=${this.#stock}`);

        if (this.constructor === Product) {
            throw new Error("Abstract class 'Product' cannot be instantiated directly");
        }
    }

    // Public getters - these MUST be defined as standard methods
    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        // Important: This returns the private field directly
        const price = this.#price;
        console.log(`[Product.getPrice] ${this.#name}: returning ${price}`);
        return price;
    }

    getStock() {
        return this.#stock;
    }

    // For backward compatibility with property-style access
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get price() {
        // This calls the method to ensure consistency
        return this.getPrice();
    }

    get stock() {
        return this.#stock;
    }

    // Setters
    setPrice(newPrice) {
        const numericPrice = Number(newPrice);
        if (isNaN(numericPrice)) {
            throw new Error("Price must be a valid number");
        }
        if (numericPrice < 0) {
            throw new Error("Price cannot be negative");
        }
        this.#price = numericPrice;
    }

    setStock(newStock) {
        const numericStock = Number(newStock);
        if (isNaN(numericStock)) {
            throw new Error("Stock must be a valid number");
        }
        if (numericStock < 0) {
            throw new Error("Stock cannot be negative");
        }
        this.#stock = numericStock;
    }

    // Property-style setters
    set price(newPrice) {
        this.setPrice(newPrice);
    }

    set stock(newStock) {
        this.setStock(newStock);
    }

    // Public methods
    isInStock(quantity = 1) {
        return this.#stock >= quantity;
    }

    reduceStock(quantity) {
        if (!this.isInStock(quantity)) {
            throw new Error(`Insufficient stock for ${this.#name}`);
        }
        this.#stock -= quantity;
    }

    // Abstract method
    getDescription() {
        throw new Error("Method 'getDescription()' must be implemented by derived classes");
    }

    // Static method
    static comparePrices(productA, productB) {
        return productA.getPrice() - productB.getPrice();
    }
}

export default Product;