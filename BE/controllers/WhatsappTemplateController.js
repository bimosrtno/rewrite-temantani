const { getActiveTemplate} = require ('../model/WhatsappTemplateModel');

const FetchTemplates = async (req, res) => {
    try {
        const { type } = req.query;
        const templates = await getActiveTemplate(type);
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { FetchTemplates};