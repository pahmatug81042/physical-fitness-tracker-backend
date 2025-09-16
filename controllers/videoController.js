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