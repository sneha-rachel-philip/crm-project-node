const express = require('express');
const {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');
const validateCustomer = require('../middleware/validation');

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/', validateCustomer, addCustomer);
router.put('/:id', validateCustomer, updateCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
