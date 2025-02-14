import { useEffect, useState } from "react";
import { getProducts } from "../../Services/ProductService";

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            className="rounded-t-lg w-full h-40 object-cover"
            src={product.image || "https://via.placeholder.com/150"}
            alt={product.product_name}
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.product_name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
