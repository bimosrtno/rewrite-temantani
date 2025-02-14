const API = "http://localhost:5000/api/articles";

export const getArticles = async () => {
    const res = await fetch(API);
    return res.json();
};

export const getArticleById = async (id) => {
    const res = await fetch(`${API}/${id}`);
    return res.json();
};

export const createArticle = async (article) => {
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
    });
};

export const updateArticle = async (id, article) => {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
    });
};

export const deleteArticle = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
};
