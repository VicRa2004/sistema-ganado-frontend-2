import { api } from "../lib/axios";
import { ResponseIronAllType, ResponseIronOneType } from "../types";

export class IronService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async getAll(page: number = 1) {
    const resp = await api.get<ResponseIronAllType>(`/iron?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data;
  }

  async getOne(id: number) {
    const resp = await api.get<ResponseIronOneType>(`/iron/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data.data;
  }

  async create({ name, image }: { name: string; image: File }) {
    const formData = new FormData();

    console.log({ name, image });

    formData.append("name", name);
    formData.append("image", image);

    console.log(image);

    const resp = await api.post(`/iron`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp);
  }

  async update(id: number, { name, image }: { name: string; image: File }) {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);

    const resp = await api.put(`/iron/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp);
  }

  async delete({ id }: { id: number }) {
    const resp = await api.delete(`/iron/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    console.log(resp);
  }
}
