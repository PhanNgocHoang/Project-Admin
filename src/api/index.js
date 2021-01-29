const axios = require("axios");

const instance = axios.create({
  baseURL: `https://e-libraryapi.herokuapp.com/`,
  // baseURL: `http://localhost:4000`,
  headers: {
    "Content-Type": "application/json",
  },
});
const upload = axios.create({
  baseURL: `https://e-libraryapi.herokuapp.com/`,
  // baseURL: `http://localhost:4000`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
module.exports.checkLogin = async function (params) {
  return await instance.post("/auth/login", params);
};
module.exports.createBookType = async function (params) {
  return await instance.post("/typebook/createtypebook", params);
};
module.exports.updateBookType = async function (values, params) {
  return await instance.put(`/typebook/${params}`, values);
};
module.exports.getBookType = async function (params) {
  return await instance.get(`/typebook?${params}`);
};

module.exports.deletetBookType = async function (params) {
  return await instance.delete(`/typebook/${params}`);
};
module.exports.getBookTypeDetailsApi = async function (params) {
  return await instance.get(`/typebook/${params}`);
};
module.exports.createPublisher = async function (params) {
  return await instance.post("/publisher/createdPublisher", params);
};
module.exports.getPublisher = async function (params) {
  return await instance.get(`/publisher?${params}`);
};
module.exports.getPublisherDetails = async function (params) {
  return await instance.get(`/publisher/${params}`);
};
module.exports.updatePublisher = async function (params, values) {
  return await instance.put(`/publisher/${params}`, values);
};
module.exports.deletetPublisher = async function (params) {
  return await instance.delete(`/publisher/${params}`);
};
module.exports.createAuthor = async function (params) {
  return await instance.post("/author/createAuthor", params);
};
module.exports.getAuthor = async function (params) {
  return await instance.get(`/author?${params}`);
};
module.exports.updateAuthor = async function (params, values) {
  return await instance.put(`/author/${params}`, values);
};
module.exports.deletetAuthor = async function (params) {
  return await instance.delete(`/author/${params}`);
};
module.exports.getAuthorDetails = async function (params) {
  return await instance.get(`/author/${params}`);
};
module.exports.getBooks = async function (params) {
  return await instance.get(`/books?${params}`);
};
module.exports.getBookDetail = async function (params) {
  return await instance.get(`/books/${params}`);
};
module.exports.createBook = async function (params) {
  return await instance.post(`/books/${params}`);
};
module.exports.updateBook = async function (params) {
  return await instance.put(`/books/${params}`);
};
module.exports.getAllBookTypes = async function () {
  return await instance.get("/typebook/getAll");
};
module.exports.getAllAuthor = async function () {
  return await instance.get("/author/getAll");
};
module.exports.getAllPublisher = async function () {
  return await instance.get("/publisher/getAll");
};
module.exports.uploadImages = async function (params) {
  return await upload.post("/upload/images", params);
};
