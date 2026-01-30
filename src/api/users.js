import api from "./axios";

export const getUsers = (limit = 0, skip = 0) =>
  api.get(`/users?limit=${limit}&skip=${skip}`);

export const searchUsers = (q) => api.get(`/users/search?q=${q}`);

export const getUser = (id) => api.get(`/users/${id}`);
export const getUserById = (id) => api.get(`/users/${id}`);
