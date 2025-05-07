const ChatHistory = ({ previousChats, activeChatId, onStartNewChat, onLoadChat, onDeleteChat, formatDate }) => {
    return (
      <>
        <div className="hidden md:block w-64 bg-white/5 border-r border-white/10 absolute top-0 bottom-0 left-0 overflow-y-auto">
          <div className="p-4">
            <button 
              onClick={onStartNewChat}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 mb-4 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              New Chat
            </button>
            
            <h3 className="text-sm uppercase text-white/60 font-medium mb-2">History</h3>
            <div className="space-y-1">
              {previousChats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => onLoadChat(chat.id)}
                  className={`flex justify-between items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors duration-200 ${activeChatId === chat.id ? 'bg-white/15' : ''}`}
                >
                  <div className="flex-1 text-left">
                    <p className="font-medium truncate text-sm">{chat.title}</p>
                    <p className="text-xs opacity-70">{formatDate(chat.lastUpdated)}</p>
                  </div>
                  <button 
                    onClick={(e) => onDeleteChat(chat.id, e)}
                    className="p-1 hover:bg-red-500/50 rounded-full transition-colors duration-200 opacity-70 hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="md:hidden mb-4">
          <button 
            onClick={() => document.getElementById('mobile-history-drawer').classList.toggle('hidden')}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Chat History
          </button>
          
          <div id="mobile-history-drawer" className="hidden fixed inset-0 bg-black/80 z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-4 max-w-sm mx-auto my-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Chat History</h3>
                <button 
                  onClick={() => document.getElementById('mobile-history-drawer').classList.add('hidden')}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <button 
                onClick={() => {
                  onStartNewChat();
                  document.getElementById('mobile-history-drawer').classList.add('hidden');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-medium mb-4 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                New Chat
              </button>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {previousChats.map((chat) => (
                  <div 
                    key={chat.id}
                    onClick={() => {
                      onLoadChat(chat.id);
                      document.getElementById('mobile-history-drawer').classList.add('hidden');
                    }}
                    className="flex justify-between items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-medium truncate">{chat.title}</p>
                      <p className="text-xs opacity-70">{formatDate(chat.lastUpdated)}</p>
                    </div>
                    <button 
                      onClick={(e) => onDeleteChat(chat.id, e)}
                      className="p-1 hover:bg-red-500/50 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ChatHistory;