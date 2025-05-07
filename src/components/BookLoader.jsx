import { useState, useEffect } from "react";

const BookLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5;
        return next >= 100 ? 100 : next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#3A59D1] to-[#2a3e9d] bg-opacity-80 z-50">
      {/* Book animation */}
      <div className="w-32 h-32 mb-8 relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-16 h-24 bg-white rounded-r-lg shadow-lg animate-page-flip relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200" />
          </div>
          <div className="w-16 h-24 bg-[#e8e8e8] rounded-l-lg shadow-xl -ml-1 z-10 flex justify-center items-center">
            <div className="w-8 h-8 text-[#3A59D1] animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m-6-2.292v-8.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <h3 className="text-white text-xl font-medium mb-4">Loading Bible Scriptures</h3>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Inspirational text */}
      <p className="text-white/80 mt-6 text-center max-w-xs">
        "Your word is a lamp to my feet and a light to my path."
        <br />
        <span className="text-sm">- Psalm 119:105</span>
      </p>
    </div>
  );
};

export default BookLoader;