import { Link } from "react-router-dom";

export const NotFound = () => {
   return (
      <div className="min-h-screen bg-gradient-to-b from-[#3A59D1] to-[#253380] text-white flex items-center justify-center relative overflow-hidden">
         {/* Background gradient animation */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#3A59D1] to-[#7dabff] opacity-10 animate-gradient-x"></div>

         <div className="text-center px-4 relative z-10">
            <div className="text-9xl font-bold mb-4">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4d4ff]">
                  404
               </span>
            </div>
            <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-gray-200 text-xl mb-8 max-w-md mx-auto">
               The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
               to="/"
               className="inline-block bg-[#3A59D1] hover:bg-[#5a77de] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
               Return Home
            </Link>
         </div>
      </div>
   );
};
