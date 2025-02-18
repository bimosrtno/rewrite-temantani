const API = "localhost:5000/api/templates";

export const getTemplates =  async (type) => {
    try {
        const res = await fetch(`${API}?type=${type}`);
        return res.json();
    } catch (error) {
        console.error("Error fetching templates:", error);
        return [];
    }
};
