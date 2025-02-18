const express = require("express");
const {FetchTemplates} = require("../controllers/WhatsappTemplateController");

const router = express.Router();

router.get('/templates', FetchTemplates);

module.exports = router;