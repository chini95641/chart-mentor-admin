import axios, { endpoints } from 'src/utils/axios';

interface ChartOfDayData {
  imageUrl: string;
  description: string;
}

export const getChartsOfDay = () => axios.get(endpoints.chartOfDay.list);

export const createChartOfDay = (data: ChartOfDayData) =>
  axios.post(endpoints.chartOfDay.create, data);

export const updateChartOfDay = (id: string, data: ChartOfDayData) =>
  axios.put(endpoints.chartOfDay.update(id), data);

export const deleteChartOfDay = (id: string) => axios.delete(endpoints.chartOfDay.delete(id)); 