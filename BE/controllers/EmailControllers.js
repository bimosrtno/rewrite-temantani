const { sendEmail, sendBulkEmails } = require('../Service/EmailService');
const { getCustomers } = require('../model/CustomersModel'); 


const EmailSend = async (req, res) => {
    try {
        const { to, type, message } = req.body;
        
        console.log("Request masuk ke /send-email");
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


const EmailSendBlast = async (req, res) => {
    try {
        console.log("Request masuk ke /send-blast");

        const customers = await getCustomers();
        const emails = customers.map(customer => customer.email).filter(email => email); 

        if (emails.length === 0) {
            return res.status(400).json({ success: false, message: "Tidak ada email pelanggan yang tersedia" });
        }

        const { message, type } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Email message is required" });
        }

        console.log(`Mengirim blast email ke ${emails.length} pelanggan.`);
        const result = await sendBulkEmails(emails, message, type);

        res.status(result.statusCode).json(result);
    } catch (error) {
        console.error("Error sending bulk email:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { EmailSend, EmailSendBlast };
