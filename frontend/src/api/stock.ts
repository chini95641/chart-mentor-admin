import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export const getStocks = async () => {
  const res = await axiosInstance.get(endpoints.stock.list);
  return res.data;
};

export const getStockDetails = async (id: string) => {
  const res = await axiosInstance.get(endpoints.stock.details(id));
  return res.data;
};

export const createStock = async (data: any) => {
  const res = await axiosInstance.post(endpoints.stock.create, data);
  return res.data;
};

export const updateStock = async (id: string, data: any) => {
  const res = await axiosInstance.put(endpoints.stock.update(id), data);
  return res.data;
};

export const deleteStock = async (id: string) => {
  const res = await axiosInstance.delete(endpoints.stock.delete(id));
  return res.data;
}; 