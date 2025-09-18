const express = require("express");
const router = express.Router();
const { getExercises, getExerciseById, getExercisesByBodyPart, getExercisesByTarget, getExercisesByEquipment } = require("../controllers/exerciseController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getExercises);
router.get("/:id", getExerciseById);
router.get("/bodyPart/:bodyPart", getExercisesByBodyPart);
router.get("/target/:target", getExercisesByTarget);
router.get("/equipment/:equipment", getExercisesByEquipment);

module.exports = router;