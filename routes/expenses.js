const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const ExpensesController = require('../controllers/expenses')

router.get('/total', checkAuth, ExpensesController.expenses_get_all_expenses);
router.get('/total/:name', checkAuth, ExpensesController.expenses_get_by_name_expenses);
router.get('/total_details/:name', checkAuth, ExpensesController.expenses_get_by_name_details_expenses);
router.post('/', checkAuth, ExpensesController.expenses_create_expense);

module.exports = router;