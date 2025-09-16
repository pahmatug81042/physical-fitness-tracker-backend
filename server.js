const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
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

// ✅ Root route (must be before error handlers)
app.get("/", (req, res) => {
    res.json({ message: "Fitness Tracker Backend is running" });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});