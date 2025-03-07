import { useAuth } from "./useAuth";
import { CattleService } from "../services/cattle.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useError } from "../hooks/useError";

export const useCattle = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();

  const token = getToken();

  const cattleService = new CattleService(token);

  const queryClient = useQueryClient();

  const useGetAllCattles = (page: number) => {
    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattle", page],
      queryFn: async () => {
        const res = await cattleService.getAll(page);
        return res;
      },
    });

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  const useCreateCattle = () => {};

  return { useGetAllCattles, useCreateCattle };
};
