const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// conect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Enable JSON parsing
app.use(express.json());

// Enable CORS for frontend communication
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Root route
app.get("/", (req, res) => {
    res.send("Fitness Tracker Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});