const db = require('../config/db');

const getAllStockin = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM stockin', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const addStockin = async (product_id, category, product_name, stock) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO stockin (product_id, category, product_name, stock) VALUES (?, ?, ?, ?)';
        db.query(query, [product_id, category, product_name, stock], (err, result) => {
            if (err) reject(err);
            else resolve({ product_id, category, product_name, stock });
        });
    });
};

module.exports = { getAllStockin, addStockin };
