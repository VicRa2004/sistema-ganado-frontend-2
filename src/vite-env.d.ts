/// <reference types="vite/client" />

export interface LoginType {
   email: string;
   password: string;
}

export interface UserType {
   id_user: number;
   fullname: string;
   username: string;
   email: string;
   token: string;
   rol: "admin" | "user";
   created_at: string;
   updated_at: string;
}

export interface RegisterType {
   fullname: string;
   username: string;
   email: string;
   password: string;
}

export interface ResponseUserType {
   data: UserType;
   status: number;
}

export type ErrorApiType =
   | "SERVER"
   | "VALIDATE"
   | "SESION"
   | "DATABASE"
   | "DATA_FORM";

export interface AxiosErrorType {
   status: number;
   message: string;
   error: ErrorApiType;
}

export interface GroundType {
   id_ground: number;
   name: string;
   image: string;
   id_user: number;
   createdAt: string;
   updatedAt: string;
}

export interface ResponseGroundAllType {
   data: GroundType[];
   maxPages: number;
   status: number;
}
