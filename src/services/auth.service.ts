import { api } from "../lib/axios";
import { ResponseUserType, LoginType } from "../vite-env";

interface RegisterData {
   fullname: string;
   username: string;
   email: string;
   password: string;
}

const login = async ({ email, password }: LoginType) => {
   const resp = await api.post<ResponseUserType>("login/", { email, password });

   return resp.data.data;
};

const register = async (data: RegisterData) => {
   return await api.post("register/", data);
};

const sendEmail = async (email: string) => {
   return await api.post("/send-email", { email });
};

const verifyEmail = async (token: string) => {
   return await api.post(`/verify-email/${token}`);
};

const isLogged = () => {};

export const authService = {
   login,
   register,
   isLogged,
   sendEmail,
   verifyEmail,
};
