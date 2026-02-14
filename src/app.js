import ElectronicProduct from './models/ElectronicProduct.js';
import ClothingProduct from './models/ClothingProduct.js';
import CartService from './services/CartService.js';
import PaymentService from './services/PaymentService.js';
import Logger from './utils/Logger.js';

class ECommerceApp {
    #products;
    #carts;
    #paymentService;

    constructor() {
        this.#products = new Map();
        this.#carts = new Map();
        this.#paymentService = new PaymentService('sk_test_123456789');

        console.log('Initializing products...');
        this.#initializeProducts();
    }

    #initializeProducts() {
        const laptop = new ElectronicProduct(
            'E001',
            'Gaming Laptop',
            1299.99,
            'ASUS',
            2,
            10
        );

        const phone = new ElectronicProduct(
            'E002',
            'Smartphone',
            699.99,
            'Samsung',
            1,
            25
        );

        const tshirt = new ClothingProduct(
            'C001',
            'Casual T-Shirt',
            29.99,
            'L',
            'Cotton',
            'Blue',
            50
        );

        const jeans = new ClothingProduct(
            'C002',
            'Slim Fit Jeans',
            79.99,
            '32',
            'Denim',
            'Black',
            30
        );

        this.#products.set(laptop.id, laptop);
        this.#products.set(phone.id, phone);
        this.#products.set(tshirt.id, tshirt);
        this.#products.set(jeans.id, jeans);

        Logger.log('Products initialized successfully');

        // Verification
        console.log('\n=== Product Price Verification ===');
        for (let [id, product] of this.#products) {
            console.log(`${product.name}:`);
            console.log(`  - Using getPrice(): $${product.getPrice()}`);
            console.log(`  - Using property: $${product.price}`);
            console.log(`  - Description: ${product.getDescription()}`);
        }
        console.log('================================\n');
    }

    // ... rest of the methods remain the same but use getPrice() internally
    getProduct(productId) {
        return this.#products.get(productId);
    }

    listAllProducts() {
        const products = [];
        for (const product of this.#products.values()) {
            products.push({
                id: product.id,
                description: product.getDescription(),
                stock: product.stock
            });
        }
        return products;
    }

    async addToCart(userId, productId, quantity = 1) {
        const product = this.getProduct(productId);
        if (!product) {
            throw new Error(`Product ${productId} not found`);
        }

        console.log(`Adding to cart - ${product.name}: price=$${product.getPrice()}`);

        const cart = this.#getOrCreateCart(userId);
        cart.addItem(product, quantity);

        const cartTotal = cart.getTotal();
        console.log(`Cart total after adding ${product.name}: $${cartTotal}`);

        return {
            message: `Added to cart`,
            cartItemCount: cart.itemCount,
            cartTotal: cartTotal
        };
    }

    #getOrCreateCart(userId) {
        if (!this.#carts.has(userId)) {
            this.#carts.set(userId, new CartService(userId));
            Logger.log(`New cart created for user ${userId}`);
        }
        return this.#carts.get(userId);
    }

    async checkout(userId) {
        const cart = this.#carts.get(userId);
        if (!cart) {
            throw new Error('No active cart found for user');
        }

        const result = await cart.checkout(this.#paymentService);
        return result;
    }

    getCartSummary(userId) {
        const cart = this.#carts.get(userId);
        if (!cart) {
            return { items: [], total: 0, itemCount: 0 };
        }

        const items = [];
        for (const [id, { product, quantity }] of cart.getItems()) {
            const price = product.getPrice(); // Use method
            const qty = Number(quantity);

            console.log(`Cart summary - ${product.name}: price=$${price}, quantity=${qty}`);

            items.push({
                productId: id,
                name: product.name,
                quantity: qty,
                unitPrice: price,
                subtotal: price * qty
            });
        }

        return {
            items,
            total: cart.getTotal(),
            itemCount: cart.itemCount
        };
    }
}

export default ECommerceApp;