import Logger from '../utils/Logger.js';

class CartService {
    #items;
    #user;

    constructor(user) {
        this.#items = new Map();
        this.#user = user;
    }

    addItem(product, quantity = 1) {
        if (!product.isInStock(quantity)) {
            throw new Error(`Cannot add ${quantity} ${product.name}(s) to cart - insufficient stock`);
        }

        const currentItem = this.#items.get(product.id);
        if (currentItem) {
            currentItem.quantity += quantity;
            this.#items.set(product.id, currentItem);
        } else {
            this.#items.set(product.id, { product, quantity });
        }

        Logger.log(`Added ${quantity}x ${product.name} to cart for user ${this.#user}`);
    }

    removeItem(productId, quantity = null) {
        const item = this.#items.get(productId);
        if (!item) {
            throw new Error('Product not found in cart');
        }

        if (quantity === null || quantity >= item.quantity) {
            this.#items.delete(productId);
            Logger.log(`Removed ${item.product.name} from cart`);
        } else {
            item.quantity -= quantity;
            this.#items.set(productId, item);
            Logger.log(`Reduced quantity of ${item.product.name} by ${quantity}`);
        }
    }

    getTotal() {
        let total = 0;
        for (const { product, quantity } of this.#items.values()) {
            // Use getPrice() method
            const price = product.getPrice();
            const qty = Number(quantity);

            if (isNaN(price) || price === undefined) {
                console.error(`Invalid price for product ${product.name}:`, price);
                continue;
            }

            const subtotal = price * qty;
            total += subtotal;

            Logger.log(`Cart calc: ${product.name} - $${price} x ${qty} = $${subtotal}`);
        }
        return total;
    }

    getItems() {
        return new Map(this.#items);
    }

    clear() {
        this.#items.clear();
        Logger.log(`Cart cleared for user ${this.#user}`);
    }

    get itemCount() {
        let count = 0;
        for (const { quantity } of this.#items.values()) {
            count += Number(quantity);
        }
        return count;
    }

    async checkout(paymentService) {
        if (this.#items.size === 0) {
            throw new Error('Cart is empty');
        }

        const total = this.getTotal();
        Logger.log(`Processing checkout for ${this.#user}: $${total.toFixed(2)}`);

        const paymentResult = await paymentService.processPayment(total, this.#user);

        if (paymentResult.success) {
            for (const { product, quantity } of this.#items.values()) {
                product.reduceStock(quantity);
            }

            this.clear();
            Logger.log(`Checkout completed successfully for ${this.#user}`);
            return { success: true, transactionId: paymentResult.transactionId };
        } else {
            throw new Error('Payment failed');
        }
    }
}

export default CartService;