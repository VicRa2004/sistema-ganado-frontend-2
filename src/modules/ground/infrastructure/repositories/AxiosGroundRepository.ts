import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground, GroundCreate, GroundUpdate } from "../../domain/Ground";
import { GroundFilters, GroundRepository } from "../../domain/GroundRepository";
import axios, { AxiosError, AxiosInstance } from "axios";
import { ResAPI } from "@/core/shared/domain/ResAPI";

export class AxiosGroundRepository implements GroundRepository {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      withCredentials: true, // si usas cookies
    });
  }

  async find(filters: GroundFilters): Promise<Pagination<Ground>> {
    const {
      data: { data },
    } = await this.http.get<ResAPI<Pagination<Ground>>>("/ground", {
      params: filters,
    });

    data.items = data.items.map((ground) => ({
      ...ground,
      createdAt: new Date(ground.createdAt),
      updatedAt: new Date(ground.updatedAt),
    }));

    return data;
  }

  async findById(id: number): Promise<Ground | null> {
    try {
      const {
        data: { data },
      } = await this.http.get<ResAPI<Ground>>(`/ground/${id}`);

      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return null;
      }
      throw error;
    }
  }

  async create(ground: GroundCreate): Promise<Ground> {
    const {
      data: { data },
    } = await this.http.post<ResAPI<Ground>>("/ground", ground);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async update(ground: GroundUpdate): Promise<Ground> {
    const {
      data: { data },
    } = await this.http.put<ResAPI<Ground>>(`/ground/${ground.id}`, ground);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async delete(id: number): Promise<void> {
    await this.http.delete(`/ground/${id}`);
  }
}
