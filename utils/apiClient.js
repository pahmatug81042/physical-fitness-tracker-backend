const axios = require("axios");

/**
 * Create a reusable Axios instance for RapidAPI requests
 * @param {string} host - RapidAPI Host (e.g., exercisedb.p.rapidapi.com)
 * @param {string} key - RapidAPI Key
 * @returns {AxiosInstance} Configured Axios client
 */
const createApiClient = (host, key) => {
    return axios.create({
        baseURL: `https://${host}`,
        headers: {
            "X-RapidAPI-Host": host,
            "X-RapidAPI-Key": key,
        },
    });
};

module.exports = createApiClient;