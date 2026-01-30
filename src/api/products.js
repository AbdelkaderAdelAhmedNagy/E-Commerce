import api from "./axios";

export const getProducts = (limit = 0, skip = 0) =>
  api.get(`/products?limit=${limit}&skip=${skip}`);

export const searchProducts = (q) => api.get(`/products/search?q=${q}`);

export const getProduct = (id) => api.get(`/products/${id}`);

export const addProduct = (data) => api.post("/products/add", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getCategories = () => api.get("/products/categories");

export const getByCategory = (category) =>
  api.get(`/products/category/${category}`);

export const sortProducts = (sortBy, order = "asc", limit = 0, skip = 0) =>
  api.get(
    `/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`,
  );

  