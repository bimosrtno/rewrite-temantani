const db = require("../config/db");

const GetSales = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT 
                s.transaction_id, 
                s.customer_id, 
                s.name, 
                s.phone, 
                s.address, 
                COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'product', si.product_name, 
                            'quantity', si.quantity
                        )
                    ), '[]'
                ) AS items,
                s.total_price, 
                s.time AS date, 
                s.status
            FROM sales s
            LEFT JOIN salesitems si ON s.transaction_id = si.sales_id
            GROUP BY s.transaction_id
        `);

        return rows.map(sale => ({
            ...sale,
            items: JSON.parse(sale.items) // Pastikan items selalu dalam bentuk array
        }));
    },

    getSalesItems: async (salesId) => {
        const [rows] = await db.query(
            "SELECT si.*, p.price FROM salesitems si JOIN products p ON si.product_id = p.product_id WHERE si.sales_id = ?",
            [salesId]
        );
        return rows;
    },

    getLastTransactionId: async () => {
        const [rows] = await db.query("SELECT transaction_id FROM sales ORDER BY transaction_id DESC LIMIT 1");
        return rows.length > 0 ? rows[0].transaction_id : null;
    },

    createSales: async (transaction_id, customer_id, name, phone, address, total_price, status) => {
        return db.query(
            "INSERT INTO sales (transaction_id, customer_id, name, phone, address, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [transaction_id, customer_id, name, phone, address, total_price, status]
        );
    }
};

// Update status sales
const updateStatus = async (transaction_id, status) => {
    const [result] = await db.query(
        "UPDATE sales SET status = ? WHERE transaction_id = ?",
        [status, transaction_id]
    );
    return result.affectedRows; 
};

module.exports = { GetSales, updateStatus };
