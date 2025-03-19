const emailBlastAPI = "http://localhost:5000/api/send-email";
const activeTemplateAPI = "http://localhost:5000/api/templates/active";
const customersAPI = "http://localhost:5000/api/customers"; 


export const getActiveEmailTemplate = async () => {
    try {
        const res = await fetch(`${activeTemplateAPI}?type=email`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.error("Template email tidak ditemukan atau kosong:", data);
            return null;
        }

        console.log("Template Aktif:", data[0]); 

        return data[0].template_text; 
    } catch (error) {
        console.error("Error fetching active email template:", error);
        return null;
    }
};


export const getCustomersEmails = async () => {
    try {
        const res = await fetch(customersAPI);
        const data = await res.json();

        
        return data.map(customer => customer.email).filter(email => email);
    } catch (error) {
        console.error("Error fetching customer emails:", error);
        return [];
    }
};


export const sendEmailBlast = async (to, message, type = "email") => {
    try {
        console.log("Mengirim request email blast");
        console.log("Tujuan:", to);
        console.log("Isi Pesan:", message);
        console.log("Tipe:", type);

        const res = await fetch(emailBlastAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, message, type }),
        });

        const data = await res.json();
        console.log("Response:", data);
        return data;
    } catch (error) {
        console.error("Error sending email blast:", error);
        return null;
    }
};
