export const ImgBg = () => {
   return (
      <div className="absolute inset-0 h-full w-full overflow-hidden">
         <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
               backgroundImage:
                  "url('https://ruminants.ceva.pro/hubfs/ganaderia-extensiva.jpg')",
               filter: "blur(4px) brightness(0.6)",
            }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-70" />
      </div>
   );
};
