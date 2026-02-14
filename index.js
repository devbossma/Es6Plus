import ECommerceApp from './src/app.js';
import Logger from './src/utils/Logger.js';

// Main execution
async function runECommerceDemo() {
    console.log('=== E-Commerce System Demo ===\n');

    // Create the app instance
    const app = new ECommerceApp();

    // Display all products with price verification
    console.log('Available Products:');
    const products = app.listAllProducts();
    products.forEach(product => {
        console.log(`- ${product.description} (Stock: ${product.stock})`);
    });
    console.log('\n' + '='.repeat(50) + '\n');

    // User 1 shopping session
    const userId1 = 'john_doe';
    console.log(`User: ${userId1}`);

    try {
        // Add items to cart
        console.log('\nAdding items to cart:');
        let result = await app.addToCart(userId1, 'E001', 1); // Add laptop
        console.log(`✓ Added laptop to cart - Total items: ${result.cartItemCount}, Cart total: $${result.cartTotal}`);

        result = await app.addToCart(userId1, 'C001', 2); // Add 2 t-shirts
        console.log(`✓ Added t-shirts to cart - Total items: ${result.cartItemCount}, Cart total: $${result.cartTotal}`);

        // Show cart summary
        const cartSummary = app.getCartSummary(userId1);
        console.log('\nCart Summary:');
        cartSummary.items.forEach(item => {
            console.log(`  ${item.name} x${item.quantity} = $${item.subtotal.toFixed(2)}`);
        });
        console.log(`  Total: $${cartSummary.total.toFixed(2)}`);
        console.log(`  Total Items: ${cartSummary.itemCount}`);

        // Checkout
        console.log('\nProcessing checkout...');
        const checkoutResult = await app.checkout(userId1);
        console.log(`✓ Checkout successful! Transaction ID: ${checkoutResult.transactionId}`);

    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // User 2 shopping session with different items
    const userId2 = 'jane_smith';
    console.log(`User: ${userId2}`);

    try {
        // Add items to cart
        await app.addToCart(userId2, 'E002', 1); // Add smartphone
        await app.addToCart(userId2, 'C002', 1); // Add jeans

        // Show cart summary
        const cartSummary = app.getCartSummary(userId2);
        console.log('Cart Summary:');
        cartSummary.items.forEach(item => {
            console.log(`  ${item.name} x${item.quantity} = $${item.subtotal.toFixed(2)}`);
        });
        console.log(`  Total: $${cartSummary.total.toFixed(2)}`);

        // Demonstrate polymorphism with product descriptions
        console.log('\nProduct Descriptions (Polymorphism):');
        const smartphone = app.getProduct('E002');
        const jeans = app.getProduct('C002');
        console.log(`  Electronic: ${smartphone.getDescription()}`);
        console.log(`  Clothing: ${jeans.getDescription()}`);

        // Demonstrate specific methods
        console.log(`\nWarranty Info: ${smartphone.getWarrantyInfo()}`);
        console.log(`Care Instructions: ${jeans.getCareInstructions()}`);

    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Show logs
    console.log('Application Logs:');
    console.log(Logger.exportLogs());
}

// Run the demo
runECommerceDemo().catch(console.error);