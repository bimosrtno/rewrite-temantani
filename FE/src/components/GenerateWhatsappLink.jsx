import { useEffect, useState } from "react";
import { getTemplateByType } from "@/services/templateService";

const GenerateWhatsappLink = ({ phoneNumber, type, buttonClass, buttonText }) => {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await getTemplateByType(type);
        if (response && response.template_text) setTemplate(response.template_text);
      } catch (error) {
        console.error("Failed to fetch template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [type]);

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/\D/g, ""); 
  };

  const formattedPhone = formatPhoneNumber(phoneNumber);

  return (
    <a
      href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(template)}`}
      className={buttonClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default GenerateWhatsappLink;
