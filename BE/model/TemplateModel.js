const db = require("../config/db");

const getTemplatesByType = async (type) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM message_templates WHERE type = ?";
        db.query(query, [type], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const getAllTemplates = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM message_templates";
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const getActiveTemplate = async (type) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM message_templates WHERE type = ? AND is_active = 1";
        db.query(query, [type], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const createTemplate = async (type, subject, template_text, is_active) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO message_templates (type, subject, template_text, is_active) VALUES (?, ?, ?, ?)";
        db.query(query, [type, subject, template_text, is_active], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId, type, subject, template_text, is_active });
        });
    });
};

const updateTemplateStatus = async (id, is_active) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE message_templates SET is_active = ? WHERE id = ?";
        db.query(query, [is_active, id], (err, result) => {
            if (err) reject(err);
            else resolve({ message: "Template status updated successfully", affectedRows: result.affectedRows });
        });
    });
};

module.exports = { getTemplatesByType, getAllTemplates, getActiveTemplate, createTemplate, updateTemplateStatus };
