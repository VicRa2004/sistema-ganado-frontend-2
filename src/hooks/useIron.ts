import { IronService } from "../services/iron.service";
import { useAuth } from "./useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useError } from "../hooks/useError";

export const useIron = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();

  const token = getToken();

  const ironService = new IronService(token);

  const queryClient = useQueryClient();

  const useGetAllIrons = (page: number) => {
    return useQuery({
      queryKey: ["irons", page],
      queryFn: async () => {
        const res = await ironService.getAll(page);
        return res;
      },
    });
  };

  const useCreateIron = () => {
    const { data, isPending, mutateAsync } = useMutation({
      mutationFn: async ({ name, image }: { name: string; image: File }) => {
        const res = await ironService.create({ name, image });

        console.log(res);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["irons"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  const useUpdateIron = () => {
    const { data, isPending, mutateAsync } = useMutation({
      mutationFn: async ({
        id,
        name,
        image,
      }: {
        id: number;
        name: string;
        image: File;
      }) => {
        const res = await ironService.update(id, { name, image });

        console.log(res);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["irons"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  const useDeleteIron = () => {
    const { data, isPending, mutateAsync } = useMutation({
      mutationFn: async (id: number) => {
        await ironService.delete({ id });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["irons"] }),
      onError: (err) => handleError(err),
    });

    return { data, isPending, mutateAsync };
  };

  return { useGetAllIrons, useCreateIron, useUpdateIron, useDeleteIron };
};
