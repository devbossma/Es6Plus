import Product from './Product.js';

class ClothingProduct extends Product {
    #size;
    #material;
    #color;

    constructor(id, name, price, size, material, color, stock = 0) {
        super(id, name, price, stock);
        this.#size = size;
        this.#material = material;
        this.#color = color;
    }

    get size() { return this.#size; }
    get material() { return this.#material; }
    get color() { return this.#color; }

    // Override parent method (polymorphism)
    getDescription() {
        return `${this.name} - ${this.#color} ${this.#material}, Size ${this.#size} - $${this.price}`;
    }

    // Specific method for clothing
    getCareInstructions() {
        const instructions = {
            'Cotton': 'Machine wash cold, tumble dry low',
            'Wool': 'Dry clean only',
            'Polyester': 'Machine wash warm, do not iron'
        };
        return instructions[this.#material] || 'Follow garment label instructions';
    }
}

export default ClothingProduct;