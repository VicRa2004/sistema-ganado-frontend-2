import { useAuth } from "./useAuth";
import { GroundService } from "../services/grounds.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroundCreateType, ResponseGroundAllType } from "../types";
import { useError } from "../hooks/useError";

export const useGround = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();

  const token = getToken();

  // Clase para pasar el token al servicio
  const groundService = new GroundService(token);

  const queryClient = useQueryClient();

  const getAllGrounds = useQuery<ResponseGroundAllType>({
    queryKey: ["grounds"],
    queryFn: async () => {
      const res = await groundService.getGrouns();
      return res;
    },
  });

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

  return { getAllGrounds, createGround };
};
