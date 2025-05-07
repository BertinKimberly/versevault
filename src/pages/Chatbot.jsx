import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { gsap } from "gsap";
import MessageBubble from "../components/MessageBubble";
import InputForm from "../components/InputForm";
import ChatHistory from "../components/ChatHistory";
import WelcomeScreen from "../components/WelcomeScreen";
import SuggestedPrompts from "../components/SUggestedPrompts";

// Predefined gospel-related message prompts
const suggestedPrompts = [
   "Explain John 3:16",
   "What does the Bible say about forgiveness?",
   "Tell me about the parable of the Good Samaritan",
   "How can I practice Christian love in daily life?",
   "What is the meaning of Psalm 23?",
   "Share a verse about hope",
];

// System prompt to guide the chatbot's behavior
const SYSTEM_PROMPT = `You are a helpful Christian assistant specializing in Bible knowledge and good manners. Follow these rules:
- Answer questions about Bible verses, stories, and teachings
- Provide guidance on Christian living and social etiquette
- If asked about other topics, politely decline with: "I'm here to assist with Bible-related questions and Christian living. Please ask about those topics."
- Keep responses concise and scripturally accurate
- Reference Bible verses when appropriate (e.g., John 3:16)
- Format responses in Markdown for clarity, using headings, lists, and blockquotes where appropriate
- Respond naturally to greetings and casual conversation`;

export const Chatbot = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [modelLoaded, setModelLoaded] = useState(false);
   const [error, setError] = useState(null);
   const [chatStarted, setChatStarted] = useState(false);
   const [previousChats, setPreviousChats] = useState([]);
   const [activeChatId, setActiveChatId] = useState(null);
   const [isListening, setIsListening] = useState(false);
   const [transcript, setTranscript] = useState("");
   const messagesEndRef = useRef(null);
   const chatContainerRef = useRef(null);
   const recognitionRef = useRef(null);

   const HUGGING_FACE_KEY = import.meta.env.VITE_HUGGING_FACE_KEY;

   // Enhanced speech recognition setup
   useEffect(() => {
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
         recognitionRef.current = new SpeechRecognition();
         
         // Configure recognition settings
         recognitionRef.current.continuous = true;
         recognitionRef.current.interimResults = true;
         recognitionRef.current.lang = 'en-US'; // Set language - can be made configurable
         
         let finalTranscript = '';
         let debounceTimeout;
         
         recognitionRef.current.onstart = () => {
            finalTranscript = '';
            setIsListening(true);
            console.log("Speech recognition started");
         };
         
         recognitionRef.current.onresult = (event) => {
            let interimTranscript = '';
            
            // Process results
            for (let i = event.resultIndex; i < event.results.length; i++) {
               const transcript = event.results[i][0].transcript;
               
               if (event.results[i].isFinal) {
                  finalTranscript += transcript + ' ';
               } else {
                  interimTranscript += transcript;
               }
            }
            
            // Update input with combined transcript
            const combinedTranscript = finalTranscript + interimTranscript;
            setTranscript(combinedTranscript);
            
            // Update input field with debounce to reduce flicker
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
               setInput(combinedTranscript.trim());
            }, 300);
         };

         recognitionRef.current.onend = () => {
            setIsListening(false);
            console.log("Speech recognition ended");
            
            // Auto-submit if we have a reasonable length final transcript
            if (finalTranscript.trim().length > 5) {
               setInput(finalTranscript.trim());
               // Don't auto-submit as it might be confusing to users
               // Instead, let them review what was transcribed first
            }
         };

         recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            
            // Handle specific errors
            if (event.error === 'not-allowed') {
               setError("Microphone access denied. Please check your browser permissions.");
            } else if (event.error === 'no-speech') {
               console.log("No speech detected");
            } else {
               setError(`Speech recognition error: ${event.error}`);
            }
         };

         return () => {
            clearTimeout(debounceTimeout);
            if (recognitionRef.current) {
               recognitionRef.current.stop();
            }
         };
      } else {
         console.log("Speech recognition not supported in this browser");
      }
   }, []);

   // Load chat history
   useEffect(() => {
      try {
         const savedChatSessions = localStorage.getItem("chatSessions");
         if (savedChatSessions) {
            const parsedSessions = JSON.parse(savedChatSessions);
            setPreviousChats(parsedSessions);
            const activeChat = localStorage.getItem("activeChatId");
            if (activeChat) {
               setActiveChatId(activeChat);
               const activeMessages =
                  parsedSessions.find((chat) => chat.id === activeChat)
                     ?.messages || [];
               setMessages(activeMessages);
               if (activeMessages.length > 0) setChatStarted(true);
            }
         }

         if (!HUGGING_FACE_KEY) {
            throw new Error(
               "Hugging Face API key is missing. Please check your .env file."
            );
         }
         setModelLoaded(true);
      } catch (error) {
         console.error("Initialization error:", error);
         setError(error.message);
         setMessages([
            {
               role: "assistant",
               content: `Failed to initialize: ${error.message}. Please check your API key configuration.`,
            },
         ]);
      }
   }, [HUGGING_FACE_KEY]);

   // Save chat history to localStorage
   useEffect(() => {
      if (messages.length > 0 && activeChatId) {
         // Save current chat messages
         const updatedChats = [...previousChats];
         const chatIndex = updatedChats.findIndex(
            (chat) => chat.id === activeChatId
         );

         if (chatIndex !== -1) {
            updatedChats[chatIndex].messages = messages;
            updatedChats[chatIndex].lastUpdated = new Date().toISOString();
         } else {
            // Should not happen but handle just in case
            updatedChats.push({
               id: activeChatId,
               title: messages[1]?.content.substring(0, 30) || "New Chat",
               messages: messages,
               lastUpdated: new Date().toISOString(),
            });
         }

         localStorage.setItem("chatSessions", JSON.stringify(updatedChats));
         localStorage.setItem("activeChatId", activeChatId);
         setPreviousChats(updatedChats);
      }
   }, [messages, activeChatId]);

   // Scroll to bottom
   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   // GSAP animations
   useEffect(() => {
      if (chatContainerRef.current) {
         gsap.fromTo(
            chatContainerRef.current,
            { opacity: 0, scale: 0.95, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
         );
         gsap.fromTo(
            ".header-title",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
         );
         gsap.fromTo(
            ".header-subtitle",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
         );
      }
   }, [chatStarted]);

   const toggleListening = () => {
      if (!recognitionRef.current) {
         setError("Speech recognition is not supported in your browser");
         return;
      }
      
      if (isListening) {
         recognitionRef.current.stop();
      } else {
         // Clear previous transcript when starting new session
         setTranscript("");
         setInput("");
         
         try {
            recognitionRef.current.start();
         } catch (error) {
            console.error("Speech recognition error:", error);
            setError("Failed to start speech recognition. Please try again.");
         }
      }
   };

   const isValidInput = (text) => {
      const greetings = [
         "hello",
         "hi",
         "hey",
         "greetings",
         "good morning",
         "good afternoon",
         "good evening",
         "howdy",
         "welcome",
         "salutations",
      ];

      if (greetings.some((greeting) => text.toLowerCase().includes(greeting)))
         return true;

      const gospelKeywords = [
         "bible",
         "scripture",
         "verse",
         "jesus",
         "christ",
         "god",
         "holy",
         "spirit",
         "christian",
         "faith",
         "gospel",
         "psalm",
         "proverb",
         "parable",
         "forgiveness",
         "love",
         "hope",
         "prayer",
         "etiquette",
         "manners",
      ];

      return gospelKeywords.some((keyword) =>
         text.toLowerCase().includes(keyword)
      );
   };

   const handleSubmit = async (e) => {
      e?.preventDefault();
      if (!input.trim() || isLoading || !modelLoaded) return;

      // Stop listening if active
      if (isListening && recognitionRef.current) {
         recognitionRef.current.stop();
      }

      if (!chatStarted) startNewChat();

      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
         const chatHistory = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            userMessage,
         ];

         if (!isValidInput(userMessage.content)) {
            setMessages((prev) => [
               ...prev,
               {
                  role: "assistant",
                  content:
                     "I'm here to assist with Bible-related questions and Christian living. Please ask about those topics.",
               },
            ]);
            setIsLoading(false);
            return;
         }

         const response = await generateResponse(chatHistory);
         setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response },
         ]);

         if (messages.length === 1) updateChatTitle(input);
      } catch (error) {
         console.error("Error generating response:", error);
         setMessages((prev) => [
            ...prev,
            {
               role: "assistant",
               content: `I encountered an error: ${error.message}. Please try again.`,
            },
         ]);
      } finally {
         setIsLoading(false);
      }
   };

   const startNewChat = () => {
      const newChatId = Date.now().toString();
      setActiveChatId(newChatId);
      setChatStarted(true);
      setMessages([
         {
            role: "assistant",
            content:
               "Welcome! I'm here to help with Bible verses, Christian teachings, and guidance. How can I assist you today?",
         },
      ]);

      const newChat = {
         id: newChatId,
         title: "New Chat",
         messages: [
            {
               role: "assistant",
               content:
                  "Welcome! I'm here to help with Bible verses, Christian teachings, and guidance. How can I assist you today?",
            },
         ],
         lastUpdated: new Date().toISOString(),
      };

      setPreviousChats((prev) => [newChat, ...prev]);
      localStorage.setItem("activeChatId", newChatId);
   };

   const updateChatTitle = (firstMessage) => {
      if (!activeChatId) return;

      const title =
         firstMessage.length > 30
            ? firstMessage.substring(0, 27) + "..."
            : firstMessage;

      setPreviousChats((prev) => {
         const updated = prev.map((chat) => {
            if (chat.id === activeChatId) return { ...chat, title };
            return chat;
         });
         localStorage.setItem("chatSessions", JSON.stringify(updated));
         return updated;
      });
   };

   const loadChat = (chatId) => {
      const chat = previousChats.find((c) => c.id === chatId);
      if (chat) {
         setActiveChatId(chatId);
         setMessages(chat.messages);
         setChatStarted(true);
         localStorage.setItem("activeChatId", chatId);
      }
   };

   const deleteChat = (chatId, e) => {
      e.stopPropagation();

      setPreviousChats((prev) => {
         const updated = prev.filter((chat) => chat.id !== chatId);
         localStorage.setItem("chatSessions", JSON.stringify(updated));
         return updated;
      });

      if (chatId === activeChatId) {
         setActiveChatId(null);
         setMessages([]);
         setChatStarted(false);
         localStorage.removeItem("activeChatId");
      }
   };

   const generateResponse = async (chatHistory) => {
      if (!HUGGING_FACE_KEY) throw new Error("Hugging Face API key is missing");

      let prompt = "";
      const systemMessage = chatHistory.find((msg) => msg.role === "system");
      const userAndAssistantMessages = chatHistory.filter(
         (msg) => msg.role !== "system"
      );

      if (systemMessage) prompt += `<|system|>\n${systemMessage.content}\n`;
      for (const msg of userAndAssistantMessages) {
         if (msg.role === "user") prompt += `<|user|>\n${msg.content}\n`;
         else if (msg.role === "assistant")
            prompt += `<|assistant|>\n${msg.content}\n`;
      }
      prompt += "<|assistant|>\n";

      try {
         const response = await fetch(
            "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
            {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${HUGGING_FACE_KEY}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  inputs: prompt,
                  parameters: {
                     max_new_tokens: 256,
                     temperature: 0.7,
                     top_k: 50,
                     top_p: 0.95,
                     do_sample: true,
                     return_full_text: false,
                  },
               }),
            }
         );

         if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error Response:", errorText);
            try {
               const errorData = JSON.parse(errorText);
               throw new Error(
                  `API Error: ${errorData.error || response.statusText}`
               );
            } catch (e) {
               throw new Error(
                  `API Error: ${response.status} ${response.statusText}`
               );
            }
         }

         const result = await response.json();
         if (
            result &&
            result[0] &&
            typeof result[0].generated_text === "string"
         ) {
            return result[0].generated_text.trim();
         } else if (typeof result === "string") {
            return result.trim();
         } else if (result && typeof result.generated_text === "string") {
            return result.generated_text.trim();
         }
         console.log("API Response:", result);
         throw new Error("Unexpected response format from API");
      } catch (error) {
         console.error("API call error:", error);
         throw error;
      }
   };

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
         month: "short",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-[#3A59D1] text-white pt-10">
         <div className="container mx-auto px-4 py-12 w-full md:w-[90%] xl:w-5/6">
            <div
               ref={chatContainerRef}
               className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden relative"
            >
               {!chatStarted ? (
                  <WelcomeScreen
                     onStartNewChat={startNewChat}
                     previousChats={previousChats}
                     onLoadChat={loadChat}
                     onDeleteChat={deleteChat}
                     formatDate={formatDate}
                  />
               ) : (
                  <>
                     <ChatHistory
                        previousChats={previousChats}
                        activeChatId={activeChatId}
                        onStartNewChat={startNewChat}
                        onLoadChat={loadChat}
                        onDeleteChat={deleteChat}
                        formatDate={formatDate}
                     />
                     <div
                        className={`h-[60vh] overflow-y-auto p-6 space-y-4 ${
                           previousChats.length > 0 ? "md:ml-64" : ""
                        }`}
                     >
                        {error && (
                           <div className="bg-red-500/80 text-white p-4 rounded-lg">
                              <p className="font-bold">Error:</p>
                              <p>{error}</p>
                           </div>
                        )}
                        {messages.map((message, index) => (
                           <MessageBubble
                              key={index}
                              message={message}
                           />
                        ))}
                        {isLoading && (
                           <div className="flex justify-start">
                              <div className="bg-white/10 backdrop-blur-lg text-white rounded-xl p-4 max-w-3/4">
                                 <div className="flex space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                    <div
                                       className="w-2 h-2 rounded-full bg-white animate-bounce"
                                       style={{ animationDelay: "0.2s" }}
                                    ></div>
                                    <div
                                       className="w-2 h-2 rounded-full bg-white animate-bounce"
                                       style={{ animationDelay: "0.4s" }}
                                    ></div>
                                 </div>
                              </div>
                           </div>
                        )}
                        {isListening && (
                          <div className="flex justify-start items-center">
                            <div className="bg-blue-500/30 backdrop-blur-lg text-white rounded-xl p-4 max-w-3/4">
                              <div className="flex items-center space-x-2">
                                <div className="relative">
                                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping absolute"></div>
                                  <div className="w-3 h-3 bg-blue-500 rounded-full relative"></div>
                                </div>
                                <p>Listening: "{transcript}"</p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                     </div>
                     <SuggestedPrompts
                        prompts={suggestedPrompts}
                        onPromptClick={(prompt) => {
                           setInput(prompt);
                           setTimeout(() => handleSubmit(), 0);
                        }}
                        hasSidebar={previousChats.length > 0}
                     />
                     <InputForm
                        input={input}
                        onInputChange={setInput}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        modelLoaded={modelLoaded}
                        isListening={isListening}
                        onToggleListening={toggleListening}
                        hasSidebar={previousChats.length > 0}
                        error={error}
                     />
                  </>
               )}
            </div>
         </div>
      </div>
   );
};