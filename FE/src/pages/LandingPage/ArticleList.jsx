import { useState, useEffect } from "react";
import { getArticles } from "../../Services/ArticleService";

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const data = await getArticles();
            console.log("Fetched articles:", data); 

            setArticles(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setArticles([]); 
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-black mb-4">Artikel</h2>
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md p-4 mb-4"
                    >
                        {article.image_url && (
                            <img
                                src={article.image_url}
                                alt="Artikel"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                            />
                        )}
                        <p className="text-gray-500 dark:text-gray-400">
                            <a
                                href="#"
                                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                            >
                                {article.title}
                            </a>{" "}
                            {article.content}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Tidak ada artikel yang tersedia.</p>
            )}
        </div>
    );
};

export default ArticleList;
