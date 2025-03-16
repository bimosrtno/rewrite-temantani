const emailBlastAPI = "http://localhost:5000/api/send-email";


export const sendEmailBlast = async (to, message, type = "notification") => {
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