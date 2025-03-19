import { useState, useEffect } from "react";
import { getActiveEmailTemplate, getCustomersEmails, sendEmailBlast } from "@/Services/EmailService";

const EmailBlastButton = () => {
    const [loading, setLoading] = useState(false);
    const [template, setTemplate] = useState(null);
    const [customerEmails, setCustomerEmails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const templateData = await getActiveEmailTemplate();
            const emails = await getCustomersEmails();

            if (templateData) setTemplate(templateData);
            if (emails.length > 0) setCustomerEmails(emails);
        };
        fetchData();
    }, []);

    const handleSendBlast = async () => {
        setLoading(true);
        try {
            const message = await getActiveEmailTemplate();
            if (!message) {
                alert("Tidak bisa mengirim email karena template kosong.");
                return;
            }

            const emails = await getCustomersEmails();
            if (emails.length === 0) {
                alert("Tidak ada email pelanggan untuk dikirimi pesan.");
                return;
            }

            const response = await sendEmailBlast(emails, message);
            if (response.success) {
                alert("Email berhasil dikirim ke semua pelanggan!");
            } else {
                alert("Gagal mengirim email. Silakan coba lagi.");
            }
        } catch (error) {
            alert("Terjadi kesalahan saat mengirim email.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-2">Email Blast</h2>

            {template ? (
                <div className="mb-2">
                    <h3 className="text-sm font-semibold">{template.subject}</h3>
                    <p className="text-xs text-gray-600">{template.template_text}</p>
                </div>
            ) : (
                <p className="text-sm text-red-500">Tidak ada template aktif</p>
            )}

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 w-full"
                onClick={handleSendBlast}
                disabled={loading || !template || customerEmails.length === 0}
            >
                {loading ? "Mengirim..." : "Kirim Email Blast"}
            </button>
        </div>
    );
};

export default EmailBlastButton;
