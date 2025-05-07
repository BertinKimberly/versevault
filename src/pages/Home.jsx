import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Experience } from "../components/Experience";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAtom } from "jotai";
import { pageAtom } from "../components/UI";
import axios from "axios";
import SpiritualMindmap from "../components/SpiritualMindmap";
import AIChat from "../components/AIChat";

gsap.registerPlugin(ScrollTrigger);

const BACKGROUND_WORDS = [
   "Faith",
   "Hope",
   "Love",
   "Peace",
   "Joy",
   "Grace",
   "Truth",
   "Life",
   "Spirit",
   "Light",
   "Prayer",
   "Wisdom",
   "Strength",
   "Mercy",
   "Forgiveness",
   "Salvation",
   "Blessing",
   "Creation",
   "Redemption",
   "Righteousness",
   "Gospel",
   "Heaven",
   "Believe",
   "Promise",
   "Worship",
   "Scripture",
   "Miracle",
   "Kingdom",
   "Disciples",
   "Covenant",
   "Glory",
   "Revelation",
   "Holy",
   "Prophet",
   "Healing",
   "Praise",
   "Angel",
   "Disciple",
   "Eternity",
   "Parable",
   "Psalm",
   "Testimony",
];

export const Home = () => {
   const [page, setPage] = useAtom(pageAtom);
   const heroRef = useRef(null);
   const canvasRef = useRef(null);
   const featuresRef = useRef(null);
   const howItWorksRef = useRef(null);
   const ctaRef = useRef(null);
   const containerRef = useRef(null);
   const mindmapRef = useRef(null);
   const [randomVerse, setRandomVerse] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Create timeline for hero section
      const heroTl = gsap.timeline({
         scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
         },
      });

      // Hero title and subtitle animations
      heroTl.fromTo(
         ".hero-text .line",
         { y: 100, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
         },
         0
      );

      // 3D book parallax effect
      heroTl.to(
         ".canvas-container",
         {
            y: -50,
            scale: 1.05,
            ease: "none",
         },
         0
      );

      // Features section animations
      const featuresTl = gsap.timeline({
         scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "center center",
            toggleActions: "play none none reverse",
         },
      });

      featuresTl.fromTo(
         ".features-heading",
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
         0
      );

      featuresTl.fromTo(
         ".feature-card",
         {
            y: 100,
            opacity: 0,
            scale: 0.9,
         },
         {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)",
         },
         0.2
      );

      // Animate background words
      const words = document.querySelectorAll(".floating-word");
      words.forEach((word) => {
         gsap.to(word, {
            x: `random(-20, 20)`,
            y: `random(-20, 20)`,
            opacity: `random(0.03, 0.08)`,
            duration: `random(10, 30)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: `random(0, 5)`,
         });
      });

      // How it works section animations
      const howItWorksTl = gsap.timeline({
         scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse",
         },
      });

      howItWorksTl.fromTo(
         ".works-heading",
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
         0
      );

      howItWorksTl.fromTo(
         ".step-card",
         {
            y: 50,
            opacity: 0,
         },
         {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)",
         },
         0.2
      );

      const mindmapTl = gsap.timeline({
         scrollTrigger: {
           trigger: mindmapRef.current,
           start: "top 70%",
           end: "center center",
           toggleActions: "play none none reverse",
         },
       });
       
       mindmapTl.fromTo(
         ".mindmap-heading",
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
         0
       );
       
       mindmapTl.fromTo(
         ".mindmap-container",
         {
           y: 100,
           opacity: 0,
           scale: 0.9,
         },
         {
           y: 0,
           opacity: 1,
           scale: 1,
           duration: 1.2,
           ease: "back.out(1.7)",
         },
         0.3
       );

      // CTA section animations
      const ctaTl = gsap.timeline({
         scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "center center",
            toggleActions: "play none none reverse",
         },
      });

      ctaTl.fromTo(
         ".cta-content",
         {
            scale: 0.9,
            opacity: 0,
         },
         {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
         },
         0
      );

      // Verse  animation
      const verseTl = gsap.timeline({
         scrollTrigger: {
            trigger: ".verse-of-day",
            start: "top 80%",
            end: "center center",
            toggleActions: "play none none reverse",
         },
      });

      verseTl.fromTo(
         ".verse-of-day",
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
         0
      );

      // Background elements parallax effect
      gsap.utils.toArray(".bg-pattern").forEach((pattern) => {
         gsap.to(pattern, {
            y: -150,
            ease: "none",
            scrollTrigger: {
               trigger: containerRef.current,
               start: "top top",
               end: "bottom top",
               scrub: 1,
            },
         });
      });

      // Fetch random verse
      const fetchRandomVerse = async () => {
         try {
            setLoading(true);
            const response = await axios.get(
               "https://bible-api.com/data/web/random"
            );
            setRandomVerse(response.data.random_verse);
         } catch (error) {
            console.error("Error fetching random verse:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchRandomVerse();

      // Clean up on unmount
      return () => {
         ScrollTrigger.getAll().forEach((t) => t.kill());
      };
   }, []);

   const [canvasLoaded, setCanvasLoaded] = useState(false);
   
   // Set canvas as loaded after a minimum time to ensure
   // other content is visible even while 3D is loading
   useEffect(() => {
      const timer = setTimeout(() => {
         setCanvasLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         <div
            className="relative"
            ref={containerRef}
         >
            {/* Hero Section */}
            <section
               ref={heroRef}
               className="h-screen bg-gradient-to-br from-[#3A59D1] via-[#2a3e9d] to-[#253380] relative overflow-hidden"
            >
               {/* Background words */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {BACKGROUND_WORDS.map((word, index) => (
                     <div
                        key={index}
                        className="floating-word absolute text-white opacity-[0.05] font-bold"
                        style={{
                           left: `${Math.random() * 100}%`,
                           top: `${Math.random() * 100}%`,
                           fontSize: `${Math.random() * 4 + 1}rem`,
                        }}
                     >
                        {word}
                     </div>
                  ))}
               </div>

               {/* Background patterns with improved styling */}
               <div className="bg-pattern absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
               <div className="bg-pattern absolute inset-0 bg-[url('/images/dots.svg')] opacity-5 transform rotate-12"></div>

               {/* Glow effects */}
               <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#5a77de]/20 rounded-full blur-3xl"></div>
               <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[#7dabff]/20 rounded-full blur-3xl"></div>

               {/* 3D Book Canvas */}
               <div
                  className="canvas-container absolute inset-0 z-20 md:pb-24"
                  ref={canvasRef}
               >
                  <Canvas
                     shadows
                     camera={{ position: [-0.5, 1, 4], fov: 45 }}
                  >
                     <group
                        position-y={0}
                        scale={0.85}
                     >
                        <Suspense fallback={null}>
                           <Experience />
                        </Suspense>
                     </group>
                  </Canvas>
               </div>

               {/* Hero Text */}
               <div className="hero-text absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pb-32 pointer-events-none">
                  <div className="relative overflow-hidden max-w-4xl mx-auto text-center">
                     <h1 className="text-6xl md:text-8xl font-bold mb-6">
                        <div className="line overflow-hidden">
                           <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                              Interactive Bible
                           </span>
                        </div>
                        <div className="line overflow-hidden">
                           <span className="inline-block text-white">
                              that shapes
                           </span>
                           <span className="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                              your daily
                           </span>
                        </div>
                     </h1>
                     <div className="line overflow-hidden">
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                           Explore the Bible in a new, immersive 3D experience
                           designed for modern readers.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Book controls with static styling */}
               <div className="absolute bottom-6 left-0 right-0 z-30 bg-gradient-to-t from-[#253380]/70 to-transparent py-4">
                  <div className="max-w-7xl mx-auto">
                     <div className="flex items-center justify-center space-x-2 overflow-x-auto px-4 py-2">
                        {[
                           "COVER",
                           "PAGE 1",
                           "PAGE 2",
                           "PAGE 3",
                           "PAGE 4",
                           "PAGE 5",
                           "PAGE 6",
                           "PAGE 7",
                           "PAGE 8",
                           "BACK COVER",
                        ].map((pageName, index) => (
                           <button
                              key={pageName}
                              onClick={() => setPage(index)}
                              className={`px-4 py-2 rounded-full text-sm font-medium ${
                                 page === index
                                    ? "bg-white text-[#3A59D1]"
                                    : "bg-[#3A59D1]/60 text-white border border-white/20 hover:bg-[#5a77de]/60"
                              }`}
                           >
                              {pageName}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </section>
            {/* Random Verse Section */}
            <section className="verse-of-day py-16 bg-gradient-to-b from-[#253380] to-[#3A59D1] relative overflow-hidden">
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center mb-8">
                     <h2 className="text-3xl font-bold text-white">
                        Random Verse
                     </h2>
                     <div className="h-1 w-20 bg-white/50 mx-auto mt-4"></div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 shadow-xl">
                     {loading ? (
                        <div className="flex justify-center items-center h-40">
                           <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
                        </div>
                     ) : randomVerse ? (
                        <div className="text-center">
                           <p className="text-xl sm:text-2xl text-white leading-relaxed italic mb-6">
                              "{randomVerse.text}"
                           </p>
                           <div className="text-white/80 font-semibold">
                              {randomVerse.book} {randomVerse.chapter}:
                              {randomVerse.verse}
                           </div>
                        </div>
                     ) : (
                        <div className="text-center text-white">
                           <p>Unable to load verse. Please try again later.</p>
                        </div>
                     )}
                  </div>

                  <div className="text-center mt-8">
                     <Link
                        to="/bible-search"
                        className="inline-block bg-white text-[#3A59D1] px-6 py-3 rounded-lg font-semibold hover:bg-[#c4d4ff] transition-colors"
                     >
                        Explore More Verses
                     </Link>
                  </div>
               </div>
            </section>
            {/* Features Section */}
            <section
               ref={featuresRef}
               className="features-section py-20 bg-gradient-to-b from-[#3A59D1] to-[#253380] relative overflow-hidden"
            >
               <div className="bg-pattern absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="features-heading text-center mb-16">
                     <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                           Features
                        </span>
                     </h2>
                     <p className="text-xl text-gray-200">
                        Discover the power of interactive Bible study
                     </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                        {
                           title: "3D Interactive Book",
                           description:
                              "Experience the Bible in a unique, immersive 3D environment",
                           icon: "📚",
                           color: "from-[#3A59D1] to-[#7dabff]",
                        },
                        {
                           title: "Verse Search",
                           description:
                              "Find any verse quickly with our powerful search functionality",
                           icon: "🔍",
                           color: "from-[#253380] to-[#5a77de]",
                        },
                        {
                           title: "Modern Design",
                           description:
                              "Clean, beautiful interface inspired by modern web design",
                           icon: "✨",
                           color: "from-[#40c4ff] to-[#3A59D1]",
                        },
                     ].map((feature, index) => (
                        <div
                           key={feature.title}
                           className="feature-card bg-[#253380]/40 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                           style={{ transitionDelay: `${index * 100}ms` }}
                        >
                           <div
                              className={`text-4xl mb-6 p-5 rounded-full inline-block bg-gradient-to-br ${feature.color}`}
                           >
                              {feature.icon}
                           </div>
                           <h3 className="text-2xl font-bold text-white mb-3">
                              {feature.title}
                           </h3>
                           <p className="text-gray-200">
                              {feature.description}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
            {/* How It Works Section */}
            <section
               ref={howItWorksRef}
               className="how-it-works-section py-20 bg-gradient-to-b from-[#253380] to-[#1c2761] relative"
            >
               <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10"></div>
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="works-heading text-center mb-16">
                     <h2 className="text-4xl font-bold text-white mb-4">
                        How It Works
                     </h2>
                     <p className="text-xl text-white/80">
                        Simple steps to enhance your Bible study
                     </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                        {
                           step: "1",
                           title: "Select a Book",
                           description: "Choose from any book of the Bible",
                        },
                        {
                           step: "2",
                           title: "Browse Chapters",
                           description:
                              "Navigate through chapters interactively",
                        },
                        {
                           step: "3",
                           title: "Search Verses",
                           description:
                              "Find specific verses or explore topics",
                        },
                        {
                           step: "4",
                           title: "Study & Share",
                           description: "Learn and share insights with others",
                        },
                     ].map((step) => (
                        <div
                           key={step.step}
                           className="step-card text-center p-4"
                        >
                           <div className="w-16 h-16 rounded-full bg-white text-[#3A59D1] text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg ">
                              {step.step}
                           </div>
                           <h3 className="text-xl font-bold text-white mb-3">
                              {step.title}
                           </h3>
                           <p className="text-white/80">{step.description}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
            {/* Spiritual Growth Mindmap Section */}
            <section
               ref={mindmapRef}
               className="spiritual-growth-section py-20 bg-gradient-to-b from-[#253380] to-[#1c2761] relative overflow-hidden"
            >
               <div className="bg-pattern absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
               <div className="bg-pattern absolute inset-0 bg-[url('/images/dots.svg')] opacity-5 transform rotate-12"></div>

               {/* Glow effects */}
               <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-[#5a77de]/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-[#7dabff]/10 rounded-full blur-3xl"></div>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="mindmap-heading text-center mb-16">
                     <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                           Spiritual Growth Journey
                        </span>
                     </h2>
                     <p className="text-xl text-white/80">
                        Explore the interconnected paths of spiritual
                        development
                     </p>
                     <div className="h-1 w-20 bg-white/30 mx-auto mt-4"></div>
                  </div>

                  <div className="mindmap-container">
                     <SpiritualMindmap />
                  </div>

                  <div className="text-center mt-12">
                     <p className="text-white/70 max-w-2xl mx-auto mb-6">
                        The spiritual growth journey involves developing in
                        multiple areas of faith simultaneously. Explore each
                        aspect to deepen your understanding and relationship
                        with God.
                     </p>
                     <Link
                        to="/spiritual-growth-mindmap"
                        className="inline-block bg-white text-[#3A59D1] px-6 py-3 rounded-lg font-semibold hover:bg-[#c4d4ff] transition-colors"
                     >
                        Explore Detailed Mindmap
                     </Link>
                  </div>
               </div>
            </section>
            <AIChat/>
            {/* Call to Action Section */}
            <section
               ref={ctaRef}
               className="cta-section py-20 bg-gradient-to-t from-[#1c2761] to-[#253380] relative overflow-hidden"
            >
               <div className="bg-pattern absolute inset-0 bg-[url('/images/dots.svg')] opacity-10"></div>
               <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10 cta-content">
                  <h2 className="text-4xl font-bold text-white mb-6">
                     Ready to Start Your Journey?
                  </h2>
                  <p className="text-xl text-gray-200 mb-8">
                     Begin exploring the Bible in a new, interactive way today.
                  </p>
                  <Link
                     to="/bible-search"
                     className="inline-block bg-gradient-to-r from-[#3A59D1] to-[#5a77de] hover:from-[#5a77de] hover:to-[#7dabff] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                     Start Reading Now
                  </Link>
               </div>
            </section>
         </div>
         <Loader />
      </>
   );
};
