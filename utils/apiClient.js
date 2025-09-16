const axios = require("axios");
require("dotenv").config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const EXERCISEDB_HOST = process.env.EXERCISEDB_HOST;

const axiosInstance = axios.create({
    baseURL: `https://${EXERCISEDB_HOST}`,
    headers: {
        "X-RapidAPI-Host": EXERCISEDB_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
    },
});

// Fetch all exercises
const getExercises = async () => {
    const response = await axiosInstance.get("/exercises");
    return response.data;
};

// Fetch exercise by ID
const getExerciseById = async (id) => {
    const response = await axiosInstance.get(`/exercises/exercise/${id}`);
    return response.data;
};

// Fetch exercises by body part
const getExercisesByBodyPart = async (bodyPart) => {
    const response = await axiosInstance.get(`/exercises/bodyPart/${bodyPart}`);
    return response.data;
};

// Fetch exercises by target muscle
const getExerciseesByTarget = async (target) => {
    const response = await axiosInstance.get(`/exercises/target/${target}`);
    response.data;
};

// Fetch exercises by equipment
const getExercisesByEquipment = async (equipment) => {
    const response = await axiosInstance.get(`/exercises/equipment/${equipment}`);
    return response.data;
};

module.exports = { getExercises, getExerciseById, getExercisesByBodyPart, getExerciseesByTarget, getExercisesByEquipment };