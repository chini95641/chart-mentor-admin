import axiosInstance, { endpoints } from 'src/utils/axios';

export const getQuotes = async () => {
  const res = await axiosInstance.get(endpoints.quote.list);
  return res.data;
};

export const createQuote = async (data: any) => {
  const res = await axiosInstance.post(endpoints.quote.create, data);
  return res.data;
};

export const deleteQuote = async (id: string) => {
  const res = await axiosInstance.delete(endpoints.quote.delete(id));
  return res.data;
}; 