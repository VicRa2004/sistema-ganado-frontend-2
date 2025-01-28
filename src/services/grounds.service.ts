import { api } from "../lib/axios";
import { GroundCreateType } from "../types";

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

    return resp.data;
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

    const resp = await api.post("/ground", formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp.data);
  }
}
