import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getProductById, updateProduct } from "@/Services/ProductService";

const EditProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [product, setProduct] = useState({ description: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        if (data.length > 0) {
            setProducts(data);
        }
    };

    const handleProductChange = async (e) => {
        const productId = e.target.value;
        setSelectedProductId(productId);
        if (productId) {
            setLoading(true);
            const data = await getProductById(productId);
            if (data) {
                setProduct({ description: data.description, image: data.image });
                setIsModalOpen(true);
            } else {
                setMessage("Produk tidak ditemukan");
            }
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProductId) {
            setMessage("Silakan pilih produk terlebih dahulu.");
            return;
        }

        setLoading(true);
        try {
            await updateProduct(selectedProductId, product);
            setMessage("Deskripsi dan gambar berhasil diperbarui!");
            setTimeout(() => {
                setIsModalOpen(false);
            }, 2000);
        } catch (error) {
            setMessage("Gagal memperbarui produk");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            {message && <p className={message.includes("berhasil") ? "text-green-500" : "text-red-500"}>{message}</p>}

            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-blue-500 text-white py-2 px-4 mb-4"
            >
                Edit Produk
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-white font-semibold mb-4">Pilih Produk</h3>
                        <select value={selectedProductId} onChange={handleProductChange} className="text-white border p-2 w-full">
                            <option value="">-- Pilih Produk --</option>
                            {products.map((p) => (
                                <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
                            ))}
                        </select>

                        {selectedProductId && (
                            <form onSubmit={handleSubmit} className="text-white mt-4">
                                <label>Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    required
                                    className="text-white border p-2 w-full"
                                ></textarea>

                                <label>URL Gambar</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={product.image}
                                    onChange={handleChange}
                                    className="border p-2 w-full"
                                />

                                <div className="flex justify-between mt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white py-2 px-4">
                                        Batal
                                    </button>
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
