import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
   const containerRef = useRef(null);
   const titleRef = useRef(null);
   const cardsRef = useRef(null);
   const bgElements = useRef([]);

   useEffect(() => {
      // Main timeline for entrance animation
      const mainTl = gsap.timeline();

      // Animate title with staggered text reveal
      mainTl.fromTo(
         ".about-title .char",
         {
            opacity: 0,
            y: 100,
            rotate: 5,
         },
         {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "back.out(1.7)",
         },
         0
      );

      // Subtitle animation
      mainTl.fromTo(
         ".about-subtitle",
         {
            opacity: 0,
            y: 30,
         },
         {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
         },
         0.5
      );

      // Split title text into individual characters for animation
      const title = titleRef.current;
      if (title) {
         const text = title.innerText;
         title.innerHTML = "";
         [...text].forEach((char) => {
            const span = document.createElement("span");
            span.className = "char inline-block";
            span.innerText = char === " " ? "\u00A0" : char;
            title.appendChild(span);
         });
      }

      // Cards stagger animation
      gsap.fromTo(
         ".about-card",
         {
            y: 100,
            opacity: 0,
            scale: 0.9,
         },
         {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
               trigger: cardsRef.current,
               start: "top 80%",
               end: "bottom 60%",
               toggleActions: "play none none reverse",
            },
         }
      );

      // Floating background elements
      bgElements.current.forEach((el, index) => {
         gsap.to(el, {
            y: -30 - index * 10,
            x: index % 2 === 0 ? 20 : -20,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 5 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5,
         });
      });

      // Parallax scroll effect for background elements
      gsap.to(".parallax-bg", {
         y: -100,
         ease: "none",
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
         },
      });

      // Clean up on unmount
      return () => {
         ScrollTrigger.getAll().forEach((t) => t.kill());
      };
   }, []);

   // Function to add background elements to ref array
   const addToRefs = (el) => {
      if (el && !bgElements.current.includes(el)) {
         bgElements.current.push(el);
      }
   };

   return (
      <div
         ref={containerRef}
         className="min-h-screen bg-gradient-to-b from-[#3A59D1] to-[#253380] text-white pt-20 relative overflow-hidden"
      >
         {/* Decorative background elements */}
         <div
            ref={addToRefs}
            className="absolute top-40 right-10 w-32 h-32 bg-gradient-to-br from-[#5a77de]/30 to-[#7dabff]/30 rounded-full filter blur-3xl opacity-50"
         ></div>
         <div
            ref={addToRefs}
            className="absolute bottom-40 left-10 w-40 h-40 bg-gradient-to-br from-[#7dabff]/30 to-[#5a77de]/30 rounded-full filter blur-3xl opacity-50"
         ></div>
         <div
            ref={addToRefs}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-[#c4d4ff]/30 to-[#5a77de]/30 rounded-full filter blur-3xl opacity-50"
         ></div>

         {/* Grid pattern background */}
         <div className="parallax-bg absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="text-center mb-16">
               <h1
                  ref={titleRef}
                  className="about-title text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4d4ff]"
               >
                  About VerseVault
               </h1>
               <p className="about-subtitle text-xl text-gray-200 max-w-3xl mx-auto">
                  Your digital companion for exploring and understanding Bible
                  scriptures in a modern, interactive way.
               </p>
            </div>

            <div
               ref={cardsRef}
               className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
               <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                  <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                     Our Mission
                  </h2>
                  <p className="text-gray-200">
                     VerseVault aims to make Bible study more accessible and
                     engaging through modern technology. We believe that
                     everyone should have easy access to scripture and the
                     ability to explore its teachings in an interactive and
                     meaningful way.
                  </p>
               </div>

               <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                  <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                     Features
                  </h2>
                  <ul className="text-gray-200 space-y-3">
                     <li className="flex items-center">
                        <span className="text-[#7dabff] mr-2">•</span>{" "}
                        Interactive 3D Bible book experience
                     </li>
                     <li className="flex items-center">
                        <span className="text-[#7dabff] mr-2">•</span> Advanced
                        Bible verse search functionality
                     </li>
                     <li className="flex items-center">
                        <span className="text-[#7dabff] mr-2">•</span> Beautiful
                        and intuitive user interface
                     </li>
                     <li className="flex items-center">
                        <span className="text-[#7dabff] mr-2">•</span> Regular
                        updates with new features
                     </li>
                     <li className="flex items-center">
                        <span className="text-[#7dabff] mr-2">•</span>{" "}
                        Cross-platform compatibility
                     </li>
                  </ul>
               </div>

               <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                  <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                     Technology
                  </h2>
                  <p className="text-gray-200">
                     Built with modern web technologies including React,
                     Three.js, and Tailwind CSS, VerseVault delivers a smooth
                     and responsive experience across all devices. Our 3D book
                     interface uses advanced graphics techniques to create an
                     immersive reading experience.
                  </p>
               </div>

               <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                  <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                     Future Plans
                  </h2>
                  <p className="text-gray-200">
                     We're constantly working to improve VerseVault with new
                     features and enhancements. Upcoming additions include verse
                     bookmarking, study notes, and community features to help
                     users connect and share insights.
                  </p>
               </div>
            </div>
         </div>

         {/* Background decorative elements */}
         <div className="absolute top-20 right-5 w-32 h-32 bg-gradient-to-br from-[#5a77de] to-[#7dabff] rounded-full filter blur-3xl opacity-10 animate-float"></div>
         <div
            className="absolute bottom-20 left-5 w-40 h-40 bg-gradient-to-br from-[#7dabff] to-[#5a77de] rounded-full filter blur-3xl opacity-10 animate-float"
            style={{ animationDelay: "-3s" }}
         ></div>
      </div>
   );
};
