import { useEffect, useState } from "react";

const InputForm = ({ 
  input, 
  onInputChange, 
  onSubmit, 
  isLoading, 
  modelLoaded, 
  isListening, 
  onToggleListening, 
  hasSidebar,
  error
}) => {
  const [micAvailable, setMicAvailable] = useState(null);
  
  // Check if microphone is available on component mount
  useEffect(() => {
    const checkMicrophoneAvailability = async () => {
      try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // If successful, microphone is available
        stream.getTracks().forEach(track => track.stop()); // Clean up
        setMicAvailable(true);
      } catch (err) {
        console.error("Microphone access error:", err);
        setMicAvailable(false);
      }
    };
    
    checkMicrophoneAvailability();
  }, []);

  // Mic button animation styles
  const pulseStyle = isListening ? {
    animation: "pulse 1.5s infinite",
  } : {};
  
  return (
    <form onSubmit={onSubmit} className={`p-6 border-t border-white/10 ${hasSidebar ? 'md:ml-64' : ''}`}>
      <div className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask about Bible verses or Christian living..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          disabled={isLoading || !modelLoaded}
        />
        
        <button
          type="button"
          onClick={onToggleListening}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-white/10 backdrop-blur-lg hover:bg-white/20'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading || !modelLoaded || micAvailable === false}
          title={micAvailable === false ? "Microphone not available" : isListening ? "Stop listening" : "Start voice input"}
          style={pulseStyle}
        >
          {micAvailable === false ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : isListening ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <circle cx="12" cy="14" r="4" fill="currentColor"></circle>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>
        
        <button
          type="submit"
          className="bg-gradient-to-r from-[#253380] to-[#3A59D1] hover:from-blue-600 hover:to-[#3A59D1] text-white px-8 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          disabled={isLoading || !modelLoaded || !input.trim()}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      
      {!modelLoaded && !error && (
        <p className="mt-2 text-sm text-white/70">
          Initializing... Please wait.
        </p>
      )}
      
      {isListening && (
        <p className="mt-2 text-sm text-white/80 animate-pulse">
          Listening... Speak now
        </p>
      )}

      {micAvailable === false && (
        <p className="mt-2 text-sm text-red-300">
          Microphone access denied. Please check your browser permissions.
        </p>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `}</style>
    </form>
  );
};

export default InputForm;