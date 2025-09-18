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
        exercise: [],
    });

    // Add workout to user's workouts array
    const user = await User.findById(req.user._id);
    user.workouts.push(workout._id);
    await user.save();
});

// @desc    Get single workout by ID
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id)
        .populate("exercise.exercise");

    if (!workout) {
        res.status(404);
        throw new Error("Workout not found");
    }

    res.status(200).json(workout);
});

// @desc    Update workout (optional: update title, date)
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        res.status(404);
        throw new Error("Workout not found");
    }

    const { title, date } = req.body;
    if (title) workout.title = title;
    if (date) workout.date = date;

    await workout.save();
    res.status(200).json(workout);
});

// @desc    Get all workouts for logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id })
        .populate("exercise.exercise")
        .sort({ date: -1 });
    
    res.status(200).json(workouts);
});

// @desc    Add exercise to workout
// @route   PUT /api/workouts/:id/exercises
// @access  Private
const addExerciseToWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
        res.status(404);
        throw new Error("Workout not found");
    }

    const { exerciseId, sets, reps, duration } = req.body;

    if (!exerciseId) {
        res.status(400);
        throw new Error("Please provide an exercise ID");
    }

    // Ensure the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
        res.status(404);
        throw new Error("Exercise not found");
    }

    workout.exercise.push({
        exercise: exercise._id,
        sets: sets || 0,
        reps: reps || 0,
        duration: duration || 0,
    });

    await workout.save();
    res.status(200).json(workout);
});

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        res.status(404);
        throw new Error("Workout not found");
    }

    await workout.deleteOne();

    // Remove workout reference from user
    const user = await User.findById(req.user._id);
    user.workouts = user.workouts.filter(
        (wId) => wId.toString() !== req.params.id
    );
    await user.save();

    res.status(200).json({ message: "Workout deleted successfully!" });
});

module.exports = {
    createWorkout,
    getWorkoutById,
    updateWorkout,
    getWorkouts,
    addExerciseToWorkout,
    deleteWorkout,
};