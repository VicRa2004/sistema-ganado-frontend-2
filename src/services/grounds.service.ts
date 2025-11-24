import { api } from "../lib/axios";
import { GroundCreateType } from "../types";

export class GroundService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async getGrouns(page: number = 1) {
    const resp = await api.get(`/ground?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    console.log(resp.data.data);

    return resp.data.data;
  }

  async getOneGround(id: number) {
    const resp = await api.get(`/ground/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return resp.data.data;
  }

  async createGround({
    ground,
    image,
  }: {
    ground: GroundCreateType;
    image?: File;
  }) {
    const formData = new FormData();

    console.log(image);

    // Mandamos los datos en este formato para
    // que podamos procesarlo correctamente
    if (image) {
      formData.append("image", image);
    }
    formData.append("data", JSON.stringify(ground));

    console.log(ground);
    console.log(formData);

    const resp = await api.post("/ground", formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp.data);
  }

  async updateGround({
    id,
    ground,
    image,
  }: {
    id: number;
    ground: GroundCreateType;
    image?: File;
  }) {
    const formData = new FormData();

    console.log(image);

    // Mandamos los datos en este formato para
    // que podamos procesarlo correctamente
    if (image) {
      formData.append("image", image);
    }

    formData.append("data", JSON.stringify(ground));

    console.log(ground);
    console.log(formData);

    const resp = await api.put(`/ground/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp.data);
  }

  async deleteGround({ id }: { id: number }) {
    const resp = await api.delete(`/ground/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    console.log(resp.data);
  }
}
