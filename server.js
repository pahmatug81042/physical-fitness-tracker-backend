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

// ✅ Configure CORS with allowed origins from .env
// Example in .env:
// ALLOWED_ORIGINS=http://localhost:5173,https://profound-sunshine-034413.netlify.app
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

// Custom CORS middleware to always return headers for allowed origins
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );
  }

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Fitness Tracker Backend is running" });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ") || "None"}`);
});