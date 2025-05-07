import { Link } from "react-router-dom";

export const Footer = () => {
   return (
      <footer className="bg-[#253380]/90 backdrop-blur-md text-white py-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div>
                  <h3 className="text-lg font-semibold mb-4">
                     {" "}
                     <Link
                        to="/"
                        className="flex flex-row items-center space-x-2 text-gray-200 hover:text-[#7dabff] transition-colors"
                     >
                        <img
                           className="h-12 md:h-16 2xl:h-20 w-auto"
                           src="/images/versevault.png"
                           alt="VerseVault"
                        />
                        <span className="text-2xl font-bold">VerseVault</span>
                     </Link>
                   
                  </h3>
                  <p className="text-gray-200">
                     Your digital companion for exploring and understanding
                     Bible scriptures.
                  </p>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                     <li>
                        <Link
                           to="/"
                           className="text-gray-200 hover:text-[#7dabff] transition-colors"
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/about"
                           className="text-gray-200 hover:text-[#7dabff] transition-colors"
                        >
                           About
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/bible-search"
                           className="text-gray-200 hover:text-[#7dabff] transition-colors"
                        >
                           Bible Search
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/contact"
                           className="text-gray-200 hover:text-[#7dabff] transition-colors"
                        >
                           Contact
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">
                     Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                     <a
                        href="https://github.com/bertinKimberly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-[#7dabff] transition-colors"
                     >
                        <img
                           className="h-6 w-6"
                           src="/images/github.png"
                           alt="GitHub"
                        />
                     </a>
                     <a
                        href="https://www.instagram.com/bertin5175"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-[#7dabff] transition-colors"
                     >
                        <svg
                           className="h-6 w-6"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                     </a>
                     <a
                        href="https://x.com/Iradukunda31950"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-[#7dabff] transition-colors"
                     >
                        <svg
                           viewBox="0 0 1200 1227"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-6 h-6"
                        >
                           <path
                              d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                              fill="white"
                           />
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#3A59D1]/30 text-center text-gray-200">
               <p>
                  &copy; {new Date().getFullYear()} VerseVault. All rights
                  reserved.
               </p>
            </div>
         </div>
      </footer>
   );
};
