const { addCustomer , getCustomers , updateStatus , updatePhone } = require('../model/CustomersModel');



const getAllCustomers = async (req, res) => {
        try {
            const customers = await getCustomers();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };

const createCustomer = async (req, res) => {
    try {
      const { name, phone, email, domisili } = req.body;
      let { status } = req.body;
  
      if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Name, phone, and email are required' });
      }
      if (!status) {
        status = "Potensial"; // default
      }
  
      const newCustomer = await addCustomer(name, phone, email, domisili, status);
      res.status(201).json({ message: 'Customer added successfully', data: newCustomer });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
  const updateCustomerStatus = async (req, res) => {
    try {
      let { customer_id } = req.params;
      const { status } = req.body;
      customer_id = customer_id.trim(); 
      const updatedCustomer = await updateStatus(customer_id, status);
      res.status(200).json({ message: 'Customer status updated successfully', data: updatedCustomer });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const updateCustomerPhone = async (req, res) => {
    try {
      let { customer_id } = req.params;
      const { phone } = req.body;
      customer_id = customer_id.trim(); 
      if (!phone) {
        return res.status(400).json({ message: 'Phone number is required' });
      }
      const updatedCustomer = await updatePhone(customer_id, phone);
      res.status(200).json({ message: 'Customer phone updated successfully', data: updatedCustomer });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
  

module.exports = { getAllCustomers, createCustomer , updateCustomerStatus , updateCustomerPhone };
