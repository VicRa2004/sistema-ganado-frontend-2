import { api } from "./axios";
import { ResponseUserType, LoginType } from "../vite-env";

export const login = async ({ email, password }: LoginType) => {
   const resp = await api.post<ResponseUserType>("login/", { email, password });

   //api.defaults.headers.common.Authorization = resp.data.data.token;

   return resp.data.data;
};

interface RegisterData {
   fullname: string;
   username: string;
   email: string;
   password: string;
}

export const register = async (data: RegisterData) => {
   return await api.post("register/", data);
};

export const sedEmail = async (email: string) => {
   return await api.post("/send-email", { email });
};
