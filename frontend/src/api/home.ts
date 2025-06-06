import axios, { endpoints } from 'src/utils/axios';

export const createQuote = (text: string) => axios.post(endpoints.quote.create, { text });

export const createComment = (text: string) => axios.post(endpoints.comment.create, { text }); 