import { useState, useEffect } from "react";
import { getCustomers, updateCustomerStatus, updateCustomerPhone } from "@/services/customerService";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const handleStatusChange = async (customer_id, newStatus) => {
    try {
      await updateCustomerStatus(customer_id, newStatus);
      fetchCustomers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handlePhoneChange = async (customer_id) => {
    try {
      await updateCustomerPhone(customer_id, newPhone);
      setEditingPhone(null);
      setNewPhone("");
      fetchCustomers();
    } catch (error) {
      console.error("Failed to update phone:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Customer ID</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Telepon</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Domisili</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id} className="text-center">
              <td className="border border-gray-300 p-2">{customer.customer_id}</td>
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">
                {editingPhone === customer.customer_id ? (
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="border px-2 py-1 w-24"
                  />
                ) : (
                  customer.phone
                )}
              </td>
              <td className="border border-gray-300 p-2">{customer.email}</td>
              <td className="border border-gray-300 p-2">{customer.domisili}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={customer.status}
                  onChange={(e) => handleStatusChange(customer.customer_id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Potensial">Potensial</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                {editingPhone === customer.customer_id ? (
                  <button
                    onClick={() => handlePhoneChange(customer.customer_id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingPhone(customer.customer_id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit Phone
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
