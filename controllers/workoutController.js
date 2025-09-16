const asyncHandler = require("express-async-handler");
const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
    const { title, date } = req.body;

    if (!title) {
        res.status(400);
        throw new Error("Please add a title for the workout");
    }

    const workout = await Workout.create({
        title,
        date: date || new Date(),
        user: req.user._id,
        exercises: [],
    });

    // Add workout to user's workouts array
    const user = await User.findById(req.user._id);
    user.workouts.push(workout._id);
    await user.save();

    res.json(201).json(workout);
});

module.exports.createWorkout = createWorkout;

// @desc    Get all workouts for logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id })
        .populate("exercises.exercise")
        .sort({ date: -1 });

    res.status(200).json(workouts);
});

module.exports.getWorkouts = getWorkouts;