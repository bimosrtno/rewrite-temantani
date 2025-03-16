const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function testEmail() {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "bimosrtno@gmail.com",
            subject: "Test Email",
            text: "Cek apakah email ini sampai atau tidak!"
        });

        console.log("✅ Email terkirim, Message ID:", info.messageId);
    } catch (error) {
        console.error("❌ Gagal mengirim email:", error);
        console.error("🔍 Detail error:", error.response || error);
    }
}

testEmail();
