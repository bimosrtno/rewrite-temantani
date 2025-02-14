const express = require('express');
const router = express.Router();
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/ArticleController');

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

module.exports = router;
