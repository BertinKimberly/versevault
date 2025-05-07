import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { verseSearchAtom, verseResultAtom } from "./UI";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

// Bible structure with accurate chapter counts for each book
const bibleStructure = {
   Genesis: 50,
   Exodus: 40,
   Leviticus: 27,
   Numbers: 36,
   Deuteronomy: 34,
   Joshua: 24,
   Judges: 21,
   Ruth: 4,
   "1 Samuel": 31,
   "2 Samuel": 24,
   "1 Kings": 22,
   "2 Kings": 25,
   "1 Chronicles": 29,
   "2 Chronicles": 36,
   Ezra: 10,
   Nehemiah: 13,
   Esther: 10,
   Job: 42,
   Psalms: 150,
   Proverbs: 31,
   Ecclesiastes: 12,
   "Song of Solomon": 8,
   Isaiah: 66,
   Jeremiah: 52,
   Lamentations: 5,
   Ezekiel: 48,
   Daniel: 12,
   Hosea: 14,
   Joel: 3,
   Amos: 9,
   Obadiah: 1,
   Jonah: 4,
   Micah: 7,
   Nahum: 3,
   Habakkuk: 3,
   Zephaniah: 3,
   Haggai: 2,
   Zechariah: 14,
   Malachi: 4,
   Matthew: 28,
   Mark: 16,
   Luke: 24,
   John: 21,
   Acts: 28,
   Romans: 16,
   "1 Corinthians": 16,
   "2 Corinthians": 13,
   Galatians: 6,
   Ephesians: 6,
   Philippians: 4,
   Colossians: 4,
   "1 Thessalonians": 5,
   "2 Thessalonians": 3,
   "1 Timothy": 6,
   "2 Timothy": 4,
   Titus: 3,
   Philemon: 1,
   Hebrews: 13,
   James: 5,
   "1 Peter": 5,
   "2 Peter": 3,
   "1 John": 5,
   "2 John": 1,
   "3 John": 1,
   Jude: 1,
   Revelation: 22,
};

// Get the list of book names
const books = Object.keys(bibleStructure);

export const BibleSearch = () => {
   const [selectedBook, setSelectedBook] = useState("");
   const [selectedChapter, setSelectedChapter] = useState("");
   const [selectedVerse, setSelectedVerse] = useState("");
   const [chapters, setChapters] = useState([]);
   const [verses, setVerses] = useState([]);
   const [loading, setLoading] = useState(false);
   const [verseResult, setVerseResult] = useAtom(verseResultAtom);
   const [history, setHistory] = useState([]);
   const [isReading, setIsReading] = useState(false);
   const speechSynthRef = useRef(null);
   const [loadingVerseCount, setLoadingVerseCount] = useState(false);

   // Combobox state
   const [bookQuery, setBookQuery] = useState("");
   const [isComboboxOpen, setIsComboboxOpen] = useState(false);

   // Filter books based on search query
   const filteredBooks =
      bookQuery === ""
         ? books
         : books.filter((book) =>
              book.toLowerCase().includes(bookQuery.toLowerCase())
           );

   // Initialize speech synthesis and handle clicks outside combobox
   useEffect(() => {
      speechSynthRef.current = window.speechSynthesis;

      // Handle clicks outside combobox
      const handleClickOutside = (event) => {
         if (isComboboxOpen && !event.target.closest(".combobox-container")) {
            setIsComboboxOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         if (speechSynthRef.current) {
            speechSynthRef.current.cancel();
         }
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isComboboxOpen]);

   // Load search history from localStorage on component mount
   useEffect(() => {
      const savedHistory = localStorage.getItem("bibleSearchHistory");
      if (savedHistory) {
         try {
            setHistory(JSON.parse(savedHistory));
         } catch (error) {
            console.error("Error parsing saved history:", error);
         }
      }
   }, []);

   useEffect(() => {
      if (selectedBook) {
         // Get the actual number of chapters for the selected book
         const chapterCount = bibleStructure[selectedBook] || 0;
         setChapters(Array.from({ length: chapterCount }, (_, i) => i + 1));
         setSelectedChapter("");
         setSelectedVerse("");
      }
   }, [selectedBook]);

   useEffect(() => {
      if (selectedBook && selectedChapter) {
         // Fetch the actual number of verses for the selected chapter
         fetchVerseCount(selectedBook, selectedChapter);
      }
   }, [selectedChapter]);

   // Save search history to localStorage whenever it changes
   useEffect(() => {
      if (history.length > 0) {
         localStorage.setItem("bibleSearchHistory", JSON.stringify(history));
      }
   }, [history]);

   // Fetch the verse count for a specific chapter
   const fetchVerseCount = async (book, chapter) => {
      setLoadingVerseCount(true);
      setSelectedVerse("");

      try {
         // Use the Bible API to get the verse count by fetching the chapter
         const encodedSearch = encodeURIComponent(`${book} ${chapter}`);
         const response = await fetch(`https://bible-api.com/${encodedSearch}`);

         if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
         }

         const data = await response.json();

         // Determine the verse count from the returned verses
         if (data.verses && data.verses.length > 0) {
            const maxVerse = Math.max(...data.verses.map((v) => v.verse));
            setVerses(Array.from({ length: maxVerse }, (_, i) => i + 1));
         } else {
            // Fallback in case we can't determine the verse count
            setVerses([]);
         }
      } catch (error) {
         console.error("Error fetching verse count:", error);
         setVerses([]);
      } finally {
         setLoadingVerseCount(false);
      }
   };

   const searchVerse = async () => {
      if (!selectedBook) return;

      setLoading(true);
      try {
         let query = selectedBook;
         if (selectedChapter) {
            query += ` ${selectedChapter}`;
            if (selectedVerse) {
               query += `:${selectedVerse}`;
            }
         }

         const encodedSearch = encodeURIComponent(query);
         const response = await fetch(`https://bible-api.com/${encodedSearch}`);

         if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
         }

         const data = await response.json();
         setVerseResult(data);

         // Add to history if not already present
         if (!history.some((item) => item.reference === data.reference)) {
            const newHistory = [
               { reference: data.reference, search: query },
               ...history.slice(0, 9), // Keep up to 10 items
            ];
            setHistory(newHistory);
         }
      } catch (error) {
         console.error("Error fetching verse:", error);
         setVerseResult({
            error: "Failed to fetch verse. Please check your reference format and try again.",
         });
      } finally {
         setLoading(false);
      }
   };

   const readVerse = () => {
      if (!verseResult || verseResult.error) return;

      // Cancel any ongoing speech
      if (speechSynthRef.current) {
         speechSynthRef.current.cancel();
      }

      let textToRead = "";

      // Format text to read including reference
      textToRead += `${verseResult.reference}. `;

      if (verseResult.verses) {
         verseResult.verses.forEach((verse) => {
            textToRead += `Verse ${verse.verse}. ${verse.text} `;
         });
      } else {
         textToRead += verseResult.text;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;

      // Set callbacks for speech events
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);

      speechSynthRef.current.speak(utterance);
   };

   const stopReading = () => {
      if (speechSynthRef.current) {
         speechSynthRef.current.cancel();
         setIsReading(false);
      }
   };

   const clearHistory = () => {
      setHistory([]);
      localStorage.removeItem("bibleSearchHistory");
   };

   const loadVerseFromHistory = (item) => {
      // Parse the search string to get parts
      const parts = item.search.split(/[ :]/);
      let bookName, chapterNum, verseNum;

      // Handle books with spaces like "1 Samuel"
      if (parts.length > 2 && books.includes(parts[0] + " " + parts[1])) {
         bookName = parts[0] + " " + parts[1];
         chapterNum = parts[2];
         verseNum = parts[3];
      } else {
         bookName = parts[0];
         chapterNum = parts[1];
         verseNum = parts[2];
      }

      // Set states
      setSelectedBook(bookName);

      // Use setTimeout to allow book state to update first
      setTimeout(() => {
         if (chapterNum) {
            setSelectedChapter(chapterNum);

            // Use another setTimeout for verse to ensure chapter state is updated
            setTimeout(() => {
               if (verseNum) {
                  setSelectedVerse(verseNum);
               }
               // Finally trigger the search
               searchVerse();
            }, 300);
         } else {
            searchVerse();
         }
      }, 300);

      // Or simply set the result directly from history
      setVerseResult(item);
   };

   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>BibleSearch | VerseVault</title>
            <meta
               name="description"
               content="Search for any verse in the Bible on verseVault."
            />
            <meta
               name="citation_title"
               content="Holy Bible"
            />
            <meta
               name="citation_author"
               content="Various Authors"
            />
            <meta
               name="citation_language"
               content="en"
            />
         </Helmet>
         <div className="min-h-screen bg-gradient-to-b from-[#3A59D1] to-[#253380] text-white pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold mb-4">Bible Search</h1>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                     Search for any verse in the Bible using the selections
                     below.
                  </p>
               </div>

               <div className="w-full md:w-5/6 mx-auto">
                  <div className="bg-[#253380]/80 p-8 rounded-lg shadow-xl backdrop-blur-sm">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                           <label className="block text-sm font-medium text-gray-200 mb-2">
                              Book
                           </label>
                           <div className="relative combobox-container">
                              <div className="relative flex items-center w-full bg-[#1c2761] border border-[#5a77de] rounded-lg px-4 py-2">
                                 {selectedBook && (
                                    <span className="text-[#7dabff] font-semibold mr-2">
                                       {selectedBook}
                                    </span>
                                 )}
                                 <input
                                    type="text"
                                    value={bookQuery}
                                    onChange={(e) => {
                                       setBookQuery(e.target.value);
                                       setIsComboboxOpen(true);
                                       if (e.target.value) {
                                          setSelectedBook(""); // Clear selected book when typing
                                       }
                                    }}
                                    onFocus={() => setIsComboboxOpen(true)}
                                    placeholder={
                                       selectedBook
                                          ? ""
                                          : "Type to search book..."
                                    }
                                    className="w-full bg-transparent text-white focus:outline-none"
                                 />
                                 <button
                                    className="absolute right-2 top-2 text-gray-300 hover:text-white"
                                    onClick={() =>
                                       setIsComboboxOpen(!isComboboxOpen)
                                    }
                                 >
                                    <svg
                                       className="w-5 h-5"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d={
                                             isComboboxOpen
                                                ? "M5 15l7-7 7 7"
                                                : "M19 9l-7 7-7-7"
                                          }
                                       />
                                    </svg>
                                 </button>
                              </div>

                              {isComboboxOpen && (
                                 <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1c2761] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredBooks.length === 0 &&
                                    bookQuery !== "" ? (
                                       <div className="relative cursor-default select-none py-2 px-4 text-gray-300">
                                          No books found.
                                       </div>
                                    ) : (
                                       filteredBooks.map((book) => (
                                          <div
                                             key={book}
                                             className={`relative cursor-pointer select-none py-2 px-4 ${
                                                selectedBook === book
                                                   ? "bg-[#3A59D1] text-white"
                                                   : "text-gray-200 hover:bg-[#253380]"
                                             }`}
                                             onClick={() => {
                                                setSelectedBook(book);
                                                setBookQuery(""); // Clear query after selection
                                                setIsComboboxOpen(false);
                                             }}
                                          >
                                             {book}
                                          </div>
                                       ))
                                    )}
                                 </div>
                              )}
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-200 mb-2">
                              Chapter
                           </label>
                           <select
                              value={selectedChapter}
                              onChange={(e) =>
                                 setSelectedChapter(e.target.value)
                              }
                              disabled={!selectedBook}
                              className="w-full bg-[#1c2761] border border-[#5a77de] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7dabff] disabled:opacity-50"
                           >
                              <option value="">Select chapter</option>
                              {chapters.map((chapter) => (
                                 <option
                                    key={chapter}
                                    value={chapter}
                                 >
                                    {chapter}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-200 mb-2">
                              Verse
                           </label>
                           <select
                              value={selectedVerse}
                              onChange={(e) => setSelectedVerse(e.target.value)}
                              disabled={!selectedChapter || loadingVerseCount}
                              className="w-full bg-[#1c2761] border border-[#5a77de] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7dabff] disabled:opacity-50"
                           >
                              {loadingVerseCount ? (
                                 <option value="">Loading verses...</option>
                              ) : (
                                 <>
                                    <option value="">Select verse</option>
                                    {verses.map((verse) => (
                                       <option
                                          key={verse}
                                          value={verse}
                                       >
                                          {verse}
                                       </option>
                                    ))}
                                 </>
                              )}
                           </select>
                        </div>
                     </div>

                     <button
                        onClick={searchVerse}
                        disabled={!selectedBook || loading}
                        className="w-full bg-[#3A59D1] hover:bg-[#5a77de] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
                     >
                        {loading ? (
                           <span className="flex items-center justify-center">
                              <svg
                                 className="animate-spin h-5 w-5 mr-3"
                                 viewBox="0 0 24 24"
                              >
                                 <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                 />
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                 />
                              </svg>
                              Searching...
                           </span>
                        ) : (
                           "Search"
                        )}
                     </button>
                  </div>

                  {/* Search Results */}
                  {verseResult && (
                     <div className="mt-8 bg-[#253380]/80 p-8 rounded-lg shadow-xl backdrop-blur-sm">
                        {verseResult.error ? (
                           <p className="text-red-400">{verseResult.error}</p>
                        ) : (
                           <div>
                              <div className="flex justify-between items-center mb-4">
                                 <h3 className="text-2xl font-bold text-[#7dabff]">
                                    {verseResult.reference}
                                 </h3>
                                 <div>
                                    {isReading ? (
                                       <button
                                          onClick={stopReading}
                                          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                       >
                                          <svg
                                             className="w-5 h-5 mr-2"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <rect
                                                x="6"
                                                y="6"
                                                width="12"
                                                height="12"
                                                strokeWidth="2"
                                             />
                                          </svg>
                                          Stop
                                       </button>
                                    ) : (
                                       <button
                                          onClick={readVerse}
                                          className="flex items-center bg-[#3A59D1] hover:bg-[#5a77de] text-white px-4 py-2 rounded-lg"
                                       >
                                          <svg
                                             className="w-5 h-5 mr-2"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414l-2.829-2.829a1 1 0 010-1.414l2.829-2.829m2.828 2.828L14.414 12l-6-6 6 6-6 6 6-6"
                                             ></path>
                                          </svg>
                                          Read Aloud
                                       </button>
                                    )}
                                 </div>
                              </div>
                              {verseResult.verses ? (
                                 <div className="space-y-6">
                                    {verseResult.verses.map((verse) => (
                                       <div
                                          key={verse.verse}
                                          className="flex rounded-lg bg-[#1c2761]/60 p-4 hover:bg-[#1c2761]"
                                       >
                                          <span className="text-[#7dabff] font-bold text-2xl mr-4 mt-1 min-w-8 text-center">
                                             {verse.verse}
                                          </span>
                                          <p className="text-gray-100 text-lg leading-relaxed">
                                             {verse.text}
                                          </p>
                                       </div>
                                    ))}
                                 </div>
                              ) : (
                                 <p className="text-gray-100 whitespace-pre-line text-lg leading-relaxed bg-[#1c2761]/60 p-4 rounded-lg">
                                    {verseResult.text}
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  )}

                  {/* Search History - Modified to show in a grid with 2 columns on large screens */}
                  {history.length > 0 && (
                     <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-xl font-semibold text-gray-200">
                              Search History
                           </h3>
                           <button
                              onClick={clearHistory}
                              className="text-sm text-red-400 hover:text-red-300 transition-colors"
                           >
                              Clear History
                           </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {history.map((item, index) => (
                              <div
                                 key={index}
                                 className="bg-[#253380]/80 hover:bg-[#1c2761] rounded-lg transition-colors px-4 py-3 flex justify-between items-center"
                              >
                                 <div className="mr-2">
                                    <h4 className="text-[#7dabff] font-bold text-lg">
                                       {item.reference}
                                    </h4>
                                 </div>
                                 <button
                                    onClick={() => loadVerseFromHistory(item)}
                                    className="bg-[#3A59D1] hover:bg-[#5a77de] text-white px-3 py-1 rounded-lg transition-colors text-sm whitespace-nowrap"
                                 >
                                    Load Verse
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};
