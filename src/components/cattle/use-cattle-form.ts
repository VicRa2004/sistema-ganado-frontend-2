import {
  CattleFormInputs,
  cattleSchema,
} from "../../lib/schemas/cattle.schema";
import { useCattle } from "../../hooks/useCattle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CattleType } from "../../types";

export const useCattleForm = ({ cattle }: { cattle?: CattleType | null }) => {

  const cattle2 = {
    ...cattle,
    father: cattle?.father || -1,
    mother: cattle?.mother || -1,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CattleFormInputs>({
    resolver: zodResolver(cattleSchema),
    defaultValues: {
      ...cattle2,
      image: [],
      birthdate: cattle2?.birthdate ? new Date(cattle2?.birthdate) : undefined,
      status: !(cattle2?.status == 1), // Para que sea false si es 1 y true si es 0
    },
  });

  const { useCreateCattle, useUpdateCattle } = useCattle();
  const { isPending: createPending, mutateAsync: createMutate } =
    useCreateCattle();
  const { isPending: updatePending, mutateAsync: updateMutate } =
    useUpdateCattle();

  return {
    register,
    handleSubmit,
    errors,
    createPending,
    createMutate,
    updateMutate,
    updatePending,
  };
};
