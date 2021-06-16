const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report');

router.get('/purchase', ReportController.get_purchase_report);
router.get('/sales', ReportController.get_sales_report);

module.exports = router;