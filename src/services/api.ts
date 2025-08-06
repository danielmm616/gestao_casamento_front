/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Cria instância do axios
const api = axios.create({
  baseURL: 'https://gestaocasamento-production.up.railway.app/api',
});

// Aplica retry automático para erros temporários
axiosRetry(api, {
  retries: 2, // total de tentativas (original + 2 repetições)
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 1s na 1ª tentativa, 2s na 2ª...
  },
  retryCondition: (error) => {
    const data = error.response?.data as { message?: string };
    const is502 =
      error.response?.status === 502 &&
      data?.message === 'Application failed to respond';
    const isNetworkError =
      error.response?.status === 500 &&
      data?.message === 'No metadata for "GuestEntity" was found.';

    return (
      is502 ||
      isNetworkError ||
      axiosRetry.isNetworkOrIdempotentRequestError(error)
    );
  },
});

// --- Funções da API ---

export const getGuest = (id: string) => api.get(`/guests/${id}`);

export const respondGuest = (id: string, confirmed: number) =>
  api.post(`/guests/respond/${id}`, { confirmed });

export const confirmPresenceAtEvent = async (id: string) => {
  try {
    const response = await api.post(`/guests/confirm-present/${id}`);
    return {
      error: false,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Erro ao confirmar presença:', error);
    return {
      error: true,
      data: error?.response?.data || {
        message: error.message || 'Erro desconhecido',
      },
    };
  }
};

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

// --- Constantes de Tipo ---

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
