import { useState, useEffect } from "react";
import { getArticles, getArticleById } from "@/Services/ArticleService";
import DeleteArticle from "./DeleteArticle";

const ArticleTable = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const data = await getArticles();
            setArticles(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setArticles([]);
        }
    };

    const handleDetailClick = async (id) => {
        try {
            const response = await getArticleById(id);
            if (response && response.data && response.data.id) {
                setSelectedArticle(response.data);
                setIsModalOpen(true);
            } else {
                console.error("Invalid article data:", response);
            }
        } catch (error) {
            console.error("Error fetching article details:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedArticle(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Daftar Artikel</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Judul</th>
                            <th className="py-2 px-4 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <tr key={article.id} className="border">
                                    <td className="py-2 px-4 border">{article.id}</td>
                                    <td className="py-2 px-4 border">{article.title}</td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleDetailClick(article.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Detail
                                        </button>
                                        <DeleteArticle id={article.id} onDeleteSuccess={fetchArticles} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    Tidak ada artikel yang tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-300">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-black">Detail Artikel</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 bg-transparent hover:bg-gray-300 hover:text-black rounded-lg text-sm w-8 h-8"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>

                        {/* Konten Modal */}
                        {selectedArticle && (
                            <div className="p-4 text-sm text-black">
                                <p><strong>ID:</strong> {selectedArticle.id}</p>
                                <p><strong>Judul:</strong> {selectedArticle.title}</p>
                                <p><strong>Konten:</strong> {selectedArticle.content || "Tidak ada konten"}</p>
                                <p><strong>Gambar:</strong> 
                                    <a href={selectedArticle.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        {selectedArticle.image_url}
                                    </a>
                                </p>
                                <p><strong>Dibuat:</strong> {selectedArticle.created_at}</p>
                                <p><strong>Diperbarui:</strong> {selectedArticle.updated_at}</p>
                            </div>
                        )}

                        {/* Footer Modal */}
                        <div className="p-4 flex justify-end">
                            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleTable;
