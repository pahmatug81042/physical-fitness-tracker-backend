const axios = require("axios");
require("dotenv").config();

// Load evironment variables
const YOUTUBE_HOST = process.env.YOUTUBE_HOST;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Create Axios instance for YouTube API
const youtubeApi = axios.create({
    baseURL: `https://${YOUTUBE_HOST}`,
    headers: {
        "X-RapidAPI-Host": YOUTUBE_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
    },
});

module.exports = { youtubeApi };

const fetchExerciseVideos = async (exerciseName) => {
    try {
        const response = await youtubeApi.get("/search", {
            params: { query: `${exerciseName} exercise` },
        });

        // Return array of video contents or empty array
        return response.data?.contents || [];
    } catch (error) {
        console.error("Error fetching exercise videos:", error.message);
        return [];
    }
};

module.exports.fetchExerciseVideos = fetchExerciseVideos;