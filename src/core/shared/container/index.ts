import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";

const baseURL = "http://localhost:3000";

const groundRepository = new AxiosGroundRepository(baseURL);

const groundService = createGroundService(groundRepository);

export const container = {
  groundService,
};
