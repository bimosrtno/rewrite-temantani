const db = require('../config/db');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products WHERE product_id = ?', [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const addProduct = async (product_id, category, product_name, description, price, stock, image) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO products (product_id, category, product_name, description, price, stock, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [product_id, category, product_name, description, price, stock, image], (err, result) => {
            if (err) reject(err);
            else resolve({ product_id, category, product_name, description, price, stock, image });
        });
    });
};

const updateDescription = async (product_id, description) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE products SET description = ? WHERE product_id = ?';
        db.query(query, [description, product_id], (err, result) => {
            if (err) reject(err);
            else resolve({ product_id, description });
        });
    });
};

const deleteProduct = async (product_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM products WHERE product_id = ?';
        db.query(query, [product_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


module.exports = { getAllProducts , getProductById , addProduct , deleteProduct , updateDescription };
