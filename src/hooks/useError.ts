import { handleError as handle } from "../lib/handleError";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useError = () => {
   const navigate = useNavigate();

   const handleError = (
      error: unknown,
      { email = "" }: { email?: string } = {}
   ) => {
      const res = handle(error);

      console.log(res);

      toast.error(res.message, {
         className: "text-lg",
         position: "bottom-center",
      });

      if (res.type) {
         if (res.type === "SESION") {
            navigate("/login");
         }

         if (res.type === "VALIDATE") {
            navigate(`/send-email/${email}`);
         }
      }
   };

   return { handleError };
};
