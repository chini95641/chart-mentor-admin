import axios, { AxiosRequestConfig } from "axios";

import { HOST_API } from "src/config-global";

// ----------------------------------------------------------------------

if (sessionStorage.getItem("accessToken")) {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem(
    "accessToken"
  );
}

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  
  const res = await axiosInstance.get(url, { params: { ...config } });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: "/api/chat",
  kanban: "/api/kanban",
  calendar: "/api/calendar",
  admin: {
    userList: "/api/auth/get-users",
    userRoleUpdate: "/api/auth/assign-role",
  },
  auth: {
    me: "/api/auth/me",
    login: "/api/auth/login",
    register: "/api/auth/register",
  },
  mail: {
    list: "/api/mail/list",
    details: "/api/mail/details",
    labels: "/api/mail/labels",
  },
  post: {
    list: "/api/post/list",
    details: "/api/post/details",
    latest: "/api/post/latest",
    search: "/api/post/search",
  },
  product: {
    list: "/api/product/list",
    details: "/api/product/details",
    search: "/api/product/search",
  },
  graveyard: {
    create: "/api/graveyard/create",
    update: "/api/graveyard/update",
    upload: "/api/upload/images",
    list: "api/graveyard/getByToken",
    dashboardlist: "api/graveyard/getAllGraveyard",
    delete: "api/graveyard/delete",
    getById: "api/graveyard/getById",
    details: "/api/product/details",
    search: "/api/product/search",
    approve: "/api/graveyard/approve",
  },
  gravestone: {
    create: "/api/gravestone/create",
    update: "/api/gravestone/update",
    upload: "/api/upload/images",
    list: "api/gravestone/getByToken",
    delete: "api/gravestone/delete",
    getByGraveyardId: "api/gravestone/getByGraveyardId",
    getGravestones: "api/gravestone/getGravestones",
    getById: `/api/gravestone/getById`,
    details: "/api/gravestone/details",
    search: "/api/gravestone/search",
  },
  services: {
    create: "/api/services/create",
    update: "/api/services/update",
    getAll: "/api/services/getAll",
    getByCompanyId: "/api/services/getByCompanyId",
    getListsByGraveyardId: "/api/services/getByGraveyardId",
    getByGraveyardId: "/api/services/getRequestsByGraveyardId",
    getById: "/api/services/getById",
    delete: "/api/services/delete",
    approveByAdmin: "/api/services/setApprove",
    approveByFellesraad: "/api/services/setApproveRequest",
    request: "/api/services/request",
    requestedService: "/api/services/getRequestsByCompanyId",
  },
  order: {
    create: "/api/order/create",
    get: "/api/order/get",
    approve: "/api/order/approve",
  },
};
