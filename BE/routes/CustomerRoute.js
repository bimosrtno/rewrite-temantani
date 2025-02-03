const express = require('express');
const { getAllCustomers, createCustomer , updateCustomerStatus , updateCustomerPhone} = require('../controllers/CustomerController');

const router = express.Router();

router.get('/customers', getAllCustomers);
router.post('/customers', createCustomer);
router.put('/customers/:customer_id/status', updateCustomerStatus);
router.put('/customers/:customer_id/phone', updateCustomerPhone);

module.exports = router;
