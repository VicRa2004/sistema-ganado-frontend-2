import { Component, ReactNode, ErrorInfo } from "react";
import { handleError } from "./handleError";

interface ErrorBoundaryProps {
   children: ReactNode;
}

interface ErrorBoundaryState {
   hasError: boolean;
   error: unknown;
}

export class ErrorBoundary extends Component<
   ErrorBoundaryProps,
   ErrorBoundaryState
> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      // Actualiza el estado para renderizar la UI alternativa
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      // Puedes registrar el error en un servicio de reporte de errores
      console.error("Error capturado por ErrorBoundary:", error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         const err = handleError(this.state.error);

         console.log(err);

         // Renderiza una interfaz de respaldo
         return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
               <div className="text-center">
                  <h1 className="text-3xl font-bold text-red-600">
                     Oops, algo salió mal.
                  </h1>
                  <p className="text-gray-700 mt-2">
                     Por favor, recarga la página o intenta más tarde.
                  </p>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}
