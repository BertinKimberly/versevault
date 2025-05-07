import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
   useEffect(() => {
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
         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
   }, []);

   return (
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
         </div>
      </Router>
   );
}

export default App;
