const express = require("express");
const router = express.Router();
const { fetchExerciseVideos } = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

// Public route to fetch YouTube videos by exercise name
router.get("/:exerciseName", fetchExerciseVideos);

module.exports = router;