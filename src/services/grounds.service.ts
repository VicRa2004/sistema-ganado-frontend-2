import { api } from "../lib/axios";
import {} from "../vite-env";

export class GroundService {
   private token: string | null;

   constructor(token: string | null) {
      this.token = token;
   }

   async getGrouns() {
      const resp = await api.get("/ground", {
         headers: {
            Authorization: `Bearer ${this.token}`,
         },
      });

      return resp.data.data;
   }
}
