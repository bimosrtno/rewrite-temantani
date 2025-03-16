const { sendEmail } = require('../Service/EmailService');

const EmailSend = async (req, res) => {
    try {
        const { to, type, message } = req.body;
        
        console.log(" Request masuk ke /send-blast");
        console.log("Tujuan:", to);
        console.log("Jenis template:", type);
        console.log("Pesan:", message);
        
        if (!to || !message) {
            return res.status(400).json({ success: false, message: "Missing recipient or message" });
        }
        
        const result = await sendEmail(to, message, type);
        
        if (result.success) {
            return res.json({ success: true, message: "Email sent successfully" });
        } else {
            return res.status(result.statusCode || 500).json({ 
                success: false, 
                message: result.error || "Failed to send email" 
            });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { EmailSend };