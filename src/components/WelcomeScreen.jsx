const WelcomeScreen = ({ onStartNewChat, previousChats, onLoadChat, onDeleteChat, formatDate }) => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="animate-float mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Welcome to the Bible & Christian Living Assistant</h2>
        <p className="text-lg opacity-80 mb-6 max-w-lg">
          I'm here to help answer your questions about the Bible, Christian teachings, and guidance on living a faithful life.
        </p>
        <div className="space-y-4 w-full max-w-md">
          <button 
            onClick={onStartNewChat}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300"
          >
            Start New Conversation
          </button>
          {previousChats.length > 0 && (
            <div className="text-center">
              <p className="text-sm opacity-70 mb-2">or continue a previous conversation</p>
              <div className="max-h-40 overflow-y-auto bg-white/10 rounded-xl p-2 backdrop-blur-lg">
                {previousChats.map((chat) => (
                  <div 
                    key={chat.id}
                    onClick={() => onLoadChat(chat.id)}
                    className="flex justify-between items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex-1 text-left">
                      <p className="font-medium truncate">{chat.title}</p>
                      <p className="text-xs opacity-70">{formatDate(chat.lastUpdated)}</p>
                    </div>
                    <button 
                      onClick={(e) => onDeleteChat(chat.id, e)}
                      className="p-1 hover:bg-red-500/50 rounded-full transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default WelcomeScreen;