import { useAuth } from "./useAuth";
import { CattleService } from "../services/cattle.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useError } from "../hooks/useError";
import { CattleCreate } from "../types";

export const useCattle = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();
  const queryClient = useQueryClient();

  // Initialize service with token
  const token = getToken();
  const cattleService = new CattleService(token);

  // Define all hook functions first (without calling them)
  const getCattleQuery = (id: number | null) => ({
    queryKey: ["cattle", id],
    queryFn: async () => {
      if (id === null) return null;
      return await cattleService.getOne(id);
    },
    enabled: id !== null, // Only enable query if id is not null
  });

  const getAllCattlesQuery = (
    page?: number | null,
    query?: {
      gender?: string;
      status?: number;
      id_iron?: number;
      id_race?: number;
    }
  ) => ({
    queryKey: ["cattles", page, query],
    queryFn: async () => {
      const currentPage = page || 1;
      return await cattleService.getAll(currentPage, query);
    },
  });

  const getAllCattlesGroundQuery = (id: number | null, page?: number | null) => ({
    queryKey: ["cattles-ground", id, page],
    queryFn: async () => {
      if (id === null) return null;
      const currentPage = page || 1;
      return await cattleService.getAllGround(currentPage, id);
    },
    enabled: id !== null, // Only enable query if id is not null
  });

  // Now create the actual hooks that will be returned
  const useGetCattle = (id: number | null) => {
    const { data, isError, isPending, error } = useQuery(getCattleQuery(id));

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  const useGetAllCattles = (
    page?: number | null,
    query?: {
      gender?: string;
      status?: number;
      id_iron?: number;
      id_race?: number;
    }
  ) => {
    const { data, isError, isPending, error } = useQuery(getAllCattlesQuery(page, query));

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  const useGetAllCattlesGround = (id: number | null, page?: number | null) => {
    const { data, isError, isPending, error } = useQuery(
      getAllCattlesGroundQuery(id, page)
    );

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
        image?: File | null;
      }) => {
        const res = await cattleService.create({ 
          cattle: data, 
          image: image || undefined 
        });
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cattles"] });
        queryClient.invalidateQueries({ queryKey: ["cattles-ground"] });
      },
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
        image?: File | null;
      }) => {
        const res = await cattleService.update(id, { 
          cattle, 
          image: image || undefined 
        });
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cattles"] });
        queryClient.invalidateQueries({ queryKey: ["cattle"] });
        queryClient.invalidateQueries({ queryKey: ["cattles-ground"] });
      },
      onError: (err) => {
        handleError(err);
      },
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