const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const customerRoutes = require("./routes/customers");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Log HTTP requests

// Routes
app.use("/customers", customerRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
