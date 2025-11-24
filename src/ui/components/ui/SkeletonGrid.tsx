import { SkeletonCard } from "./SkeletonCard";

export const SkeletonGrid = () => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
         <SkeletonCard />
      </div>
   );
};
