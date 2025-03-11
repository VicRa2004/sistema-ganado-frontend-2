import { api } from "../lib/axios";
import {
  CattleCreate,
  ResponseCattleAllType,
  ResponseCattleOneType,
} from "../types";

export class CattleService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async getAll(page: number = 1) {
    const resp = await api.get<ResponseCattleAllType>(`/cattle?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data;
  }

  async getOne(id: number) {
    const resp = await api.get<ResponseCattleOneType>(`/cattle/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data.data;
  }

  async create({ cattle, image }: { cattle: CattleCreate; image?: File }) {
    const formData = new FormData();

    const newData = {
      ...cattle,
      birthdate: cattle.birthdate.toISOString(),
    };

    formData.append("data", JSON.stringify(newData));

    if (image) {
      formData.append("image", image);
    }

    await api.post("/cattle", formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(
    id: number,
    { cattle, image }: { cattle: CattleCreate; image: File }
  ) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(cattle));
    formData.append("image", image);

    await api.put(`/cattle/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete({ id }: { id: number }) {
    await api.delete(`/cattle/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
