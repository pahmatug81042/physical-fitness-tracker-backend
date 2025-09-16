require("dotenv").config();
/**
 * Custom error handling middleware
 * Handles errors from routes and controllers
 */
const errorHandler = (err, req, res, next) => {
    // Set default status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        // Include stack trace only in development
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { errorHandler };