const asyncHandler = require("express-async-handler");
const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

// @desc Create new workout
// @route POST /api/workouts
// @access Private
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

  res.status(201).json(workout); // ✅ return created workout
});

// @desc Add exercise to workout
// @route PUT /api/workouts/:id/exercises
// @access Private
const addExerciseToWorkout = asyncHandler(async (req, res) => {
  let localExercise;

// 1. First try ObjectId
try {
  localExercise = await Exercise.findById(exerciseId);
} catch {
  localExercise = null;
}

// 2. If not found, try by externalId
if (!localExercise && exerciseId) {
  localExercise = await Exercise.findOne({ externalId: exerciseId });
}

// 3. If still not found, create it
if (!localExercise) {
  if (!name || !bodyPart || !target || !equipment) {
    res.status(400);
    throw new Error("Missing exercise data to save new exercise");
  }

  localExercise = await Exercise.create({
    name,
    bodyPart,
    target,
    equipment,
    gifUrl,
    externalId: exerciseId, // ✅ store it!
  });
}
});

// Other unchanged routes...
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id })
    .populate("exercise.exercise")
    .sort({ date: -1 });

  res.status(200).json(workouts);
});

const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercise.exercise");

  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  res.status(200).json(workout);
});

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

const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  await workout.deleteOne();

  const user = await User.findById(req.user._id);
  user.workouts = user.workouts.filter(w => w.toString() !== req.params.id);
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