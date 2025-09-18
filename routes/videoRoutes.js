const express = require("express");
const router = express.Router();
const { fetchExerciseVideos } = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/:exerciseName", fetchExerciseVideos);

module.exports = router;