const express = require("express");
const router = express.Router();
const InvoiceController = require('../controllers/invoice');

router.get('/fetch-pdf', InvoiceController.fetch_invoice);
router.post('/create-pdf', InvoiceController.create_invoice);

module.exports = router;