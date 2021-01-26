const axios = require("axios");

const instance = axios.create({
    baseURL: `https://e-libraryapi.herokuapp.com/`,
    // baseURL: `http://localhost:4000`,
    headers: {
        "Content-Type": "application/json",
    },
});

module.exports.checkLogin = async function (params) {
    return await instance.post("/auth/login", params);
};
module.exports.createBookType = async function (params) {
    return await instance.post("/typebook/createtypebook", params);
}
module.exports.updateBookType = async function (values, params) {
    return await instance.put(`/typebook/${params}`, values);
}
