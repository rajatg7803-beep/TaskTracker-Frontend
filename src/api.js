import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

//All endpoints will be attached to this (/auth and /tasks).
//Sends a POST request to /auth/register
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
//Sends a POST request to /auth/login
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

//Sends a GET request to /tasks.
export const getTasks = (token) =>
  axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });

//Sends a POST request to /tasks with task data.
export const addTask = (task, token) =>
  axios.post(`${API_URL}/tasks`, task, { headers: { Authorization: `Bearer ${token}` } });

//Sends a PUT request to update a task by its id.
export const updateTask = (id, updates, token) =>
  axios.put(`${API_URL}/tasks/${id}`, updates, { headers: { Authorization: `Bearer ${token}` } });

//Sends a DELETE request to remove a task by id
export const deleteTask = (id, token) =>
  axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });