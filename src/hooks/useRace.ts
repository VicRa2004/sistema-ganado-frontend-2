import { useAuth } from "./useAuth";
import { useError } from "../hooks/useError";
import { RaceService } from "../services/race.service";
import { useQuery } from "@tanstack/react-query";

export const useRace = () => {
  const { getToken } = useAuth();
  const { handleError } = useError();
  const token = getToken();

  const raceService = new RaceService(token);

  const useGetAllRaces = (page?: number) => {
    const currentPage = page || 1;

    const { data, isError, isPending, error } = useQuery({
      queryKey: ["cattle", page],
      queryFn: async () => {
        const res = await raceService.getAll(currentPage);
        return res;
      },
    });

    if (isError) {
      handleError(error);
    }

    return { data, isPending };
  };

  return { useGetAllRaces };
};
