const mongoose = require("mongoose");

// Subdocument schema for exercises inside a workout
const workoutExerciseSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
    },
    sets: {
        type: Number,
        default: 1,
    },
    reps: {
        type: Number,
        default: 10,
    },
    duration: {
        type: Number, // duration in minutes
        default: 0,
    },
});

module.exports = workoutExerciseSchema;