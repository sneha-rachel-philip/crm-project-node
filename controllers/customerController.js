const customers = require("../data/customers");

// Get All Customers with Filtering & Pagination
const getCustomers = (req, res) => {
    const { name, email, location, page = 1, limit = 5 } = req.query;

    let filteredCustomers = customers;

    // Filtering by name, email, or location
    if (name) {
        filteredCustomers = filteredCustomers.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (email) {
        filteredCustomers = filteredCustomers.filter(c => c.email.toLowerCase().includes(email.toLowerCase()));
    }
    if (location) {
        filteredCustomers = filteredCustomers.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        return res.status(400).json({ message: "Invalid page or limit values" });
    }

    const startIndex = (pageNum - 1) * limitNum;
    const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
        page: pageNum,
        limit: limitNum,
        totalCustomers: filteredCustomers.length,
        totalPages: Math.ceil(filteredCustomers.length / limitNum),
        data: paginatedCustomers
    });
};

// Get Customer by ID
const getCustomerById = (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
};

// Add New Customer
const addCustomer = (req, res) => {
    const { name, email, location } = req.body;

    if (!name || !email || !location) {
        return res.status(400).json({ message: "Name, email, and location are required" });
    }

    const newCustomer = {
        id: customers.length + 1,
        name,
        email,
        location
    };

    customers.push(newCustomer);
    res.status(201).json(newCustomer);
};

// Update Customer
const updateCustomer = (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    Object.assign(customer, req.body);
    res.status(200).json({ message: "Customer updated", customer });
};

// Delete Customer
const deleteCustomer = (req, res) => {
    const index = customers.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Customer not found" });
    }

    customers.splice(index, 1);
    res.status(200).json({ message: "Customer deleted successfully" });
};

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
