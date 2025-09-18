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
// Example in .env: ALLOWED_ORIGINS=http://localhost:5173,https://your-netlify-app.netlify.app
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/cURL
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));

// ✅ Root route
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