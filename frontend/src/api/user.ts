import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getUsers(page: number, limit: number, membership: string) {
  const URL = `${endpoints.auth.users}?page=${page}&limit=${limit}&membership=${membership}`;
  const res = await axiosInstance.get(URL);
  return res.data;
} 