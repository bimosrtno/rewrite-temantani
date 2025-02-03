const db = require('../config/db');


const getCustomers = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM customers', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


const generateCustomerID = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT customer_id FROM customers ORDER BY customer_id DESC LIMIT 1', (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
      
          const lastId = result[0].customer_id;
          const lastNumber = parseInt(lastId.replace('CUST', ''), 10);
          const newId = `CUST${String(lastNumber + 1).padStart(3, '0')}`;
          resolve(newId);
        } else {
          resolve('CUST001');
        }
      }
    });
  });
};


const addCustomer = async (name, phone, email, domisili, status) => {
  const customer_id = await generateCustomerID();

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO customers (customer_id, name, phone, email, domisili, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [customer_id, name, phone, email, domisili, status], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ customer_id, name, phone, email, domisili, status });
      }
    });
  });
};



const updateStatus = async (customer_id, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE customers SET status = ? WHERE customer_id = ?';
    db.query(query, [status, customer_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Query Result:", result);
        if (result.affectedRows === 0) {
          reject(new Error(`No rows updated, check customer_id '${customer_id}'`));
        }
        resolve({ customer_id, status });
      }
    });
  });
};

const updatePhone = async (customer_id, phone) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE customers SET phone = ? WHERE customer_id = ?';
    db.query(query, [phone, customer_id], (err, result) => {
      if (err) {
        console.error("Error updating phone:", err);
        reject(err);
      } else {
        console.log("Query Result:", result);
        if (result.affectedRows === 0) {
          reject(new Error(`No rows updated, check customer_id '${customer_id}'`));
        } else {
          resolve({ customer_id, phone });
        }
      }
    });
  });
};





module.exports = { addCustomer , getCustomers , updateStatus , updatePhone };
