import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInterceptor = (token: string | null) => {
   const updateHeader = (request: InternalAxiosRequestConfig) => {
      if (request.headers) {
         request.headers.set("Authorization", token ? `Bearer ${token}` : "");
         request.headers.set("Content-Type", "application/json");
      }
      return request;
   };

   axios.interceptors.request.use((request) => {
      return updateHeader(request);
   });
};
