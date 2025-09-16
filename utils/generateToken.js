const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Generate a JWT for a user
 * @param {string} userId - MonogoDB _id of the user
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d", // token valid for 30 days
    });
};

module.exports = generateToken;