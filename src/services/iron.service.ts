import { api } from "../lib/axios";

export class IronService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async getAll() {
    const resp = await api.get("/irons", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data;
  }

  async getOne(id: number) {
    const resp = await api.get(`/irons/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data.data;
  }

  create() {}

  update() {}

  delete() {}
}
