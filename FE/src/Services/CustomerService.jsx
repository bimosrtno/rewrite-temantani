const API = "http://localhost:5000/api/customers";


export const getCustomers = async () => {
    const res = await fetch(API);
    return res.json();
};


export const updateCustomerStatus = async (customer_id, status) => {
    try {
        const res = await fetch(`${API}/${customer_id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        return res.json();
    } catch (error) {
        console.error("Error updating customer status:", error);
        return null;
    }
};


export const updateCustomerPhone = async (customer_id, phone) => {
    try {
        const res = await fetch(`${API}/${customer_id}/phone`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({phone}),
        });
        return res.json();
    } catch (error) {
        console.error("Error updating customer phone:", error);
        return null;
    }
};
