const { getAllStockin , addStockin} = require ('../model/StockInModel');

const getStockin = async (req, res) => {
    try {
        const stockinData = await getAllStockin();
        res.status (200).json (stockinData)
    } catch (error) {
        console.log ("error fetching stockin:" , error )
        res.status (500).json ({
            message : 'Server error' , error: error.message
        });
    }
};


const createStockin = async (req, res) => {
    try {
        const { product_id, category, product_name, stock } = req.body;
        if (!product_id || !category || !product_name || !stock) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newStockin = await addStockin(product_id, category, product_name, stock);
        res.status(201).json({ message: 'Stock added successfully', data: newStockin });
    } catch (error) {
        console.error("Error inserting stockin:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getStockin, createStockin };
