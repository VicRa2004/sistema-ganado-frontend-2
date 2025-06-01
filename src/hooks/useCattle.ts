import { useAuth } from "./useAuth";
import { CattleService } from "../services/cattle.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useError } from "../hooks/useError";
import { CattleCreate } from "../types";

export const useCattle = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();

  const token = getToken();

  const cattleService = new CattleService(token);

  const queryClient = useQueryClient();

  const useGetCattle = (id: number) => {
    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattle", id],
      queryFn: async () => {
        const res = await cattleService.getOne(id);
        return res;
      },
    });

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  }

  const useGetAllCattles = (
    page?: number,
    query?: {
      gender?: string;
      status?: number;
      id_iron?: number;
      id_race?: number;
    }
  ) => {
    const currentPage = page || 1;

    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattles", page, query],
      queryFn: async () => {
        const res = await cattleService.getAll(currentPage, query);
        return res;
      },
    });

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  const useGetAllCattlesGround = ({
    id,
    page,
  }: {
    id: number;
    page?: number;
  }) => {
    const currentPage = page || 1;

    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattles", page],
      queryFn: async () => {
        const res = await cattleService.getAllGround(currentPage, id);
        return res;
      },
    });

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  const useCreateCattle = () => {
    const { data, isPending, mutateAsync } = useMutation({
      mutationFn: async ({
        data,
        image,
      }: {
        data: CattleCreate;
        image?: File;
      }) => {
        const res = await cattleService.create({ cattle: data, image });

        console.log(res);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cattles"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  const useUpdateCattle = () => {
    const { data, isPending, mutateAsync } = useMutation({
      mutationFn: async ({
        id,
        cattle,
        image,
      }: {
        id: number;
        cattle: CattleCreate;
        image?: File;
      }) => {
        const res = await cattleService.update(id, { cattle, image });

        console.log(res);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cattles"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  return {
    useGetAllCattles,
    useGetCattle,
    useCreateCattle,
    useGetAllCattlesGround,
    useUpdateCattle,
  };
};
