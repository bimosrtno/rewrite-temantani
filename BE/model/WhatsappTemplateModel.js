const db = require('../config/db');

const getActiveTemplate = async (type) => {
    try {
        const [rows] = await db.query ( `SELECT * FROM whatsapp_templates WHERE type = ? AND status = 'active'`, [type]);
    return rows;

    } catch (error) {
        throw error
    }
}



module.exports = getActiveTemplate  