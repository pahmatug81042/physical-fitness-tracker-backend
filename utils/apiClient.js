const axios = require("axios");
require("dotenv").config();

const EXERCISEDB_HOST = process.env.EXERCISEDB_HOST;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

/**
 * Axios instance for ExerciseDB API
 */
const exerciseApi = axios.create({
    baseURL: `https://${EXERCISEDB_HOST}`,
    headers: {
        "X-RapidAPI-Host": EXERCISEDB_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
    },
});

// Fetch all exercises
const getExercises = async () => {
    const res = await exerciseApi.get("/exercises");
    return res.data;
};

// Fetch exercise by ID
const getExerciseById = async (id) => {
    const res = await exerciseApi.get(`/exercises/${id}`);
    return res.data;
};

// Fetch exercises by body part
const getExercisesByBodyPart = async (bodyPart) => {
    const res = await exerciseApi.get(`/exercises/bodyPart/${encodeURIComponent(bodyPart)}`);
    return res.data;
};

// Fetch exercises by target muscle
const getExercisesByTarget = async (target) => {
    const res = await exerciseApi.get(`/exercises/target/${encodeURIComponent(target)}`);
    return res.data;
};

// Fetch exercises by equipment
const getExercisesByEquipment = async (equipment) => {
    const res = await exerciseApi.get(`/exercises/equipment/${encodeURIComponent(equipment)}`);
    return res.data;
};

module.exports = {
    getExercises,
    getExerciseById,
    getExercisesByBodyPart,
    getExercisesByTarget,
    getExercisesByEquipment,
};