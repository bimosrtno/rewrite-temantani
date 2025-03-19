import { sendEmailBlast } from "@/services/emailService";
import { getActiveTemplate } from "@/services/templateService";

const SendEmailButton = ({ to, type }) => {
    const handleSendEmail = async () => {
        try {
        
            const template = await getActiveTemplate(type);
            if (!template) {
                alert("Tidak ada template aktif untuk tipe ini.");
                return;
            }

            console.log("Template ditemukan:", template);

            
            const emailContent = template.template_text || "Pesan default jika template kosong";

            console.log(" Mengirim email dengan isi:", emailContent);

            
            const response = await sendEmailBlast(to, emailContent);
            if (response.success) {
                alert("Email berhasil dikirim!");
            } else {
                alert("Gagal mengirim email.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Terjadi kesalahan saat mengirim email.");
        }
    };

    return <button onClick={handleSendEmail}>Send Email</button>;
};

export default SendEmailButton;
