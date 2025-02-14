const Article = require('../model/ArticlesModel');


const getArticles = (req, res) => {
    Article.getArticles((err, articles) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        res.status(200).json({ success: true, data: articles });
    });
};

const getArticleById = (req, res) => {
    const { id } = req.params;
    Article.getArticleById(id, (err, article) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
        res.status(200).json({ success: true, data: article });
    });
};

const createArticle = (req, res) => {
    const { title, content, image_url } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    Article.createArticle({ title, content, image_url }, (err, articleId) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        res.status(201).json({ success: true, message: 'Article created successfully', id: articleId });
    });
};


const updateArticle = (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    Article.updateArticle(id, { title, content, image_url }, (err, updatedRows) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        if (updatedRows === 0) {
            return res.status(404).json({ success: false, message: 'Article not found or no changes made' });
        }
        res.status(200).json({ success: true, message: 'Article updated successfully' });
    });
};


const deleteArticle = (req, res) => {
    const { id } = req.params;
    Article.deleteArticle(id, (err, deletedRows) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        if (deletedRows === 0) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }
        res.status(200).json({ success: true, message: 'Article deleted successfully' });
    });
};

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle };
