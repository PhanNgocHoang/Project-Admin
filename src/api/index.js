const axios = require("axios");

const instance = axios.create({
    baseURL: `https://e-libraryapi.herokuapp.com/`,
    headers: {
        "Content-Type": "application/json",
    },
});

module.exports.checkLogin = async function (params) {
    return await instance.post("/auth/login", params);
};
