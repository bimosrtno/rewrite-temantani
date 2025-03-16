const transporter = require('../config/EmailConfig');

const sendEmail = async (to, message, type) => {
    try {

        if (!to) {
            return { success: false, error: "Recipient email is required", statusCode: 400 };
        }
        
        if (!message) {
            return { success: false, error: "Email message is required", statusCode: 400 };
        }
        
        const subject = type ? `Notifikasi ${type}` : "Notifikasi Sistem";
        
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

module.exports = { sendEmail };