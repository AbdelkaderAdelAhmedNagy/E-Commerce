import api from "./axios";

export const getCarts = () => api.get("/carts");
export const getCart = (id) => api.get(`/carts/${id}`);
export const getUserCarts = (userId) => api.get(`/carts/user/${userId}`);
export const addCart = (data) => api.post("/carts/add", data);
export const updateCart = (id, data) => api.put(`/carts/${id}`, data);
export const deleteCart = (id) => api.delete(`/carts/${id}`);
export const createCart = (data) => api.post("/carts/add", data);



