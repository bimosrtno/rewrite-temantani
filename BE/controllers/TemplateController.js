const { getTemplatesByType, getAllTemplates, getActiveTemplate, createTemplate, updateTemplateStatus } = require("../model/TemplateModel");

const fetchTemplates = async (req, res) => {
    try {
        const { type } = req.query;
        const templates = type ? await getTemplatesByType(type) : await getAllTemplates();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const fetchActiveTemplate = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) return res.status(400).json({ message: "Type is required" });

        const template = await getActiveTemplate(type);
        res.json(template);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const createNewTemplate = async (req, res) => {
    try {
        const { type, subject, template_text, is_active } = req.body;
        if (!type || !subject || !template_text || is_active === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTemplate = await createTemplate(type, subject, template_text, is_active);
        res.json({ message: "Template created successfully", data: newTemplate });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;

        if (is_active === undefined) {
            return res.status(400).json({ message: "is_active is required" });
        }

        await updateTemplateStatus(id, is_active);
        res.json({ message: "Template status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { fetchTemplates, fetchActiveTemplate, createNewTemplate, updateTemplate };
