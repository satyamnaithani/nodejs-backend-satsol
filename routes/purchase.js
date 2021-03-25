const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const PurchaseController = require('../controllers/purchase')

router.get('/', PurchaseController.purchase_get_all_item);
router.get('/total',checkAuth, PurchaseController.purchase_get_total_purchase_amount);
router.put('/transaction/updateMany', checkAuth, PurchaseController.purchase_update_transaction);

module.exports = router;