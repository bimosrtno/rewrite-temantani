const { GetSales , updateStatus } = require("../model/SalesModel");
const { SalesItem } = require("../model/SalesItemModel");
const db = require('../config/db'); 

const getAllSales = async (req, res) => {
    try {
        const sales = await GetSales.getAll();

        if (!sales || sales.length === 0) {
            return res.status(400).json({ message: "No sales data found", data: [] });
        }

        res.status(200).json({ message: "Sales retrieved successfully", data: sales });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const createSales = async (req, res) => {
    const { customer_id, name, phone, address, status, items } = req.body;
    if (!customer_id || !name || !phone || !address || !items || items.length === 0) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    const connection = await db.getConnection(); 
    try {
        await connection.beginTransaction();

        const lastTransactionId = await GetSales.getLastTransactionId();
        let nextIdNumber = 1;

        if (lastTransactionId) {
            nextIdNumber = parseInt(lastTransactionId.replace("TRS", ""), 10) + 1;
        }

        const transaction_id = `TRS${String(nextIdNumber).padStart(3, "0")}`;

        
        let total_price = 0;
        for (const item of items) {
            const product = await SalesItem.getProduct(item.product_id);

            
            console.log(`Product Query Result for ${item.product_id}:`, product);

            if (!product || product.stock < item.quantity) {
                throw new Error(`Product ${item.product_id} is out of stock or not found`);
            }

            // Debugging
            console.log(`Product Price: ${product.price}, Quantity: ${item.quantity}`);

            total_price += parseFloat(product.price) * parseInt(item.quantity, 10);
        }

        // Debugging: Cek total_price sebelum insert
        console.log("Total Price Calculated:", total_price);

        // Simpan ke tabel sales
        await GetSales.createSales(transaction_id, customer_id, name, phone, address, total_price, status);

        // Simpan ke tabel salesitems dan update stok
        for (const item of items) {
            await SalesItem.createSalesItem(transaction_id, item.product_id, item.quantity, item.product_name);
            await SalesItem.updateStock(item.product_id, item.quantity);
        }

        await connection.commit();
        res.status(201).json({ message: "Sales added successfully", transaction_id, total_price });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Transaction failed", error: error.message });
    } finally {
        connection.release();
    }
};

// update status sales

const updateSalesStatus = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { status } = req.body;

        // Update status dan dapatkan jumlah baris yang terpengaruh
        const affectedRows = await updateStatus(transaction_id, status);

        if (affectedRows === 0) {
            return res.status(400).json({ message: "Transaction Id not found" });
        }

        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { getAllSales, createSales , updateSalesStatus };
