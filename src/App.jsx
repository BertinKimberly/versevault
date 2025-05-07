// App.jsx
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Experience } from "./components/Experience";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { BibleSearch } from "./components/BibleSearch";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Chatbot } from "./pages/Chatbot";
import LargeMindmap from "./pages/LargeMindmap";
import { TexturePreloader } from "./components/Book";
import { Analytics } from "@vercel/analytics/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom loading component for the hero section
const HeroLoader = () => {
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      // Listen for texture loading progress
      const handleTextureProgress = (e) => {
         if (e.detail && e.detail.progress) {
            setProgress(e.detail.progress);
         }
      };

      window.addEventListener("textureProgress", handleTextureProgress);

      // Simulate progress in case events don't fire correctly
      const interval = setInterval(() => {
         setProgress((prev) => {
            if (prev >= 100) {
               clearInterval(interval);
               return 100;
            }
            return Math.min(prev + 1, 100);
         });
      }, 50);

      return () => {
         clearInterval(interval);
         window.removeEventListener("textureProgress", handleTextureProgress);
      };
   }, []);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#3A59D1] to-[#2a3e9d]">
         <div className="flex flex-col items-center">
            {/* Animated book icon */}
            <div className="relative w-24 h-24 mb-6">
               <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-16 h-20 bg-white rounded-r shadow-lg animate-page-flip overflow-hidden">
                     <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-70"></div>
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* VerseVault text */}
            <h2 className="text-white text-2xl font-bold mb-4">VerseVault</h2>

            {/* Progress bar */}
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
               <div
                  className="h-full bg-white transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
               ></div>
            </div>

            {/* Loading text */}
            <p className="text-white/80 mt-2 text-sm">
               Loading Bible Scriptures...
            </p>
         </div>
      </div>
   );
};

function App() {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Listen for the bookModelLoaded event
      const handleBookLoaded = () => {
         // Add a slight delay for smooth transition
         setTimeout(() => {
            setIsLoading(false);
         }, 500);
      };

      window.addEventListener("bookModelLoaded", handleBookLoaded);

      // Fallback to ensure loader doesn't stay indefinitely
      const timeout = setTimeout(() => {
         setIsLoading(false);
      }, 8000); // 8 seconds max loading time

      // Global page transition effect
      const pageTransition = (element) => {
         const tl = gsap.timeline();
         tl.fromTo(
            element,
            {
               opacity: 0,
               y: 30,
            },
            {
               opacity: 1,
               y: 0,
               duration: 0.8,
               ease: "power3.out",
            }
         );
         return tl;
      };

      // Apply to main content container
      pageTransition(".main-content");

      // Create parallax effects for background elements
      gsap.utils.toArray(".parallax-bg").forEach((bg) => {
         gsap.fromTo(
            bg,
            { y: 0 },
            {
               y: -100,
               ease: "none",
               scrollTrigger: {
                  trigger: bg.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
               },
            }
         );
      });

      // Clean up on component unmount
      return () => {
         clearTimeout(timeout);
         window.removeEventListener("bookModelLoaded", handleBookLoaded);
         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
   }, []);

   return (
      <>
         <Router>
            <div className="relative min-h-screen bg-gradient-to-b from-[#3A59D1] to-[#2a3e9d]">
               {/* Animated background gradients */}
               <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#4e6adb]/30 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-float"></div>
                  <div
                     className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#3A59D1]/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float"
                     style={{ animationDelay: "2s" }}
                  ></div>
               </div>

               {/* Hero section loader - only shown when book is loading */}
               {isLoading && <HeroLoader />}

               {/* Main content */}
               <div className="main-content relative z-10">
                  <Navigation />

                  <Routes>
                     <Route
                        path="/"
                        element={<Home />}
                     />
                     <Route
                        path="/about"
                        element={<About />}
                     />
                     <Route
                        path="/ai-chat"
                        element={<Chatbot />}
                     />
                     <Route
                        path="/spiritual-growth-mindmap"
                        element={<LargeMindmap />}
                     />
                     <Route
                        path="/contact"
                        element={<Contact />}
                     />
                     <Route
                        path="/bible-search"
                        element={<BibleSearch />}
                     />
                     <Route
                        path="*"
                        element={<NotFound />}
                     />
                  </Routes>

                  <Footer />
               </div>

               {/* Custom styled loader for React Three Fiber */}
               <Loader
                  containerStyles={{
                     background: "transparent",
                     zIndex: isLoading ? -1 : 40, // Hide behind our custom loader when isLoading is true
                  }}
                  innerStyles={{
                     backgroundColor: "rgba(58, 89, 209, 0.3)",
                     backdropFilter: "blur(10px)",
                  }}
                  barStyles={{
                     backgroundColor: "white",
                  }}
                  dataStyles={{
                     color: "white",
                     fontSize: "0.8rem",
                  }}
                  dataInterpolation={(p) =>
                     `Loading 3D Assets ${p.toFixed(0)}%`
                  }
               />
            </div>
         </Router>
         <Analytics />
      </>
   );
}

export default App;
