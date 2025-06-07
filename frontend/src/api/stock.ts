import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export const getStock = async () => {
  const res = await axiosInstance.get(endpoints.stock.details);
  return res.data;
};

export const saveStock = async (data: any) => {
  const res = await axiosInstance.post(endpoints.stock.save, data);
  return res.data;
}; 