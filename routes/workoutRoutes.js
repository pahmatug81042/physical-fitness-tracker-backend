const express = require("express");
const router = express.Router();
const {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

// Protect all workout routes
router.use(protect);

// Routes
router
    .route("/")
    .post(createWorkout) // Add new workout
    .get(getWorkouts); // Get all workouts for user

router
    .route("/:id")
    .get(getWorkoutById) // Get single workout by ID
    .put(updateWorkout) // Update workout (add exercises, sets, reps, duration)
    .delete(deleteWorkout); // Delete workout

module.exports = router;