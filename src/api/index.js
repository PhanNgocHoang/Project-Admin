const axios = require("axios");
const jwt = localStorage.getItem("token");
const instance = axios.create({
  // baseURL: `https://e-libraryapi.herokuapp.com/`,
  baseURL: `http://localhost:4000`,

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + jwt,
  },
});
const upload = axios.create({
  // baseURL: `https://e-libraryapi.herokuapp.com/`,
  baseURL: `http://localhost:4000`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const checkLogin = async function (params) {
  return await instance.post("/auth/login", params);
};
export const createBookType = async function (params) {
  return await instance.post("/typebook/createtypebook", params);
};
export const updateBookType = async function (values, params) {
  return await instance.put(`/typebook/${params}`, values);
};
export const getBookType = async function (params) {
  return await instance.get(`/typebook?${params}`);
};
export const deletetBookTypeApi = async function (params) {
  return await instance.delete(`/typebook/${params}`);
};
export const getBookTypeDetailsApi = async function (params) {
  return await instance.get(`/typebook/${params}`);
};
export const createPublisher = async function (params) {
  return await instance.post("/publisher/createdPublisher", params);
};
export const getPublisher = async function (params) {
  return await instance.get(`/publisher?${params}`);
};
export const getPublisherDetails = async function (params) {
  return await instance.get(`/publisher/${params}`);
};
export const updatePublisher = async function (params, values) {
  return await instance.put(`/publisher/${params}`, values);
};
export const deletetPublisher = async function (params) {
  return await instance.delete(`/publisher/${params}`);
};
export const createAuthor = async function (params) {
  return await instance.post("/author/createAuthor", params);
};
export const getAuthor = async function (params) {
  return await instance.get(`/author?${params}`);
};
export const updateAuthor = async function (params, values) {
  return await instance.put(`/author/${params}`, values);
};
export const deletetAuthor = async function (params) {
  return await instance.delete(`/author/${params}`);
};
export const getAuthorDetails = async function (params) {
  return await instance.get(`/author/${params}`);
};
export const getBooks = async function (params) {
  return await instance.get(`/books?${params}`);
};
export const getBookDetail = async function (params) {
  return await instance.get(`/books/${params}`);
};
export const createBook = async function (params) {
  return await instance.post(`/books/createBook`, params);
};
export const updateBook = async function (params, data) {
  return await instance.put(`/books/${params}`, data);
};
export const deleteBook = async function (params) {
  return await instance.delete(`/books/${params}`);
};
export const getAllBookTypes = async function () {
  return await instance.get("/typebook/getAll");
};
export const getAllAuthor = async function () {
  return await instance.get("/author/getAll");
};
export const getAllPublisher = async function () {
  return await instance.get("/publisher/getAll");
};
export const uploadImages = async function (params) {
  return await upload.post("/upload/images", params);
};
export const uploadFile = async function (params) {
  return await upload.post("/upload/pdf", params);
};
export const deleteFile = async function (params) {
  return await instance.post("/upload/delete/file", params);
};
export const getUsers = async function (params) {
  return await instance.get(`/users?${params}`);
};
export const getBorrows = async function (params) {
  return await instance.get(`/order?${params}`);
};
export const getDashboard = async function () {
  return await instance.get("/dashboard");
};
export const PaymentHistory = async function (userId, params) {
  return await instance.get(`/payment/history/${userId}?${params}`);
};
export const blockUser = async function (userId) {
  return await instance.post("/users/block", userId);
};
export const unBlockUser = async function (userId) {
  return await instance.post("/users/unBlock", userId);
};
export const expiredOrder = async function (orderId) {
  return await instance.post("/order/expiredOrder", orderId);
};
