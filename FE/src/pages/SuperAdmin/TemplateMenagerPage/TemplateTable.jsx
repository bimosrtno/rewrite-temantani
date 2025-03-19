import { useEffect, useState } from "react";
import { getTemplates, updateTemplateStatus } from "@/services/templateService";

const TemplateTable = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const whatsappData = await getTemplates("sales");
            const emailData = await getTemplates("email");
            const marketingData = await getTemplates("marketing");

            console.log("WhatsApp Templates:", whatsappData);
            console.log("Email Templates:", emailData);
            console.log("marketing Templates:", marketingData);

            const mergedTemplates = [
                ...whatsappData.map(t => ({ ...t, category: "WhatsApp", isActive: !!t.is_active })),
                ...emailData.map(t => ({ ...t, category: "Email", isActive: !!t.is_active })),
                ...marketingData.map(t => ({ ...t, category: "Invoice", isActive: !!t.is_active }))
            ];

            setTemplates(mergedTemplates);
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    
    const handleStatusChange = async (id, newStatus) => {
        try {
            const isActive = newStatus === "Active";
            console.log(`Updating template ID: ${id}, New Status: ${isActive}`);
            await updateTemplateStatus(id, isActive);
            fetchTemplates();
        } catch (error) {
            console.error("Error updating template status:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Templates</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Subject</th>
                            <th ClassName="border p-2">Text</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map(template => (
                            <tr key={template.id} className="border">
                                <td className="border p-2 text-center">{template.id}</td>
                                <td className="border p-2 text-center">{template.type || "-"}</td>
                                <td className="border p-2">{template.subject}</td>
                                <td className="border p-2">{template.template_text}</td>
                                <td className="border p-2 text-center">
                                    <select
                                        className={`px-2 py-1 rounded ${template.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                        value={template.isActive ? "Active" : "Inactive"}
                                        onChange={(e) => handleStatusChange(template.id, e.target.value)}
                                    >
                                        <option className="bg-white text-black" value="Active">Active</option>
                                        <option className="bg-white text-black" value="Inactive">Inactive</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TemplateTable;
