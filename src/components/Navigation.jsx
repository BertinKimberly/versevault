import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const isActive = (path) => {
      return location.pathname === path;
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3A59D1]/80 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center">
                  <Link
                     to="/"
                     className="flex-shrink-0"
                  >
                     <img
                        className="h-8 w-auto"
                        src="/images/versevault.png"
                        alt="VerseVault"
                     />
                  </Link>
                  <div className="hidden md:block ml-10">
                     <div className="flex items-baseline space-x-4">
                        <Link
                           to="/"
                           className={`${
                              isActive("/")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           Home
                        </Link>
                        <Link
                           to="/about"
                           className={`${
                              isActive("/about")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           About
                        </Link>
                        <Link
                           to="/bible-search"
                           className={`${
                              isActive("/bible-search")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           Bible Search
                        </Link>
                        <Link
                           to="/spiritual-growth-mindmap"
                           className={`${
                              isActive("/spiritual-growth-mindmap")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           Growth
                        </Link>
                        <Link
                           to="/ai-chat"
                           className={`${
                              isActive("/ai-chat")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           AI chat
                        </Link>
                        <Link
                           to="/contact"
                           className={`${
                              isActive("/contact")
                                 ? "bg-[#253380] text-white"
                                 : "text-white hover:bg-[#5a77de]/70"
                           } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        >
                           Contact
                        </Link>
                     </div>
                  </div>
               </div>
               
               {/* Desktop GitHub Link */}
               <div className="hidden md:flex items-center">
                  <a
                     href="https://github.com/bertinKimberly"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-white hover:text-[#c4d4ff] transition-colors"
                  >
                     <img
                        className="h-8 w-8"
                        src="/images/github.png"
                        alt="GitHub"
                     />
                  </a>
               </div>

               {/* Mobile menu button */}
               <div className="md:hidden flex items-center">
                  <button
                     onClick={toggleMenu}
                     className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#253380] focus:outline-none"
                     aria-expanded={isMenuOpen}
                  >
                     <span className="sr-only">Open main menu</span>
                     {/* Hamburger icon */}
                     {!isMenuOpen ? (
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                     ) : (
                        // X icon when menu is open
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile menu, show/hide based on menu state */}
         {isMenuOpen && (
            <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#253380]/95">
                  <Link
                     to="/"
                     className={`${
                        isActive("/")
                           ? "bg-[#1f2a6e] text-white"
                           : "text-white hover:bg-[#5a77de]/70"
                     } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Home
                  </Link>
                  <Link
                     to="/about"
                     className={`${
                        isActive("/about")
                           ? "bg-[#1f2a6e] text-white"
                           : "text-white hover:bg-[#5a77de]/70"
                     } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     About
                  </Link>
                  <Link
                     to="/bible-search"
                     className={`${
                        isActive("/bible-search")
                           ? "bg-[#1f2a6e] text-white"
                           : "text-white hover:bg-[#5a77de]/70"
                     } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Bible Search
                  </Link>
                  <Link
                     to="/contact"
                     className={`${
                        isActive("/contact")
                           ? "bg-[#1f2a6e] text-white"
                           : "text-white hover:bg-[#5a77de]/70"
                     } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Contact
                  </Link>
                  {/* Mobile GitHub Link */}
                  <a
                     href="https://github.com/bertinKimberly"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center text-white hover:bg-[#5a77de]/70 px-3 py-2 rounded-md text-base font-medium transition-colors"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     <img
                        className="h-6 w-6 mr-2"
                        src="/images/github.png"
                        alt="GitHub"
                     />
                     GitHub
                  </a>
               </div>
            </div>
         )}
      </nav>
   );
};