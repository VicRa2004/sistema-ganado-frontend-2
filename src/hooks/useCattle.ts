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

  const useGetAllCattles = (page?: number) => {
    const currentPage = page || 1;

    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattle", page],
      queryFn: async () => {
        const res = await cattleService.getAll(currentPage);
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
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["irons"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  return { useGetAllCattles, useCreateCattle };
};
