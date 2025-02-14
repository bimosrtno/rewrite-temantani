const db = require('../config/db');


const getArticles = (callback) => {
    db.query('SELECT * FROM articles', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};


const getArticleById = (id, callback) => {
    db.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length ? results[0] : null);
    });
};


const createArticle = (data, callback) => {
    const { title, content, image_url } = data;
    db.query(
        'INSERT INTO articles (title, content, image_url) VALUES (?, ?, ?)',
        [title, content, image_url],
        (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        }
    );
};


const updateArticle = (id, data, callback) => {
    const { title, content, image_url } = data;
    db.query(
        'UPDATE articles SET title = ?, content = ?, image_url = ? WHERE id = ?',
        [title, content, image_url, id],
        (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows);
        }
    );
};

const deleteArticle = (id, callback) => {
    db.query('DELETE FROM articles WHERE id = ?', [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.affectedRows);
    });
};

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle };
