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