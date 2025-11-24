import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";

const baseURL = "http://localhost:3000";
const data = localStorage.getItem("auth-storage");

if (!data) {
  throw new Error("No existe el token, verificar despues");
}

const {
  state: {
    user: { token },
  },
} = JSON.parse(data) as {
  state: {
    user: {
      token?: string;
    };
  };
};

const groundRepository = new AxiosGroundRepository(baseURL, token);

const groundService = createGroundService(groundRepository);

export const container = {
  groundService,
};
