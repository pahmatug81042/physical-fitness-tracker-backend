const mongoose = require("mongoose");

// Define Exercise schema
const exerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        bodyPart: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        equipment: {
            type: String,
            required: true,
        },
        gifUrl: {
            type: String,
        },
        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
        },
        category: {
            type: String,
            default: "strength",
        },
    },
    { timestamps: true } // automatically adds createdAt and updatedAt
);

// Export Exercise model
module.exports = mongoose.model("Exercise", exerciseSchema);