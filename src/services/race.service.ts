import { api } from "../lib/axios";
import { ResponseRaceAllType } from "../types";

export class RaceService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async getAll(page: number = 1) {
    const resp = await api.get<ResponseRaceAllType>(`/race?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data;
  }
}
