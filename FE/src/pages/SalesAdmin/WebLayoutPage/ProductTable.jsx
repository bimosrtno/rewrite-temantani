import { useState, useEffect } from "react";
import { getProducts } from "@/Services/ProductService";

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data.data || []);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Kategori</th>
                            <th className="py-2 px-4 border">Nama Produk</th>
                            <th className="py-2 px-4 border">Deskripsi</th>
                            <th className="py-2 px-4 border">Harga</th>
                            <th className="py-2 px-4 border">Stok</th>
                            <th className="py-2 px-4 border">Gambar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.product_id} className="border">
                                    <td className="py-2 px-4 border">{product.product_id}</td>
                                    <td className="py-2 px-4 border">{product.category}</td>
                                    <td className="py-2 px-4 border">{product.product_name}</td>
                                    <td className="py-2 px-4 border">{product.description}</td>
                                    <td className="py-2 px-4 border">{product.price}</td>
                                    <td className="py-2 px-4 border">{product.stock}</td>
                                    <td className="py-2 px-4 border">
                                        <a href={product.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            {product.image}
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    Tidak ada produk yang tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
