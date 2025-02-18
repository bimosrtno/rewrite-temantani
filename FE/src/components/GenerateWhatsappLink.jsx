import { useState, useEffect } from "react";
import { getTemplates } from "@/services/whatsappService";

const GenerateWhatsappLink = ({ phoneNumber, type, buttonClass, buttonText }) => {
    const [template, setTemplate] = useState("");

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const templates = await getTemplates(type);
                if (templates.length > 0) {
                    setTemplate(templates[0].template_text);
                }
            } catch (error) {
                console.error("Error fetching template:", error);
            }
        };

        fetchTemplate();
    }, [type]); 

    const formattedPhoneNumber = phoneNumber.startsWith("0") 
        ? `+62${phoneNumber.slice(1)}`
        : phoneNumber;  

    const encodeMessage = encodeURIComponent(template);
    const waLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeMessage}`;

    return (
        <a href={waLink} target="_blank" rel="noopener noreferrer">
            <button className={buttonClass}>
                {buttonText}
            </button>
        </a>
    );
};

export default GenerateWhatsappLink;
