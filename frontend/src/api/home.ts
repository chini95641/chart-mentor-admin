import axios, { endpoints } from 'src/utils/axios';

export const createQuote = (text: string) => axios.post(endpoints.quote.create, { text });
export const getQuotes = () => axios.get(endpoints.quote.list);
export const updateQuote = (id: string, text: string) =>
  axios.put(endpoints.quote.update(id), { text });
export const deleteQuote = (id: string) => axios.delete(endpoints.quote.delete(id));

export const createComment = (text: string) => axios.post(endpoints.comment.create, { text });
export const getComments = () => axios.get(endpoints.comment.list);
export const updateComment = (id: string, text: string) =>
  axios.put(endpoints.comment.update(id), { text });
export const deleteComment = (id: string) => axios.delete(endpoints.comment.delete(id)); 