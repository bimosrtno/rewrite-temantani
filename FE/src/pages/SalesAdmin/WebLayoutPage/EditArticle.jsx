import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticleById, updateArticle, createArticle } from "@/Services/ArticleService";

const ArticleFormModal = ({ isOpen, onClose, articleId }) => {
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: "",
        content: "",
        image_url: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (articleId) {
            fetchArticle();
        } else {
            setArticle({ title: "", content: "", image_url: "" });
        }
    }, [articleId]);

    const fetchArticle = async () => {
        setLoading(true);
        try {
            const data = await getArticleById(articleId);
            if (data) {
                setArticle(data);
            } else {
                setMessage("Artikel tidak ditemukan!");
            }
        } catch (error) {
            setMessage("Gagal mengambil data artikel.");
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            if (articleId) {
                await updateArticle(articleId, article);
                setMessage("Artikel berhasil diperbarui!");
            } else {
                await createArticle(article);
                setMessage("Artikel berhasil ditambahkan!");
            }
            setTimeout(() => {
                onClose();
                navigate("/web-layout");
            }, 2000);
        } catch (error) {
            setMessage("Gagal menyimpan artikel.");
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {articleId ? "Edit Artikel" : "Tambah Artikel"}
                </h2>

                {loading && <p className="text-blue-500">Loading...</p>}
                {message && <p className={message.includes("berhasil") ? "text-green-500" : "text-red-500"}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Judul Artikel</label>
                        <input
                            type="text"
                            name="title"
                            value={article.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Konten</label>
                        <textarea
                            name="content"
                            value={article.content}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">URL Gambar</label>
                        <input
                            type="text"
                            name="image_url"
                            value={article.image_url}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {article.image_url && (
                        <div className="mb-4">
                            <img
                                src={article.image_url}
                                alt="Artikel"
                                className="w-full h-48 object-cover rounded-lg"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Menyimpan..." : articleId ? "Simpan Perubahan" : "Tambah Artikel"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ArticleController = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => {
                    setSelectedArticleId(null);
                    setIsModalOpen(true);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md transition"
            >
                Tambah Artikel
            </button>

            <ArticleFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                articleId={selectedArticleId}
            />
        </div>
    );
};

export default ArticleController;
