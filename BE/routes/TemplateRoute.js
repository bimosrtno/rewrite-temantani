const express = require("express");
const { fetchTemplates, fetchActiveTemplate, createNewTemplate, updateTemplate } = require("../controllers/TemplateController");

const router = express.Router();

router.get("/templates", fetchTemplates);
router.get("/templates/active", fetchActiveTemplate);
router.post("/templates", createNewTemplate);
router.put("/templates/:id/status", updateTemplate);

module.exports = router;
