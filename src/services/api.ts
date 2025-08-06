/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gestaocasamento-production.up.railway.app/api', // ajuste para seu backend
});

export const getGuest = (id: string) => api.get(`/guests/${id}`);
export const respondGuest = (id: string, confirmed: boolean) =>
  api.post(`/guests/respond/${id}`, { confirmed });
export const confirmPresenceAtEvent = (id: string) =>
  api.post(`/guests/confirm-present/${id}`);

// Admin API calls
export const loginAdmin = (email: string, password: string) =>
  api.post('/admin/login', { email, password });
export const getGuests = () =>
  api.get('/guests', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
export const createGuest = (guestData: any) =>
  api.post('/guests', guestData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
export const updateGuest = (id: string, guestData: any) =>
  api.put(`/guests/${id}`, guestData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
export const deleteGuest = (id: string) =>
  api.delete(`/guests/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const GuestType = {
  INDIVIDUAL: 1,
  FAMILY: 2,
};

export const GuestStatus = {
  PENDING: 1,
  CONFIRMED: 2,
  DECLINED: 3,
  PRESENT_AT_EVENT: 4,
};
