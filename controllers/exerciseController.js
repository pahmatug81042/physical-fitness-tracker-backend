const asyncHandler = require("express-async-handler");
const apiClient = require("../utils/apiClient");

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = asyncHandler(async (req, res) => {
    const exercises = await apiClient.getExercises(); // utility fetch from RapidAPI
    res.json(exercises);
});

module.exports = { getExercises };