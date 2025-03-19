const transporter = require('../config/EmailConfig');
const { getActiveTemplate } = require('../model/TemplateModel');

const sendEmail = async (to, message, type) => {
    try {
        if (!to) {
            return { success: false, error: "Recipient email is required", statusCode: 400 };
        }
        
        if (!message) {
            return { success: false, error: "Email message is required", statusCode: 400 };
        }

        
        const template = await getActiveTemplate(type);
        const subject = template.length > 0 ? template[0].subject : "Notifikasi Sistem";

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message 
        };
        
        console.log("Mengirim email ke:", to);
        console.log("Subject:", subject);
        console.log("Body:", message);
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email terkirim, Message ID:", info.messageId);
        
        return { 
            success: true, 
            messageId: info.messageId,
            statusCode: 200
        };
    } catch (error) {
        console.error("Gagal mengirim email:", error);
        return { 
            success: false, 
            error: error.message || "Failed to send email",
            statusCode: 500
        };
    }
};


const sendBulkEmails = async (recipients, message, type) => {
    try {
        if (!recipients || recipients.length === 0) {
            return { success: false, error: "No recipient emails found", statusCode: 400 };
        }
        
        if (!message) {
            return { success: false, error: "Email message is required", statusCode: 400 };
        }

        
        const template = await getActiveTemplate(type);
        const subject = template.length > 0 ? template[0].subject : "Notifikasi Sistem";

        const mailOptions = {
            from: process.env.EMAIL_USER,
            bcc: recipients.join(','), 
            subject,
            text: message
        };

        console.log(`Mengirim email blast ke ${recipients.length} pelanggan.`);
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email blast terkirim, Message ID:", info.messageId);

        return {
            success: true,
            messageId: info.messageId,
            totalRecipients: recipients.length,
            statusCode: 200
        };
    } catch (error) {
        console.error("Gagal mengirim email blast:", error);
        return { 
            success: false, 
            error: error.message || "Failed to send bulk emails",
            statusCode: 500
        };
    }
};

module.exports = { sendEmail, sendBulkEmails };
