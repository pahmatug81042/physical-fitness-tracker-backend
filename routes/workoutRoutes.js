const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

// Protect all workout routes
router.use(protect);

// Main workouts routes
router
  .route("/")
  .post(createWorkout) // Create a new workout
  .get(getWorkouts);   // Get all workouts for the logged-in user

router
  .route("/:id")
  .get(getWorkoutById) // Get single workout by ID
  .put(updateWorkout)  // Update workout (title/date)
  .delete(deleteWorkout); // Delete workout

// ✅ Dedicated route to add exercises to a workout
router
  .route("/:id/exercises")
  .put(addExerciseToWorkout);

module.exports = router;