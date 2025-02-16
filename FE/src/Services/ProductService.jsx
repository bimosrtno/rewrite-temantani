const API = "http://localhost:5000/api/products" ;

export const getProducts = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };


export const getProductById = async (productId) => {
  try {
    const response = await fetch (`${API}/${productId}`);
    if (!response.ok) throw new error ("gagal mengambil data produk");
    return await response.json();
  } catch (error) {
    console.error ("error fetching product:", error);
    return null
  }
};

export const addProduct = async (product) => {
  try {
      const response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Gagal menambahkan produk");
      return await response.json();
  } catch (error) {
      console.error("Error adding product:", error);
      return null;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
      const response = await fetch(`${API}/${productId}/description`, { 
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Gagal memperbarui produk");
      return await response.json();
  } catch (error) {
      console.error("Error updating product:", error);
      return null;
  }
};


export const deleteProduct = async (productId) => {
  try {
      const response = await fetch(`${API}/${productId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Gagal menghapus produk");
      return await response.json();
  } catch (error) {
      console.error("Error deleting product:", error);
      return null;
  }
};
