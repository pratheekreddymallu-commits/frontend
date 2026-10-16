import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getServiceHealth = async () => {
  const { data } = await api.get('/health');
  return data;
};

export const getPublicImpact = async () => {
  const { data } = await api.get('/analytics/public-impact');
  return data;
};

export const getDashboardStats = async (role = 'donor') => {
  const { data } = await api.get(`/analytics/${role}`);
  return data.stats;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};

export const logoutUser = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const getDonations = async () => {
  const { data } = await api.get('/donations');
  return data;
};

export const getDonation = async (id) => {
  const { data } = await api.get(`/donations/${id}`);
  return data;
};
