import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

if (sessionStorage.getItem('accessToken')) {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('accessToken');
}

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
    users: '/api/auth/get-users',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  quote: {
    list: '/api/quotes',
    create: '/api/quotes',
    update: (id: string) => `/api/quotes/${id}`,
    delete: (id: string) => `/api/quotes/${id}`,
  },
  comment: {
    list: '/api/comments',
    create: '/api/comments',
    update: (id: string) => `/api/comments/${id}`,
    delete: (id: string) => `/api/comments/${id}`,
  },
  chartOfDay: {
    list: '/api/charts',
    create: '/api/charts',
    update: (id: string) => `/api/charts/${id}`,
    delete: (id: string) => `/api/charts/${id}`,
  },
  video: {
    list: '/api/videos',
    details: (id: string) => `/api/videos/video/${id}`,
    create: '/api/videos',
    update: (id: string) => `/api/videos/${id}`,
    delete: (id: string) => `/api/videos/${id}`,
  },
  stock: {
    details: '/api/stocks',
    save: '/api/stocks',
  },
  quiz: {
    list: '/api/quizzes',
    details: (id: string) => `/api/quizzes/${id}`,
    create: '/api/quizzes',
    update: (id: string) => `/api/quizzes/${id}`,
    delete: (id: string) => `/api/quizzes/${id}`,
  },
};
