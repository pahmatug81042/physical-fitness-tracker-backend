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
  const workoutId = req.params.id;
  const {
    exerciseId,
    name,
    bodyPart,
    target,
    equipment,
    gifUrl,
    sets,
    reps,
    duration,
  } = req.body;

  if (!exerciseId) {
    res.status(400);
    throw new Error("exerciseId is required");
  }

  // Find the workout by id and user for security
  const workout = await Workout.findOne({ _id: workoutId, user: req.user._id });
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  // Try find existing Exercise by _id
  let localExercise = null;
  try {
    localExercise = await Exercise.findById(exerciseId);
  } catch {}

  // If not found by _id, try find by externalId
  if (!localExercise) {
    localExercise = await Exercise.findOne({ externalId: exerciseId });
  }

  // If still not found, create it
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
      externalId: exerciseId,
    });
  }

  // Add the exercise to the workout's exercises array
  workout.exercise.push({
    exercise: localExercise._id,
    sets: sets || 0,
    reps: reps || 0,
    duration: duration || 0,
  });

  await workout.save();

  res.status(200).json(workout);
});

// @desc Get all workouts for logged-in user
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id })
    .populate("exercise.exercise")
    .sort({ date: -1 });

  res.status(200).json(workouts);
});

// @desc Get single workout by ID
// @route GET /api/workouts/:id
// @access Private
const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate(
    "exercise.exercise"
  );

  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  res.status(200).json(workout);
});

// @desc Update workout (title/date)
// @route PUT /api/workouts/:id
// @access Private
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

// @desc Delete workout
// @route DELETE /api/workouts/:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  await workout.deleteOne();

  const user = await User.findById(req.user._id);
  user.workouts = user.workouts.filter((w) => w.toString() !== req.params.id);
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