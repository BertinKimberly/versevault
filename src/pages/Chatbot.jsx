import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import MessageBubble from "../components/MessageBubble";
import InputForm from "../components/InputForm";
import ChatHistory from "../components/ChatHistory";
import WelcomeScreen from "../components/WelcomeScreen";
import SuggestedPrompts from "../components/SuggestedPrompts";
import {Helmet} from "react-helmet"

// Expanded list of all Bible books
const BIBLE_BOOKS = [
   // Old Testament
   "Genesis",
   "Exodus",
   "Leviticus",
   "Numbers",
   "Deuteronomy",
   "Joshua",
   "Judges",
   "Ruth",
   "1 Samuel",
   "2 Samuel",
   "1 Kings",
   "2 Kings",
   "1 Chronicles",
   "2 Chronicles",
   "Ezra",
   "Nehemiah",
   "Esther",
   "Job",
   "Psalms",
   "Proverbs",
   "Ecclesiastes",
   "Song of Solomon",
   "Isaiah",
   "Jeremiah",
   "Lamentations",
   "Ezekiel",
   "Daniel",
   "Hosea",
   "Joel",
   "Amos",
   "Obadiah",
   "Jonah",
   "Micah",
   "Nahum",
   "Habakkuk",
   "Zephaniah",
   "Haggai",
   "Zechariah",
   "Malachi",

   // New Testament
   "Matthew",
   "Mark",
   "Luke",
   "John",
   "Acts",
   "Romans",
   "1 Corinthians",
   "2 Corinthians",
   "Galatians",
   "Ephesians",
   "Philippians",
   "Colossians",
   "1 Thessalonians",
   "2 Thessalonians",
   "1 Timothy",
   "2 Timothy",
   "Titus",
   "Philemon",
   "Hebrews",
   "James",
   "1 Peter",
   "2 Peter",
   "1 John",
   "2 John",
   "3 John",
   "Jude",
   "Revelation",
];

// Comprehensive gospel-related terms
const GOSPEL_TERMS = [
   // Core Christian concepts
   "salvation",
   "redemption",
   "atonement",
   "grace",
   "mercy",
   "faith",
   "hope",
   "love",
   "charity",
   "repentance",
   "baptism",
   "communion",
   "eucharist",
   "resurrection",
   "ascension",
   "second coming",
   "rapture",
   "millennium",
   "heaven",
   "hell",
   "sin",
   "righteousness",
   "holiness",
   "sanctification",
   "justification",

   // Biblical figures
   "Adam",
   "Eve",
   "Noah",
   "Abraham",
   "Sarah",
   "Isaac",
   "Rebekah",
   "Jacob",
   "Joseph",
   "Moses",
   "Aaron",
   "Miriam",
   "Joshua",
   "Deborah",
   "Gideon",
   "Samson",
   "Samuel",
   "David",
   "Solomon",
   "Elijah",
   "Elisha",
   "Isaiah",
   "Jeremiah",
   "Daniel",
   "Jonah",
   "Mary",
   "Joseph",
   "John the Baptist",
   "Peter",
   "Paul",
   "James",
   "John",
   "Andrew",
   "Philip",
   "Thomas",
   "Matthew",
   "Judas",
   "Stephen",
   "Barnabas",
   "Timothy",

   // Christian practices
   "prayer",
   "fasting",
   "worship",
   "praise",
   "thanksgiving",
   "tithing",
   "offering",
   "fellowship",
   "discipleship",
   "evangelism",
   "mission",
   "ministry",
   "service",
   "sacrifice",
   "stewardship",

   // Church concepts
   "church",
   "congregation",
   "body of Christ",
   "bride of Christ",
   "kingdom of God",
   "apostles",
   "prophets",
   "evangelists",
   "pastors",
   "teachers",
   "elders",
   "deacons",
   "laity",
   "clergy",
   "denomination",

   // Theological terms
   "Trinity",
   "Father",
   "Son",
   "Holy Spirit",
   "incarnation",
   "virgin birth",
   "crucifixion",
   "cross",
   "blood of Christ",
   "Lamb of God",
   "Alpha and Omega",
   "Immanuel",
   "Messiah",
   "Christ",
   "Savior",
   "Lord",
   "King of Kings",
   "Lord of Lords",
   "Good Shepherd",
   "Light of the World",
   "Word of God",
   "prophecy",
   "revelation",
   "apocalypse",
   "covenant",
   "law",
   "gospel",
   "parable",
   "miracle",
   "sign",
   "wonder",
   "testimony",
   "witness",
   "disciple",
   "apostle",
];

// Expanded suggested prompts
const suggestedPrompts = [
   "Explain John 3:16",
   "What does the Bible say about forgiveness?",
   "Tell me about the parable of the Good Samaritan",
   "How can I practice Christian love in daily life?",
   "What is the meaning of Psalm 23?",
   "Share a verse about hope",
   "What are the fruits of the Spirit?",
   "Explain the significance of Jesus' resurrection",
   "How should Christians respond to persecution?",
   "What does the Bible say about marriage?",
   "Tell me about the armor of God in Ephesians 6",
   "What is the Great Commission?",
   "Explain the Beatitudes from Matthew 5",
   "What does Proverbs say about wisdom?",
   "How can I grow in my faith?",
   "What is the significance of Pentecost?",
   "Explain the parable of the prodigal son",
   "What does the Bible say about prayer?",
   "Tell me about the Ten Commandments",
   "How should Christians handle conflict?",
];

// Enhanced system prompt
const SYSTEM_PROMPT = `You are a knowledgeable Christian assistant specializing in Bible knowledge, theology, and Christian living. Follow these rules:

1. Bible Knowledge:
- Answer questions about all Bible books (${BIBLE_BOOKS.join(", ")})
- Provide accurate explanations of verses, passages, and stories
- Explain biblical concepts like ${GOSPEL_TERMS.slice(0, 10).join(", ")} etc.
- Cross-reference related scriptures when appropriate
- Provide historical and cultural context where helpful

2. Christian Living:
- Offer biblical guidance on practical Christian life
- Suggest relevant scriptures for life situations
- Provide advice grounded in Christian values
- Recommend prayer approaches for different needs
- Explain Christian doctrines and practices

3. Response Guidelines:
- If asked about other topics, politely respond: "I specialize in Bible-related questions and Christian living. How can I help you with those topics?"
- Keep responses clear, concise and scripturally accurate
- Format responses in Markdown (headings, lists, bold, italics, blockquotes)
- Reference Bible verses properly (e.g., John 3:16)
- For complex topics, break explanations into logical sections
- Maintain a gracious, compassionate tone
- When appropriate, suggest related scriptures to explore`;

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
      if (
         "SpeechRecognition" in window ||
         "webkitSpeechRecognition" in window
      ) {
         const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
         recognitionRef.current = new SpeechRecognition();

         recognitionRef.current.continuous = true;
         recognitionRef.current.interimResults = true;
         recognitionRef.current.lang = "en-US";

         let finalTranscript = "";
         let debounceTimeout;

         recognitionRef.current.onstart = () => {
            finalTranscript = "";
            setIsListening(true);
            console.log("Speech recognition started");
         };

         recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
               const transcript = event.results[i][0].transcript;

               if (event.results[i].isFinal) {
                  finalTranscript += transcript + " ";
               } else {
                  interimTranscript += transcript;
               }
            }

            const combinedTranscript = finalTranscript + interimTranscript;
            setTranscript(combinedTranscript);

            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
               setInput(combinedTranscript.trim());
            }, 300);
         };

         recognitionRef.current.onend = () => {
            setIsListening(false);
            console.log("Speech recognition ended");

            if (finalTranscript.trim().length > 5) {
               setInput(finalTranscript.trim());
            }
         };

         recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);

            if (event.error === "not-allowed") {
               setError(
                  "Microphone access denied. Please check your browser permissions."
               );
            } else if (event.error === "no-speech") {
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
         const updatedChats = [...previousChats];
         const chatIndex = updatedChats.findIndex(
            (chat) => chat.id === activeChatId
         );

         if (chatIndex !== -1) {
            updatedChats[chatIndex].messages = messages;
            updatedChats[chatIndex].lastUpdated = new Date().toISOString();
         } else {
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

      // Combine all gospel-related keywords
      const gospelKeywords = [
         ...BIBLE_BOOKS.map((book) => book.toLowerCase()),
         ...GOSPEL_TERMS,
         "bible",
         "scripture",
         "verse",
         "chapter",
         "testament",
         "old testament",
         "new testament",
         "gospel",
         "christian",
         "jesus",
         "christ",
         "god",
         "lord",
         "holy",
         "spirit",
         "faith",
         "church",
         "pray",
         "prayer",
         "worship",
      ];

      return gospelKeywords.some((keyword) =>
         text.toLowerCase().includes(keyword.toLowerCase())
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
      <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>AI Chat | VerseVault</title>
      <meta
         name="description"
         content="Chat with an AI assistant about Bible verses, Christian teachings, and guidance."
      />
       
  </Helmet>
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
      </>
   );
};
