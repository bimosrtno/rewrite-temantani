const API_URL = "http://localhost:5000/api/templates"; 


export const getTemplates = async (type = "") => {
    try {
        const response = await fetch(`${API_URL}${type ? `?type=${type}` : ""}`);
        if (!response.ok) throw new Error("Failed to fetch templates");
        return await response.json();
    } catch (error) {
        console.error("Error fetching templates:", error);
        throw error;
    }
};


export const getActiveTemplate = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/templates/active?type=${type}`);
      
      if (!response.ok) {
        throw new Error(`Failed to get active template: ${response.status}`);
      }
      
      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Error fetching active template:", error);
      return null;
    }
  };

export const createTemplate = async (templateData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(templateData),
        });
        if (!response.ok) throw new Error("Failed to create template");
        return await response.json();
    } catch (error) {
        console.error("Error creating template:", error);
        throw error;
    }
};

// Update status template (aktif/nonaktif)
export const updateTemplateStatus = async (id, isActive) => {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_active: isActive }),
        });
        if (!response.ok) throw new Error("Failed to update template status");
        return await response.json();
    } catch (error) {
        console.error("Error updating template status:", error);
        throw error;
    }
};

export const getTemplateByType = async (type) => {
    try {
        const response = await fetch(`${API_URL}?type=${type}`);
        if (!response.ok) throw new Error(`Failed to fetch template for type: ${type}`);
        const templates = await response.json();
        return templates.length > 0 ? templates[0] : null; 
    } catch (error) {
        console.error("Error fetching template by type:", error);
        return null;
    }
};
