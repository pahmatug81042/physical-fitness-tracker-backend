const mongoose = require("mongoose");
const workoutExerciseSchema = require("./WorkoutExercise");

// Main Workout model
const workoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        exercise: [workoutExerciseSchema], // array of embedded exercises
    },
    { timestamps: true },
);

module.exports = mongoose.model("Workout", workoutSchema);