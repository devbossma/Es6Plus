import Product from './Product.js';
import Logger from '../utils/Logger.js';

class ElectronicProduct extends Product {
    #warrantyYears;
    #brand;

    constructor(id, name, price, brand, warrantyYears, stock = 0) {
        // Call parent constructor first
        super(id, name, price, stock);

        // Then initialize child properties
        this.#brand = brand;
        this.#warrantyYears = Number(warrantyYears);

        // Now try to access the price using the getter
        const currentPrice = this.getPrice(); // Use method instead of property
        console.log(`[ElectronicProduct constructor] ${name}: price via getPrice() = ${currentPrice}`);
        console.log(`[ElectronicProduct constructor] ${name}: price via property = ${this.price}`);

        Logger.log(`Electronic product created: ${name} with price $${currentPrice}`);
    }

    // Additional getters
    get brand() { return this.#brand; }
    get warrantyYears() { return this.#warrantyYears; }

    // Override parent method
    getDescription() {
        const priceValue = this.getPrice(); // Use method for reliability
        if (isNaN(priceValue) || priceValue === undefined) {
            console.error(`Invalid price for ${this.name}:`, priceValue);
            return `${this.name} - ${this.#brand} (${this.warrantyYears} year warranty) - Price Error`;
        }
        return `${this.name} - ${this.#brand} (${this.warrantyYears} year warranty) - $${priceValue.toFixed(2)}`;
    }

    getWarrantyInfo() {
        return `${this.name} comes with ${this.#warrantyYears} year manufacturer warranty`;
    }

    set price(newPrice) {
        this.setPrice(newPrice);
        Logger.log(`Price updated for electronic product ${this.name}: $${Number(newPrice)}`);
    }
}

export default ElectronicProduct;