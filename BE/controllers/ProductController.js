const { getAllProducts ,  getProductById , addProduct , deleteProduct , updateDescription } = require("../model/ProductModel");

const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await getProductById(productId);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { product_id, category, product_name, description, price, stock, image } = req.body;
        if (!product_id || !category || !product_name || !price || !stock) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newProduct = await addProduct(product_id, category, product_name, description, price, stock, image);
        res.status(201).json({ message: 'Product added successfully', data: newProduct });
    } catch (error) {
        console.error("Error inserting product:", error); 
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProductDescription = async (req, res) => {
    try {
        const { productId } = req.params;
        const { description } = req.body;
        const updatedProduct = await updateDescription(productId, description);
        res.status(200).json({ message: 'Product description updated successfully', data: updatedProduct });
    } catch (error) {
        console.error("Error updating product description:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        await deleteProduct(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




module.exports = { getProducts , getProductId , createProduct , deleteProductById , updateProductDescription };
