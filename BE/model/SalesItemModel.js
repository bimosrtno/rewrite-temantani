const db = require('../config/db');

const SalesItem = {
 
        getProduct: async (product_id) => {
            const [rows] = await db.query("SELECT price, stock FROM products WHERE product_id = ?", [product_id]);
            return rows.length > 0 ? rows[0] : null; 
        },
    

    createSalesItem: async (sales_id, product_id, quantity, product_name) => {
        return db.query(
            "INSERT INTO salesitems (id, sales_id, product_id, quantity, product_name) VALUES (UUID(), ?, ?, ?, ?)",
            [sales_id, product_id, quantity, product_name]
        );
    },

    updateStock: async (product_id, quantity) => {
        return db.query("UPDATE products SET stock = stock - ? WHERE product_id = ?", [quantity, product_id]);
    }
};

module.exports = {SalesItem}
