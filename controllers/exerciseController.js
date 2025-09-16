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

// @desc    Get exercises by body part
// @route   GET /api/exercises/bodyPart/:bodyPart
// @access  Public
const getExercisesByBodyPart = asyncHandler(async (req, res) => {
    const { bodyPart } = req.params;
    const exercises = await apiClient.getExercisesByBodyPart(bodyPart);

    res.json(exercises);
});

// @desc    Get exercises by target muscle
// @route   GET /api/exercises/target/:target
// @access  Public
const getExercisesByTarget = asyncHandler(async (req, res) => {
    const { target } = req.params;
    const exercises = await apiClient.getExerciseesByTarget(target);

    res.json(exercises);
});

// @desc    Get exercises by equipment
// @route   GET /api/exercises/equipment/:equipment
// @access  Public
const getExercisesByEquipment = asyncHandler(async (req, res) => {
    const { equipment } = req.params;
    const exercises = await apiClient.getExercisesByEquipment(equipment);

    res.json(exercises);
});

module.exports = { getExercises, getExerciseById, getExercisesByBodyPart, getExercisesByTarget, getExercisesByEquipment };