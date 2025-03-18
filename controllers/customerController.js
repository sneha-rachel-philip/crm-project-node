const customers = require('../data/customers');

const getCustomers = (req, res) => {
    let result = customers;
    
    // Filtering customers
    if (req.query.name) result = result.filter(c => c.name.toLowerCase().includes(req.query.name.toLowerCase()));
    if (req.query.email) result = result.filter(c => c.email.toLowerCase() === req.query.email.toLowerCase());
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const paginatedResult = result.slice(startIndex, startIndex + limit);
    
    res.json({ page, total: result.length, data: paginatedResult });
};

const getCustomerById = (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    customer ? res.json(customer) : res.status(404).json({ message: 'Customer not found' });
};

const addCustomer = (req, res) => {
    const newCustomer = { id: customers.length + 1, ...req.body };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
};

const updateCustomer = (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    Object.assign(customer, req.body);
    res.json(customer);
};

const deleteCustomer = (req, res) => {
    const index = customers.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Customer not found' });

    customers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
};

module.exports = { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer };
