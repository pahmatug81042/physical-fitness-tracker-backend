const asyncHandler = require("express-async-handler");
const apiClient = require("../utils/apiClient");

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = asyncHandler(async (req, res) => {
    const exercises = await apiClient.getExercises(); // utility fetch from RapidAPI
    res.json(exercises);
});

// @desc    Get exercise details by ID
// @route   GET /api/exercises/:id
// @access  Public
const getExerciseById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exercise = await apiClient.getExerciseById(id);

    if (!exercise) {
        res.status(404);
        throw new Error("Exercise not found");
    }

    res.json(exercise);
});

module.exports = { getExercises, getExerciseById };