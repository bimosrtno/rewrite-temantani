const express = require('express');
const { getProducts , getProductId , createProduct , updateProductDescription , deleteProductById } = require('../controllers/ProductController');

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:productId', getProductId);
router.post('/products', createProduct);
router.put('/products/:productId/description', updateProductDescription);
router.delete('/products/:productId', deleteProductById);

module.exports = router;