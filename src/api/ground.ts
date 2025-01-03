import { api } from "./axios";

export const getGrouns = async (token: string | null) => {
   const resp = await api.get("/ground", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   return resp.data.data;
};
