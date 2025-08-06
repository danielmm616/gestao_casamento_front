import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api', // ajuste para seu backend
});

export const getGuest = (id: string) => api.get(`/guests/${id}`);
export const respondGuest = (id: string, confirmed: boolean) =>
  api.post(`/guests/respond/${id}`, { confirmed });
