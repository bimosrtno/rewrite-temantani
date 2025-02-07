const express = require("express");
const router = express.Router();
const { getAllSales, createSales , updateSalesStatus } = require("../controllers/SalesController");

router.get("/sales", getAllSales);
router.post("/sales", createSales);
router.put ("/sales/:transaction_id/status", updateSalesStatus);


module.exports = router;
