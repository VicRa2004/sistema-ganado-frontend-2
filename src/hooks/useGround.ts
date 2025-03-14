import { useAuth } from "./useAuth";
import { GroundService } from "../services/grounds.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroundType, GroundCreateType, ResponseGroundAllType } from "../types";
import { useError } from "../hooks/useError";

export const useGround = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();

  const token = getToken();

  // Clase para pasar el token al servicio
  const groundService = new GroundService(token);

  const queryClient = useQueryClient();

  /**
   * @deprecated
   */
  const getAllGrounds = useQuery<ResponseGroundAllType>({
    queryKey: ["grounds"],
    queryFn: async () => {
      const res = await groundService.getGrouns();
      return res;
    },
  });

  const useGetAllGround = (page?: number) => {
    const { data, isPending, error } = useQuery<ResponseGroundAllType>({
      queryKey: ["grounds", page],
      queryFn: async () => {
        const res = await groundService.getGrouns(page);
        return res;
      },
    });

    return { data, isPending, error };
  };

  const useGetOneGround = (id: number) => {
    const { data, isPending } = useQuery<GroundType>({
      queryKey: ["ground", id],
      refetchOnMount: true,
      queryFn: async () => {
        const res = await groundService.getOneGround(id);
        return res;
      },
    });

    return { data, isPending };
  };

  // Mutación para crear un terreno
  const createGround = useMutation({
    mutationFn: async ({
      newGround,
      image,
    }: {
      newGround: GroundCreateType;
      image?: File;
    }) => {
      const res = await groundService.createGround({
        ground: newGround,
        image,
      });

      return res;
    },
    onSuccess: () => {
      // Invalida la consulta para refrescar los terrenos
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const updateGround = useMutation({
    mutationFn: async ({
      id,
      newGround,
      image,
    }: {
      id: number;
      newGround: GroundCreateType;
      image?: File;
    }) => {
      const res = await groundService.updateGround({
        id,
        ground: newGround,
        image,
      });
      return res;
    },
    onSuccess: () => {
      // Invalida la consulta para refrescar los terrenos
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const deleteGround = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await groundService.deleteGround({ id });
      return res;
    },
    onSuccess: () => {
      // Invalida la consulta para refrescar los terrenos
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });

  return {
    getAllGrounds,
    useGetAllGround,
    useGetOneGround,
    createGround,
    updateGround,
    deleteGround,
  };
};
