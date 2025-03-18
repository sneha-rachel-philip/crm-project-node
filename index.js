const express = require('express');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes');
const logger = require('./middleware/logger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use('/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
