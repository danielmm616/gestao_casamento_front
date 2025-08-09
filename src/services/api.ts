import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

axiosRetry(api, {
  retries: 2,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const loginAdmin = (email: string, password: string) =>
  api.post('/admin/login', { email, password });

export const getGuests = async () => {
  try {
    const response = await api.get('/guests', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized access. Please log in again.');
    }
    console.error('Error fetching guests:', error);
    throw error;
  }
};

export const createGuest = (guestData: ICreateGuest) =>
  api.post('/guests', guestData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const updateGuest = (id: string, guestData: ICreateGuest) =>
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

export const guestStatusMap = new Map<number, string>([
  [GuestStatus.PENDING, 'Pendente'],
  [GuestStatus.CONFIRMED, 'Confirmado'],
  [GuestStatus.DECLINED, 'Recusado'],
  [GuestStatus.PRESENT_AT_EVENT, 'Presente no Evento'],
]);

export interface IGuest {
  id: string;
  title: string;
  type: number;
  names: string[];
  quantity: number;
  status: number;
  cellphone: string;
  createdAt: string;
  updatedAt: string;
  qrCode?: string;
}

interface ICreateGuest {
  title: string;
  names: string[];
  status: number;
  cellphone: string;
}
